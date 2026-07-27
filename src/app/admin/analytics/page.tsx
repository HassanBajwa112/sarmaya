import type { Metadata } from "next";
import { siteAnalytics } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Admin · Analytics" };

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Analytics</h1>
      <p className="mt-2 text-sm text-stone/55">
        Site-wide metrics (seed). Not investor personal analytics.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Signups", value: siteAnalytics.signups },
          { label: "Listings live", value: siteAnalytics.listingsLive },
          { label: "Ask volume (Cr)", value: siteAnalytics.fundingAskPkrCr },
          { label: "Raised (Cr)", value: siteAnalytics.fundingRaisedPkrCr },
          {
            label: "Verification pending",
            value: siteAnalytics.verificationPending,
          },
          { label: "Messages (demo)", value: siteAnalytics.messagesDemo },
        ].map((s) => (
          <div key={s.label} className="border border-stone/15 bg-ink-soft p-5">
            <p className="text-xs tracking-widest text-stone/45 uppercase">
              {s.label}
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-brass">
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <h2 className="font-display mt-14 text-xl font-semibold text-stone">
        Conversion funnel
      </h2>
      <ul className="mt-4 space-y-3">
        {siteAnalytics.funnel.map((f) => (
          <li key={f.stage} className="border border-stone/10 bg-ink-soft p-4">
            <div className="flex justify-between text-sm">
              <span className="text-stone/80">{f.stage}</span>
              <span className="text-brass">{f.count.toLocaleString()}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden bg-stone/10">
              <div
                className="h-full bg-brass"
                style={{
                  width: `${Math.round(
                    (f.count / siteAnalytics.funnel[0].count) * 100,
                  )}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
