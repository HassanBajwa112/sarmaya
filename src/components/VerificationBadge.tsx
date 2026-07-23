"use client";

import { motion } from "framer-motion";
import type { VerificationStatus } from "@/lib/data/listings";
import { verificationScore } from "@/lib/data/listings";
import { usePrefersReducedMotion } from "@/lib/motion";

export function VerificationBadge({
  verification,
  compact = false,
}: {
  verification: VerificationStatus;
  compact?: boolean;
}) {
  const score = verificationScore(verification);
  const label =
    score === 3 ? "Fully verified" : score === 2 ? "Partially verified" : "Identity verified";
  const reduce = usePrefersReducedMotion();

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs tracking-wide text-brass">
        <CheckMark animate={!reduce} />
        {label}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Layer on={verification.identity} label="Identity" animate={!reduce} />
      <Layer on={verification.businessClaim} label="Business claim" animate={!reduce} />
      <Layer on={verification.humanReviewed} label="Human reviewed" animate={!reduce} />
    </div>
  );
}

function CheckMark({ animate }: { animate: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" className="text-brass" aria-hidden>
      <motion.path
        d="M2.5 6.2 L4.8 8.5 L9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </svg>
  );
}

function Layer({
  on,
  label,
  animate,
}: {
  on: boolean;
  label: string;
  animate: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs tracking-wide ${
        on
          ? "border-brass/40 bg-brass/10 text-brass-bright"
          : "border-stone/15 text-muted"
      }`}
    >
      {on ? (
        <CheckMark animate={animate} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-muted" aria-hidden />
      )}
      {label}
    </span>
  );
}
