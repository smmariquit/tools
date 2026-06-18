---
name: phtools-content-voice
description: >-
  Write and rewrite PHTools tool articles and blog guides (src/content/blog/*.mdx)
  in a human, subject-expert voice that survives AdSense quality review. Use when
  authoring or editing any MDX guide, writing tool explanation/FAQ content, or when
  the user mentions the writing audit, AI-sounding copy, citing Philippine laws, or
  making content "feel human."
---

# PHTools Content Voice

The blog MDX files in `src/content/blog/` are dual-purpose: they render at `/blog/[slug]` **and** as the explainer article under the matching calculator (via `ToolArticle`). One rewrite fixes both surfaces. Reference standard already written in this voice: `salary-tax-deductions-guide.mdx`, `income-tax-brackets-2026.mdx`, `how-to-compute-sss-pension.mdx`.

## The voice: five fixes that kill the "AI smell"

1. **Convert label-bullets back to prose.** `You pay: 5% / Employer pays: 10%` is data, not writing. Say it in a sentence with the *why*. Keep lists only for genuine reference data (bracket tables, multiplier matrices) and prefer a Markdown table for those.
2. **No em dashes.** Use commas, periods, parentheses, or semicolons. This is the single loudest tell.
3. **Ramble like an expert.** Each section volunteers the one edge case a practitioner actually cares about, often with a concrete peso scenario. Examples that worked: the binding ₱35,000 SSS MSC ceiling, the PhilHealth ₱10,000 floor catching probationary hires, the marginal-bracket myth, the AMSC "last 5 years" asymmetry, separation pay applying only to authorized causes.
4. **No brochure CTAs.** Delete "Stop Guessing, Start Calculating," "Instant Accuracy / Zero Privacy Risk / Mobile Optimized," and exclamation-mark enthusiasm. Link to the tool plainly inside a sentence.
5. **First-person solo-dev authority + a humble close.** Write as someone who reads the primary sources and builds the tool. Do **not** invent a backstory (no fictional payroll-manager job). End with a quiet correction note: if a number is wrong, that is on me, tell me (link `/about`).

Tone target: how sweldoph.com and lawyers write. Nuance over symmetry. Professional, not peppy.

## Cite laws and data with verified, live links

Whenever you name a specific law, rate, or figure, hyperlink the primary source, and confirm it returns HTTP 200 before committing. Verify with:

```bash
curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 -A "Mozilla/5.0" "<url>"
```

**Use lawphil.net for statutes (reliable 200). Avoid linking `officialgazette.gov.ph` and `dole.gov.ph` as citations: both bot-block (403), so they cannot be verified.** For DOLE topics, cite the Labor Code on lawphil (it is the primary source anyway).

Verified citation table (re-check before reuse):

| Topic | Law | Verified URL |
|---|---|---|
| Income tax brackets, 8% option | TRAIN Law (RA 10963) | https://lawphil.net/statutes/repacts/ra2017/ra_10963_2017.html |
| SSS contributions & pension | Social Security Act (RA 11199) | https://lawphil.net/statutes/repacts/ra2019/ra_11199_2019.html |
| PhilHealth premiums | Universal Health Care Act (RA 11223) | https://lawphil.net/statutes/repacts/ra2019/ra_11223_2019.html |
| 13th month pay | PD 851 | https://lawphil.net/statutes/presdecs/pd1975/pd_851_1975.html |
| Pag-IBIG | HDMF Law (RA 9679) | https://lawphil.net/statutes/repacts/ra2009/ra_9679_2009.html |
| Overtime, holiday, final pay, separation | Labor Code (PD 442) | https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html |
| Maternity | RA 11210 | https://lawphil.net/statutes/repacts/ra2019/ra_11210_2019.html |
| Retirement pay | RA 7641 | https://lawphil.net/statutes/repacts/ra1992/ra_7641_1992.html |
| Kasambahay | RA 10361 | https://lawphil.net/statutes/repacts/ra2013/ra_10361_2013.html |

Agency homepages (200, fine for "live schedule" links): `bir.gov.ph`, `sss.gov.ph`, `philhealth.gov.ph`, `pagibigfund.gov.ph`. Keep the 2026 rates accurate per `CLAUDE.md` Section 3.

## MDX mechanics

- **Tables work** because both `MDXRemote` renderers (`ToolArticle.tsx`, `blog/[slug]/page.tsx`) pass `remarkPlugins: [remarkGfm]` and define themed `table`/`th`/`td`. Use standard GFM pipe tables for reference data.
- **Frontmatter** must use `description` (not `excerpt`); it is read by `src/lib/mdx.ts` and shown as the subtitle and in SEO. Keep `title` and `date`.
- **Edited date + changelog are mandatory on every edit** (see `.cursor/rules/mdx-editing.mdc`): set `updatedAt: "YYYY-MM-DD"` to today, and prepend a dated one-line entry to a `## Changelog` section kept as the last section of the file (newest first, never delete past entries, h2 not `###`).
- **Visuals where applicable:** use `<MdxChart type="bar|line|area|pie" data={[...]} x="name" series={[{key,label,color}]} valuePrefix="₱" caption="..."/>` (registered in both renderers; colors accept tokens `primary`/`green`/`red`/`amber`/`teal`/`indigo` or hex) and standard markdown images. Don't force a chart where prose is clearer.
- **Authority signal where credible:** outbound credibility reads as human expertise. Where genuinely warranted, embed a real authority's explainer with `<YouTube id="<11-char-id>" title="..."/>` (privacy-friendly, lazy, registered in both renderers), recommend a real book with a one-line personal aside, or link a complementary tool with a short "kudos to the devs" note. Verified, real items only, pulled from `research/deep-research-authority-prompt.md` output; never fabricate a video ID, ISBN, or channel, and don't force one onto every article.
- **`## Sources` is mandatory and always last before `## Changelog`:** list the primary references as live links (verify HTTP 200). This consolidates the inline citations into one authority block.
- **No leading `# H1`** in the body. `ToolArticle` already renders the title as an `h2`; a body H1 duplicates it.
- **`<AdBanner dataAdSlot="..." />`** stays: place ~2 per article between sections (required for AdSense, per `CLAUDE.md` Section 4).
- **`### headings` auto-generate FAQ JSON-LD.** Phrase a few as the real questions people ask, with a natural-prose answer underneath. Good for E-E-A-T.
- **Internal tool links** are root-relative without locale prefix (e.g. `/salary-calculator`). Verify the route dir exists at `src/app/[locale]/<slug>/page.tsx`.
- Follow `AGENTS.md`: any user-facing UI text needs i18n, but MDX guide bodies are content, not UI strings.

## Article skeleton

```
---
title: "..."
description: "Human, specific, keyword-aware. Not a generic blurb."
date: "YYYY-MM-DD"
---

[Opening: a concrete scenario or the one misconception this guide fixes. First person.]

<AdBanner dataAdSlot="..." />

## [Section framed as an insight, not a label]
[Prose with the why and one expert edge case. Hyperlink the governing law.]

<AdBanner dataAdSlot="..." />

### [A real question someone asks]
[Prose answer.]

[A chart/image where it genuinely clarifies, e.g. <MdxChart .../>]

[Humble correction-note close, link /about.]

* [Related Tool 1](/...)
* [Related Tool 2](/...)
* [Related Tool 3](/...)

## Sources
- [Primary law or agency reference](https://lawphil.net/...)
- [Official rate schedule](https://www.sss.gov.ph/)

## Changelog
- **YYYY-MM-DD** — What changed in this edit.
- **YYYY-MM-DD** — Initial publication.
```

## Before / after

Before (AI smell): label-bullets, no source, fake enthusiasm.
> Your SSS contribution is essentially a mandatory pension fund. The rate is **15%**.
> * **You pay:** 5%
> * **Your Employer pays:** 10%

After (this voice): prose, edge case, verified citation.
> Under the [Social Security Act of 2018 (RA 11199)](https://lawphil.net/statutes/repacts/ra2019/ra_11199_2019.html) you carry 5% and your employer 10%. The more useful fact is the ceiling: once your salary crosses ₱35,000 your contribution simply stops growing. I have watched a friend get a ₱6,000 raise and assume payroll erred when their SSS line did not move. It is the binding MSC cap, working as designed.

## Pre-publish checklist

- [ ] Zero em dashes
- [ ] Label-bullets converted to prose (tables kept only for true reference data)
- [ ] Every named law/rate hyperlinked to a verified 200 source (lawphil for statutes)
- [ ] First-person, no invented backstory, humble correction-note close
- [ ] No leading H1; `description` (not `excerpt`) in frontmatter; ~2 `AdBanner`s
- [ ] `updatedAt` bumped to today; new dated entry prepended to `## Changelog`
- [ ] 3 contextually relevant Related Tools links, routes confirmed to exist
- [ ] Relevant chart/image added where it aids understanding (`<MdxChart>` / markdown image)
- [ ] Authority signal added where a verified one exists (`<YouTube>` embed / recommended book / kudos link), never fabricated
- [ ] `## Sources` section present with live (HTTP 200) primary-source links
- [ ] `updatedAt` bumped to today; new dated entry prepended to `## Changelog` (last section)
- [ ] 2026 rates match `CLAUDE.md` Section 3
