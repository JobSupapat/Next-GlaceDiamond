"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Hero() {
    const images = [
        "/glace-luxury-diamond-bangle-hero.png",
        "/glace-luxury-diamond-bracelet-hero.png",
        "/glace-luxury-diamond-pendant-hero.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // [OPTIMIZED] เปลี่ยนจาก Spring เป็น Ease และลดระยะ X เพื่อลดภาระการประมวลผล
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 20 : -20, // ลดระยะวิ่งจาก 50 เป็น 20
            opacity: 0,
            scale: 1.02, // ลดการขยายจาก 1.05 เป็น 1.02
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 20 : -20,
            opacity: 0,
            scale: 0.99,
        }),
    };

    const nextStep = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevStep = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextStep, 6000); // เพิ่มเวลาสไลด์เป็น 6 วินาที ลดความถี่การ Render
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section className="relative min-h-[70vh] lg:h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-brand-accent/10 pt-24 pb-12 lg:pb-0 bg-brand-primary">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] z-0" />

            <div className="lg:hidden flex flex-col items-center mb-4 z-10">
                <h2 className="text-xl font-normal tracking-[0.3em] text-brand-accent uppercase">Glace</h2>
                <p className="text-[8px] tracking-[0.6em] text-slate-400 font-light uppercase">Diamond</p>
            </div>

            <div className="relative w-full max-w-[1201px] flex-1 flex flex-col items-center justify-center px-6 md:px-12">
                <div className="relative w-full max-w-[600px] lg:max-w-[650px] aspect-square flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "tween", ease: "easeOut", duration: 0.5 }, // เปลี่ยนจาก spring เป็น tween
                                opacity: { duration: 0.4 }, // สั้นลงเพื่อให้ UI ตอบสนองไวขึ้น
                                scale: { duration: 0.6 }
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`Glace Masterpiece ${currentIndex + 1}`}
                                fill
                                priority={true}
                                loading="eager"
                                fetchPriority="high"
                                // [OPTIMIZED] ลดขนาด Drop Shadow ลงเพื่อประสิทธิภาพ GPU ในมือถือ
                                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                                sizes="(max-width: 768px) 100vw, 650px"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button onClick={prevStep} aria-label="Previous Slide" className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 p-2 text-brand-accent/30 hover:text-brand-accent transition-all cursor-pointer">
                    <RiArrowLeftSLine className="text-3xl md:text-5xl" />
                </button>
                <button onClick={nextStep} aria-label="Next Slide" className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 p-2 text-brand-accent/30 hover:text-brand-accent transition-all cursor-pointer">
                    <RiArrowRightSLine className="text-3xl md:text-5xl" />
                </button>

                <div className="mt-4 lg:absolute lg:bottom-10 flex gap-3 md:gap-4 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-[2px] transition-all duration-300 cursor-pointer ${index === currentIndex ? "w-8 md:w-12 bg-brand-accent" : "w-4 md:w-6 bg-brand-accent/15"}`}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-10 md:h-20 bg-gradient-to-b from-brand-accent/20 to-transparent opacity-40" />
        </section>
    );
}