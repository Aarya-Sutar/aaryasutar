import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  domain: string;
  /** desktop captures are 16:10, mobile 9:19.5 */
  ratio: "desktop" | "mobile";
  children: ReactNode;
  className?: string;
  /** small overlay frame: dots only, no domain */
  compact?: boolean;
};

export function BrowserFrame({
  domain,
  ratio,
  children,
  className,
  compact = false,
}: BrowserFrameProps) {
  return (
    <div className={cn("frame", compact && "frame-compact", className)}>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dot" />
        <span className="frame-dot" />
        <span className="frame-dot" />
        {!compact && <span className="frame-domain">{domain}</span>}
      </div>
      <div
        className="frame-viewport"
        style={{ aspectRatio: ratio === "desktop" ? "16 / 10" : "9 / 19.5" }}
      >
        {children}
      </div>
    </div>
  );
}
