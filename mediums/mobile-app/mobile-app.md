# Medium: mobile application design (iOS, Android, cross-platform)

Rules: 08 interaction (I7 targets), 09 responsive (R9), 11 accessibility, 05 usability, 04 laws (U1 Fitts → thumb zone). Platform facts verified Nov 2026; re-check the official guidelines before a production build (they change yearly).
Official sources: Apple Human Interface Guidelines (developer.apple.com/design/human-interface-guidelines) · Material Design 3 (m3.material.io) · Android accessibility help (support.google.com/accessibility/android).

## 1. Discovery additions
Platforms (iOS, Android, both, PWA)? Native (SwiftUI/Compose) or cross-platform (React Native/Expo, Flutter)? Must it follow platform conventions (native feel) or one shared brand UI? Primary one-handed tasks? Offline needs? Notifications? Accessibility requirements? Existing design system?

## 2. Platform facts that change designs
| Topic | iOS (Apple HIG, iOS 26) | Android (Material 3 / M3 Expressive) |
|---|---|---|
| Min touch target | **44×44 pt** | **48×48 dp** (icon can be 24dp; padding makes up the rest) |
| Top-level navigation | **Tab bar** (bottom; floats on Liquid Glass in iOS 26; can minimise on scroll); max ~5 tabs, "More" beyond. No hamburger as primary nav. | **Navigation bar** (bottom, 3–5 destinations; M3 Expressive "flexible" bar is shorter, with pill active indicator). **Navigation drawer is deprecated in M3 Expressive** in favour of the **navigation rail** on larger screens. |
| Material / surface language | **Liquid Glass** = a functional layer for controls & navigation floating above content; Apple advises against using it inside the content layer. Users can raise opacity (iOS 26.1 "Tinted"). | Tonal surfaces & elevation; dynamic colour (Material You); M3 Expressive adds shape morphing, spring motion, emphasised type. |
| Type | SF Pro (system), **Dynamic Type** must be supported | Roboto/Roboto Flex or brand font; respect user font scale |
| Primary action placement | trailing/top-right in nav bar, or prominent bottom button | FAB (bottom-end) or extended FAB; bottom app bar |
| Back | swipe from left edge + back button in nav bar | system back gesture/button: never trap it |
| Motion | spring animations, respect **Reduce Motion** | spring physics in Expressive; respect animator duration scale / remove animations |
Sources: developer.apple.com/design/human-interface-guidelines/tab-bars; support.google.com/accessibility/android/answer/7101858; 9to5google.com (M3 Expressive navigation, May 2025); m3.material.io/blog (I/O 2026, Compose-first).
**Liquid Glass caution:** translucent controls lose contrast over busy content [Source: uxdesign.cc trends 2026; NN/g on Liquid Glass]. Test real backgrounds in light and dark mode; keep text on glass bold and bright.

## 3. Mobile layout system
- **Safe areas** (notch/Dynamic Island, home indicator): never place controls under them; web: `env(safe-area-inset-*)` + `viewport-fit=cover`.
- **Thumb zone** (U1): primary actions and nav in the bottom third; destructive actions away from the primary thumb arc; top area for status, titles, secondary actions.
- **Grid:** 4-column, 16–20pt margins, 4/8-pt spacing; list rows 44–56pt (iOS) / 48–72dp (Android).
- **Screen anatomy:** status bar · nav/top app bar (title, back, 1–2 actions) · content (one primary task) · bottom nav or bottom action.
- **Sheets over pages** for short tasks (filters, quick add, share); full-screen modals for multi-step creation; confirmations as action sheets/dialogs only for destructive actions.
- **Forms:** one column; correct keyboard type (`inputmode`, `textContentType`/`autocomplete`), labels above fields, inline validation on blur, primary button pinned above the keyboard.

## 4. Core screens and what makes them good
| Screen | Must have | Common failure |
|---|---|---|
| Onboarding | ≤ 3 screens or none; value before sign-up; permission requests **in context** with a pre-explanation | 5-slide tour nobody reads (U26) |
| Sign-in | passkeys / Sign in with Apple / Google; magic link; no CAPTCHA puzzles (WCAG 3.3.8) | password rules revealed after failure |
| Home / feed | the one thing users came for, above the fold; pull-to-refresh; skeletons | dashboard of everything |
| List → detail | search + filter, large tappable rows, swipe actions with visible alternative | tiny chevrons as the only target |
| Create / edit | autosave drafts, undo, clear Save state | data loss on back |
| Checkout | wallet pay, address autofill, order summary visible (U28) | surprise fees at the end |
| Settings | grouped lists, search for long settings, plain labels | jargon, nested 4 levels deep |
| Empty / error / offline | explain + action + retry; offline queue | blank screen |

## 5. Mobile micro-interactions & motion
Haptics for confirmations (sparingly) · pressed states on every tappable · spring transitions between list and detail (shared element) · pull-to-refresh · swipe actions with reveal · skeleton → content cross-fade · success check animations ≤ 600 ms · respect Reduce Motion (replace movement with fades).

## 6. Accessibility on mobile
VoiceOver/TalkBack labels for every control and image · Dynamic Type / font scale to 200% without truncating actions · targets per §2 · contrast per A3 (including over glass) · don't rely on gestures only (provide buttons) · captions for video · focus order follows layout.

## 7. App store & marketing assets (this skill can produce them)
- Store screenshots: 1–2 sentence benefit headline + real screen, consistent frame, 5–8 per locale. Build them as HTML and export with `scripts/capture.mjs render` at the store's required sizes (check the current required sizes in App Store Connect / Google Play Console before exporting).
- App preview video: 15–30 s, captions, real UI, rendered with `scripts/render-video.mjs` from a timeline laid out at 9:16 (`--size 1080x1920`; the bundled template is 16:9, so adapt a copy).
- Landing page: niche profile 16 (`../../foundations/niche-design-profiles.md`).

## 8. Deliverables
User flows (Mermaid or FigJam) → wireframes per key screen → hi-fi screens in light + dark at one iOS and one Android size (e.g. 393×852 pt iPhone class; 412×915 dp Android class) → component states → interactive prototype (`../../workflows/prototyping.md`) → handover (tokens, spacing, platform notes).
For cross-platform builds, decide **per component** whether it follows platform conventions (navigation, pickers, sheets, back) or the shared brand UI (cards, buttons, illustrations).
