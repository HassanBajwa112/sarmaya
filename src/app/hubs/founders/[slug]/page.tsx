import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHubArticle, getHubArticles } from "@/lib/data/hubs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getHubArticles("founders").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHubArticle("founders", slug);
  if (!article) return { title: "Article" };
  return { title: article.title, description: article.excerpt };
}

export default async function FounderArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getHubArticle("founders", slug);
  if (!article) notFound();

  return (
    <article className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          href="/hubs/founders"
          className="text-xs tracking-widest text-brass uppercase hover:underline"
        >
          ← Founder Hub
        </Link>
        <p className="mt-8 text-xs tracking-widest text-muted uppercase">
          {article.category} ·{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-ink/60">{article.excerpt}</p>
        <div className="mt-12 space-y-6 text-base leading-relaxed text-ink/75">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-14 text-xs leading-relaxed text-muted">
          Not financial or legal advice. Sarmaya is a Tier 1 directory — deals
          close off-platform.
        </p>
      </div>
    </article>
  );
}
