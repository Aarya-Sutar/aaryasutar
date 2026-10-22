"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Pointer depth for the hero: writes --mx / --my (-1…1) on the section so the portrait
 * and the name drift against each other. Fine pointers only; off for reduced motion.
 */
export function HeroDepth() {
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      hero.style.setProperty("--mx", x.toFixed(3));
      hero.style.setProperty("--my", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 2 - 1;
      y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
