import type { Metadata } from "next";
import { site } from "@/content/site";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: `${site.notFound.title} | ${site.name}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      data-tone="dark"
      className="tone-dark flex min-h-[80svh] items-center pt-[var(--nav-h)]"
      aria-labelledby="nf-title"
    >
      <div className="container-x py-20">
        <h1 id="nf-title" className="display-l">
          {site.notFound.title}
        </h1>
        <p className="mt-8">
          <TextLink href="/" arrow="next" className="tap font-semibold">
            {site.notFound.link}
          </TextLink>
        </p>
      </div>
    </section>
  );
}
