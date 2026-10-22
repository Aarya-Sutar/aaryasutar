import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { TextLink } from "@/components/ui/TextLink";

export function Services() {
  const { services } = site;
  return (
    <Section id="services" tone="light" labelledBy="services-title">
      <div className="container-x">
        <RevealTitle id="services-title">{services.title}</RevealTitle>
        <ol role="list" className="mt-10 grid border-t border-line lg:mt-14 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <li
              key={s.number}
              data-reveal
              style={{ "--d": i } as CSSProperties}
              className={
                "service-card relative flex flex-col py-8 lg:px-8 lg:py-10 " +
                (i > 0 ? "border-t border-line lg:border-t-0 lg:border-l " : "lg:pl-0 ") +
                (i === services.items.length - 1 ? "lg:pr-0" : "")
              }
            >
              <span className="numeral numeral-stroke" aria-hidden="true">
                {s.number}
              </span>
              <h3 className="type-h3 mt-6">{s.title}</h3>
              <p className="mt-3 measure">{s.body}</p>
              <ul role="list" className="type-small mt-6 flex flex-col gap-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex gap-3">
                    <span aria-hidden="true" className="text-muted">
                      —
                    </span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8">
                <TextLink
                  href={`/?service=${s.cta.service}#contact`}
                  arrow="next"
                  className="tap font-semibold"
                >
                  {s.cta.label}
                </TextLink>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
