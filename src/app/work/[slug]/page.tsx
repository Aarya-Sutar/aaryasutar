import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { getNextProject, getProject, getPublishedProjects } from "@/content/projects";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudyMedia } from "@/components/work/CaseStudyMedia";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { NextProject } from "@/components/work/NextProject";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name}: ${p.kind} by ${site.name}`;
  // 1200×630 JPEG made by scripts/images.mjs from the desktop screenshot (or the video poster)
  const image = { url: `/images/generated/${p.slug}-og.jpg`, width: 1200, height: 630 };
  const url = `/work/${p.slug}/`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: p.summary,
      siteName: site.name,
      locale: "en_IN",
      images: [{ ...image, alt: p.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.summary,
      images: [image.url],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudyHeader project={project} />
      <CaseStudyMedia project={project} />
      <CaseStudyBody project={project} />
      <NextProject project={getNextProject(project.slug)} />
    </>
  );
}
