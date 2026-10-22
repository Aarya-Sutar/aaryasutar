import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { RevealTitle } from "@/components/ui/RevealTitle";

export function Process() {
  const { process } = site;
  return (
    <Section id="process" tone="light" labelledBy="process-title">
      <div className="container-x">
        <RevealTitle id="process-title">{process.title}</RevealTitle>
        <ol
          role="list"
          className="mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-[var(--grid-gap)] lg:mt-14 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr] lg:gap-y-0"
        >
          {process.steps.map((s, i) => (
            <li
              key={s.number}
              data-reveal
              style={{ "--d": i } as CSSProperties}
              className="step hover-card relative border-t border-line pt-5 lg:row-span-3 lg:grid lg:grid-rows-subgrid"
            >
              <span className="numeral numeral-stroke self-start" aria-hidden="true">
                {s.number}
              </span>
              <h3 className="type-h3 mt-5">{s.title}</h3>
              <p className="mt-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
