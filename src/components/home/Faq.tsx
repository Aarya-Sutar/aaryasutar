import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { PlusIcon } from "@/components/ui/Icons";

export function Faq() {
  const { faq } = site;
  return (
    <Section id="faq" tone="light" labelledBy="faq-title" className="border-t border-line">
      <div className="container-x grid gap-y-10 lg:grid-12">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:col-span-5 lg:self-start">
          <RevealTitle id="faq-title">{faq.title}</RevealTitle>
        </div>
        <div className="border-t border-line lg:col-start-7 lg:col-end-13">
          {faq.items.map((item, i) => (
            <details
              key={item.q}
              data-reveal
              style={{ "--d": i } as CSSProperties}
              className="faq-item border-b border-line"
            >
              <summary className="flex min-h-16 items-center justify-between gap-6 py-5">
                <span className="text-[1.125rem] leading-snug font-bold sm:text-[1.25rem]">
                  {item.q}
                </span>
                <PlusIcon className="faq-icon shrink-0" />
              </summary>
              <div className="faq-body">
                <div>
                  <p className="pb-6 measure text-muted">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
