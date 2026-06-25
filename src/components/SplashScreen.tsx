"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

// BASE TEXT
const text = "./tomimrl";
const letters = text.split("");

// ANIMATION VARIANTS
const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.35,
            staggerChildren: 0.08,
        },
    },
};

const letterVariants = {
    hidden: { display: "none", opacity: 0 },
    visible: { display: "inline-block", opacity: 1 },
};

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function SplashScreen() {
    const [isFinished, setIsFinished] = useState(false);

    // EFFECTS
    // Timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFinished(true);
            document.cookie = "introSeen=true; path=/;";
        }, 1450);

        return () => clearTimeout(timer);
    }, []);

    // RENDER
    return (
        <motion.div
            animate={{ y: isFinished ? "-100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white"
        >
            <motion.div
                className="font-mono text-[clamp(2.5rem,6vw,6rem)] text-accent"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* LETTERS RENDER */}
                {letters.map((letter, index) => (
                    <motion.span key={index} variants={letterVariants}>
                        {letter}
                    </motion.span>
                ))}

                {/* FAKE CURSOR */}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: 0.1
                    }}
                >
                    _
                </motion.span>
            </motion.div>
        </motion.div>
    );
}