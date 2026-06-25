"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

interface InfoProyecto {
    year: string;
    title: string;
    description: string;
    tags: string[];
    status: string;
    model3d?: ReactNode;
    image?: string;
}

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function ProjectCard({ year, title, description, tags, status, model3d, image }: InfoProyecto) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl mx-auto rounded-4xl overflow-hidden flex flex-col md:flex-row border border-[#1a1a1a] bg-[#0a0a0a] transition-colors duration-300 hover:border-accent/50 drop-shadow-[0_0_15px_#ffffff30] hover:drop-shadow-[0_0_15px_#c50c0c90]"
        >
            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative border-b md:border-b-0 md:border-r border-[#1a1a1a] bg-[#050505]">
                {model3d ? (
                    // 3D BLOCK
                    <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
                        {model3d}
                    </div>
                ) : (
                    // IMAGE BLOCK
                    image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                        />
                    )
                )}
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">

                {/* YEAR AND TITLE */}
                <span className="font-mono text-accent text-sm mb-4">{year}</span>
                <h3 className="text-3xl font-bold text-[#e8e8e8] mb-6 tracking-tight">
                    {title}
                </h3>

                {/* DESCRIPTION */}
                <p className="font-mono text-[#888888] text-sm leading-relaxed mb-8">
                    {description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="font-mono text-xs text-[#666666] border border-[#1f1f1f] px-3 py-1 bg-[#0a0a0a] hover:text-accent hover:border-accent/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* STATUS */}
                <span className="font-mono text-[#444444] text-xs lowercase">
                    {status}
                </span>
            </div>
        </motion.div>
    );
}