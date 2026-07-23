import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For founders",
  description: "List an existing business or startup pitch on Sarmaya.",
};

export default function ForFoundersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
