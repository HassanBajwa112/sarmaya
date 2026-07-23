"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { POSITIONING } from "@/lib/data/listings";
import { motionEase, usePrefersReducedMotion } from "@/lib/motion";

const FLOATS = [
  {
    src: "/media/listings/lahore-precision-parts.jpg",
    alt: "Precision manufacturing",
    label: "Manufacturing",
    side: "left" as const,
    rotate: -14,
    x: "6%",
    y: "22%",
  },
  {
    src: "/media/listings/solar-yard-faisalabad.jpg",
    alt: "Solar installation",
    label: "Energy",
    side: "right" as const,
    rotate: 12,
    x: "72%",
    y: "18%",
  },
  {
    src: "/media/listings/sindh-cold-chain.jpg",
    alt: "Cold chain logistics",
    label: "Agribusiness",
    side: "left" as const,
    rotate: 8,
    x: "10%",
    y: "58%",
  },
  {
    src: "/media/listings/clinicstack.jpg",
    alt: "Clinic interior",
    label: "Healthcare",
    side: "right" as const,
    rotate: -10,
    x: "74%",
    y: "55%",
  },
];

export function InteractiveHero() {
  const reduce = usePrefersReducedMotion();
  const root = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 24, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 24, mass: 0.4 });
  const glowX = useTransform(sx, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "55%"]);
  const glow = useMotionTemplate`radial-gradient(ellipse 55% 45% at ${glowX} ${glowY}, rgba(196,163,90,0.22), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !root.current) return;
    const r = root.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={root}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] overflow-hidden grain bg-ink"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <Image
          src="/media/hero/poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 brightness-[0.35] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: reduce ? undefined : glow }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(196,163,90,0.14), transparent 65%)",
          }}
          aria-hidden
        />
      </div>

      {/* Floating listing panels */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {FLOATS.map((item, i) => (
          <FloatCard
            key={item.src}
            item={item}
            index={i}
            sx={sx}
            sy={sy}
            reduce={reduce}
          />
        ))}
      </div>

      {/* Center stage */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: motionEase.soft }}
          className="inline-flex items-center gap-2 border border-brass/30 bg-ink/50 px-3 py-1.5 text-[11px] tracking-[0.22em] text-brass uppercase backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          Diaspora-first directory
        </motion.div>

        <motion.p
          className="font-display mt-8 text-6xl font-extrabold tracking-tight text-stone sm:text-7xl md:text-8xl lg:text-9xl"
          initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.25, ease: motionEase.expo }}
        >
          Sarmaya
        </motion.p>

        <motion.h1
          className="mt-6 max-w-xl text-xl font-light leading-snug text-stone/90 sm:text-2xl md:text-3xl text-balance"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: motionEase.expo }}
        >
          Growth capital for businesses that keep running.
        </motion.h1>

        <motion.p
          className="mt-4 max-w-md text-sm leading-relaxed text-stone/55 sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: motionEase.soft }}
        >
          {POSITIONING}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75, ease: motionEase.soft }}
        >
          <MagneticCta href="/browse" className="shadow-[0_0_40px_rgba(196,163,90,0.25)]">
            Browse verified listings
          </MagneticCta>
          <MagneticCta href="/for-investors" variant="ghost">
            Invest from abroad
          </MagneticCta>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-[0.18em] text-stone/40 uppercase"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: motionEase.soft }}
        >
          <span>Identity verified</span>
          <span className="text-brass/50">·</span>
          <span>Human reviewed</span>
          <span className="text-brass/50">·</span>
          <span>No fund custody</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Link
          href="#why"
          className="group flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-stone/40 uppercase transition hover:text-brass"
        >
          Explore
          <span className="block h-8 w-px overflow-hidden bg-stone/20">
            {!reduce && (
              <motion.span
                className="block h-full w-full bg-brass"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </span>
        </Link>
      </motion.div>
    </section>
  );
}

function FloatCard({
  item,
  index,
  sx,
  sy,
  reduce,
}: {
  item: (typeof FLOATS)[number];
  index: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const depth = index % 2 === 0 ? 28 : 42;
  const sign = item.side === "left" ? 1 : -1;
  const tx = useTransform(sx, (v) => v * depth * sign);
  const ty = useTransform(sy, (v) => v * (depth * 0.7));
  const rot = useTransform(sx, (v) => item.rotate + v * 6 * sign);

  return (
    <motion.div
      className="absolute w-[160px] overflow-hidden border border-stone/10 bg-ink-soft shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:w-[200px]"
      style={{
        left: item.x,
        top: item.y,
        x: reduce ? 0 : tx,
        y: reduce ? 0 : ty,
        rotate: reduce ? item.rotate : rot,
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.86, y: 40 }}
      animate={
        reduce
          ? { opacity: 0.9 }
          : {
              opacity: 0.92,
              scale: 1,
              y: [0, index % 2 === 0 ? -10 : 10, 0],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              opacity: { duration: 0.8, delay: 0.35 + index * 0.1 },
              scale: { duration: 0.8, delay: 0.35 + index * 0.1 },
              y: {
                duration: 5.5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 + index * 0.2,
              },
            }
      }
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="200px"
          className="object-cover brightness-[0.85] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <p className="absolute bottom-3 left-3 font-display text-[10px] tracking-[0.2em] text-brass uppercase">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
}
