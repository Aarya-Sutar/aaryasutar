import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { getPublishedProjects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...getPublishedProjects().map((p) => ({
      url: `${SITE_URL}/work/${p.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
