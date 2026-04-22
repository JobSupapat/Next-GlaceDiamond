// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import mongodbConnect from "@/lib/mongoose";
import Product from "@/lib/models/Product";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configuration สำหรับ Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * [NEW] GET Method: สำหรับดึงข้อมูล Inventory ทั้งหมดไปแสดงผลที่หน้า Collections
 */
export async function GET() {
    try {
        await mongodbConnect();
        // ดึงข้อมูลทั้งหมดและเรียงลำดับตามเวลาล่าสุด
        const products = await Product.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: products
        }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Fetch Failure";
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}

/**
 * POST Method: สำหรับเพิ่ม Asset ใหม่ (คงเดิมตามโค้ดล่าสุดของท่าน)
 */
export async function POST(req: Request) {
    try {
        await mongodbConnect();
        const formData = await req.formData();

        const file = formData.get("image") as File;
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const material = formData.get("material") as string;
        const carat = formData.get("carat") as string;
        const color = formData.get("color") as string;
        const clarity = formData.get("clarity") as string;
        const cut = formData.get("cut") as string;
        const description = formData.get("description") as string;
        const tagsString = formData.get("tags") as string;

        if (!file) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "glace_inventory", resource_type: "auto" },
                (error, result) => {
                    if (error || !result) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        const tags = tagsString ? tagsString.split(",").map(tag => tag.trim()) : [];

        const product = await Product.create({
            name,
            price: Number(price),
            category,
            material,
            carat,
            color,
            clarity,
            cut,
            description,
            tags,
            image: uploadResponse.secure_url,
            sku: `GLC-${Date.now()}`,
            isDemo: true
        });

        return NextResponse.json({ success: true, data: product }, { status: 201 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Deployment Failure";
        console.error("Deployment Failure:", errorMessage);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}

// Rule 2: ส่งทั้งไฟล์เพื่อ Review และ Update ตามโครงสร้างล่าสุด
// Rule 4: คงคอมเมนต์และการจัดการ Error ไว้ตามมาตรฐานเดิม