# Browser tools: Playwright & Claude in Chrome

Browsers give the skill **eyes**: screenshots of competitors and inspiration, responsive QA of what you build, interaction testing, GIF recording, and rendering graphics to PNG. Without a browser tool, WebFetch only returns text, so **visual judgments are impossible**. Say so and ask for screenshots.

Verified Nov 2026 against the Playwright MCP README and the Claude Code docs.

## 1. Which tool for which job
| Job | Best tool | Why |
|---|---|---|
| Capture competitor/inspiration sites at several widths | **capture.mjs** (Playwright script) or **Playwright MCP** | Headless, repeatable, exact viewport sizes, files saved to disk |
| Responsive QA of the local build (localhost) | **capture.mjs** (batch) + **Playwright MCP** (interactive checks) | Overflow warning per width; resize and inspect |
| Pages behind the user's login (Figma, Shopify admin, WP admin, analytics, Search Console) | **Claude in Chrome** | Uses the user's real, signed-in Chrome |
| Test interactions (menus, forms, carousels, hover/focus) | Playwright MCP or Claude in Chrome | Click, type, keyboard; read console errors |
| Record a demo GIF of a flow | **Claude in Chrome** (built-in GIF recording) or a screen recording + `make-gif.sh` | |
| Render HTML graphics to exact-size PNG (social, OG, thumbnails) | **capture.mjs render** | Pixel-exact sizes at 2× |

## 2. Setup (steps the user performs)

### A. Playwright MCP (Claude controls a separate browser)
1. **Check Node.js:** run `node -v`. The README requires Node.js 18 or newer.
2. **Add the server to Claude Code** (in your terminal, not inside Claude):
   ```bash
   claude mcp add playwright npx @playwright/mcp@latest
   ```
3. **Verify:** start Claude Code, run `/mcp`. You should see `playwright` listed as connected. Its tools start with `browser_` (e.g. `browser_navigate`, `browser_take_screenshot`, `browser_resize`, `browser_snapshot`).
4. **Useful options** (add after `@playwright/mcp@latest`): `--browser chrome|firefox|webkit|msedge` · `--headless` · `--viewport-size 1280x720` · `--device "iPhone 15"` · `--isolated` (fresh profile in memory) · `--caps vision` (coordinate-based interaction).
   Example: `claude mcp add playwright npx @playwright/mcp@latest --headless --viewport-size 1440x900`
5. **Common errors:** "npx not found" → install Node.js · browser fails to launch → run `npx playwright install chromium` once, or use `--browser chrome` to use installed Chrome · server not listed → re-run step 2, then restart Claude Code.

### B. Claude in Chrome (Claude uses YOUR Chrome, with your logins)
Requirements: Google Chrome or Microsoft Edge (other Chromium browsers like Brave/Arc are detected too), the **Claude in Chrome** extension v1.0.36+, Claude Code signed in with `/login` on a direct Anthropic plan (Pro, Max, Team or Enterprise). Not supported in WSL. Not available via Bedrock/Vertex-style third-party providers.
1. Install the **Claude** extension from the Chrome Web Store and sign in with the **same** claude.ai account and organization as Claude Code.
2. Start Claude Code with Chrome:
   ```bash
   claude --chrome
   ```
   (First run shows a one-time dialog: press Enter.)
3. **Verify:** run `/chrome`. It should show "Status: Enabled" and "Extension: Installed".
4. Optional: in `/chrome`, choose **Enabled by default** so you don't need `--chrome` each time. This loads the browser tools in every session and uses more context, so turn it on only if you use the browser often.
5. **Permissions:** Claude asks before acting on a site; you can allow a site for the session. Login pages and CAPTCHAs are left for you to complete.
6. **Common errors:** "Browser extension is not connected" → same account/organization in extension and Claude Code, restart Chrome + Claude Code, `/chrome` → Reconnect · "Receiving end does not exist" → `/chrome` → Reconnect extension · first install not detected → restart Chrome once.

### C. capture.mjs (no MCP needed; good for batch screenshots)
1. In the project: `npm i -D playwright`
2. Either `npx playwright install chromium` **or** pass `--channel chrome` to use installed Google Chrome.
3. Run:
   ```bash
   node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs shots https://competitor.com --out .design/shots/competitor --full --channel chrome
   node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs shots http://localhost:3000 --widths 375,768,1280,1536
   node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs render og.html public/og.png --size 1200x630
   ```
   `shots` (v0.4): scrolls the page first (lazy images load, scroll reveals run), forces lazy images eager, waits for images and fonts, then captures. Per width it reports **horizontal overflow (any value > 0 px)**, console errors, page errors, failed requests (4xx/5xx/network) and broken images, and writes `report.json` per target.
   More options: several URLs at once (`shots https://a.com https://b.com`) or `--list urls.txt` (one URL per line, `#` comments) → one sub-folder per site · `--sections [selector]` → one PNG per section (default selector covers `main > section`, `body > section`, `[data-section]`, header/footer) for section-by-section competitor analysis · `--no-scroll` to disable the scroll pass · `--dark` for `prefers-color-scheme: dark`.
   Binary: `--channel chrome` or `CHROME_PATH=/path/to/chrome`.

### D. interaction-qa.mjs (keyboard & interaction bugs screenshots can't show)
```bash
node ${CLAUDE_SKILL_DIR}/scripts/interaction-qa.mjs http://localhost:3000 --width 1280 --json .design/qa/home.json --channel chrome
```
Checks: console/page errors and failed requests · accessible names on buttons/links · `alt` on images · broken images · Tab walk (visible focus indicator per stop, focus traps) · tabs (`role=tablist`: ArrowRight moves/selects) · sliders (`role=slider`, `input[type=range]`: arrow keys change the value) · dialogs (triggers with `aria-haspopup="dialog"`/`aria-controls`: opens, moves focus inside, Escape closes, focus returns) · **video seeking + HTTP Range support** (fails when the server returns 200 instead of 206) · animations still running under `prefers-reduced-motion` · horizontal overflow. Exits 1 if anything FAILs, so it can run in CI. Exit 2 = the page itself didn't load.
Tested Nov 2026 on a deliberately broken page: it caught 12 issues (missing names/alt, no focus style, broken slider, dialog without Escape/focus, failed seek on a non-range server) and passed the correct widgets.

## 3. How the skill uses browsers in each workflow
| Workflow step | Browser action |
|---|---|
| Discovery (user's inspiration links) | Open each link → screenshots at 375 + 1440 → pattern analysis (`workflows/research-pipeline.md` Track 3) |
| Competitor analysis | Full-page screenshots of each competitor's key pages at mobile + desktop; note section order, CTAs, visual direction (`workflows/competitor-analysis.md`) |
| Inspiration research | Capture 3–6 references per section type |
| Section review | Screenshot the built section at each breakpoint in its responsive plan; fix overflow, crops, hierarchy |
| Full-page review | Full-page shots at 375 / 768 / 1280 / 1536, light + dark; keyboard tab-through; console errors |
| Audit | Evidence screenshots for every visual finding |
| Graphics | Render HTML/SVG graphics to PNG at exact platform sizes |
| Motion | Record interaction GIFs (Chrome) or video → `make-gif.sh` |

**Rules**
- Respect sites' terms; capture for **analysis only**. Never copy a competitor's layout, copy, illustrations or brand assets.
- Save captures under `.design/shots/<site>/` and reference them in research and audit reports.
- Don't enter credentials or submit forms on third-party sites. Leave logins to the user (Claude in Chrome pauses for this).
- If no browser tool is connected, tell the user how to connect one (§2) and continue with text-only analysis, clearly labeled.
