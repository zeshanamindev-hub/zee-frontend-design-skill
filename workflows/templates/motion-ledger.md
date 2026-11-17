# Motion ledger: `.design/motion-ledger.md`
Every animation on the page has a row. No row = no animation. Aim for **2–3 intentional moves per page** (e.g. hero entrance, one scroll/sticky/depth effect, one hover/reveal) plus functional micro-interactions.

| # | Element (page › section) | Trigger | Purpose (what it communicates) | Duration | Easing | Reduced-motion fallback | Perf note |
|---|---|---|---|---|---|---|---|
| 1 | Home › hero headline | load | establishes hierarchy; headline lands first | 700 ms, 80 ms stagger | cubic-bezier(0.16,1,0.3,1) | none: content visible immediately | transform/opacity only |
| 2 | Home › how-it-works | scroll (sticky) | links each step to its screen | scroll-linked | linear (scroll) | static stacked steps | `animation-timeline: view()` + fallback |

Purposes that count: orientation (where did it come from/go), feedback (it worked), hierarchy (what to look at first), continuity (same object, new state), delight at a peak moment (U9: one per flow).
Purposes that don't: "looks modern", "fills space", "the template had it". These score as a generic tell in the anti-generic gate.
