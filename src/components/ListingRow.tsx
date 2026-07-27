"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Listing } from "@/lib/data/listings";
import {
  formatPkrCr,
  fundingProgress,
  investmentTermsLabel,
  verificationTier,
  verificationTierLabel,
} from "@/lib/data/listings";
import { motionEase, usePrefersReducedMotion } from "@/lib/motion";
import { ListingCoverImage } from "./ListingCoverImage";

export function ListingRow({
  listing,
  index = 0,
}: {
  listing: Listing;
  index?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const progress = fundingProgress(listing);
  const tier = verificationTier(listing.verification);
  const terms = investmentTermsLabel(listing);

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
              className="h-24 w-24 sm:h-32 sm:w-40 md:h-36 md:w-48"
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
            <span className="absolute bottom-1.5 left-1.5 bg-ink/85 px-1.5 py-0.5 text-[10px] tracking-wide text-brass uppercase backdrop-blur-sm">
              Trust {listing.trustScore}
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs tracking-widest text-muted uppercase">
                  <span>{listing.category}</span>
                  <span className="text-brass/60">·</span>
                  <span>{listing.city}</span>
                  <span className="text-brass/60">·</span>
                  <span>
                    {listing.type === "existing"
                      ? "Existing business"
                      : "Startup pitch"}
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
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {formatPkrCr(listing.askAmountPkrCr)}
                </p>
                <p className="mt-1 text-sm text-muted">{terms}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Revenue" value={formatPkrCr(listing.revenuePkrCr)} />
              <Metric label="Expected ROI" value={listing.expectedRoi} />
              <Metric
                label="Verification"
                value={verificationTierLabel(tier)}
                accent={tier !== "unverified"}
              />
              <Metric label="Stage" value={listing.stage} />
            </div>

            <div className="max-w-md">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>
                  Raised {formatPkrCr(listing.raisedPkrCr)} of{" "}
                  {formatPkrCr(listing.askAmountPkrCr)}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden bg-stone-muted">
                <div
                  className="h-full bg-brass transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-brass opacity-0 transition duration-300 group-hover:opacity-100">
              View listing →
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border-t border-[var(--line-dark)] pt-2">
      <p className="text-[10px] tracking-widest text-muted uppercase">{label}</p>
      <p
        className={`mt-1 text-sm font-medium ${accent ? "text-brass" : "text-ink/80"}`}
      >
        {value}
      </p>
    </div>
  );
}
