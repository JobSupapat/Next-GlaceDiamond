"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
    RiPriceTag3Line,
    RiUploadCloud2Line,
    RiImageAddLine,
    RiDeleteBin6Line,
    RiVipDiamondLine,
    RiHashtag
} from "react-icons/ri";
import { GiDiamondRing } from "react-icons/gi";
import Image from "next/image";

export default function AddProductPage() {
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [displayPrice, setDisplayPrice] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // [LOGIC] จัดการ Format ตัวเลขหลักพัน
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setDisplayPrice(formatted);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!fileInputRef.current?.files?.[0]) {
            Swal.fire("Incomplete Asset", "กรุณาอัปโหลดรูปภาพสินค้าเพื่อสร้าง Visual ให้กับระบบ", "warning");
            return;
        }

        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // [FIX] ดึงราคาจริง (ไม่มีลูกน้ำ) ไปทับค่าเดิมก่อนส่ง API
        const rawPrice = displayPrice.replace(/,/g, "");
        formData.set("price", rawPrice);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (result.success) {
                Swal.fire({
                    title: 'MASTERPIECE DEPLOYED!',
                    text: 'Asset ชิ้นนี้ถูกบรรจุลงใน Ecosystem เรียบร้อยแล้ว',
                    icon: 'success',
                    background: '#020617',
                    color: '#F8FAFC',
                    confirmButtonColor: '#D4AF37'
                });
                setPreviewImage(null);
                setDisplayPrice("");
                formRef.current?.reset();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Deployment failed";
            Swal.fire("System Failure", msg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-brand-primary pt-32 pb-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
            >
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left border-b border-white/5 pb-8">
                    <h2 className="text-2xl font-light tracking-[0.2em] text-brand-accent uppercase flex items-center justify-center md:justify-start gap-3">
                        <GiDiamondRing className="animate-pulse text-3xl" /> Add New Asset
                    </h2>
                    <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase mt-2">Precision AEO & Inventory Control</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Column 1: Image & Tags */}
                    <div className="space-y-6">
                        <label htmlFor="product-image" className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium flex items-center gap-2">
                            <RiImageAddLine className="text-brand-accent" /> High-End Visual (900x900px)
                        </label>

                        <div
                            onClick={() => !previewImage && fileInputRef.current?.click()}
                            className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden
                                ${previewImage ? "border-brand-accent/50" : "border-white/10 hover:border-brand-accent/30 cursor-pointer bg-black/20"}`}
                        >
                            {previewImage ? (
                                <>
                                    <Image src={previewImage} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setPreviewImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                            className="bg-rose-500 text-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-transform"
                                        >
                                            <RiDeleteBin6Line size={24} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-10">
                                    <RiUploadCloud2Line className="text-brand-accent text-3xl mx-auto mb-4" />
                                    <p className="text-slate-300 text-xs uppercase tracking-widest">Select Product Image</p>
                                </div>
                            )}
                        </div>
                        <input id="product-image" type="file" name="image" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

                        {/* Search Keywords */}
                        <div className="space-y-3 pt-4">
                            <label htmlFor="aeo-tags" className="text-[10px] uppercase tracking-[0.2em] text-slate-400 ml-1 font-medium flex items-center gap-2">
                                <RiHashtag className="text-brand-accent" /> Search Keywords (AEO Tags)
                            </label>
                            <textarea
                                id="aeo-tags"
                                name="tags"
                                rows={3}
                                placeholder="Classic Wedding Ring, D Color, Halo Setting..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-slate-200 outline-none focus:border-brand-accent/50 text-[11px] leading-relaxed resize-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Column 2: Product Specs */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="category-select" className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Category</label>
                                <select id="category-select" name="category" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-slate-200 outline-none text-xs cursor-pointer">
                                    <option value="Rings">Rings</option>
                                    <option value="Earrings">Earrings</option>
                                    <option value="Bangles and Bracelets">Bangles and Bracelets</option>
                                    <option value="Pendants and Necklaces">Pendants and Necklaces</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="material-select" className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Material</label>
                                <select id="material-select" name="material" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-slate-200 outline-none text-xs cursor-pointer">
                                    <option value="White Gold">White Gold</option>
                                    <option value="Yellow Gold">Yellow Gold</option>
                                    <option value="Rose Gold">Rose Gold</option>
                                    <option value="Platinum">Platinum</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="product-name" className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Product Name</label>
                            <input id="product-name" name="name" type="text" placeholder="Identity of Piece" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-slate-200 outline-none text-xs" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="product-price" className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Price (THB)</label>
                            <div className="relative">
                                <RiPriceTag3Line className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent/50" />
                                <input
                                    id="product-price"
                                    name="price_display"
                                    type="text"
                                    value={displayPrice}
                                    onChange={handlePriceChange}
                                    placeholder="price..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-200 outline-none text-xs"
                                    required
                                />
                                <input type="hidden" name="price" value={displayPrice.replace(/,/g, "")} />
                            </div>
                        </div>

                        {/* Diamond Specs */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                            <p className="text-[9px] text-brand-accent tracking-[0.3em] uppercase font-bold flex items-center gap-2">
                                <RiVipDiamondLine /> Diamond Specs
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <label htmlFor="carat" className="sr-only">Carat</label>
                                <input id="carat" name="carat" placeholder="Carat" className="bg-transparent border-b border-white/10 py-2 text-[11px] text-white outline-none focus:border-brand-accent transition-all" />

                                <label htmlFor="color" className="sr-only">Color</label>
                                <input id="color" name="color" placeholder="Color" className="bg-transparent border-b border-white/10 py-2 text-[11px] text-white outline-none focus:border-brand-accent transition-all" />

                                <label htmlFor="clarity" className="sr-only">Clarity</label>
                                <input id="clarity" name="clarity" placeholder="Clarity" className="bg-transparent border-b border-white/10 py-2 text-[11px] text-white outline-none focus:border-brand-accent transition-all" />

                                <label htmlFor="cut" className="sr-only">Cut</label>
                                <input id="cut" name="cut" placeholder="Cut" className="bg-transparent border-b border-white/10 py-2 text-[11px] text-white outline-none focus:border-brand-accent transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="aeo-description" className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AEO Description</label>
                            <textarea id="aeo-description" name="description" rows={3} placeholder="Storytelling for Agentic AI..." className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-slate-200 outline-none text-[11px] resize-none" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading || !previewImage}
                            className="w-full bg-brand-accent text-brand-primary font-bold py-4 rounded-xl uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? "Synchronizing Asset..." : <><RiUploadCloud2Line size={16} /> Deploy Masterpiece</>}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}