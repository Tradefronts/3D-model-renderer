"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";
import { useEffect } from "react";

function FBXModel() {
  // Textures are working properly for the building and warehouse

  // const model = useLoader(FBXLoader, "/models/buildings/Buildings.fbx");
  const model = useLoader(FBXLoader, "/models/warehouse/Warehouse.fbx");


  useEffect(() => {
    model.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // console.log(child.material, "child material");
        //       console.log(child.material.map,"child map");

        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        materials.forEach((material: THREE.Material | null) => {
          //         console.log(material,"material")

          if (!material) return;

          material.side = THREE.DoubleSide;
          if (
            material instanceof THREE.MeshStandardMaterial ||
            material instanceof THREE.MeshPhongMaterial
          ) {
            if (!material.map) {
              material.emissiveIntensity = 0.2;
            }
          }

          material.needsUpdate = true;
        });
      }
    });
  }, [model]);

  return <primitive object={model} scale={0.01} dispose={null} />;
}

export default function FBXViewer() {
  return (
    <div className="h-full">
      <Canvas
        camera={{ position: [0, 20, 40], fov: 75 }}
        shadows
        gl={{
          toneMappingExposure: 2.0,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <hemisphereLight intensity={0.6} />
        <Environment preset="city" />
        <FBXModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
