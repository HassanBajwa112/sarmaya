"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  motionEase,
  revealVariants,
  usePrefersReducedMotion,
  type RevealKind,
} from "@/lib/motion";

type Props = {
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  kind = "fadeUp",
  delay = 0,
  duration = 0.85,
  once = true,
  children,
  className,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const variants = revealVariants[kind];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
      transition={{
        duration,
        delay,
        ease: kind === "slideLeft" ? motionEase.quart : motionEase.expo,
      }}
    >
      {children}
    </motion.div>
  );
}
