"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment, Center } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSpring, MotionValue } from "framer-motion";

// ------------------------------------------------------------------------------
// MODEL AND PHYSICS
// ------------------------------------------------------------------------------

function Modelo({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const { scene } = useGLTF("/logo.glb");
    const logoRef = useRef<THREE.Group>(null);

    // STATE AND SMOOTH ANIMATION
    const smoothScroll = useSpring(scrollProgress, { damping: 20, stiffness: 100 });
    const [hovered, setHover] = useState(false);

    // PHYSICS PER FRAME
    useFrame((state, delta) => {
        if (logoRef.current) {
            const progress = smoothScroll.get();
            const targetY = progress * (Math.PI * 2);

            logoRef.current.rotation.y = THREE.MathUtils.lerp(
                logoRef.current.rotation.y,
                targetY,
                delta * 10
            );

            logoRef.current.position.y = Math.sin(progress * Math.PI) * 1.5;
        }
    });

    // HOVER EFFECT
    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (hovered) {
                    child.material.color.set("#ff0000");
                } else {
                    child.material.color.set("#ffffff");
                }
            }
        });
    }, [hovered, scene]);

    // RENDER
    return (
        <Center>
            <group ref={logoRef}>
                <primitive
                    object={scene}
                    scale={6}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                />
            </group>
        </Center>
    );
}

// ------------------------------------------------------------------------------
// MAIN COMPONENT AND ENVIRONMENT
// ------------------------------------------------------------------------------

export default function Logo3D({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    return (
        <div className="absolute inset-0 z-10 h-full w-full pointer-events-none md:pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>

                {/* LIGHTS */}
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 10, -5]} intensity={0.5} />

                {/* 3D SCENE */}
                <Suspense fallback={null}>
                    <Float speed={3} rotationIntensity={1.2}>
                        <Modelo scrollProgress={scrollProgress} />
                    </Float>
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}