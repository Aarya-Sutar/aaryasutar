"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { isOnScreen } from "@/lib/useInView";

type RevealTitleProps = {
  children: string;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/**
 * Section title with a one-line masked rise (brief 5 #3).
 * Server HTML is fully visible; motion is only added after hydration,
 * and only for titles that are still off-screen.
 */
export function RevealTitle({ children, as: Tag = "h2", id, className }: RevealTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isOnScreen(el)) return;
    // Arming after hydration is deliberate: no-JS visitors always see the title.
    setState("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("display-l reveal-title", className)}
      data-reveal={state === "idle" ? undefined : state}
    >
      <span className="mask">
        <span className="mask-inner">{children}</span>
      </span>
    </Tag>
  );
}
