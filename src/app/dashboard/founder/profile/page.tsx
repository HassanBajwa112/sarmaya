"use client";

import { useState } from "react";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderProfile } from "@/lib/data/dashboard";

export default function FounderProfilePage() {
  const [profile, setProfile] = useState(founderProfile);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <PageHeading
        title="Founder profile"
        description="Public-facing profile investors see on interest and listings."
      />
      <form
        className="max-w-xl space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        {(
          [
            ["name", "Name"],
            ["headline", "Headline"],
            ["city", "City"],
            ["linkedin", "LinkedIn URL"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block text-sm">
            <span className="text-xs tracking-widest text-muted uppercase">
              {label}
            </span>
            <input
              value={profile[key]}
              onChange={(e) => {
                setSaved(false);
                setProfile({ ...profile, [key]: e.target.value });
              }}
              className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 outline-none focus:border-brass"
            />
          </label>
        ))}
        <label className="block text-sm">
          <span className="text-xs tracking-widest text-muted uppercase">Bio</span>
          <textarea
            value={profile.bio}
            rows={4}
            onChange={(e) => {
              setSaved(false);
              setProfile({ ...profile, bio: e.target.value });
            }}
            className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 outline-none focus:border-brass"
          />
        </label>
        <button
          type="submit"
          className="bg-ink px-5 py-3 text-sm text-stone hover:bg-ink-soft"
        >
          Save profile
        </button>
        {saved && (
          <p className="text-sm text-brass">Saved for this session (demo).</p>
        )}
      </form>
    </div>
  );
}
