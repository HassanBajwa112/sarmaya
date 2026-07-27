import type { Metadata } from "next";
import Link from "next/link";
import { hubArticles } from "@/lib/data/hubs";

export const metadata: Metadata = { title: "Admin · Content" };

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Content</h1>
      <p className="mt-2 text-sm text-stone/55">
        Hub articles from seed. Edit in{" "}
        <code className="text-brass">src/lib/data/hubs.ts</code> — no separate CMS
        in Plan A.
      </p>
      <ul className="mt-8 divide-y divide-stone/10 border-y border-stone/10">
        {hubArticles.map((a) => (
          <li
            key={`${a.hub}-${a.slug}`}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div>
              <p className="font-medium text-stone">{a.title}</p>
              <p className="text-sm text-stone/50">
                {a.hub} · {a.category} · {a.publishedAt}
              </p>
            </div>
            <Link
              href={`/hubs/${a.hub}/${a.slug}`}
              className="text-sm text-brass hover:underline"
            >
              View →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
