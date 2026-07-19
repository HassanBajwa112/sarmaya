"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Listing } from "@/lib/data/listings";
import { ListingCoverImage } from "./ListingCoverImage";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.25 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function ListingHero({ listing }: { listing: Listing }) {
  return (
    <div className="relative min-h-[52svh] overflow-hidden border-b border-[var(--line-dark)] bg-ink text-stone sm:min-h-[58svh]">
      <ListingCoverImage
        slug={listing.slug}
        imageUrl={listing.imageUrl}
        alt={listing.title}
        variant="hero"
        className="absolute inset-0 h-full w-full"
        priority
      />

      <div className="relative mx-auto flex min-h-[52svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-20 sm:min-h-[58svh] sm:px-8 sm:pb-20 sm:pt-28">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <Link
            href="/browse"
            className="text-xs tracking-widest text-brass uppercase hover:text-brass-bright"
          >
            ← Browse
          </Link>
        </motion.div>
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-3 text-xs tracking-widest text-stone/50 uppercase"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span>{listing.category}</span>
          <span>·</span>
          <span>
            {listing.type === "existing" ? "Existing business" : "Startup pitch"}
          </span>
          <span>·</span>
          <span>{listing.city}</span>
        </motion.div>
        <motion.h1
          className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {listing.title}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-stone/65"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {listing.shortPitch}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-end gap-8"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">Asking</p>
            <p className="font-display mt-1 text-3xl font-semibold text-brass">
              {listing.raiseAsk}
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">Stage</p>
            <p className="mt-1 text-lg text-stone">{listing.stage}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">Founder</p>
            <p className="mt-1 text-lg text-stone">{listing.founderName}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
