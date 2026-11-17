# SEO: on-page + technical (built into every design)

SEO is designed in, not bolted on: the heading outline, content, images, speed and structure are design decisions. Facts below verified November 2026; **re-check Google Search Central for changes** before advising on edge cases.

## 1. What Google says now (verified Nov 2026)
- **AI search = SEO.** Google's guide for AI Overviews / AI Mode (May 15, 2026) treats AEO/GEO as part of SEO. It says llms.txt, content "chunking", AI-specific rewriting and special schema are **not needed** for its generative AI features. Helpful, crawlable, people-first content is what counts.
- **llms.txt:** not used by Google Search. Harmless; optional for other AI tools. Never sell it as a ranking tactic.
- **FAQ rich results** stopped appearing in Google Search on **May 7, 2026** (HowTo rich results were removed in 2023). `FAQPage` markup is still valid Schema.org and can stay, but don't promise FAQ snippets.
- **Core Web Vitals** (unchanged): **LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1**, measured at the 75th percentile of real users, mobile and desktop separately.

## 2. On-page SEO checklist (every page)
- [ ] **Search intent** matches page type (informational → guide; commercial → comparison/landing; transactional → product/pricing; local → location page)
- [ ] **Title tag**: unique, primary keyword near the front, brand at the end, ~50–60 characters (pixel-limited; avoid truncation)
- [ ] **Meta description**: unique, benefit + CTA, ~140–160 characters (not a ranking factor; it's for click-through)
- [ ] **One H1** with the primary topic; logical H2/H3 outline that reads like a table of contents
- [ ] **URL**: short, lowercase, hyphenated, descriptive
- [ ] **Content**: answers the query fully, original insight/experience (E-E-A-T: experience, expertise, authoritativeness, trust), author/business info where relevant
- [ ] **Internal links**: descriptive anchor text, links to/from related pages; no orphan pages
- [ ] **Images**: descriptive file names, `alt` text by purpose, modern formats (AVIF/WebP), width/height set, lazy-load below the fold, LCP image not lazy-loaded (use priority/fetchpriority)
- [ ] **Structured data (JSON-LD)** matching visible content: `Organization`/`LocalBusiness`, `Product` + `Offer` + `AggregateRating` (real reviews only), `Article`, `BreadcrumbList`, `Event`, `Recipe`, `Course` etc. Validate with Google's Rich Results Test and the Schema.org validator
- [ ] **Open Graph + social** (`og:title`, `og:description`, `og:image` 1200×630, `twitter:card`)
- [ ] **Readable**: short paragraphs, scannable subheads, lists/tables for comparisons
- [ ] **Local SEO** (local businesses): consistent NAP (name, address, phone), Google Business Profile, location pages, embedded map, `LocalBusiness` schema

## 3. Technical SEO checklist (every site)
- [ ] **Crawlable & indexable:** important pages are 200, not blocked by `robots.txt`, no accidental `noindex`
- [ ] **robots.txt** + **XML sitemap** (submitted in Search Console)
- [ ] **Canonical tags** on every indexable page; handle parameters, pagination and duplicates
- [ ] **HTTPS** everywhere; one preferred host; 301 redirects for moved URLs (map old → new in redesigns)
- [ ] **Rendering:** primary content in server-rendered HTML (SSR/SSG); don't rely on client-only JS for critical content and links
- [ ] **Mobile-first:** same content and structured data on mobile as desktop; responsive; no intrusive interstitials
- [ ] **Core Web Vitals:** pass at p75 (targets above)
- [ ] **Status codes:** custom 404 with navigation; no soft-404s; minimal redirect chains
- [ ] **hreflang** for multilingual/multi-region sites (with self-references and return links)
- [ ] **Semantic HTML & accessibility** (helps both users and crawlers): landmarks, heading order, link text
- [ ] **Search Console + analytics** set up; monitor coverage, CWV and queries

## 4. Performance for CWV (design decisions that matter)
| Metric | Common design causes | Fixes |
|---|---|---|
| **LCP** | Huge hero images/video, web fonts blocking text, client-rendered hero | Optimized hero image with `priority`/`fetchpriority="high"`, preload, `next/font`, SSR the hero |
| **INP** | Heavy JS on interaction, big animation libraries, third-party scripts | Ship less JS, defer non-critical scripts, CSS animations where possible, break up long tasks |
| **CLS** | Images without dimensions, late banners/cookie bars, font swaps, injected embeds | Set width/height/aspect-ratio, reserve space, `size-adjust` fonts (next/font does this), no content pushed down after load |

## 5. Stack notes
- **Next.js (App Router):** `metadata` / `generateMetadata`, `app/sitemap.ts`, `app/robots.ts`, `opengraph-image`, `next/image`, `next/font`; render content on the server. Details: `stacks/nextjs.md`.
- **WordPress:** an SEO plugin (Yoast / Rank Math / SEOPress) or core settings; block theme heading levels; permalinks `/%postname%/`; image sizes; caching. Details: `stacks/wordpress.md`.
- **Shopify:** theme-level title/meta (Liquid `page_title`, `page_description`), product schema in the theme, canonical handling for collection-product URLs, image `alt`, app bloat vs speed. Details: `stacks/shopify.md`.

## 6. Deep audits
If the user's **seo-codebase-auditor** plugin (or another SEO audit tool) is installed, run it for a full technical pass and merge its findings into the design audit.
