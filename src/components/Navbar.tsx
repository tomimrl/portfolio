"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

// NAVIGATION
const NAV_LINKS = [
    { href: "#intro", label: "Intro" },
    { href: "#about-me", label: "About me" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" }
];

// SOCIAL LINKS
const SOCIAL_LINKS = [
    { href: "https://github.com/tomimrl", icon: "/github_white.svg", alt: "GitHub" },
    { href: "https://www.linkedin.com/in/tomasmerlonetti/", icon: "/linkedin.svg", alt: "LinkedIn" }
];

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function Navbar() {
    // EFFECTS
    // Scroll control and cookie cleanup
    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleBeforeUnload = () => {
            document.cookie = "introSeen=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    // RENDER
    return (
        <motion.nav
            initial={{ y: "-150%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
            onAnimationComplete={() => {
                document.body.style.overflow = "";
            }}
            className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-[5%] h-[clamp(3rem,10vh,5rem)] border-b border-white/20 bg-black/20 backdrop-blur-md"
        >
            {/* LEFT SIDE */}
            <div className="flex-1">
                <h1 className="font-satoshi text-xl font-bold text-white tracking-tight">
                    tomimrl
                </h1>
            </div>

            {/* CENTER SIDE */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[clamp(1rem,4vw,3rem)]">
                {NAV_LINKS.map((link, i) => (
                    <a key={i} href={link.href} className="font-satoshi font-bold text-white/70 transition-colors hover:text-accent text-[clamp(0.75rem,1.5vw,0.875rem)]">
                        {link.label}
                    </a>
                ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-1 items-center justify-end gap-5">
                {SOCIAL_LINKS.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-120"
                    >
                        <Image src={link.icon} alt={link.alt} width={32} height={32} className="w-5 h-5 md:w-8 md:h-8 opacity-70 hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </div>
        </motion.nav>
    );
}