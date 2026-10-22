"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useNavHidden } from "@/lib/useScrollDirection";
import { MobileMenu } from "./MobileMenu";

type Tone = "dark" | "light";

/** The tone of the innermost [data-tone] element under the nav's vertical midpoint. */
function toneUnderNav(): Tone {
  const probe = 32;
  let tone: Tone = "dark";
  document.querySelectorAll<HTMLElement>("[data-tone]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top <= probe && r.bottom > probe) tone = el.dataset.tone as Tone;
  });
  return tone;
}

export function Nav() {
  const scrolledAway = useNavHidden();
  const [tone, setTone] = useState<Tone>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setTone(toneUnderNav());
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const hidden = scrolledAway && !menuOpen && !focusInside;

  return (
    <>
      <header
        className={`site-nav tone-${tone}`}
        data-hidden={hidden}
        onFocus={() => setFocusInside(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false);
        }}
      >
        <nav
          aria-label="Main"
          className="container-x flex h-full items-center justify-between gap-6"
        >
          <Link
            href="/#top"
            className="nav-link text-[1.0625rem] font-extrabold tracking-[-0.01em]"
          >
            {site.name}
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6" role="list">
              {site.nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link type-small">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={site.nav.cta.href} size="sm">
              {site.nav.cta.label}
            </Button>
          </div>
          <button
            type="button"
            className="nav-link font-semibold md:hidden"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            {site.nav.menuOpen}
          </button>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
