"use client";
import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Logo3d from "@/components/Logo3d";

// ------------------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------------------

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const [blocked, setBlocked] = useState(true);

    // EFFECTS
    useEffect(() => {
        if (blocked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [blocked]);

    // RENDER
    return (
        <section id="inicio" className="relative w-full h-[200vh]" ref={ref}>
            <div className="sticky top-0 z-20 grid h-screen w-full grid-cols-1 md:grid-cols-2 items-center px-[3%] md:px-[5%] bg-neutral-950">

                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>

                {/* PRESENTATION */}
                <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left relative z-20 -mt-20 md:mt-0">
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
                        className="font-space text-[clamp(2rem,6vw,4rem)] font-bold text-[#2a2a2a] leading-none [-webkit-text-stroke:1px_#2a2a2a] mt-40 md:mt-0"
                    >
                        Software Engineer
                    </motion.div>

                    <motion.h1
                        initial={{ x: "-200%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        transition={{ delay: 2.3, duration: 1, ease: "easeInOut" }}
                        className="font-space w-fit text-[clamp(3rem,7vw,8rem)] font-bold leading-none tracking-tighter text-[#e8e8e8] transition-all duration-300 ease-out hover:scale-105 hover:text-accent drop-shadow-[0_0_15px_#ffffff60] hover:drop-shadow-[0_0_15px_#c50c0c90]"
                    >
                        Tomás Merlonetti
                    </motion.h1>
                </div>

                {/* 3D MODEL CONTAINER */}
                <motion.div
                    initial={{ y: "-200%", x: "200%", opacity: 0 }}
                    animate={{ x: "0%", y: "0%", opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
                    onAnimationComplete={() => setBlocked(false)}
                    className="relative h-[50vh] w-full md:h-full"
                >
                    <Logo3d scrollProgress={scrollYProgress} />
                </motion.div>
            </div>
        </section>
    );
}