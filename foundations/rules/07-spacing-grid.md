# 07 · Spacing & grid rules (S1–S10)
Responsive grid implementation: `../../mediums/web-ui/responsive.md`.

| ID | Rule | How to apply (numbers) | Honest caveat |
|---|---|---|---|
| **S1** | **8-point spacing system** | Tokens: 0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160. Components snap to multiples of 8; section padding from the large end (64–160). Detroit3D's foundations: 8pt standard, 4pt for fine adjustments. [Source: ux.detroit3d.com/foundations] | Text line boxes rarely land on 8; that's expected (see S3). |
| **S2** | **4-point spacing system** | Add 4, 12, 20, 28 for small components (icon gaps, chip padding, dense tables). | Allow 4-steps only in components, not in section-level layout. |
| **S3** | **Baseline grid** | Line-heights in multiples of 4 (e.g. 16/24, 18/28, 14/20) so text in adjacent columns aligns; use `text-box-trim` where supported for optical spacing. | Strict baseline grids are hard on the web; aim for consistent leading, not pixel-locking. |
| **S4** | **Column grid** | 12 columns desktop (gutter 24–32px, margin 32–80px), 8 tablet, 4 mobile (gutter 16, margin 16–20). Content max-width 1200–1440px; text max 65ch. | 12 columns is a convention; editorial layouts may use 6 or asymmetric grids. |
| **S5** | **Modular grid** | Columns + rows form modules; use for galleries, bento sections and dashboards (CSS Grid `grid-template-areas`). | Equal modules everywhere = monotony; vary module spans (1×1, 2×1, 2×2). |
| **S6** | **Fluid grid** | Use `fr`, `minmax(0,1fr)`, `%` and `clamp()` so columns flex between breakpoints; `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` for card lists. | Always `minmax(0,1fr)`, because plain `1fr` lets long content blow out the column (overflow bug). |
| **S7** | **Responsive grid** | Change column count at **content-first breakpoints** (R2); also use container queries for components that live in different-width slots. | Don't design 5 breakpoints when 3 suffice. |
| **S8** | **Whitespace rule** | Macro whitespace (between sections) ≥ 2× micro whitespace (inside components). Marketing: section padding ≥ 96px desktop / 64px mobile. | Too much whitespace on dashboards hides data (D3). |
| **S9** | **Consistent spacing** | Only token values; same component = same internal padding everywhere; one spacing scale shared by design and code (`--space-*`, Tailwind `@theme`). | Optical exceptions (icons, quotes) are fine when documented. |
| **S10** | **Vertical rhythm** | Space between elements relates to their relationship: heading→its paragraph small (8–16), paragraph→next heading larger (32–48), section→section largest (96–160). Rhythm changes deliberately between sections (dense → airy → dense). | Mechanical rhythm everywhere feels templated; vary section heights and densities on purpose. |
