"use client";

import { useMemo, useState } from "react";
import { adminUsers, type AdminUser } from "@/lib/data/admin";

export default function AdminUsersClient() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState(adminUsers);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return rows;
    return rows.filter(
      (u) =>
        u.name.toLowerCase().includes(needle) ||
        u.email.toLowerCase().includes(needle) ||
        u.role.includes(needle),
    );
  }, [q, rows]);

  const toggle = (id: string) => {
    setRows((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "active" ? "suspended" : "active",
            }
          : u,
      ),
    );
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Users</h1>
      <p className="mt-2 text-sm text-stone/55">
        Search, roles, and suspend — demo only, not persisted.
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search name, email, role…"
        className="mt-8 w-full max-w-md border border-stone/20 bg-ink px-3 py-2 text-sm text-stone outline-none focus:border-brass"
      />
      <ul className="mt-6 divide-y divide-stone/10 border-y border-stone/10">
        {filtered.map((u: AdminUser) => (
          <li
            key={u.id}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div>
              <p className="font-medium text-stone">{u.name}</p>
              <p className="text-sm text-stone/50">
                {u.email} · {u.role} · joined {u.joinedAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs tracking-widest uppercase ${
                  u.status === "active" ? "text-brass" : "text-stone/40"
                }`}
              >
                {u.status}
              </span>
              <button
                type="button"
                onClick={() => toggle(u.id)}
                className="border border-stone/20 px-3 py-1.5 text-xs text-stone/70 hover:border-brass"
              >
                {u.status === "active" ? "Suspend" : "Reinstate"}
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-12 text-center text-stone/50">No users match.</li>
        )}
      </ul>
    </div>
  );
}
