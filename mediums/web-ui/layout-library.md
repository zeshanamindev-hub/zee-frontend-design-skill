# Layout library: section layouts, container strategy and the anti-box contract

Use with: `../../foundations/rules/README.md` (honest recommendation protocol), `business-layouts.md` (which sections a business needs), `composition-patterns.md` (hero archetypes, rhythm), `hifi-visuals.md` (what goes inside the big visual sections).

## 0. Why pages came out as "boxes" (diagnosis) and the fix
Earlier versions told Claude *which sections* a business needs but not *how wide*, *how dense* or *how visual* each should be. With no rule, Claude defaults to the safest pattern: every section = centred heading + contained grid of cards. Same width, same density, same rhythm. That's the box layout.

### The page composition contract (mandatory for every full page; checked at G2 in `../../foundations/anti-ai-slop.md`)
1. **Width mix**: ≥ 1 **full-bleed** section (edge to edge), ≥ 1 **breakout** or one-side-bleed section, and contained sections for reading. Never 3 contained sections in a row on a marketing page.
2. **Hi-fi visual**: ≥ 1 **high-fidelity visual section** (product theatre, art-directed photo, data-viz, illustration scene, 3D or video loop; see `hifi-visuals.md`). Placeholders are allowed while drafting but must be named in the plan with their asset source.
3. **Card budget**: ≤ 1 card grid per page, and only for discrete, comparable, clickable items (L19 card test). Features, benefits, process and values are **not** cards by default.
4. **Density alternation**: no two adjacent sections with the same density *and* the same layout type. Plan a rhythm: airy → dense → visual → quote → dense → airy.
5. **Asymmetry**: ≥ 1 asymmetric composition (7/5, 8/4, offset, overlap, broken grid). Symmetric/centred layouts ≤ 2 per page (L10).
6. **One signature move** per page (G3): a recurring visual idea only this brand would use.
7. **Mobile is its own composition** (R1): full-bleed sections stay full-bleed; asymmetric splits become stacked *with a designed order*, not just squashed.

## 1. Container strategy (CSS Grid named lines)
Five widths on one grid, so any child can choose its width without wrapper divs:
```css
.page {
  --gutter: clamp(1rem, 4vw, 3rem);
  --content: 72rem;   /* 1152px: standard sections */
  --breakout: 88rem;  /* 1408px: wide media */
  --text: 42rem;      /* 672px ≈ 65–70ch: reading */
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--gutter), 1fr)
    [breakout-start] minmax(0, calc((var(--breakout) - var(--content)) / 2))
    [content-start] min(100% - 2 * var(--gutter), var(--content))
    [content-end] minmax(0, calc((var(--breakout) - var(--content)) / 2))
    [breakout-end] minmax(var(--gutter), 1fr) [full-end];
}
.page > *        { grid-column: content; }
.page > .text    { grid-column: content; max-width: var(--text); }
.page > .breakout{ grid-column: breakout; }
.page > .full    { grid-column: full; }
.page > .bleed-right { grid-column: content-start / full-end; } /* one-side bleed */
.page > .bleed-left  { grid-column: full-start / content-end; }
```
Tailwind v4: define `--content`, `--breakout`, `--text` in `@theme`, then use arbitrary values (`grid-cols-[...]`, `col-[full]`) or a small `@utility`. In WordPress use `theme.json` `layout.contentSize` / `wideSize` + `alignfull`/`alignwide`; in Shopify use a section setting `full_width` (Horizon-style sections often already have one).

| Width | Use for | Avoid for |
|---|---|---|
| **Full-bleed** | heroes, immersive photo/video, colour/value bands, marquee logos, big statement type, maps | long reading text |
| **Breakout** (wider than content) | product screenshots, galleries, data-viz, comparison tables | body copy |
| **Contained** | most feature/benefit/proof sections, forms | everything on the page |
| **Narrow text** (≤ 70ch) | articles, FAQs, legal, long-form storytelling | wide media |
| **One-side bleed** | split sections where the image runs off one edge; creates motion and asymmetry | symmetric ceremony sections |

## 2. Section layout catalogue (pick 2–3 candidates per section, then run the recommendation protocol)
`W` = default width (F full, B breakout, C contained, N narrow, S one-side bleed). `Needs` = what must exist for it to work. Don't pick a layout whose needs you can't meet.

### Heroes (the first viewport is a poster: one idea, one anchor, one action; L20)
| ID | Layout | W | Best for | Needs | Rules served |
|---|---|---|---|---|---|
| H-01 | **Full-bleed photo/video with floor fade** | F | hospitality, travel, real estate, fashion, events | one great image/loop (real) | L20 image test, B7, A3 (scrim) |
| H-02 | **Split 7/5 with one-side-bleed media** | S | SaaS, services, B2B | product shot or real photo | L11, L1 |
| H-03 | **Giant type poster** (type is the visual) | F | agencies, editorial, mono brands, launches | a sharp line of copy | B7, T8, D13 Monochrome |
| H-04 | **Product theatre** (UI floats over a branded stage, scroll-linked) | B | SaaS, apps, devices | real product UI | U12, K8 |
| H-05 | **Interactive demo / configurator in hero** | B | tools, calculators, configurable products | working mini-tool | U26, I4 |
| H-06 | **Collage / broken grid** (3–5 masked images + type) | F | creative, lifestyle, food, culture | 3–5 strong images | L11, L12 |
| H-07 | **Search-first** (search field is the hero) | C | marketplaces, directories, real estate, recipes | working search | U3, K8 |
| H-08 | **Data hero** (live number / chart as the anchor) | B | fintech, analytics, climate, sports | real data source | D11, K6 |
| H-09 | **Centred statement + proof strip** | C | trust-first (legal, health) when no strong visual exists | real logos/ratings | K9; use sparingly (L10) |

### Narrative & story
| ID | Layout | W | Best for | Needs |
|---|---|---|---|---|
| N-01 | **Sticky media + scrolling steps** (scrollytelling) | B | how-it-works, product tours | 3–5 states/screens |
| N-02 | **Alternating zig-zag with overlap** (images overlap section edges) | S | features with real imagery | 3–4 images |
| N-03 | **Horizontal scroll strip / pinned gallery** | F | portfolios, collections, timelines | 5+ items; keyboard + visible scroll affordance |
| N-04 | **Timeline** (vertical, connected; U24) | C | history, roadmap, process | dated milestones |
| N-05 | **Before / after slider** | B | renovation, design, retouching, SaaS transformation | paired images |
| N-06 | **Statement band** (one sentence, huge type, full-bleed colour or inversion) | F | mission, manifesto, transition between sections | one strong line |
| N-07 | **Chaptered long-form** (narrow text + full-bleed interludes) | N+F | case studies, annual reports, editorials | written story |

### Features & product
| ID | Layout | W | Best for | Needs |
|---|---|---|---|---|
| F-01 | **Bento grid** (mixed spans 2×2, 2×1, 1×1; each tile has a real visual) | B | multi-feature products | a visual per tile; not icon+text tiles |
| F-02 | **Feature tabs with live preview** (tabs left, preview right) | B | SaaS with 3–6 features | screenshot per tab |
| F-03 | **Annotated product** (callouts pointing at a big image/UI) | B | hardware, devices, dashboards | one hero product image |
| F-04 | **Use-case switcher** (persona/industry chips change the copy + visual) | C | multi-audience B2B | content per segment |
| F-05 | **Comparison table** (us vs alternatives / plans) | B | pricing, switching campaigns | honest, sourced data (`facts.md`) |
| F-06 | **Spec sheet / numbers wall** | C | industrial, hardware, real estate | real specs |
| F-07 | **Icon list (no cards)**: 2-col list with icons, separated by space and hairlines | C | many small features | short benefit lines |

### Proof & trust
| ID | Layout | W | Best for | Needs |
|---|---|---|---|---|
| P-01 | **Logo marquee** (slow, pausable) | F | B2B | real logos with permission |
| P-02 | **Big quote** (one testimonial, large type, photo, name, role) | C/F | any | a real, attributable quote |
| P-03 | **Case-study cards** (the one allowed card grid) | C | agencies, B2B | 2–3 real case studies |
| P-04 | **Proof strip** (3–4 real numbers in a row, no icons, no cards) | C | any | sourced numbers. A strip of real figures is *not* the icon-card tell. |
| P-05 | **Review wall / masonry** | B | e-commerce, apps, courses | real reviews (source + date) |
| P-06 | **Map / locations** | F | local, multi-branch, real estate | addresses |

### Conversion & utility
| ID | Layout | W | Best for | Needs |
|---|---|---|---|---|
| C-01 | **Pricing columns** (3 tiers, one emphasised) | C | SaaS, services | real plans |
| C-02 | **Calculator / estimator** | C | finance, solar, services, SaaS ROI | formula from client |
| C-03 | **CTA band** (full-bleed accent or inverted band, one action) | F | end of page | one offer |
| C-04 | **Inline lead form split** (form + reasons/proof) | C | B2B, services | ≤ 5 fields |
| C-05 | **FAQ accordion** (narrow, grouped) | N | objections, SEO (FAQ content) | real questions (support, PAA) |
| C-06 | **Booking / availability** | C | restaurants, clinics, salons, hotels | booking integration |
| C-07 | **Mega footer** (sitemap + contact + trust + newsletter) | F | content-rich sites | IA |

## 3. App, product and dashboard layouts
Dashboard and mobile have their own mediums (`../dashboard/dashboard.md`, `../mobile-app/mobile-app.md`). General app layout types [Source: devsquad.com/blog/user-interface-layouts]: grid · stacked/feed · tabbed · card · floating action button · split screen · liquid/responsive · full-screen · masonry · overlay (modal/sheet) · circular · canvas (whiteboard/editor) · multi-panel (dashboards) · hierarchical (tree) · freeform · infinite scroll · ribbon (command-heavy tools) · timeline · parallax · fixed sidebar · sticky header/footer · off-canvas · cover flow · wizard (stepped) · catalog · empty state · map-based · comparison · form-based · chat-based.
Choose by the **primary task**: monitor → multi-panel; create → canvas + side panels; browse → grid/masonry + filters; compare → comparison/table; converse → chat; configure → wizard or split screen with live preview.

## 4. Page rhythm map (plan this before designing sections)
Write the page as a strip so variety is visible before any code:
```
#  Section            Layout   Width  Density  Visual weight  Motion
1  Hero               H-02     S      airy     high (product)  entrance
2  Proof strip        P-04     C      dense    low             none
3  How it works       N-01     B      medium   high (sticky)   scroll-linked
4  Statement          N-06     F      airy     type only       none
5  Features           F-01     B      medium   high (bento)    hover
6  Quote              P-02     C      airy     medium (photo)  none
7  Pricing            C-01     C      dense    low             toggle
8  FAQ                C-05     N      dense    low             accordion
9  CTA band           C-03     F      airy     accent          none
```
Check the strip: widths mixed ✓ · ≥ 1 full-bleed ✓ · ≥ 1 hi-fi section ✓ · cards ≤ 1 grid ✓ · no two neighbours share layout + density ✓ · motion total 2–3 intentional moves (DAE-UX) ✓.

## 5. Redesigning page by page (many sites)
- Keep a **design ledger** (`.design/design-ledger.md`, template in `../../workflows/templates/`) of the hero type, art direction, signature move and layout IDs used per site. **Don't repeat the same hero archetype + direction combination on consecutive client sites** unless the brand demands it.
- Per page type, reuse the *rhythm logic*, not the *same sections*: a services page and a pricing page should look like the same brand but different compositions.

## 6. Quick anti-box checks (run on the rendered page with `scripts/capture.mjs --full --sections`)
- Squint at the full-page screenshot: do section edges form one repeating rectangle pattern? → vary widths or introduce a full-bleed band.
- Count bordered/shadowed rectangles per viewport: > 6 → apply the card test (L19).
- Is any section only "heading + 3 icon cards"? → replace with F-07 icon list, F-02 tabs or F-03 annotated product.
- Does the page have a section you'd screenshot to show someone? If not, it lacks a hi-fi section.
