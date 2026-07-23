import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For investors",
  description: "Diaspora-first growth investment into Pakistani businesses.",
};

export default function ForInvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
