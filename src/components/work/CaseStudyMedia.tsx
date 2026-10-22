import { site } from "@/content/site";
import { type Project, projectDomain } from "@/content/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { IMAGE_WIDTHS, Picture, generatedName } from "@/components/ui/Picture";

export function CaseStudyMedia({ project: p }: { project: Project }) {
  const { desktop, mobile, video } = p.media;

  return (
    <section
      data-tone="light"
      className="tone-light flow-root pt-[clamp(3rem,7vw,6rem)]"
      aria-label={p.name}
    >
      <div className="container-x">
        {video ? (
          <figure>
            <div className="frame">
              <div className="frame-bar" aria-hidden="true">
                <span className="frame-dot" />
                <span className="frame-dot" />
                <span className="frame-dot" />
                <span className="frame-domain">{projectDomain(p)}</span>
              </div>
              <video
                className="block aspect-[1196/668] w-full bg-ink-900"
                controls
                preload="none"
                playsInline
                muted
                poster={`/images/generated/${generatedName(video.poster)}-1196.webp`}
                width={1196}
                height={668}
                aria-label={site.caseStudy.videoLabel}
                aria-describedby="video-summary"
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-6 grid gap-2 lg:grid-12">
              <span className="label pt-1 text-muted lg:col-span-3">
                {site.caseStudy.videoSummaryTitle}
              </span>
              <p id="video-summary" className="measure lg:col-start-4 lg:col-end-11">
                {video.captionsNote}
              </p>
            </figcaption>
          </figure>
        ) : (
          <div className="grid items-end gap-8 lg:grid-12">
            {desktop && (
              <BrowserFrame domain={projectDomain(p)} ratio="desktop" className="lg:col-span-10">
                <Picture
                  name={generatedName(desktop.src)}
                  widths={IMAGE_WIDTHS.desktop}
                  sizes="(min-width: 1440px) 1100px, (min-width: 1024px) 80vw, 92vw"
                  fallbackSrc={desktop.src}
                  alt={desktop.alt}
                  width={desktop.width}
                  height={desktop.height}
                  priority
                  className="h-full"
                />
              </BrowserFrame>
            )}
            {mobile && (
              <BrowserFrame
                domain={projectDomain(p)}
                ratio="mobile"
                compact
                className="mx-auto w-[60%] max-w-[260px] lg:col-span-2 lg:w-full lg:max-w-none"
              >
                <Picture
                  name={generatedName(mobile.src)}
                  widths={IMAGE_WIDTHS.mobile}
                  sizes="(min-width: 1024px) 15vw, 60vw"
                  fallbackSrc={mobile.src}
                  alt={mobile.alt}
                  width={mobile.width}
                  height={mobile.height}
                  className="h-full"
                />
              </BrowserFrame>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
