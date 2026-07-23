"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/browse", label: "Browse" },
  { href: "/for-founders", label: "Founders" },
  { href: "/for-investors", label: "Investors" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        isHome
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[var(--line)] bg-ink/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-stone transition hover:text-brass"
        >
          Sarmaya
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition ${
                pathname.startsWith(l.href)
                  ? "text-brass"
                  : "text-stone/70 hover:text-stone"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth"
            className="text-sm text-stone/70 transition hover:text-stone"
          >
            Sign in
          </Link>
          <Link
            href="/browse"
            className="border border-brass/40 bg-brass/90 px-4 py-2 text-sm font-medium text-ink transition hover:bg-brass-bright"
          >
            Explore deals
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="text-stone md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-display text-sm tracking-widest uppercase">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-ink px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg text-stone"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/auth" onClick={() => setOpen(false)} className="text-brass">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
