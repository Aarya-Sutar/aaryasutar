"use client";

import { useEffect, useState } from "react";

const MIN_DELTA = 8;
const TOP_ZONE = 120;

/** Hides on scroll down (>8px moved, >120px from top), shows on scroll up. */
export function useNavHidden(): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < MIN_DELTA) return;
      setHidden(delta > 0 && y > TOP_ZONE);
      last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
