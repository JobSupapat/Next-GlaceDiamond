"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Glace() {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        // ลูกเล่น: แสดงข้อความทักทายหลังเข้าเว็บ 3 วินาที
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 3000);

        // ซ่อนข้อความอัตโนมัติหลัง 8 วินาที
        const hideTimer = setTimeout(() => {
            setShowMessage(false);
        }, 11000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="bg-white text-brand-primary p-4 rounded-xl rounded-br-none shadow-xl max-w-xs border border-slate-200"
                    >
                        <p className="text-sm font-light leading-relaxed">
                            สวัสดีค่ะ ยินดีต้อนรับสู่ Glace Jubilee นะคะ หากมีข้อสงสัยเกี่ยวกับเครื่องประดับชิ้นไหน สอบถาม **Glace** ได้ตลอดเวลาเลยนะคะ ยินดีให้บริการค่ะ 😊
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                onClick={() => setShowMessage(!showMessage)} // คลิกเพื่อเปิด/ปิดข้อความ
            >
                {/* Placeholder for Glace Icon/Avatar */}
                <span className="text-xs text-brand-primary font-bold tracking-wider">GLACE</span>
            </motion.div>

            {/* Comment: AI Persona 'Glace' initialized. Polite, helpful, smiling. Interaction logic TBD. */}
        </div>
    );
}