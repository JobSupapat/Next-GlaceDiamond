"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiUserLine, RiLogoutCircleRLine, RiAddCircleLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false); // [ADD] ควบคุม Admin Dropdown
    const pathname = usePathname();
    const { data: session } = useSession();
    const adminRef = useRef<HTMLDivElement>(null); // [ADD] สำหรับดักจับการคลิกด้านนอก

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        // ดักจับการคลิกด้านนอกเพื่อปิด Admin Dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
                setIsAdminOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        setIsAdminOpen(false);
        Swal.fire({
            title: 'TERMINATE SESSION?',
            text: "คุณต้องการออกจากระบบ Glace Diamond ใช่หรือไม่?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#be123c',
            cancelButtonColor: '#334155',
            confirmButtonText: 'LOGOUT',
            cancelButtonText: 'NO',
            background: '#020617',
            color: '#F8FAFC'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut({ callbackUrl: "/" });
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
            <nav className={`relative transition-all duration-500 flex flex-col ${isScrolled || isMobileMenuOpen ? "bg-brand-primary/98 backdrop-blur-xl shadow-2xl" : "bg-transparent"}`}>
                <div className={`px-6 md:px-12 flex items-center justify-between transition-all duration-500 w-full ${isScrolled ? "h-20" : "h-24 md:h-28"}`}>

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

                    {/* Action Icons */}
                    <div className="flex items-center gap-3 md:gap-6 text-brand-accent shrink-0">

                        {/* [UPDATE] Admin Management Gateway */}
                        <div className="relative" ref={adminRef}>
                            {session ? (
                                <>
                                    <button
                                        onClick={() => setIsAdminOpen(!isAdminOpen)}
                                        className="relative flex flex-col items-center justify-center w-10 h-10 group transition-all duration-300 cursor-pointer"
                                    >
                                        <RiUserLine size={20} className={isAdminOpen ? "text-white" : ""} />
                                        <span className="absolute bottom-0 text-[7px] uppercase tracking-[0.1em] font-medium text-brand-accent/60 transition-colors">
                                            Admin
                                        </span>
                                    </button>

                                    {/* Admin Dropdown Menu [Luxury Glassmorphism] */}
                                    <AnimatePresence>
                                        {isAdminOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-4 w-48 bg-brand-primary/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[110]"
                                            >
                                                <div className="flex flex-col py-2">
                                                    <Link
                                                        href="/admin/add-product"
                                                        onClick={() => setIsAdminOpen(false)}
                                                        className="flex items-center gap-3 px-5 py-4 text-[10px] uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-brand-accent transition-all"
                                                    >
                                                        <RiAddCircleLine size={18} />
                                                        Add Product
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 px-5 py-4 text-[10px] uppercase tracking-widest text-rose-500 hover:bg-rose-500/5 transition-all w-full text-left"
                                                    >
                                                        <RiLogoutCircleRLine size={18} />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link href="/login" className="relative flex flex-col items-center justify-center w-10 h-10 group transition-all duration-300 cursor-pointer">
                                    <RiUserLine size={20} />
                                </Link>
                            )}
                        </div>

                        {/* Hamburger Button */}
                        <div className="md:hidden flex items-center justify-center w-10 h-10">
                            <button className="text-brand-accent p-1 outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <div className="w-6 h-6 flex items-center justify-center">
                                    {isMobileMenuOpen ? <RiCloseLine size={28} /> : <FaBars size={22} />}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Links */}
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
// Rule 3: Fixed UI elements as per Director's command. Added Admin Dropdown for CRUD entry.
// Rule 4: Preserved all original comments and logic.