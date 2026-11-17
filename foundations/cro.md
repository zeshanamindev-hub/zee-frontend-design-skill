# CRO: conversion rate optimization

Design that looks good but doesn't convert has failed. Every section must help a visitor make a decision. [Expert unless tagged]

## 1. Ground rules
- **One primary conversion per page** (buy, book, sign up, call). Secondary actions are visually quieter.
- **Research first:** business type, audience objections (review mining), competitor offers (`workflows/research-pipeline.md` Tracks 2 and 5).
- **Honest persuasion only.** No fake scarcity, fake countdowns, fake reviews, pre-ticked consent boxes, confirmshaming ("No thanks, I hate saving money"), hidden costs, or forced continuity. These are dark patterns: they damage trust and can break consumer-protection law.
- **Evidence over opinion:** don't promise conversion lifts. Frame changes as hypotheses to measure.

## 2. Frameworks to reason with
**LIFT model** (six factors to evaluate any page):
| Factor | Question | Design levers |
|---|---|---|
| **Value proposition** | Why should I act? (the engine) | Specific headline, outcome-focused subhead, proof |
| **Relevance** | Does this match what I came for? | Message match with ad/search query, audience-specific language |
| **Clarity** | Do I understand it in 5 seconds? | Hierarchy, plain words, one focal point |
| **Anxiety** | What worries me? | Trust signals, guarantees, privacy notes, transparent pricing |
| **Distraction** | What pulls me away? | Fewer competing CTAs, simplified nav on landing pages |
| **Urgency** | Why now? | Real deadlines, real stock, seasonal relevance, never fake |

**Fogg Behavior Model (B = MAP):** behavior happens when **Motivation**, **Ability** (ease) and a **Prompt** come together. Raise ability (fewer fields, clear steps) before trying to raise motivation.

## 3. Universal CRO rules
**Value proposition (hero)**
- Headline says **what you get / what it does** for whom, in the customer's words, not a slogan.
- Subhead adds the how or the proof. A visual shows the product or the outcome.
- 5-second test: a stranger can say what it is, who it's for, and what to do next.

**CTAs**
- Verb + outcome: "Get my free quote", "Start 14-day trial", "Book a table". Not "Submit" or "Learn more" for the primary action.
- The 10% accent color is reserved for the primary CTA (60/30/10). Strong contrast and size; ≥ 44px tall on touch.
- Microcopy under the CTA removes anxiety: "No credit card required · Cancel anytime".
- Repeat the primary CTA at decision points (after proof, after pricing, final section), with the same wording.

**Trust & proof** (real only)
- Ratings with source (e.g. Google, Trustpilot), named testimonials with photo and role, client logos with permission, case studies with real numbers, certifications, guarantees, security badges at payment.
- Put proof **next to the claim or CTA it supports**, not only in a testimonials section.

**Friction**
- Forms: ask only what you need now; label every field; inline validation; smart defaults; correct input types (`email`, `tel`, `inputmode`); show progress on multi-step.
- Show prices or price ranges where buyers expect them; hidden pricing raises anxiety.
- Speed is conversion: a fast LCP and no layout shift (see seo.md CWV targets).

**Navigation**
- Paid-traffic landing pages: reduce nav to the essentials (logo, maybe 1–2 links, the CTA).
- Sticky header with CTA on long pages; sticky mobile CTA bar on product pages.

**Objection handling**
- Map each top objection (from review mining) to a section: FAQ, comparison, guarantee, pricing explainer, "how it works".

## 4. Section-level CRO checklist
| Section | Must have |
|---|---|
| Hero | Specific value prop · primary CTA · supporting visual of product/outcome · micro-proof (rating/logos) near the CTA |
| Social proof | Real, attributable, relevant to the audience segment |
| Features/benefits | Benefits first ("so you can…"), shown through the real product |
| How it works | 3–5 steps, effort-reducing language, CTA at the end |
| Pricing | Recommended plan emphasized by layout · annual/monthly toggle clarity · what's included · FAQ about billing · guarantee |
| Testimonials/case studies | Name, role, photo, specific result; video if available |
| FAQ | Real objections answered plainly; links to deeper pages |
| Final CTA | Restates the outcome + removes the last anxiety |
| Forms/checkout | Minimal fields · guest checkout (e-commerce) · trust at payment · clear errors · express pay options |

## 5. CRO by business type (start here, then research)
| Business | Primary conversion | Key levers |
|---|---|---|
| SaaS | Trial / demo | Product UI in hero, time-to-value, integrations, pricing transparency, security/compliance |
| E-commerce | Add to cart → checkout | Product imagery, reviews with photos, shipping/returns clarity, size guides, sticky add-to-cart, express checkout |
| Local service (plumber, clinic, salon) | Call / booking | Click-to-call, service area, hours, reviews, before/after, response time, transparent pricing ranges |
| Agency / consultant | Inquiry / call | Case studies with results, process, team, selective client logos, a clear "who we're for" |
| Restaurant / café | Reservation / order | Menu (HTML, not PDF), hours, location map, booking widget, food photography |
| Real estate | Viewing / inquiry | Search & filters, listing quality, map, agent trust, mortgage calculator |
| Education / courses / institutes | Enroll / admission inquiry | Outcomes, curriculum, faculty, schedule & fees, accreditation, alumni results |
| Healthcare | Appointment | Credentials, conditions treated, insurance, booking, privacy reassurance |
| Nonprofit | Donation | Impact proof, specific asks ("$25 feeds…" only if true), transparency, recurring option |
| B2B / manufacturing | RFQ / quote | Specs, certifications, industries served, downloadable datasheets, quote form |
| Mobile app | Install | Store badges, screenshots/video, ratings, QR on desktop |

## 6. Measure
- Define the conversion event and micro-conversions (CTA clicks, form starts, scroll depth to pricing).
- Recommend analytics (GA4, PostHog, Plausible…) and heatmaps/session recordings (Microsoft Clarity, Hotjar) where privacy rules allow.
- Write each change as a hypothesis: "Because <evidence>, changing <X> will improve <metric> for <audience>." A/B test when traffic allows.

## 7. CRO audit checklist
- [ ] Value prop understood in 5 seconds
- [ ] One primary CTA per view; verb + outcome; accent color; passes contrast
- [ ] Proof next to claims and CTAs; all proof real
- [ ] Top objections answered on the page
- [ ] Forms minimal, labeled, validated, mobile-friendly
- [ ] Pricing/fees visible where expected
- [ ] Message match with traffic source
- [ ] No dark patterns
- [ ] Fast (CWV good) and stable (no layout shift)
- [ ] Conversion events defined for measurement
