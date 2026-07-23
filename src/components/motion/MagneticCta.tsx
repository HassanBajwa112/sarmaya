"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
};

export function MagneticCta({
  href,
  children,
  className = "",
  variant = "solid",
}: Props) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const base =
    variant === "solid"
      ? "bg-brass px-7 py-3.5 text-sm font-medium text-ink hover:bg-brass-bright"
      : "border border-stone/30 px-7 py-3.5 text-sm text-stone hover:border-brass hover:text-brass";

  if (reduce) {
    return (
      <Link href={href} className={`inline-flex ${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-flex">
      <Link
        ref={ref}
        href={href}
        className={`inline-flex ${base} ${className}`}
        onMouseMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          x.set(dx * 0.22);
          y.set(dy * 0.22);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}
