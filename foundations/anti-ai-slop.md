# Anti-AI-slop review

"AI slop" = generic, repetitive, visually polished but **weakly justified** design decisions. The problem is **sameness, not AI**. Gradients, dark themes, cards, glass and big type are not bad in themselves. They become slop when added **by default** instead of chosen for a goal. [Source: DOCX]

## 0. The anti-generic gate (mandatory, runs 3 times)
| Gate | When | Question |
|---|---|---|
| **G1: Direction** | Before proposing directions (Step 4) | Would this direction look the same for any competitor? Does it repeat the clichés found in competitor analysis? |
| **G2: Section plan** | Before building each section | Is the pattern chosen for this content, or is it the default? Is there real content and proof? |
| **G3: Final** | Before handover | Run the detector below, the logo-swap test and the remove test on the finished page |

### Generic-design detector (score the design; 1 point per "yes")
1. Could the logo be swapped with a competitor's and the page still work unchanged?
2. Is the hero the default formula (pill badge → centered headline → two buttons → floating mockup/blob)?
3. Does any section use 3+ identical icon cards?
4. Is the palette a purple/blue/pink gradient or 4+ competing hues, with no clear 60/30/10?
5. Is the font the default (Inter/Roboto/system) with no deliberate reason, or are 3+ families mixed?
6. Are radius, shadow and spacing identical everywhere (`rounded-2xl shadow-lg` on all)?
7. Is every section centered with the same structure and rhythm?
8. Are there decorative blobs, glows, glass panels or 3D shapes that would not be missed?
9. Does the copy include filler ("Unlock", "Seamless", "Elevate", "Revolutionize") or invented stats/testimonials?
10. Does motion appear on every scroll or hover without communicating anything?
11. Are stock photos or illustrations generic (handshakes, laptops, abstract people) instead of real product, people or work?
12. Is there no signature move, nothing a visitor would remember tomorrow?
**Score 0–1:** pass · **2–3:** fix the flagged items before handover · **4+:** generic; go back to the concept and direction (art-directions.md). Report the score in the handover.

### Banned defaults by category (unless a documented reason says otherwise)
| Category | Banned default | Do instead |
|---|---|---|
| Layout | Centered-everything, identical section skeletons, 3-card grids | Composition by content type; asymmetry and rhythm on purpose |
| Hero | Pill badge + gradient headline + 2 buttons + floating mockup | Concept-driven hero archetype (composition-patterns.md §2) |
| Color | Purple→blue gradients, rainbow palettes, neon on black | 60/30/10 with one leading hue, tinted neutrals |
| Type | Default font with no reason; 3+ families; same size/weight everywhere | One strong family, deliberate scale, contrast of weight and size |
| Components | Same radius/shadow on everything; emoji as icons; mixed icon sets | Radius and elevation scales with roles; one icon library |
| Imagery | Abstract blobs, generic stock, AI images with no meaning | Real product/people/work; concept-specific visuals |
| Effects | Glass, glow and gradients as decoration | Effects only for elevation, focus, state or identity |
| Motion | Fade-up on every element; bounce on everything | Motion that explains state, order or space; one motion personality |
| Copy | Filler phrases, invented proof, "Submit"/"Learn more" CTAs | Specific claims in customer language, real proof, verb + outcome CTAs |
| Content | Same structure and length on every page; AI filler pages | Page-specific intent, original value (content-copywriting.md) |

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
