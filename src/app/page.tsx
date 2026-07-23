"use client";

import Link from "next/link";
import { EnterLoader } from "@/components/EnterLoader";
import { ListingRow } from "@/components/ListingRow";
import { CapitalFlowMap } from "@/components/motion/CapitalFlowMap";
import { CountUp } from "@/components/motion/CountUp";
import { HowItWorks } from "@/components/motion/HowItWorks";
import { InteractiveHero } from "@/components/motion/InteractiveHero";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { Reveal } from "@/components/motion/Reveal";
import { getFeaturedListings } from "@/lib/data/listings";

export default function HomePage() {
  const featured = getFeaturedListings().slice(0, 4);

  return (
    <EnterLoader>
      <InteractiveHero />

      {/* Trust strip — Lume-style feature row */}
      <section id="why" className="border-t border-[var(--line)] bg-ink">
        <div className="mx-auto grid max-w-6xl gap-0 px-5 sm:px-8 md:grid-cols-3">
          {[
            {
              title: "Security you can verify.",
              body: "Manual CNIC + selfie review gates every founder before a listing goes live.",
            },
            {
              title: "Human diligence.",
              body: "Business claims checked against NTN, financials, or founder history — never automated scoring.",
            },
            {
              title: "Directory, not escrow.",
              body: "We never hold investor money. Intros here; capital moves off-platform by design.",
            },
          ].map((item, i) => (
            <Reveal
              key={item.title}
              kind="fadeUp"
              delay={0.08 * i}
              className={`border-[var(--line)] py-12 md:px-8 ${
                i < 2 ? "md:border-r" : ""
              } ${i > 0 ? "border-t md:border-t-0" : ""}`}
            >
              <p className="font-display text-xs tracking-[0.25em] text-brass uppercase">
                0{i + 1}
              </p>
              <h2 className="font-display mt-4 text-xl font-semibold text-stone sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone/55">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-stone text-ink">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal kind="fadeIn" duration={0.7}>
            <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
              Why Sarmaya
            </p>
          </Reveal>
          <Reveal kind="clipUp" delay={0.08}>
            <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl text-balance">
              Not an exit marketplace. Growth investment into operating Pakistan.
            </h2>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.16} duration={0.75}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
              We connect diaspora and domestic investors with founders raising equity or
              profit-share — startups and existing businesses that stay in the founder&apos;s
              hands. Introductions happen here; capital moves off-platform.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 border-t border-[var(--line-dark)] pt-12 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                <CountUp value={15} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-ink/55">Seeded growth listings</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                <CountUp value={8} />
              </p>
              <p className="mt-2 text-sm text-ink/55">Categories across Pakistan</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                <CountUp value={100} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-ink/55">Human-reviewed founders</p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="bg-stone text-ink">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Reveal kind="fadeIn">
                <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
                  Featured
                </p>
              </Reveal>
              <Reveal kind="fadeUp" delay={0.05}>
                <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
                  Live growth opportunities
                </h2>
              </Reveal>
            </div>
            <Link
              href="/browse"
              className="text-sm text-ink/70 underline-offset-4 hover:text-brass hover:underline"
            >
              View all listings
            </Link>
          </div>
          <div className="mt-10">
            {featured.map((l, i) => (
              <ListingRow key={l.slug} listing={l} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <CapitalFlowMap />
        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
          <Reveal kind="fadeIn">
            <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
              Diaspora-first
            </p>
          </Reveal>
          <Reveal kind="clipUp" delay={0.08}>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold text-stone sm:text-5xl text-balance">
              Invest in Pakistan from the UK, Gulf, or US.
            </h2>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.14}>
            <p className="mt-6 max-w-xl text-stone/60">
              Built for overseas Pakistanis exploring growth stakes — including pathways
              framed around Roshan Digital Account corridors. Start with verified listings,
              then request an intro.
            </p>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <MagneticCta href="/for-investors">Investor guide</MagneticCta>
            <MagneticCta href="/for-founders" variant="ghost">
              List your business
            </MagneticCta>
          </Reveal>
        </div>
      </section>
    </EnterLoader>
  );
}
