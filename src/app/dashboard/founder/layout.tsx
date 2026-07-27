import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { founderNav } from "@/components/dashboard/nav";

export default function FounderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      role="founder"
      title="Founder"
      subtitle="Manage listings, verification, and investor interest. Demo data until Plan B auth."
      nav={founderNav}
    >
      {children}
    </DashboardShell>
  );
}
