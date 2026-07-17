# Loxygen Academy — Project Instructions for Claude Code

## What this project is
A Next.js website for **Loxygen Academy** (loxygen.world) — a logistics learning platform offering e-learning courses, micro-learning modules, webinars, and immersive training programmes for freight forwarders and logistics professionals.

The goal is a full rebuild of the current GoDaddy site. The new site must:
- Look modern and professional (maritime/logistics feel, white and navy)
- Be fully SEO-friendly and crawlable by AI engines (the old site was not)
- Handle user authentication (login gate for e-learning content)
- Handle payments via Stripe with automatic course access provisioning
- Auto-provision Jollydeck accounts after micro-learning subscription purchase
- Allow Geert (the owner) to add new courses/webinars himself via a CMS — no code needed

---

## Tech stack
- **Framework**: Next.js 15 (Pages Router, JavaScript — no TypeScript)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth v5 (credentials provider)
- **Database + storage**: Supabase (PostgreSQL)
- **Payments**: Stripe (Checkout + webhooks)
- **Email**: Resend
- **Micro-learning platform**: JollyDeck (external — we integrate via API after payment)
- **Deployment**: GoDaddy

---

## Brand colours (Tailwind config)
- `brand-navy`: `#023560` — primary background, navbar, footer, CTAs, headings, body text.
- White (`#FFFFFF`) — all section backgrounds. No light-grey/off-white section backgrounds — tried (`brand-light` / `#F4F6F9`) and rejected, reads as flat/grey rather than clean. Contrast between stacked sections comes from navy vs. white, not from a grey tint.
- `brand-light` (`#F4F6F9`) still exists as a Tailwind token for small internal component states only (e.g. a disabled/"coming soon" card fill) — never as a `<section>` background.
- `brand-accent`: `#FF6E03` — a warm orange used **only** for the emphasized clause inside page H1s (e.g. "The Academy — <span class="text-brand-accent">logistics and freight forwarding courses.</span>"). This replaced an earlier navy-at-40%-opacity treatment that read as a washed-out grey-blue. Do not use it for buttons, backgrounds, icons, or any other element — it's a single, deliberately narrow exception to the navy/white system, not a general-purpose third colour.

Contrast/emphasis elsewhere still comes from inverting navy/white between sections (e.g. a white button on a navy background, a navy button on a white background), not from a third colour.

---

## Folder structure to scaffold

```
loxygen/
│
├── CLAUDE.md                          ← this file
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts                      ← guards /e-learning and /account
├── .env.local.example
│
├── pages/
│   ├── _app.jsx                       ← wraps every page with Navbar + Footer
│   ├── _document.jsx                  ← custom HTML shell (fonts, meta)
│   ├── index.jsx                      ← homepage: Hero, FeaturedCourses, BlogPreview, Testimonials, NewsletterBanner
│   │
│   ├── about-us.jsx                   ← company profile, networks (CrossTrades, CBLO), team
│   │
│   ├── the-academy.jsx                ← academy hub: grid of cards linking to all sub-pages
│   ├── e-learning.jsx                 ← LOGIN GATED: lists purchasable courses
│   ├── micro-learnings.jsx            ← subscription page (€190/yr) → Stripe → Jolidec
│   ├── breakbulk-training.jsx         ← webinar listings for breakbulk/project cargo
│   ├── bess-logistics-training.jsx    ← battery energy storage logistics course
│   ├── young-forwarders-benelux.jsx   ← European Ports Immersion Week programme
│   ├── africa-roadtrip-2026.jsx       ← Africa corridors immersive programme
│   ├── sustainable-forwarding.jsx     ← Sustainability Award 2026 + ESG content
│   ├── login.jsx                      ← sign in form (NextAuth credentials)
│   ├── account.jsx                    ← LOGIN GATED: user profile + purchased courses
│   ├── contact.jsx
│   ├── investors.jsx
│   ├── share-your-expertise.jsx
│   ├── help.jsx                       ← FAQ: how to create account, place order, etc.
│   ├── terms-and-conditions.jsx
│   ├── dpa.jsx                        ← Data Processing Agreement
│   │
│   ├── blog/
│   │   ├── index.jsx                  ← blog listing with category filter
│   │   └── [slug].jsx                 ← individual article (SSG via getStaticPaths for SEO)
│   │
│   └── api/
│       ├── auth/[...nextauth].js      ← NextAuth handler
│       ├── stripe/webhook.js          ← on payment: grant course access + provision Jolidec
│       ├── stripe/checkout.js         ← create Stripe Checkout session
│       ├── contact.js                 ← sends email via Resend
│       └── newsletter.js              ← subscribe email to mailing list
│
├── components/
│   ├── Navbar.jsx                     ← sticky, dark navy; "The Academy" dropdown; Sign in button
│   ├── Footer.jsx                     ← 3-column links + email
│   ├── ContactForm.jsx                ← reusable form used on /contact and /share-your-expertise
│   ├── Hero.jsx                       ← full-width dark navy hero, two CTA buttons
│   ├── FeaturedCourses.jsx            ← fetches featured courses from lib/courses
│   ├── BlogPreview.jsx                ← shows 3 latest posts on homepage
│   ├── Testimonials.jsx               ← 2 static quotes from network members
│   ├── NewsletterBanner.jsx           ← email subscribe form
│   ├── CourseCard.jsx                 ← card for an e-learning or webinar
│   ├── WebinarCard.jsx                ← card with date/time for scheduled webinars
│   ├── BlogCard.jsx                   ← post card with category badge
│   └── CategoryFilter.jsx             ← filter tabs: AI · Breakbulk · Learning · Omnibus · Strategy · Sustainable logistics · Technology
│
├── lib/
│   ├── supabase.js                    ← Supabase client
│   ├── stripe.js                      ← Stripe client
│   ├── auth.js                        ← NextAuth authOptions
│   ├── courses.js                     ← getCourses(), getCourseBySlug()
│   ├── blog.js                        ← getBlogPosts(), getBlogPostBySlug()
│   ├── jollyDeck.js                     ← provisionJollyDeckAccess(email)
│   └── utils.js                       ← formatPrice, formatDate, cn, etc.
│
├── styles/
│   └── globals.css
│
└── public/
    └── images/                        ← logos, hero images, course cover photos
```

---

## Key behaviours to implement

### Auth / middleware
`middleware.js` protects `/e-learning` and `/account`. Any unauthenticated request is redirected to `/login?callbackUrl=<original path>`. After login, the user is sent back.

### Stripe → Jolidec automation
When `api/stripe/webhook` receives a `checkout.session.completed` event:
1. Look up the purchased product in Supabase
2. Grant the user access (update `purchased_course_ids` in DB)
3. If product is `micro-learnings`, call `lib/jollyDeck.js → provisionJollyDeckAccess(email)` to create their JollyDeck account automatically
4. Send a confirmation email via Resend

### Blog SEO
Blog posts must be statically generated at build time using `getStaticPaths` + `getStaticProps` so they are fully crawlable by AI search engines — this was a major failure of the old GoDaddy site.

### CMS for Geert
Geert needs to be able to add new courses and webinars without touching code. Connect Supabase as the CMS: a simple Supabase table with columns `(id, slug, title, description, type, price, stripe_price_id, is_active, available_at)`. Geert edits rows in the Supabase dashboard.

### Blog categories
Filter on `/blog` uses the query param `?blogcategory=`. Categories: `AI`, `Breakbulk`, `Learning`, `Omnibus`, `Strategy`, `Sustainable logistics`, `Technology`.

---

## Existing pages to replicate (from loxygen.world)
These pages exist on the current site and must all have equivalents:
- `/` (homepage)
- `/about-us`
- `/the-academy`
- `/bess-logistics-training`
- `/e-learning` (login-gated)
- `/young-forwarders-benelux`
- `/africa-roadtrip-2026`
- `/micro-learnings`
- `/breakbulk-training`
- `/sustainable-forwarding`
- `/blog` + individual articles under `/blog/[slug]`
- `/investors`
- `/share-your-expertise`
- `/contact`
- `/help`
- `/terms-and-conditions`
- `/dpa`
- `/login`
- `/account`

---

## Design

The design is inspired by four reference sites studied in detail: **flyte.network**, **EcoVolt**, **Cloud.lab**, **Nura**, and **ProjektSEO**. The common thread across all of them: clean, modern, confident, and spacious. Not corporate. Adapted to Loxygen's navy + white brand.

### Reference site breakdown

**flyte.network** — Bold, large typography with dramatic mid-phrase line breaks. Large numbered section markers (01, 02, 03, 04) displayed huge and lightly styled. Short punchy copy — never more than 2 sentences per block. Strong CTAs throughout. Arrow elements (→) used as visual connectors.

**EcoVolt** — Full-bleed hero with a large real photograph underneath the headline. Huge stat numbers used as visual anchors (e.g. 450K, 73%). Dark section for testimonials with a photo + quote card. A horizontal strip of partner/media logos. Light background throughout with one or two dark contrast sections.

**Cloud.lab** — Scattered/slightly tilted card layout for blog posts — feels editorial and dynamic, not grid-locked. Clean category list with post counts next to each. Very airy and minimal navbar. Black and white with small colour accents only.

**Nura** — Dark full-bleed hero image inside a rounded container (not edge-to-edge). Small pill-shaped labels above section headings (e.g. "Principles", "Our Team"). Accent-coloured words embedded inside headings for emphasis. Icon + title + short description card grid for features/values. Team photo section with rounded image crops.

**ProjektSEO** — Extreme white space. Small pill tags above every section. Accordion-style expandable service list. Large pull quote format for testimonials. Dark rounded footer (rounded top corners, not a hard rectangle). Mixed layout — some sections text-heavy left with image right, others full width.

### Overall feel
- **White backgrounds dominate** — every section background is plain white, no light-grey tint. Dark navy is used only for the hero, footer, testimonial section, and standalone CTA banners.
- High contrast. Nothing feels grey or flat.
- Lots of breathing room — generous padding everywhere. Nothing cramped.
- Confident and direct — the site should feel like it knows what it's doing.
- Modern and editorial, not like a generic SaaS product page.

### Typography
- Font: **Inter**
- Headlines are **big and bold** — 48px–72px on desktop. They break mid-phrase for dramatic effect, e.g.:
  ```
  Logistics knowledge,
  built for the future.
  ```
- Use **accent-coloured words** (navy or light grey) inside some headings for emphasis — inspired by Nura
- Short punchy copy only — max 2 sentences per body text block
- No eyebrow labels above section headings (no small all-caps tag like `THE ACADEMY` sitting over the `<h2>`) — tried early on, but reads as generic AI-template output regardless of styling. Headings stand alone. Numbered section markers (01/02/03) are avoided for the same reason.

### Layout patterns to use
1. **Hero** — full-width dark navy (`#023560`), big headline in white, 2 CTA buttons, real logistics/port photo below or behind
2. **Stat anchors** — large numbers (e.g. 40+ modules, 400 companies) displayed huge as visual focal points, inspired by EcoVolt
3. **Feature sections** — white or light (`#F4F6F9`) background, one big heading + 1–2 sentences + optional CTA. Alternate layout direction (text left/image right, then flip)
4. **Numbered process steps** — 01 / 02 / 03 / 04 with short descriptions, inspired by flyte.network
5. **Card grids** — 3-column grid for courses and blog posts. For blog, use a slightly staggered/editorial layout inspired by Cloud.lab
6. **Category list** — blog categories listed cleanly with post counts, inspired by Cloud.lab
7. **Testimonial section** — dark navy (`#023560`) background, large pull quote in white, photo of the person, inspired by EcoVolt and ProjektSEO
8. **Logo strip** — horizontal row of network partner logos (CrossTrades, CBLO, etc.), inspired by EcoVolt
9. **Full-width CTA banner** — dark navy (`#023560`) background, one headline in white, one button, centered. Rounded top corners if placed mid-page, inspired by ProjektSEO

### Components style
- **Buttons**: `rounded-lg`. On navy backgrounds: primary = white bg + navy text, secondary = white border + white text. On light backgrounds: primary = navy bg + white text, secondary = navy border + navy text
- **Cards**: white background, 1px light border, `rounded-xl`, slight shadow on hover. Navy left border or top accent on hover state
- **Tags/categories** (blog category, course formats, etc.): plain text, separated by `·` or spacing — not rounded-full badges
- **Navbar**: sticky, dark navy (`#023560`), logo left, links centre/right, "Sign in" as white pill button
- **Footer**: dark navy (`#023560`), 3-column links, rounded top corners, white brand name, white email link
- **Section dividers**: generous padding (`py-24`) — no horizontal rules or lines
- **Icons**: Lucide icons or simple SVGs. No emoji.
- **Arrows**: styled `→` elements as visual connectors between sections or inside cards

### What to avoid
- No gradients
- No full-page dark backgrounds — navy is for hero, footer, and CTA banners only
- No stock-photo-style imagery — use real photos of ports, logistics, people working
- No rounded corners bigger than `rounded-xl`
- No walls of text
- No eyebrow labels above section headings, pill-shaped or plain — reads as generic AI-template output. Headings stand alone.
- No pill/badge-shaped tags elsewhere either (rounded-full + border) — use plain uppercase text instead
- No numbered section markers (01/02/03) as decorative anchors — same reason
- Don't make it look like a generic SaaS website

---

## Homepage section notes

### Hero
Full-bleed background image (port/logistics photo) with the headline, subtext and CTA buttons overlaid on top — like flyte.network and the EcoVolt/Nura reference images. Dark navy overlay on the image to keep text readable. Big bold headline, short subtext, 2 CTA buttons.

### The Academy section
Use a **radial/circular slider** to showcase what's included in the academy (e-learning, micro-learnings, webinars, immersive programmes, etc.). Interactive — user can spin or click through the items.

### The 5 Pillars section
Look at **osmo.supply** for design inspiration — references have been saved there. Style the 5 pillars section based on what's found on that site.

---

## Notes
- Top nav is intentionally lean: **Start / The Academy (dropdown) / About us / Blog / Sign in**
- All pages English except contact form which can be bilingual (EN + NL)
- The site will be hosted at `loxygen.world`; there is also `loxygen.ai` which may be used for the future AI platform (out of scope for now)
- Do not break the current live site — build entirely fresh, go live with a DNS swap at the end
