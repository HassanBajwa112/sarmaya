"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Listing } from "@/lib/data/listings";
import { motionEase, usePrefersReducedMotion } from "@/lib/motion";
import { ListingCoverImage } from "./ListingCoverImage";
import { VerificationBadge } from "./VerificationBadge";

export function ListingRow({
  listing,
  index = 0,
}: {
  listing: Listing;
  index?: number;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.07, 0.28),
        ease: motionEase.expo,
      }}
    >
      <Link
        href={`/listings/${listing.slug}`}
        className="group block border-b border-[var(--line-dark)] py-7 transition hover:bg-stone-muted/40 sm:py-8"
      >
        <motion.div
          className="flex gap-4 sm:gap-6"
          whileHover={reduce ? undefined : { y: -3 }}
          transition={{ duration: 0.35, ease: motionEase.soft }}
        >
          <div className="relative shrink-0 overflow-hidden">
            <ListingCoverImage
              slug={listing.slug}
              imageUrl={listing.imageUrl}
              alt={listing.title}
              variant="thumb"
              className="h-20 w-20 sm:h-28 sm:w-36 md:h-32 md:w-44"
            />
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-stone"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: 0.08 + index * 0.05,
                  ease: motionEase.expo,
                }}
                style={{ originX: 0 }}
              />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest text-muted uppercase">
                <span>{listing.category}</span>
                <span className="text-brass/60">·</span>
                <span>
                  {listing.type === "existing" ? "Existing business" : "Startup pitch"}
                </span>
                {listing.featured && (
                  <>
                    <span className="text-brass/60">·</span>
                    <span className="text-brass">Featured</span>
                  </>
                )}
              </div>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-ink transition group-hover:text-ink/80 sm:text-3xl">
                {listing.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/65 sm:text-base">
                {listing.shortPitch}
              </p>
              <div className="mt-3">
                <VerificationBadge verification={listing.verification} compact />
              </div>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {listing.raiseAsk}
              </p>
              <p className="mt-1 text-sm text-muted">
                {listing.city} · {listing.stage}
              </p>
              <p className="mt-4 text-sm text-brass opacity-0 transition duration-300 group-hover:opacity-100">
                View listing →
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
