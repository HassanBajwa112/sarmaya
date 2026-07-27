export type HubKind = "investors" | "founders";

export type InvestorCategory =
  | "Articles"
  | "Market Reports"
  | "Investment Guides"
  | "Startup News"
  | "Business Trends"
  | "Pakistan Economy"
  | "Exit Stories";

export type FounderCategory =
  | "How to Raise"
  | "Pitch Deck Guide"
  | "Financial Templates"
  | "Legal Guide"
  | "Valuation Guide"
  | "Investor Expectations";

export type HubArticle = {
  slug: string;
  hub: HubKind;
  category: InvestorCategory | FounderCategory;
  title: string;
  excerpt: string;
  publishedAt: string;
  body: string[];
};

export const INVESTOR_CATEGORIES: InvestorCategory[] = [
  "Articles",
  "Market Reports",
  "Investment Guides",
  "Startup News",
  "Business Trends",
  "Pakistan Economy",
  "Exit Stories",
];

export const FOUNDER_CATEGORIES: FounderCategory[] = [
  "How to Raise",
  "Pitch Deck Guide",
  "Financial Templates",
  "Legal Guide",
  "Valuation Guide",
  "Investor Expectations",
];

export const hubArticles: HubArticle[] = [
  {
    slug: "reading-pkr-unit-economics",
    hub: "investors",
    category: "Investment Guides",
    title: "How to read PKR unit economics on Sarmaya",
    excerpt:
      "A practical guide to revenue, contribution margin, and ask sizing when capital closes off-platform.",
    publishedAt: "2026-06-12",
    body: [
      "Sarmaya listings show financials in PKR crore and lakh so diaspora and domestic investors share one frame. Start with trailing revenue and profit, then ask how concentrated the top customers are.",
      "The ask amount is not a valuation — it is the capital the founder wants for a defined use of funds. Equity % or profit-share terms are starting points for an off-platform negotiation.",
      "Trust score and verification tiers tell you what has been human-reviewed. They are not a substitute for your own diligence or counsel.",
    ],
  },
  {
    slug: "punjab-manufacturing-corridor",
    hub: "investors",
    category: "Market Reports",
    title: "Punjab manufacturing corridor — 2026 snapshot",
    excerpt:
      "OEM suppliers, energy costs, and working-capital patterns shaping expansion raises.",
    publishedAt: "2026-05-28",
    body: [
      "Lahore–Gujranwala–Faisalabad remains the densest cluster for precision parts, textiles-adjacent fabrication, and C&I solar installs serving factories.",
      "Working capital and inventory float dominate expansion raises. Diaspora co-investors often prefer profit-share structures ring-fenced to a new line or pack-house.",
      "Policy and FX swings still move margins — treat energy and import inputs as first-class diligence items.",
    ],
  },
  {
    slug: "rda-friendly-intro-paths",
    hub: "investors",
    category: "Articles",
    title: "RDA-friendly intro paths without custody",
    excerpt:
      "Why Sarmaya stays a directory: intros and diligence, not fund movement.",
    publishedAt: "2026-04-02",
    body: [
      "Roshan Digital Account corridors matter for many overseas Pakistanis. Sarmaya does not move investor money — deals close between parties and their banks/counsel.",
      "Use listing documents and verification timelines to decide whether an intro call is worth your time. Download gates exist so founders control who sees sensitive packs.",
      "If a platform ever offers custody or crowdfunding, that would be a different product and regulatory path. This build is Tier-1 directory only.",
    ],
  },
  {
    slug: "saas-seed-in-karachi",
    hub: "investors",
    category: "Startup News",
    title: "What “seed” looks like for Karachi SaaS",
    excerpt:
      "MRR, net retention, and bank-feed reliability as diligence anchors.",
    publishedAt: "2026-07-01",
    body: [
      "Pakistani SME SaaS raises are still small by global seed standards, but paid logos and retention tell a clearer story than TAM slides.",
      "Ask for churn methodology and whether bank/JazzCash feeds fail silently — that operational risk shows up in support load before it shows up in revenue.",
    ],
  },
  {
    slug: "cold-chain-export-windows",
    hub: "investors",
    category: "Business Trends",
    title: "Cold chain and export windows",
    excerpt:
      "Seasonality, spoilage, and pack-house capex for agri exporters.",
    publishedAt: "2026-03-18",
    body: [
      "Mango and vegetable export windows compress cash flow into a few intense months. Pack-house and solar backup raises should be stress-tested against a weak season.",
      "Profit-share ring-fenced to a new facility can align diaspora capital with a measurable P&L without buying the whole operating company.",
    ],
  },
  {
    slug: "pakistan-growth-vs-liquidity",
    hub: "investors",
    category: "Pakistan Economy",
    title: "Growth businesses vs liquidity reality",
    excerpt:
      "Illiquidity is the default — structure expectations accordingly.",
    publishedAt: "2026-02-10",
    body: [
      "Most Sarmaya opportunities are illiquid growth stakes, not public-market trades. Expected ROI ranges are founder framing, not guarantees.",
      "Plan your ticket size for multi-year horizons and off-platform legal close costs.",
    ],
  },
  {
    slug: "quiet-exits-not-ipos",
    hub: "investors",
    category: "Exit Stories",
    title: "Quiet exits, not IPOs",
    excerpt:
      "How operating businesses return capital without a listing event.",
    publishedAt: "2026-01-22",
    body: [
      "Secondary sales to strategic buyers, profit-share runoffs, and founder buybacks are more common narratives than IPOs for mid-market Pakistan operators.",
      "Ask founders how they think about exit paths before you wire capital — Sarmaya will not intermediate that close.",
    ],
  },
  {
    slug: "raise-without-selling-control",
    hub: "founders",
    category: "How to Raise",
    title: "Raise growth capital without selling control",
    excerpt:
      "Equity vs profit-share framing for operating businesses on Sarmaya.",
    publishedAt: "2026-06-20",
    body: [
      "Lead with use of funds and what stays founder-controlled. Investors scanning Sarmaya want growth stakes, not a disguised whole-business sale.",
      "Be explicit about minority rights, information rights, and how diaspora capital will be received — the platform does not custody funds.",
      "Verification layers (identity, business, financial) unlock trust before the intro call.",
    ],
  },
  {
    slug: "pitch-deck-checklist-pk",
    hub: "founders",
    category: "Pitch Deck Guide",
    title: "Pitch deck checklist for Pakistani growth raises",
    excerpt:
      "Ten slides that survive diaspora investor scrutiny.",
    publishedAt: "2026-05-05",
    body: [
      "Problem, solution, traction, unit economics, ask, and risk are non-negotiable. Fancy animation is optional.",
      "Include a clear custody disclaimer: intros on Sarmaya, close off-platform with your own counsel.",
      "Attach source docs in the listing Documents section rather than stuffing the deck with unreadably small tables.",
    ],
  },
  {
    slug: "financial-template-three-year",
    hub: "founders",
    category: "Financial Templates",
    title: "Three-year P&L template that investors actually use",
    excerpt:
      "Revenue, expenses, profit — keep units consistent in PKR Cr.",
    publishedAt: "2026-04-14",
    body: [
      "Publish three years of revenue, expenses, and profit in the same units you use in the ask. Inconsistencies trigger AI fraud flags for admin review.",
      "Downloadable spreadsheet templates will land in Plan B storage — for now, mirror the Financial Highlights table structure on your listing.",
    ],
  },
  {
    slug: "secp-ntn-basics",
    hub: "founders",
    category: "Legal Guide",
    title: "SECP / NTN basics before you submit verification",
    excerpt:
      "Name match, registration, and what reviewers reject.",
    publishedAt: "2026-03-01",
    body: [
      "Identity CNIC names must match SECP registration or you need an affidavit. Most business-claim rejections start here.",
      "Sarmaya is not your lawyer — use counsel for term sheets. We only verify claims enough for directory trust.",
    ],
  },
  {
    slug: "valuation-ranges-not-promises",
    hub: "founders",
    category: "Valuation Guide",
    title: "Valuation ranges are estimates, not promises",
    excerpt:
      "How AI valuation and your ask should stay honest.",
    publishedAt: "2026-07-08",
    body: [
      "Industry multiples on Sarmaya’s AI Center are heuristics. Label them as estimates when you discuss them with investors.",
      "Your ask should tie to use of funds and runway, not to the top of an AI range.",
    ],
  },
  {
    slug: "what-investors-ask-first",
    hub: "founders",
    category: "Investor Expectations",
    title: "What investors ask in the first fifteen minutes",
    excerpt:
      "Concentration, custody path, and responsiveness.",
    publishedAt: "2026-02-25",
    body: [
      "Expect questions on customer concentration, how money moves, and how fast you answer. Activity signals feed trust score.",
      "Keep Q&A on the listing current — unanswered public questions read as operational risk.",
    ],
  },
];

export function getHubArticles(
  hub: HubKind,
  category?: string,
): HubArticle[] {
  return hubArticles
    .filter((a) => a.hub === hub)
    .filter((a) => !category || category === "All" || a.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getHubArticle(
  hub: HubKind,
  slug: string,
): HubArticle | undefined {
  return hubArticles.find((a) => a.hub === hub && a.slug === slug);
}

export function hubCategories(hub: HubKind): string[] {
  return hub === "investors" ? INVESTOR_CATEGORIES : FOUNDER_CATEGORIES;
}
