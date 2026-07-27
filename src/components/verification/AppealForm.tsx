"use client";

import { useState } from "react";
import Link from "next/link";

export function AppealForm({ caseId }: { caseId: string }) {
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-4 border border-brass/30 bg-brass/10 px-4 py-3 text-sm text-ink">
        Appeal queued for re-review (demo). Case {caseId} — no email sent.
      </p>
    );
  }

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="block text-xs tracking-widest text-muted uppercase">
        Appeal note
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          required
          className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brass"
          placeholder="Explain what changed and attach supporting context…"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="bg-ink px-4 py-2 text-sm text-stone hover:bg-ink-soft"
        >
          Submit appeal
        </button>
        <Link href="/auth" className="px-4 py-2 text-sm text-brass hover:underline">
          Sign in required for real submit →
        </Link>
      </div>
    </form>
  );
}

export function ResubmitHint() {
  return (
    <p className="mt-3 text-sm text-muted">
      Rejected? Update documents and resubmit from this center. Demo UI only —
      uploads land in Plan B.
    </p>
  );
}
