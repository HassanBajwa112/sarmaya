"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { adminNav } from "@/lib/data/admin";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const Nav = () => (
    <nav className="space-y-1">
      {adminNav.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`block px-3 py-2 text-sm transition ${
              active
                ? "bg-brass/20 text-brass"
                : "text-stone/60 hover:bg-ink-soft hover:text-stone"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#0a0908] text-stone">
      <div className="border-b border-stone/10 bg-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-brass uppercase">
              Internal · Admin
            </p>
            <p className="font-display text-lg font-semibold">Sarmaya control</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/auth" className="text-stone/50 hover:text-brass">
              Sign in
            </Link>
            <Link href="/" className="hidden text-stone/50 hover:text-stone sm:inline">
              Exit to site
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
        <div className="mx-auto max-w-6xl px-5 pb-3 sm:px-8">
          <p className="border border-dashed border-brass/30 bg-brass/5 px-3 py-2 text-xs text-stone/70">
            Demo admin — sign in required in Plan B.{" "}
            <Link href="/auth" className="text-brass hover:underline">
              Go to auth →
            </Link>
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-10 px-5 py-10 sm:px-8">
        <aside className="hidden w-48 shrink-0 lg:block">
          <Nav />
        </aside>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-64 bg-ink p-5">
              <Nav />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
