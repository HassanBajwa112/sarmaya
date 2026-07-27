import type { Metadata } from "next";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { PreferencesForm } from "@/components/dashboard/PreferencesForm";
import { DEMO_INVESTOR_PREFS } from "@/lib/data/ai-insights";

export const metadata: Metadata = { title: "Preferences · Investor" };

export default function InvestorPreferencesPage() {
  return (
    <div>
      <PageHeading
        title="Investment preferences"
        description="Feeds AI Investment Match. Demo save is session-local until auth."
      />
      <PreferencesForm initial={DEMO_INVESTOR_PREFS} />
    </div>
  );
}
