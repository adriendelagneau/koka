"use client";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";

type SceneProps = {
  flavor: "original" | "cherry" | "zero"; // Restrict flavor to these specific strings
};

const Scene = ({ flavor }: SceneProps) => {
  // Ensure flavor matches FlavorType

  const canRef = useRef<Group>(null);

  useGSAP(() => {
    if (canRef.current) {
      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".product-cherry",
          start: "top 30%",
        },
      });

      scrollTL.fromTo(
        canRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.6,
          ease: "back.out",
        }
      );
    }
  });

  return (
    <>
      <group rotation={[0, 0, -0.2]} position={[1.7, 0, 0]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={1}
          floatIntensity={1}
          floatSpeed={4}
        ></FloatingCan>
        <directionalLight
          position={[0, 0, 5]}
          intensity={0.7}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <ambientLight intensity={10} />
        <pointLight position={[-0, 1, 3]} intensity={6} />
        <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.5} />
      </group>
    </>
  );
};

export default Scene;
