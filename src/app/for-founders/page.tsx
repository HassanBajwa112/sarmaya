"use client";

import Link from "next/link";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { Reveal } from "@/components/motion/Reveal";
import { POSITIONING } from "@/lib/data/listings";

export default function ForFoundersPage() {
  return (
    <div className="bg-ink text-stone">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 hero-gradient" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal kind="fadeIn">
            <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
              Founders
            </p>
          </Reveal>
          <Reveal kind="clipUp" delay={0.06}>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl text-balance">
              Raise growth capital without selling the whole business.
            </h1>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.12}>
            <p className="mt-6 max-w-xl text-stone/60">{POSITIONING}</p>
          </Reveal>
          <Reveal kind="fadeUp" delay={0.18} className="mt-10">
            <MagneticCta href="/auth">Start listing (demo)</MagneticCta>
          </Reveal>
        </div>
      </div>

      <div className="bg-stone text-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <Reveal kind="slideLeft" delay={0.05}>
            <div className="border-t border-[var(--line-dark)] pt-8">
              <h2 className="font-display text-2xl font-semibold">Existing business</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                For operating companies seeking expansion capital. You&apos;ll provide NTN/FBR
                status, SECP registration if incorporated, and bank statements or audited
                financials matching claimed revenue.
              </p>
            </div>
          </Reveal>
          <Reveal kind="slideLeft" delay={0.14}>
            <div className="border-t border-[var(--line-dark)] pt-8">
              <h2 className="font-display text-2xl font-semibold">Startup pitch</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                For pre-revenue or early founders. The pitch itself can&apos;t be fully
                verified yet — we verify the person: identity plus professional history.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <Reveal kind="fadeUp">
            <p className="text-sm text-ink/55">
              Prefer the browse view first?{" "}
              <Link href="/browse" className="text-brass underline-offset-4 hover:underline">
                See live listings
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
