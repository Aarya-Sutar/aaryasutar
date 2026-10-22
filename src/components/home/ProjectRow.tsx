import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { type Project, projectDomain } from "@/content/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { IMAGE_WIDTHS, Picture, generatedName } from "@/components/ui/Picture";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type ProjectRowProps = { project: Project; index: number };

export function ProjectRow({ project: p, index }: ProjectRowProps) {
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const titleId = `project-${p.slug}`;

  return (
    <article
      aria-labelledby={titleId}
      className="project-row relative grid gap-y-10 py-12 lg:grid-12 lg:items-center lg:py-16"
    >
      {/* Image: columns 1–7 (or 6–12 when flipped) */}
      <div
        data-reveal="clip"
        className={cn(
          "project-shot relative mb-6 min-w-0 lg:mb-0 lg:row-start-1",
          flip ? "lg:col-start-6 lg:col-end-13" : "lg:col-start-1 lg:col-end-8",
        )}
      >
        <BrowserFrame domain={projectDomain(p)} ratio="desktop">
          {p.media.desktop ? (
            <Picture
              name={generatedName(p.media.desktop.src)}
              widths={IMAGE_WIDTHS.desktop}
              sizes="(min-width: 1440px) 760px, (min-width: 1024px) 54vw, 92vw"
              fallbackSrc={p.media.desktop.src}
              alt={p.media.desktop.alt}
              width={p.media.desktop.width}
              height={p.media.desktop.height}
              className="h-full"
            />
          ) : p.media.video ? (
            <Picture
              name={generatedName(p.media.video.poster)}
              widths={IMAGE_WIDTHS.poster}
              sizes="(min-width: 1440px) 760px, (min-width: 1024px) 54vw, 92vw"
              fallbackSrc={p.media.video.poster}
              alt={p.media.video.posterAlt}
              width={1196}
              height={668}
              className="h-full"
            />
          ) : null}
        </BrowserFrame>
        {p.media.mobile && (
          <BrowserFrame
            domain={projectDomain(p)}
            ratio="mobile"
            compact
            className="absolute -bottom-6 w-[22%] min-w-[72px] -right-2 sm:-right-4 lg:-right-6"
          >
            <Picture
              name={generatedName(p.media.mobile.src)}
              widths={IMAGE_WIDTHS.mobile}
              sizes="(min-width: 1024px) 170px, 22vw"
              fallbackSrc={p.media.mobile.src}
              alt={p.media.mobile.alt}
              width={p.media.mobile.width}
              height={p.media.mobile.height}
              className="h-full"
            />
          </BrowserFrame>
        )}
      </div>

      {/* Text: columns 8–12 (or 1–5 when flipped) */}
      <div
        data-reveal
        style={{ "--d": 1 } as CSSProperties}
        className={cn(
          "lg:row-start-1",
          flip ? "lg:col-start-1 lg:col-end-6" : "lg:col-start-8 lg:col-end-13",
        )}
      >
        <span className="numeral numeral-stroke" aria-hidden="true">
          {number}
        </span>
        <h3 id={titleId} className="title-text mt-4 text-[clamp(2rem,3.4vw,3rem)]">
          <span className="underline-draw">{p.name}</span>
        </h3>
        <ul role="list" className="mt-4 flex flex-wrap gap-2">
          <li>
            <Tag concept={p.isConcept}>{p.kind}</Tag>
          </li>
          {p.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        {p.isConcept && <p className="type-small mt-3 text-muted">{site.work.conceptDisclosure}</p>}
        <p className="mt-5">{p.summary}</p>
        <ul role="list" className="type-small mt-4 flex flex-col gap-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="text-muted">
                —
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`/work/${p.slug}/`}
            className="link stretched-link inline-flex min-h-11 items-center gap-2 font-semibold"
          >
            {site.work.caseStudyLink}
            <span className="sr-only">: {p.name}</span>
            <ArrowIcon className="project-arrow" />
          </a>
          {(p.liveUrl || p.repoUrl) && (
            // secondary links wrap as a pair, so "Code" never ends up alone on a phone
            <span className="flex gap-x-6">
              {p.liveUrl && (
                <TextLink
                  href={p.liveUrl}
                  external
                  arrow="external"
                  className="above-stretch tap type-small"
                >
                  {site.work.liveLink}
                  <span className="sr-only">: {p.name}</span>
                </TextLink>
              )}
              {p.repoUrl && (
                <TextLink
                  href={p.repoUrl}
                  external
                  arrow="external"
                  className="above-stretch tap type-small"
                >
                  {site.work.repoLink}
                  <span className="sr-only">: {p.name}</span>
                </TextLink>
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
