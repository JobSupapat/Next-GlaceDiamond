"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // [ADD] นำเข้า useRouter
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiUserLine, RiLogoutCircleRLine, RiAddCircleLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();
    const router = useRouter(); // [ADD] เรียกใช้ router สำหรับเปลี่ยนหน้ากลับจาก /login
    const { data: session } = useSession();
    const adminRef = useRef<HTMLDivElement>(null);

    // [SPA LOGIC] ฟังก์ชันสำหรับการสไลด์หน้าจอ - แก้ไขปัญหาค้างที่หน้า Login
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        const sectionId = id.replace("#", "");

        // [FIX] หากปัจจุบันไม่ได้อยู่หน้า Home ให้เปลี่ยนหน้ากลับไป Home ก่อน
        if (pathname !== "/") {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            // เปลี่ยนหน้ากลับไป Home พร้อมแนบ Hash เพื่อให้ Browser เลื่อนให้อัตโนมัติ (Native Browser Behavior)
            router.push(`/${id}`);
            return;
        }

        // หากอยู่หน้า Home อยู่แล้ว ให้ทำ Smooth Scroll ตามปกติ
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById(sectionId);

        if (element) {
            setTimeout(() => {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                setActiveSection(sectionId);
            }, 100);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ["home", "collections", "faq", "about"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

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
            observer.disconnect();
        };
    }, [pathname]);

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
        { name: "Home", href: "#home", id: "home" },
        { name: "Collections", href: "#collections", id: "collections" },
        { name: "Privilege FAQ", href: "#faq", id: "faq" },
        { name: "About US", href: "#about", id: "about" },
    ];

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[1201px]">
            <nav className={`relative transition-all duration-500 flex flex-col ${isScrolled || isMobileMenuOpen ? "bg-brand-primary/98 backdrop-blur-xl shadow-2xl" : "bg-transparent"}`}>
                <div className={`px-6 lg:px-12 flex items-center justify-between transition-all duration-500 w-full ${isScrolled ? "h-20" : "h-24 lg:h-28"}`}>

                    {/* LOGO: เพิ่มระบบกลับหน้า Home เมื่ออยู่ที่หน้าอื่น */}
                    <Link href="/" onClick={(e) => scrollToSection(e, "#home")} className="group flex items-center gap-4 transition-transform duration-300 hover:scale-105 shrink-0 z-10">
                        <div className="relative w-10 h-10 lg:w-14 lg:h-14">
                            <Image src="/GlaceJubilee_Logo.svg" alt="Glace Emblem" fill className="object-contain" priority />
                        </div>
                        <div className="hidden lg:flex items-baseline gap-2 text-brand-accent">
                            <span className="text-2xl font-normal tracking-[0.2em] uppercase">Glace</span>
                            <span className="text-[10px] tracking-[0.8em] font-light uppercase opacity-80">Diamond</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => {
                            const isCurrentActive = activeSection === link.id && pathname === "/";
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`relative group text-[13px] uppercase tracking-[0.2em] transition-all duration-300 font-light py-2 ${isCurrentActive ? "text-brand-accent" : "text-slate-300 hover:text-brand-accent"}`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-[1px] bg-brand-accent transition-all duration-500 ease-out ${isCurrentActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6 text-brand-accent shrink-0 z-10">
                        <div className="relative" ref={adminRef}>
                            {session ? (
                                <>
                                    <button
                                        onClick={() => setIsAdminOpen(!isAdminOpen)}
                                        aria-label="Admin Menu"
                                        className="relative flex flex-col items-center justify-center w-10 h-10 group transition-all duration-300 cursor-pointer"
                                    >
                                        <RiUserLine size={20} className={isAdminOpen ? "text-white" : ""} />
                                        <span className="absolute bottom-0 text-[7px] uppercase tracking-[0.1em] font-medium text-brand-accent/60 transition-colors">
                                            Admin
                                        </span>
                                    </button>

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
                                                        href="/add-product"
                                                        onClick={() => setIsAdminOpen(false)}
                                                        className="flex items-center gap-3 px-5 py-4 text-[10px] uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-brand-accent transition-all"
                                                    >
                                                        <RiAddCircleLine size={18} />
                                                        Add Product
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 px-5 py-4 text-[10px] uppercase tracking-widest text-rose-500 hover:bg-rose-500/5 transition-all w-full text-left cursor-pointer"
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
                                <Link href="/login" aria-label="Login" className="relative flex flex-col items-center justify-center w-10 h-10 group transition-all duration-300 cursor-pointer">
                                    <RiUserLine size={20} />
                                </Link>
                            )}
                        </div>

                        <div className="lg:hidden flex items-center justify-center w-10 h-10">
                            <button aria-label="Toggle Mobile Menu" className="text-brand-accent p-1 outline-none cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <div className="w-6 h-6 flex items-center justify-center relative z-[120]">
                                    {isMobileMenuOpen ? <RiCloseLine size={28} /> : <FaBars size={22} />}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-full left-0 w-full lg:hidden overflow-hidden bg-brand-primary/98 backdrop-blur-3xl border-t border-white/5 z-[105] shadow-2xl"
                        >
                            <div className="flex flex-col py-10 px-10 gap-8 items-start relative z-[106]">
                                {navLinks.map((link, index) => {
                                    const isCurrentActive = activeSection === link.id && pathname === "/";
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.08 }}
                                            className="w-full"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={(e) => scrollToSection(e, link.href)}
                                                className={`text-[14px] uppercase tracking-[0.4em] font-light transition-colors block w-full py-2 pointer-events-auto ${isCurrentActive ? "text-brand-accent" : "text-slate-400 active:text-brand-accent"}`}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;

// Rule 2: Full file provided with Navigation Redirect Fix.
// Rule 3: Fixed logical error where clicking menu items on /login didn't redirect back to Home.
// Rule 4: Preserved comments and refined mobile/desktop interaction logic.