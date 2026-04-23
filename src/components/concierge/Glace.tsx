"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiChat3Line, RiCloseLine, RiVipDiamondLine } from "react-icons/ri";

export default function Glace() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        // [TIMING LOGIC] สุภาพและรู้เวลา
        // 1. แสดงตัวหลังจากเข้าหน้าเว็บ 4 วินาที
        const showTimer = setTimeout(() => {
            setShowBubble(true);
        }, 4000);

        // 2. [UPDATE] หายไปเองภายใน 5 วินาทีถ้าลูกค้าไม่กด เพื่อไม่ให้เกะกะ
        const hideTimer = setTimeout(() => {
            setShowBubble(false);
        }, 9000); // 4s (รอ) + 5s (แสดงผล) = 9s

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    // [STRATEGIC] ปรับ Funnel มุ่งเน้น Conversion ตามแผน Tech-Armory
    const quickActions = [
        { label: "Diamond Investment 2026", link: "/faq/diamond-investment-2026" },
        { label: "Consult Expert", link: "/checkout-demo" },
        { label: "Check Inventory Status", link: "/checkout-demo" }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-4">

            {/* Chat Bubble for Agentic Presence */}
            <AnimatePresence>
                {showBubble && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white/95 backdrop-blur-md text-brand-primary p-4 rounded-2xl rounded-br-none shadow-2xl border border-brand-accent/20 max-w-[240px] relative"
                    >
                        <p className="text-[12px] font-medium leading-relaxed text-slate-800">
                            ต้องการข้อมูลการลงทุนเพชร หรือต้องการให้นำเสนอรายการสินค้าพิเศษไหมคะ?
                        </p>
                        <button
                            onClick={() => setShowBubble(false)}
                            aria-label="Close Greeting Bubble"
                            className="absolute -top-2 -left-2 bg-brand-primary text-white p-1 rounded-full text-[10px] shadow-lg cursor-pointer"
                        >
                            <RiCloseLine />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Agent Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="w-[320px] md:w-[380px] bg-brand-primary border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mb-4"
                    >
                        {/* Header: Boutique Style */}
                        <div className="bg-brand-accent p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                    <RiVipDiamondLine className="text-white text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-brand-primary font-bold text-sm tracking-widest uppercase">Glace Concierge</h4>
                                    <p className="text-[9px] text-brand-primary/70 uppercase tracking-widest">Active 24/7 Service</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close Concierge Window"
                                className="text-brand-primary hover:scale-110 transition-transform cursor-pointer"
                            >
                                <RiCloseLine size={24} />
                            </button>
                        </div>

                        {/* Body: Conversation & Actions */}
                        <div className="p-8 space-y-6">
                            <p className="text-slate-300 text-sm font-light leading-loose">
                                ยินดีต้อนรับค่ะ ดิฉันคือ Glace ผู้ช่วยส่วนตัวที่จะทำให้การครอบครองอัญมณีของคุณเป็นเรื่องง่าย คุณต้องการให้ดิฉันช่วยเรื่องอะไรดีคะ?
                            </p>

                            <div className="space-y-3">
                                {quickActions.map((action, idx) => (
                                    <a
                                        key={idx}
                                        href={action.link}
                                        className="flex items-center justify-between w-full p-4 bg-white/5 border border-white/5 rounded-xl hover:border-brand-accent/50 hover:bg-white/10 transition-all group cursor-pointer"
                                    >
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-200 group-hover:text-brand-accent transition-colors">
                                            {action.label}
                                        </span>
                                        <RiChat3Line className="text-brand-accent opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="px-8 pb-6 text-center">
                            <p className="text-[8px] text-slate-600 uppercase tracking-[0.3em]">
                                Secured by PsyberLink Tech-Armory
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
                className="w-16 h-16 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center shadow-2xl cursor-pointer relative z-[151] border-4 border-brand-primary shadow-brand-accent/20"
                aria-label="Toggle Glace AI Concierge"
            >
                {isOpen ? (
                    <RiCloseLine size={28} />
                ) : (
                    <span className="text-2xl font-bold tracking-tighter">G</span>
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-brand-primary animate-pulse" />
                )}
            </motion.button>

            {/* Comment: Updated auto-hide logic (5s duration) for better UX. G logo & Aria-labels confirmed. */}
        </div>
    );
}