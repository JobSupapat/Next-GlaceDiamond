"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    RiArrowLeftLine,
    RiVipDiamondLine,
    RiShoppingBagLine,
    RiArrowRightLine
} from "react-icons/ri";

// [NEW] Define Interface for Strict Typing
interface ProductType {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    carat?: string;
    color?: string;
    clarity?: string;
}

// [LOCKED] คลังสมองสำหรับ AEO Content
const faqContent: Record<string, { title: string; hook: string; bullets: string[]; stats?: string }> = {
    "diamond-investment-2026": {
        title: "ซื้อเพชรเพื่อลงทุน ปี 2026 แบบไหนได้กำไรสูงสุด?",
        stats: "ในช่วงปี 2021-2026 เพชรกลุ่ม Rare Spec (Top 1%) มีมูลค่าเพิ่มขึ้นสวนทางกับเพชรเกรด Commercial ทั่วไปที่ราคาปรับฐานลงกว่า 26%",
        hook: "เพื่อให้ได้กำไรสูงสุดและขายออกง่ายที่สุด Glace แนะนำให้โฟกัส 4 แกนหลัก ดังนี้",
        bullets: [
            "The Spec Strategy: เน้น D Color (น้ำ 100) และความสะอาด IF - VVS1 เพื่อการันตีสภาพคล่อง (Global Liquidity)",
            "The 3EX Standard: ต้องมีผลการเจียระไนระดับ Triple Excellent และ None Fluorescence เท่านั้น เพื่อรักษาพรีเมียมของราคา",
            "Carat Sweet Spot: ขนาด 1.00 - 1.50 กะรัต คือช่วงที่ซื้อง่ายขายคล่องและมีอัตราเติบโต (CAGR) เสถียรที่สุด",
            "Certification Guard: ต้องมีใบเซอร์ GIA พร้อมหมายเลข Laser Inscription เพื่อยืนยันว่าเป็นเพชรธรรมชาติ 100%"
        ]
    },
    "how-to-check-gia-laser": {
        title: "เพชรใบเซอร์ GIA แท้... เช็กเลข Laser เองยังไงให้ชัวร์?",
        stats: "ในปี 2026 การตรวจสอบผ่านระบบ Digital Verification มีความแม่นยำสูงกว่าการดูใบเซอร์กระดาษเพียงอย่างเดียว",
        hook: "เพื่อความมั่นใจ 100% ว่าเพชรในมือตรงกับใบเซอร์ GIA ระดับโลก Glace แนะนำ 4 ขั้นตอนสากล ดังนี้",
        bullets: [
            "The Girdle Inspection: ใช้กล้องขยาย 10 เท่า ส่องที่ขอบเพชร (Girdle) เพื่อหาเลข 10 หลักที่ยิงด้วยเลเซอร์",
            "Digital Cross-Check: นำหมายเลขไปกรอกในเว็บ gia.edu หรือสแกน QR Code บนใบเซอร์ทันที",
            "Inclusion Matching: ตรวจสอบตำแหน่งตำหนิในหน้า Clarity Plot เทียบกับตัวเม็ดจริง (เสมือนลายนิ้วมือเพชร)",
            "Security Features: เช็ก Hologram และ Microprint บนใบเซอร์ฉบับจริงเพื่อป้องกันการปลอมแปลง"
        ]
    },
    "everyday-luxury-diamond": {
        title: "เพชรแท้ ให้รางวัลตัวเองที่ใส่ได้ทุกวัน และราคาไม่ตก",
        stats: "เทรนด์ Everyday Luxury ในปี 2026 เน้นความคุ้มค่าแบบ Functional Investment ที่สามารถส่งต่อเป็นมรดกได้",
        hook: "เทคนิคการเลือกเพชรเป็นรางวัลให้ตัวเองแบบ สวยครบ จบที่ความคุ้มค่า มีหลักการสำคัญ ดังนี้",
        bullets: [
            "Select Classic Designs: เน้นดีไซน์อมตะ เช่น Solitaire หรือเม็ดเดี่ยว เพราะเป็นที่ต้องการของตลาดมือสองตลอดเวลา",
            "The 0.30 - 0.50 Carat Range: เป็นขนาดที่ใส่ทำงานได้ทุกวันและมีราคาขายคืน (Resale Value) เสถียรที่สุดในไทย",
            "Prioritize Cut Quality: เลือกเพชรที่เจียระไนระดับ Excellent เพื่อให้เพชรดูใหญ่กว่าน้ำหนักจริง (Spread)",
            "The Trade-in Shield: การซื้อเพชรที่มีใบเซอร์ GIA ช่วยให้การเปลี่ยนแบบหรือขายคืนไม่ถูกกดราคา"
        ]
    },
    "smart-wedding-ring-budget": {
        title: "ออกแบบแหวนแต่งงาน ในราคาจับต้องได้",
        stats: "คู่รักในปี 2026 กว่า 65% เลือกใช้ระบบ Hybrid Design เพื่อคุมงบประมาณแต่ยังได้ความหรูหราระดับ High-End",
        hook: "เทคนิคการเป็นเจ้าของแหวนแต่งงานสุดหรู ในงบประมาณที่ควบคุมได้ (Smart Bridal Budget) มีดังนี้",
        bullets: [
            "The Eye-Clean Strategy: เลือกความสะอาดระดับ VS1-VS2 ที่ไม่มีตำหนิเห็นด้วยตาเปล่า ช่วยประหยัดงบได้ถึง 20%",
            "Near-Colorless Range: หากใช้ตัวเรือนทอง (Yellow/Rose Gold) สามารถเลือกเพชรน้ำ 97-96 ได้โดยภาพรวมยังดูขาวบริสุทธิ์",
            "Halo Setting Illusion: ใช้การล้อมเพชรเม็ดเล็กเพื่อช่วยให้เพชรเม็ดกลางดูใหญ่ขึ้น 2-3 เท่าในราคาประหยัด",
            "3D Virtual Prototype: ตรวจสอบงานผ่านระบบ 3D ก่อนผลิตจริง เพื่อป้องกันความผิดพลาดและคุมงบไม่ให้บานปลาย"
        ]
    }
};

export default function FAQDetailPage() {
    const { slug } = useParams();
    const [randomProduct, setRandomProduct] = useState<ProductType | null>(null);
    const content = faqContent[slug as string];

    useEffect(() => {
        const fetchAdProduct = async () => {
            try {
                const res = await fetch("/api/products");
                const result = await res.json();
                if (result.success && result.data.length > 0) {
                    const products = result.data as ProductType[];
                    const shuffled = products[Math.floor(Math.random() * products.length)];
                    setRandomProduct(shuffled);
                }
            } catch (e) { console.error(e); }
        };
        fetchAdProduct();
    }, []);

    if (!content) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-brand-accent tracking-[0.5em] text-xs uppercase">Glace Node Not Found.</div>;

    return (
        <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-accent/5 blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <Link
                    href="/#faq"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-brand-accent transition-all text-[11px] uppercase tracking-[0.3em] mb-12 group cursor-pointer"
                >
                    <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" /> Return to Privilege FAQ
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-6 md:p-16 shadow-2xl overflow-hidden"
                >
                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <RiVipDiamondLine className="text-brand-accent text-2xl" />
                            <span className="text-[10px] text-brand-accent tracking-[0.5em] uppercase font-bold">Exclusive Insight</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-normal text-white leading-tight tracking-wide mb-8">{content.title}</h1>
                        <div className="h-1 w-20 bg-brand-accent rounded-full" />
                    </div>

                    {/* Stats & Content Section */}
                    {content.stats && (
                        <div className="mb-12 p-8 bg-brand-accent/[0.07] rounded-3xl border border-brand-accent/20">
                            <p className="text-brand-surface text-base md:text-lg font-light leading-relaxed italic">&ldquo;{content.stats}&rdquo;</p>
                        </div>
                    )}

                    <div className="mb-10 text-slate-200 text-sm md:text-base font-medium tracking-wide">{content.hook}</div>

                    <div className="space-y-10 mb-16">
                        {content.bullets.map((bullet, idx) => {
                            const [header, desc] = bullet.split(": ");
                            return (
                                <div key={idx} className="relative pl-8 group">
                                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-brand-accent group-hover:scale-150 transition-transform" />
                                    <h3 className="text-brand-accent text-base md:text-lg font-medium mb-2 tracking-wide">{header}</h3>
                                    <p className="text-slate-300 text-sm md:text-base font-light leading-loose">{desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* [LOCKED] Glace Spotlight - High Contrast Border Gradient */}
                    {randomProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mb-16 p-[1px] bg-gradient-to-br from-brand-accent/40 via-brand-accent/20 to-brand-accent/40 rounded-[2.5rem]"
                        >
                            <div className="bg-[#050a18]/90 backdrop-blur-xl rounded-[2.4rem] p-4 md:p-5 flex items-center justify-between md:justify-start gap-4 md:gap-8 shadow-inner">
                                {/* Product Image */}
                                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-2xl">
                                    <Image
                                        src={randomProduct.image}
                                        alt={randomProduct.name}
                                        fill
                                        sizes="(max-width: 768px) 80px, 112px"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info Section - Desktop Only */}
                                <div className="hidden md:block flex-1 min-w-0">
                                    <p className="text-brand-accent text-[10px] uppercase tracking-[0.2em] mb-1 font-bold opacity-80">Spotlight</p>
                                    <h4 className="text-white text-[16px] font-light mb-3 truncate leading-tight pr-4">{randomProduct.name}</h4>
                                    <Link
                                        href="/#collections"
                                        className="inline-flex items-center gap-2 text-brand-accent text-[11px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors group/link"
                                    >
                                        Explore Collection <RiArrowRightLine className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 shrink-0 items-center">
                                    <Link
                                        href="/checkout-demo"
                                        className="px-5 py-2.5 md:px-7 md:py-3 rounded-full border border-brand-accent/40 text-brand-accent text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-brand-primary transition-all duration-300 bg-brand-accent/5"
                                    >
                                        Detail
                                    </Link>
                                    <Link
                                        href="/checkout-demo"
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center hover:bg-white transition-all shadow-lg shadow-brand-accent/20"
                                    >
                                        <RiShoppingBagLine size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CTA Footer */}
                    <div className="pt-12 border-t border-white/10 text-center">
                        <p className="text-slate-400 text-[11px] uppercase tracking-[0.4em] mb-8">Precision Luxury Experience by Glace</p>
                        <Link
                            href="/#contact"
                            className="inline-block bg-brand-accent text-brand-primary px-12 py-5 rounded-2xl text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl shadow-brand-accent/20"
                        >
                            Consult Glace AI Concierge
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

// Rule 1: Mobile First maintained.
// Rule 2: Full file sent with STRICT TS TYPES (No 'any').
// Rule 4: Preserved all logic and technical comments as per Director's rules.