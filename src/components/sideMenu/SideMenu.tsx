"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useMenuStore } from "@/lib/store/useZuStore";

const SideMenu = () => {
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<HTMLLIElement[]>([]);
  const enterTimeline = useRef<GSAPTimeline | null>(null);
  const leaveTimeline = useRef<GSAPTimeline | null>(null);
  const isInitialRender = useRef(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    gsap.set(menu, { x: "-100%" });
    gsap.set(listRefs.current, { y: "100%" }); // start text off-screen

    // OPEN animation: slide menu in → text slides up staggered
    enterTimeline.current = gsap
      .timeline({
        paused: true,
        onStart: () => {
          document.body.style.overflowY = "hidden";
        },
      })
      .to(menu, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(
        listRefs.current,
        {
          y: 0,
          ease: "power3.out",
          stagger: 0.13,
          duration: 0.5,
        },
        "-=0.2" // overlap slightly with menu slide
      );

    // CLOSE animation: text slides down → menu slides out
    leaveTimeline.current = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          document.body.style.overflowY = "auto";
        },
      })
      .to(listRefs.current, {
        y: "100%",
        ease: "power3.in",
        stagger: 0.1,
        duration: 0.3,
      })
      .to(menu, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.inOut",
      });

    return () => {
      enterTimeline.current?.kill();
      leaveTimeline.current?.kill();
      enterTimeline.current = null;
      leaveTimeline.current = null;
    };
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (isMenuOpen) {
      enterTimeline.current?.play(0);
    } else {
      leaveTimeline.current?.play(0);
    }
  }, [isMenuOpen]);

  const menuItems = [
    { label: "original", href: "/product/original" },
    { label: "zero", href: "/product/zero" },
    { label: "cherry", href: "/product/cherry" },
    { label: "lemon", href: "/product/lemon" },
    { label: "stevia", href: "/product/stevia" },
    { label: "history", href: "/chronology" },
  ];

  const handleClose = () => {
    closeMenu();
  };

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      closeMenu();
    }
  }, [isMobile, isMenuOpen, closeMenu]);

  return (
    <div
      ref={menuRef}
      className="bg-secondary font-poppins fixed top-20 left-0 z-50 flex h-[calc(100vh-5rem)] w-full translate-x-full transform items-center justify-center"
      role="dialog"
      aria-hidden={!isMenuOpen}
    >
      <ul className="text-primary flex h-full flex-col items-center justify-center gap-6 text-5xl uppercase">
        {menuItems.map((item, i) => (
          <div key={item.label} className="overflow-hidden">
            <li
              ref={(el) => {
                if (el) listRefs.current[i] = el;
              }}
              className="translate-y-full"
            >
              <Link href={item.href} onClick={handleClose}>
                {item.label}
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
