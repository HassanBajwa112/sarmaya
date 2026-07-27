"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORIES,
  CITIES,
  FUNDING_STAGES,
} from "@/lib/data/listings";

const VERIFICATION_OPTS = [
  { value: "full", label: "Fully verified" },
  { value: "partial", label: "Partially verified" },
  { value: "unverified", label: "Unverified" },
] as const;

const MODEL_OPTS = [
  { value: "equity", label: "Equity" },
  { value: "profit-share", label: "Profit-share" },
  { value: "either", label: "Either" },
] as const;

export function BrowseFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value == null || value === "" || value === "All") next.delete(key);
      else next.set(key, value);
      const qs = next.toString();
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const toggleCsv = useCallback(
    (key: string, value: string) => {
      const raw = searchParams.get(key) ?? "";
      const set = new Set(
        raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
      if (set.has(value)) set.delete(value);
      else set.add(value);
      const joined = [...set].join(",");
      setParam(key, joined || null);
    },
    [searchParams, setParam],
  );

  const clearAll = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasFilters = searchParams.toString().length > 0;

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const panel = (
    <FilterPanel
      searchParams={searchParams}
      setParam={setParam}
      toggleCsv={toggleCsv}
      clearAll={clearAll}
      hasFilters={hasFilters}
      resultCount={resultCount}
      pending={pending}
    />
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
        <p className="text-sm text-muted">
          {resultCount} listing{resultCount === 1 ? "" : "s"}
          {pending ? " · updating…" : ""}
        </p>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="border border-[var(--line-dark)] bg-white px-4 py-2 text-sm text-ink hover:border-ink"
        >
          Filters
        </button>
      </div>

      <aside className="hidden w-64 shrink-0 lg:block">{panel}</aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-stone shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--line-dark)] px-5 py-4">
              <p className="font-display text-lg font-semibold">Filters</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-sm text-muted hover:text-ink"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{panel}</div>
            <div className="border-t border-[var(--line-dark)] px-5 py-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-ink px-4 py-3 text-sm text-stone hover:bg-ink-soft"
              >
                Show {resultCount} listing{resultCount === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterPanel({
  searchParams,
  setParam,
  toggleCsv,
  clearAll,
  hasFilters,
  resultCount,
  pending,
}: {
  searchParams: URLSearchParams;
  setParam: (key: string, value: string | null) => void;
  toggleCsv: (key: string, value: string) => void;
  clearAll: () => void;
  hasFilters: boolean;
  resultCount: number;
  pending: boolean;
}) {
  const csvHas = (key: string, value: string) => {
    const raw = searchParams.get(key) ?? "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .includes(value);
  };

  return (
    <div className={`space-y-8 ${pending ? "opacity-70" : ""}`}>
      <div className="hidden items-center justify-between lg:flex">
        <p className="text-sm text-muted">
          {resultCount} listing{resultCount === 1 ? "" : "s"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-brass hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs text-brass hover:underline lg:hidden"
        >
          Clear all filters
        </button>
      )}

      <SearchField
        initial={searchParams.get("q") ?? ""}
        onCommit={(v) => setParam("q", v || null)}
      />

      <Field label="Type">
        <select
          value={searchParams.get("type") ?? "All"}
          onChange={(e) => setParam("type", e.target.value)}
          className="w-full border border-[var(--line-dark)] bg-white px-3 py-2 text-sm outline-none focus:border-brass"
        >
          <option value="All">All types</option>
          <option value="existing">Existing business</option>
          <option value="startup">Startup pitch</option>
        </select>
      </Field>

      <Field label="Sort">
        <select
          value={searchParams.get("sort") ?? ""}
          onChange={(e) => setParam("sort", e.target.value || null)}
          className="w-full border border-[var(--line-dark)] bg-white px-3 py-2 text-sm outline-none focus:border-brass"
        >
          <option value="">Relevance</option>
          <option value="trust">Trust score</option>
          <option value="funded">% funded</option>
          <option value="newest">Newest founded</option>
          <option value="roi">Highest trust / ROI proxy</option>
        </select>
      </Field>

      <CheckboxGroup
        label="Industry"
        options={CATEGORIES.map((c) => ({ value: c, label: c }))}
        selected={(v) => csvHas("category", v)}
        onToggle={(v) => toggleCsv("category", v)}
      />

      <CheckboxGroup
        label="City"
        options={CITIES.map((c) => ({ value: c, label: c }))}
        selected={(v) => csvHas("city", v)}
        onToggle={(v) => toggleCsv("city", v)}
      />

      <CheckboxGroup
        label="Stage"
        options={FUNDING_STAGES.map((s) => ({ value: s, label: s }))}
        selected={(v) => csvHas("stage", v)}
        onToggle={(v) => toggleCsv("stage", v)}
      />

      <CheckboxGroup
        label="Investment model"
        options={[...MODEL_OPTS]}
        selected={(v) => csvHas("model", v)}
        onToggle={(v) => toggleCsv("model", v)}
      />

      <CheckboxGroup
        label="Verification"
        options={[...VERIFICATION_OPTS]}
        selected={(v) => csvHas("verification", v)}
        onToggle={(v) => toggleCsv("verification", v)}
      />

      <RangePair
        label="Ask (PKR Cr)"
        minKey="askMin"
        maxKey="askMax"
        searchParams={searchParams}
        setParam={setParam}
        placeholderMin="0"
        placeholderMax="10"
      />
      <RangePair
        label="Revenue (PKR Cr)"
        minKey="revenueMin"
        maxKey="revenueMax"
        searchParams={searchParams}
        setParam={setParam}
        placeholderMin="0"
        placeholderMax="30"
      />
      <RangePair
        label="Profit (PKR Cr)"
        minKey="profitMin"
        maxKey="profitMax"
        searchParams={searchParams}
        setParam={setParam}
        placeholderMin="-1"
        placeholderMax="5"
      />
      <RangePair
        label="Business age (years)"
        minKey="ageMin"
        maxKey="ageMax"
        searchParams={searchParams}
        setParam={setParam}
        placeholderMin="0"
        placeholderMax="20"
      />
      <RangePair
        label="Employees"
        minKey="employeesMin"
        maxKey="employeesMax"
        searchParams={searchParams}
        setParam={setParam}
        placeholderMin="1"
        placeholderMax="200"
      />
    </div>
  );
}

function SearchField({
  initial,
  onCommit,
}: {
  initial: string;
  onCommit: (value: string) => void;
}) {
  const [value, setValue] = useState(initial);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <Field label="Search">
      <input
        value={value}
        placeholder="Search listings…"
        className="w-full border border-[var(--line-dark)] bg-white px-3 py-2 text-sm outline-none focus:border-brass"
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => onCommit(v), 280);
        }}
        onBlur={() => onCommit(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (timer.current) clearTimeout(timer.current);
            onCommit(value);
          }
        }}
      />
    </Field>
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
    <div>
      <p className="mb-2 text-xs tracking-widest text-muted uppercase">{label}</p>
      {children}
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: (value: string) => boolean;
  onToggle: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <ul className="max-h-40 space-y-1.5 overflow-y-auto pr-1">
        {options.map((o) => (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={selected(o.value)}
                onChange={() => onToggle(o.value)}
                className="accent-[var(--brass,#c4a35a)]"
              />
              {o.label}
            </label>
          </li>
        ))}
      </ul>
    </Field>
  );
}

function RangePair({
  label,
  minKey,
  maxKey,
  searchParams,
  setParam,
  placeholderMin,
  placeholderMax,
}: {
  label: string;
  minKey: string;
  maxKey: string;
  searchParams: URLSearchParams;
  setParam: (key: string, value: string | null) => void;
  placeholderMin: string;
  placeholderMax: string;
}) {
  return (
    <Field label={label}>
      <div className="flex gap-2">
        <input
          key={`${minKey}-${searchParams.get(minKey) ?? ""}`}
          type="number"
          step="any"
          defaultValue={searchParams.get(minKey) ?? ""}
          placeholder={placeholderMin}
          className="w-full border border-[var(--line-dark)] bg-white px-2 py-2 text-sm outline-none focus:border-brass"
          onBlur={(e) => setParam(minKey, e.target.value || null)}
        />
        <input
          key={`${maxKey}-${searchParams.get(maxKey) ?? ""}`}
          type="number"
          step="any"
          defaultValue={searchParams.get(maxKey) ?? ""}
          placeholder={placeholderMax}
          className="w-full border border-[var(--line-dark)] bg-white px-2 py-2 text-sm outline-none focus:border-brass"
          onBlur={(e) => setParam(maxKey, e.target.value || null)}
        />
      </div>
    </Field>
  );
}
