import { getListing, listings } from "./listings";
import type { Listing } from "./listing-types";

export type MeetingStatus = "requested" | "scheduled" | "completed" | "declined";

export type DashboardMessage = {
  id: string;
  listingSlug: string;
  counterpart: string;
  preview: string;
  at: string;
  unread: boolean;
  role: "investor" | "founder";
};

export type MeetingRequest = {
  id: string;
  listingSlug: string;
  withName: string;
  status: MeetingStatus;
  at: string;
  note?: string;
};

export type PortfolioItem = {
  listingSlug: string;
  status: "intro" | "diligence" | "term-sheet" | "closed";
  committedPkrCr: number;
  updatedAt: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  at: string;
  href: string;
  read: boolean;
};

export type DownloadedDoc = {
  id: string;
  listingSlug: string;
  title: string;
  kind: string;
  downloadedAt: string;
};

/** Demo investor activity — seeded, not persisted. */
export const investorPortfolio: PortfolioItem[] = [
  {
    listingSlug: "lahore-precision-parts",
    status: "diligence",
    committedPkrCr: 0,
    updatedAt: "2026-07-10T10:00:00Z",
  },
  {
    listingSlug: "solar-yard-faisalabad",
    status: "intro",
    committedPkrCr: 0,
    updatedAt: "2026-07-18T14:00:00Z",
  },
  {
    listingSlug: "sindh-cold-chain",
    status: "closed",
    committedPkrCr: 0.5,
    updatedAt: "2026-06-01T09:00:00Z",
  },
];

export const investorSavedSlugs = [
  "clinicstack",
  "paystack-lite",
  "hydro-microgrids",
  "medsupply-north",
];

export const investorWatchlistSlugs = [
  "lahore-precision-parts",
  "solar-yard-faisalabad",
  "sindh-cold-chain",
  "green-kiln",
];

export const investorRecentSlugs = [
  "lahore-precision-parts",
  "clinicstack",
  "paystack-lite",
  "karachi-freightlink",
  "edufleet",
];

export const investorAnalytics = {
  listingsViewed: 28,
  saved: investorSavedSlugs.length,
  messaged: 6,
  meetingsRequested: 3,
  comparesRun: 2,
};

export const investorDownloads: DownloadedDoc[] = [
  {
    id: "dl1",
    listingSlug: "lahore-precision-parts",
    title: "Pitch deck (PDF)",
    kind: "pitch",
    downloadedAt: "2026-07-12T11:00:00Z",
  },
  {
    id: "dl2",
    listingSlug: "solar-yard-faisalabad",
    title: "Financial summary",
    kind: "financial",
    downloadedAt: "2026-07-15T16:00:00Z",
  },
  {
    id: "dl3",
    listingSlug: "sindh-cold-chain",
    title: "Identity verification pack",
    kind: "verification",
    downloadedAt: "2026-06-02T08:00:00Z",
  },
];

export const investorMeetings: MeetingRequest[] = [
  {
    id: "m1",
    listingSlug: "lahore-precision-parts",
    withName: "Imran Qureshi",
    status: "scheduled",
    at: "2026-07-28T13:00:00Z",
    note: "Unit economics + OEM concentration",
  },
  {
    id: "m2",
    listingSlug: "solar-yard-faisalabad",
    withName: "Naveed Gill",
    status: "requested",
    at: "2026-07-22T09:00:00Z",
  },
  {
    id: "m3",
    listingSlug: "clinicstack",
    withName: "Dr. Ayesha Rahman",
    status: "declined",
    at: "2026-07-05T10:00:00Z",
    note: "Founder traveling — retry next month",
  },
];

export const messages: DashboardMessage[] = [
  {
    id: "msg1",
    listingSlug: "lahore-precision-parts",
    counterpart: "Imran Qureshi",
    preview: "Happy to share the OEM forecast pack under NDA.",
    at: "2026-07-20T15:30:00Z",
    unread: true,
    role: "investor",
  },
  {
    id: "msg2",
    listingSlug: "solar-yard-faisalabad",
    counterpart: "Naveed Gill",
    preview: "Inventory float is the bottleneck — deck attached in docs.",
    at: "2026-07-19T11:00:00Z",
    unread: false,
    role: "investor",
  },
  {
    id: "msg3",
    listingSlug: "clinicstack",
    counterpart: "Sara Chen (investor)",
    preview: "Are the two LOIs converting to annual contracts?",
    at: "2026-07-21T08:00:00Z",
    unread: true,
    role: "founder",
  },
  {
    id: "msg4",
    listingSlug: "lahore-precision-parts",
    counterpart: "Omar Diaspora Fund",
    preview: "Interested in minority equity — can we schedule a call?",
    at: "2026-07-18T17:00:00Z",
    unread: false,
    role: "founder",
  },
];

export const investorNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "New listing match",
    body: "Green Kiln Ceramics matches your Manufacturing preference.",
    at: "2026-07-21T07:00:00Z",
    href: "/listings/green-kiln",
    read: false,
  },
  {
    id: "n2",
    title: "Message reply",
    body: "Imran Qureshi replied on Lahore Precision Parts.",
    at: "2026-07-20T15:30:00Z",
    href: "/dashboard/investor/messages",
    read: false,
  },
  {
    id: "n3",
    title: "Verification update",
    body: "Solar Yard financial review moved to In Review.",
    at: "2026-07-12T10:00:00Z",
    href: "/listings/solar-yard-faisalabad/verification",
    read: true,
  },
];

/** Demo founder listings — subset treated as “owned”. */
export const founderOwnedSlugs = [
  "lahore-precision-parts",
  "clinicstack",
  "solar-yard-faisalabad",
];

export const founderInterest = [
  {
    id: "fi1",
    listingSlug: "lahore-precision-parts",
    investorName: "Omar Diaspora Fund",
    location: "Dubai",
    action: "messaged" as const,
    at: "2026-07-18T17:00:00Z",
  },
  {
    id: "fi2",
    listingSlug: "lahore-precision-parts",
    investorName: "Ayesha K.",
    location: "London",
    action: "saved" as const,
    at: "2026-07-17T12:00:00Z",
  },
  {
    id: "fi3",
    listingSlug: "clinicstack",
    investorName: "Sara Chen",
    location: "Singapore",
    action: "meeting" as const,
    at: "2026-07-21T08:00:00Z",
  },
  {
    id: "fi4",
    listingSlug: "solar-yard-faisalabad",
    investorName: "Gulf Climate Angels",
    location: "Riyadh",
    action: "saved" as const,
    at: "2026-07-14T09:00:00Z",
  },
];

export const founderAnalyticsBySlug: Record<
  string,
  { views: number; saves: number; questions: number; messages: number }
> = {
  "lahore-precision-parts": { views: 412, saves: 38, questions: 6, messages: 14 },
  clinicstack: { views: 290, saves: 52, questions: 9, messages: 11 },
  "solar-yard-faisalabad": { views: 501, saves: 44, questions: 4, messages: 9 },
};

export const founderNotifications: NotificationItem[] = [
  {
    id: "fn1",
    title: "New investor message",
    body: "Sara Chen asked about ClinicStack LOIs.",
    at: "2026-07-21T08:00:00Z",
    href: "/dashboard/founder/messages",
    read: false,
  },
  {
    id: "fn2",
    title: "Verification rejected",
    body: "ClinicStack business docs need a name-match fix.",
    at: "2026-02-08T16:00:00Z",
    href: "/dashboard/founder/verification",
    read: true,
  },
];

export const founderProfile = {
  name: "Imran Qureshi",
  headline: "Operator · precision manufacturing · Lahore",
  bio: "Took over the family CNC shop in 2011. Building capacity for OEM export readiness — growth capital, not a sale.",
  city: "Lahore",
  linkedin: "https://www.linkedin.com/",
};

export function resolveListings(slugs: string[]): Listing[] {
  return slugs
    .map((s) => getListing(s))
    .filter((l): l is Listing => Boolean(l));
}

export function founderListings(): Listing[] {
  return resolveListings(founderOwnedSlugs);
}

export function portfolioStatusLabel(status: PortfolioItem["status"]): string {
  switch (status) {
    case "intro":
      return "Intro";
    case "diligence":
      return "Diligence";
    case "term-sheet":
      return "Term sheet";
    case "closed":
      return "Closed (off-platform)";
  }
}

export function meetingStatusLabel(status: MeetingStatus): string {
  switch (status) {
    case "requested":
      return "Requested";
    case "scheduled":
      return "Scheduled";
    case "completed":
      return "Completed";
    case "declined":
      return "Declined";
  }
}

/** Peer velocity for performance widget. */
export function peerFundingVelocity(listing: Listing): {
  peers: Listing[];
  avgProgress: number;
  ownProgress: number;
} {
  const peers = listings
    .filter(
      (l) =>
        l.slug !== listing.slug &&
        (l.category === listing.category || l.type === listing.type),
    )
    .slice(0, 4);
  const pct = (l: Listing) =>
    l.askAmountPkrCr > 0
      ? Math.round((l.raisedPkrCr / l.askAmountPkrCr) * 100)
      : 0;
  const avg =
    peers.length === 0
      ? 0
      : Math.round(peers.reduce((s, p) => s + pct(p), 0) / peers.length);
  return { peers, avgProgress: avg, ownProgress: pct(listing) };
}
