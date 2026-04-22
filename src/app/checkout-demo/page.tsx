"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiRobot2Line, RiExternalLinkLine, RiArrowLeftLine, RiShieldFlashLine, RiSparklingLine } from "react-icons/ri";

export default function CheckoutDemoPage() {
    return (
        /* [ADJUSTED] เปลี่ยนพื้นหลังเป็น --color-psy-black: #050505 สนิท */
        <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 pt-20 relative overflow-hidden">

            {/* [NEW] กราฟิกพื้นหลังแบบ Glitch-Tech (Neon Cyan & Pink Glow) */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#00e5ff]/10 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#ff0099]/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* [ADJUSTED] ปรับ Container ให้เป็น Luxury Glassmorphism ที่ตัดกับพื้นดำ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl w-full bg-white/[0.01] backdrop-blur-xl border border-white/5 p-12 md:p-16 rounded-[2.5rem] text-center shadow-3xl shadow-black relative z-10"
            >
                {/* [NEW] เพิ่ม Icon sparkling เล็กน้อยเพื่อสะท้อน Glace */}
                <div className="flex justify-center mb-12">
                    <motion.div
                        className="relative"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {/* [ADJUSTED] เปลี่ยน Icon สี --color-psy-cyan: #00e5ff */}
                        <RiRobot2Line className="text-[#00e5ff] text-7xl animate-bounce" aria-hidden="true" />
                        <RiSparklingLine className="absolute -top-3 -right-3 text-[#ff0099] text-3xl opacity-60" />
                    </motion.div>
                </div>

                {/* [ADJUSTED] ปรับ Header และ Subheader */}
                <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white uppercase leading-relaxed mb-8">
                    Agentic AI <br />
                    <span className="text-[#00e5ff] font-medium tracking-[0.1em]">Ecosystem Demo</span>
                </h1>

                <div className="space-y-6 mb-12 border-y border-white/5 py-8">
                    <p className="text-slate-300 text-sm md:text-base font-light leading-loose tracking-wide">
                        ขอบคุณที่สนใจผลงานชิ้นนี้ครับ หน้าจอนี้คือส่วนหนึ่งของการทดสอบระบบ <br className="hidden md:block" />
                        &ldquo;หาเงิน 24/7&rdquo; โดยใช้ Agentic AI ทำงานร่วมกับ Automation Ecosystem
                    </p>
                    {/* [ADJUSTED] เพิ่มสี --color-psy-pink: #ff0099 เล็กน้อยเพื่อความ Disruptive */}
                    <div className="flex items-center justify-center gap-4 text-[12px] uppercase tracking-[0.4em] text-slate-500 hover:text-[#ff0099] transition-colors">
                        <RiShieldFlashLine /> เชิญชมเทคโนโลยี <span className="text-[#00e5ff]">PsyberLink Tech</span> ที่
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* [ADJUSTED] ปุ่ม CTA แบบ Neon Gradient (Cyan -> Pink) */}
                    <motion.a
                        href="https://psyberlink.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0px 15px 40px rgba(0, 229, 255, 0.25)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-[#00e5ff] via-[#00e5ff] to-[#ff0099] text-brand-primary font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all group cursor-pointer"
                        aria-label="Visit PsyberLink.com - Transform Business with AI"
                    >
                        <span className="uppercase tracking-[0.3em] text-[13px] text-black">PsyberLink.com</span>
                        <RiExternalLinkLine className="text-xl text-black group-hover:rotate-45 transition-transform" />
                    </motion.a>

                    {/* [ADJUSTED] กลับสู่หน้า Glace ใช้สีทองอ่อนๆ ตัดกับดำ */}
                    <Link
                        href="/"
                        className="text-slate-500 hover:text-brand-accent text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-colors cursor-pointer group"
                    >
                        <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" /> Return to Glace Gallery
                    </Link>
                </div>
            </motion.div>

            {/* Footer Tag */}
            <p className="absolute bottom-10 text-[8px] text-slate-800 tracking-[0.5em] uppercase opacity-70">
                Advanced Digital Architecture © 2026 | Built for Conversion
            </p>
        </main>
    );
}

// Rule 1: Mobile First maintained.
// Rule 2: Full file sent with Prime PsyberLink Identity Integration.
// Rule 3: No other components changed.
// Rule 4: Preserved comments, entities, and conversion mission.