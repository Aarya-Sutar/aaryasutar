import { site } from "@/content/site";
import { Section } from "@/components/layout/Section";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { TextLink } from "@/components/ui/TextLink";
import { resumeExists } from "@/lib/resume";

export function About() {
  const { about } = site;
  const links = resumeExists()
    ? [...about.links, { label: about.resumeLabel, href: site.resumePath }]
    : about.links;

  return (
    <Section id="about" tone="light" labelledBy="about-title" className="border-t border-line">
      <div className="container-x grid gap-y-14 lg:grid-12">
        <div className="lg:col-span-6">
          <RevealTitle id="about-title">{about.title}</RevealTitle>
          <div className="body-l mt-8 flex flex-col gap-5 measure">
            {about.bio.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <ul role="list" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <TextLink href={l.href} external arrow="external" className="tap font-semibold">
                  {l.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-start-8 lg:col-end-13">
          <h3 className="label text-muted">{about.backgroundTitle}</h3>
          <ol role="list" className="mt-4 border-t border-line">
            {about.background.map((b) => (
              <li
                key={b.role}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
              >
                <span className="label pt-1 text-muted">{b.period}</span>
                <div>
                  <p className="font-bold">{b.role}</p>
                  {b.detail && <p className="type-small mt-1 text-muted">{b.detail}</p>}
                </div>
              </li>
            ))}
          </ol>

          <h3 className="label mt-12 text-muted">{about.otherTitle}</h3>
          <ul role="list" className="mt-4 flex flex-col gap-3">
            {about.other.map((o) => (
              <li key={o.href} className="type-small">
                <TextLink
                  href={o.href}
                  external
                  arrow="external"
                  className={o.description ? "font-semibold" : "tap font-semibold"}
                >
                  {o.name}
                </TextLink>
                {o.description && <span className="text-muted">: {o.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
