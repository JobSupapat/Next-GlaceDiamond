"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Hero() {
    const images = [
        "/glace-luxury-diamond-bangle-hero.png",
        "/glace-luxury-diamond-bracelet-hero.png",
        "/glace-luxury-diamond-pendant-hero.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 1.05,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.98,
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
        const timer = setInterval(nextStep, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        /* [ADJUSTED] เปลี่ยน h-[85vh] เป็น min-h และดักจับความสูงเฉพาะกลุ่ม iPhone Tall Screen */
        <section className="relative min-h-[70vh] lg:h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-brand-accent/10 pt-24 pb-12 lg:pb-0 bg-brand-primary">

            {/* BACKGROUND DECORATION */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] z-0" />

            {/* BRAND IDENTITY: [FIXED] แสดงผลจนถึงระดับ lg (1024px) */}
            <div className="lg:hidden flex flex-col items-center mb-4 z-10">
                <h2 className="text-xl font-normal tracking-[0.3em] text-brand-accent uppercase">
                    Glace
                </h2>
                <p className="text-[8px] tracking-[0.6em] text-slate-400 font-light uppercase">
                    Diamond
                </p>
            </div>

            {/* MAIN CAROUSEL CONTAINER */}
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
                                x: { type: "spring", stiffness: 40, damping: 20 },
                                opacity: { duration: 1.2 },
                                scale: { duration: 1.5 }
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`Glace Masterpiece ${currentIndex + 1}`}
                                fill
                                priority
                                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                                sizes="(max-width: 1201px) 100vw, 650px"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* NAVIGATION ARROWS */}
                <button
                    onClick={prevStep}
                    aria-label="Previous Slide"
                    className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 p-2 text-brand-accent/30 hover:text-brand-accent transition-all duration-500 hover:scale-110 active:scale-95 group"
                >
                    <RiArrowLeftSLine className="text-3xl md:text-5xl drop-shadow-lg" />
                </button>
                <button
                    onClick={nextStep}
                    aria-label="Next Slide"
                    className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 p-2 text-brand-accent/30 hover:text-brand-accent transition-all duration-500 hover:scale-110 active:scale-95 group"
                >
                    <RiArrowRightSLine className="text-3xl md:text-5xl drop-shadow-lg" />
                </button>

                {/* PAGINATION DOTS: ปรับระยะห่างให้กระชับขึ้นสำหรับหน้าจอสูง */}
                <div className="mt-4 lg:absolute lg:bottom-10 flex gap-3 md:gap-4 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-[1px] transition-all duration-700 cursor-pointer ${index === currentIndex
                                ? "w-8 md:w-12 bg-brand-accent"
                                : "w-4 md:w-6 bg-brand-accent/20 hover:bg-brand-accent/40"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* VERTICAL DECOR LINE */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-10 md:h-20 bg-gradient-to-b from-brand-accent/30 to-transparent opacity-50" />
        </section>
    );
}

// Rule 1: Mobile First Lock 1201px maintained.
// Rule 2: Full file sent with Adaptive Height Fix for iPhone XR/12Pro/14ProMax.
// Rule 3: Adjusted Padding and min-height to reduce dead space on tall screens.
// Rule 4: Preserved comments and cinematic logic.