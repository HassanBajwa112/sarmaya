"use client";

import { CapitalFlowMap } from "@/components/motion/CapitalFlowMap";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { Reveal } from "@/components/motion/Reveal";
import { POSITIONING } from "@/lib/data/listings";

export default function ForInvestorsPage() {
  return (
    <div className="bg-ink text-stone">
      <div className="relative overflow-hidden">
        <CapitalFlowMap className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal kind="fadeIn">
            <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
              Investors
            </p>
          </Reveal>
          <Reveal kind="clipUp" delay={0.06}>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl text-balance">
              Growth stakes in Pakistan — from wherever you are.
            </h1>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.12}>
            <p className="mt-6 max-w-xl text-stone/60">{POSITIONING}</p>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.18} className="mt-10 flex flex-wrap gap-4">
            <MagneticCta href="/browse">Browse listings</MagneticCta>
            <MagneticCta href="/auth" variant="ghost">
              Create investor account
            </MagneticCta>
          </Reveal>
        </div>
      </div>

      <div className="bg-stone text-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal kind="fadeUp">
            <h2 className="font-display text-3xl font-semibold">Built diaspora-first</h2>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.08}>
            <p className="mt-4 max-w-2xl text-ink/65">
              Overseas Pakistani professionals in the UK, Gulf, and US are a primary
              audience. Listings that note Roshan Digital Account–friendly intro paths make
              that corridor explicit — without Sarmaya ever holding your capital.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Verified first",
                d: "See identity, business-claim, and human-review status before you message.",
              },
              {
                t: "Directory, not escrow",
                d: "Request intros on-platform. Structure and fund the deal with counsel off-platform.",
              },
              {
                t: "Growth, not exits",
                d: "Equity and profit-share into running companies — not buyouts of whole businesses.",
              },
            ].map((item, i) => (
              <li key={item.t} className="list-none">
                <Reveal kind="slideLeft" delay={0.06 * i}>
                  <div className="border-t border-[var(--line-dark)] pt-6">
                    <h3 className="font-display text-xl font-semibold">{item.t}</h3>
                    <p className="mt-3 text-sm text-ink/60">{item.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
