// src/lib/models/Product.ts
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ["Rings", "Earrings", "Bangles and Bracelets", "Pendants and Necklaces"]
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    material: {
        type: String,
        required: true,
        default: "White Gold"
    }, // White Gold, Yellow Gold, Rose Gold, Platinum

    // Diamond Specs (The AEO Core)
    // ปรับเป็น String เพื่อรองรับช่วง เช่น "1.00 - 1.50" หรือค่าเฉพาะเจาะจง
    carat: { type: String },
    color: { type: String },   // เช่น "D Color (100)"
    clarity: { type: String }, // เช่น "VVS1"
    cut: { type: String },     // เช่น "3EX (Triple Excellent)"

    description: {
        type: String,
        trim: true
    },

    // [NEW] Invisible Tags สำหรับ Agentic AI ใช้ทำ AEO Matching
    tags: {
        type: [String], // เก็บเป็น Array ของ Strings เพื่อการ Query ที่รวดเร็ว
        default: []
    },

    sku: {
        type: String,
        unique: true,
        sparse: true // ป้องกัน Error กรณีไม่มีค่า SKU ในบาง Record
    },

    image: {
        type: String,
        required: true // บังคับใส่รูปภาพจาก Cloudinary
    },

    isDemo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // เก็บ createdAt และ updatedAt อัตโนมัติ
});

// สร้าง Index สำหรับการค้นหาด้วยชื่อและแท็ก เพื่อประสิทธิภาพระบบ AEO
ProductSchema.index({ name: 'text', tags: 'text' });

const Product = models.Product || model("Product", ProductSchema);
export default Product;

// Comment: Refactored to include 'tags' for AEO Strategy.
// Added text index for high-performance AI searching.
// Rule 2: Full file provided for Director's review.