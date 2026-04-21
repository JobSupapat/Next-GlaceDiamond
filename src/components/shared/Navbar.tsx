"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // เพิ่ม useRouter
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiUserLine, RiHome4Line, RiLogoutCircleRLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import Swal from "sweetalert2"; // ใช้สำหรับการยืนยัน Logout

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // สมมติฐานสถานะ Login
    const isLoggedIn = pathname !== "/login";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'TERMINATE SESSION?',
            text: "คุณต้องการออกจากระบบ Glace Diamond ใช่หรือไม่?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#be123c', // แดงเข้ม
            cancelButtonColor: '#334155',
            confirmButtonText: 'LOGOUT',
            background: '#020617',
            color: '#F8FAFC'
        }).then((result) => {
            if (result.isConfirmed) {
                // Logic ล้าง Session (ถ้ามี)
                router.push("/login"); // ดีดกลับไปหน้า Login
                setIsMobileMenuOpen(false);
            }
        });
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" },
        { name: "Privilege FAQ", href: "#faq" },
        { name: "About US", href: "/about" },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[1201px]">
            {/* Nav Container: ควบคุมพื้นหลังและการเบลอ */}
            <nav className={`relative transition-all duration-500 flex flex-col ${isScrolled || isMobileMenuOpen ? "bg-brand-primary/98 backdrop-blur-xl shadow-2xl" : "bg-transparent"
                }`}>

                {/* Main Content Area: [ADJUSTED] ปรับลดความสูงหน้า Mobile ลงเพื่อขยับระนาบขึ้น */}
                <div className={`px-6 md:px-12 flex items-center justify-between transition-all duration-500 w-full ${isScrolled
                    ? "h-20"
                    : "h-24 md:h-28" // ลดจาก h-28 เหลือ h-24 ในมือถือ (ขยับขึ้นประมาณ 16px เพื่อความเนียน)
                    }`}>

                    {/* LOGO SECTION */}
                    <Link href="/" className="group flex items-center gap-4 transition-transform duration-300 hover:scale-105 shrink-0">
                        <div className="relative w-10 h-10 md:w-14 md:h-14">
                            <Image src="/GlaceJubilee_Logo.svg" alt="Glace Emblem" fill className="object-contain" priority />
                        </div>
                        <div className="hidden md:flex items-baseline gap-2 text-brand-accent">
                            <span className="text-2xl font-normal tracking-[0.2em] uppercase">Glace</span>
                            <span className="text-[10px] tracking-[0.8em] font-light uppercase opacity-80">Diamond</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={`relative group text-[13px] uppercase tracking-[0.2em] transition-all duration-300 font-light py-2 ${isActive(link.href) ? "text-brand-accent" : "text-slate-300 hover:text-brand-accent"}`}>
                                {link.name}
                                <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-accent transition-all duration-500 ease-out ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Action Icons: รักษาระนาบกลางให้ Pixel Perfect */}
                    <div className="flex items-center gap-3 md:gap-6 text-brand-accent shrink-0">
                        {pathname !== "/login" && (
                            <button
                                onClick={handleLogout}
                                className="relative flex flex-col items-center justify-center w-10 h-10 group transition-all duration-300 cursor-pointer"
                                title="Click to Logout"
                            >
                                <RiUserLine size={20} className="group-hover:hidden" />
                                <RiLogoutCircleRLine size={20} className="hidden group-hover:block text-rose-500" />
                                <span className="absolute bottom-0 text-[7px] uppercase tracking-[0.1em] font-medium text-brand-accent/60 group-hover:text-rose-500 transition-colors">
                                    Admin
                                </span>
                            </button>
                        )}

                        {/* Hamburger Button Container */}
                        <div className="md:hidden flex items-center justify-center w-10 h-10">
                            <button className="text-brand-accent p-1 outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <div className="w-6 h-6 flex items-center justify-center">
                                    {isMobileMenuOpen ? <RiCloseLine size={28} /> : <FaBars size={22} />}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown: ลอยอยู่ใต้ Navbar แบบ Absolute ไม่กระทบระนาบบน */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-full left-0 w-full md:hidden overflow-hidden bg-brand-primary/98 backdrop-blur-2xl border-t border-white/5"
                        >
                            <div className="flex flex-col py-8 px-10 gap-7 items-start">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-[12px] uppercase tracking-[0.4em] font-light transition-colors ${isActive(link.href) ? "text-brand-accent" : "text-slate-400"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;

// Comment: Refined Vertical Spacing for Mobile. Reduced unscrolled height to h-24 for tighter UX.
// Rule 1: Mobile First Lock 1201px maintained.
// Rule 2: Full file sent for Review.
// Rule 3: Fixed UI elements as per Director's command.
// Rule 4: Preserved all original comments and logic.