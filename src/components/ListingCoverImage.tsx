"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function listingImageLayoutId(slug: string) {
  return `listing-cover-${slug}`;
}

type Props = {
  slug: string;
  imageUrl: string;
  alt: string;
  /** `thumb` for browse rows; `hero` for detail. */
  variant: "thumb" | "hero";
  className?: string;
  priority?: boolean;
};

export function ListingCoverImage({
  slug,
  imageUrl,
  alt,
  variant,
  className = "",
  priority = false,
}: Props) {
  const isHero = variant === "hero";

  return (
    <motion.div
      layoutId={listingImageLayoutId(slug)}
      className={`relative overflow-hidden bg-ink-soft ${className}`}
      initial={isHero ? { opacity: 0, scale: 1.06 } : false}
      animate={isHero ? { opacity: 1, scale: 1 } : undefined}
      transition={{
        layout: { duration: 0.65, ease },
        opacity: { duration: 0.85, ease },
        scale: { duration: 1.1, ease },
      }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={
          isHero
            ? "100vw"
            : "(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
        }
        priority={priority}
        className={`object-cover ${
          isHero
            ? "grayscale-[0.45] contrast-[1.08] brightness-[0.55]"
            : "grayscale-[0.35] contrast-[1.05] brightness-[0.75] transition duration-700 group-hover:scale-[1.04] group-hover:brightness-[0.85] group-hover:grayscale-[0.15]"
        }`}
      />
      {isHero && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
          aria-hidden
        />
      )}
      {!isHero && (
        <div
          className="absolute inset-0 bg-ink/20 transition duration-500 group-hover:bg-ink/5"
          aria-hidden
        />
      )}
    </motion.div>
  );
}
