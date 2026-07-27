import type { Metadata } from "next";
import Link from "next/link";
import { PartnerMeetingForm } from "@/components/forms/DemoContactForm";

export const metadata: Metadata = { title: "Partner with Sarmaya" };

const sections: { id: string; title: string; body: string[] }[] = [
  {
    id: "why",
    title: "Why partner",
    body: [
      "Sarmaya is building the diaspora-first directory for growth investment into Pakistani operating businesses and startups — without custody of funds.",
      "Partners who bring distribution, diligence capacity, or corridor expertise accelerate trust faster than ads.",
    ],
  },
  {
    id: "progress",
    title: "Current progress",
    body: [
      "Marketplace browse with shareable filters, dual listing templates, verification center, trust scores, and AI insights are live on seed data.",
      "Founder and investor dashboards ship as demo shells ready for Plan B auth.",
    ],
  },
  {
    id: "vision",
    title: "Vision",
    body: [
      "A Tier-1 trust layer where overseas and domestic capital can discover verified Pakistani growth opportunities and close off-platform with their own counsel.",
    ],
  },
  {
    id: "market",
    title: "Market",
    body: [
      "Remittance and diaspora wealth corridors already move capital home — often without structured deal flow or verification.",
      "Mid-market operators need growth equity and profit-share partners who understand Pakistan’s operating reality.",
    ],
  },
  {
    id: "traction",
    title: "Traction",
    body: [
      "Seeded marketplace of existing businesses and startup pitches across manufacturing, agri, energy, SaaS, and more.",
      "Verification queues, trust breakdowns, and AI diligence checklists are productized for the next data layer.",
    ],
  },
  {
    id: "technology",
    title: "Technology",
    body: [
      "Next.js App Router, design system locked to ink / stone / brass, Recharts financial trends, and server-side AI routes that never expose keys.",
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap",
    body: [
      "Plan B: Supabase, real auth, uploads, and Anthropic-backed regeneration in production.",
      "Later: payment-capable featured placements with a PKR-aware processor — not assumed Stripe.",
    ],
  },
  {
    id: "team",
    title: "Team",
    body: [
      "Operator-led product build with diaspora investor and founder advisors (seed profiles on About).",
    ],
  },
  {
    id: "capital",
    title: "Capital required",
    body: [
      "Strategic partnership rounds are scoped for distribution and trust infrastructure — not for custody or crowdfunding license spend.",
    ],
  },
  {
    id: "funds",
    title: "Use of funds",
    body: [
      "Verification ops, marketplace density in priority cities, and diaspora corridor partnerships.",
    ],
  },
  {
    id: "milestones",
    title: "Expected milestones",
    body: [
      "Real auth + document storage, first paid featured experiments, and hub content cadence with partners.",
    ],
  },
];

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Partners
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Partner with Sarmaya
          </h1>
          <p className="mt-5 max-w-xl text-stone/60">
            Distribution, diligence, and corridor partners for a directory that
            never custodies deal capital.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#meeting"
              className="bg-brass px-5 py-3 text-sm font-medium text-ink hover:bg-brass-bright"
            >
              Request meeting
            </a>
            <a
              href="/media/partner/sarmaya-partner-deck-placeholder.txt"
              className="border border-stone/30 px-5 py-3 text-sm text-stone hover:border-brass"
              download
            >
              Download pitch deck (placeholder)
            </a>
            <a
              href="/media/partner/sarmaya-business-plan-placeholder.txt"
              className="border border-stone/30 px-5 py-3 text-sm text-stone hover:border-brass"
              download
            >
              Download business plan (placeholder)
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="border-t border-[var(--line-dark)] py-10 first:border-t-0 first:pt-0"
          >
            <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-ink/70">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section id="meeting" className="border-t border-[var(--line-dark)] py-12">
          <h2 className="font-display text-2xl font-semibold">Request a meeting</h2>
          <p className="mt-2 text-sm text-muted">
            Demo form — for production scheduling we can embed Calendly later.
          </p>
          <div className="mt-6">
            <PartnerMeetingForm />
          </div>
          <Link href="/contact" className="mt-6 inline-block text-sm text-brass hover:underline">
            Or use general contact →
          </Link>
        </section>
      </div>
    </div>
  );
}
