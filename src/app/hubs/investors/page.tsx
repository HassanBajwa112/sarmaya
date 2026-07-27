import type { Metadata } from "next";
import {
  HubArticleCard,
  HubCategoryChips,
  HubHero,
} from "@/components/hubs/HubUi";
import { getHubArticles } from "@/lib/data/hubs";

export const metadata: Metadata = { title: "Investor Hub" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InvestorHubPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  const category = raw || undefined;
  const articles = getHubArticles("investors", category);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <HubHero
        hub="investors"
        title="Investor Hub"
        description="Guides, market notes, and diligence reading for diaspora and domestic investors."
      />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <HubCategoryChips hub="investors" active={category} />
        <p className="mt-6 text-sm text-muted">
          {articles.length} article{articles.length === 1 ? "" : "s"}
        </p>
        <div className="mt-2">
          {articles.map((a) => (
            <HubArticleCard key={a.slug} article={a} hub="investors" />
          ))}
          {articles.length === 0 && (
            <p className="py-16 text-center text-muted">
              No articles in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
