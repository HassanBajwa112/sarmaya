import type { Category } from "./listing-types";
import { listings } from "./listings";

export type AiRiskSupplement = {
  market: string;
  financial: string;
  operational: string;
};

export type AiInsights = {
  listingSlug: string;
  generatedAt: string;
  summary: string;
  riskSupplement: AiRiskSupplement;
  valuation: {
    lowPkrCr: number;
    highPkrCr: number;
    method: string;
    disclaimer: string;
  };
  dueDiligence: string[];
  similarSlugs: string[];
  /** Admin-only — never render on public listing. */
  fraudFlags: { code: string; detail: string; severity: "low" | "med" | "high" }[];
};

const INDUSTRY_MULTIPLES: Partial<Record<Category, { rev: number; profit: number }>> = {
  Manufacturing: { rev: 1.2, profit: 8 },
  Agribusiness: { rev: 1.0, profit: 7 },
  "Tech/SaaS": { rev: 4.0, profit: 15 },
  "Retail & Franchise": { rev: 1.1, profit: 9 },
  Healthcare: { rev: 1.5, profit: 10 },
  Education: { rev: 1.3, profit: 9 },
  Logistics: { rev: 1.0, profit: 8 },
  "Energy & Climate": { rev: 1.4, profit: 10 },
};

/** Seeded AI cache — regenerated via API when Anthropic key present, else rebuilt heuristically. */
export const aiInsightsCache: Record<string, AiInsights> = {};

function similarFor(slug: string, category: Category, city: string): string[] {
  return listings
    .filter(
      (l) =>
        l.slug !== slug && (l.category === category || l.city === city),
    )
    .slice(0, 3)
    .map((l) => l.slug);
}

function buildForSlug(slug: string): AiInsights | null {
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) return null;

  const mult = INDUSTRY_MULTIPLES[listing.category] ?? { rev: 1.2, profit: 8 };
  const revVal = listing.revenuePkrCr * mult.rev;
  const profitVal =
    listing.profitPkrCr > 0 ? listing.profitPkrCr * mult.profit : revVal * 0.6;
  const mid = (revVal + profitVal) / 2;
  const low = Math.max(0.1, Number((mid * 0.75).toFixed(2)));
  const high = Number((mid * 1.35).toFixed(2));

  const fraudFlags: AiInsights["fraudFlags"] = [];
  if (listing.revenuePkrCr > 0 && listing.financials.length) {
    const latest = listing.financials[listing.financials.length - 1];
    if (Math.abs(latest.revenuePkrCr - listing.revenuePkrCr) > 0.5) {
      fraudFlags.push({
        code: "revenue_mismatch",
        detail: `Highlight revenue ${listing.revenuePkrCr} Cr vs latest financial year ${latest.revenuePkrCr} Cr`,
        severity: "med",
      });
    }
  }
  if (listing.type === "startup" && listing.revenuePkrCr > 5) {
    fraudFlags.push({
      code: "startup_revenue_outlier",
      detail: "Startup claims revenue unusually high for stage — review invoices",
      severity: "low",
    });
  }
  if (
    listing.verification.businessClaim === false &&
    listing.trustScore > 80
  ) {
    fraudFlags.push({
      code: "trust_vs_verification",
      detail: "Trust score elevated while business claim unverified",
      severity: "high",
    });
  }

  return {
    listingSlug: slug,
    generatedAt: "2026-07-20T12:00:00Z",
    summary: [
      `${listing.title} is a ${listing.type === "startup" ? "startup pitch" : "operating business"} in ${listing.category}, based in ${listing.city}.`,
      listing.ownerStory,
      `The raise is ${listing.raiseAsk} (${listing.investmentModel}) at stage “${listing.stage}”. Expected ROI framing: ${listing.expectedRoi}. Founder ${listing.founderName} positions this as growth capital — deals close off-platform.`,
    ].join("\n\n"),
    riskSupplement: {
      market: `AI note: ${listing.risk.market} Watch competitive density in ${listing.category} across ${listing.city}.`,
      financial: `AI note: ${listing.risk.financial} Ask for trailing twelve-month bank statements before intro.`,
      operational: `AI note: ${listing.risk.operational} Confirm key-person dependency on ${listing.founderName}.`,
    },
    valuation: {
      lowPkrCr: low,
      highPkrCr: high,
      method: `${listing.category} heuristic · ~${mult.rev}× revenue / ~${mult.profit}× profit blend`,
      disclaimer:
        "Estimate only — not a formal valuation, fairness opinion, or investment recommendation.",
    },
    dueDiligence: [
      "Request source documents for the latest revenue and profit figures.",
      "Confirm how diaspora capital would be wired and which entity issues equity/profit-share.",
      "Ask for customer concentration and top-5 client revenue share.",
      listing.type === "startup"
        ? "Validate pilot/LOI conversion rates and churn."
        : "Walk the facility or review recent site photos with timestamps.",
      "Clarify founder control rights post-raise and any related-party leases.",
      "Check tax clearance and pending litigation disclosures.",
    ],
    similarSlugs: similarFor(slug, listing.category, listing.city),
    fraudFlags,
  };
}

export function getAiInsights(slug: string): AiInsights | null {
  if (!aiInsightsCache[slug]) {
    const built = buildForSlug(slug);
    if (built) aiInsightsCache[slug] = built;
  }
  return aiInsightsCache[slug] ?? null;
}

export function regenerateAiInsights(slug: string): AiInsights | null {
  const built = buildForSlug(slug);
  if (built) {
    built.generatedAt = new Date().toISOString();
    aiInsightsCache[slug] = built;
  }
  return built;
}

export type InvestorPreferences = {
  industries: Category[];
  cities: string[];
  ticketMinPkrCr: number;
  ticketMaxPkrCr: number;
  models: ("equity" | "profit-share" | "either")[];
};

/** Demo investor preferences for AI Investment Match. */
export const DEMO_INVESTOR_PREFS: InvestorPreferences = {
  industries: ["Manufacturing", "Energy & Climate", "Tech/SaaS"],
  cities: ["Lahore", "Karachi", "Faisalabad"],
  ticketMinPkrCr: 1,
  ticketMaxPkrCr: 5,
  models: ["equity", "either"],
};

export function scoreInvestmentMatch(
  slug: string,
  prefs: InvestorPreferences = DEMO_INVESTOR_PREFS,
): { score: number; reasons: string[] } {
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) return { score: 0, reasons: ["Listing not found"] };

  let score = 0;
  const reasons: string[] = [];

  if (prefs.industries.includes(listing.category)) {
    score += 35;
    reasons.push(`Industry match · ${listing.category}`);
  }
  if (prefs.cities.includes(listing.city)) {
    score += 20;
    reasons.push(`City match · ${listing.city}`);
  }
  if (
    listing.askAmountPkrCr >= prefs.ticketMinPkrCr &&
    listing.askAmountPkrCr <= prefs.ticketMaxPkrCr
  ) {
    score += 25;
    reasons.push("Ask within ticket range");
  }
  if (
    prefs.models.includes(listing.investmentModel) ||
    listing.investmentModel === "either"
  ) {
    score += 20;
    reasons.push("Investment model compatible");
  }

  return { score: Math.min(100, score), reasons };
}

export function rankListingsForInvestor(
  prefs: InvestorPreferences = DEMO_INVESTOR_PREFS,
): { slug: string; score: number; reasons: string[] }[] {
  return listings
    .map((l) => {
      const m = scoreInvestmentMatch(l.slug, prefs);
      return { slug: l.slug, ...m };
    })
    .sort((a, b) => b.score - a.score);
}
