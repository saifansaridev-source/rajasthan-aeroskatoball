# Rajasthan Aeroskatoball Association — Official Web Portal

**CIN:** U88900RJ2026NPL112235 | **ROC Jaipur** | **Incorporated:** March 09, 2026

A full-stack Next.js 14 + TypeScript production website for the **Rajasthan Aeroskatoball Association** — a Section 8 Not-For-Profit sports body based in Bharatpur, Rajasthan.

---

## Quick Start (Development)

```bash
# 1. Install dependencies
npm install

# 2. Initialize database and generate Prisma client
npx prisma db push

# 3. Seed database with sample data
npm run db:seed

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin Portal
- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `admin@rajasthanaeroskatoball.org`
- Password: `admin123`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS (saffron/navy/tricolor theme) |
| Database | SQLite (dev) → PostgreSQL (prod) via Prisma ORM |
| Auth | NextAuth.js v4 (RBAC: SUPER_ADMIN / ADMIN / EDITOR) |
| Payments | Razorpay (Test Mode) with abstraction helper |
| PDF Generation | jsPDF (registration receipts & certificates) |
| Deployment | Vercel + Managed Postgres |

---

## Project Structure

```
app/
  (public)/        ← Public-facing pages (SSR/ISR)
  admin/           ← Protected admin dashboard
  api/             ← All REST API routes
components/
  public/          ← Navbar, Footer, HeroSlider, EventCard, etc.
  admin/           ← AdminSidebar
lib/
  prisma.ts        ← Prisma singleton
  auth.ts          ← NextAuth configuration
  razorpay.ts      ← Razorpay order/verify helper
  pdf-generator.ts ← jsPDF receipt generator
  utils.ts         ← Shared utilities
prisma/
  schema.prisma    ← Full database schema
  seed.ts          ← Realistic sample data seeder
```

---

## Public Pages

| Page | URL | Description |
|---|---|---|
| Home | `/` | Hero slider, news, events, sponsors |
| About | `/about` | Legal profile, vision & mission |
| Office Bearers | `/office-bearers` | Leadership & district coordinator table |
| Events | `/events` | Championship calendar & results |
| Players | `/players` | State rankings & athlete directory |
| Gallery | `/gallery` | Photos + Federation TV videos |
| Downloads | `/downloads` | CBSE-style circulars + rulebooks |
| Academies | `/academies` | Affiliated academies & district units |
| Register | `/register` | Multi-type registration + Razorpay payment |
| Contact | `/contact` | Office address, WhatsApp, contact form |
| Certificate Verify | `/verify` | Instant reg number / player ID lookup |

## Admin Dashboard Modules (`/admin`)

| Module | Path |
|---|---|
| Dashboard Overview | `/admin` |
| Registrations Queue | `/admin/registrations` |
| Content Manager | `/admin/content` |
| Office Bearers CRUD | `/admin/office-bearers` |
| Events & Results | `/admin/events` |
| Players & Rankings | `/admin/players` |
| Gallery Manager | `/admin/gallery` |
| Downloads & Circulars | `/admin/downloads` |
| Academies & Districts | `/admin/academies` |
| Payments Ledger | `/admin/payments` |
| Contact Inbox | `/admin/inbox` |
| Site Settings | `/admin/settings` |

---

## Payment Flow

1. User fills registration form → POST `/api/registrations` → Registration created with status `PENDING`
2. POST `/api/payments/razorpay/order` → Razorpay order created → Checkout popup opens
3. On payment success → POST `/api/payments/razorpay/verify` → HMAC signature verified → Payment marked `SUCCESS`
4. jsPDF receipt generated and available for download
5. Admin approves in `/admin/registrations` → Player record created → Appears in public `/players` directory

---

## Environment Variables

See `.env.example` for all required keys. Key variables:
- `DATABASE_URL` — SQLite file path or PostgreSQL connection string
- `NEXTAUTH_SECRET` — Random 32+ char secret for JWT signing
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — Razorpay test key ID
- `RAZORPAY_KEY_SECRET` — Razorpay test secret

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Set `DATABASE_URL` to a PostgreSQL connection (e.g. Neon.tech)
4. Change `provider = "sqlite"` → `provider = "postgresql"` in `prisma/schema.prisma`
5. Set all env vars in Vercel project settings
6. Deploy — Prisma migrations run automatically via `npm run build`
