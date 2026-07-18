import type { Metadata } from "next";
import Link from "next/link";
import { POSITIONING } from "@/lib/data/listings";

export const metadata: Metadata = {
  title: "For founders",
  description: "List an existing business or startup pitch on Sarmaya.",
};

export default function ForFoundersPage() {
  return (
    <div className="bg-ink text-stone">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
          Founders
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          Raise growth capital without selling the whole business.
        </h1>
        <p className="mt-6 max-w-xl text-stone/60">{POSITIONING}</p>
        <Link
          href="/auth"
          className="mt-10 inline-flex bg-brass px-7 py-3.5 text-sm font-medium text-ink hover:bg-brass-bright"
        >
          Start listing (demo)
        </Link>
      </div>

      <div className="bg-stone text-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <div className="border-t border-[var(--line-dark)] pt-8">
            <h2 className="font-display text-2xl font-semibold">Existing business</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              For operating companies seeking expansion capital. You&apos;ll provide NTN/FBR
              status, SECP registration if incorporated, and bank statements or audited
              financials matching claimed revenue.
            </p>
          </div>
          <div className="border-t border-[var(--line-dark)] pt-8">
            <h2 className="font-display text-2xl font-semibold">Startup pitch</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              For pre-revenue or early founders. The pitch itself can&apos;t be fully
              verified yet — we verify the person: identity plus professional history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
