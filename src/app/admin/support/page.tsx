import type { Metadata } from "next";
import { supportTickets } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Admin · Support" };

export default function AdminSupportPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Support</h1>
      <p className="mt-2 text-sm text-stone/55">
        Tickets seeded from contact topics. Demo queue — not wired to inbox.
      </p>
      <ul className="mt-8 divide-y divide-stone/10 border-y border-stone/10">
        {supportTickets.map((t) => (
          <li key={t.id} className="py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-stone">{t.subject}</p>
                <p className="text-sm text-stone/50">
                  {t.topic} · {t.from} ·{" "}
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`text-xs tracking-widest uppercase ${
                  t.status === "open"
                    ? "text-brass"
                    : t.status === "pending"
                      ? "text-stone/70"
                      : "text-stone/40"
                }`}
              >
                {t.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
