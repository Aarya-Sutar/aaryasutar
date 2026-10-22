"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
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
 * Section title with a masked rise (brief 5 #3). Each word rises from its own mask in turn,
 * so titles that wrap onto two lines still read top to bottom.
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
      {children.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="mask mask-word" style={{ "--w": i } as CSSProperties}>
            <span className="mask-inner">{word}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
