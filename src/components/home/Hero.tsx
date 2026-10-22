import { preload } from "react-dom";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import { IMAGE_WIDTHS, Picture, srcSet } from "@/components/ui/Picture";
import { HeroDepth } from "./HeroDepth";

// Advance widths of each line in em (Anton, measured with letters set individually),
// used by the mobile fit rule so each line fills the container width.
const NAME_FIT: Record<string, number> = { Aarya: 2.365, Sutar: 2.28 };
const PORTRAIT_SIZES = "(min-width: 1024px) min(54vw, 760px), min(82vw, 520px)";

export function Hero() {
  const { hero } = site;

  preload("/images/generated/aarya-cutout-1144.avif", {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
    imageSrcSet: srcSet("aarya-cutout", IMAGE_WIDTHS.portrait, "avif"),
    imageSizes: PORTRAIT_SIZES,
  });

  // running letter index across both lines, for the stagger
  let letter = 0;

  return (
    <section id="top" data-tone="dark" className="tone-dark hero" aria-labelledby="hero-title">
      <HeroDepth />
      <div className="container-x hero-inner">
        <div className="hero-band">
          <div className="hero-copy hero-support">
            <h1 id="hero-title" className="headline text-paper-50">
              <span className="sr-only">{hero.headline}</span>
              <span aria-hidden="true" className="block">
                {hero.headlineBefore}
              </span>
              <span aria-hidden="true" className="rotator">
                <span className="rotator-track">
                  {[...hero.headlineWords, hero.headlineWords[0]].map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </span>
              </span>
              <span aria-hidden="true" className="block">
                {hero.headlineAfter}
              </span>
            </h1>
            <p className="hero-sub max-w-[42ch] text-muted">{hero.supporting}</p>
            <div className="hero-ctas flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        <p className="hero-name hero-depth display-xl text-paper-50" aria-hidden="true">
          {hero.nameLines.map((line, i) => (
            <span
              key={line}
              className="mask hero-name-line"
              style={{ ["--fit" as string]: NAME_FIT[line] }}
            >
              <span className="mask-inner">
                {[...line].map((ch) => (
                  <span
                    key={letter}
                    className="hero-letter"
                    style={{ ["--l" as string]: letter++ }}
                  >
                    {ch}
                  </span>
                ))}
                {i < hero.nameLines.length - 1 && <span className="hidden lg:inline">&nbsp;</span>}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="hero-portrait">
        <div className="hero-depth">
          <Picture
            name="aarya-cutout"
            widths={IMAGE_WIDTHS.portrait}
            sizes={PORTRAIT_SIZES}
            fallbackSrc="/images/portrait/aarya-cutout.png"
            alt={hero.portraitAlt}
            width={1144}
            height={1158}
            priority
            imgClassName="hero-portrait-img"
          />
          <Badge text={hero.badge} />
        </div>
      </div>
    </section>
  );
}

/** Spinning circular label with a square signal core. Decorative. */
function Badge({ text }: { text: string }) {
  const ring = text.repeat(2).toUpperCase();
  return (
    <div className="hero-badge" aria-hidden="true">
      <svg className="hero-badge-ring" viewBox="0 0 160 160">
        <defs>
          <path id="badge-circle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="389" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="hero-badge-core">
        <ArrowIcon className="rotate-90" />
      </span>
    </div>
  );
}
