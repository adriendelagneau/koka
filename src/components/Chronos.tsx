"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

import { sections } from "@/lib/data";

import Years from "./Years";

gsap.registerPlugin(ScrollTrigger);

const Chronos: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    const triggers = sectionsRef.current.map((section, index) =>
      ScrollTrigger.create({
        trigger: section!,
        start: "top 20%", // Triggers slightly before center for smoother sync
        onEnter: () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setCurrentIndex(index), 50);
        },
        onEnterBack: () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setCurrentIndex(index), 50);
        },
        // markers: true,
      })
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 🔁 Force sync on first render (fixes initial mismatch)
  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  return (
    <div className="relative w-full">
      <Years currentIndex={currentIndex} />
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          id={section.id}
          className="font-poppins relative h-screen w-full px-6 text-6xl uppercase"
          role="region"
          aria-label={`Section for the year ${section.year}`}
        >
          {index % 2 === 0 ? (
            <>
              <div className="text-secondary absolute top-1/2 left-[20%] w-[480px] -translate-x-1/2 -translate-y-1/2 -rotate-3 transform">
                {section.text}
              </div>
              <div className="bg-secondary absolute top-1/2 left-[80%] w-[500px] -translate-x-1/2 -translate-y-1/2 rotate-6 transform rounded-sm border border-secondary p-2 pt-2 pb-6 shadow-md">
                <Image
                  src={section.image}
                  alt={`Image for ${section.year}`}
                  width={500}
                  height={413}
                  className="h-auto w-full object-cover sepia-70"
                />
              </div>
            </>
          ) : (
            <>
              <div className="bg-secondary absolute top-1/2 right-[80%] w-[480px] translate-x-1/2 -translate-y-1/2 -rotate-6 transform rounded-sm border border-secondary p-2 pt-2 pb-6 shadow-md">
                <Image
                  src={section.image}
                  alt={`Image for ${section.year}`}
                  width={500}
                  height={413}
                  className="h-auto w-full object-cover sepia-70"
                />
              </div>
              <div className="text-secondary absolute top-1/2 left-[80%] w-96 -translate-x-1/2 -translate-y-1/2 rotate-3 transform">
                {section.text}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chronos;
