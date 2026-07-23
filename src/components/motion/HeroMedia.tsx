"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { motionEase, usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  posterSrc: string;
  videoSrc?: string;
};

/**
 * Poster-first hero media. Plays muted loop when video exists and is in view.
 * Falls back to a subtle Ken Burns on the poster for LCP + free-plan builds.
 */
export function HeroMedia({ posterSrc, videoSrc = "/media/hero/loop.mp4" }: Props) {
  const reduce = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(videoSrc, { method: "HEAD" })
      .then((r) => {
        if (!cancelled && r.ok) setHasVideo(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo || reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [hasVideo, reduce]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 14, ease: motionEase.soft }}
      >
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] brightness-[0.4] contrast-[1.06]"
        />
      </motion.div>
      {hasVideo && !reduce && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
    </div>
  );
}
