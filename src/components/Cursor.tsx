"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ------------------------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------------------------

const dotSpringConfig = { damping: 50, stiffness: 1000, mass: 0.1 };
const ringSpringConfig = { damping: 25, stiffness: 300, mass: 0.5 };

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function CustomCursor() {
    // VALUES
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // SPRING ANIMATIONS
    const dotX = useSpring(mouseX, dotSpringConfig);
    const dotY = useSpring(mouseY, dotSpringConfig);
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    // EFFECTS
    // Track mouse movement
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    // RENDER
    return (
        <>
            {/* DOT */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] hidden [@media(pointer:fine)]:block h-3 w-3 -ml-[6px] -mt-[6px] rounded-full bg-accent mix-blend-difference"
                style={{ x: dotX, y: dotY }}
            />

            {/* RING */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] hidden [@media(pointer:fine)]:block h-8 w-8 -ml-[16px] -mt-[16px] rounded-full border border-accent/30"
                style={{ x: ringX, y: ringY }}
            />
        </>
    );
}