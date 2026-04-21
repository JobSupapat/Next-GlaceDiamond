"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiLockPasswordLine, RiUserLine, RiArrowRightLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react"; // [ADD] NextAuth Client

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("");
    const [isError, setIsError] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsError(false);
        setStatus("Processing...");

        if (!username || !password) {
            setIsError(true);
            setStatus("Please fill in all fields.");
            Swal.fire({
                title: 'Required!',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วนก่อนเข้าสู่ระบบ',
                icon: 'warning',
                confirmButtonColor: '#D4AF37',
                background: '#020617',
                color: '#F8FAFC'
            });
            return;
        }

        try {
            if (isLogin) {
                // [NEXTAUTH] Implementation
                const res = await signIn("credentials", {
                    username,
                    password,
                    redirect: false, // จัดการ Redirect เองผ่าน router.push
                });

                if (res?.ok) {
                    setIsError(false);
                    setStatus("Access Granted!");

                    Swal.fire({
                        title: 'Success!',
                        text: 'เข้าสู่ระบบ Glace Diamond สำเร็จ',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        background: '#020617',
                        color: '#F8FAFC'
                    });

                    setTimeout(() => router.push("/"), 1500);
                } else {
                    setIsError(true);
                    setStatus("Unauthorized Access");
                    Swal.fire({
                        title: 'Error!',
                        text: 'Username หรือ Password ไม่ถูกต้อง',
                        icon: 'error',
                        confirmButtonColor: '#be123c',
                        background: '#020617',
                        color: '#F8FAFC'
                    });
                }
            } else {
                // Register Logic
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                const data = await res.json();
                if (res.ok) {
                    setStatus("Admin Registered! Switching to Login...");
                    setTimeout(() => setIsLogin(true), 2000);
                } else {
                    setIsError(true);
                    setStatus(data.message);
                }
            }
        } catch (err) {
            setIsError(true);
            setStatus("Connection Error");
            Swal.fire({
                title: 'System Failure',
                text: 'ไม่สามารถติดต่อฐานข้อมูลได้',
                icon: 'error',
                background: '#020617',
                color: '#F8FAFC'
            });
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-primary relative overflow-hidden px-6 pt-20">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[450px] z-10"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative w-20 h-20 mb-6 group">
                            <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl group-hover:bg-brand-accent/40 transition-all duration-700" />
                            <Image src="/GlaceJubilee_Logo.svg" alt="Glace Emblem" fill className="object-contain relative z-10" />
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h1 className="text-2xl font-normal tracking-[0.3em] text-brand-accent uppercase">
                                {isLogin ? "Glace" : "Initiate"}
                            </h1>
                            <p className="text-[10px] tracking-[0.6em] text-slate-400 font-light uppercase">
                                {isLogin ? "Diamond" : "System Access"}
                            </p>
                        </div>
                    </div>

                    {/* Status Message with Dynamic Color */}
                    {status && (
                        <p className={`text-[10px] text-center mb-4 tracking-widest uppercase animate-pulse font-medium ${isError ? "text-rose-500" : "text-brand-accent"}`}>
                            {status}
                        </p>
                    )}

                    {/* Auth Form */}
                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="relative">
                            <label className={`text-[9px] lg:text-[12px] uppercase tracking-[0.25em] ml-1 mb-2 block font-medium transition-colors ${isError && !username ? "text-rose-500" : "text-slate-500"}`}>Username</label>
                            <div className="relative group">
                                <RiUserLine className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isError && !username ? "text-rose-500" : "text-brand-accent/40 group-focus-within:text-brand-accent"}`} size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin..."
                                    className={`w-full bg-black/20 border rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none transition-all text-slate-200 placeholder:text-slate-700 font-light ${isError && !username ? "border-rose-500/50 focus:border-rose-500" : "border-white/5 focus:border-brand-accent/30"}`}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className={`text-[9px] lg:text-[12px] uppercase tracking-[0.25em] ml-1 mb-2 block font-medium transition-colors ${isError && !password ? "text-rose-500" : "text-slate-500"}`}>Password</label>
                            <div className="relative group">
                                <RiLockPasswordLine className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isError && !password ? "text-rose-500" : "text-brand-accent/40 group-focus-within:text-brand-accent"}`} size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full bg-black/20 border rounded-xl py-4 pl-12 pr-12 text-sm focus:outline-none transition-all text-slate-200 placeholder:text-slate-700 font-light ${isError && !password ? "border-rose-500/50 focus:border-rose-500" : "border-white/5 focus:border-brand-accent/30"}`}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-accent transition-colors">
                                    {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: isError ? "0 0 20px rgba(244, 63, 94, 0.2)" : "0 0 20px rgba(212, 175, 55, 0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all mt-10 shadow-lg cursor-pointer ${isError ? "bg-rose-700 text-white shadow-rose-900/20" : "bg-brand-accent text-brand-primary shadow-brand-accent/10"}`}
                        >
                            <span className="tracking-[0.2em] uppercase text-[14px]">
                                {isLogin ? "Login" : "Register Owner"}
                            </span>
                            <RiArrowRightLine className="group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                    </form>

                    <div className="mt-10 text-center">
                        <button onClick={() => { setIsLogin(!isLogin); setStatus(""); setIsError(false); }} className="text-[12px] uppercase tracking-[0.3em] text-slate-500 hover:text-brand-accent transition-all duration-300 font-light cursor-pointer">
                            {isLogin ? "Owner Register" : "Return to Login"}
                        </button>
                    </div>
                </div>

                <p className="mt-12 text-center text-[8px] text-slate-700 tracking-[0.3em] uppercase leading-loose opacity-60">
                    Proprietary Interface & Security Framework<br />
                    Developed by PsyberLink Tech-Armory © 2026
                </p>
            </motion.div>
        </main>
    );
}

// Comment: Login/Register logic updated with NextAuth signIn.
// Verified single user record in MongoDB: glace_admin.