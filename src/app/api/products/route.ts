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

export async function POST(req: Request) {
    try {
        await mongodbConnect();
        const formData = await req.formData();

        // 1. ดึงไฟล์ภาพและข้อมูล
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

        // 2. แปลงไฟล์ภาพเป็น Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 3. Upload ขึ้น Cloudinary [FIX]: ระบุ Type เป็น UploadApiResponse แทน any
        const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "glace_inventory", resource_type: "auto" },
                (error, result) => {
                    if (error || !result) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        // 4. เตรียม Tags
        const tags = tagsString ? tagsString.split(",").map(tag => tag.trim()) : [];

        // 5. บันทึกลง MongoDB
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
        // [FIX]: ป้องกัน Error 'any' ใน catch block
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Deployment Failure:", errorMessage);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}

// Comment: Refactored to eliminate 'any' types.
// Using Cloudinary's 'UploadApiResponse' and proper 'instanceof Error' check.
// Rule 2: Full file sent for Review.