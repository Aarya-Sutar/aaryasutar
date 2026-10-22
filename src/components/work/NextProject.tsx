import { site } from "@/content/site";
import type { Project } from "@/content/projects";
import { ArrowIcon } from "@/components/ui/Icons";

export function NextProject({ project: p }: { project: Project }) {
  return (
    <nav data-tone="light" className="tone-light" aria-label={site.caseStudy.nextLabel}>
      <div className="container-x">
        <a
          href={`/work/${p.slug}/`}
          className="project-row group flex flex-col gap-3 py-[clamp(3rem,7vw,5rem)]"
        >
          <span className="label text-muted">{site.caseStudy.nextLabel}</span>
          <span className="flex items-center gap-[0.3em] text-[clamp(2.25rem,5.5vw,4.5rem)] title-text">
            <span className="underline-draw">{p.name}</span>
            <ArrowIcon className="project-arrow size-[0.5em] shrink-0" />
          </span>
        </a>
      </div>
    </nav>
  );
}
