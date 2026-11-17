# Medium: dashboards, admin panels & data-heavy product UI

Rules: `../../foundations/rules/06-dashboard.md` (D1–D14) + 05 usability + 08 interaction + 07 spacing (4-pt). This is product UI: clarity beats expression. Brand shows through tokens, the accent, type and empty-state illustration, not decoration.

## 1. Discovery questions (add to the normal discovery)
1. **Who** uses it and **what decision** do they make with it? (one line per role)
2. What do they check **daily** vs **monthly**? Which 3–6 numbers matter most?
3. Data: sources, refresh rate (real-time / hourly / daily), volumes, typical and extreme values?
4. Actions: is it read-only (monitor) or do users act (approve, assign, edit) from it?
5. Devices: desk monitors (1440–1920+), laptops (1280–1440), tablets in the field, phones for alerts?
6. Existing system: component library (shadcn/ui, MUI, Ant, Mantine, Tremor…), chart lib, design tokens?
Ask for **real or realistic sample data** (CSV/JSON/screenshot of the current dashboard). Design with it (D14).

## 2. Dashboard types → layout
| Type | Purpose | Layout | Density |
|---|---|---|---|
| **Executive / strategic** | trend & health at a glance | KPI strip (4–6) + 2–3 large trend charts + one table of exceptions | low |
| **Operational** | monitor & act now | status overview + live lists/queues + alerts panel; filters sticky | high |
| **Analytical** | explore & compare | filter bar + chart grid (small multiples D9) + pivot/table drill-down | high |
| **Admin / CRUD** | manage records | sidebar nav + data table + side-panel detail/edit | medium–high |
| **Personal / SaaS home** | what needs me today | greeting + tasks/next actions + 2–3 KPIs + recent activity | medium |

**Shell:** collapsible left sidebar (icons + labels; 240–280px expanded / 64–72px collapsed) · top bar (search ⌘K, notifications, account) · content max-width none, but text blocks ≤ 70ch · page header = title + date range + primary action.
**Grid:** 12 columns, 16–24px gutters, cards on a common row height; 4-pt spacing inside components (S2).

## 3. Components & specs
- **KPI tile** (D7): label (12–13px, muted) · value (28–40px, tabular figures `font-variant-numeric: tabular-nums`) · delta (▲/▼ + % + period, coloured **and** signed) · sparkline (no axes) · target. Click → drill-down.
- **Charts** (D11): line = trend over time · bar = compare categories (horizontal if labels are long) · stacked bar = composition · histogram/box = distribution · scatter = relationship · bullet = actual vs target · map = geography. Avoid 3D, pie > 3 slices, dual axes unless both are labelled and necessary.
- **Tables:** sticky header, right-aligned numbers, left-aligned text, units in header, zebra or hairlines (not both), row height 40px (comfortable) / 32px (compact), column sorting with `aria-sort`, bulk-select with count, pagination or virtual scroll for > 100 rows, empty/loading/error states.
- **Filters:** global date range top-right; applied filters as removable chips; "Reset"; filter state in the URL (shareable).
- **Alerts:** severity colour + icon + text (D12); unread count; link to the record.
- **Empty states:** explain what will appear, why it's empty, and the first action (U26); a small brand illustration is welcome here.

## 4. Colour for data
- UI chrome neutral; one brand accent for actions; **status colours** fixed (success/warning/danger/info); **data colours** separate: categorical (≤ 6–8 distinct hues, CVD-checked), sequential (one hue, light→dark), diverging (two hues around a neutral midpoint, e.g. blue↔orange rather than red↔green).
- Same metric = same colour everywhere (D13). Highlight one series, grey the rest (D8).
- Dark mode: lower saturation for large areas, keep text ≥ 4.5:1, avoid pure #000 (halation; see `../../foundations/color-system.md` §6).

## 5. States & performance
- Skeletons matching the final layout for loads 1–10 s; progressive rendering per widget (one slow query must not block the page); "last updated" timestamp + manual refresh; optimistic updates for actions (U6).
- Real-time: animate value changes subtly (≤ 300 ms count/flash), never re-layout; pause updates while the user is interacting with a table.
- Heavy animation on dense dashboards hurts perceived performance [Source: sprakdesign.com 2026 trends]. Motion only for state change and orientation.

## 6. Accessibility for dashboards
Charts need a text alternative (summary sentence + data table toggle); keyboard access to chart points via the table; focus order follows the visual grid; colour never the only encoding (C12); `aria-live="polite"` for real-time counters (throttled).

## 7. Trends worth using (and not)
- ✓ **Role-based / personalised defaults** (show each role its metrics first) [Source: sprakdesign.com 2026]
- ✓ **Natural-language query / AI summary** as an *addition* to charts ("Revenue fell 8% vs last week, mainly EU"), with the data visible and an explanation of how it was derived [Source: uxdesign.cc 2026 trends: make AI reasoning visible]
- ✓ Dense + calm: neutral surfaces, clear type, few borders.
- ✗ Gauges, 3D charts, gradient-filled areas everywhere, glassmorphism panels over charts (contrast).

## 8. Deliverables
Dashboard spec in `.design/dashboard/`: roles & questions → KPI list with definitions (formula, source, period) → wireframe (layout grid) → hi-fi screens with **real data**, including edge cases (0, null, huge numbers, long labels, error, empty) → component states → handover tokens. Prototype interactions per `../../workflows/prototyping.md`.
