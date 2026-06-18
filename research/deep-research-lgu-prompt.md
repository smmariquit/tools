# Deep Research Prompt — Sub-national (LGU/regional) legal nuance for PHTools

Paste everything inside the horizontal rules into Google Gemini Deep Research (or an equivalent deep-research agent). It is written to be self-contained.

---

## ROLE & GOAL

You are a Philippine public-finance and labor-law researcher. I run **PHTools**, a free suite of Philippine calculators (taxes, salaries, government contributions, loans, property, education, utilities). Every calculator currently uses **national** law and rates (TRAIN Law RA 10963, the Labor Code PD 442, RA 11199/11223/9679, etc.). The content reads accurately at the national level but ignores the fact that **a lot of these numbers change at the region, province, city, or municipality level** because of the Local Government Code (RA 7160), Regional Tripartite Wages and Productivity Board (RTWPB) wage orders, and thousands of local ordinances.

I want you to produce a **rigorously sourced research report on sub-national variation** so I can add locally-accurate nuance and authoritative citations to each tool's explainer content. The point is twofold: improve correctness for users outside "generic Manila defaults," and establish E-E-A-T (expertise/authority) with primary-source links.

## WHAT COUNTS AS "SUB-NATIONAL NUANCE" (the target)

For each relevant tool, find where the real-world computation deviates from the national baseline depending on **where the user lives or transacts**, specifically:

1. **Region-level** variation set by an agency board (e.g., RTWPB minimum wage and kasambahay wage orders; distribution-utility rates).
2. **Province / city / municipality-level** variation set by local ordinance under the **Local Government Code (RA 7160)** taxing powers (real property tax rates and assessment levels, local transfer tax, local business tax, professional tax, amusement tax, socialized housing tax, idle-land tax, sanitary/permit fees).
3. **Locally-declared events** that change entitlements (city charter days, founding anniversaries, and fiestas declared as special/local non-working holidays, which change holiday-pay math).
4. **Local programs that stack on national ones** (city/provincial scholarship grants on top of CHED/DOST; LGU financial-assistance programs).

## OUTPUT REQUIREMENTS (strict)

- Organize the report **tool by tool** using the catalog below. Skip or briefly mark tools I have flagged as "nationally uniform — confirm no local variation."
- For every finding, give this schema:
  - **National baseline:** the default rule/rate and its primary law.
  - **Local deviation:** what changes, at which jurisdiction level.
  - **Governing local instrument:** the exact issuance (ordinance number + year, RTWPB Wage Order number + region, BLGF/DOF issuance, presidential proclamation number), with **effective date**.
  - **Magnitude / worked example:** a concrete peso example showing the difference vs the national default.
  - **Primary-source URL:** prefer official LGU sites, lawphil.net, BLGF (blgf.gov.ph), DOF, NWPC (nwpc.dole.gov.ph for wage orders), the Official Gazette, or the agency. **Give the actual link and state whether you could open it (live) or not.**
- **Prioritize the highest-impact jurisdictions** (by population and search traffic): NCR cities (Quezon City, Manila, Makati, Taguig, Pasig, Parañaque, Caloocan, Pasay), then Cebu City, Davao City, and the dense surrounding provinces (Cavite, Laguna, Rizal, Bulacan, Pampanga), plus Iloilo, Bacolod, Cagayan de Oro, Zamboanga, and Baguio. Use these as representative samples; you do not need all 1,600+ LGUs.
- Where rates vary continuously across LGUs, give the **statutory ceiling/floor under RA 7160** plus a **table of the sampled cities' actual adopted rates**.
- **Do not fabricate ordinance numbers, rates, or dates.** If you cannot verify a figure to a primary source, say so explicitly and mark it "unverified." Flag anything that looks outdated.
- End with a **"nationally uniform — no LGU variation"** list confirming which tools genuinely have no sub-national angle, so I don't waste time looking.

## THE TOOL CATALOG (with national baseline + the specific local angle to investigate)

### A. Real property & wealth transfer (HIGH sub-national variation — focus here)
- **Amilyar / Real Property Tax Calculator** — Baseline: RA 7160 sets RPT at up to 1% (provinces) or up to 2% (cities and municipalities in Metro Manila) of assessed value, plus 1% Special Education Fund. Investigate: each sampled city's **actual adopted RPT rate**, **assessment levels** by property class, the **Schedule of Market Values (SMV)** revisions (many cities updated SMVs recently), **idle-land tax** (up to 5%), and **Socialized Housing Tax** (e.g., Quezon City's 0.5% on assessed value above ₱100k). Discounts for early/advance payment vary by city.
- **BIR Zonal Value & Real Estate Tax Engine** — Baseline: national CGT 6% and DST are uniform; BIR zonal values are per-RDO. Investigate the **separate Local Transfer Tax** on real-property transfers: RA 7160 caps it at 0.5% (province) and up to 0.75% (city) of the higher of price/FMV/zonal value, with the actual adopted rate per sampled LGU, plus registration and local fees.
- **Estate Tax Calculator** / **BIR Donor's Tax Calculator** — Baseline: flat 6% national under TRAIN. Investigate whether any **local transfer tax / local fees** attach to estate settlement or donation of real property per LGU (the estate/donor's tax itself is national and uniform — confirm that).

### B. Wages, benefits & labor (HIGH region-level variation — focus here)
- **Salary Net Pay Calculator**, **13th Month Calculator**, **Overtime & Holiday Pay Calculator**, **Holiday & Overtime Pay**, **Separation Pay Calculator**, **Final Pay / Backpay Calculator**, **BPO Night Differential Calculator** — Baseline: PD 442 multipliers and PD 851 are national. The big variable is the **regional minimum wage** (RTWPB Wage Orders, different per region and sometimes per sector/industry/establishment size), which sets the **Minimum Wage Earner (MWE) income-tax exemption**, the floor for holiday-pay and 13th-month base, and COLA integration. Investigate the **current Wage Order number, daily rate, and effective date for each region** (at minimum NCR, Region IV-A CALABARZON, Region III, Region VII, Region XI), and how **locally-declared special/regular non-working holidays** (city charter days, fiestas, presidential proclamations) add paid days that change holiday-pay computation.
- **Kasambahay Monthly Contribution & Payroll Calculator** / **Batas Kasambahay Statutory Retirement Pay Calculator** — Baseline: RA 10361. Investigate the **regional minimum monthly wage for kasambahay set by each RTWPB** (this is explicitly regionalized and differs widely NCR vs provinces), plus any LGU registration requirements.
- **SSS Maternity Benefit Calculator** — Baseline: RA 11210 national/uniform. Confirm no LGU variation (likely none).

### C. Business, professional & creative local taxes (MEDIUM–HIGH variation — focus here)
- **Food Cost & Pricing Calculator**, **TikTok/Shopee/Lazada Fee Calculator**, **Philippine Influencer & Talent Rate Calculator**, **Freelance/Upwork Tax**, **Freelance Hourly Rate**, **Invoice Factoring Calculator** — Baseline: national income tax. Investigate the **Local Business Tax (mayor's permit)** under RA 7160 (graduated by gross receipts, rate set per LGU), **barangay clearance/business tax**, **sanitary and other regulatory permit fees**, and for licensed individuals the **Professional Tax Receipt (PTR)** (RA 7160 caps the basic professional tax around ₱300/year but provinces/cities set it). Note which sampled LGUs have notably high/low local business tax.
- **Architectural Fee Calculator (UAP SPP 202)** / **Standard Customs Brokerage Fee Calculator (CAO 1-2001)** — Baseline: professional fee guidelines are national. Investigate the **PTR requirement and per-LGU rate** these licensed professionals must pay, and any local accreditation fees.
- **Amusement / events** — if relevant to influencer/creative work, note LGU amusement tax under RA 7160.

### D. Transport & vehicles (MEDIUM variation)
- **LTO Annual Registration Fee Estimator**, **LTO Penalty Calculator** — Baseline: MVUC and LTO penalties are national (RA 4136 + LTO/DOTr issuances). Investigate **local traffic ordinances and their fines** that users conflate with LTO (e.g., MMDA number-coding/UVVRP in NCR, city-specific anti-distracted-driving, no-contact apprehension ordinances, local overspeeding/towing fees), noting these are separate from MVUC.
- **Expressway Toll Calculator** — Baseline: TRB-approved, per-expressway (inherently regional). Confirm the toll matrices are the right granularity; note any recently approved rate adjustments per expressway.
- **Car Loan / Motorcycle Loan / Fuel Cost** — Baseline: commercial, national. Note that **fuel pump prices vary by region** (freight/logistics differential — e.g., Mindanao vs Metro Manila) and whether any LGU imposes local fuel-related fees. Loans: largely uniform; confirm.

### E. Utilities (HIGH region variation)
- **Electric Bill Estimator** — Baseline currently assumes **Meralco** (Luzon/NCR). Investigate the **other distribution utilities by region** and that their rates differ materially: VECO/MORE (Visayas), Davao Light, Cagayan de Oro (CEPALCO), BENECO (Baguio), and electric cooperatives, plus how generation/transmission charges and local franchise taxes flow into the bill. Provide a current per-kWh comparison across the major DUs if available.

### F. Education (institution-specific, plus LGU scholarship stacking)
- **UP/PUP GWA**, **Latin Honors**, **QPI/GPA**, **PRC Board Exam Rating**, **Civil Service Reviewer** — Baseline: grading/honors rules are **institution-specific** (university handbooks) and exam rules are national (PRC/CSC). These are not LGU law — confirm, and instead note any **per-university** nuances worth citing.
- **CHED Scholarship Calculator** / **DOST-SEI Scholarship Stipend Calculator** — Baseline: national programs (CHED, RA 10931 free tuition; DOST-SEI). Investigate **city/provincial government scholarship and educational-assistance programs that stack on top** (e.g., QC, Manila, Makati, Pasig, Cebu, Davao, provincial scholarship ordinances), with grant amounts and eligibility, since these are real LGU programs students miss.

### G. Banking, insurance & investments (LIKELY nationally uniform — confirm and move on)
- **PDIC Deposit Insurance Estimator** (RA 3591/9576, ₱500k coverage), **Retail Treasury Bond Yield**, **Digital Bank Interest Calculator** (20% final tax), **GoTrade vs IBKR**, **GSIS Pension** (RA 8291), **SSS Pension** (RA 11199), **SSS/PhilHealth/Pag-IBIG contributions** — Baseline: national and uniform. **Confirm there is no LGU/regional variation** (expected: none) and list them under the "nationally uniform" section. Flag only if you find an exception.

### H. Misc utilities
- **GCash/Maya Bill Splitter**, **DFA/PRC Age Calculator**, **ID Photo Maker**, **Digital Ticket Generator**, **Legal Contract Generator**, **Shipping & Logistics Estimator** — Baseline: mostly generic. For **Shipping & Logistics**, note inter-island/regional freight and any LGU-specific delivery constraints; for **Legal Contract Generator**, note where **local transfer tax / notarial and LGU requirements** attach to property contracts. The rest are likely nationally uniform — confirm.

## DELIVERABLE FORMAT

1. An **executive summary** (which tools have the most material LGU/regional variation, ranked).
2. The **per-tool findings** in the schema above.
3. A **sampled-LGU rate comparison table** for: RPT rate + SEF + assessment levels, local transfer tax rate, and local business tax basis, across the priority cities listed.
4. A **regional minimum wage + kasambahay wage table** (current Wage Order per region, rate, effective date, source).
5. A **distribution-utility rate comparison** for the electric bill tool.
6. The **"nationally uniform — no LGU variation"** confirmation list.
7. A **source appendix** with every URL and whether it was reachable/live at time of research.

Be skeptical and precise. Cite primary sources. Where the law sets only a ceiling and LGUs choose within it, make that structure explicit rather than implying a single national number.

---
