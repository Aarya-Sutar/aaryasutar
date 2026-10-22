import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, concept = false }: { children: ReactNode; concept?: boolean }) {
  return <span className={cn("tag label", concept && "tag-concept")}>{children}</span>;
}
