"use client";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";
import { useMeshStore } from "@/lib/store/useZuStore";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const isReady = useMeshStore((state) => state.isReady);

  const can1Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 4;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can1GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    const mm = gsap.matchMedia();

    mm.add("(max-width: 799px)", () => {
      if (!can1Ref.current || !can3Ref.current || !can4Ref.current) return;

      // ✅ Set initial states
      gsap.set(can1Ref.current.position, { x: 0, y: -0.6 });
      gsap.set(can1Ref.current.scale, { x: 0, y: 0, z: 0 }); // collapsed initially

      gsap.set(can3Ref.current.position, { y: 5, z: -1 });
      gsap.set(can4Ref.current.position, { x: 2, y: -4.5, z: 2 });

      // ✅ Intro scale animation
      if (window.scrollY < 20) {
        gsap.to(can1Ref.current.scale, {
          x: 0.6,
          y: 0.6,
          z: 0.6,
          duration: 1,
          ease: "back.out(1)",
          delay: 1.6,
        });
      }
    });

    mm.add("(min-width: 800px)", () => {
      // Set can starting location
      gsap.set(can1Ref.current!.position, { x: 1.7, y: -0.1 });
      gsap.set(can1Ref.current!.rotation, { z: -0.1 });

      gsap.set(can3Ref.current!.position, { y: 5, z: -1 });
      gsap.set(can4Ref.current!.position, { x: 2, y: -4.5, z: 2 });

      // Intro animation
      const introTL = gsap.timeline({
        defaults: {
          duration: 1,
          delay: 1.3,
          ease: "back.out(1)",
        },
      });

      if (window.scrollY < 20) {
        introTL
          .from(can1GroupRef.current!.position, { y: 5, x: 1 }, 0)
          .from(can1GroupRef.current!.rotation, { z: 3 }, 0);
      }

      // Scroll animation
      const scrollTL = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTL
        .to(groupRef.current!.rotation, { y: Math.PI * 2 })
        .to(can1Ref.current!.position, { x: 0.1 }, 0)
        .to(can1Ref.current!.rotation, { z: 0 }, 0)
        .to(can3Ref.current!.position, { x: 0.8, y: 0, z: -0.8 }, 0)
        .to(can3Ref.current!.rotation, { z: -0.3 }, 0)
        .to(can4Ref.current!.position, { x: -0.5, y: 0, z: -0.5 }, 0)
        .to(can4Ref.current!.rotation, { z: 0.3 }, 0)
        .to(
          groupRef.current!.position,
          { x: 1, duration: 3, ease: "sine.inOut" },
          1.3
        );
    });

    return () => mm.revert(); // ✅ clean up matchMedia and ScrollTriggers
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="original" floatSpeed={FLOAT_SPEED} />
      </group>

      <FloatingCan ref={can3Ref} flavor="zero" floatSpeed={FLOAT_SPEED} />
      <FloatingCan ref={can4Ref} flavor="cherry" floatSpeed={FLOAT_SPEED} />

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
  );
}

export default Scene;
