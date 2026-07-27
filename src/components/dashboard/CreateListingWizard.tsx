"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, CITIES } from "@/lib/data/listings";

const STEPS = ["Basics", "Financials", "Verification docs", "Review"] as const;

export function CreateListingWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "existing",
    category: CATEGORIES[0] as string,
    city: CITIES[0] as string,
    stage: "Expansion",
    shortPitch: "",
    revenuePkrCr: "",
    profitPkrCr: "",
    askAmountPkrCr: "",
    equityPct: "",
    identityDoc: false,
    businessDoc: false,
    financialDoc: false,
  });

  if (submitted) {
    return (
      <div className="border border-[var(--line-dark)] bg-white p-8">
        <p className="text-xs tracking-widest text-brass uppercase">Submitted</p>
        <h2 className="font-display mt-2 text-2xl font-semibold">
          Listing queued for verification
        </h2>
        <p className="mt-3 max-w-lg text-sm text-ink/70">
          Demo only — nothing was persisted. In Plan B this creates a listing and
          opens Identity / Business / Financial cases in the Verification Center.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/founder/verification"
            className="bg-ink px-4 py-2 text-sm text-stone hover:bg-ink-soft"
          >
            Open Verification Center
          </Link>
          <button
            type="button"
            className="border border-[var(--line-dark)] px-4 py-2 text-sm"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
            }}
          >
            Create another
          </button>
        </div>
      </div>
    );
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <ol className="flex flex-wrap gap-2 border-b border-[var(--line-dark)] pb-4">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`text-xs tracking-widest uppercase ${
              i === step ? "text-brass" : i < step ? "text-ink" : "text-muted"
            }`}
          >
            {String(i + 1).padStart(2, "0")} {label}
            {i < STEPS.length - 1 ? <span className="mx-2 text-muted">/</span> : null}
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-5">
        {step === 0 && (
          <>
            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Field>
            <Field label="Type">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="existing">Existing business</option>
                <option value="startup">Startup pitch</option>
              </select>
            </Field>
            <Field label="Industry">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Stage">
              <input
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
              />
            </Field>
            <Field label="Short pitch">
              <textarea
                value={form.shortPitch}
                onChange={(e) => setForm({ ...form, shortPitch: e.target.value })}
                rows={3}
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Revenue (PKR Cr)">
              <input
                type="number"
                step="any"
                value={form.revenuePkrCr}
                onChange={(e) => setForm({ ...form, revenuePkrCr: e.target.value })}
              />
            </Field>
            <Field label="Profit (PKR Cr)">
              <input
                type="number"
                step="any"
                value={form.profitPkrCr}
                onChange={(e) => setForm({ ...form, profitPkrCr: e.target.value })}
              />
            </Field>
            <Field label="Ask (PKR Cr)">
              <input
                type="number"
                step="any"
                value={form.askAmountPkrCr}
                onChange={(e) => setForm({ ...form, askAmountPkrCr: e.target.value })}
              />
            </Field>
            <Field label="Equity % (if applicable)">
              <input
                type="number"
                value={form.equityPct}
                onChange={(e) => setForm({ ...form, equityPct: e.target.value })}
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-muted">
              Demo checkboxes stand in for uploads. Real files land in Plan B storage.
            </p>
            {(
              [
                ["identityDoc", "Identity — CNIC + selfie"],
                ["businessDoc", "Business — SECP / NTN"],
                ["financialDoc", "Financial — bank + tax"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="accent-[var(--brass,#c4a35a)]"
                />
                {label}
              </label>
            ))}
          </>
        )}

        {step === 3 && (
          <dl className="space-y-3 border border-[var(--line-dark)] bg-white p-5 text-sm">
            <Row label="Title" value={form.title || "—"} />
            <Row label="Type" value={form.type} />
            <Row label="Industry" value={form.category} />
            <Row label="City" value={form.city} />
            <Row label="Ask" value={form.askAmountPkrCr ? `${form.askAmountPkrCr} Cr` : "—"} />
            <Row
              label="Docs ready"
              value={[
                form.identityDoc && "Identity",
                form.businessDoc && "Business",
                form.financialDoc && "Financial",
              ]
                .filter(Boolean)
                .join(", ") || "None selected"}
            />
            <p className="pt-2 text-xs text-muted">
              Submit opens pending cases in the Verification Center queue (demo).
            </p>
          </dl>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="border border-[var(--line-dark)] px-4 py-2 text-sm"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="bg-ink px-4 py-2 text-sm text-stone hover:bg-ink-soft"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="bg-brass px-4 py-2 text-sm font-medium text-ink hover:bg-brass-bright"
          >
            Submit for verification
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="text-xs tracking-widest text-muted uppercase">{label}</span>
      <div className="mt-2 [&_input]:w-full [&_input]:border [&_input]:border-[var(--line-dark)] [&_input]:bg-white [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:outline-none [&_input]:focus:border-brass [&_select]:w-full [&_select]:border [&_select]:border-[var(--line-dark)] [&_select]:bg-white [&_select]:px-3 [&_select]:py-2 [&_select]:text-sm [&_select]:outline-none [&_select]:focus:border-brass [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-[var(--line-dark)] [&_textarea]:bg-white [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:focus:border-brass">
        {children}
      </div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-[var(--line-dark)] pt-3 first:border-t-0 first:pt-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
