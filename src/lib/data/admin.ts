export type AdminRole = "admin" | "reviewer" | "founder" | "investor" | "support";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "suspended";
  joinedAt: string;
};

export type SupportTicket = {
  id: string;
  topic: "investor" | "founder" | "partnerships" | "media" | "support";
  subject: string;
  from: string;
  status: "open" | "pending" | "closed";
  createdAt: string;
};

export const adminUsers: AdminUser[] = [
  {
    id: "u1",
    name: "Amina R.",
    email: "amina@sarmaya.internal",
    role: "reviewer",
    status: "active",
    joinedAt: "2026-01-10",
  },
  {
    id: "u2",
    name: "Hassan K.",
    email: "hassan@sarmaya.internal",
    role: "admin",
    status: "active",
    joinedAt: "2025-11-02",
  },
  {
    id: "u3",
    name: "Imran Qureshi",
    email: "imran@example.com",
    role: "founder",
    status: "active",
    joinedAt: "2026-01-12",
  },
  {
    id: "u4",
    name: "Omar Diaspora Fund",
    email: "omar@example.com",
    role: "investor",
    status: "active",
    joinedAt: "2026-02-01",
  },
  {
    id: "u5",
    name: "Dr. Ayesha Rahman",
    email: "ayesha@example.com",
    role: "founder",
    status: "active",
    joinedAt: "2026-02-01",
  },
  {
    id: "u6",
    name: "Spam Actor",
    email: "spam@example.com",
    role: "investor",
    status: "suspended",
    joinedAt: "2026-06-01",
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "t1",
    topic: "investor",
    subject: "Cannot unlock pitch deck after sign-in demo",
    from: "omar@example.com",
    status: "open",
    createdAt: "2026-07-20T09:00:00Z",
  },
  {
    id: "t2",
    topic: "founder",
    subject: "Business verification name mismatch help",
    from: "ayesha@example.com",
    status: "pending",
    createdAt: "2026-07-18T14:00:00Z",
  },
  {
    id: "t3",
    topic: "partnerships",
    subject: "Corridor distribution intro",
    from: "partner@example.com",
    status: "open",
    createdAt: "2026-07-15T11:00:00Z",
  },
  {
    id: "t4",
    topic: "media",
    subject: "Press kit request",
    from: "editor@example.com",
    status: "closed",
    createdAt: "2026-07-01T08:00:00Z",
  },
  {
    id: "t5",
    topic: "support",
    subject: "Broken filter link on mobile",
    from: "user@example.com",
    status: "open",
    createdAt: "2026-07-22T16:00:00Z",
  },
];

export const siteAnalytics = {
  signups: 186,
  listingsLive: 15,
  fundingAskPkrCr: 34.2,
  fundingRaisedPkrCr: 6.8,
  verificationPending: 4,
  messagesDemo: 42,
  funnel: [
    { stage: "Visit browse", count: 4200 },
    { stage: "Open listing", count: 1800 },
    { stage: "Message / unlock", count: 320 },
    { stage: "Meeting requested", count: 48 },
  ],
};

export const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/verification", label: "Verification" },
  { href: "/admin/fraud", label: "Fraud reports" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/revenue", label: "Revenue" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/featured", label: "Featured" },
  { href: "/admin/support", label: "Support" },
] as const;
