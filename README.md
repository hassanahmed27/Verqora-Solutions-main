# Verqora Landing Page (Next.js + TypeScript + Tailwind)

A full landing page implementation for Verqora digital solutions with modern SaaS-style UI, including:

- Hero, Services, Why Choose Us, Portfolio, Team, Testimonials, Contact pages
- Sticky responsive Navbar + Footer
- Contact form + SendGrid integration
- Prisma SQLite database for contact leads
- Open Graph / SEO metadata + GA analytics embed
- Dark theme + animated background and framer-motion cards

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- SendGrid mail API
- Framer Motion
- Heroicons / Lucide icons

## Setup

1. Clone:

```bash
git clone <your-repo-url>
cd verqora-solutions
```

2. Install dependencies:

```bash
npm install
```

3. Add env (.env):

```ini
DATABASE_URL="file:./dev.db"
SENDGRID_API_KEY="your_sendgrid_api_key"
SENDGRID_FROM_EMAIL="no-reply@verqora.com"
CONTACT_RECEIVER_EMAIL="contact@verqora.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

4. Generate Prisma client and migrate:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start dev server:

```bash
npm run dev
```

6. Open: `http://localhost:3000`

## Contact form flow

- Submits to `/api/contact`
- Saves lead to Prisma `ContactLead`
- Sends SendGrid email from config values

## Quality checks

- ESLint: `npm run lint`
- Prisma type sync: `npx prisma generate`

## Notes

- Keep `.env` secret; add `.env` to `.gitignore`
- On production, use platform env vars (Vercel/AWS/Azure)
- Update `SENDGRID_*` values when ready for real email

## Recent updates

- Portfolio now showcases 6 featured projects with full case study routes:
  - `focusly-ai-agent`
  - `crm-erp-platform`
  - `memrise-clone`
  - `closette-social-platform`
  - `formify-builder`
  - `nutri-ai-assistant`

- Each case study includes image, live link, GitHub link, tech stack, results, and lightbox-style screenshot interaction.

- Testimonials page is updated with 3 Verqora Solutions client testimonials (e-commerce, fintech, SaaS).
