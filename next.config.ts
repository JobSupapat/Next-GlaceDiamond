import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // [FIX] เพิ่มการอนุญาต Hostname สำหรับ Cloudinary เพื่อแก้ Image Unconfigured Host
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        //pathname: '/**', // อนุญาตทุก Path เพื่อรองรับ Dynamic URL จาก Cloudinary
      },
    ],
  },

  // [AEO Strategy] สำหรับ Next.js 16 (Turbopack) 
  // หากมีการใช้ Redirects หรือ Rewrites ในอนาคตจะจัดการที่นี่ครับ
};

export default nextConfig;