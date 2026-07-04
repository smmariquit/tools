# PHTools: Full UX Audit (64 tools)

Read-only audit of every calculator/generator under `src/app/[locale]/`, scored across 10 UX dimensions in 6 batches. Lenses (in priority order set with the user): **AdSense/E-E-A-T, Accessibility (WCAG AAA), Conversion/clarity, i18n parity, Mobile**.

Audit date: 2026-06-18. Method: 6 parallel read-only explore passes, each scoring 0 (missing) / 1 (partial) / 2 (good) per dimension with `file:line` evidence.

---

## Executive summary

The tools are mathematically solid and share a clean scaffold, but UX quality is **uneven and driven almost entirely by a handful of shared components**. Fix those once and a majority of issues across all 64 tools resolve simultaneously.

The headline numbers:

| Issue | Tools affected | Lens |
|---|---|---|
| No share/copy-link button (only `salary-calculator` has one) | 63 / 64 | Conversion |
| Fully English client UI (no `useTranslations`) | ~38 / 64 | i18n |
| Missing `JSON-LD` structured data | ~36 / 64 | AdSense/SEO |
| No breadcrumbs anywhere | 64 / 64 | Wayfinding |
| Numeric inputs missing bounds-aware placeholders + `step="any"` | ~55 / 64 | Conversion/clarity |
| `InteractiveSlider` range input has no accessible name | ~25 / 64 (every slider tool) | A11y |
| Recharts charts with no screen-reader data fallback | ~14 / 64 | A11y |
| Misleading pre-input results (shows ₱0 / 0% / FAILED before input) | ~9 / 64 | Conversion + trust |
| **Overstated/false claims in copy (E-E-A-T + AdSense risk)** | ~7 / 64 | **AdSense** |

**The single highest-use fact:** ~25 tools render numeric input through one component, `InteractiveSlider.tsx`, and ~36 tools route their header/back/ad through `ToolHeader.tsx` + `BackButton.tsx`. Central fixes there cascade everywhere.

---

## Systemic findings, ranked by impact × effort

### Tier 1: Quick wins (central, low effort, high blast radius)

1. **`InteractiveSlider` range input has no accessible name.** The `<label htmlFor>` ties only to the number box; the `type="range"` is invisible to screen readers in every slider-based tool. Add `aria-label`/`aria-labelledby` to the range. One file, ~25 tools fixed. *(A11y: WCAG AAA)*: `src/app/[locale]/components/InteractiveSlider.tsx:60-76`
2. **`InteractiveSlider.formatValue` is accepted but never rendered.** Multiple tools pass `formatValue` (currency, "Year N", "N pax") expecting formatting; the number box shows a raw integer. Wire it in. Fixes the "naked number" complaint and the currency-formatting gap at once.: `InteractiveSlider.tsx:77-102`
3. **Undefined `, text-tertiary` token** used for input hints in 4 tools → hint text renders with no/again-undefined color (contrast risk). Define it in `globals.css` at a WCAG-AAA-safe value (or replace usages with `, text-secondary`).: `gsis-pension`, `separation-pay`, `pagibig-affordability`, `freelance-rate` Clients; token absent from `src/app/globals.css`
4. **Canonical-domain mismatch (SEO bug).** 9 pages hardcode `https://phtools.com/...` canonicals while `metadataBase` and the sitemap are `phtools.me`. Canonicals point at a domain the site doesn't serve. Fix the 9 `.com` → `phtools.me`. *(AdSense/SEO)*: `pagibig-mp2`, `tax-optimizer`, `overtime-pay`, `pagibig-affordability`, `freelance-rate`, `digital-bank`, `backpay`, `separation-pay`, `sss-pension` `page.tsx:18`
5. **Dead/mismatched source keys in `ToolFooter`.** A stale `/sss-maternity-calculator` key (duplicate of the working `/sss-maternity-benefit-calculator` key) and an `/inflation-calculator` key (no such tool) were dead clutter. Removed.: `src/app/components/ToolFooter.tsx`
6. **`www` vs non-`www` split**: sitemap/og use `www.phtools.me`, `metadataBase` uses `phtools.me`. Pick one host and align (affects canonical/OG correctness).: `sitemap.ts:5`, `layout.tsx:32,44`

> **Re-check notes:**
> - `BackButton` was initially flagged for a missing `aria-label`, but on inspection its visible text children (e.g. "Back to Tools") already provide an accessible name and the arrow is `aria-hidden`. No change needed unless a caller ever renders it icon-only.
> - `motorcycle-loan-calculator` points `ToolPageBottom` at the **car-loan** guide slug, but **no motorcycle guide MDX exists**: so this is content authoring (Tier 2/3), not a slug swap. Until a motorcycle/"hulugan" guide is written, the tool shows a car-centric article.

### Tier 2: High impact, medium effort (per-tool but mechanical)

9. **i18n backfill (~38 tools fully English).** Wire `useTranslations` in the client and `getTranslations` in metadata. Biggest EN/TL/CEB parity gap; also affects the hardcoded `ToolHeader` titles and `PrintButton` label. Worst offenders: `holiday`, `final-pay`, `kasambahay-payroll`, `kasambahay-retirement`, `income-tax`, `philhealth`, `sss-contribution`, all of Batch 6 except `digital-bank`.
10. **Add `JSON-LD` (`SoftwareApplication`/`WebApplication`) to the ~36 tools missing it.** Direct E-E-A-T/rich-result signal for AdSense. Pattern already exists in `salary-calculator/page.tsx`.
11. **Bounds-aware placeholders + `step="any"` on free numeric inputs (~55 tools).** Project rule (`CLAUDE.md`) currently honored inconsistently. Many sliders use coarse fixed steps (`1000`, `50000`) blocking precise entry.
12. **Add a real share/copy-link affordance** (Web Share + clipboard fallback): promote `salary-calculator`'s `handleShare` into a shared `ShareButton` and drop it into `ToolLayout`/`ToolHeader`. URL state already exists on ~35 tools, so links are shareable; users just can't trigger it.
13. **Standardize on `ToolHeader`.** ~14 tools hand-roll a `BackButton` + illustration + `<h1>` stack (some skipping `AdBanner` entirely, e.g. `lto-registration`, `sss-maternity-benefit`). Divergence breaks ad placement and consistency.

### Tier 3: Correctness/trust bugs (small count, high stakes for AdSense)

14. **Overstated or false claims (review as content-policy risk):**
 - `digital-ticket-generator`: copy says "cryptographically signed" / "secure QR" but output is a placeholder box and a mock `btoa` hash: no real QR.: `Client.tsx:12-19,59-86`
 - `legal-contract-generator`: metadata advertises "Lease Agreements, Promissory Notes"; only a promissory-note template exists, and there's no copy/download of the result.: `page.tsx:7-8`, `Client.tsx:18-37,103-118`
 - `civil-service-reviewer`: subtitle claims "progress saved locally" and "flashcards"; neither exists.: `Client.tsx:48-50`
 - `shipping-logistics-estimator`: presents a mock rate matrix as real with no disclaimer.: `Client.tsx:14-20`
 - `id-photo-maker`: OG claims "processed securely on device" but there's no in-tool privacy note.: `page.tsx:9`
 - `toll-calculator`: failed matrix lookups silently become `₱0.00`.: `Client.tsx:131-134,502`
 - `lto-registration-fee-calculator`: collects "Plate Middle Digit (Week)" but never uses it.: `Client.tsx:14,119-123`
15. **Misleading pre-input results** (compute on defaults, showing scary/wrong zero-states before the user types):
 - `prc-board-exam-rating`: shows `0%` + **FAILED** on load.: `Client.tsx:99`
 - `gwa-calculator`: empty semester shows `0.0000`.: `Client.tsx:265`
 - `qpi-gpa`: deleting all rows → `0.000` (also allows deleting the last row).: `Client.tsx:193`
 - `philhealth-calculator`: at `salary=0` the first bracket row is falsely highlighted.: `Client.tsx:260`
 - `invoice-factoring`: `daysOutstanding=0` → divide-by-zero APR.: `Client.tsx:69-70`
 - also `sss-pension` (₱0 when `cys<10`), `kasambahay-retirement` (<5yr), `de-minimis` (always ₱0).
16. **Non-token result colors** (`#4caf50`, `#f44336`, raw `red`) instead of WCAG-AAA tokens (`#1b5e20`, `#b71c1c`) in `overtime`, `sss-pension`, `digital-bank`, `pdic`, `philhealth-late`. *(A11y + brand consistency)*

### Tier 4: Larger projects

17. **Breadcrumbs** (`Home › Category › Tool`) across all tools: wayfinding + breadcrumb JSON-LD for SEO. None exist today.
18. **Screen-reader fallback for Recharts** (visually-hidden data table) on ~14 chart tools, plus fix dark-mode `labelStyle: color:"black"` tooltips (`pagibig-mp2`, `digital-bank`).
19. **Interactive maps are click-only** (`ExpresswayMap`, `RouteSelectorMap`): no keyboard/focus/`aria`; ~8px tap targets. Keyboard + ARIA pass needed. *(A11y + mobile)*
20. **Mobile: fixed multi-column grids** that bypass `.tool-grid`'s 768px stack (`de-minimis`, `influencer`, `ZonalTaxCalculator`, `gwa`/`qpi` repeaters, `food-cost` ingredients, `electric-bill` appliances, `sss-maternity` MSC grid). Tables also lack a global overflow wrapper.
21. **Retire the "double number" slider** per the earlier plan (consolidate range + number into one labeled control); folds into the Tier-1 `InteractiveSlider` work.
22. **De-duplicate URL-state logic**: `useCalculatorState` vs hand-rolled `updateUrl` in ~10 tools.

---

## Per-tool matrix

Score = count of dimensions rated **2 (good)** out of 10. "Top fix" is the single highest-impact change per tool. Dimensions: 1 Clarity · 2 Input · 3 Slider · 4 Results · 5 Share · 6 Wayfinding · 7 A11y · 8 Mobile · 9 i18n · 10 Consistency/trust.

### Batch 1: Labor & Pay
| Tool | Notable gaps | Top fix |
|---|---|---|
| salary-calculator | header/share/i18n partial; no bracket table; share btn no aria | Wire header/share through i18n; add highlighted TRAIN bracket table |
| bpo-night-differential | **triple** salary display; big English blocks; timeline color-only | Remove triple display; finish i18n |
| overtime-pay | no JSON-LD/OG; no DOLE table; non-token green | Add JSON-LD+OG and multiplier table |
| holiday-calculator | fully English; no `step`/placeholders; custom header; mis-categorized | Full i18n pass |
| budget-calculator | default expense names English; unlabeled expense rows | Translate labels; label expense inputs |
| 13th-month-pay | no placeholders/`step="any"`; custom header | Adopt `ToolHeader`; fix inputs |
| backpay-calculator | no JSON-LD/OG; TipCard English; ₱0 empty state | i18n TipCard; add JSON-LD+OG |
| final-pay-calculator | 100% English; inputs unlabeled; no URL state; proration mislabeled | i18n + label inputs + URL state |
| separation-pay | no JSON-LD; `, text-tertiary`; no reason→multiplier table | Add reason→multiplier table; fix hint contrast |
| kasambahay-payroll | 100% English; unlabeled input; no JSON-LD/URL | i18n + URL + MSC table |
| kasambahay-retirement | 100% English; computes <5yr silently | Warn sub-5yr; i18n |
| freelance-rate | `, text-tertiary`; TipCard English; no JSON-LD | Fix hint token; add JSON-LD+OG |

### Batch 2: Tax & Property
| Tool | Notable gaps | Top fix |
|---|---|---|
| income-tax | fully English; no bracket-highlight table; pie no SR | i18n + interactive TRAIN table |
| gross-from-tax | `formatValue` unused; no JSON-LD; range unlabeled | Render formatValue; add JSON-LD+OG |
| freelance-tax | fully English; PHP-mode skips URL sync | Fix PHP URL sync; i18n |
| tax-optimizer | hardcoded "Best"/"VAT" strings; no JSON-LD | Localize leftovers; bracket table |
| de-minimis | fully English; fixed 2-col grid; unlabeled inputs | i18n + URL state |
| bir-donors-tax | fully English; generic placeholders; no URL | i18n + URL state |
| estate-tax | fully English; no JSON-LD | JSON-LD + i18n + cap placeholders |
| tax-refund | fully English; no bracket table; no JSON-LD | Highlighted TRAIN bracket table |
| bir-withholding | hardcoded VAT radios/reminder; no JSON-LD | Finish i18n on VAT block |
| amilyar | fully English; custom header; no assessment table | i18n + assessment-level table |
| zonal-value (hub+drilldown) | locale-less links; non-clickable breadcrumb; local-only state; no AdBanner/JSON-LD; fixed grid | Locale-aware links, mobile stack, URL-persist inputs |
| architectural-fee | fully English; no UAP rate matrix | i18n + UAP matrix |
| customs-brokerage | fully English; no CAO bracket table | Highlighted CAO 1-2001 table |
| influencer-rate | fully English; hardcoded FX=56; no JSON-LD | Editable FX + tier table |

### Batch 3: Government Contributions
| Tool | Notable gaps | Top fix |
|---|---|---|
| sss-contribution | fully English; chart layout shift; MSC table cramped | i18n + SR summary for active MSC row |
| sss-pension | no JSON-LD/OG; ₱0 when cys<10; non-token green | Add JSON-LD+OG; explicit ineligible state |
| sss-maternity-benefit | fully English; no URL state; **no AdBanner**; no back | URL params + AdBanner + ToolHeader |
| gsis-pension | `, text-tertiary`; no JSON-LD | Fix hint token; add JSON-LD+OG |
| philhealth | fully English; false bracket highlight at ₱0; custom header | Fix highlight at 0; i18n + ToolHeader |
| philhealth-late | fully English; raw `red`; no URL/JSON-LD | URL persistence + inline source disclaimer |
| pagibig-calculator | fully English; mixes contribution+MP2; layout shift | i18n; split/tab the two modes |
| pagibig-mp2 | dark-mode tooltip contrast; no JSON-LD; no year table | JSON-LD+OG; accessible year table |
| pagibig-affordability | `, text-tertiary`; no JSON-LD; no amortization table | JSON-LD/OG + amortization table |
| pagibig-foreclosed-roi | fully English; custom header | i18n + ToolHeader |

### Batch 4: Loans, Vehicles & Transport
| Tool | Notable gaps | Top fix |
|---|---|---|
| car-loan | raw-range triple display; schedule no highlight; chart labels English | Bounds placeholders+`step="any"`; highlight amortization |
| motorcycle-loan | no amortization/JSON-LD/OG; **wrong blog slug** | Add amortization+JSON-LD; fix slug |
| home-loan | raw-range redundancy; term options English; schedule hidden | i18n options; highlight schedule |
| lto-registration-fee | fully English; **unused plateMiddle**; no URL; no AdBanner | i18n + remove/wire plateMiddle + URL |
| lto-penalty | fully English; manual header dup | i18n + adopt ToolHeader |
| toll-calculator | **no matrix in UI; silent ₱0**; map click-only; fully English | Render matrix w/ active route; persist legs to URL |
| fuel-cost | fully English; `alert()` errors; map fixed height | i18n + bounds placeholders |

### Batch 5: Education, Exams & Utilities
| Tool | Notable gaps | Top fix |
|---|---|---|
| gwa-calculator | fully English; `0.0000` empty state; repeater no URL; fixed grid | Fix empty state; i18n + URL for rows |
| prc-board-exam-rating | **0%/FAILED before input**; no JSON-LD; no aria-live | Treat missing scores as empty state |
| latin-honors | school options English; range unlabeled; no JSON-LD | i18n school options |
| dost-stipend | `formatValue` English ("Year N"); no JSON-LD | i18n slider formatValue |
| ched-scholarship | no JSON-LD | Add JSON-LD |
| qpi-gpa | delete-all → 0.000; grade options English; no URL | Block delete below 1 row; persist to URL |
| civil-service-reviewer | **false "saved locally"/flashcards claim**; fully English; mis-categorized | Remove/implement the claim; i18n |
| electric-bill | fully English; appliance repeater no URL; unlabeled name field | i18n + URL-sync repeater |
| dfa-age | no JSON-LD; results not aria-live; horizontal age display | Stack age display on mobile |
| bill-splitter | `formatValue` English ("N pax"); no JSON-LD | i18n pax format |

### Batch 6: Business, Investing, E-commerce & Generators
| Tool | Notable gaps | Top fix |
|---|---|---|
| digital-bank | best in batch; bank names English; non-token colors; no JSON-LD | Add OG/JSON-LD + bounds placeholders |
| pdic-insurance | fully English; unlabeled inputs; raw red; no URL/JSON-LD | i18n + bound-aware placeholders |
| retail-treasury-bond | fully English; no URL; no JSON-LD | i18n + URL persistence |
| gotrade-vs-ibkr | fully English; assumptions hidden in code; no URL | Surface fee assumptions; URL sync |
| shopee-lazada-fee | fully English; custom header; toggles no aria-pressed | ToolHeader + i18n + placeholders |
| food-cost | fully English; native range redundancy; fixed grids | i18n + stack ingredient grids |
| shipping-logistics | **mock matrix undisclosed**; fully English; no URL | Visible "estimate/mock" disclaimer + i18n |
| invoice-factoring | **÷0 APR at days=0**; fully English; gated on disclaimer | Guard days=0; i18n |
| id-photo-maker | `alert()` errors; canvas no SR name; **privacy claim, no note** | Inline error UI + visible local-processing note |
| legal-contract-generator | **template list overpromised**; no copy/download | Add copy/download; align templates with metadata |
| digital-ticket-generator | **fake QR + "cryptographically signed" claim**; no download | Implement real QR/download or remove claims |

---

## Recommended sequencing

1. **Tier 1 quick wins** (this session): `InteractiveSlider` a11y + `formatValue`, `, text-tertiary` token, `BackButton` aria, `.com→.me` canonicals, `ToolFooter` dead source keys, motorcycle slug. ~6 files, fixes cascade to dozens of tools.
2. **Tier 3 correctness/trust** next: small count but these are the items most likely to sink an AdSense re-review (false "secure/signed" claims, undisclosed mock data, scary pre-input results).
3. **Tier 2 mechanical backfill** as batched subagent passes (i18n, JSON-LD, placeholders, share button, ToolHeader standardization): one batch at a time with lint+build gates.
4. **Tier 4 projects** (breadcrumbs, chart SR fallback, map keyboard a11y, mobile grids) scoped individually.

## Source agents
Batch findings (full per-dimension detail with line numbers) came from six read-only audit passes; this file is the consolidation.
