import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./Icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = variant === "primary",
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "btn",
        variant === "primary" ? "btn-primary" : "btn-secondary",
        size === "sm" && "btn-sm",
        className,
      )}
    >
      <span>{children}</span>
      {arrow && <ArrowIcon className="btn-arrow" />}
    </a>
  );
}
