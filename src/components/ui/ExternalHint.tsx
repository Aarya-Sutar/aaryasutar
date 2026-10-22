/** Screen-reader hint for links that open in a new tab. */
export function ExternalHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

export const externalProps = { target: "_blank", rel: "noopener noreferrer" } as const;
