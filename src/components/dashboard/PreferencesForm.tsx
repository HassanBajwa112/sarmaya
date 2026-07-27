"use client";

import { useState } from "react";
import { CATEGORIES, CITIES } from "@/lib/data/listings";
import type { InvestorPreferences } from "@/lib/data/ai-insights";

export function PreferencesForm({ initial }: { initial: InvestorPreferences }) {
  const [prefs, setPrefs] = useState(initial);
  const [saved, setSaved] = useState(false);

  const toggle = <T extends string>(key: "industries" | "cities" | "models", value: T) => {
    setSaved(false);
    setPrefs((p) => {
      const list = p[key] as string[];
      const next = list.includes(value)
        ? list.filter((x) => x !== value)
        : [...list, value];
      return { ...p, [key]: next };
    });
  };

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <fieldset>
        <legend className="text-xs tracking-widest text-muted uppercase">
          Industries
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <label
              key={c}
              className={`cursor-pointer border px-3 py-1.5 text-xs ${
                prefs.industries.includes(c)
                  ? "border-ink bg-ink text-stone"
                  : "border-[var(--line-dark)]"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={prefs.industries.includes(c)}
                onChange={() => toggle("industries", c)}
              />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs tracking-widest text-muted uppercase">Cities</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <label
              key={c}
              className={`cursor-pointer border px-3 py-1.5 text-xs ${
                prefs.cities.includes(c)
                  ? "border-ink bg-ink text-stone"
                  : "border-[var(--line-dark)]"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={prefs.cities.includes(c)}
                onChange={() => toggle("cities", c)}
              />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-xs tracking-widest text-muted uppercase">
            Ticket min (PKR Cr)
          </span>
          <input
            type="number"
            step="0.1"
            value={prefs.ticketMinPkrCr}
            onChange={(e) => {
              setSaved(false);
              setPrefs((p) => ({ ...p, ticketMinPkrCr: Number(e.target.value) }));
            }}
            className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 outline-none focus:border-brass"
          />
        </label>
        <label className="text-sm">
          <span className="text-xs tracking-widest text-muted uppercase">
            Ticket max (PKR Cr)
          </span>
          <input
            type="number"
            step="0.1"
            value={prefs.ticketMaxPkrCr}
            onChange={(e) => {
              setSaved(false);
              setPrefs((p) => ({ ...p, ticketMaxPkrCr: Number(e.target.value) }));
            }}
            className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 outline-none focus:border-brass"
          />
        </label>
      </fieldset>

      <fieldset>
        <legend className="text-xs tracking-widest text-muted uppercase">
          Investment model
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["equity", "Equity"],
              ["profit-share", "Profit-share"],
              ["either", "Either"],
            ] as const
          ).map(([v, label]) => (
            <label
              key={v}
              className={`cursor-pointer border px-3 py-1.5 text-xs ${
                prefs.models.includes(v)
                  ? "border-ink bg-ink text-stone"
                  : "border-[var(--line-dark)]"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={prefs.models.includes(v)}
                onChange={() => toggle("models", v)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="bg-ink px-5 py-3 text-sm text-stone hover:bg-ink-soft"
        >
          Save preferences
        </button>
        {saved && (
          <p className="text-sm text-brass">
            Saved locally for this session (demo). Feeds AI match on refresh once
            wired to auth.
          </p>
        )}
      </div>
    </form>
  );
}
