# DESIGN.md (v2) — Visual System

Reference: `moritzpetersen.com` — this version matches its interactive patterns more closely (clickable project list + swapping preview pane, expandable bio card) on top of the existing numbered-label/monospace system, which stays unchanged for About/Certifications/Contact.

## Colors (unchanged from v1)
- Background: near-black `#0A0A0A`
- Panel background: `#0F0F0F`
- Heading text: off-white `#F2F2F0`
- Body/secondary text: muted gray `#8A8A8A`
- Hairline dividers: `border-white/10` (1px)
- Accent (live/shipped): navy blue (e.g. `#3B82F6` or `#2563EB`) — **replaces green from v1, everywhere**
- Accent (unreleased/"Coming Soon"): muted gray — unchanged, never the live accent color

## Typography (unchanged from v1)
- Inter, two weights max
- Monospace (JetBrains Mono or similar) for section labels and stat values
- Body text max-width constrained

## Section label system (unchanged)
```
[01] ABOUT
[02] PROJECTS
[03] CERTIFICATIONS
[04] CONTACT
```

## Link convention (unchanged)
External links: `LinkText ↗`, arrow nudges up-right ~2px on hover. Non-arrow text links get underline-draw on hover.

---

## `[02] PROJECTS` — NEW interactive layout (replaces v1's stacked two-column blocks)

**Two-panel layout, left list + right preview pane:**

**Left panel:**
- Vertical list of all 8 project names, plain text, muted gray by default.
- Active/selected project: bold white, or a subtle background pill highlight (rounded, dark fill, matches Moritz's "Enterprise Ready Conf" active-state look).
- Clicking a name swaps the right panel's content — cross-fade transition, ~0.3s (Framer Motion `AnimatePresence`).
- Directly under the active project's name (or in a details area below the list): show the project's tech tags (thin-border pill chips, unchanged from v1), a 3–4 line description, and `View on GitHub ↗` or a muted `Coming Soon` pill.

**Right panel — preview pane:**
- Shows 2–3 preview images/charts per project in a small gallery — dot indicators or a thin thumbnail strip to page through them.
- Per-project treatment varies: some previews sit inside a monitor-frame mockup image (real screenshots composited via external mockup tool, per `assets.md`), some are shown full-bleed with no frame — pick whichever best fits that project's content, matching Moritz's mixed approach.
- Keep the navy-blue ambient glow behind the pane (unchanged concept from v1's device-mockup work, now applied to this new pane instead).
- Existing SVG chart components (`charts/*.jsx`) can be used as one of the 2–3 preview entries per project until real app screenshots are available.

**No more:** the v1 "8 stacked two-column blocks, always all visible" pattern. It's replaced entirely by the click-to-preview list above.

---

## `[01] ABOUT` — NEW expandable bio card (adds to v1, doesn't replace it)

- Default collapsed state unchanged: headline + Core Technologies row.
- Add a `More ⌄` toggle below the collapsed content.
- Clicking it expands (smooth height + fade animation) into a bio card: full bio text on the left, a photo/visual on the right (see `details.md` for the exact photo decision — currently pending), and a `Close ⌃` toggle to collapse it back.

---

## `[03] CERTIFICATIONS` — visual polish update

Same link-arrow convention as Contact: entry name on the left, `Verify ↗` on the right where a public verification link exists, plain muted text where it doesn't (internal/institutional certs with no public link). No card borders — plain list with hairline dividers between entries, consistent with the rest of the site.

## `[04] CONTACT` — unchanged
No changes from v1. Do not modify.

---

## Cursor (unchanged from v1 fix)
Small clean dot/ring, OS default cursor hidden (`cursor: none`), slight follow-lag, subtle hover ring on links only. No glow, no magnetism.

## Motion (unchanged principles, new targets)
- Scroll-reveal fade/slide-up per section.
- Cross-fade on project list click (new, ~0.3s).
- Gallery paging transition within the preview pane (new, subtle slide or fade between the 2–3 images).
- Expand/collapse height animation for the About bio card (new).
- Arrow-nudge and underline-draw on link hover (unchanged).
- No parallax, no tilt, no particle effects, no carousel auto-rotation.
