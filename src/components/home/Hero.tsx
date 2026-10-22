import { preload } from "react-dom";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { IMAGE_WIDTHS, Picture, srcSet } from "@/components/ui/Picture";

// Advance widths of each line in em (Anton, measured), used by the mobile fit rule.
const NAME_FIT: Record<string, number> = { Aarya: 2.345, Sutar: 2.27 };
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

  return (
    <section id="top" data-tone="dark" className="tone-dark hero" aria-labelledby="hero-title">
      <div className="container-x hero-inner">
        <div className="hero-support hero-copy">
          <p className="label flex flex-col gap-1 pt-6 text-muted md:flex-row md:justify-between">
            <span>{hero.metaLeft}</span>
            <span>{hero.metaRight}</span>
          </p>
          <div className="mt-8 lg:mt-[clamp(1.5rem,5svh,3.5rem)] lg:w-[calc((100%-11*var(--grid-gap))*7/12+6*var(--grid-gap))]">
            <h1 id="hero-title" className="headline text-balance text-paper-50">
              {hero.headlineLines.map((line, i) => (
                <span key={line} className="xl:block">
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </h1>
            <p className="body-l mt-5 max-w-[56ch] text-muted">{hero.supporting}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
              <TextLink
                href={site.contact.whatsappUrl}
                external
                arrow="external"
                className="tap type-small"
              >
                {hero.whatsappLink}
              </TextLink>
            </div>
          </div>
        </div>

        <p
          className="hero-name display-xl mt-12 text-paper-50 lg:mt-auto lg:pt-6"
          aria-hidden="true"
        >
          {hero.nameLines.map((line, i) => (
            <span
              key={line}
              className="mask hero-name-line"
              style={{ ["--fit" as string]: NAME_FIT[line] }}
            >
              <span className="mask-inner" style={{ ["--i" as string]: i }}>
                {line}
                {i < hero.nameLines.length - 1 && <span className="hidden lg:inline">&nbsp;</span>}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="hero-portrait">
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
      </div>
    </section>
  );
}
