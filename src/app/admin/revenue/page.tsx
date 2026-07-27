import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin · Revenue" };

export default function AdminRevenuePage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Revenue</h1>
      <div className="mt-8 border border-dashed border-brass/30 bg-brass/5 p-6">
        <p className="text-xs tracking-widest text-brass uppercase">
          Pending payment integration
        </p>
        <p className="mt-3 max-w-lg text-sm text-stone/70">
          Featured listings and subscription tiers will report here once a
          PKR-capable processor is wired. Stripe is not assumed.
        </p>
        <Link
          href="/admin/payments"
          className="mt-6 inline-block text-sm text-brass hover:underline"
        >
          Payments stub →
        </Link>
      </div>
    </div>
  );
}
