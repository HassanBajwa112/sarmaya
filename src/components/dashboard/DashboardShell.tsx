"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type DashNavItem = { href: string; label: string };

export function DashboardShell({
  role,
  title,
  subtitle,
  nav,
  children,
}: {
  role: "investor" | "founder";
  title: string;
  subtitle?: string;
  nav: DashNavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const other =
    role === "investor"
      ? { href: "/dashboard/founder", label: "Switch to founder" }
      : { href: "/dashboard/investor", label: "Switch to investor" };

  const NavLinks = () => (
    <nav className="space-y-1">
      {nav.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`block px-3 py-2 text-sm transition ${
              active
                ? "bg-ink text-stone"
                : "text-ink/70 hover:bg-stone-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-brass uppercase">
              {role} dashboard · demo
            </p>
            <h1 className="font-display text-xl font-semibold sm:text-2xl">{title}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href={other.href} className="hidden text-stone/60 hover:text-brass sm:inline">
              {other.label}
            </Link>
            <Link href="/auth" className="text-stone/60 hover:text-brass">
              Sign in
            </Link>
            <button
              type="button"
              className="border border-stone/20 px-3 py-1.5 text-xs tracking-widest uppercase lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-10 px-5 py-10 sm:px-8">
        <aside className="hidden w-52 shrink-0 lg:block">
          <NavLinks />
          <Link
            href="/browse"
            className="mt-8 block text-xs text-brass hover:underline"
          >
            ← Browse marketplace
          </Link>
        </aside>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-ink/40"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-64 bg-stone p-5 shadow-xl">
              <NavLinks />
              <Link
                href={other.href}
                className="mt-6 block text-sm text-brass"
                onClick={() => setOpen(false)}
              >
                {other.label}
              </Link>
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          {subtitle && <p className="mb-8 text-sm text-ink/60">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="border border-dashed border-[var(--line-dark)] px-6 py-14 text-center">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex bg-ink px-4 py-2 text-sm text-stone hover:bg-ink-soft"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function StatGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="border border-[var(--line-dark)] bg-white p-5">
          <p className="text-xs tracking-widest text-muted uppercase">{s.label}</p>
          <p className="font-display mt-2 text-3xl font-semibold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
