"use client";

import { useEffect, useState, type RefObject } from "react";

/** Fires once when the element first reaches `threshold` visibility. */
export function useInViewOnce(ref: RefObject<Element | null>, threshold: number): boolean {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, seen]);

  return seen;
}

/** True if any part of the element is inside the viewport right now. */
export function isOnScreen(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}
