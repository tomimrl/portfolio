"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

// RANDOM EXPANSION OPTIONS
const FLEX_OPTIONS = [
    "md:flex-[1]",
    "md:flex-[1.2]",
    "md:flex-[1.5]",
    "md:flex-[1.8]",
    "md:flex-[2]",
    "md:flex-[2.5]"
];

// SKILLS ARRAY
const SKILLS = [
    ["C", "Haskell", "Python", "JavaScript", "SQL"],
    ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    ["Three.js", "WebGL", "Blender", "3ds Max"],
    ["Git", "Bash", "Vite", "Photoshop"]
];

// ------------------------------------------------------------------------------
// CARD SUBCOMPONENT
// ------------------------------------------------------------------------------

function Card({ skill }: { skill: string }) {
    // RANDOM FLEX STATE
    const [randomFlex, setRandomFlex] = useState("md:flex-[1]");

    // RANDOM FLEX ASSIGNMENT
    useEffect(() => {
        const choice = FLEX_OPTIONS[Math.floor(Math.random() * FLEX_OPTIONS.length)];
        setRandomFlex(choice);
    }, []);

    // RENDER
    return (
        <div className={`group relative w-full md:w-auto ${randomFlex} md:hover:flex-[4] transition-all duration-500 ease-out bg-[#080808] border border-[#1a1a1a] rounded-2xl p-6 hover:-translate-y-2 hover:border-[#ff0000]/40 hover:shadow-[0_15px_40px_-15px_rgba(255,0,0,0.4)] overflow-hidden flex items-center justify-center min-h-[100px] md:min-h-0 cursor-default`}>

            {/* BOTTOM LIGHT */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#ff0000]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

            {/* TEXT */}
            <span className="relative z-10 text-xl md:text-2xl font-bold text-[#666666] group-hover:text-[#e8e8e8] transition-colors duration-300 tracking-tight whitespace-nowrap">
                {skill}
            </span>
        </div>
    );
}

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function Skills() {
    return (
        <section id="skills" className="scroll-mt-24 relative z-20 w-full bg-black py-32 px-[3%] md:px-[5%] border-t border-[#1a1a1a]">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
                <div className="w-full h-[1px] bg-[#1a1a1a]"></div>
            </div>

            {/* BENTO GRID */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="max-w-6xl mx-auto flex flex-col gap-4"
            >
                {/* AUTO RENDER */}
                {SKILLS.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col md:flex-row gap-4 md:h-32">
                        {row.map((skill, skillIndex) => (
                            <Card key={skillIndex} skill={skill} />
                        ))}
                    </div>
                ))}
            </motion.div>
        </section>
    );
}