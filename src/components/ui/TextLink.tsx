import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ExternalHint, externalProps } from "./ExternalHint";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** "next" adds →, "external" adds ↗ */
  arrow?: "next" | "external" | false;
  /** opens in a new tab with rel="noopener noreferrer" */
  external?: boolean;
  className?: string;
};

export function TextLink({
  href,
  children,
  arrow = false,
  external = false,
  className,
}: TextLinkProps) {
  return (
    <a href={href} className={cn("link", className)} {...(external ? externalProps : {})}>
      {children}
      {arrow === "next" && (
        <span className="link-arrow" aria-hidden="true">
          &nbsp;→
        </span>
      )}
      {arrow === "external" && (
        <span className="link-arrow" aria-hidden="true">
          &nbsp;↗
        </span>
      )}
      {external && <ExternalHint />}
    </a>
  );
}
