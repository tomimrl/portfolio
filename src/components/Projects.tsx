"use client";
import ProjectCard from "@/components/ProjectCard";
import RLmap from "@/components/MapRL";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ------------------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------------------

const PROJECTS = [
    {
        id: "rlweb",
        year: "2026",
        title: "RL Web",
        description: "Web game about cars and football.",
        tags: ["Three.js", "JavaScript", "Blender", "C#"],
        status: "in development",
        model3d: <RLmap />,
        logo: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M10 12H2"></path>
                <path d="M14 12H22"></path>
                <path d="M12 14V22"></path>
            </svg>
        )
    }
];

// ------------------------------------------------------------------------------
// WRAPPER COMPONENT
// ------------------------------------------------------------------------------
const ProjectWrapper = ({ project, setActive }: { project: any, setActive: (id: string) => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -80% 0px" });

    // EFFECTS
    useEffect(() => {
        if (isInView) setActive(project.id);
    }, [isInView, project.id, setActive]);

    // SCROLL
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 20%"]
    });

    // TRANSFORM
    const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

    // RENDER
    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                y,
                transformPerspective: 1000,
                transformOrigin: "center center"
            }}
            className="mb-32 last:mb-0 transform-gpu will-change-[transform,opacity]"
        >
            <ProjectCard
                year={project.year}
                title={project.title}
                description={project.description}
                tags={project.tags}
                status={project.status}
                model3d={project.model3d}
            />
        </motion.div>
    );
};

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function Projects() {
    const [activeSection, setActiveSection] = useState("rlweb");

    // RENDER
    return (
        <section id="projects" className="relative z-20 w-full bg-black py-32 px-[3%] md:px-[10%] border-t border-[#1a1a1a]">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">

                {/* ------------------------------------------------------------------------------
                    SIDEBAR
                    ------------------------------------------------------------------------------ */}

                <div className="w-full md:w-1/3 md:h-screen md:sticky md:top-0 flex flex-col justify-center py-20 z-20">
                    <h2 className="text-5xl font-satoshi md:text-6xl font-bold text-white mb-12 drop-shadow-[0_0_15px_#ffffff80]">Projects.</h2>

                    <nav className="flex flex-col gap-6">
                        {PROJECTS.map((project) => (
                            <div key={project.id} className="flex items-center gap-5 cursor-default">

                                {/* VISUAL INDICATOR */}
                                <motion.div
                                    animate={{
                                        backgroundColor: activeSection === project.id ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 255, 0)",
                                        borderColor: activeSection === project.id ? "rgba(255, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.05)",
                                        scale: activeSection === project.id ? 1 : 0.85,
                                        color: activeSection === project.id ? "#ff0000" : "#555555"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="w-10 h-10 flex-shrink-0 rounded-xl border flex items-center justify-center backdrop-blur-sm"
                                >
                                    {project.logo}
                                </motion.div>

                                {/* PROJECT NAME */}
                                <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${activeSection === project.id ? "text-accent" : "text-[#444]"}`}>
                                    {project.title}
                                </span>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* ------------------------------------------------------------------------------
                    CARDS LIST
                    ------------------------------------------------------------------------------ */}

                <div className="flex flex-col w-full md:w-2/3 md:py-[40vh] pt-[10vh] pb-[20vh] relative z-0">
                    {PROJECTS.map((project) => (
                        <ProjectWrapper
                            key={project.id}
                            project={project}
                            setActive={setActiveSection}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}