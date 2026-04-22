"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

    // [STATE] สำหรับเก็บค่าจำนวนชิ้นที่จะโชว์เริ่มต้นตามขนาดหน้าจอ
    const [initialLimit, setInitialLimit] = useState(4);

    useEffect(() => {
        const syncInventory = async () => {
            try {
                const res = await fetch("/api/products");
                const result = await res.json();
                if (result.success) setProducts(result.data);
            } catch (error) {
                console.error("Ecosystem Sync Error:", error);
            } finally {
                setLoading(false);
            }
        };
        syncInventory();

        // [LOGIC] ตรวจสอบขนาดหน้าจอเพื่อกำหนดจำนวนชิ้นเริ่มต้น
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setInitialLimit(2); // โมบายและ iPad mini แสดง 2
            } else {
                setInitialLimit(4); // Desktop แสดง 4
            }
        };

        handleResize(); // รันตอนโหลดครั้งแรก
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleExpand = (catName: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [catName]: !prev[catName]
        }));
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
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl font-light tracking-[0.3em] text-white uppercase text-center md:text-left"
                    >
                        Masterpiece Gallery
                    </motion.h2>
                    <div className="h-px w-40 lg:w-100 bg-brand-accent mt-6 mx-auto md:mx-0 opacity-50" />
                </header>

                {CATEGORY_LIST.map((catName) => {
                    const allCategoryItems = products.filter(p => p.category === catName);
                    if (allCategoryItems.length === 0) return null;

                    const isExpanded = expandedCategories[catName];
                    // [FIX] ใช้ initialLimit ที่เปลี่ยนตามขนาดหน้าจอ
                    const visibleItems = isExpanded ? allCategoryItems : allCategoryItems.slice(0, initialLimit);
                    const hasMore = allCategoryItems.length > initialLimit;

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
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
                                        >
                                            <div className="relative aspect-square">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 right-4">
                                                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-brand-accent px-3 py-1 rounded-full uppercase tracking-widest">
                                                        {product.carat || "Elite"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-7 space-y-5">
                                                <div>
                                                    <h4 className="text-slate-200 text-sm font-light tracking-wide truncate">{product.name}</h4>
                                                    <p className="text-brand-accent text-md mt-2 font-medium">฿{Number(product.price).toLocaleString()}</p>
                                                </div>

                                                <div className="flex items-center justify-between py-4 border-y border-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><RiVipDiamondLine className="text-brand-accent/50" /> {product.color || "D"} Color</span>
                                                    <span>{product.clarity || "VVS1"}</span>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        aria-label={`View full details of ${product.name}`}
                                                        className="flex-1 bg-white/5 hover:bg-brand-accent hover:text-brand-primary border border-white/10 hover:border-brand-accent py-3 rounded-xl transition-all duration-300 text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer"
                                                    >
                                                        <RiEyeLine size={14} /> Details
                                                    </button>
                                                    <button
                                                        type="button"
                                                        aria-label={`Inquire about ${product.name}`}
                                                        className="w-12 h-12 bg-white/5 hover:bg-brand-accent hover:text-brand-primary border border-white/10 hover:border-brand-accent flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer"
                                                    >
                                                        <RiShoppingBagLine size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {hasMore && (
                                <div className="mt-12 flex justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleExpand(catName)}
                                        className="px-8 py-3 bg-white/5 border border-brand-accent/20 text-brand-accent text-[11px] uppercase tracking-[0.3em] rounded-full flex items-center gap-2 hover:bg-brand-accent hover:text-brand-primary transition-all duration-500 cursor-pointer shadow-lg shadow-brand-accent/5"
                                    >
                                        {isExpanded ? "Show Less" : `More ${catName}...`}
                                        <RiArrowDownSLine className={`text-lg transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`} />
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

// Rule 1: Mobile First (Lock 1201px) - Now includes specific logic for < 768px.
// Rule 2: Full file provided with Responsive Item Limit.
// Rule 3: No changes to Navbar or other components.
// Rule 4: Preserved all font sizes and luxury logic as commanded.