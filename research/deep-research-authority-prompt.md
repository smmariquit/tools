# Deep Research Prompt: Authority signals (videos, books, kudos) for PHTools writeups

Paste everything inside the horizontal rules into Google Gemini Deep Research (or an equivalent). Self-contained.

---

## ROLE & GOAL

You are a research assistant for **PHTools**, a free suite of Philippine calculators with hand-written explainer articles. The articles are written in the first person by Simonee, a Computer Science + Accountancy/Business/Management background solo developer, and they cite primary law (TRAIN Law, Labor Code, SSS/PhilHealth/Pag-IBIG statutes). I want to make each writeup read as more genuinely human and authoritative by adding **outbound credibility signals**: a short video from a real authority explaining the topic, a book I can honestly "personally recommend," and a complementary tool or resource I can give a shout-out to.

For each topic below, find up to **two of each** of the following, but ONLY where a genuinely credible option exists. Do not pad. It is far better to return "no credible video found" than to invent or include a weak one.

## WHAT TO FIND, PER TOPIC

1. **Authoritative YouTube video.**
 - Prefer, in order: official government channels (BIR, SSS, PhilHealth, Pag-IBIG, DOLE, GSIS, BSP, PDIC, Bir/agency webinars), then credentialed Filipino experts (CPAs, tax lawyers, RFPs/registered financial planners, labor lawyers, professors), then reputable news explainers (ANC, GMA, PNA, Rappler).
 - Avoid pure hype/"get rich" influencers, videos with visible misinformation, and anything not clearly Philippine-specific.
 - For each video give: **title**, **channel name and why it is credible** (credentials/affiliation), **full URL and the 11-character video ID**, **publish/upload date**, **language** (English / Tagalog / Taglish / Bisaya), **approx length**, and a one-sentence note on what it covers.
 - **Verify it is currently public and embeddable**: state whether the video is public (not private/unlisted), not age-restricted, and not region-locked to outside the Philippines. Note if embedding is disabled by the uploader. If you cannot confirm, say so.
 - **Flag staleness**: if the video quotes rates/laws that have since changed (e.g., pre-2026 contribution tables), say so explicitly so I can decide whether to still use it.

2. **A book to "personally recommend."**
 - Real and verifiable only: **author**, **exact title**, **edition/year**, **ISBN if available**, and **where a Filipino reader can buy it** (Shopee/Lazada/National Book Store/publisher/Amazon). Local PH authors and PH-context books are strongly preferred (e.g., personal finance, Philippine taxation, labor law, investing). 
 - One sentence on why it genuinely fits the topic. If no good book exists for a niche topic, say "no strong book recommendation."

3. **A complementary tool/resource for a kudos shout-out.**
 - A reputable Filipino site, app, open-source project, or official portal that complements the tool (not a direct competitor I am trying to bury, the tone is "kudos to the devs / this is also useful"). Examples: official agency online portals (My.SSS, eGov PH), well-made community calculators, open datasets.
 - Give: **name**, **URL**, **who made it** (person/org), and a one-line reason it deserves the shout-out. **Verify the URL is live (HTTP 200).**

## OUTPUT REQUIREMENTS (strict)

- Organize **topic by topic** using the catalog below.
- Never fabricate a video ID, channel, ISBN, author, or URL. Anything unverified must be labeled **"unverified."**
- Prefer the most recent, still-accurate, still-maintained option.
- Note language for every video and book so I can match audience.
- End with a **verification appendix**: every URL/video ID and whether you could confirm it live and embeddable at time of research.
- For any topic where nothing credible exists in a category, write a one-line "none found" rather than stretching.

## TOPIC CATALOG (grouped by the PHTools tools they back)

**Salary, tax & withholding**: net salary / take-home pay; BIR income tax brackets (TRAIN Law); expanded withholding tax (BIR Form 2307); gross-from-tax; year-end tax refund / BIR 2316; 8% vs graduated optimization; de minimis benefits.

**Government contributions & pensions**: SSS contributions (MSC/WISP); SSS retirement pension (three-formula rule); GSIS pension (RA 8291); PhilHealth premiums (UHC 5%); PhilHealth late-payment penalties; Pag-IBIG contributions; SSS maternity benefit (RA 11210).

**Labor pay & benefits**: 13th month pay (PD 851); overtime, holiday & rest-day premium pay (Labor Code); BPO night differential; separation pay; final pay / backpay; kasambahay payroll and statutory retirement (RA 10361).

**Freelance & online income**: Upwork fees + forex spread + BIR 8% tax; freelance hourly rate setting; influencer/creator rate cards; TikTok/Shopee/Lazada seller fees; invoice factoring.

**Loans, housing & real estate**: car loan vs in-house financing; motorcycle "hulugan"; bank home loan/mortgage; Pag-IBIG housing loan affordability; Pag-IBIG MP2 dividends; Pag-IBIG foreclosed/acquired-asset ROI; BIR zonal value, capital gains tax & DST on property; amilyar (real property tax); estate tax (TRAIN 6%); donor's tax.

**Investing & banking**: digital bank high-yield savings (Maya, SeaBank, GoTyme) and the 20% final tax; Retail Treasury Bonds (RTB) yields; GoTrade vs IBKR (US stocks, FX spread); PDIC deposit insurance.

**Vehicles & transport**: LTO registration fee / MVUC; LTO late-registration penalty; expressway toll fees (Skyway/SLEX/NLEX/TPLEX); fuel-cost trip planning.

**Education & exams**: UP/PUP GWA (1.0–5.0); QPI/GPA (4.0 scale, Ateneo/DLSU); Latin honors thresholds; PRC board exam rating (NLE/CE/CPALE); Civil Service Exam; DOST-SEI scholarship stipend; CHED scholarships (RA 10931).

**Utilities, fees & misc**: Meralco / regional electric bill estimation; architectural fees (UAP SPP 202); customs brokerage fees (CAO 1-2001); shipping & logistics rates; bill splitting (VAT + service charge); food costing & menu pricing; budgeting / reverse salary; DFA/PRC exact-age; ID photo sizing; legal contract basics.

## STYLE NOTE FOR THE RESULTS

Frame book and kudos picks the way a knowledgeable peer would, specific and honest, not a corporate listicle. Assume each result will be either embedded (videos) or hyperlinked with a short personal aside ("a clean explainer from the BIR itself," "kudos to the team behind X"), so give me enough context to write that aside truthfully.

---
