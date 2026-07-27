import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { investorNav } from "@/components/dashboard/nav";

export default function InvestorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      role="investor"
      title="Investor"
      subtitle="Track opportunities, messages, and diligence — deals close off-platform."
      nav={investorNav}
    >
      {children}
    </DashboardShell>
  );
}
