# PHTools Project Guidelines

This file contains the specific context and technical rules for developing the PHTools repository. When assisting with this project, you must adhere to these constraints to minimize technical debt, ensure accurate calculations, and maintain Google AdSense compliance.

## 0. CORE DIRECTIVES
### Auto-Updating Knowledge
Whenever you (the AI) and the user agree on a new architectural decision, learn a new constraint, or add a major system (like a CMS or Analytics), **you MUST autonomously update this `CLAUDE.md` and the `README.md`**. Never wait for the user to ask you to document it. Keep the brain in sync.

### CAVEMAN MODE (Token Compression)
To save API costs, YOU MUST ADOPT CAVEMAN MODE for all future interactions:
- "Why use many token when few token do trick."
- Drop articles (a, an, the).
- Drop pleasantries, preambles, and postambles ("I'd be happy to help", "Here is the code").
- Keep technical terms and code identical.
- Output ONLY what is necessary to complete the task.

### OFFICIAL LIVE DATA SOURCES
To prevent outdated legal/tax math, verify data against these official sources when updating calculators:
- Income/Freelance Tax: `bir.gov.ph` (TRAIN Law RA 10963)
- SSS Contributions: `sss.gov.ph`
- PhilHealth Contributions: `philhealth.gov.ph`
- Pag-IBIG / MP2: `pagibigfund.gov.ph`
- Toll Rates: `trb.gov.ph` (Toll Regulatory Board)
- 13th Month / Holiday Pay: `dole.gov.ph` (P.D. 851, Labor Code)
- LTO MVUC Fines: `lto.gov.ph`

## 1. Tech Stack & Architecture
- **Framework:** Next.js 15+ (App Router).
- **SEO & Component Architecture (CRITICAL):** Next.js forbids exporting `metadata` from `"use client"` components. Therefore, ALL tools must follow this strict split:
  1. `page.tsx`: Must be a pure Server Component that exports static `metadata`, injects `application/ld+json` schema for rich snippets, and renders `<Client />`.
  2. `Client.tsx`: Must contain the `"use client"` directive, `AdBanner`, and all React state/business logic.
- **i18n Architecture Rule:** Always implement Internationalization (i18n) before mass-producing pages or blog content. Retrofitting `[locale]` dynamic routing into a massive existing project creates massive technical debt.
- **State Management:** Use standard React `useState`. For complex, multi-step tools, use URL Search Params so the tool state is shareable/bookmarkable.
- **Analytics & A/B Testing:** DO NOT implement custom databases or NextAuth. We use **PostHog** (`providers.tsx`) for all analytics, session replays, and A/B testing to maintain zero-cost infrastructure and bypass Data Privacy Act (DPA) liabilities.
- **Styling:** **DO NOT USE Tailwind CSS.** Use vanilla CSS with the enterprise design tokens defined in `src/app/globals.css`. 
  - Wrap tool modules in `<div className="card">`.
  - Use `var(--primary)`, `var(--text-secondary)`, etc., for all styling.

## 2. Design System & Accessibility
- The site follows a "2019-era Enterprise" aesthetic—clean, trustworthy, and minimal. Avoid flashy "vibe" animations or modern bloat.
- **WCAG AAA Compliance is strictly enforced.**
  - Primary blue: `#0d47a1`
  - Secondary text: `#3c4043`
  - Red (Deductions): `#b71c1c`
  - Green (Net Income): `#1b5e20`
  - Do not introduce light gray text (`#5f6368` or lighter) against white backgrounds.

## 3. Philippine Domain Knowledge (2026 Standards)
When writing logic for financial calculators, use exact, current Philippine laws. Do not hallucinate tax brackets.
- **SSS (Social Security System):** 15% total rate (10% Employer, 5% Employee). MSC capped at ₱35,000. Excess over ₱20,000 goes to MPF (WISP).
- **PhilHealth:** 5% total rate (split equally between EE/ER). Base floor ₱10,000, ceiling ₱100,000.
- **Pag-IBIG:** 2% employee, 2% employer. Capped at ₱200 each (Total ₱400).
- **Income Tax (TRAIN Law):** First ₱250,000 is tax-exempt. 

## 4. Monetization (AdSense Compliance)
- **Ad Placements:** Every new tool page must import and render the `AdBanner` component (`import AdBanner from "../components/AdBanner";`) above the main grid layout.
- **Legal SEO:** Every tool must feature a comprehensive explanation below the calculator (using `<h2>` and `<h3>` tags) detailing how the computation works. This is required to prevent AdSense "Thin Content" rejections.

## 5. Testing & CI/CD
- **Mathematical Logic:** If you write a new calculator, you MUST write a corresponding unit test in the `__tests__/` directory using Vitest. Extract complex logic into pure functions to make them testable.
- **E2E UI:** Add basic routing checks to `e2e/home.spec.ts` using Playwright when a new tool is added.
- **Commands:** 
  - Lint: `npm run lint`
  - Test: `npm run test:ci`
  - Run both locally before pushing to `main` to prevent the Vercel GitHub Action from failing.
