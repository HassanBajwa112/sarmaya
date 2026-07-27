export type ListingType = "existing" | "startup";

export type Category =
  | "Manufacturing"
  | "Agribusiness"
  | "Tech/SaaS"
  | "Retail & Franchise"
  | "Healthcare"
  | "Education"
  | "Logistics"
  | "Energy & Climate";

export type FundingStage = "Pre-seed" | "Seed" | "Seed+" | "Expansion" | "Scale" | "Working capital" | "Fleet expansion" | "Franchise scale" | "Export expansion" | "Multi-store";

export type InvestmentModel = "equity" | "profit-share" | "either";

export type VerificationTier = "unverified" | "partial" | "full";

export type VerificationStatus = {
  identity: boolean;
  businessClaim: boolean;
  humanReviewed: boolean;
};

export type YearFinancial = {
  year: number;
  revenuePkrCr: number;
  expensesPkrCr: number;
  profitPkrCr: number;
};

export type ListingDocument = {
  id: string;
  title: string;
  kind: "pitch" | "financial" | "verification" | "other";
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
};

export type RoadmapItem = {
  label: string;
  timing: string;
  done: boolean;
};

export type QAItem = {
  question: string;
  answer?: string;
  askedBy: string;
};

export type RiskAnalysis = {
  market: string;
  financial: string;
  operational: string;
};

export type Listing = {
  slug: string;
  type: ListingType;
  category: Category;
  title: string;
  city: string;
  raiseAsk: string;
  stage: FundingStage | string;
  shortPitch: string;
  longPitch: string;
  imageUrl: string;
  verification: VerificationStatus;
  featured: boolean;
  diasporaNote?: string;
  founderName: string;
  foundedYear?: number;
  highlightMetrics: { label: string; value: string }[];

  /** Marketplace Phase 1 fields (PKR Crore units unless noted). */
  revenuePkrCr: number;
  profitPkrCr: number;
  askAmountPkrCr: number;
  raisedPkrCr: number;
  equityPct?: number;
  profitSharePct?: number;
  investmentModel: InvestmentModel;
  expectedRoi: string;
  trustScore: number;
  employees: number;
  financials: YearFinancial[];
  ownerStory: string;
  risk: RiskAnalysis;
  documents: ListingDocument[];
  qa: QAItem[];

  /** Startup-only (optional for existing). */
  problem?: string;
  solution?: string;
  market?: string;
  team?: TeamMember[];
  traction?: string;
  roadmap?: RoadmapItem[];
  demoUrl?: string;
  milestones?: RoadmapItem[];
};

export const CATEGORIES: Category[] = [
  "Manufacturing",
  "Agribusiness",
  "Tech/SaaS",
  "Retail & Franchise",
  "Healthcare",
  "Education",
  "Logistics",
  "Energy & Climate",
];

export const CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Hyderabad",
  "Multan",
  "Peshawar",
  "Gujranwala",
  "Gilgit",
] as const;

export const FUNDING_STAGES = [
  "Pre-seed",
  "Seed",
  "Seed+",
  "Expansion",
  "Scale",
  "Working capital",
  "Fleet expansion",
  "Franchise scale",
  "Export expansion",
  "Multi-store",
] as const;

export const POSITIONING =
  "Growth investment into operating Pakistani businesses and startups — built diaspora-first.";
