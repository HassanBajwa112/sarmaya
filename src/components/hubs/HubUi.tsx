import Link from "next/link";
import type { HubArticle, HubKind } from "@/lib/data/hubs";
import { hubCategories } from "@/lib/data/hubs";

export function HubHero({
  hub,
  title,
  description,
}: {
  hub: HubKind;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
          {hub === "investors" ? "Investor Hub" : "Founder Hub"}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-stone/60">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href={hub === "investors" ? "/hubs/founders" : "/hubs/investors"}
            className="text-brass hover:underline"
          >
            {hub === "investors" ? "Founder Hub →" : "Investor Hub →"}
          </Link>
          <Link href="/browse" className="text-stone/50 hover:text-stone">
            Browse listings
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HubCategoryChips({
  hub,
  active,
}: {
  hub: HubKind;
  active?: string;
}) {
  const base = hub === "investors" ? "/hubs/investors" : "/hubs/founders";
  const cats = hubCategories(hub);
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={base}
        className={`px-3 py-1.5 text-xs tracking-wide ${
          !active || active === "All"
            ? "bg-ink text-stone"
            : "border border-[var(--line-dark)] text-ink/70 hover:border-ink"
        }`}
      >
        All
      </Link>
      {cats.map((c) => (
        <Link
          key={c}
          href={`${base}?category=${encodeURIComponent(c)}`}
          className={`px-3 py-1.5 text-xs tracking-wide ${
            active === c
              ? "bg-ink text-stone"
              : "border border-[var(--line-dark)] text-ink/70 hover:border-ink"
          }`}
        >
          {c}
        </Link>
      ))}
    </div>
  );
}

export function HubArticleCard({
  article,
  hub,
}: {
  article: HubArticle;
  hub: HubKind;
}) {
  const base = hub === "investors" ? "/hubs/investors" : "/hubs/founders";
  return (
    <Link
      href={`${base}/${article.slug}`}
      className="block border-b border-[var(--line-dark)] py-8 transition hover:bg-stone-muted/40"
    >
      <p className="text-xs tracking-widest text-brass uppercase">
        {article.category} ·{" "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight">
        {article.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/65">
        {article.excerpt}
      </p>
      <p className="mt-4 text-sm text-brass">Read →</p>
    </Link>
  );
}
