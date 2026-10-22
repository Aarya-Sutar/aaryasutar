import { site } from "@/content/site";
import { getPublishedProjects } from "@/content/projects";
import { Section } from "@/components/layout/Section";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { ProjectRow } from "./ProjectRow";

export function WorkList() {
  const projects = getPublishedProjects();
  return (
    <Section id="work" tone="light" labelledBy="work-title" className="border-t border-line">
      <div className="container-x">
        <RevealTitle id="work-title">{site.work.title}</RevealTitle>
        <p className="body-l mt-6 max-w-[52ch] text-muted">{site.work.intro}</p>
        <div className="mt-6 divide-y divide-line border-b border-line lg:mt-10">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
