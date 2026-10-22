"use client";

/** True if any part of the element is inside the viewport right now. */
export function isOnScreen(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}
