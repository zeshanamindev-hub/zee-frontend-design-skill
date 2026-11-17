# Niche design profiles: designing for the business, not a template

How to use: find the niche → read the **conventions** (what visitors expect, U3) → pick a **colour scheme option** with the procedure in `color-system.md` §7 → pick hero/section layouts from `../mediums/web-ui/layout-library.md` → pick a hi-fi visual from `hifi-visuals.md` → then apply the **category-breaking move** so the site doesn't look like every competitor.
Palette notes are **starting directions** with the rule that justifies them. Always build the real scale with `scripts/palette.py`, check pairs with `scripts/contrast.py`, and prefer the client's real brand colours (`scripts/extract-colors.py`). Colour-psychology notes are conventions, not evidence (C3). Named combos refer to Figma's "100 color combinations" library [Source: figma.com/resource-library/color-combinations].

Format: **Expect** (conventions) · **Colour options** (rule) · **Type** · **Hero / key layouts** · **Hi-fi** · **Motion & video** · **Break the category** · **Avoid**

### 1. SaaS / software
- **Expect:** product screenshot, clear pricing, logos, free-trial CTA, docs link.
- **Colour:** (a) near-white + ink + one saturated accent (C1, C4 complement of the neutral's tint), (b) dark cinematic + electric accent (C10 cool base, warm accent), (c) brand mono + one data hue for charts (C8).
- **Type:** neutral grotesk (Inter/Geist/Manrope) + an expressive display for headlines only.
- **Layouts:** H-02 or H-04 → P-04 → N-01 → F-01/F-02 → P-02 → C-01 → C-05 → C-03.
- **Hi-fi:** V1 product theatre with real data; V8 rendered UI video (`render-video.mjs`).
- **Motion/video:** 20–45 s product walkthrough with cursor + captions; UI micro-loops in features.
- **Break it:** show the *output* the customer gets (the report, the shipped design), not the dashboard; or a live interactive demo in the hero.
- **Avoid:** purple→blue gradient, 3 icon cards, fake "Trusted by" logos, glowing blobs.

### 2. E-commerce (fashion, beauty, electronics, home)
- **Expect:** search, categories, product grid, price, reviews, free shipping/returns info, cart top-right.
- **Colour:** (a) neutral 60 (warm off-white) + photography as colour + brand accent for "Add to cart" (C1), (b) monochrome luxury (C8, "ink wash" / "quiet luxury" combos), (c) playful brights for youth brands (C6 triadic, accent ≤ 10%).
- **Type:** editorial serif or sharp grotesk for display; highly legible sans for PDP specs.
- **Layouts:** H-01/H-06 → category tiles (image-led, not icon cards) → bestsellers (the card grid) → N-06 brand statement → P-05 reviews → UGC strip → C-07.
- **Hi-fi:** V2 art-directed product + lifestyle photography; V7 360° product view; V8 cinemagraph.
- **Motion/video:** 6–15 s product loops (9:16 for social, 4:5 for feed); hover image swap.
- **Break it:** shop-the-look editorial layouts; a material/texture zoom; honest sizing tool.
- **Avoid:** auto-rotating hero carousels (U27), fake scarcity timers (U18, U30), pop-ups on arrival.

### 3. Local services (plumber, electrician, cleaning, salon, auto repair)
- **Expect:** phone number top-right (tap to call), service area, prices or "from" prices, reviews, booking.
- **Colour:** (a) trustworthy blue/navy base + safety orange or yellow accent (C4 complementary), (b) clean white + brand van/uniform colour (B1 real brand), (c) for salons: warm neutrals + one fashion accent (C5 analogous).
- **Type:** sturdy sans (Figtree/Public Sans), large numbers for phone and price.
- **Layouts:** H-02 (real team/van photo) with call + book CTAs → P-04 (years, jobs, rating with source) → services list (F-07) → P-06 map/service area → P-05 reviews → C-06 booking → C-05.
- **Hi-fi:** V2 real job photos, V5 before/after (N-05), V10 service-area map.
- **Motion/video:** 30 s "meet the team" vertical video; before/after reveal.
- **Break it:** transparent price calculator (C-02); "what happens when you call" timeline.
- **Avoid:** stock handshake photos, generic clip-art tools, hidden phone number.

### 4. Agency / studio / consultancy
- **Expect:** work first, clients, services, team, contact.
- **Colour:** (a) monochrome + one signature colour (C8 + accent), (b) bold brand colour as 60% surface (inverted 60/30/10), (c) per-case-study colour theming.
- **Type:** expressive display (variable font), editorial pairing.
- **Layouts:** H-03 giant type or H-06 collage → N-03 horizontal work strip → P-03 case studies (card grid) → N-06 manifesto → team (portrait grid, not cards) → C-04.
- **Hi-fi:** V6 type poster, V3 collage, V8 showreel loop.
- **Motion/video:** 30–60 s showreel; cursor-following previews (with keyboard alternative).
- **Break it:** process shown as an artefact (sketches, real files), not 4 numbered icons.
- **Avoid:** "We are a creative agency" headline, every image in a rounded card.

### 5. Restaurant / café / bakery
- **Expect:** menu, hours, location, booking/order, photos of food and space.
- **Colour:** appetite warmth (C10 warm): (a) "chili spice"/"spiced mocha"-type warm palettes, (b) brand colour from signage/packaging (extract-colors), (c) dark moody for fine dining.
- **Type:** characterful display (from the signage), readable menu type (prices aligned, tabular figures).
- **Layouts:** H-01 full-bleed food/space video → hours + location strip → menu (N-07 narrow, real menu as HTML text) → H-06-style collage of dishes → P-05 reviews → C-06 booking → P-06 map.
- **Hi-fi:** V2 food photography, V8 cinemagraph (steam, pour), V11 paper/menu texture.
- **Motion/video:** 10–20 s vertical clips of signature dishes; cinemagraph hero.
- **Break it:** a menu that feels like their printed menu; chef's story as chaptered long-form.
- **Avoid:** PDF-only menus (not accessible, bad SEO), stock food photos.

### 6. Real estate (agency, developer, listings)
- **Expect:** search, listings with price/beds/area, map, agent contact, mortgage calculator.
- **Colour:** (a) "harbor haze"/"stone path"-type calm neutrals + brand accent (C5), (b) luxury dark + gold-on-dark only (contrast-checked), (c) developer project: palette from the architecture's materials.
- **Type:** refined serif or wide grotesk display + clean sans.
- **Layouts:** H-07 search-first or H-01 full-bleed property film → listings (card grid) → P-06 map → V5 area data → C-02 mortgage calculator → agent profiles.
- **Hi-fi:** V2 architectural photography, V7 3D/virtual tour, V10 map, V8 drone loop.
- **Break it:** neighbourhood stories (schools, commute times) as data-viz.
- **Avoid:** cluttered filter bars, low-res listing photos.

### 7. Education (school, college, institute, courses, LMS)
- **Expect:** programmes, admissions, fees, outcomes, faculty, campus, apply CTA.
- **Colour:** (a) institutional navy/green + warm accent (C4), (b) youthful triadic for K-12 (C6, accent restraint), (c) mono + one bright for online courses.
- **Type:** humanist sans (Source Sans 3, Lexend for young readers); multilingual support (Noto/RTL where needed).
- **Layouts:** H-01 real students/campus → programme finder (F-04) → outcomes P-04 (sourced) → N-04 timeline (admissions steps) → faculty → P-02 alumni quote → C-04 enquiry.
- **Hi-fi:** V2 real campus photography, V5 outcome data, V8 campus film.
- **Break it:** a "day in the life" scroll story; course preview playable in-page.
- **Avoid:** stock graduation caps, unverifiable rankings.

### 8. Healthcare (clinic, dentist, hospital, therapist)
- **Expect:** services, doctors with credentials, booking, insurance, location, emergency info.
- **Colour:** calm & clean (C5 analogous blues/greens/teals, or warm neutrals for therapy); high contrast mandatory (A3); never alarming reds outside alerts.
- **Type:** highly legible sans (Atkinson Hyperlegible Next, Public Sans), large body (18px).
- **Layouts:** H-02 real clinicians → services (F-07) → doctor profiles → N-04 "your visit" steps → P-05 reviews → C-06 booking → C-05 insurance FAQ.
- **Hi-fi:** V2 real staff/space photography, V4 calm explanatory illustration.
- **Break it:** plain-language "what to expect" guides with illustrations.
- **Avoid:** stock smiling-doctor photos, medical claims without sources (E-E-A-T, YMYL).

### 9. Law / accounting / financial advisory
- **Expect:** practice areas, credentials, people, case results (where allowed), contact.
- **Colour:** (a) mono + deep ink + one restrained accent (C8), (b) navy/forest + paper + brass (C5), (c) "harbor haze"/"quite clear" professional neutrals.
- **Type:** serif display (authority) + sans text; tabular figures.
- **Layouts:** H-03 statement or H-09 → practice areas (F-07 list) → N-06 principle statement → people (portrait grid) → P-02 client quote → insights (articles) → C-04.
- **Hi-fi:** V6 typographic poster, V2 portrait photography with one consistent treatment, V11 paper texture.
- **Break it:** an interactive "do I have a case / what will it cost" guide (C-02).
- **Avoid:** gavels, scales, handshake stock; check jurisdiction rules on advertising claims.

### 10. Fintech / banking / insurance
- **Expect:** security, rates/fees, app screenshots, regulator info, support.
- **Colour:** (a) "cobalt sky"/navy trust + vibrant accent for action (C4), (b) dark mode + neon accent for crypto/youth (contrast-checked), (c) green growth palette for savings/investing.
- **Type:** precise grotesk + tabular numerals; mono for figures optional.
- **Layouts:** H-08 data hero or H-04 app theatre → P-04 sourced numbers → C-02 calculator → N-01 how it works → security/regulation band → C-01 → C-05.
- **Hi-fi:** V5 live/illustrative data-viz (clearly labelled), V1 app theatre.
- **Break it:** a calculator that shows real outcomes with assumptions visible.
- **Avoid:** fake returns, "guaranteed" claims, unlabelled example data.

### 11. Nonprofit / NGO / charity
- **Expect:** mission, impact, stories, donate, transparency (reports).
- **Colour:** brand colour as hope/energy accent + warm neutrals; avoid poverty-cliché sepia.
- **Type:** warm humanist sans + a characterful display.
- **Layouts:** H-01 real story image/video → N-06 mission → V5 impact data → N-07 story chapters → P-02 beneficiary quote (with consent) → C-03 donate band → reports.
- **Hi-fi:** V8 documentary loop, V5 impact data.
- **Break it:** show where one donation goes, step by step.
- **Avoid:** guilt-heavy imagery, unverifiable impact numbers.

### 12. Portfolio / personal brand / creator / coach
- **Expect:** who you are, work/proof, offer, booking/contact.
- **Colour:** personal signature colour as 30–60% surface (inverted roles) or mono + one accent.
- **Type:** expressive display that reflects personality; one text face.
- **Layouts:** H-03 or H-06 → N-03 work strip → P-02 testimonials → offer (C-01 or C-04) → content/newsletter.
- **Hi-fi:** V6 type poster, V3 collage of real work, V8 intro video.
- **Break it:** an "about" told as a timeline of artefacts.
- **Avoid:** generic headshot + "I help X do Y" with no proof.

### 13. Event / conference / launch
- **Expect:** date, place, speakers, agenda, tickets, countdown (honest).
- **Colour:** event identity palette, often vibrant (C6/C7) with dark base.
- **Layouts:** H-03 giant date/type or H-01 venue film → speakers grid (allowed card grid) → agenda (tabs per day) → venue map → C-01 tickets → sponsors marquee.
- **Hi-fi:** V6 kinetic type, V8 highlight reel.
- **Avoid:** fake "only 3 tickets left".

### 14. Hotel / travel / tourism
- **Expect:** immersive imagery, rooms, rates/availability, location, reviews, booking.
- **Colour:** derived from the place (sea, desert, forest; "desert mirage", "coastal morning", "old photograph" combos) + one booking accent (C5 analogous + C4 accent).
- **Layouts:** H-01 full-bleed film → booking bar → rooms (image-led) → N-07 place story → P-06 map → P-05 reviews → C-06.
- **Hi-fi:** V8 cinemagraph/drone loop, V2 photography, V10 map.
- **Break it:** itinerary-style storytelling ("Your first 24 hours").
- **Avoid:** slow autoplay video without poster; booking widget hidden below the fold.

### 15. B2B industrial / manufacturing / logistics
- **Expect:** capabilities, certifications, specs, industries served, RFQ.
- **Colour:** (a) "urban loft" concrete/steel + safety accent (C10), (b) navy + high-vis orange (C4), (c) brand colour from machinery/livery.
- **Type:** condensed/technical grotesk display + plain sans; mono for specs.
- **Layouts:** H-01 real facility footage → P-04 capacity numbers → F-03 annotated machine/product → F-06 spec sheet → industries (F-04) → certifications strip → C-04 RFQ.
- **Hi-fi:** V2 real facility photography, V7 3D part viewer, V10 logistics map.
- **Break it:** a live/illustrated process flow (raw material → shipped part).
- **Avoid:** stock "engineer with tablet", unexplained jargon.

### 16. Mobile app landing page
- **Expect:** app screens, store badges, key benefits, ratings.
- **Colour:** the app's own UI palette (B1), one accent.
- **Layouts:** H-04 device theatre (real screens) → N-01 sticky phone + scrolling features → P-05 store reviews (sourced) → C-03 download band (QR on desktop).
- **Hi-fi:** V1 app theatre, V8 screen-recorded/rendered app video (9:16).
- **Avoid:** fake device frames with Lorem screens, outdated phone mockups.

### 17. Blog / media / publication
- **Expect:** latest/featured stories, categories, search, newsletter, author info.
- **Colour:** mostly neutral reading surfaces + section colour codes (C11-like category system).
- **Type:** the most important niche for type: serif or humanist text at 18–20px, 65ch measure.
- **Layouts:** editorial grid (lead story + secondary) → topic rows → N-07 long-form articles → newsletter C-03.
- **Hi-fi:** commissioned illustration (V4), data stories (V5).
- **Avoid:** infinite ads that mimic content (U27), pop-ups before reading.

### 18. Marketplace / directory / platform
- **Expect:** search, categories, listings with filters, trust (verification, reviews), two-sided CTAs.
- **Colour:** neutral UI + one brand accent; category colours only if they encode meaning.
- **Layouts:** H-07 search-first → categories (image-led) → featured listings (card grid) → how it works for each side (F-04 switcher) → P-05 reviews → C-03 dual CTA.
- **Hi-fi:** V10 map search, V1 platform theatre.
- **Avoid:** empty-state pages with no seed content; fake listing counts.

### Dashboards & mobile apps
These are product UI, not marketing: see `../mediums/dashboard/dashboard.md` and `../mediums/mobile-app/mobile-app.md`. Brand expression there is restrained (tokens, accent, illustration in empty states); usability rules (H, I, D) dominate.
