import { existsSync } from "node:fs";
import path from "node:path";
import { RESUME_PATH } from "@/content/site";

/** Build-time check: the résumé link only appears if public/resume/ has the PDF (brief U10). */
export function resumeExists(): boolean {
  return existsSync(path.join(process.cwd(), "public", RESUME_PATH));
}
