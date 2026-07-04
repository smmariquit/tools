# Authority Signals (E-E-A-T): Verified Research Findings

Source of record for the verified YouTube videos, recommended books, and complementary
("kudos") tools embedded into the blog/writeup MDX files under `src/content/blog/`.

Verification date: **2026-06-18**.

## Verification method

- **YouTube videos**: confirmed each 11-char ID exists AND is embeddable via the oEmbed
 endpoint (`https://www.youtube.com/oembed?url=...&format=json` → HTTP `200`). oEmbed
 returning `200` means the video is public and allows embedding (the privacy-friendly
 `<YouTube>` component will load). The oEmbed `author_name` + `title` were captured and
 used to attribute each video **accurately** (several differ from the original brief: see
 the "attribution corrections" notes below).
- **Source / tool links**: `curl -sL -w "%{http_code}"`. Note: `*.dole.gov.ph`,
 `lto.gov.ph`, and `csc.gov.ph` block datacenter/automated IPs (`403`/timeout) but are live
 in a browser; these are excluded from CI link-checking via `.lycheeignore` (same pattern
 used for LinkedIn/Facebook/etc.).

## Verified YouTube videos (oEmbed `200`)

| ID | Real channel / title (from oEmbed) | Used in | Attribution note |
|----|------------------------------------|---------|------------------|
| `vhOsVb9l_GA` | Tax Tutorials for MSME: "How to make BIR Form 2307 (Q3 2025)" | `bir-withholding-tax-guide` | Brief said "BIR RDO 026 official"; it is actually a practitioner tutorial channel. Attributed as a Form 2307 walkthrough, **not** as BIR-official. |
| `4jDcd9IBa_0` | GA Consulting: "Freelancer BIR Tax Compliance Overview 2024" | `upwork-freelance-tax-guide` | Matches brief. |
| `SCOZ2uY19Ds` | Peach Abacial: "How to compute your SSS Retirement Pension" | `how-to-compute-sss-pension` | Brief said "Pachal"; real channel is **Peach Abacial**. |
| `zaEV4UCUPo4` | Bryllez Channel: "PhilHealth contribution raised to 5%" | `philhealth-contribution-table-2026` | Matches brief. |
| `uvO5RESg0Bc` | DOLE Bureau of Working Conditions: "#WebinarWednesdays … SSS Benefits and Services" | **NOT EMBEDDED** | Brief mapped this to 13th-month pay, but the actual video topic is **SSS benefits**, not 13th month. Skipped to avoid topical misrepresentation; 13th-month article gets the book + DOLE handbook source instead. |
| `LOZm94scvl8` | Batas Pinoy: "Retirement Benefits / SSS Pension para sa Kasambahay" | `kasambahay-retirement-guide` | Verified embeds (`200`). Topic fits the retirement guide (not payroll). |
| `aIey_OQnmbQ` | gineerbens: "BDO Home Loan" | `philippine-home-loan-guide-bank-comparison` | Brief said "Ralf Roger: Pag-IBIG principal paydown"; real video is a **BDO bank home loan** walkthrough → moved to the bank-comparison home-loan guide where it actually fits. |
| `9b7H4Ot6rTc` | Nicole Alba: "Tonik Digital Bank (2021)" | `digital-banks-philippines-interest-rates` | Embedded after re-reading the file (another agent was editing it). Dated 2021, so framed as a getting-started explainer, not a current-rate source. |
| `f7v2ZCjNp8E` | Kuyas ea: "LTO Transfer of Ownership: Requirements and Costs (2025)" | `lto-registration-renewal-guide` | Brief said "Motor Ni Juan"; real channel is **Kuyas ea**. Topic (LTO fees/requirements) fits. |
| `K6EcpL4ZDeE` | Jeff Ski: "LTO Fees & Charges sa Renewal ng Rehistro: Requirements & Penalties" | `lto-late-registration-penalty` | Brief said "Pinoydriving101: VERIFY"; real channel is **Jeff Ski**. Verified embeds; topic (renewal fees + penalties) is an excellent fit. |
| `EW8nfoVNvFg` | Nayumi Cee: "10 Facts about the Civil Service Exam 2026" | `civil-service-reviewer-guide` | Matches brief. |
| `blujIt9dMlo` | OneProject: "Paano mag-compute ng Meralco bill" | `meralco-electric-bill-guide` | Brief said "Ta-Ting"; real channel is **OneProject**. Topic fits. |

### Flagged / NOT used
- `8-CcRFUEIEs`: flagged unverified in brief → **not used**.
- `jYJ4pdcync0`: flagged unverified in brief → **not used**.

## Recommended books (named as personal recommendations)

| Book | Author | ISBN | Used in |
|------|--------|------|---------|
| Income Taxation (2024/2025) | Enrico D. Tabag | 978-971-95999-0-6 | `income-tax-brackets-2026` |
| Everyone's Labor Code | C.A. Azucena Jr. | 978-971-23-9366-2 | `how-to-compute-13th-month-pay` |
| The Law on Obligations and Contracts (2024/2025) | Hector S. De Leon | 978-621-04-5316-4 | `legal-contract-guide` |
| MSA Civil Service Reviewer | Merle Alferez | (none given) | `civil-service-reviewer-guide` |
| Real Estate Exam Reviewer | Atty. Elvin Villanueva | (unverified: omitted) | `pagibig-housing-loan-affordability-guide` |
| No Nonsense Personal Finance | Randell Tiongson | (none given) | `pdic-insurance-guide` |

Books without a verified ISBN are presented as a plain personal recommendation (no ISBN
printed), per the brief.

## Complementary ("kudos") tools (links verified `200`)

| Tool | URL | Used in |
|------|-----|---------|
| Taxumo | https://www.taxumo.com/ | `salary-tax-deductions-guide` |
| Mochi.ph | https://www.mochi.ph/ | `freelance-hourly-rate-guide`, `influencer-rate-guide` |
| My.SSS member portal | https://member.sss.gov.ph/ | `how-to-compute-sss-pension` |
| Pag-IBIG online calculator | https://www.pagibigfundservices.com/ac/ | `pagibig-housing-loan-affordability-guide`, `pagibig-mp2-dividend-calculator` |
| Lemoneyd | https://www.lemoneyd.com/ | `retail-treasury-bond-guide`, `digital-banks-philippines-interest-rates` |
| Meralco Appliance Calculator | https://appliancecalculator.meralco.com.ph/ | `meralco-electric-bill-guide` |

- DOLE Handbook on Workers' Statutory Monetary Benefits (2024 Edition) cited as a Source in
 `how-to-compute-13th-month-pay` via the live NWPC mirror:
 https://nwpc.dole.gov.ph/wp-content/uploads/2024/11/Workers-Statutory-Monetary-Benefits-Handbook-2024-Edition.pdf
 (the `bwc.dole.gov.ph` copy blocks bots).
- **Toll PH app** kudos NOT added: the only contextual home (`philippine-toll-fees-guide`)
 is in the skip list (see below).

## Deferred (SKIPPED: being edited by other agents)
- `philippine-toll-fees-guide.mdx`
- `how-to-compute-gwa-college.mdx`
- `qpi-gpa-calculator-guide.mdx`
- `philippine-latin-honors-guide.mdx`
