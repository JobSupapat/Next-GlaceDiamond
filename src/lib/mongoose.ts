import mongoose from "mongoose";
import dns from 'node:dns/promises';

// ตั้งค่า DNS สำหรับ Environment ที่มีปัญหาการ Resolve MongoDB Atlas
dns.setServers(['1.1.1.1', '8.8.8.8']);

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("กรุณาระบุ MONGO_URI ในไฟล์ .env.local");
}

/** * ใน Next.js การทำ Hot Reload อาจทำให้เกิด Connection ซ้อนกันหลายตัว 
 * เราจะใช้ Global variable ในการเก็บ Cached connection ไว้ครับ
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export default async function mongodbConnect(): Promise<typeof mongoose | undefined> {
    // 1. ถ้าเชื่อมต่อค้างไว้อยู่แล้ว ให้ใช้ตัวเดิม (Performance)
    if (cached.conn) {
        return cached.conn;
    }

    // 2. ถ้ายังไม่มี Promise การเชื่อมต่อ ให้สร้างใหม่
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log('💎 Project: GlaceDiamond MongoDB Connect Complete !!!');
            return mongoose;
        });
    }

    try {
        // 3. รอการเชื่อมต่อให้เสร็จสิ้น
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        console.error('❌ MongoDB Connection Error:', err);
        throw err;
    }

    return cached.conn;
}

// Comment: Refactored to TypeScript with Global Cached Connection logic.
// Standardized for Next.js 16 environment.