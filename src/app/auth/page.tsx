"use client";

import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [role, setRole] = useState<"founder" | "investor">("investor");

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-ink px-5 py-20">
      <div className="w-full max-w-md border border-[var(--line)] bg-ink-soft p-8 sm:p-10">
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
          Demo shell
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold text-stone">
          {mode === "in" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-stone/55">
          UI only for Plan A — no real authentication yet.
        </p>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("in")}
            className={`flex-1 py-2 text-sm ${
              mode === "in" ? "bg-brass text-ink" : "border border-[var(--line)] text-stone"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("up")}
            className={`flex-1 py-2 text-sm ${
              mode === "up" ? "bg-brass text-ink" : "border border-[var(--line)] text-stone"
            }`}
          >
            Sign up
          </button>
        </div>

        {mode === "up" && (
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setRole("investor")}
              className={`flex-1 py-2 text-xs tracking-wide uppercase ${
                role === "investor"
                  ? "border border-brass text-brass"
                  : "border border-[var(--line)] text-muted"
              }`}
            >
              Investor
            </button>
            <button
              type="button"
              onClick={() => setRole("founder")}
              className={`flex-1 py-2 text-xs tracking-wide uppercase ${
                role === "founder"
                  ? "border border-brass text-brass"
                  : "border border-[var(--line)] text-muted"
              }`}
            >
              Founder
            </button>
          </div>
        )}

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border border-[var(--line)] bg-ink px-4 py-3 text-sm text-stone outline-none placeholder:text-muted focus:border-brass"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border border-[var(--line)] bg-ink px-4 py-3 text-sm text-stone outline-none placeholder:text-muted focus:border-brass"
          />
          <Link
            href={role === "founder" ? "/dashboard/founder" : "/dashboard/investor"}
            className="flex w-full items-center justify-center bg-brass py-3 text-sm font-medium text-ink hover:bg-brass-bright"
          >
            Continue to dashboard
          </Link>
        </form>
      </div>
    </div>
  );
}
