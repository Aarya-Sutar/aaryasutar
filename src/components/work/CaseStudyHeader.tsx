import { site } from "@/content/site";
import type { Project } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";

export function CaseStudyHeader({ project: p }: { project: Project }) {
  const t = site.caseStudy;
  return (
    <header data-tone="dark" className="tone-dark pt-[var(--nav-h)]">
      <div className="container-x pt-8 pb-[clamp(3rem,7vw,6rem)]">
        <p className="type-small">
          <a href={t.backHref} className="nav-link">
            <span aria-hidden="true">←&nbsp;</span>
            {t.back}
          </a>
        </p>
        <ul role="list" className="mt-10 flex flex-wrap items-center gap-2 text-muted">
          <li>
            <Tag>{p.kind}</Tag>
          </li>
          {p.isConcept && (
            <li>
              <Tag concept>{t.conceptTag}</Tag>
            </li>
          )}
          <li className="label ml-2">{p.year}</li>
        </ul>
        <h1 className="display-l mt-6 max-w-[16ch]">{p.name}</h1>
        <p className="body-l mt-6 max-w-[56ch] text-muted">{p.summary}</p>

        <dl className="mt-12 grid gap-px border border-line bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          <MetaItem label={t.meta.type}>{p.kind}</MetaItem>
          <MetaItem label={t.meta.stack}>{p.stack.join(", ")}</MetaItem>
          <MetaItem label={t.meta.year}>{p.year}</MetaItem>
          <MetaItem label={t.meta.links}>
            {p.liveUrl || p.repoUrl ? (
              <span className="flex flex-wrap gap-x-4">
                {p.liveUrl && (
                  <TextLink href={p.liveUrl} external arrow="external" className="tap">
                    {site.work.liveLink}
                  </TextLink>
                )}
                {p.repoUrl && (
                  <TextLink href={p.repoUrl} external arrow="external" className="tap">
                    {site.work.repoLink}
                  </TextLink>
                )}
              </span>
            ) : (
              <span className="text-muted">—</span>
            )}
          </MetaItem>
        </dl>
      </div>
    </header>
  );
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-ink-950 p-5">
      <dt className="label text-muted">{label}</dt>
      <dd className="type-small mt-2">{children}</dd>
    </div>
  );
}
