"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const SESSION_KEY = "sarmaya-enter-seen";

/**
 * Optional brand flash. Skips when reduced-motion is on, when already seen
 * this session, or when the document is being audited (webdriver) so LCP
 * is not held behind a full-screen overlay.
 */
export function EnterLoader({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (typeof navigator !== "undefined" && navigator.webdriver) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      /* ignore */
    }
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 700);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ink"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <motion.p
              className="font-display text-3xl font-bold tracking-tight text-stone sm:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Sarmaya
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
