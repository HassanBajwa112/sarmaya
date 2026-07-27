import type { TrustScoreResult } from "@/lib/trust/compute-trust-score";

export function TrustBreakdownPanel({ result }: { result: TrustScoreResult }) {
  return (
    <div className="border border-[var(--line-dark)] bg-white p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">Trust score</h3>
          <p className="mt-1 text-sm text-muted">
            Computed server-side from verification and activity signals.
          </p>
        </div>
        <p className="font-display text-4xl font-semibold text-brass">
          {result.score}
        </p>
      </div>
      <ul className="mt-6 space-y-3">
        {result.breakdown.map((b) => (
          <li key={b.key} className="border-t border-[var(--line-dark)] pt-3">
            <div className="flex justify-between gap-3 text-sm">
              <span className="font-medium text-ink">{b.label}</span>
              <span className="text-muted">
                {b.points}/{b.maxPoints}
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden bg-stone-muted">
              <div
                className="h-full bg-brass"
                style={{
                  width: `${b.maxPoints ? (b.points / b.maxPoints) * 100 : 0}%`,
                }}
              />
            </div>
            <p className="mt-1 text-xs text-muted">{b.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
