"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

export const motionEase = {
  expo: EASE_OUT_EXPO,
  quart: EASE_OUT_QUART,
  soft: EASE_SOFT,
} as const;

/** Varied reveal recipes — avoid one uniform fade-up everywhere. */
export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 36 },
    show: { opacity: 1, x: 0 },
  },
  clipUp: {
    hidden: { opacity: 0, y: 40, clipPath: "inset(12% 0 0 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
} as const;

export type RevealKind = keyof typeof revealVariants;

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/** True after mount — for GSAP/Lenis that must not run on the server. */
export function useIsClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
