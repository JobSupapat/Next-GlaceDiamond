"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    RiArrowRightUpLine,
    RiLineChartLine,
    RiShieldCheckLine,
    RiHeart2Line,
    RiMagicLine,
    RiArrowDownSLine
} from "react-icons/ri";

const initialFaqData = [
    {
        id: "investment-2026",
        question: "ซื้อเพชรเพื่อลงทุน ปี 2026 แบบไหนได้กำไรสูงสุด?",
        icon: <RiLineChartLine />,
        slug: "diamond-investment-2026"
    },
    {
        id: "gia-check",
        question: "เพชรใบเซอร์ GIA แท้... เช็กเลข Laser เองยังไงให้ชัวร์?",
        icon: <RiShieldCheckLine />,
        slug: "how-to-check-gia-laser"
    },
    {
        id: "self-reward",
        question: "เพชรแท้ ให้รางวัลตัวเองที่ใส่ได้ทุกวัน และราคาไม่ตก",
        icon: <RiHeart2Line />,
        slug: "everyday-luxury-diamond"
    },
    {
        id: "wedding-budget",
        question: "ออกแบบแหวนแต่งงาน ในราคาจับต้องได้",
        icon: <RiMagicLine />,
        slug: "smart-wedding-ring-budget"
    }
];

export default function PrivilegeFAQ() {
    const [faqWithImages, setFaqWithImages] = useState(initialFaqData.map(item => ({ ...item, randomImg: "" })));
    const [isExpanded, setIsExpanded] = useState(false);
    const [initialLimit, setInitialLimit] = useState(4);

    useEffect(() => {
        const fetchUniqueRandomAssets = async () => {
            try {
                const res = await fetch("/api/products");
                const result = await res.json();
                if (result.success && result.data.length > 0) {
                    // [LOGIC FIX] สุ่มแบบไม่ซ้ำโดยการ Shuffle อาร์เรย์สินค้าต้นทาง
                    const shuffled = [...result.data].sort(() => 0.5 - Math.random());

                    setFaqWithImages(prev => prev.map((item, index) => {
                        // ดึงรูปตามลำดับที่สลับแล้ว (จะไม่มีทางซ้ำกัน)
                        // ใช้ modulo เพื่อป้องกันกรณีสินค้าใน DB น้อยกว่าจำนวนการ์ด FAQ
                        const imgSource = shuffled[index % shuffled.length];
                        return { ...item, randomImg: imgSource.image };
                    }));
                }
            } catch (error) {
                console.error("AEO Unique Sync Error:", error);
            }
        };

        fetchUniqueRandomAssets();

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setInitialLimit(2);
            } else {
                setInitialLimit(4);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const visibleItems = isExpanded ? faqWithImages : faqWithImages.slice(0, initialLimit);

    return (
        <section id="faq" className="py-24 bg-brand-primary border-t border-white/5">
            <div className="max-w-[1201px] mx-auto px-6">
                <header className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl font-light tracking-[0.3em] text-white uppercase text-center md:text-left"
                    >
                        Privilege FAQ
                    </motion.h2>
                    <div className="h-px w-32 bg-brand-accent mt-6 mx-auto md:mx-0 opacity-50" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="group relative aspect-square bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Unique Asset Thumbnail - 100% Brightness & Sizes Corrected */}
                                <div className="absolute top-6 right-6 w-20 h-20 z-10">
                                    <div className="relative w-full h-full rounded-full border border-brand-accent/20 overflow-hidden bg-black/40 backdrop-blur-md group-hover:border-brand-accent/50 transition-colors">
                                        {item.randomImg ? (
                                            <Image
                                                src={item.randomImg}
                                                alt="Glace Masterpiece"
                                                fill
                                                sizes="80px"
                                                className="object-cover group-hover:scale-110 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-1 h-1 bg-brand-accent/20 rounded-full animate-ping" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-brand-accent text-4xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                    {item.icon}
                                </div>

                                <div>
                                    <h3 className="text-white text-[14px] md:text-[14px] font-light leading-relaxed tracking-wide mb-6 pr-10">
                                        {item.question}
                                    </h3>
                                    <Link
                                        href={`/faq/${item.slug}`}
                                        className="inline-flex items-center gap-2 text-brand-accent text-[12px] uppercase tracking-[0.2em] font-bold group-hover:translate-x-2 transition-transform duration-300"
                                    >
                                        รายละเอียด <RiArrowRightUpLine size={14} />
                                    </Link>
                                </div>

                                {/* [FIX] Removed decorative corner line to prevent overlap with Image */}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!isExpanded && faqWithImages.length > initialLimit && (
                    <div className="mt-12 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsExpanded(true)}
                            className="px-8 py-3 bg-white/5 border border-brand-accent/20 text-brand-accent text-[11px] uppercase tracking-[0.3em] rounded-full flex items-center gap-2 hover:bg-brand-accent hover:text-brand-primary transition-all duration-500 cursor-pointer shadow-lg shadow-brand-accent/5"
                        >
                            View More FAQ
                            <RiArrowDownSLine className="text-lg" />
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}

// Rule 1: Mobile First - Single Column Grid (grid-cols-1) + Limit 2.
// Rule 2: Full file provided with Unique Shuffle Random Logic.
// Rule 3: Fixed logic to prevent duplicate images across cards.
// Rule 4: Clean Corner - Removed decorative line overlapping the image.