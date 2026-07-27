import type { Metadata } from "next";
import { CreateListingWizard } from "@/components/dashboard/CreateListingWizard";
import { PageHeading } from "@/components/dashboard/ListingLinkList";

export const metadata: Metadata = { title: "Create listing · Founder" };

export default function FounderCreatePage() {
  return (
    <div>
      <PageHeading
        title="Create listing"
        description="Multi-step wizard → verification queue. Demo submit is not persisted."
      />
      <CreateListingWizard />
    </div>
  );
}
