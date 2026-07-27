import type { DashNavItem } from "@/components/dashboard/DashboardShell";

export const investorNav: DashNavItem[] = [
  { href: "/dashboard/investor", label: "Overview" },
  { href: "/dashboard/investor/portfolio", label: "Portfolio" },
  { href: "/dashboard/investor/saved", label: "Saved" },
  { href: "/dashboard/investor/watchlist", label: "Watchlist" },
  { href: "/dashboard/investor/recommendations", label: "AI recommendations" },
  { href: "/dashboard/investor/preferences", label: "Preferences" },
  { href: "/dashboard/investor/meetings", label: "Meetings" },
  { href: "/dashboard/investor/messages", label: "Messages" },
  { href: "/dashboard/investor/documents", label: "Documents" },
  { href: "/dashboard/investor/downloads", label: "Downloads" },
  { href: "/dashboard/investor/notifications", label: "Notifications" },
  { href: "/dashboard/investor/analytics", label: "Analytics" },
  { href: "/dashboard/investor/recent", label: "Recently viewed" },
  { href: "/dashboard/investor/compare", label: "Compare" },
];

export const founderNav: DashNavItem[] = [
  { href: "/dashboard/founder", label: "Overview" },
  { href: "/dashboard/founder/create", label: "Create listing" },
  { href: "/dashboard/founder/analytics", label: "Analytics" },
  { href: "/dashboard/founder/interest", label: "Investor interest" },
  { href: "/dashboard/founder/messages", label: "Messages" },
  { href: "/dashboard/founder/documents", label: "Documents" },
  { href: "/dashboard/founder/verification", label: "Verification" },
  { href: "/dashboard/founder/financials", label: "Financial uploads" },
  { href: "/dashboard/founder/raise", label: "Raise progress" },
  { href: "/dashboard/founder/performance", label: "Performance" },
  { href: "/dashboard/founder/profile", label: "Profile" },
  { href: "/dashboard/founder/subscription", label: "Subscription" },
  { href: "/dashboard/founder/featured", label: "Featured listing" },
];
