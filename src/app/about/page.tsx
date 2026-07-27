import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Sarmaya" };

const timeline = [
  { when: "2025", label: "Concept", detail: "Diaspora-first directory thesis locked." },
  { when: "2026 Q2", label: "Plan A UI", detail: "Marketplace, motion, and seed listings shipped." },
  { when: "2026 Q3", label: "Trust + dashboards", detail: "Verification, AI Center, founder/investor shells." },
  { when: "Next", label: "Plan B", detail: "Auth, storage, and live verification ops." },
];

const people = [
  {
    name: "Imran Qureshi",
    role: "Operator advisor",
    bio: "Precision manufacturing operator — represents founder voice in product reviews.",
  },
  {
    name: "Sara Memon",
    role: "Agri / export advisor",
    bio: "Cold-chain operator perspective on seasonal cash flows and diaspora co-invest.",
  },
  {
    name: "Zara Hussain",
    role: "Product / fintech",
    bio: "SME software operator advising on diligence UX for SaaS listings.",
  },
];

const advisors = [
  { name: "Omar Diaspora Fund", role: "Investor advisor · Dubai" },
  { name: "Ayesha K.", role: "Legal / SECP literacy · London" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            About
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Sarmaya
          </h1>
          <p className="mt-5 max-w-xl text-stone/60">
            Growth investment into operating Pakistani businesses and startups —
            built diaspora-first.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 space-y-14">
        <section>
          <h2 className="font-display text-2xl font-semibold">Mission</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Make verified Pakistani growth opportunities discoverable to diaspora
            and domestic investors — without ever custodying deal capital.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Vision</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            The default trust layer for off-platform closes: listings, verification,
            and diligence tools that respect SECP boundaries for crowdfunding.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Founders</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Sarmaya is being built as an operator-led product with advisors from
            manufacturing, agri-export, and SME software. Public founder bios expand
            as the company incorporates for Plan B.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Team</h2>
          <ul className="mt-6 space-y-6">
            {people.map((p) => (
              <li key={p.name} className="border-t border-[var(--line-dark)] pt-4">
                <p className="font-display text-lg font-semibold">{p.name}</p>
                <p className="text-sm text-brass">{p.role}</p>
                <p className="mt-2 text-sm text-ink/70">{p.bio}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Advisors</h2>
          <ul className="mt-6 space-y-3">
            {advisors.map((a) => (
              <li key={a.name} className="text-sm">
                <span className="font-medium">{a.name}</span>
                <span className="text-muted"> · {a.role}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Timeline</h2>
          <ol className="mt-6 space-y-4">
            {timeline.map((t) => (
              <li
                key={t.when}
                className="flex gap-4 border-t border-[var(--line-dark)] pt-4"
              >
                <span className="w-24 shrink-0 text-xs tracking-widest text-brass uppercase">
                  {t.when}
                </span>
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-sm text-ink/70">{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold">Media</h2>
          <p className="mt-4 text-sm text-muted">
            Press logos and mentions will land here. For now, contact media via the
            contact form.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Press kit", "Logo lockup", "Brand brass", "Product stills"].map(
              (label) => (
                <div
                  key={label}
                  className="flex h-20 items-center justify-center border border-dashed border-[var(--line-dark)] text-xs tracking-widest text-muted uppercase"
                >
                  {label}
                </div>
              ),
            )}
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-block text-sm text-brass hover:underline"
          >
            Media contact →
          </Link>
        </section>
      </div>
    </div>
  );
}
