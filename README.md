# Sarmaya

Growth investment into operating Pakistani businesses and startups — built diaspora-first.

**Sarmaya** is a Tier 1 directory marketplace MVP: founders list verified growth opportunities; diaspora and domestic investors browse, check verification status, and request intros. Deals close off-platform. No fund custody.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion
- Seeded listings (no database in Plan A)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Deploy

Connected to Vercel from this GitHub repo. Push to `main` to ship.

```bash
npx vercel --prod
```

## Scope (Plan A)

- Landing, browse/filter, listing detail, public verification pages
- Auth / messaging / dashboard UI shells (demo only)
- 15 seeded listings across 8 categories

**Not in Plan A:** real auth, CNIC upload, Postgres, admin queue, JazzCash, live messaging.

## Legal framing

Directory-only. Not a SECP-licensed crowdfunding platform. Not financial or legal advice.
