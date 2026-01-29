"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
import { Suspense } from "react";

function Model() {

    const materials = useLoader(
        MTLLoader,
        "/models/room/room.mtl",
        (loader) => {
            loader.setResourcePath("/models/room/");
        }
    );

    materials.preload();
    const obj = useLoader(
        OBJLoader,
        "/models/room/room.obj",
        (loader) => {
            loader.setMaterials(materials);

        }
    );

    obj.traverse((child) => {
        if (child.isMesh) {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;
        }
    });
    return <primitive object={obj} scale={1} />;
}

export default function ObjViewer() {
    return (
        <Canvas camera={{ position: [0, 20, 60], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls />
            <Suspense fallback={null}>
            <Model />
            </Suspense>
        </Canvas>
    );
}
