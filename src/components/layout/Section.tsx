import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  tone: "dark" | "light";
  children: ReactNode;
  className?: string;
  /** default vertical rhythm: clamp(4rem, 10vw, 8rem) */
  padded?: boolean;
  labelledBy?: string;
};

/** A full-width band in one of the two tones. `data-tone` lets the nav match its background. */
export function Section({
  id,
  tone,
  children,
  className,
  padded = true,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "dark" ? "tone-dark" : "tone-light",
        padded && "section-pad",
        className,
      )}
    >
      {children}
    </section>
  );
}
