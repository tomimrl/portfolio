"use client";
import { motion, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

// ------------------------------------------------------------------------------
// INTERACTIVE LOGO COMPONENT
// ------------------------------------------------------------------------------

export default function LogoInteractivo({ scrollProgress }: { scrollProgress: MotionValue<number> }) {

    // REFS & CONSTANTS
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const rafRef = useRef<number>(0);
    const lastFrameRef = useRef<number>(-1);

    const frameCount = 120;

    // ------------------------------------------------------------------------------
    // PRELOAD & CANVAS SETUP
    // ------------------------------------------------------------------------------

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;
        ctxRef.current = ctx;

        const preloadedImages: HTMLImageElement[] = [];
        const dpr = window.devicePixelRatio || 1;

        // LOAD IMAGE SEQUENCE
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `/logo-sequence/${String(i).padStart(4, '0')}.webp`;
            preloadedImages.push(img);

            // INITIAL RENDER
            if (i === 1) {
                img.onload = () => {
                    if (!canvasRef.current || !ctxRef.current) return;

                    const w = img.naturalWidth;
                    const h = img.naturalHeight;

                    canvasRef.current.width = w * dpr;
                    canvasRef.current.height = h * dpr;
                    ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);

                    ctxRef.current.clearRect(0, 0, w, h);
                    ctxRef.current.drawImage(img, 0, 0, w, h);
                    lastFrameRef.current = 0;
                };
            }
        }

        imagesRef.current = preloadedImages;

        // CLEANUP
        return () => {
            cancelAnimationFrame(rafRef.current);
            imagesRef.current = [];
            ctxRef.current = null;
        };
    }, []);

    // ------------------------------------------------------------------------------
    // SCROLL-BOUND RENDER LOOP
    // ------------------------------------------------------------------------------

    useMotionValueEvent(scrollProgress, "change", (latest) => {
        const ctx = ctxRef.current;
        const images = imagesRef.current;

        if (!ctx || images.length === 0) return;

        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * frameCount)
        );

        // PREVENT REDUNDANT RENDERS
        if (frameIndex === lastFrameRef.current) return;

        const currentImage = images[frameIndex];

        // HARDWARE-ACCELERATED DRAW
        if (currentImage?.complete && currentImage.naturalWidth > 0) {
            cancelAnimationFrame(rafRef.current);

            rafRef.current = requestAnimationFrame(() => {
                if (!ctxRef.current) return;

                const w = currentImage.naturalWidth;
                const h = currentImage.naturalHeight;

                ctxRef.current.clearRect(0, 0, w, h);
                ctxRef.current.drawImage(currentImage, 0, 0, w, h);
                lastFrameRef.current = frameIndex;
            });
        }
    });

    // PARABOLIC VERTICAL ARC
    const translateY = useTransform(scrollProgress, [0, 0.5, 1], [0, -100, 0]);

    // ------------------------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------------------------

    return (
        <>
            {/* SVG COLOR MATRIX FOR PURE RED HOVER TINT */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                    <filter id="red-tint-filter" colorInterpolationFilters="sRGB">
                        {/* GRAYSCALE CONVERSION */}
                        <feColorMatrix type="matrix" values="
                            0.2126 0.7152 0.0722 0 0
                            0.2126 0.7152 0.0722 0 0
                            0.2126 0.7152 0.0722 0 0
                            0 0 0 1 0" />
                        {/* RED CHANNEL MAPPING */}
                        <feColorMatrix type="matrix" values="
                            1.2 0 0 0 0
                            0   0 0 0 0
                            0   0 0 0 0
                            0   0 0 1 0" />
                    </filter>
                </defs>
            </svg>

            {/* MAIN CONTAINER */}
            <div className="absolute inset-0 z-10 h-[50vh] w-full md:h-full pointer-events-none md:pointer-events-auto flex items-center justify-center">

                {/* SCROLL TRANSFORM WRAPPER */}
                <motion.div style={{ y: translateY }} className="relative w-full max-w-lg">

                    {/* IDLE ANIMATION WRAPPER (FLOAT & WOBBLE) */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotateZ: [0, 2, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-full h-full flex justify-center cursor-grab active:cursor-grabbing group"
                    >
                        <div className="relative flex items-center justify-center w-full">

                            {/* HARDWARE ACCELERATED CANVAS */}
                            <canvas
                                ref={canvasRef}
                                className="relative z-10 w-full h-auto object-contain transition-all duration-300 group-hover:[filter:url(#red-tint-filter)_drop-shadow(0_0_20px_rgba(255,0,0,0.3))]"
                                style={{ willChange: 'transform, filter' }}
                            />

                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </>
    );
}