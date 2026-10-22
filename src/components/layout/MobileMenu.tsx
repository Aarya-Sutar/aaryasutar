"use client";

import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { site } from "@/content/site";
import { ExternalHint, externalProps } from "@/components/ui/ExternalHint";

type MobileMenuProps = { open: boolean; onClose: () => void };

/**
 * Full-screen menu built on a native modal <dialog>: the rest of the page is inert
 * while it's open, Tab cycles inside it, and Esc closes it.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Same-page anchors: close first (which restores scrolling), then jump and move focus.
  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.startsWith("/#") ? href.slice(2) : null;
    const target = id ? document.getElementById(id) : null;
    if (!target || window.location.pathname !== "/") {
      onClose();
      return;
    }
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      history.pushState(null, "", href);
      target.scrollIntoView();
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  };

  // A modal dialog makes the page inert, but Tab can still leave for the browser UI; keep it cycling inside.
  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>("a[href], button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const links = [...site.nav.links, site.nav.cta];

  return (
    <dialog
      ref={ref}
      className="menu-dialog tone-dark"
      aria-label={site.nav.menuLabel}
      onClose={onClose}
      onKeyDown={onKeyDown}
    >
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
        <span className="font-semibold">{site.name}</span>
        <button type="button" className="nav-link font-semibold" onClick={onClose}>
          {site.nav.menuClose}
        </button>
      </div>
      <nav aria-label="Menu" className="container-x pt-8 pb-12">
        <ul role="list" className="flex flex-col gap-2">
          {links.map((l) => (
            <li key={l.href + l.label}>
              <a
                href={l.href}
                className="nav-link font-display text-[3rem] leading-none uppercase"
                onClick={(e) => onLinkClick(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ul role="list" className="mt-10 flex flex-col gap-1 text-muted">
          <li>
            <a href={site.contact.whatsappUrl} className="nav-link" {...externalProps}>
              WhatsApp {site.contact.phoneDisplay}
              <ExternalHint />
            </a>
          </li>
          <li>
            <a href={`mailto:${site.contact.email}`} className="nav-link">
              {site.contact.email}
            </a>
          </li>
        </ul>
      </nav>
    </dialog>
  );
}
