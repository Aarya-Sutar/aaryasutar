"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/content/site";
import { RevealTitle } from "@/components/ui/RevealTitle";
import { TextLink } from "@/components/ui/TextLink";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

// Timing (brief 5 #2): ~380ms per segment, ~2.2s total, plays once.
const START = 200;
const STEP = 440;
const SEGMENT = 380;
const segDelay = (k: number) => START + k * STEP;
const nodeDelay = (k: number) => (k === 0 ? 0 : segDelay(k - 1) + SEGMENT - 80);

type State = "idle" | "armed" | "play";

/**
 * The diagram is real HTML (an ordered list); SVG is only used for the connectors.
 * Server HTML shows it fully drawn. Once it comes within a viewport of the screen it is
 * "armed" (dimmed, undrawn), and it plays when 40% visible. Arming late means the dimmed
 * state never sits in the page for no reason. Reduced motion: never armed, stays static.
 */
export function EnquiryFlow() {
  const { flow } = site;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return;
    const arm = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState((s) => (s === "idle" ? "armed" : s));
          arm.disconnect();
        }
      },
      { rootMargin: "0px 0px 100% 0px" },
    );
    const play = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("play");
          play.disconnect();
          arm.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    arm.observe(el);
    play.observe(el);
    return () => {
      arm.disconnect();
      play.disconnect();
    };
  }, []);

  const last = flow.steps.length - 1;

  return (
    <section
      id="how-it-works"
      data-tone="light"
      className="tone-light"
      aria-labelledby="flow-title"
    >
      <div className="container-x">
        <div
          data-tone="dark"
          className="tone-dark px-[clamp(16px,4vw,56px)] py-[clamp(3.5rem,8vw,6.5rem)]"
        >
          <RevealTitle id="flow-title">{flow.title}</RevealTitle>
          <p className="body-l mt-5 max-w-[60ch] text-muted">{flow.intro}</p>

          <div
            ref={wrapRef}
            data-state={state}
            className="flow relative mt-12 overflow-hidden lg:mt-16"
          >
            {/* the travelling square: hidden behind nodes, visible in the gaps */}
            <div
              aria-hidden="true"
              className="flow-traveller-track pointer-events-none absolute top-0 bottom-0 left-[23px] w-0 lg:top-1/2 lg:right-0 lg:bottom-auto lg:left-0 lg:h-0 lg:w-full"
            >
              <span className="flow-traveller absolute -top-1 -left-1 block size-2 bg-signal" />
            </div>
            <ol role="list" className="grid gap-10 lg:grid-cols-5 lg:gap-12">
              {flow.steps.map((step, k) => (
                <li key={step.number} className="relative z-[1]">
                  <div className="flow-node h-full border border-ink-700 bg-ink-900 p-5 lg:p-6">
                    <div
                      className="flow-node-inner"
                      style={{ "--node-delay": nodeDelay(k) } as CSSProperties}
                    >
                      <span className="label text-signal">{step.number}</span>
                      <h3 className="mt-3 text-[1.125rem] leading-tight font-bold">{step.title}</h3>
                      <p className="type-small mt-2 text-muted">{step.body}</p>
                    </div>
                  </div>
                  {k < last && <Connector delay={segDelay(k)} />}
                </li>
              ))}
            </ol>
          </div>

          <p className="type-small mt-8 text-muted">{flow.caption}</p>
          <p className="mt-6">
            <TextLink href={flow.prototypeLink.href} arrow="next" className="tap font-semibold">
              {flow.prototypeLink.label}
            </TextLink>
          </p>
        </div>
      </div>
    </section>
  );
}

/** 1px connector in the gap after a node: vertical below it on mobile, horizontal to its right on desktop. */
function Connector({ delay }: { delay: number }) {
  const style = { "--seg-delay": delay } as CSSProperties;
  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute top-full left-[23px] h-10 w-px overflow-visible lg:hidden"
        viewBox="0 0 1 40"
        preserveAspectRatio="none"
      >
        <line
          className="flow-line-base"
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="40"
          vectorEffect="non-scaling-stroke"
        />
        <line
          className="flow-line-draw"
          style={style}
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="40"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute top-1/2 left-full hidden h-px w-12 overflow-visible lg:block"
        viewBox="0 0 48 1"
        preserveAspectRatio="none"
      >
        <line
          className="flow-line-base"
          x1="0"
          y1="0.5"
          x2="48"
          y2="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          className="flow-line-draw"
          style={style}
          x1="0"
          y1="0.5"
          x2="48"
          y2="0.5"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}
