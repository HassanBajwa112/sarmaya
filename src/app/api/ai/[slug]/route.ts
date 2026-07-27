import { NextResponse } from "next/server";
import {
  getAiInsights,
  regenerateAiInsights,
} from "@/lib/data/ai-insights";
import { getListing } from "@/lib/data/listings";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  if (!getListing(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const insights = getAiInsights(slug);
  return NextResponse.json(insights);
}

export async function POST(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  if (!getListing(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Prefer Anthropic when key present; fall back to heuristic seed rebuild.
  const key = process.env.ANTHROPIC_API_KEY;
  if (key) {
    try {
      const listing = getListing(slug)!;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [
            {
              role: "user",
              content: `Write a 2-3 paragraph plain-English investment summary for this Pakistani business listing (no custody, directory only). Title: ${listing.title}. Pitch: ${listing.longPitch}. Owner story: ${listing.ownerStory}. Revenue ${listing.revenuePkrCr} Cr, profit ${listing.profitPkrCr} Cr, ask ${listing.askAmountPkrCr} Cr.`,
            },
          ],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          content?: { type: string; text?: string }[];
        };
        const text = data.content?.find((c) => c.type === "text")?.text;
        const base = regenerateAiInsights(slug);
        if (base && text) {
          base.summary = text;
          base.generatedAt = new Date().toISOString();
          return NextResponse.json(base);
        }
      }
    } catch {
      // fall through to heuristic
    }
  }

  const insights = regenerateAiInsights(slug);
  return NextResponse.json(insights);
}
