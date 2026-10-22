import { site } from "@/content/site";
import { ExternalHint, externalProps } from "@/components/ui/ExternalHint";
import { resumeExists } from "@/lib/resume";

export function Footer() {
  const year = new Date().getFullYear();
  const showResume = resumeExists();

  return (
    <footer data-tone="dark" className="tone-dark border-t border-line">
      <div className="container-x py-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-center">
          <p className="type-small">{site.footer.copyright(year)}</p>
          <nav aria-label="Footer">
            <ul role="list" className="flex flex-wrap gap-x-5 lg:justify-center">
              {site.footer.anchorLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link type-small">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul role="list" className="flex flex-wrap gap-x-5 lg:justify-end">
            {site.footer.contactLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="nav-link type-small"
                  {...(l.external ? externalProps : {})}
                >
                  {l.label}
                  {l.external && <ExternalHint />}
                </a>
              </li>
            ))}
            {showResume && (
              <li>
                <a href={site.resumePath} className="nav-link type-small" {...externalProps}>
                  {site.footer.resumeLabel}
                  <ExternalHint />
                </a>
              </li>
            )}
          </ul>
        </div>
        <div data-reveal className="footer-mark-wrap mt-12" aria-hidden="true">
          <p className="footer-mark">{site.name}</p>
        </div>
      </div>
    </footer>
  );
}
