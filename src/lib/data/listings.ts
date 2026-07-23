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

export type VerificationStatus = {
  identity: boolean;
  businessClaim: boolean;
  humanReviewed: boolean;
};

export type Listing = {
  slug: string;
  type: ListingType;
  category: Category;
  title: string;
  city: string;
  raiseAsk: string;
  stage: string;
  shortPitch: string;
  longPitch: string;
  /** Hero/cover image (Unsplash). */
  imageUrl: string;
  verification: VerificationStatus;
  featured: boolean;
  diasporaNote?: string;
  founderName: string;
  foundedYear?: number;
  highlightMetrics: { label: string; value: string }[];
};

export const POSITIONING =
  "Growth investment into operating Pakistani businesses and startups — built diaspora-first.";

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
  },
];

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

export function filterListings(opts: {
  category?: string;
  type?: string;
  q?: string;
}): Listing[] {
  const q = opts.q?.toLowerCase().trim();
  return listings.filter((l) => {
    if (opts.category && opts.category !== "All" && l.category !== opts.category)
      return false;
    if (opts.type && opts.type !== "All" && l.type !== opts.type) return false;
    if (q) {
      const hay = `${l.title} ${l.city} ${l.shortPitch} ${l.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function verificationScore(v: VerificationStatus): number {
  return [v.identity, v.businessClaim, v.humanReviewed].filter(Boolean).length;
}
