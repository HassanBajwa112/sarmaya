"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EnterLoader } from "@/components/EnterLoader";
import { ListingRow } from "@/components/ListingRow";
import { CapitalFlowMap } from "@/components/motion/CapitalFlowMap";
import { CountUp } from "@/components/motion/CountUp";
import { HeroMedia } from "@/components/motion/HeroMedia";
import { HowItWorks } from "@/components/motion/HowItWorks";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { Reveal } from "@/components/motion/Reveal";
import { getFeaturedListings, POSITIONING } from "@/lib/data/listings";
import { motionEase, usePrefersReducedMotion } from "@/lib/motion";

export default function HomePage() {
  const featured = getFeaturedListings().slice(0, 4);
  const reduce = usePrefersReducedMotion();

  return (
    <EnterLoader>
      <section className="relative min-h-[100svh] overflow-hidden grain hero-gradient">
        <HeroMedia posterSrc="/media/hero/poster.jpg" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-28">
          <motion.p
            className="font-display overflow-hidden text-5xl font-extrabold tracking-tight text-stone sm:text-7xl md:text-8xl"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.05, delay: 0.2, ease: motionEase.expo }}
          >
            <span className="inline-block">Sarmaya</span>
          </motion.p>
          <motion.h1
            className="mt-6 max-w-2xl overflow-hidden text-xl font-light leading-snug text-stone/90 sm:text-2xl md:text-3xl text-balance"
            initial={reduce ? false : { y: "120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.42, ease: motionEase.expo }}
          >
            Growth capital for businesses that keep running.
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-sm leading-relaxed text-stone/60 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: motionEase.soft }}
          >
            {POSITIONING}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.78, ease: motionEase.soft }}
          >
            <MagneticCta href="/browse">Browse verified listings</MagneticCta>
            <MagneticCta href="/for-investors" variant="ghost">
              Invest from abroad
            </MagneticCta>
          </motion.div>
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

          <div className="mt-16 grid gap-12 border-t border-[var(--line-dark)] pt-16 md:grid-cols-3">
            {[
              {
                title: "Identity first",
                body: "Manual CNIC + selfie review gates every founder before a listing goes live.",
              },
              {
                title: "Human verification",
                body: "Business claims checked against NTN, financials, or founder history — never automated scoring.",
              },
              {
                title: "No custody",
                body: "We never hold investor money. Directory-only by design, keeping Tier 1 outside crowdfunding licensing.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} kind="slideLeft" delay={0.06 * i} duration={0.8}>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.body}</p>
              </Reveal>
            ))}
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
