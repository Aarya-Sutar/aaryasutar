import { site } from "@/content/site";

/** Tilted orange band of scrolling service words. Decorative: the words repeat the Services section. */
export function Marquee() {
  const run = (key: string) => (
    <span key={key} className="marquee-run">
      {site.marquee.map((word) => (
        <span key={word} className="marquee-item">
          {word}
          <span className="marquee-sep" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-band">
        <div className="marquee-track">{[run("a"), run("b")]}</div>
      </div>
    </div>
  );
}
