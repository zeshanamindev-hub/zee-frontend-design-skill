# Anti-AI-slop review

"AI slop" = generic, repetitive, visually polished but **weakly justified** design decisions. The problem is **sameness, not AI**. Gradients, dark themes, cards, glass and big type are not bad in themselves. They become slop when added **by default** instead of chosen for a goal. [Source: DOCX]

## 1. Slop markers → intentional alternative

### From "Design Without AI Slop" [Source: DOCX]
| Common default | Intentional alternative |
|---|---|
| Generic purple/blue gradients | Defined brand palette; gradients optional, never automatic |
| Three identical cards in every section | Composition chosen by content: comparison, narrative, steps, proof, demo |
| Oversized corner radii everywhere | Purposeful radius scale; controls ≠ large containers |
| Neon glow and dramatic shadows | Effects only for elevation, focus, state or identity, never filler |
| Glass panels on every surface | Preserve contrast; translucency only where it helps |
| Every section centered | Alignment chosen for scanning, hierarchy, reading flow |
| Generic giant headlines | A **specific** headline + a considered type hierarchy |
| Placeholder icons and feature tiles | Real workflow, product UI, meaningful comparison or example |
| Floating blobs, unnecessary illustrations | Remove ornaments without meaning or brand personality |
| Uniform section layout and rhythm | Keep the spacing system; vary visual structure intentionally |
| Invented metrics or testimonials | Approved evidence only; otherwise clearly labeled placeholders |
| Animation on every scroll | Motion communicates state or progression; support reduced motion |

### From the before/after carousels [Source: images]
| Marker | Fix |
|---|---|
| Light grey card + small dark-grey headline + tiny body + small dark rounded "Shop Now" + centered product cut-out | Brand field, hierarchy, one strong CTA, emotional or cropped imagery |
| Everything same weight, size and color | Bold + light, large + small, light + dark |
| Many fonts | One strong typeface, explored |
| Rainbow palette (purple, pink, yellow, cyan, orange) | One color leads |
| Badges + icons + leaf decorations + long copy | Subtract until only the message remains |
| Dark background + abstract purple 3D blob as hero | A concept-specific visual or real product |

### Additional tells [Expert]
| Marker | Fix |
|---|---|
| Inter/Roboto/system font chosen by default with no reason | Choose type by personality (typography.md); Inter is fine when chosen deliberately |
| Hero formula: "✨ New" pill → gradient headline → 2 buttons → floating mockup, all centered | Concept-driven hero (composition-patterns.md) |
| Emoji used as icons | One icon library, consistent stroke and size |
| Gradient text on every heading | Gradient text at most once, if at all |
| `rounded-2xl shadow-lg` on every element | Radius + elevation scales with roles |
| Generic copy: "Unlock the power of…", "Seamless", "Revolutionize", "Elevate your…", lorem ipsum | Specific claims about this product, in the audience's words |
| Pure `#000` + neon glows as automatic "premium" | Tinted near-black + one light source, only if the direction calls for it |
| Fake logo strip ("Trusted by" random brands) | Real logos with permission, or remove |
| Mixed icon libraries / stroke widths | One library, one stroke width |
| Hover scale/bounce on everything | Hover feedback matched to the affordance; subtle and consistent |
| Every image in a soft-shadow rounded card | Vary treatment by role: full-bleed, framed, masked, inline |

## 2. Quick tests [Expert]
- **Logo-swap test:** replace the logo with a competitor's. If the page still works unchanged, it's generic. Add brand-specific concept, content and visuals.
- **Squint test:** blur your eyes or the screenshot. One focal point and a clear 1 → 2 → 3 order should remain.
- **Remove test:** for each gradient, shadow, glow or illustration, ask what would be lost without it. If nothing, remove it. [Source: DOCX sign-off question]
- **Section test:** what real user decision does each section support? [Source: DOCX]
- **Approval rule:** if the only reason for a major element is "it looks modern", revise it until it supports an identifiable goal. [Source: DOCX]

## 3. Quality-control checklist [Source: DOCX]
**Brand & identity**
- [ ] Recognizable visual identity beyond the logo
- [ ] No arbitrary colors, fonts or stylistic effects
- [ ] Consistent tokens for spacing, radius, borders, icons

**Layout & hierarchy**
- [ ] Page structure reflects content priorities
- [ ] Not every section uses the same card layout
- [ ] Typography and scanning order are clear
- [ ] Visual effects are justified, not decorative

**Content & credibility**
- [ ] Copy is specific, accurate, audience-appropriate
- [ ] Real product imagery used when available
- [ ] No invented reviews, statistics or customer logos

**Usability & accessibility**
- [ ] Desktop and mobile compositions reviewed **separately**
- [ ] Controls, focus states and navigation are clear
- [ ] Contrast, keyboard access and reduced motion considered

*This checklist supports review. It does not replace user research or real accessibility testing.* [Source: DOCX]

## 4. Sign-off questions [Source: DOCX]
1. What real user decision or task does this section support?
2. What would be lost if its gradients, shadows or illustrations were removed?
3. Does this composition express our brand, or just resemble a common template?
4. Is the interface supported by real content and product evidence?
5. Which elements still need an accessibility or usability test?

## 5. Working standard [Source: DOCX]
Human design direction → AI exploration and production → structured critique → manual refinement → usability and accessibility validation. Use AI to speed up iteration, not to outsource judgment.
