export type ReviewState =
  | "pending"
  | "in_review"
  | "approved"
  | "rejected"
  | "appeal";

export type VerificationKind = "identity" | "business" | "financial";

export type TimelineEvent = {
  id: string;
  at: string; // ISO date
  label: string;
  detail?: string;
  actor: "founder" | "reviewer" | "system";
};

export type VerificationCase = {
  id: string;
  listingSlug: string;
  kind: VerificationKind;
  state: ReviewState;
  submittedAt: string;
  updatedAt: string;
  assignee?: string;
  rejectionReason?: string;
  appealNote?: string;
  documents: { id: string; title: string }[];
  timeline: TimelineEvent[];
};

export const REVIEW_STATES: { value: ReviewState; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "appeal", label: "Appeal" },
];

export const KIND_LABELS: Record<VerificationKind, string> = {
  identity: "Identity (CNIC + selfie)",
  business: "Business (registration / NTN)",
  financial: "Financial (bank + tax filings)",
};

function ev(
  id: string,
  at: string,
  label: string,
  actor: TimelineEvent["actor"],
  detail?: string,
): TimelineEvent {
  return { id, at, label, actor, detail };
}

export const verificationCases: VerificationCase[] = [
  {
    id: "vc-lpp-id",
    listingSlug: "lahore-precision-parts",
    kind: "identity",
    state: "approved",
    submittedAt: "2026-01-12T09:00:00Z",
    updatedAt: "2026-01-14T16:20:00Z",
    assignee: "Amina R. (reviewer)",
    documents: [
      { id: "d1", title: "CNIC front/back" },
      { id: "d2", title: "Selfie match" },
    ],
    timeline: [
      ev("t1", "2026-01-12T09:00:00Z", "Submitted", "founder"),
      ev("t2", "2026-01-13T11:00:00Z", "In review", "reviewer", "Assigned to Amina R."),
      ev("t3", "2026-01-14T16:20:00Z", "Approved", "reviewer"),
    ],
  },
  {
    id: "vc-lpp-biz",
    listingSlug: "lahore-precision-parts",
    kind: "business",
    state: "approved",
    submittedAt: "2026-01-12T09:10:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
    assignee: "Amina R. (reviewer)",
    documents: [
      { id: "d3", title: "SECP certificate" },
      { id: "d4", title: "NTN / FBR letter" },
    ],
    timeline: [
      ev("t1", "2026-01-12T09:10:00Z", "Submitted", "founder"),
      ev("t2", "2026-01-14T09:00:00Z", "In review", "reviewer"),
      ev("t3", "2026-01-15T10:00:00Z", "Approved", "reviewer"),
    ],
  },
  {
    id: "vc-lpp-fin",
    listingSlug: "lahore-precision-parts",
    kind: "financial",
    state: "approved",
    submittedAt: "2026-01-12T09:20:00Z",
    updatedAt: "2026-01-16T14:00:00Z",
    assignee: "Hassan K. (reviewer)",
    documents: [
      { id: "d5", title: "Bank statements (12 mo)" },
      { id: "d6", title: "Tax filings FY24" },
    ],
    timeline: [
      ev("t1", "2026-01-12T09:20:00Z", "Submitted", "founder"),
      ev("t2", "2026-01-15T12:00:00Z", "In review", "reviewer"),
      ev("t3", "2026-01-16T14:00:00Z", "Approved", "reviewer"),
    ],
  },
  {
    id: "vc-clinic-id",
    listingSlug: "clinicstack",
    kind: "identity",
    state: "approved",
    submittedAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-02-02T17:00:00Z",
    assignee: "Amina R. (reviewer)",
    documents: [
      { id: "d7", title: "CNIC" },
      { id: "d8", title: "Selfie" },
    ],
    timeline: [
      ev("t1", "2026-02-01T08:00:00Z", "Submitted", "founder"),
      ev("t2", "2026-02-02T10:00:00Z", "In review", "reviewer"),
      ev("t3", "2026-02-02T17:00:00Z", "Approved", "reviewer"),
    ],
  },
  {
    id: "vc-clinic-biz",
    listingSlug: "clinicstack",
    kind: "business",
    state: "rejected",
    submittedAt: "2026-02-01T08:15:00Z",
    updatedAt: "2026-02-10T11:00:00Z",
    assignee: "Hassan K. (reviewer)",
    rejectionReason:
      "SECP registration name does not match founder legal name on CNIC. Please resubmit with corrected docs or a name-change affidavit.",
    documents: [{ id: "d9", title: "Draft SECP certificate" }],
    timeline: [
      ev("t1", "2026-02-01T08:15:00Z", "Submitted", "founder"),
      ev("t2", "2026-02-05T09:00:00Z", "In review", "reviewer"),
      ev(
        "t3",
        "2026-02-08T16:00:00Z",
        "Rejected",
        "reviewer",
        "Name mismatch on SECP vs CNIC",
      ),
      ev("t4", "2026-02-10T11:00:00Z", "Resubmission requested", "system"),
    ],
  },
  {
    id: "vc-clinic-fin",
    listingSlug: "clinicstack",
    kind: "financial",
    state: "pending",
    submittedAt: "2026-02-01T08:30:00Z",
    updatedAt: "2026-02-01T08:30:00Z",
    documents: [{ id: "d10", title: "Pilot invoice pack" }],
    timeline: [ev("t1", "2026-02-01T08:30:00Z", "Submitted", "founder")],
  },
  {
    id: "vc-learn-id",
    listingSlug: "learnlocal",
    kind: "identity",
    state: "approved",
    submittedAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-02T12:00:00Z",
    assignee: "Amina R. (reviewer)",
    documents: [{ id: "d11", title: "CNIC + selfie" }],
    timeline: [
      ev("t1", "2026-03-01T10:00:00Z", "Submitted", "founder"),
      ev("t2", "2026-03-02T12:00:00Z", "Approved", "reviewer"),
    ],
  },
  {
    id: "vc-learn-biz",
    listingSlug: "learnlocal",
    kind: "business",
    state: "appeal",
    submittedAt: "2026-03-01T10:15:00Z",
    updatedAt: "2026-03-18T09:00:00Z",
    assignee: "Hassan K. (reviewer)",
    rejectionReason: "Traction metrics lacked supporting payment screenshots.",
    appealNote:
      "Attached JazzCash settlement exports for Jan–Feb learner payments. Requesting re-review.",
    documents: [
      { id: "d12", title: "Marketplace screenshots" },
      { id: "d13", title: "JazzCash exports (appeal)" },
    ],
    timeline: [
      ev("t1", "2026-03-01T10:15:00Z", "Submitted", "founder"),
      ev("t2", "2026-03-08T14:00:00Z", "Rejected", "reviewer", "Missing payment proof"),
      ev("t3", "2026-03-18T09:00:00Z", "Appeal filed", "founder"),
      ev("t4", "2026-03-18T09:05:00Z", "Queued for re-review", "system"),
    ],
  },
  {
    id: "vc-cycle-id",
    listingSlug: "city-cycle-logistics",
    kind: "identity",
    state: "approved",
    submittedAt: "2026-04-02T08:00:00Z",
    updatedAt: "2026-04-03T11:00:00Z",
    documents: [{ id: "d14", title: "CNIC + selfie" }],
    timeline: [
      ev("t1", "2026-04-02T08:00:00Z", "Submitted", "founder"),
      ev("t2", "2026-04-03T11:00:00Z", "Approved", "reviewer"),
    ],
  },
  {
    id: "vc-cycle-biz",
    listingSlug: "city-cycle-logistics",
    kind: "business",
    state: "in_review",
    submittedAt: "2026-04-02T08:20:00Z",
    updatedAt: "2026-04-10T09:00:00Z",
    assignee: "Amina R. (reviewer)",
    documents: [{ id: "d15", title: "Pharmacy partner LOIs" }],
    timeline: [
      ev("t1", "2026-04-02T08:20:00Z", "Submitted", "founder"),
      ev("t2", "2026-04-10T09:00:00Z", "In review", "reviewer"),
    ],
  },
  {
    id: "vc-solar-fin",
    listingSlug: "solar-yard-faisalabad",
    kind: "financial",
    state: "in_review",
    submittedAt: "2026-05-01T07:00:00Z",
    updatedAt: "2026-05-12T10:00:00Z",
    assignee: "Hassan K. (reviewer)",
    documents: [
      { id: "d16", title: "Audited financials FY24" },
      { id: "d17", title: "Inventory financing term sheet" },
    ],
    timeline: [
      ev("t1", "2026-05-01T07:00:00Z", "Submitted", "founder"),
      ev("t2", "2026-05-12T10:00:00Z", "In review", "reviewer"),
    ],
  },
  {
    id: "vc-freight-id",
    listingSlug: "karachi-freightlink",
    kind: "identity",
    state: "pending",
    submittedAt: "2026-06-01T12:00:00Z",
    updatedAt: "2026-06-01T12:00:00Z",
    documents: [{ id: "d18", title: "CNIC upload" }],
    timeline: [ev("t1", "2026-06-01T12:00:00Z", "Submitted", "founder")],
  },
];

export function getCasesForListing(slug: string): VerificationCase[] {
  return verificationCases.filter((c) => c.listingSlug === slug);
}

export function getQueue(opts?: {
  state?: ReviewState | "all";
  kind?: VerificationKind | "all";
}): VerificationCase[] {
  return verificationCases.filter((c) => {
    if (opts?.state && opts.state !== "all" && c.state !== opts.state) return false;
    if (opts?.kind && opts.kind !== "all" && c.kind !== opts.kind) return false;
    return true;
  });
}

export function getCase(id: string): VerificationCase | undefined {
  return verificationCases.find((c) => c.id === id);
}

/** Derive public verification flags from approved cases. */
export function derivedVerificationFlags(slug: string): {
  identity: boolean;
  businessClaim: boolean;
  humanReviewed: boolean;
  financialApproved: boolean;
} {
  const cases = getCasesForListing(slug);
  const approved = (k: VerificationKind) =>
    cases.some((c) => c.kind === k && c.state === "approved");
  const identity = approved("identity");
  const businessClaim = approved("business");
  const financialApproved = approved("financial");
  const anyDecision = cases.some((c) =>
    ["approved", "rejected", "appeal", "in_review"].includes(c.state),
  );
  return {
    identity,
    businessClaim,
    humanReviewed: anyDecision && (identity || businessClaim || financialApproved),
    financialApproved,
  };
}

export function reviewStateLabel(state: ReviewState): string {
  return REVIEW_STATES.find((s) => s.value === state)?.label ?? state;
}
