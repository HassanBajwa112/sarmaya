"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function EnterLoader({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="font-display text-3xl font-bold tracking-tight text-stone sm:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sarmaya
            </motion.p>
            <motion.span
              className="absolute bottom-16 text-xs tracking-[0.35em] text-brass uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Enter
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
