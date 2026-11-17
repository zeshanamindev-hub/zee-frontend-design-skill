# Website layouts by business type

> v0.4: this file says **which sections** a business needs. **How** to lay each out (layout IDs, widths, hi-fi visuals, the anti-box contract) is in `layout-library.md` and `hifi-visuals.md`; niche colour/type/video choices are in `../../foundations/niche-design-profiles.md`.

Blueprints to **start** a page plan. Always adapt them with research (competitors, objections, keywords); never ship a blueprint unchanged. Section names map to patterns in `composition-patterns.md`; CRO levers come from `foundations/cro.md`; schema types from `foundations/seo.md`. [Expert]

**How to read each entry:** Goal → Sitemap → Homepage section order → Key page notes → Trust must-haves → Suggested art directions → Schema.

---

## 1. SaaS / software product
- **Goal:** trial or demo. **Sitemap:** Home · Product/Features · Solutions (by role/industry) · Pricing · Customers · Integrations · Resources/Blog · Docs · About · Contact/Demo · Login
- **Home:** Hero (value prop + real product UI + CTA + micro-proof) → logo strip (real) → problem/outcome → product tour (tabbed demo or annotated screenshots) → how it works (3 steps) → key benefits by role → integrations → proof (case study with numbers) → security/compliance → pricing teaser → FAQ → final CTA
- **Pricing page:** plan cards (recommended emphasized by layout) → comparison table → billing FAQ → guarantee/trial terms → enterprise contact
- **Trust:** customer logos, G2/Capterra ratings, SOC 2/GDPR badges (only if real), uptime/status link
- **Directions:** D4 Calm Product · D10 Tech Blueprint · D5 Dark Cinematic (launches) · D6 Bento
- **Schema:** `Organization`, `SoftwareApplication`, `Product` + `Offer` (pricing)

## 2. E-commerce store (fashion, beauty, electronics, home)
- **Goal:** add to cart → checkout. **Sitemap:** Home · Collections · Product · Cart · Checkout · Search · About/Story · Shipping & Returns · Size guide · Contact · Account · Blog/Lookbook
- **Home:** announcement bar (real offer) → hero (campaign image + one CTA) → shop by category → bestsellers → USP strip (shipping, returns, payment) → brand story → UGC/reviews with photos → new arrivals → newsletter (real incentive) → footer with policies
- **Product page:** gallery (zoom, video) + title, price, rating, variants (swatches), size guide, stock/delivery estimate, sticky add-to-cart (mobile), express pay → benefits → details/specs accordion → reviews with photos/filters → cross-sell → FAQ
- **Collection page:** filters (sticky on desktop, drawer on mobile), sort, product cards with second-image hover, quick add, pagination/load-more
- **Trust:** reviews, returns policy near the price, secure payment icons at checkout, real stock counts only
- **Directions:** D2 Editorial Luxury (fashion/beauty) · D3 Kinetic Sport · D8 Warm Organic · D6 Bento (electronics)
- **Schema:** `Product`, `Offer`, `AggregateRating`/`Review` (real), `BreadcrumbList`, `Organization`

## 3. Local service business (plumber, electrician, cleaning, salon, auto repair)
- **Goal:** call or booking. **Sitemap:** Home · Services (one page per service) · Service areas (one page per city/area) · Pricing · Reviews · About · Contact/Book
- **Home:** hero (service + area + click-to-call + book button + rating) → services grid with prices "from" → why us (response time, licensed, guarantee) → before/after gallery → reviews (Google) → service area map → process → FAQ → final CTA with phone
- **Mobile:** sticky bottom bar: Call · Book · WhatsApp (where common)
- **Trust:** Google rating + count, licenses/insurance, real team photos, guarantees
- **Directions:** D8 Warm Organic · D4 Calm Product (modern clean) · D7 Neo-Brutal Pop (youthful brands)
- **Schema:** `LocalBusiness` (specific subtype), `Service`, `AggregateRating`, `OpeningHoursSpecification`

## 4. Agency / studio / consultancy
- **Goal:** qualified inquiry. **Sitemap:** Home · Work (case studies) · Services · About/Team · Process · Insights · Contact
- **Home:** hero (positioning statement, giant type or showreel) → selected work (large, varied case-study cards) → services → results with numbers → client logos → process → team/culture → testimonial → CTA "Start a project" with qualifying form
- **Case study page:** challenge → approach → solution visuals → results (numbers) → testimonial → next project
- **Trust:** real outcomes, awards (real), recognizable clients
- **Directions:** D9 Monochrome Type-Only · D1 Swiss Precision · D5 Dark Cinematic
- **Schema:** `Organization`, `ProfessionalService`, `CreativeWork` for case studies

## 5. Restaurant / café / bakery
- **Goal:** reservation, order or visit. **Sitemap:** Home · Menu (HTML) · Reserve/Order · Locations & hours · About/Story · Events/Private dining · Gallery · Contact
- **Home:** hero (food photography + Reserve + Order) → hours & location strip → signature dishes → menu preview → story/chef → reviews → gallery → private events → map + contact
- **Rules:** menu as HTML text (searchable, accessible), not a PDF; prices visible; mobile-first (most visits are on phones)
- **Directions:** D8 Warm Organic · D11 Retro Revival · D2 Editorial Luxury (fine dining)
- **Schema:** `Restaurant`, `Menu`, `OpeningHoursSpecification`, `AggregateRating`

## 6. Real estate (agency, developer, listings)
- **Goal:** viewing or inquiry. **Sitemap:** Home · Search/Listings · Property detail · Projects (developers) · Sell/Valuation · Agents · Area guides · Mortgage calculator · Contact
- **Home:** hero with search (location, type, price) → featured listings → areas/neighborhoods → valuation CTA (for sellers) → agent team → testimonials → market insights → contact
- **Property page:** gallery/virtual tour → price + key facts (beds, baths, area) → description → floor plan → map + nearby → agent card with call/WhatsApp/booking → similar listings
- **Directions:** D2 Editorial Luxury (premium) · D4 Calm Product (portals) · D1 Swiss Precision
- **Schema:** `RealEstateAgent`, `Residence`/`Offer` where applicable, `BreadcrumbList`

## 7. Education: school, college, institute, online courses, LMS
- **Goal:** admission inquiry / enrollment / trial class. **Sitemap:** Home · Programs/Courses · Admissions (process, fees, dates) · Faculty · Campus/Facilities · Student life · Results/Alumni · News/Events · Parents portal/Login · Contact
- **Home:** hero (outcome promise + "Apply/Book a visit") → programs overview → why us (results, faculty, facilities) → admissions timeline + fees transparency → student/parent testimonials → results/alumni → campus gallery/virtual tour → events/news → FAQ → contact + map
- **Course page (online):** outcome → curriculum accordion → instructor → schedule/format → price + guarantee → reviews → FAQ → enroll CTA
- **Trust:** accreditation, real results, named faculty, fee transparency
- **Directions:** D4 Calm Product · D8 Warm Organic (schools) · D12 Soft Tactile 3D (kids/edu tech)
- **Schema:** `EducationalOrganization`/`School`/`CollegeOrUniversity`, `Course`, `Event`

## 8. Healthcare: clinic, dentist, hospital, therapist
- **Goal:** appointment. **Sitemap:** Home · Services/Treatments · Doctors · Book appointment · Insurance & pricing · Patient info · Locations · Reviews · Contact
- **Home:** hero (care promise + Book + phone) → services → doctors with credentials → how booking works → insurance/payment → reviews → locations & hours → patient resources → emergency note (where relevant)
- **Rules:** calm, high-contrast, large type, accessibility-first; privacy reassurance on forms; no fear-based copy
- **Directions:** D4 Calm Product · D8 Warm Organic
- **Schema:** `MedicalClinic`/`Dentist`/`Physician`, `MedicalProcedure` (where accurate)

## 9. Law firm / accounting / financial advisory
- **Goal:** consultation. **Sitemap:** Home · Practice areas (one page each) · Team/Attorneys · Results/Case studies (where allowed) · Insights · Fees · Contact
- **Home:** hero (who you help + free consultation CTA) → practice areas → why us → team credentials → results (compliant) → testimonials → process → insights → contact
- **Rules:** follow advertising rules of the profession and jurisdiction for claims, results and testimonials
- **Directions:** D1 Swiss Precision · D2 Editorial Luxury (navy/ivory)
- **Schema:** `LegalService`/`AccountingService`, `Person` for team

## 10. Fintech / banking / insurance
- **Goal:** account opening / quote. **Sitemap:** Home · Products · Pricing/Fees · Security · How it works · Help center · About · Legal/Compliance · Login
- **Home:** hero (clear benefit + CTA + app badges) → product cards → fees transparency → security & regulation (real licenses) → how it works → app showcase → reviews/ratings → FAQ → CTA
- **Directions:** D4 Calm Product · D10 Tech Blueprint · D7 Neo-Brutal Pop (youth fintech)
- **Schema:** `FinancialService`, `Organization`

## 11. Nonprofit / NGO / charity
- **Goal:** donation or volunteer signup. **Sitemap:** Home · About/Mission · Programs · Impact/Reports · Donate · Get involved · Stories · News · Contact
- **Home:** hero (human story + Donate) → impact numbers (real, sourced) → programs → story/testimony → transparency (where money goes, reports) → ways to help → partners → newsletter → donate CTA
- **Donate page:** preset amounts with real impact equivalents, recurring toggle, minimal fields, trust badges, receipts info
- **Directions:** D8 Warm Organic · D2 Editorial · D9 Monochrome (bold campaigns)
- **Schema:** `NGO`/`Organization`, `DonateAction`

## 12. Portfolio / personal brand / creator / coach
- **Goal:** inquiry, booking or subscription. **Sitemap:** Home · Work/Portfolio · About · Services/Offers · Testimonials · Blog/Newsletter · Contact/Book
- **Home:** hero (who you are + what you do for whom) → selected work → services/offers → testimonials → about (photo, story) → content/newsletter → CTA
- **Directions:** D9 Monochrome Type-Only · D1 Swiss · D7 Neo-Brutal Pop · D11 Retro
- **Schema:** `Person`, `ProfilePage`, `Service`

## 13. Event / conference / launch
- **Goal:** ticket or registration. **Sitemap (often one long page):** Hero · Countdown (real date) · Speakers · Agenda · Venue · Tickets/Pricing · Sponsors · FAQ · Register
- **Directions:** D5 Dark Cinematic · D3 Kinetic · D6 Bento
- **Schema:** `Event` (with `Offer`, location, dates)

## 14. Hotel / travel / tourism
- **Goal:** booking. **Sitemap:** Home · Rooms/Packages · Experiences · Dining · Gallery · Location · Offers · Book
- **Home:** immersive hero (photo/video) + booking widget → rooms → experiences → reviews → location → offers → book CTA
- **Directions:** D2 Editorial Luxury · D8 Warm Organic
- **Schema:** `Hotel`/`LodgingBusiness`, `Offer`, `AggregateRating`

## 15. B2B industrial / manufacturing / logistics
- **Goal:** RFQ / quote. **Sitemap:** Home · Products/Capabilities · Industries served · Certifications/Quality · Case studies · Resources (datasheets) · About · Contact/RFQ
- **Home:** hero (capability + RFQ CTA) → capabilities → industries → certifications → facility/process → case studies → downloadable specs → RFQ form
- **Directions:** D1 Swiss Precision · D10 Tech Blueprint
- **Schema:** `Organization`, `Product`

## 16. Mobile app landing page
- **Goal:** install. **Single page:** hero (app value + store badges + QR on desktop + phone screens) → key features with real screens → how it works → ratings/reviews → privacy/security → FAQ → download CTA
- **Directions:** D12 Soft Tactile 3D · D6 Bento · D7 Neo-Brutal Pop
- **Schema:** `MobileApplication`/`SoftwareApplication`

## 17. Blog / media / publication
- **Goal:** read → subscribe. **Sitemap:** Home · Categories · Article · Authors · Newsletter · About
- **Article page:** title, author with credentials, date, reading time → hero image → readable body (65ch, 18–20px) → table of contents on long posts → inline newsletter CTA → related posts
- **Directions:** D2 Editorial · D9 Monochrome · D1 Swiss
- **Schema:** `Article`/`BlogPosting`, `Person` (author), `BreadcrumbList`

## 18. Marketplace / directory / platform
- **Goal:** search → contact/transaction (two-sided: buyers + sellers). **Sitemap:** Home · Search/Browse · Listing detail · Category pages · For sellers/providers · How it works · Trust & safety · Pricing · Help
- **Home:** search-first hero → popular categories → featured listings → how it works (both sides) → trust & safety → seller CTA → reviews
- **Directions:** D4 Calm Product · D6 Bento
- **Schema:** `ItemList`, `Product`/`Service`, `Organization`

---

## Universal pages most sites need
About · Contact (form + details + map where relevant) · Privacy policy · Terms · 404 (helpful, branded) · Thank-you/confirmation (next steps) · Cookie consent (where required by law).
