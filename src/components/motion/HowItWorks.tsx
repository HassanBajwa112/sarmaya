"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Founders list",
    body: "Existing business or startup pitch — documents uploaded, verification queue starts.",
  },
  {
    n: "02",
    title: "Investors browse",
    body: "Filter by category, see verification status, message founders on-platform.",
  },
  {
    n: "03",
    title: "Deal closes elsewhere",
    body: "Sarmaya intros; legal and capital transfer happen between the parties — never through us.",
  },
];

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduce || !root.current) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const steps = gsap.utils.toArray<HTMLElement>(".hiw-step");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      });

      steps.forEach((step, i) => {
        if (i === 0) {
          gsap.set(step, { opacity: 1, y: 0 });
          return;
        }
        gsap.set(step, { opacity: 0.18, y: 36 });
        tl.to(
          steps[i - 1],
          { opacity: 0.18, y: -24, duration: 1, ease: "none" },
          i - 1,
        );
        tl.to(step, { opacity: 1, y: 0, duration: 1, ease: "none" }, i - 1);
      });
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section ref={root} className="bg-ink-soft">
      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-32">
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
          How it works
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
          Three steps. Off-platform close.
        </h2>
        <ol className="relative mt-14 space-y-0 md:mt-20">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="hiw-step grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-[100px_1fr_1.2fr] md:items-baseline"
            >
              <span className="font-display text-brass">{step.n}</span>
              <h3 className="font-display text-2xl font-semibold text-stone">
                {step.title}
              </h3>
              <p className="text-stone/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
