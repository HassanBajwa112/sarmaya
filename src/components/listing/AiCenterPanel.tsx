"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { AiInsights } from "@/lib/data/ai-insights";
import { formatPkrCr } from "@/lib/data/listings";

export function AiCenterPanel({
  slug,
  initial,
  match,
  similarTitles,
}: {
  slug: string;
  initial: AiInsights;
  match: { score: number; reasons: string[] };
  similarTitles: { slug: string; title: string }[];
}) {
  const [insights, setInsights] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const regenerate = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/ai/${slug}`, { method: "POST" });
        if (!res.ok) throw new Error("Regenerate failed");
        const data = (await res.json()) as AiInsights;
        setInsights(data);
      } catch {
        setError("Could not regenerate. Showing cached insights.");
      }
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-brass uppercase">AI Center</p>
          <h2 className="font-display mt-1 text-2xl font-semibold">
            Generated insights
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Cached server-side. Estimates are not investment advice. Regenerates via
            API route (heuristic seed; Claude when{" "}
            <code className="text-ink/70">ANTHROPIC_API_KEY</code> is set).
          </p>
        </div>
        <button
          type="button"
          onClick={regenerate}
          disabled={pending}
          className="border border-[var(--line-dark)] bg-white px-4 py-2 text-sm hover:border-ink disabled:opacity-50"
        >
          {pending ? "Regenerating…" : "Regenerate"}
        </button>
      </div>
      {error && <p className="text-sm text-muted">{error}</p>}
      <p className="text-xs text-muted">
        Generated {new Date(insights.generatedAt).toLocaleString()}
      </p>

      <section>
        <h3 className="font-display text-lg font-semibold">Business summary</h3>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70 whitespace-pre-line">
          {insights.summary}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold">
          AI risk supplement
        </h3>
        <p className="mt-1 text-sm text-muted">
          Supplements founder-provided risk — does not replace it.
        </p>
        <dl className="mt-4 space-y-4">
          {(
            [
              ["Market", insights.riskSupplement.market],
              ["Financial", insights.riskSupplement.financial],
              ["Operational", insights.riskSupplement.operational],
            ] as const
          ).map(([label, body]) => (
            <div key={label} className="border-t border-[var(--line-dark)] pt-3">
              <dt className="text-xs tracking-widest text-brass uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-sm text-ink/70">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold">Investment match</h3>
        <p className="mt-1 text-sm text-muted">
          Vs demo investor preferences (industries, ticket, model).
        </p>
        <p className="font-display mt-3 text-3xl font-semibold text-brass">
          {match.score}
          <span className="ml-2 text-base font-normal text-muted">/ 100 fit</span>
        </p>
        <ul className="mt-3 list-inside list-disc text-sm text-ink/70">
          {match.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold">Valuation estimate</h3>
        <p className="font-display mt-3 text-2xl font-semibold">
          {formatPkrCr(insights.valuation.lowPkrCr)} –{" "}
          {formatPkrCr(insights.valuation.highPkrCr)}
        </p>
        <p className="mt-2 text-sm text-ink/70">{insights.valuation.method}</p>
        <p className="mt-2 text-xs text-muted">{insights.valuation.disclaimer}</p>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold">Similar businesses</h3>
        <ul className="mt-3 space-y-2">
          {similarTitles.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/listings/${s.slug}`}
                className="text-sm text-brass hover:underline"
              >
                {s.title} →
              </Link>
            </li>
          ))}
          {similarTitles.length === 0 && (
            <li className="text-sm text-muted">No close peers in seed set.</li>
          )}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold">Due diligence checklist</h3>
        <ul className="mt-3 space-y-2">
          {insights.dueDiligence.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 border-t border-[var(--line-dark)] pt-3 text-sm text-ink/70"
            >
              <span className="text-brass">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-dashed border-[var(--line-dark)] p-6">
        <h3 className="font-display text-lg font-semibold">Market insights</h3>
        <p className="mt-2 text-sm text-muted">Coming soon — sector heatmaps and diaspora corridor stats.</p>
      </section>
    </div>
  );
}
