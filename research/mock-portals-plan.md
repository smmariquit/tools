# Plan: Mock UI Representations of PH Government / Utility Portals

**Status:** Planning only. No components built, no tools/writeups edited, nothing committed.
**Author:** PHTools (drafted with AI assistant)
**As-of:** 2026-06-18

## 1. What we're building and why

Reusable, hand-built **mock UI representations** of official PH portals (My.SSS, Virtual
Pag-IBIG, BIR eFPS/ORUS, LTO ORUS, Meralco, BTr RTB, etc.), in the spirit of how
sweldoph.com recreates UIs. Purpose: visually guide users on **how to navigate** the real
portals step by step — "on the My.SSS dashboard, click **Contributions** → here's the
screen → this field is your AMSC."

These are **illustrative, hand-coded screens** — not scraped screenshots, not real logins,
no live data. They embed in MDX writeups (`src/content/blog/*.mdx`) and inside tool pages.

### Why this is worth doing
- The biggest user friction isn't the math (our calculators handle that) — it's *finding the
  number on the real portal*. A guided screen recreation closes that gap.
- It's defensibly original content (good for AdSense "thin content" avoidance) and reusable
  across both blog guides and tool pages.

## 2. How content embeds custom components today (investigation findings)

MDX is rendered by `next-mdx-remote/rsc` in **two** places, each with its own `components`
map that must be kept in sync:

- `src/app/components/ToolArticle.tsx` — the on-tool article. Map includes `AdBanner`,
  `ToolEmbed` (stubbed to `null` here), `MdxChart`, `YouTube`, `RegionalNote`, `img`, heading/
  paragraph/list/table styling, and `...mdxTableComponents`.
- `src/app/[locale]/blog/[slug]/page.tsx` — the standalone blog post. Same set, but
  `ToolEmbed` is the real dynamic-import embedder.

Key facts that shape the design:
- **A new component must be registered in BOTH maps** (or a shared `mdxComponents` module —
  see §10 nice-to-have) or it renders as literal text in one context.
- **Client components work inside RSC MDX.** `MdxChart.tsx` is `"use client"` (uses recharts)
  and is imported directly into both server renderers. So a `<PortalGuide>` can carry its own
  interactivity (tab/step switching) as a client island.
- **Props are passed inline in MDX as JSX** (see the `<MdxChart data={[...]} series={[...]}/>`
  pattern). A data-driven portal renderer fits this idiom cleanly.
- `ToolEmbed.tsx` shows the established pattern for a **registry keyed by string** +
  `next/dynamic` lazy import — the natural model for "one module per portal."

### Existing visual / illustration system
- `src/app/components/illustrations/primitives.tsx` + `doodles.tsx`: a deliberately rough,
  monoline **"Notion-doodle"** house style (single `currentColor` stroke, `feTurbulence`
  roughen filter, 300×190 viewBox). `ToolIllustration.tsx` wraps it. This is *decorative*
  and `aria-hidden`.
- `doodle/` (`Squiggle`, `WavyDivider`, `ToolEyebrow`): small hand-drawn accents.
- Design tokens in `src/app/globals.css`: `--primary #0d47a1`, `--surface-color`,
  `--text-primary/secondary`, `--border-color`, `--input-border`, `--warning-*`,
  `--shadow-sm/md`, `--border-radius`, plus a full dark-mode override block. Form primitives
  `.card`, `.form-group`, `.form-label`, `.form-control` are already styled globally.

### i18n / a11y patterns in use
- `next-intl`: `useTranslations("Namespace")` in client components, `getTranslations` in
  server. Strings live in `messages/{en,tl,ceb}.json`; namespace matches component name
  (e.g. existing `"Lgu"` namespace). `LguSelector.tsx` is the reference pattern (labels via
  `t(...)`, `React.useId()` for stable label/control association).
- A11y: real `<label htmlFor>`, focusable native controls, decorative SVG marked
  `aria-hidden`, instructional SVG given `role="img"`. WCAG AAA contrast is enforced; no light
  gray on white.

## 3. Architecture options + recommendation

We want one approach that scales to ~10 portals, stays cheap in author/token cost, and
survives the real portals changing their UI a couple times a year.

### Option A — Config/JSON-driven generic "portal screen" renderer ✅ RECOMMENDED
A single `<PortalGuide>` (+ small set of primitives) renders a portal screen from a **data
object**: a faux browser/app chrome, a list of "fields" (label + sample value), "buttons"/nav
items, and numbered **callout steps** that point at elements. One schema, many portals.

- **Pros:** lowest marginal cost per portal (author data, not JSX/CSS); consistent look,
  a11y, i18n, and legal banner for free; easy to restyle globally; a portal UI change = edit
  a data file + bump an `asOf` date; testable (schema validation).
- **Cons:** the generic renderer must cover enough layout primitives (form rows, nav rail,
  tabs, table, dashboard cards) or some portals look generic; very bespoke screens may need an
  "escape hatch."
- **Token cost:** cheapest over 10 portals — the renderer is written once.

### Option B — Per-portal bespoke React components
One hand-built component per portal (`MySssContributions.tsx`, etc.).

- **Pros:** pixel-faithful; no schema constraints.
- **Cons:** ~10× the code and ~10× the maintenance; styling/a11y/i18n/legal banner re-derived
  each time and drift apart; highest token cost; every portal change is a code change + test +
  review. Poor fit for the "reusable" goal.

### Option C — Annotated static SVG / illustration
Extend the doodle system or hand-draw SVG mockups with numbered annotations.

- **Pros:** matches existing hand-drawn brand; fully static; trivially `aria-hidden` +
  caption.
- **Cons:** **fails the core requirement** that SR users get *real text* (a guide that's an
  image is useless to screen readers and weak for SEO); editing SVG paths per portal change is
  painful; doesn't reuse form tokens. The doodle style also reads as "cute illustration," not
  "this is what the screen looks like," which undercuts the navigational intent.

### Recommendation
**Option A (config-driven renderer)** as the backbone, with a **narrow Option-B escape hatch**:
a `render`/`children` slot on `<PortalGuide>` so a genuinely unusual screen can supply custom
JSX while still inheriting the chrome, legal banner, callout rail, i18n, and a11y wrapper.
This is hybrid **A + targeted B**, and it directly mirrors the existing `ToolEmbed` registry
idiom and the `MdxChart` inline-data idiom the codebase already trusts.

### Visual style decision
Use a **distinct "realistic-lite chrome" style**, NOT the Notion-doodle look — but built from
the **same design tokens** so it themes (light/dark) automatically. Rationale: the doodle
style signals "illustration/decoration"; a guide screen needs to read as "this resembles the
real screen." Keep it deliberately *generic/neutral* chrome (plain browser bar, neutral
surfaces) to avoid trademark issues (§7) and to avoid implying it's a pixel-perfect copy.
Doodle accents (a `Squiggle` under a callout, a hand-drawn arrow) may be used sparingly to
keep brand continuity and reinforce "this is our sketch, not a screenshot."

## 4. Reusable component API sketch

A client component (interactivity for step focus) driven by a typed data object. Lives once,
registered in both MDX maps.

```tsx
// Conceptual shape — not final code.
type PortalChrome = "browser" | "mobile-app"; // faux address bar vs phone frame

type FieldRow = {
  id: string;
  label: string;        // i18n-ready (already-translated string or message key)
  value?: string;       // illustrative sample value, clearly fake (e.g. "₱1,560.00 (example)")
  hint?: string;
  highlight?: boolean;  // visually emphasize (e.g. the AMSC field)
};

type NavItem = { id: string; label: string; active?: boolean };

type Hotspot = {
  step: number;         // numbered callout, drives the rail + the on-screen marker
  targetId: string;     // refers to a FieldRow.id / NavItem.id / region id
  title: string;
  body: string;         // the actual instruction text (real text for SR users)
};

type PortalScreen = {
  id: string;                 // e.g. "contributions"
  title: string;              // screen name shown in chrome ("Contributions")
  url: string;                // faux URL shown in address bar (display-only)
  nav?: NavItem[];            // left rail / top nav of the mock
  fields?: FieldRow[];        // form/detail rows
  table?: { columns: string[]; rows: string[][] }; // optional data grid
  hotspots: Hotspot[];        // numbered steps anchored to elements
};

type PortalGuideData = {
  portal: string;             // "My.SSS Member Portal"
  chrome: PortalChrome;
  officialUrl: string;        // real portal link (required, for the legal banner)
  asOf: string;               // "2026-06-18" — when UI was last verified
  sources: { label: string; href: string }[]; // where we verified the flow
  screens: PortalScreen[];    // one or many screens (a flow)
};

// MDX usage (inline data) OR registry reference:
// <PortalGuide id="my-sss-contributions" screen="contributions" />        // from registry
// <PortalGuide data={ ...inline object... } />                            // ad-hoc
// <PortalGuide id="my-sss-contributions">{/* custom JSX escape hatch */}</PortalGuide>
```

### Behavior
- Renders faux chrome + screen body; each `Hotspot` shows a numbered badge on its target and a
  matching numbered entry in a **steps list rendered as real, ordered text** beside/under the
  screen (this is the SR + SEO payload).
- On tool pages it can sit inside a `<div className="card">`; in MDX it self-wraps.
- Optional `screen` prop to show one screen of a multi-screen flow; default shows all/steps
  through them.
- Interactivity is progressive: with JS, clicking a step focuses its hotspot; **without JS,
  all steps and the screen are fully readable** (no information hidden behind interaction).

### Two embed contexts, one component
- **MDX writeups:** authors drop `<PortalGuide id="..." />` near the relevant explanation.
- **Tool pages (`Client.tsx`):** import `<PortalGuide>` directly (it's a client component) and
  place it above/below the calculator, e.g. SSS contribution calc shows the My.SSS
  Contributions screen so users know where their AMSC comes from.

## 5. File structure

```
src/app/components/portal/
  PortalGuide.tsx            # the generic renderer (client component)
  PortalChrome.tsx           # faux browser/app frame primitive
  PortalField.tsx            # labeled field row primitive
  PortalCalloutRail.tsx      # numbered steps list (the real-text SR payload)
  LegalBanner.tsx            # "unofficial illustrative recreation" banner (§7)
  registry.ts                # id -> data module map (mirrors ToolEmbed registry idiom)
  types.ts                   # PortalGuideData etc.
  data/
    my-sss.ts                # one module per portal
    virtual-pagibig.ts
    bir-2307.ts
    ...
  __tests__/                 # schema/shape validation (Vitest)
```

- **One data module per portal**, each default-exporting a `PortalGuideData`.
- `registry.ts` lazy-loads (`next/dynamic` or static import) so unused portals don't bloat any
  one page bundle — same pattern as `ToolEmbed.tsx`.
- Shared primitives (`PortalChrome`, `PortalField`, `PortalCalloutRail`, `LegalBanner`) keep
  every portal consistent and cheap to add.

### Scaling note
Adding portal #N = write `data/<portal>.ts` + register it + (optionally) a localized strings
block. No renderer changes in the common case.

## 6. Authoring navigation steps + keeping in sync

### Authoring model: **data file per portal** (not inline MDX), referenced by id
- Steps/screens live in `data/<portal>.ts`, authored once, reused by every writeup and tool
  that references the id. Inline MDX data is allowed for one-off ad-hoc screens but is the
  exception (it can't be reused and drifts).
- Why data-file-first: a portal flow (e.g. My.SSS → Contributions) is referenced from multiple
  guides + the SSS tools; centralizing means one edit when the portal changes.

### Freshness discipline (mandatory per portal)
- `asOf: "YYYY-MM-DD"` on every `PortalGuideData`, **rendered visibly** in the mock ("UI as of
  Jun 2026 — the real portal may differ").
- `officialUrl` (real portal link) + `sources[]` (where the flow was verified) required.
- Treat `asOf` like the MDX `updatedAt`/`## Changelog` discipline already mandated in
  `AGENTS.md`/`mdx-editing.mdc`: when a portal changes, update the data file and bump `asOf`.
- Add a lightweight **staleness check** (a script/test that flags any portal whose `asOf` is
  older than ~12 months) so guides don't silently rot. (Mirrors the existing `link-check`
  CI + scripts under `scripts/`.)

## 7. LEGAL / branding guardrails (call out explicitly)

These are **the** gating constraints — get them wrong and it's a trademark/passing-off problem.

- **Always-on disclaimer.** `LegalBanner` renders on every mock, in the user's locale:
  *"Unofficial illustrative recreation by PHTools. Not affiliated with, endorsed by, or
  connected to [Agency]. The real portal may look different — always use the official site."*
  Non-dismissible (or at minimum always present in the DOM for SR users + SEO).
- **No official logos, seals, coats of arms, or wordmark lockups.** Do not reproduce the SSS,
  Pag-IBIG, BIR, LTO, DOLE, BTr, or Meralco logos/seals. Use a neutral generic placeholder or
  the agency's *plain text name* only. (The PH government coat of arms / agency seals carry
  separate legal protections — never render them.)
- **Generic chrome, not pixel-perfect clone.** Deliberately stylized/neutral surfaces reduce
  passing-off risk and make clear it's a sketch, not a screenshot.
- **No real data / no login affordances that look functional.** All values are obviously
  illustrative ("example"); no fields that could be mistaken for a real login.
- **Link to the real portal** prominently (`officialUrl`) so users always reach the genuine
  site.
- **No trademarks in URLs/titles implying affiliation.** Keep our routes/titles descriptive
  ("How to find your AMSC on My.SSS"), not impersonating.
- **Decision to confirm with user:** whether to also add a short site-wide
  `/disclaimer`-style note. (Open question §9.)

## 8. Accessibility, i18n, responsive

- **A11y (decorative-but-instructional):** the *instruction text* is real DOM text in an
  ordered list (`PortalCalloutRail`), not baked into an image — this is the primary SR
  experience. Numbered on-screen badges get `aria-label`s tying them to their step. Purely
  decorative chrome flourishes are `aria-hidden`. Native focusable elements only; full keyboard
  operability; visible focus; no info hidden behind hover/JS-only interaction. Maintain WCAG
  AAA contrast (reuse tokens; no light gray on white).
- **i18n:** namespace per portal component (e.g. `"PortalGuide"` shared chrome strings +
  per-portal namespaces like `"PortalMySss"`); labels/values/steps authored in `en.json` then
  translated to conversational Taglish (`tl.json`) and Bisaya (`ceb.json`) per
  `CONVERSATIONAL_GUIDE.md`. Field *labels* should mirror the real portal's English labels
  (users see English on the real site) while the *instructions/callouts* are Taglish/Bisaya —
  decide this convention explicitly (§9).
- **Responsive:** browser-chrome mock collapses gracefully on mobile (stack screen above the
  steps rail); `mobile-app` chrome renders as a phone frame. Use existing flex/`card` patterns;
  no fixed pixel widths that overflow small screens.

## 9. Portal → existing tool/writeup mapping

| Portal | Existing tools | Existing writeups (`src/content/blog`) |
|---|---|---|
| **My.SSS Member Portal** | `sss-contribution-calculator`, `sss-pension-calculator`, `sss-maternity-benefit-calculator` | `how-to-compute-sss-pension`, `sss-contribution-table-2026`, `sss-maternity-benefit-guide` |
| **Virtual Pag-IBIG / MP2** | `pagibig-calculator`, `pagibig-mp2-calculator`, `pagibig-foreclosed-roi-calculator` | `pagibig-mp2-dividend-calculator`, `pagibig-contribution-table-2026`, `pagibig-foreclosed-property-roi` |
| **Pag-IBIG Housing Loan Affordability** | `pagibig-affordability-calculator` | `pagibig-housing-loan-affordability-guide` |
| **BIR (eFPS / ORUS / 2307 / 2316)** | `income-tax-calculator`, `freelance-tax-calculator`, `bir-withholding-tax-calculator`, `bir-donors-tax-calculator`, `tax-refund-calculator`, `gross-from-tax-calculator` | `bir-withholding-tax-guide`, `income-tax-brackets-2026`, `tax-refund-guide`, `upwork-freelance-tax-guide`, `salary-tax-deductions-guide` |
| **DOLE Workers' Statutory Monetary Benefits** | `13th-month-pay-calculator`, `holiday-calculator`, `overtime-pay-calculator`, `final-pay-calculator`, `separation-pay-calculator`, `backpay-calculator` | `how-to-compute-13th-month-pay`, `philippine-holiday-pay-rules`, `philippine-overtime-holiday-pay-guide`, `final-pay-guide`, `philippine-separation-pay-guide` |
| **LTO registration / ORUS** | `lto-registration-fee-calculator`, `lto-penalty-calculator` | `lto-registration-renewal-guide`, `lto-late-registration-penalty` |
| **Meralco bill + Appliance Calculator** | `electric-bill-calculator` | `meralco-electric-bill-guide` |
| **Bureau of the Treasury RTB / digital bank apps** | `retail-treasury-bond-calculator`, `digital-bank-calculator` | `retail-treasury-bond-guide`, `digital-banks-philippines-interest-rates` |

## 10. Phased rollout

### Phase 0 — Foundation (build once)
- `types.ts`, `PortalChrome`, `PortalField`, `PortalCalloutRail`, `LegalBanner`, `PortalGuide`,
  `registry.ts`, register in **both** MDX maps. Add the `"PortalGuide"` i18n namespace.
- **Nice-to-have refactor:** extract a single shared `mdxComponents` module imported by both
  `ToolArticle.tsx` and `blog/[slug]/page.tsx` so future MDX components are registered once.
- Vitest schema-shape test + an `asOf` staleness check script.
- *Effort:* ~1.5–2.5 days (the renderer + primitives + plumbing are the bulk of total cost).

### Phase 1 — Pilot 3 portals (highest user value)
1. **My.SSS → Contributions** (find your AMSC) — feeds `sss-contribution-calculator` +
   `sss-pension-calculator`; the AMSC "where do I find this number" question is our #1 gap.
2. **Virtual Pag-IBIG → MP2 enrollment / dividends** — feeds `pagibig-mp2-calculator`;
   high-intent, frequently asked "how do I open MP2."
3. **BIR Form 2307 (creditable withholding)** — feeds `bir-withholding-tax-calculator` +
   `upwork-freelance-tax-guide`; freelancers constantly struggle to read 2307.
- *Effort:* ~0.5–1 day per portal *after* Phase 0 (author data module + 3-language strings +
  wire into 1 writeup + 1 tool + verify flow against the live portal). Pilot total ~2–3 days.

### Phase 2 — Remaining portals
- LTO ORUS, DOLE WSMB, Meralco (+ appliance), Pag-IBIG Housing Affordability, BTr RTB /
  digital banks, BIR eFPS/ORUS/2316. Roughly ~0.5–1 day each; batch by agency.

## 11. Risks / open questions for the user

1. **Visual fidelity vs. legal safety (biggest tradeoff).** How close to the real UI do we go?
   Recommendation: *neutral/generic chrome* (clearly a recreation) over pixel-perfect. Confirm
   you're comfortable trading fidelity for lower trademark risk.
2. **Label language convention.** Mirror the real portal's *English* field labels (so the mock
   matches what users actually see) while writing *callouts/instructions* in Taglish/Bisaya?
   Or fully localize everything? Recommendation: English labels + localized instructions.
3. **Disclaimer placement.** Per-mock `LegalBanner` only, or also a site-wide
   disclaimer/`/disclaimer` page? Recommendation: per-mock banner (always present) is the
   minimum; site-wide page optional.
4. **Maintenance burden acceptance.** ~10 portals × periodic UI drift = ongoing upkeep. The
   `asOf` + staleness-check discipline mitigates but doesn't eliminate it. OK to commit to that?
5. **Scope of interactivity.** Static numbered screens only, or clickable step-through "wizard"
   walkthroughs? Recommendation: start static-with-progressive-focus (Phase 1), revisit
   wizards later if engagement justifies it.

## 12. Recommended decisions summary

- **Architecture:** config/JSON-driven `<PortalGuide>` renderer (Option A) + a narrow custom-JSX
  escape hatch; registry + per-portal data module, mirroring `ToolEmbed`/`MdxChart` idioms.
- **Style:** distinct neutral "realistic-lite" chrome built from existing design tokens (themes
  for dark mode); sparing doodle accents — NOT the full Notion-doodle look.
- **Pilot:** My.SSS Contributions (AMSC), Virtual Pag-IBIG MP2, BIR Form 2307.
- **Guardrails:** always-on unofficial-recreation banner, no logos/seals, link to official
  portal, illustrative-only data, `asOf` + sources on every portal.
