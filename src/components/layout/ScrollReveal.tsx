"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { isOnScreen } from "@/lib/useInView";

/**
 * Scroll reveals for every [data-reveal] element. Server HTML is fully visible; after
 * hydration, elements that are still off-screen are hidden ("is-armed") and rise in
 * ("is-in") when they scroll into view. Set --d on an element to stagger it.
 * Reduced motion: nothing is armed.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("is-armed");
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
      if (isOnScreen(el)) return;
      el.classList.add("is-armed");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
