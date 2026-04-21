import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import mongodbConnect from "@/lib/mongoose";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Glace Diamond | Luxury Jewelry Ecosystem Showcase",
  description: "Digital Ecosystem Architecture by PsyberLink Tech-Armory",
  keywords: ["Jewelry", "Luxury", "Ecosystem", "AI Concierge", "Tech-Armory", "AEO"],
  openGraph: {
    title: "Glace Diamond | The Future of Jewelry Retail",
    description: "Experience the 24/7 Automated Digital Ecosystem.",
    type: "website",
  },
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}

// Comment: Base Layout complete with SessionProvider for NextAuth integration.