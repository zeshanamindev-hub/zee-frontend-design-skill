# How to add a new medium (video, motion graphics, social graphics, presentations…)

This skill is built in two layers, so new output types reuse everything that's already defined:

```
foundations/   ← medium-agnostic: discovery, art directions, color (60/30/10), typography,
                 principles, anti-AI-slop, trends, resources. Shared by EVERY medium.
mediums/<name>/ ← only what is specific to producing that output.
```

## Steps
1. **Create the folder** `mediums/<medium-name>/` (kebab-case, e.g. `motion-graphics`, `video`, `social-graphics`, `presentations`, `email`).
2. **Add these files** (copy the outline below):
   - `composition-patterns.md`: layouts/structures specific to the medium (e.g. video: shot list, scene structure, safe areas; social: 1:1, 4:5, 9:16 grids)
   - `craft-details.md`: the polish details that make this medium look premium (e.g. motion: easing curves, timing, frame rates; video: pacing, captions, audio)
   - `implementation.md`: tools and code (reuse `toolchain/asset-generation.md` and `toolchain/browser-tools.md` where possible) (e.g. Remotion/React video, Lottie/Rive, After Effects export settings, ffmpeg, Canvas/SVG export, image formats and sizes)
   - Optional: `discovery-extra.md` with medium-specific questions (duration, aspect ratio, voiceover, platform)
3. **Register it in `SKILL.md`** in the "Medium router" table: one row with the medium name, its trigger phrases, and its folder.
4. **Update the frontmatter `description`/`when_to_use`** with the new trigger phrases, so Claude Code auto-loads the skill for that work (combined text is truncated at 1,536 characters in the skill listing, so keep it tight).
5. **Tag every rule** as **[Source]** (from your own material) or **[Expert]** (established practice), and verify facts such as tool versions, export specs and platform sizes against official docs before adding them.
6. **Test**: run the skill on 2–3 real requests for the new medium. Check that it asks discovery questions, proposes distinct directions, and runs the anti-slop review.

## Outline for a new medium's `craft-details.md`
```md
# Craft details — <medium>
## 1. What premium looks like in this medium
## 2. Structure & timing (or layout & grid)
## 3. Type in this medium (min sizes, safe areas, legibility at speed)
## 4. Color in this medium (60/30/10 applies; note format limits e.g. video gamut, print CMYK)
## 5. Motion / transitions (if any)
## 6. Accessibility (captions, contrast, flashing limits, reduced motion)
## 7. Medium-specific slop markers → alternatives
## 8. Final polish checklist
```

## Mediums already built (v0.2)
- `web-ui/`, `motion-graphics/`, `video/`, `graphics/`

## Ideas for future mediums
- **Presentations / pitch decks:** slide systems, data storytelling.
- **Email design:** table-based layouts, dark-mode email, client quirks.
- **Brand identity / print:** logo systems, brand boards, CMYK/Pantone production.
- **Mobile app UI (native):** iOS HIG / Material 3 specifics, platform components.
- **Data dashboards:** chart selection, density, real-time states.
