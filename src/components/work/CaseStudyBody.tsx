import type { ReactNode } from "react";
import { site } from "@/content/site";
import type { Project } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function CaseStudyBody({ project: p }: { project: Project }) {
  const t = site.caseStudy;
  const cs = p.caseStudy;

  return (
    <>
      <section data-tone="light" className="tone-light flow-root pb-[var(--section-pad)]">
        <div className="container-x">
          {cs.note && (
            <p className="type-small mt-8 border-l-2 border-signal-ink pl-4 measure lg:ml-[calc((100%-11*var(--grid-gap))*3/12+3*var(--grid-gap))]">
              {cs.note}
            </p>
          )}

          <Block title={t.briefTitle}>
            <p className="body-l measure">{cs.brief}</p>
          </Block>

          <Block title={t.builtTitle}>
            <ul role="list" className="flex flex-col gap-2">
              {cs.built.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="text-muted">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          {cs.decisions.length > 0 && (
            <Block title={t.decisionsTitle}>
              <div className="flex flex-col gap-8">
                {cs.decisions.map((d) => (
                  <div key={d.title}>
                    <h3 className="type-h3">{d.title}</h3>
                    <p className="mt-2 measure">{d.body}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          <Block title={t.stackTitle}>
            <ul role="list" className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>
          </Block>

          {p.isConcept && (
            <Block title={t.disclosureTitle}>
              <p className="flex items-start gap-3 measure text-muted">
                <Tag concept>{t.conceptTag}</Tag>
                <span className="type-small pt-0.5">{site.work.conceptDisclosure}</span>
              </p>
            </Block>
          )}
        </div>
      </section>

      <section data-tone="dark" className="tone-dark section-pad" aria-labelledby="cta-title">
        <div className="container-x">
          <h2 id="cta-title" className="display-l max-w-[18ch]">
            {t.ctaTitle}
          </h2>
          <div className="mt-10">
            <Button href={t.ctaButton.href}>{t.ctaButton.label}</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div data-reveal className="mt-12 grid gap-4 border-t border-line pt-8 lg:mt-16 lg:grid-12">
      <h2 className="label pt-1 text-muted lg:col-span-3">{title}</h2>
      <div className="lg:col-start-4 lg:col-end-11">{children}</div>
    </div>
  );
}
