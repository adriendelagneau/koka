"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ProductTitle = ({ name = "original" }: { name?: string }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const titleContainerRef = useRef(null);
  const subRef = useRef(null);

  useGSAP(() => {
    const refs = [ref1, ref2, ref3, ref4, ref5];
    const translateYValues = ["100%", "200%", "300%", "400%", "500%"];

    refs.forEach((ref, index) => {
      gsap.to(ref.current, {
        translateY: translateYValues[index],
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: titleContainerRef.current,
          start: "top 5%",
          end: "bottom 99%",
          toggleActions: "play none none reverse"

        },
      });
    });
  }, []);

  return (
    <div
      ref={titleContainerRef}
      className="absolute  z-0 top-24 left-0 h-screen w-full"
      id="singleTtitle"
    >
      <div ref={subRef} className="relative">
        <div
          className={
            "text-secondary font-poppins absolute top-0 left-1/2 z-10 -translate-x-1/2 text-9xl uppercase opacity-100"
          }
        >
          {name}
        </div>
        <div
          ref={ref1}
          className={
            "text-stroke text-stroke-secondary text-primary font-poppins absolute top-0 left-1/2 -translate-x-1/2 text-9xl uppercase opacity-70"
          }
        >
          {name}
        </div>
        <div
          ref={ref2}
          className={
            "text-stroke text-stroke-secondary text-primary font-poppins absolute top-0 left-1/2 -translate-x-1/2 text-9xl uppercase opacity-50"
          }
        >
          {name}
        </div>
        <div
          ref={ref3}
          className={
            "text-stroke text-stroke-secondary text-primary font-poppins absolute top-0 left-1/2 -translate-x-1/2 text-9xl uppercase opacity-30"
          }
        >
          {name}
        </div>
        <div
          ref={ref4}
          className={
            "text-stroke text-stroke-secondary text-primary font-poppins absolute top-0 left-1/2 -translate-x-1/2 text-9xl uppercase opacity-10"
          }
        >
          {name}
        </div>
        <div
          ref={ref5}
          className={
            "text-stroke text-stroke-secondary text-primary font-poppins absolute top-0 left-1/2 -translate-x-1/2 text-9xl uppercase opacity-5"
          }
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProductTitle;
