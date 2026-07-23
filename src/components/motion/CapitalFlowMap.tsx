"use client";

import { usePrefersReducedMotion } from "@/lib/motion";

/** Correct capital-flow viz: UK / Gulf / US → Pakistan. Replaces unreliable AI map. */
export function CapitalFlowMap({ className = "" }: { className?: string }) {
  const reduce = usePrefersReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1200 680"
        className="h-full w-full object-cover opacity-70"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="pkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dbb96a" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#c4a35a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c4a35a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="trail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4a35a" stopOpacity="0" />
            <stop offset="45%" stopColor="#dbb96a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c4a35a" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Soft continent silhouettes (simplified equirectangular) */}
        <g fill="#c4a35a" fillOpacity="0.14">
          <path d="M170 170c40-30 110-40 170-20 50 16 90 20 130 8 20-6 40 10 28 32-40 70-120 110-210 95-55-10-95-55-118-115z" />
          <path d="M300 300c25 40 35 95 18 145-12 35-55 55-85 35-35-22-45-85-28-140 8-28 55-55 95-40z" />
          <path d="M520 150c55-25 120-20 165 15 30 24 25 70-10 85-55 24-130 10-175-25-28-22-20-55 20-75z" />
          <path d="M700 200c80-10 160 10 210 55 40 35 55 95 20 130-50 50-145 45-210 10-55-30-70-90-50-140 10-25 20-50 30-55z" />
          <path d="M880 380c45 5 85 35 95 75 8 35-20 60-55 55-45-6-85-45-80-85 4-28 20-48 40-45z" />
        </g>

        {/* Arcs: NYC, London, Gulf → Pakistan (~72E, 30N ≈ x:780 y:290) */}
        <g
          fill="none"
          stroke="url(#trail)"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={reduce ? "" : "capital-arc"}
        >
          <path d="M250 250 C 420 80, 620 120, 780 290" />
          <path d="M540 190 C 620 140, 700 180, 780 290" />
          <path d="M700 310 C 730 280, 755 275, 780 290" />
        </g>

        {/* Origin nodes */}
        {[
          [250, 250],
          [540, 190],
          [700, 310],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3.5" fill="#dbb96a" />
            {!reduce && (
              <circle
                cx={cx}
                cy={cy}
                r="10"
                fill="none"
                stroke="#c4a35a"
                strokeOpacity="0.45"
                className="capital-pulse"
                style={{ animationDelay: `${i * 0.45}s` }}
              />
            )}
          </g>
        ))}

        {/* Pakistan convergence */}
        <circle cx="780" cy="290" r="54" fill="url(#pkGlow)" />
        <circle cx="780" cy="290" r="5" fill="#f3f1ec" />
        {!reduce && (
          <circle
            cx="780"
            cy="290"
            r="18"
            fill="none"
            stroke="#dbb96a"
            strokeOpacity="0.7"
            className="capital-pulse"
          />
        )}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
    </div>
  );
}
