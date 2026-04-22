"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiExternalLinkLine, RiShieldFlashLine, RiMapPin2Line, RiTimeLine } from "react-icons/ri";

export default function AboutUS() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="about" className="relative pt-32 pb-12 bg-brand-primary overflow-hidden border-t border-white/5">
            {/* Background Decorative Element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-accent/5 blur-[120px] pointer-events-none" />

            <div className="max-w-[1201px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-24">

                    {/* Column 1: Brand Story */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12">
                                <Image src="/GlaceJubilee_Logo.svg" alt="Glace Jubilee Logo" fill className="object-contain" />
                            </div>
                            <div>
                                <h2 className="text-xl tracking-[0.3em] text-brand-accent uppercase">Glace Jubilee</h2>
                                <p className="text-[8px] tracking-[0.6em] text-slate-500 uppercase">The Art of Eternal Glow</p>
                            </div>
                        </div>
                        <p className="text-sm font-light leading-loose text-slate-400 max-w-md">
                            นิยามใหม่ของความงามเหนือระดับ เราคัดสรรเพชรน้ำงามที่สุด (Rare Spec)
                            ผสานเข้ากับงานดีไซน์ที่อยู่เหนือกาลเวลา เพื่อส่งมอบผลงานชิ้นเอกที่ทรงคุณค่า
                            ทั้งในแง่ของสุนทรียศาสตร์และการลงทุนระดับสากล
                        </p>
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-3 text-slate-500 text-[11px] uppercase tracking-widest">
                                <RiMapPin2Line className="text-brand-accent text-lg" /> Exclusive Showroom, Bangkok, Thailand
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-[11px] uppercase tracking-widest">
                                <RiTimeLine className="text-brand-accent text-lg" /> Private Appointment Only
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Tech Disclosure (The PsyberLink Power) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-accent/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm">
                            <RiShieldFlashLine className="text-brand-accent text-3xl mb-6" />
                            <h3 className="text-white text-lg tracking-[0.3em] uppercase mb-6 font-medium">Agentic AI Ecosystem</h3>
                            <p className="text-lg font-light leading-relaxed text-slate-400 mb-8">
                                เว็บไซต์นี้เป็นส่วนหนึ่งของ **Workshop Demo** เพื่อทดสอบระบบนิเวศดิจิทัล (Digital Ecosystem Architecture)
                            </p>

                            {/* [FIXED] เพิ่ม justify-center เพื่อให้ตัวอักษรอยู่กลางปุ่มพอดี */}
                            <motion.a
                                href="https://psyberlink.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0px 15px 40px rgba(0, 229, 255, 0.25)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-[#00e5ff] via-[#00e5ff] to-[#ff0099] text-black font-bold px-8 py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 transition-all group cursor-pointer"
                            >
                                PsyberLink.com <RiExternalLinkLine size={16} className="group-hover:rotate-45 transition-transform" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] text-slate-600">
                    <div className="text-center md:text-left">
                        © {currentYear} GLACE JUBILEE DIAMOND. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex gap-8 items-center">
                        <Link href="/checkout-demo" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
                        <Link href="/checkout-demo" className="hover:text-brand-accent transition-colors">Terms of Service</Link>
                    </div>
                    <div className="font-bold text-brand-accent/40">
                        Crafted by PsyberLink Tech-Armory
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Rule 1: Mobile First maintained.
// Rule 2: Full file provided with Luxury Styling & Centered Button.
// Rule 4: Fixed Centering while preserving all comments and logic.