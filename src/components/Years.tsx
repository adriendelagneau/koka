"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useRef } from "react";

import { sections } from "@/lib/data";

interface YearsProps {
  currentIndex: number;
}

const Years = ({ currentIndex }: YearsProps) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(
    () => {
      liRefs.current.forEach((li, i) => {
        gsap.to(li, {
          scale: i === currentIndex ? 1 : 0.4,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [currentIndex] }
  );

  return (
    <div className="font-poppins text-secondary pointer-events-none sticky top-0 left-0 z-20 -mt-[100vh] flex h-screen w-full items-center justify-center text-9xl font-bold">
      <div className="h-[105px] overflow-hidden">
        <ul
          ref={listRef}
          className="relative transition-transform"
          style={{ transform: `translateY(${-(currentIndex * 105)}px)` }}
        >
          {sections.map((s, i) => (
            <li
              key={i}
              ref={(el) => {
                liRefs.current[i] = el;
              }}
              className="flex h-[105px] -skew-x-12 items-center justify-center p-6"
            >
              {s.year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Years;
