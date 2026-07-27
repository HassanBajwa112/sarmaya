import type {
  Listing,
  ListingDocument,
  YearFinancial,
} from "./listing-types";
import { verificationTier } from "./listing-format";

export type {
  Listing,
  ListingType,
  Category,
  VerificationStatus,
  InvestmentModel,
  YearFinancial,
  ListingDocument,
  TeamMember,
  RoadmapItem,
  QAItem,
  RiskAnalysis,
  VerificationTier,
  FundingStage,
} from "./listing-types";

export {
  CATEGORIES,
  CITIES,
  FUNDING_STAGES,
  POSITIONING,
} from "./listing-types";

export {
  formatPkrCr,
  verificationTier,
  verificationTierLabel,
  fundingProgress,
  investmentTermsLabel,
  businessAgeYears,
} from "./listing-format";

function years(
  start: number,
  rows: [number, number, number][],
): YearFinancial[] {
  return rows.map(([revenuePkrCr, expensesPkrCr, profitPkrCr], i) => ({
    year: start + i,
    revenuePkrCr,
    expensesPkrCr,
    profitPkrCr,
  }));
}

function docs(slug: string, extras: ListingDocument[] = []): ListingDocument[] {
  return [
    { id: `${slug}-pitch`, title: "Pitch deck (PDF)", kind: "pitch" },
    { id: `${slug}-fin`, title: "Financial summary", kind: "financial" },
    { id: `${slug}-id`, title: "Identity verification pack", kind: "verification" },
    ...extras,
  ];
}

function trustFrom(v: Listing["verification"], base: number): number {
  const tier = verificationTier(v);
  const bump = tier === "full" ? 18 : tier === "partial" ? 8 : 0;
  return Math.min(98, base + bump);
}

export const listings: Listing[] = [
  {
    slug: "lahore-precision-parts",
    type: "existing",
    category: "Manufacturing",
    title: "Lahore Precision Parts",
    city: "Lahore",
    raiseAsk: "PKR 4.5 Cr",
    stage: "Expansion",
    shortPitch:
      "CNC machining supplier to auto OEMs seeking growth capital to add a second shift line.",
    longPitch:
      "Family-run precision machining business with multi-year purchase orders from Tier-1 auto suppliers. Capital funds a second CNC line, tooling, and working capital for export-ready capacity. Deal structure: minority equity or profit-share; founders retain operating control.",
    imageUrl: "/media/listings/lahore-precision-parts.jpg",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: true,
    diasporaNote: "RDA-friendly intro path for overseas Pakistani investors.",
    founderName: "Imran Qureshi",
    foundedYear: 2011,
    highlightMetrics: [
      { label: "Revenue run-rate", value: "PKR 18 Cr" },
      { label: "OEM clients", value: "6" },
      { label: "Employees", value: "84" },
    ],
    revenuePkrCr: 18,
    profitPkrCr: 2.4,
    askAmountPkrCr: 4.5,
    raisedPkrCr: 1.2,
    equityPct: 18,
    investmentModel: "either",
    expectedRoi: "18–24% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      74,
    ),
    employees: 84,
    financials: years(2023, [
      [14.2, 12.1, 2.1],
      [16.0, 13.5, 2.5],
      [18.0, 15.6, 2.4],
    ]),
    ownerStory:
      "Imran took over the family shop in 2011 and spent a decade earning OEM vendor codes. The second line is about capacity, not a sale of the business — control stays with the founders.",
    risk: {
      market: "Auto OEM demand is cyclical; concentration in 6 clients is a key watch item.",
      financial: "Working-capital intensive; inventory and receivables can stretch on OEM payment cycles.",
      operational: "Skilled machinists are scarce; second-shift hiring must keep quality gates intact.",
    },
    documents: docs("lahore-precision-parts", [
      { id: "lpp-ntn", title: "NTN / FBR status letter", kind: "verification" },
    ]),
    qa: [
      {
        question: "Are OEM POs multi-year or annual renewals?",
        answer:
          "Three of six OEMs are on rolling 24-month forecasts; the rest renew annually with volume bands.",
        askedBy: "Investor (UK)",
      },
      {
        question: "Preferred structure — equity or profit-share?",
        askedBy: "Investor (Dubai)",
      },
    ],
  },
  {
    slug: "sindh-cold-chain",
    type: "existing",
    category: "Agribusiness",
    title: "Sindh Cold Chain Collective",
    city: "Hyderabad",
    raiseAsk: "PKR 3.2 Cr",
    stage: "Scale",
    shortPitch:
      "Regional cold-storage network expanding pack-house capacity for mango and vegetable exporters.",
    longPitch:
      "Operating cold rooms and reefer logistics serving exporters across Sindh. Raise funds a new pack-house and solar backup to cut spoilage. Seeking growth partners open to profit-share over a 4-year horizon.",
    imageUrl: "/media/listings/sindh-cold-chain.jpg",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: true,
    diasporaNote: "Structured for diaspora co-investment alongside local operators.",
    founderName: "Sara Memon",
    foundedYear: 2016,
    highlightMetrics: [
      { label: "Storage capacity", value: "2,400 tons" },
      { label: "Exporter clients", value: "22" },
      { label: "Spoilage reduction", value: "31%" },
    ],
    revenuePkrCr: 9.5,
    profitPkrCr: 1.1,
    askAmountPkrCr: 3.2,
    raisedPkrCr: 0.8,
    profitSharePct: 22,
    investmentModel: "profit-share",
    expectedRoi: "16–22% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      71,
    ),
    employees: 62,
    financials: years(2023, [
      [7.1, 6.2, 0.9],
      [8.4, 7.3, 1.1],
      [9.5, 8.4, 1.1],
    ]),
    ownerStory:
      "Sara built the collective with exporter co-ops after watching mango consignments spoil at the dock. The next pack-house is about reliability for Gulf buyers, not flipping the company.",
    risk: {
      market: "Export windows are seasonal; mango season dominates cash flow.",
      financial: "Capex-heavy pack-house; solar backup ROI depends on tariff stability.",
      operational: "Reefer fleet maintenance and cold-chain breaks remain operational risks.",
    },
    documents: docs("sindh-cold-chain"),
    qa: [
      {
        question: "Is profit-share tied to pack-house EBITDA only?",
        answer: "Proposed ring-fence on the new pack-house P&L for four years.",
        askedBy: "Investor (Toronto)",
      },
    ],
  },
  {
    slug: "karachi-freightlink",
    type: "existing",
    category: "Logistics",
    title: "Karachi FreightLink",
    city: "Karachi",
    raiseAsk: "PKR 2.8 Cr",
    stage: "Expansion",
    shortPitch:
      "B2B last-mile and port-to-warehouse freight platform adding fleet and route density.",
    longPitch:
      "Asset-light logistics operator with contracted lanes from Port Qasim to industrial zones. Capital expands owned vans and a dispatch stack already in use with mid-market manufacturers.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    founderName: "Bilal Sheikh",
    foundedYear: 2018,
    highlightMetrics: [
      { label: "Monthly shipments", value: "4,100+" },
      { label: "On-time rate", value: "94%" },
      { label: "Active lanes", value: "18" },
    ],
    revenuePkrCr: 11.2,
    profitPkrCr: 1.35,
    askAmountPkrCr: 2.8,
    raisedPkrCr: 0.4,
    equityPct: 15,
    investmentModel: "equity",
    expectedRoi: "15–20% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      68,
    ),
    employees: 41,
    financials: years(2023, [
      [8.0, 7.1, 0.9],
      [9.6, 8.4, 1.2],
      [11.2, 9.85, 1.35],
    ]),
    ownerStory:
      "Bilal started with two vans and Port Qasim relationships. Growth capital buys density on lanes that already have contracted demand.",
    risk: {
      market: "Freight rates compress when fuel spikes and shippers push back.",
      financial: "Fleet financing and insurance float can tighten cash.",
      operational: "Driver attrition and urban congestion affect on-time SLAs.",
    },
    documents: docs("karachi-freightlink"),
    qa: [],
  },
  {
    slug: "clinicstack",
    type: "startup",
    category: "Healthcare",
    title: "ClinicStack",
    city: "Islamabad",
    raiseAsk: "PKR 1.5 Cr",
    stage: "Seed",
    shortPitch:
      "Clinic OS for multi-doctor practices — scheduling, billing, and lab integration.",
    longPitch:
      "Pre-revenue SaaS with three paying pilot clinics. Founders are ex-hospital ops leads. Raise covers product hardening, HIPAA-style local data practices, and first sales hire. Equity raise with clear off-platform closing.",
    imageUrl: "/media/listings/clinicstack.jpg",
    verification: { identity: true, businessClaim: false, humanReviewed: true },
    featured: true,
    diasporaNote: "Founders open to angel checks via Roshan Digital Account corridors.",
    founderName: "Dr. Ayesha Rahman",
    highlightMetrics: [
      { label: "Pilot clinics", value: "3" },
      { label: "Team", value: "5" },
      { label: "ARR pipeline", value: "PKR 42 L" },
    ],
    revenuePkrCr: 0.42,
    profitPkrCr: -0.35,
    askAmountPkrCr: 1.5,
    raisedPkrCr: 0.25,
    equityPct: 12,
    investmentModel: "equity",
    expectedRoi: "Illiquid — venture equity",
    trustScore: trustFrom(
      { identity: true, businessClaim: false, humanReviewed: true },
      58,
    ),
    employees: 5,
    financials: years(2023, [
      [0.05, 0.4, -0.35],
      [0.18, 0.55, -0.37],
      [0.42, 0.77, -0.35],
    ]),
    ownerStory:
      "Ayesha left hospital ops to fix the scheduling chaos she lived every day. ClinicStack is software for clinics that still run on WhatsApp and paper.",
    risk: {
      market: "Clinic software adoption is slow; sales cycles run 3–6 months.",
      financial: "Pre-profit; burn depends on sales hire timing.",
      operational: "Data residency and local compliance must stay ahead of sales.",
    },
    documents: docs("clinicstack"),
    qa: [
      {
        question: "Are pilots converting to annual contracts?",
        answer: "Two of three have signed LOIs for annual billing post-raise.",
        askedBy: "Investor (London)",
      },
    ],
    problem:
      "Multi-doctor clinics juggle appointments, billing, and lab orders across WhatsApp threads and paper ledgers.",
    solution:
      "A clinic OS with scheduling, billing, and lab integrations built for Pakistani practice workflows.",
    market:
      "Thousands of private multi-doctor clinics in major metros; early beachhead in Islamabad and Rawalpindi.",
    team: [
      {
        name: "Dr. Ayesha Rahman",
        role: "CEO",
        bio: "Ex-hospital ops lead; 12 years in private hospital administration.",
        linkedin: "https://www.linkedin.com/",
      },
      {
        name: "Hassan Malik",
        role: "CTO",
        bio: "Previously built HIS modules for a regional hospital group.",
      },
    ],
    traction: "3 paying pilots · PKR 42 L ARR pipeline · 5-person team",
    roadmap: [
      { label: "Pilot hardening", timing: "Q2 2026", done: true },
      { label: "Lab integrations", timing: "Q3 2026", done: false },
      { label: "First sales hire", timing: "Q4 2026", done: false },
    ],
    demoUrl: "https://example.com/clinicstack-demo",
    milestones: [
      { label: "First paying pilot", timing: "2025", done: true },
      { label: "Data residency review", timing: "2026", done: true },
      { label: "10 clinics live", timing: "2027", done: false },
    ],
  },
  {
    slug: "learnlocal",
    type: "startup",
    category: "Education",
    title: "LearnLocal",
    city: "Lahore",
    raiseAsk: "PKR 90 L",
    stage: "Pre-seed",
    shortPitch:
      "Urdu-first skills marketplace connecting trainers with diaspora-funded scholarships.",
    longPitch:
      "Marketplace MVP live with 40 trainers. Pitch focuses on vocational upskilling funded by overseas relatives. Identity-verified founders; business claims limited to traction metrics reviewed manually.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: false, humanReviewed: true },
    featured: false,
    diasporaNote: "Built around diaspora scholarship pools.",
    founderName: "Hamza Tariq",
    highlightMetrics: [
      { label: "Trainers", value: "40" },
      { label: "Courses live", value: "28" },
      { label: "Learners", value: "610" },
    ],
    revenuePkrCr: 0.28,
    profitPkrCr: -0.12,
    askAmountPkrCr: 0.9,
    raisedPkrCr: 0.1,
    equityPct: 10,
    investmentModel: "equity",
    expectedRoi: "Illiquid — venture equity",
    trustScore: trustFrom(
      { identity: true, businessClaim: false, humanReviewed: true },
      52,
    ),
    employees: 4,
    financials: years(2023, [
      [0.08, 0.2, -0.12],
      [0.15, 0.28, -0.13],
      [0.28, 0.4, -0.12],
    ]),
    ownerStory:
      "Hamza saw cousins abroad fund courses back home with no quality signal. LearnLocal makes that corridor transparent.",
    risk: {
      market: "Take-rate marketplace economics need density in a few cities first.",
      financial: "Early GMV; scholarship pools can be lumpy.",
      operational: "Trainer quality control is the core ops challenge.",
    },
    documents: docs("learnlocal"),
    qa: [],
    problem: "Diaspora relatives fund skills training without visibility into outcomes.",
    solution: "Urdu-first marketplace matching verified trainers to scholarship-backed learners.",
    market: "Vocational upskilling in Punjab metros with diaspora remittance corridors.",
    team: [
      {
        name: "Hamza Tariq",
        role: "Founder",
        bio: "Edtech operator; previously ran an Urdu tutoring collective.",
      },
    ],
    traction: "40 trainers · 28 courses · 610 learners",
    roadmap: [
      { label: "MVP live", timing: "2025", done: true },
      { label: "Scholarship pools v1", timing: "2026", done: false },
    ],
    demoUrl: "https://example.com/learnlocal",
    milestones: [
      { label: "First 500 learners", timing: "2025", done: true },
      { label: "Karachi launch", timing: "2026", done: false },
    ],
  },
  {
    slug: "solar-yard-faisalabad",
    type: "existing",
    category: "Energy & Climate",
    title: "Solar Yard Faisalabad",
    city: "Faisalabad",
    raiseAsk: "PKR 5.0 Cr",
    stage: "Expansion",
    shortPitch:
      "C&I rooftop solar installer expanding inventory financing and EPC crews.",
    longPitch:
      "Five years of commercial rooftop installs for textile units. Raise funds inventory float and two additional EPC teams. Profit-share preferred; audited financials shared during intro calls.",
    imageUrl: "/media/listings/solar-yard-faisalabad.jpg",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: true,
    diasporaNote: "Clear path for overseas Pakistanis to co-fund project pipelines.",
    founderName: "Naveed Gill",
    foundedYear: 2019,
    highlightMetrics: [
      { label: "MW installed", value: "14.2" },
      { label: "C&I clients", value: "67" },
      { label: "Crews", value: "4" },
    ],
    revenuePkrCr: 22,
    profitPkrCr: 2.8,
    askAmountPkrCr: 5.0,
    raisedPkrCr: 1.5,
    profitSharePct: 20,
    investmentModel: "profit-share",
    expectedRoi: "17–23% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      76,
    ),
    employees: 95,
    financials: years(2023, [
      [14.0, 12.0, 2.0],
      [18.5, 15.8, 2.7],
      [22.0, 19.2, 2.8],
    ]),
    ownerStory:
      "Naveed grew Solar Yard by serving textile C&I that needed predictable EPC — not a one-off panel sale. Inventory float is the bottleneck to more crews.",
    risk: {
      market: "Panel import FX and policy changes can swing project margins.",
      financial: "Inventory financing ties capital until commission.",
      operational: "EPC quality depends on crew training as headcount grows.",
    },
    documents: docs("solar-yard-faisalabad"),
    qa: [
      {
        question: "Audited financials available under NDA?",
        answer: "Yes — shared on intro calls after NDA.",
        askedBy: "Investor (Riyadh)",
      },
    ],
  },
  {
    slug: "retail-roots-franchise",
    type: "existing",
    category: "Retail & Franchise",
    title: "Retail Roots Franchise Co.",
    city: "Karachi",
    raiseAsk: "PKR 2.1 Cr",
    stage: "Franchise scale",
    shortPitch:
      "Homegrown QSR brand opening 8 company-owned locations before franchise wave.",
    longPitch:
      "Proven single-city brand with strong unit economics. Capital builds company stores to set standards before selling franchises. Equity into the holdco — not a whole-business exit.",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    founderName: "Mehreen Ali",
    foundedYear: 2017,
    highlightMetrics: [
      { label: "Locations", value: "5" },
      { label: "Avg. monthly sales / store", value: "PKR 48 L" },
      { label: "Contribution margin", value: "22%" },
    ],
    revenuePkrCr: 8.6,
    profitPkrCr: 1.0,
    askAmountPkrCr: 2.1,
    raisedPkrCr: 0.3,
    equityPct: 14,
    investmentModel: "equity",
    expectedRoi: "14–19% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      66,
    ),
    employees: 110,
    financials: years(2023, [
      [5.8, 5.1, 0.7],
      [7.2, 6.3, 0.9],
      [8.6, 7.6, 1.0],
    ]),
    ownerStory:
      "Mehreen wants company stores that teach franchisees the standard — growth equity, not a buyout of the brand.",
    risk: {
      market: "QSR competition and food inflation pressure ticket sizes.",
      financial: "Store build-out is capex heavy before franchise fees ramp.",
      operational: "Brand standards must survive multi-site expansion.",
    },
    documents: docs("retail-roots-franchise"),
    qa: [],
  },
  {
    slug: "agritech-sensors",
    type: "startup",
    category: "Agribusiness",
    title: "FieldSense PK",
    city: "Multan",
    raiseAsk: "PKR 1.2 Cr",
    stage: "Seed",
    shortPitch:
      "Soil and irrigation sensors sold with advisory to mid-size cotton and citrus farms.",
    longPitch:
      "Hardware + advisory startup with paid pilots on 12 farms. Raise covers manufacturing batch and field agents. Founder identity verified; hardware claims reviewed against pilot invoices.",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    diasporaNote: "Seeking angels familiar with agri supply chains in Punjab.",
    founderName: "Usman Raza",
    highlightMetrics: [
      { label: "Pilot farms", value: "12" },
      { label: "Sensors deployed", value: "180" },
      { label: "Water savings", value: "18%" },
    ],
    revenuePkrCr: 0.65,
    profitPkrCr: -0.2,
    askAmountPkrCr: 1.2,
    raisedPkrCr: 0.15,
    equityPct: 15,
    investmentModel: "equity",
    expectedRoi: "Illiquid — venture equity",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      64,
    ),
    employees: 8,
    financials: years(2023, [
      [0.2, 0.45, -0.25],
      [0.4, 0.6, -0.2],
      [0.65, 0.85, -0.2],
    ]),
    ownerStory:
      "Usman grew up around citrus orchards and built FieldSense to make irrigation advice measurable — sensors plus humans in the field.",
    risk: {
      market: "Farmers delay capex in bad cotton seasons.",
      financial: "Hardware inventory and warranty reserves matter.",
      operational: "Field agent coverage across Multan belt is hard to scale.",
    },
    documents: docs("agritech-sensors"),
    qa: [],
    problem: "Mid-size farms irrigate by habit, wasting water and yield.",
    solution: "Soil/irrigation sensors sold with on-farm advisory.",
    market: "Cotton and citrus farms in southern Punjab.",
    team: [
      {
        name: "Usman Raza",
        role: "Founder",
        bio: "Agri engineer; paid pilots on 12 farms.",
      },
    ],
    traction: "12 pilot farms · 180 sensors · 18% water savings reported",
    roadmap: [
      { label: "Manufacturing batch", timing: "2026", done: false },
      { label: "Field agents x4", timing: "2026", done: false },
    ],
    demoUrl: "https://example.com/fieldsense",
    milestones: [
      { label: "First paid pilot", timing: "2024", done: true },
      { label: "50 farms", timing: "2027", done: false },
    ],
  },
  {
    slug: "medsupply-north",
    type: "existing",
    category: "Healthcare",
    title: "MedSupply North",
    city: "Peshawar",
    raiseAsk: "PKR 1.8 Cr",
    stage: "Working capital",
    shortPitch:
      "Regional medical-consumables distributor expanding SKUs and cold lines.",
    longPitch:
      "Distributor with hospital contracts across KP. Growth capital for inventory and a small cold line for vaccines and biologics. Bank statements and NTN reviewed.",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    founderName: "Farah Khan",
    foundedYear: 2014,
    highlightMetrics: [
      { label: "Hospital accounts", value: "35" },
      { label: "SKU count", value: "420" },
      { label: "Gross margin", value: "19%" },
    ],
    revenuePkrCr: 6.4,
    profitPkrCr: 0.72,
    askAmountPkrCr: 1.8,
    raisedPkrCr: 0.2,
    equityPct: 12,
    investmentModel: "either",
    expectedRoi: "13–18% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      70,
    ),
    employees: 28,
    financials: years(2023, [
      [4.8, 4.3, 0.5],
      [5.6, 5.0, 0.6],
      [6.4, 5.68, 0.72],
    ]),
    ownerStory:
      "Farah built MedSupply on hospital trust in KP. Cold-line inventory is the next capability leap.",
    risk: {
      market: "Hospital payment delays are endemic.",
      financial: "Inventory and cold-chain capex need tight working-capital control.",
      operational: "Cold-chain compliance and expiry management are non-negotiable.",
    },
    documents: docs("medsupply-north"),
    qa: [],
  },
  {
    slug: "edufleet",
    type: "existing",
    category: "Education",
    title: "EduFleet Transport",
    city: "Rawalpindi",
    raiseAsk: "PKR 1.1 Cr",
    stage: "Fleet expansion",
    shortPitch:
      "School-bus operator adding GPS-tracked vans under multi-year school contracts.",
    longPitch:
      "Contracted school transport with parents paying monthly. Raise purchases vans and insurance float. Existing business template with SECP and bank verification complete.",
    imageUrl:
      "https://images.unsplash.com/photo-1544620341-c53ce9b7b4c7?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    founderName: "Kamran Iqbal",
    foundedYear: 2015,
    highlightMetrics: [
      { label: "Active vans", value: "26" },
      { label: "School contracts", value: "9" },
      { label: "Students served", value: "1,100+" },
    ],
    revenuePkrCr: 3.8,
    profitPkrCr: 0.55,
    askAmountPkrCr: 1.1,
    raisedPkrCr: 0.15,
    equityPct: 16,
    investmentModel: "equity",
    expectedRoi: "12–16% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      69,
    ),
    employees: 34,
    financials: years(2023, [
      [2.9, 2.5, 0.4],
      [3.3, 2.85, 0.45],
      [3.8, 3.25, 0.55],
    ]),
    ownerStory:
      "Kamran runs contracted school routes with GPS tracking parents can trust. Capital buys vans, not a sale of the operating company.",
    risk: {
      market: "School fee stress can slow van additions.",
      financial: "Insurance and fleet financing dominate cash needs.",
      operational: "Driver screening and route safety are continuous risks.",
    },
    documents: docs("edufleet"),
    qa: [],
  },
  {
    slug: "paystack-lite",
    type: "startup",
    category: "Tech/SaaS",
    title: "LedgerLite",
    city: "Karachi",
    raiseAsk: "PKR 2.0 Cr",
    stage: "Seed",
    shortPitch:
      "Lightweight accounting and inventory for SMEs integrating JazzCash & bank feeds.",
    longPitch:
      "SaaS with 180 paying SMEs. Raise funds product (bank feed reliability) and Karachi sales. Startup pitch template — founder professional history cross-checked.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: true,
    diasporaNote: "Ideal for diaspora angels who want software exposure in Pakistan.",
    founderName: "Zara Hussain",
    highlightMetrics: [
      { label: "Paying SMEs", value: "180" },
      { label: "MRR", value: "PKR 28 L" },
      { label: "Net retention", value: "108%" },
    ],
    revenuePkrCr: 3.36,
    profitPkrCr: 0.4,
    askAmountPkrCr: 2.0,
    raisedPkrCr: 0.5,
    equityPct: 11,
    investmentModel: "equity",
    expectedRoi: "Illiquid — venture equity",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      72,
    ),
    employees: 14,
    financials: years(2023, [
      [1.2, 1.5, -0.3],
      [2.1, 1.9, 0.2],
      [3.36, 2.96, 0.4],
    ]),
    ownerStory:
      "Zara built LedgerLite for SMEs tired of Excel and WhatsApp invoices — JazzCash and bank feeds in one place.",
    risk: {
      market: "SME churn if bank feeds fail silently.",
      financial: "Sales CAC in Karachi must stay disciplined.",
      operational: "Bank-feed reliability is the product risk.",
    },
    documents: docs("paystack-lite"),
    qa: [
      {
        question: "Net retention methodology?",
        answer: "Logo + expansion MRR over trailing twelve months.",
        askedBy: "Investor (Singapore)",
      },
    ],
    problem: "SMEs run books across Excel, WhatsApp, and cash registers.",
    solution: "Lightweight accounting + inventory with JazzCash and bank feeds.",
    market: "Formalizing SMEs in Karachi and Lahore retail/wholesale.",
    team: [
      {
        name: "Zara Hussain",
        role: "CEO",
        bio: "Fintech PM turned founder; 180 paying SMEs.",
        linkedin: "https://www.linkedin.com/",
      },
    ],
    traction: "180 paying SMEs · PKR 28 L MRR · 108% net retention",
    roadmap: [
      { label: "Bank feed reliability", timing: "2026", done: false },
      { label: "Karachi sales pod", timing: "2026", done: false },
    ],
    demoUrl: "https://example.com/ledgerlite",
    milestones: [
      { label: "100 paying SMEs", timing: "2025", done: true },
      { label: "PKR 50 L MRR", timing: "2027", done: false },
    ],
  },
  {
    slug: "green-kiln",
    type: "existing",
    category: "Manufacturing",
    title: "Green Kiln Ceramics",
    city: "Gujranwala",
    raiseAsk: "PKR 2.4 Cr",
    stage: "Export expansion",
    shortPitch:
      "Ceramic tableware maker converting kilns and opening GCC wholesale channels.",
    longPitch:
      "Operating ceramics plant shifting to cleaner kilns and export packaging. Capital covers kiln retrofit and first GCC distributor deposits. Equity or profit-share both on the table.",
    imageUrl:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    founderName: "Asif Butt",
    foundedYear: 2009,
    highlightMetrics: [
      { label: "Export share", value: "34%" },
      { label: "Workers", value: "120" },
      { label: "SKU lines", value: "48" },
    ],
    revenuePkrCr: 12.5,
    profitPkrCr: 1.5,
    askAmountPkrCr: 2.4,
    raisedPkrCr: 0.35,
    equityPct: 13,
    investmentModel: "either",
    expectedRoi: "15–21% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      67,
    ),
    employees: 120,
    financials: years(2023, [
      [9.5, 8.3, 1.2],
      [11.0, 9.6, 1.4],
      [12.5, 11.0, 1.5],
    ]),
    ownerStory:
      "Asif is retrofitting kilns to stay export-ready for GCC buyers — growth capital, founders keep the plant.",
    risk: {
      market: "GCC distributor concentration risk early on.",
      financial: "Kiln retrofit ROI depends on energy costs.",
      operational: "Export packaging QC must improve with volume.",
    },
    documents: docs("green-kiln"),
    qa: [],
  },
  {
    slug: "city-cycle-logistics",
    type: "startup",
    category: "Logistics",
    title: "CycleDrop",
    city: "Lahore",
    raiseAsk: "PKR 75 L",
    stage: "Pre-seed",
    shortPitch:
      "Bike-courier network for dense urban pharmacy and grocery drops under 5 km.",
    longPitch:
      "Hyperlocal courier pilots with pharmacies. Founders verified; early revenue claims reviewed via payment screenshots. Seeking first institutional-style angel intro.",
    imageUrl:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: false, humanReviewed: true },
    featured: false,
    founderName: "Omar Javed",
    highlightMetrics: [
      { label: "Daily drops", value: "320" },
      { label: "Partner pharmacies", value: "14" },
      { label: "Avg. delivery time", value: "28 min" },
    ],
    revenuePkrCr: 0.55,
    profitPkrCr: -0.08,
    askAmountPkrCr: 0.75,
    raisedPkrCr: 0.05,
    equityPct: 12,
    investmentModel: "equity",
    expectedRoi: "Illiquid — venture equity",
    trustScore: trustFrom(
      { identity: true, businessClaim: false, humanReviewed: true },
      50,
    ),
    employees: 6,
    financials: years(2023, [
      [0.15, 0.25, -0.1],
      [0.32, 0.4, -0.08],
      [0.55, 0.63, -0.08],
    ]),
    ownerStory:
      "Omar runs bike drops for pharmacies that need sub-30-minute delivery in dense Lahore blocks.",
    risk: {
      market: "Hyperlocal is competitive and low-margin.",
      financial: "Unit economics depend on densifying pharmacy partners.",
      operational: "Rider safety and peak-hour SLAs.",
    },
    documents: docs("city-cycle-logistics"),
    qa: [],
    problem: "Pharmacies lose orders when delivery takes too long in dense neighborhoods.",
    solution: "Bike-courier network optimized for sub-5 km pharmacy and grocery drops.",
    market: "Urban Lahore pharmacy clusters.",
    team: [
      { name: "Omar Javed", role: "Founder", bio: "Ops-first courier founder." },
    ],
    traction: "320 daily drops · 14 pharmacy partners · 28 min avg",
    roadmap: [
      { label: "Angel round", timing: "2026", done: false },
      { label: "Second neighborhood", timing: "2026", done: false },
    ],
    demoUrl: "https://example.com/cycledrop",
    milestones: [
      { label: "First 10 pharmacies", timing: "2025", done: true },
      { label: "Break-even unit economics", timing: "2027", done: false },
    ],
  },
  {
    slug: "hydro-microgrids",
    type: "startup",
    category: "Energy & Climate",
    title: "Hydro Microgrids",
    city: "Gilgit",
    raiseAsk: "PKR 3.5 Cr",
    stage: "Seed+",
    shortPitch:
      "Community micro-hydro kits with prepaid metering for northern villages.",
    longPitch:
      "Hardware + ops model for village-scale hydro. Two sites commissioned; raise funds third site and metering firmware. Strong diaspora angle for community-backed capital.",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: true,
    diasporaNote: "Designed for diaspora community rounds alongside local cooperatives.",
    founderName: "Nida Baig",
    highlightMetrics: [
      { label: "Sites live", value: "2" },
      { label: "Households powered", value: "410" },
      { label: "Uptime", value: "97%" },
    ],
    revenuePkrCr: 1.1,
    profitPkrCr: 0.15,
    askAmountPkrCr: 3.5,
    raisedPkrCr: 0.9,
    equityPct: 18,
    investmentModel: "equity",
    expectedRoi: "Illiquid — impact + equity",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      73,
    ),
    employees: 11,
    financials: years(2023, [
      [0.4, 0.55, -0.15],
      [0.75, 0.7, 0.05],
      [1.1, 0.95, 0.15],
    ]),
    ownerStory:
      "Nida commissions village hydro with prepaid meters so communities own the asset — diaspora capital builds the next site.",
    risk: {
      market: "Site permitting and community governance vary by valley.",
      financial: "Capex per site is lumpy; prepaid collections must stay disciplined.",
      operational: "Remote maintenance and firmware reliability.",
    },
    documents: docs("hydro-microgrids"),
    qa: [],
    problem: "Northern villages face unreliable grid or diesel for basic power.",
    solution: "Community micro-hydro kits with prepaid metering and local ops.",
    market: "Off-grid and weak-grid communities in Gilgit-Baltistan.",
    team: [
      {
        name: "Nida Baig",
        role: "Founder",
        bio: "Energy engineer; two sites commissioned.",
      },
    ],
    traction: "2 sites live · 410 households · 97% uptime",
    roadmap: [
      { label: "Third site", timing: "2026", done: false },
      { label: "Metering firmware v2", timing: "2026", done: false },
    ],
    demoUrl: "https://example.com/hydro-microgrids",
    milestones: [
      { label: "First site commissioned", timing: "2024", done: true },
      { label: "Five sites", timing: "2028", done: false },
    ],
  },
  {
    slug: "franchise-pharmacy",
    type: "existing",
    category: "Retail & Franchise",
    title: "CareShelf Pharmacy Group",
    city: "Islamabad",
    raiseAsk: "PKR 1.6 Cr",
    stage: "Multi-store",
    shortPitch:
      "Independent pharmacy chain adding two stores near hospital clusters.",
    longPitch:
      "Three pharmacies with licensed pharmacists and stable scripts volume. Raise opens two more locations. Not a sale of the business — growth equity into the group.",
    imageUrl:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1600&q=80",
    verification: { identity: true, businessClaim: true, humanReviewed: true },
    featured: false,
    founderName: "Dr. Sohail Mir",
    foundedYear: 2013,
    highlightMetrics: [
      { label: "Stores", value: "3" },
      { label: "Monthly scripts", value: "9,800" },
      { label: "Gross margin", value: "24%" },
    ],
    revenuePkrCr: 7.2,
    profitPkrCr: 0.95,
    askAmountPkrCr: 1.6,
    raisedPkrCr: 0.25,
    equityPct: 12,
    investmentModel: "equity",
    expectedRoi: "13–17% projected",
    trustScore: trustFrom(
      { identity: true, businessClaim: true, humanReviewed: true },
      71,
    ),
    employees: 22,
    financials: years(2023, [
      [5.4, 4.7, 0.7],
      [6.3, 5.45, 0.85],
      [7.2, 6.25, 0.95],
    ]),
    ownerStory:
      "Dr. Mir wants two more hospital-adjacent stores — growth equity into the group, not a buyout.",
    risk: {
      market: "Hospital relocation can move script volume.",
      financial: "Inventory and regulated pricing pressure margins.",
      operational: "Licensed pharmacist coverage per store is mandatory.",
    },
    documents: docs("franchise-pharmacy"),
    qa: [],
  },
];

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

export type ListingFilterOpts = {
  category?: string | string[];
  type?: string;
  q?: string;
  cities?: string[];
  stages?: string[];
  models?: string[];
  verification?: string[];
  askMin?: number;
  askMax?: number;
  revenueMin?: number;
  revenueMax?: number;
  profitMin?: number;
  profitMax?: number;
  ageMin?: number;
  ageMax?: number;
  employeesMin?: number;
  employeesMax?: number;
  sort?: string;
};

export function filterListings(opts: ListingFilterOpts = {}): Listing[] {
  const q = opts.q?.toLowerCase().trim();
  const categories = Array.isArray(opts.category)
    ? opts.category
    : opts.category && opts.category !== "All"
      ? [opts.category]
      : [];
  const cities = opts.cities ?? [];
  const stages = opts.stages ?? [];
  const models = opts.models ?? [];
  const verification = opts.verification ?? [];
  const year = new Date().getFullYear();

  let results = listings.filter((l) => {
    if (categories.length && !categories.includes(l.category)) return false;
    if (opts.type && opts.type !== "All" && l.type !== opts.type) return false;
    if (cities.length && !cities.includes(l.city)) return false;
    if (stages.length && !stages.includes(l.stage)) return false;
    if (models.length && !models.includes(l.investmentModel)) return false;
    if (verification.length) {
      const tier = verificationTier(l.verification);
      if (!verification.includes(tier)) return false;
    }
    if (opts.askMin != null && l.askAmountPkrCr < opts.askMin) return false;
    if (opts.askMax != null && l.askAmountPkrCr > opts.askMax) return false;
    if (opts.revenueMin != null && l.revenuePkrCr < opts.revenueMin) return false;
    if (opts.revenueMax != null && l.revenuePkrCr > opts.revenueMax) return false;
    if (opts.profitMin != null && l.profitPkrCr < opts.profitMin) return false;
    if (opts.profitMax != null && l.profitPkrCr > opts.profitMax) return false;
    if (opts.employeesMin != null && l.employees < opts.employeesMin) return false;
    if (opts.employeesMax != null && l.employees > opts.employeesMax) return false;
    if (opts.ageMin != null || opts.ageMax != null) {
      if (!l.foundedYear) return false;
      const age = year - l.foundedYear;
      if (opts.ageMin != null && age < opts.ageMin) return false;
      if (opts.ageMax != null && age > opts.ageMax) return false;
    }
    if (q) {
      const hay =
        `${l.title} ${l.city} ${l.shortPitch} ${l.category} ${l.founderName}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (opts.sort) {
    case "roi":
      results = [...results].sort((a, b) => b.trustScore - a.trustScore);
      break;
    case "funded":
      results = [...results].sort(
        (a, b) =>
          b.raisedPkrCr / Math.max(b.askAmountPkrCr, 0.01) -
          a.raisedPkrCr / Math.max(a.askAmountPkrCr, 0.01),
      );
      break;
    case "trust":
      results = [...results].sort((a, b) => b.trustScore - a.trustScore);
      break;
    case "newest":
      results = [...results].sort(
        (a, b) => (b.foundedYear ?? 0) - (a.foundedYear ?? 0),
      );
      break;
    default:
      break;
  }

  return results;
}

export function verificationScore(v: Listing["verification"]): number {
  return [v.identity, v.businessClaim, v.humanReviewed].filter(Boolean).length;
}

export function parseBrowseSearchParams(
  sp: Record<string, string | string[] | undefined>,
): ListingFilterOpts {
  const one = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const many = (k: string) => {
    const v = sp[k];
    if (!v) return [] as string[];
    const raw = Array.isArray(v) ? v.join(",") : v;
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };
  const num = (k: string) => {
    const v = one(k);
    if (v == null || v === "") return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  return {
    q: one("q") || undefined,
    type: one("type") || undefined,
    category: many("category"),
    cities: many("city"),
    stages: many("stage"),
    models: many("model"),
    verification: many("verification"),
    askMin: num("askMin"),
    askMax: num("askMax"),
    revenueMin: num("revenueMin"),
    revenueMax: num("revenueMax"),
    profitMin: num("profitMin"),
    profitMax: num("profitMax"),
    ageMin: num("ageMin"),
    ageMax: num("ageMax"),
    employeesMin: num("employeesMin"),
    employeesMax: num("employeesMax"),
    sort: one("sort") || undefined,
  };
}
