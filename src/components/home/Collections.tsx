"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RiVipDiamondLine, RiEyeLine, RiShoppingBagLine, RiArrowDownSLine } from "react-icons/ri";

const CATEGORY_LIST = ["Rings", "Earrings", "Bangles and Bracelets", "Pendants and Necklaces"];

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

export default function Collections() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [initialLimit, setInitialLimit] = useState(4);

    useEffect(() => {
        const syncInventory = async () => {
            try {
                const res = await fetch("/api/products");
                const result = await res.json();
                if (result.success) setProducts(result.data);
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        syncInventory();

        const handleResize = () => {
            setInitialLimit(window.innerWidth < 768 ? 2 : 4);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleExpand = (catName: string) => {
        setExpandedCategories(prev => ({ ...prev, [catName]: !prev[catName] }));
    };

    // [NEW LOGIC] Helper function สำหรับการบีบอัดภาพผ่าน Cloudinary URL เพื่อเพิ่ม Performance
    const getOptimizedImage = (url: string) => {
        if (!url.includes("cloudinary.com")) return url;
        // แทรกพารามิเตอร์: w_400 (กว้าง 400px), f_auto (เลือกฟอร์แมตที่ประหยัดที่สุดเช่น WebP), q_auto (ปรับคุณภาพอัตโนมัติ)
        return url.replace("/upload/", "/upload/w_400,f_auto,q_auto/");
    };

    if (loading) return (
        <div className="py-20 text-center text-brand-accent animate-pulse tracking-[0.4em] text-[10px] uppercase">
            Synchronizing Vault...
        </div>
    );

    return (
        <section id="collections" className="py-24 bg-brand-primary">
            <div className="max-w-[1201px] mx-auto px-6">
                <header className="mb-20">
                    <h2 className="text-2xl font-light tracking-[0.3em] text-white uppercase text-center md:text-left">
                        Masterpiece Gallery
                    </h2>
                    <div className="h-px w-40 bg-brand-accent mt-6 mx-auto md:mx-0 opacity-50" />
                </header>

                {CATEGORY_LIST.map((catName) => {
                    const allCategoryItems = products.filter(p => p.category === catName);
                    if (allCategoryItems.length === 0) return null;

                    const isExpanded = expandedCategories[catName];
                    const visibleItems = isExpanded ? allCategoryItems : allCategoryItems.slice(0, initialLimit);

                    return (
                        <div key={catName} className="mb-24 last:mb-0">
                            <h3 className="text-brand-accent text-[12px] lg:text-[14px] tracking-[0.5em] uppercase mb-12 flex items-center gap-6">
                                <span className="h-[1px] w-12 bg-brand-accent/30" /> {catName}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {visibleItems.map((product) => (
                                        <motion.div
                                            key={product._id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
                                        >
                                            <div className="relative aspect-square overflow-hidden bg-black/20">
                                                {/* [FIXED] ใช้ Optimized URL และปรับ Sizes ให้แม่นยำขึ้นเพื่อลดคะแนน Oversize ใน Mobile */}
                                                <Image
                                                    src={getOptimizedImage(product.image)}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1201px) 25vw, 300px"
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            </div>

                                            <div className="p-7 space-y-5">
                                                <div>
                                                    <h4 className="text-slate-200 text-sm font-light tracking-wide truncate">{product.name}</h4>
                                                    <p className="text-brand-accent text-md mt-2 font-medium">฿{Number(product.price).toLocaleString()}</p>
                                                </div>

                                                {/* [FIX A11Y] Adjusted Color Contrast from slate-500 to slate-300/400 */}
                                                <div className="flex items-center justify-between py-4 border-y border-white/5 text-[10px] text-slate-300 uppercase tracking-[0.2em]">
                                                    <span className="flex items-center gap-1.5">
                                                        <RiVipDiamondLine className="text-brand-accent" />
                                                        {product.color || "D"} COLOR
                                                    </span>
                                                    <span className="font-medium">{product.clarity || "VVS1"}</span>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Link
                                                        href="/checkout-demo"
                                                        aria-label={`View details of ${product.name}`}
                                                        className="flex-1 bg-white/5 hover:bg-brand-accent hover:text-brand-primary border border-white/10 hover:border-brand-accent py-3 rounded-xl transition-all duration-300 text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer"
                                                    >
                                                        <RiEyeLine size={14} /> Details
                                                    </Link>
                                                    <Link
                                                        href="/checkout-demo"
                                                        aria-label={`Buy ${product.name}`}
                                                        className="w-12 h-12 bg-white/5 hover:bg-brand-accent hover:text-brand-primary border border-white/10 hover:border-brand-accent flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
                                                    >
                                                        <RiShoppingBagLine size={18} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {allCategoryItems.length > initialLimit && (
                                <div className="mt-12 flex justify-center">
                                    <button
                                        onClick={() => toggleExpand(catName)}
                                        aria-label={isExpanded ? "Collapse" : "Show more"}
                                        className="px-8 py-3 bg-white/5 border border-brand-accent/20 text-brand-accent text-[11px] uppercase tracking-[0.3em] rounded-full flex items-center gap-2 hover:bg-brand-accent hover:text-brand-primary transition-all duration-500 cursor-pointer"
                                    >
                                        {isExpanded ? "Show Less" : `More ${catName}...`}
                                        <RiArrowDownSLine className={isExpanded ? "rotate-180" : ""} />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}