"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EnterLoader } from "@/components/EnterLoader";
import { ListingRow } from "@/components/ListingRow";
import { getFeaturedListings, POSITIONING } from "@/lib/data/listings";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function HomePage() {
  const featured = getFeaturedListings().slice(0, 4);

  return (
    <EnterLoader>
      {/* Hero — brand first, full-bleed atmosphere */}
      <section className="relative min-h-[100svh] overflow-hidden grain hero-gradient">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              filter: "grayscale(0.35) contrast(1.05) brightness(0.35)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-28">
          <motion.p
            className="font-display text-5xl font-extrabold tracking-tight text-stone sm:text-7xl md:text-8xl"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Sarmaya
          </motion.p>
          <motion.h1
            className="mt-6 max-w-2xl text-xl font-light leading-snug text-stone/90 sm:text-2xl md:text-3xl text-balance"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Growth capital for businesses that keep running.
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-sm leading-relaxed text-stone/60 sm:text-base"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {POSITIONING}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link
              href="/browse"
              className="bg-brass px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-brass-bright"
            >
              Browse verified listings
            </Link>
            <Link
              href="/for-investors"
              className="border border-stone/30 px-7 py-3.5 text-sm text-stone transition hover:border-brass hover:text-brass"
            >
              Invest from abroad
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust story */}
      <section className="bg-stone text-ink">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Why Sarmaya
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl text-balance">
            Not an exit marketplace. Growth investment into operating Pakistan.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            We connect diaspora and domestic investors with founders raising equity or
            profit-share — startups and existing businesses that stay in the founder&apos;s
            hands. Introductions happen here; capital moves off-platform.
          </p>
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
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink-soft">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            How it works
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
            Three steps. Off-platform close.
          </h2>
          <ol className="mt-14 space-y-0">
            {[
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
            ].map((step) => (
              <li
                key={step.n}
                className="grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-[100px_1fr_1.2fr] md:items-baseline"
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

      {/* Featured listings */}
      <section className="bg-stone text-ink">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
                Featured
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
                Live growth opportunities
              </h2>
            </div>
            <Link href="/browse" className="text-sm text-ink/70 underline-offset-4 hover:text-brass hover:underline">
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

      {/* Diaspora CTA */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-30 hero-gradient" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Diaspora-first
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold text-stone sm:text-5xl text-balance">
            Invest in Pakistan from the UK, Gulf, or US.
          </h2>
          <p className="mt-6 max-w-xl text-stone/60">
            Built for overseas Pakistanis exploring growth stakes — including pathways
            framed around Roshan Digital Account corridors. Start with verified listings,
            then request an intro.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/for-investors"
              className="bg-brass px-7 py-3.5 text-sm font-medium text-ink hover:bg-brass-bright"
            >
              Investor guide
            </Link>
            <Link
              href="/for-founders"
              className="border border-stone/25 px-7 py-3.5 text-sm text-stone hover:border-brass hover:text-brass"
            >
              List your business
            </Link>
          </div>
        </div>
      </section>
    </EnterLoader>
  );
}
