import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { ExternalHint, externalProps } from "@/components/ui/ExternalHint";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export function Contact() {
  const c = site.contactSection;
  return (
    <Section id="contact" tone="dark" labelledBy="contact-title">
      <div className="container-x grid gap-y-12 lg:grid-12">
        <div className="lg:col-span-5">
          <RevealTitle id="contact-title">{c.title}</RevealTitle>
          <p className="body-l mt-6 max-w-[40ch] text-muted">{c.intro}</p>
          <dl data-reveal className="mt-10 border-t border-line">
            {c.list.map((item) => (
              <div
                key={item.label}
                className="contact-row grid min-h-14 grid-cols-[6.5rem_1fr] items-center gap-4 border-b border-line"
              >
                <dt className="label text-muted">{item.label}</dt>
                <dd>
                  <a
                    href={item.href}
                    className="link inline-flex min-h-11 items-center break-all"
                    {...(item.external ? externalProps : {})}
                  >
                    {item.value}
                    {item.external && <ExternalHint />}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          data-reveal
          style={{ "--d": 1 } as CSSProperties}
          className="lg:col-start-7 lg:col-end-13"
        >
          <EnquiryForm />
        </div>
      </div>
    </Section>
  );
}
