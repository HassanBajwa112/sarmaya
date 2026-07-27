import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin · Payments" };

export default function AdminPaymentsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Payments</h1>
      <div className="mt-8 border border-dashed border-brass/30 bg-brass/5 p-6">
        <p className="text-xs tracking-widest text-brass uppercase">
          Pending payment integration
        </p>
        <p className="mt-3 max-w-lg text-sm text-stone/70">
          Transaction log will appear here. No processor is connected in Plan A.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-stone/45">
          <li>· No charges</li>
          <li>· No payouts</li>
          <li>· Sarmaya does not custody deal capital</li>
        </ul>
      </div>
    </div>
  );
}
