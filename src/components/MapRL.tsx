"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment, Center } from "@react-three/drei";
import { Suspense, useRef } from "react";

// ------------------------------------------------------------------------------
// MODEL AND PHYSICS
// ------------------------------------------------------------------------------

function Model() {
    // REFERENCES AND LOAD
    const { scene } = useGLTF("/maprl.glb");
    const mapRef = useRef<THREE.Group>(null);

    // PHYSICS PER FRAME
    // Infinite rotation
    useFrame((_, delta) => {
        if (mapRef.current) {
            mapRef.current.rotation.y += delta * 0.2;
        }
    });

    // RENDER
    return (
        <Center>
            <group ref={mapRef}>
                <primitive
                    object={scene}
                    scale={1}
                />
            </group>
        </Center>
    );
}

// ------------------------------------------------------------------------------
// MAIN COMPONENT AND ENVIRONMENT
// ------------------------------------------------------------------------------

export default function MapRL() {
    return (
        <div className="absolute inset-0 z-10 h-full w-full pointer-events-none md:pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>

                {/* LIGHTS */}
                <ambientLight intensity={0.5} />

                {/* 3D SCENE */}
                <Suspense fallback={null}>
                    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
                        <Model />
                    </Float>
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}