"use client";
import { motion } from "framer-motion";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

const LINKS = [
    { label: "GitHub", href: "https://github.com/tomimrl" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tomasmerlonetti/" },
    { label: "Email", href: "mailto:tomasmerlonetti@gmail.com" }
];

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function Footer() {
    return (
        <footer className="relative z-999 w-full bg-black pt-32 pb-10 px-[5%] md:px-[10%] border-t border-[#1a1a1a] overflow-hidden">

            {/* ------------------------------------------------------------------------------
                CALL TO ACTION
                ------------------------------------------------------------------------------ */}

            <div className="w-full flex flex-col items-center justify-center mb-32">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-[#ff0000] text-sm uppercase tracking-widest mb-6"
                >
                    Have a project in mind?
                </motion.p>

                {/* TITLE */}
                <motion.a
                    href={LINKS[2].href}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-satoshi font-bold text-[clamp(4rem,12vw,12rem)] leading-none text-[#e8e8e8] tracking-tighter hover:text-[#ff0000] transition-colors duration-500 drop-shadow-[0_0_15px_#ffffff30] hover:drop-shadow-[0_0_15px_#c50c0c70]"
                >
                    Let's talk.
                </motion.a>
            </div>

            {/* ------------------------------------------------------------------------------
                BOTTOM BAR
                ------------------------------------------------------------------------------ */}

            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-[#1a1a1a]">

                {/* LOCATION AND COPYRIGHT */}
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-center md:text-left">
                    <span className="font-mono text-[#666] text-xs md:text-sm">
                        © {new Date().getFullYear()} tomimrl.
                    </span>
                    <span className="hidden md:block text-[#333]">•</span>
                    <span className="font-mono text-[#666] text-xs md:text-sm flex items-center gap-2">
                        Rosario, Santa Fe, Argentina.
                    </span>
                </div>

                {/* EXTERNAL LINKS */}
                <nav className="flex items-center gap-6 md:gap-10">
                    {LINKS.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-satoshi font-bold text-[#888] hover:text-white text-sm md:text-base transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}