"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

const sections = [
    {
        id: "dev",
        label: "The Developer",
        text: "I am a developer driven by curiosity and with great attention to detail. My scope is not limited to the web: I build comprehensive digital solutions ranging from interactive interfaces and 3D rendering, to the creation of scripts and software tools. Regardless of the platform, my goal is always to write clean, efficient, and scalable code to solve complex problems in the most elegant way possible.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        )
    },
    {
        id: "vision",
        label: "The Approach",
        text: "My approach is based on hiding the technical complexity behind an impeccable aesthetic. I design high-performance architectures and ultra-optimized logic so that the final result is a premium user experience: visually clean, fluid, and friction-free.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        )
    },
    {
        id: "person",
        label: "The Person",
        text: "I am currently in the 5th year of a technical school in the informatics specialty. I tend to optimize absolutely everything in my life. Outside the screen, I enjoy soccer and cars, especially Japanese cars from the 90s.",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        )
    }
];

// ------------------------------------------------------------------------------
// TEXT ANIMATION COMPONENT
// ------------------------------------------------------------------------------

const TextBlock = ({ content, id, setActive }: { content: string, id: string, setActive: (id: string) => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -80% 0px" });

    // EFFECTS
    useEffect(() => {
        if (isInView) setActive(id);
    }, [isInView, id, setActive]);

    // SCROLL
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 15%"]
    });

    // TRANSFORM VALUES
    const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const rotateZ = useTransform(scrollYProgress, [0, 1], [-2, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

    // RENDER
    return (
        <motion.p
            ref={ref}
            style={{
                rotateX,
                rotateZ,
                opacity,
                y,
                transformPerspective: 1000,
                transformOrigin: "left center"
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold leading-tight mb-32 text-[#c8c8c8] tracking-tight transform-gpu will-change-[transform,opacity]"
        >
            {content}
        </motion.p>
    );
};

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function AboutMe() {
    const [activeSection, setActiveSection] = useState("dev");

    // RENDER
    return (
        <section id="about-me" className="relative w-full bg-black px-[5%] md:px-[10%] border-t border-[#1a1a1a]">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">

                {/* ------------------------------------------------------------------------------
                    SIDEBAR
                    ------------------------------------------------------------------------------ */}

                <div className="w-full md:w-1/3 md:h-screen md:sticky md:top-0 flex flex-col justify-center py-20 z-20">
                    <h2 className="text-5xl font-satoshi md:text-6xl font-bold text-white mb-12 drop-shadow-[0_0_15px_#ffffff80]">About me.</h2>

                    <nav className="flex flex-col gap-6">
                        {sections.map((s) => (
                            <div key={s.id} className="flex items-center gap-5 cursor-default">

                                {/* INDICATOR */}
                                <motion.div
                                    animate={{
                                        backgroundColor: activeSection === s.id ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 255, 0)",
                                        borderColor: activeSection === s.id ? "rgba(255, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.05)",
                                        scale: activeSection === s.id ? 1 : 0.85,
                                        color: activeSection === s.id ? "#ff0000" : "#555555"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="w-10 h-10 flex-shrink-0 rounded-xl border flex items-center justify-center backdrop-blur-sm"
                                >
                                    {/* ICON */}
                                    {s.icon}
                                </motion.div>

                                {/* TITLE*/}
                                <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${activeSection === s.id ? "text-white" : "text-[#444]"}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* ------------------------------------------------------------------------------
                    MAIN TEXT
                    ------------------------------------------------------------------------------ */}

                <div className="w-full md:w-2/3 md:py-[40vh] pt-[20vh] pb-[40vh] relative z-0">
                    {sections.map((s) => (
                        <TextBlock
                            key={s.id}
                            id={s.id}
                            content={s.text}
                            setActive={setActiveSection}
                        />
                    ))}
                </div>
            </div>

            {/* ------------------------------------------------------------------------------
                LENS
                ------------------------------------------------------------------------------ */}

            <div
                className="fixed bottom-0 left-0 w-full h-[35vh] pointer-events-none z-50 backdrop-blur-[4px] bg-black/40 [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)]"
            ></div>

        </section>
    );
}