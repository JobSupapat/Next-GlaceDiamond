import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import mongodbConnect from "@/lib/mongoose";
import AuthProvider from "@/components/shared/AuthProvider"; // [ADD] นำเข้า Wrapper แทน

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Glace Diamond | Luxury Jewelry Ecosystem Showcase",
  description: "Digital Ecosystem Architecture by PsyberLink Tech-Armory",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Connection to MongoDBAtlas
  await mongodbConnect();

  return (
    <html lang="th">
      <body className={`${prompt.variable} font-sans antialiased`}>
        {/* [FIX] ใช้ AuthProvider ที่เป็น Client Component หุ้มแทน SessionProvider โดยตรง */}
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// Comment: Base Layout complete with AuthProvider for NextAuth integration.