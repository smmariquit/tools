# Deep Research Prompt: Philippine university grading systems dataset for PHTools

Paste everything inside the horizontal rules into Google Gemini Deep Research (or an equivalent deep-research agent). It is written to be self-contained.

---

## ROLE & GOAL

You are a Philippine higher-education registrar-policy researcher. I run **PHTools**, a free suite of Philippine calculators, including a **GWA / QPI / GPA calculator** and a **Latin Honors calculator**. These tools depend on a structured dataset of each school's **official undergraduate grading system** (the grade table, the passing line, and the Latin-honors cutoffs). I currently have only **6 entries** and need to expand the dataset to cover **as many CHED-recognized Philippine higher-education institutions as can be verified to a primary source.**

Your job is to compile that dataset with **strict, auditable sourcing**. Accuracy and verifiability matter far more than coverage: **an institution I cannot use because its values are guessed is worse than an institution left out.** Capture data **exactly as the school publishes it**: do not normalize, "clean up," round, or harmonize across schools.

## NON-NEGOTIABLE VERIFICATION RULES

1. **Official primary sources only.** A value is acceptable only if it comes from the institution's own registrar page, official student handbook/PDF, official academic regulations, citizens charter, or board/council issuance hosted on the school's official domain (or an official government domain). **Wikipedia, blogs, forums, Reddit, Scribd, college-paper articles, and review sites are NOT acceptable as the source**: you may use them only as a lead to *find* the official document, and the recorded `sourceUrl` must be the official document, never the blog.
2. **Every `sourceUrl` and `honorsSourceUrl` must resolve to HTTP 200** at time of research. State for each entry whether you opened the link and what status it returned. If the official PDF is only reachable on a subdomain or via a particular host, record the exact working URL. If a host blocks automated agents (returns 403 to a bot but 200 in a real browser), say so explicitly in `notes`.
3. **Never fabricate a value.** If a field (percentage equivalent, honors cutoff, lowest passing grade, descriptor) is not stated in an official source, set it to `null` and explain why in `notes`. Do not infer percentage equivalents from grade points, and do not copy one school's cutoffs onto another. **A plausible guess is a failure, not a help.**
4. **Capture data exactly as published.** No normalization. If a school writes "1.00 = 96–100, Excellent," record `96` and `100` and `"Excellent"` verbatim. If it expresses honors with inclusive bands like `1.000–1.200`, keep that exact phrasing in the honors string. Do not convert a 1.0–5.0 school into a 4.0 scale or vice versa.
5. **Date every entry.** Record the document's own effective/publication year in `asOf` (not today's date) and note the verification date in `notes`.
6. **Undergraduate, university-wide rules by default.** Capture the general undergraduate grading system and general Latin-honors policy. If grading or honors **varies by program/college** (law, medicine, graduate school, specific faculties), set `variesByProgram: true` and summarize the key variations in `variationNote`: but the headline `grades`/`honors` should reflect the general undergraduate rule.
7. **Flag staleness and contradictions.** If a handbook is old, if you find conflicting official figures, or if a commonly-cited third-party number disagrees with the official one, say so in `notes`.

## SCOPE & PRIORITIZATION

- **Prioritize Philippine institutions.** The dataset is Philippine-first.
- **Include exactly one international reference entry:** the standard **US 4.0 GPA scale**, sourced to a real US registrar's published grading scale (used purely as a conversion reference in the calculator). Do not add other foreign systems unless I later ask.
- I already have these 6 entries (do not re-research unless you find an error: if you do, flag it): **University of the Philippines (UP), Ateneo de Manila University, De La Salle University (DLSU Manila), University of Santo Tomas (UST), Polytechnic University of the Philippines (PUP), and the US 4.0 reference scale.**
- **Seed list to expand toward** (add only those you can verify to an official primary source; this list is a starting point, not a limit: pursue as many CHED-recognized universities and colleges as you can verify):
 - University of Asia and the Pacific (UA&P)
 - Mapúa University
 - Far Eastern University (FEU)
 - University of the East (UE)
 - Adamson University
 - San Beda University
 - Silliman University
 - University of San Carlos (USC, Cebu)
 - Xavier University: Ateneo de Cagayan
 - Ateneo regional campuses (Ateneo de Davao, Ateneo de Naga, Ateneo de Zamboanga): each is a **separate institution** with its own policy; verify individually, do not assume they match ADMU Loyola Schools.
 - La Salle campuses that are **separate institutions** (De La Salle University–Dasmariñas / DLSU-D, De La Salle–College of Saint Benilde / DLS-CSB, University of St. La Salle Bacolod): verify individually; DLSU-D notably publishes a percentage table and should NOT be merged with DLSU Manila.
 - Saint Louis University (SLU, Baguio)
 - Mindanao State University (MSU) system
 - Major state universities and colleges (e.g., Mindanao State University–IIT, Pamantasan ng Lungsod ng Maynila, Cebu Institute of Technology: University, Technological University of the Philippines, Bicol University, Central Luzon State University, Cebu Normal University, West Visayas State University, Mindanao State University–GenSan, Visayas State University, Batangas State University, Bulacan State University): verify each individually.
 - Other large private universities and colleges (e.g., Centro Escolar University, National University, Lyceum of the Philippines, Mapúa Malayan Colleges, Holy Angel University, University of San Agustin, Ateneo de Manila professional schools, Pamantasan ng Lungsod, etc.): only if verifiable.
- **Do not pad the dataset with unverifiable institutions.** Coverage that cannot be sourced is not coverage.

## OUTPUT SCHEMA (match this EXACTLY)

Output a single JSON array. Each institution is one object using **exactly** the fields and shapes below (this mirrors the dataset I already use: copy the shape precisely so I can paste your output straight in). The reference rows already in my dataset are reproduced at the end as worked examples: match them field-for-field.

```json
{
  "id": "short-lowercase-slug",
  "name": "Full official institution name",
  "aliases": ["UP", "UPD", "common short names and acronyms"],
  "scaleType": "QPI | GPA | GWA | percentage",
  "scaleDirection": "lowIsBest | highIsBest",
  "bestGrade": 1.0,
  "publishesPercentageEquivalents": true,
  "grades": [
    {
      "symbol": "1.00",
      "points": 1.0,
      "percentMin": 96,
      "percentMax": 100,
      "descriptor": "Excellent",
      "passing": true
    }
  ],
  "lowestPassingGrade": "3.00",
  "failingGrades": ["5.00", "FA", "WF"],
  "honors": {
    "summaCumLaude": "1.000–1.200 (general undergraduate)",
    "magnaCumLaude": "1.201–1.450",
    "cumLaude": "1.451–1.750",
    "honorableMention": null,
    "deansList": "GWA ≥ 1.750 in the immediately preceding term"
  },
  "variesByProgram": true,
  "variationNote": "Explain any per-college/per-program variation, what the headline values represent, and why any field is null.",
  "sourceUrl": "https://official-domain/registrar/grades.pdf",
  "honorsSourceUrl": "https://official-domain/handbook/honors.pdf",
  "sourceName": "Office of the University Registrar — Grades (cite the exact document/policy number, e.g., PPS No. 1019 / Revised UP Code Art. 369)",
  "asOf": "2024",
  "notes": "Source document's effective year, what was verified, HTTP status you observed, any host quirks (e.g., 403-to-bots), and any conflicts/staleness."
}
```

### Field rules
- `id`: short, lowercase, hyphenated, unique (e.g., `feu`, `dlsu-d`, `ateneo-davao`).
- `scaleType`: one of `QPI`, `GPA`, `GWA`, `percentage`: pick the term the school itself uses; do not invent a new one.
- `scaleDirection`: `lowIsBest` for 1.0–5.0 systems where 1.0 is best; `highIsBest` for 4.0-style systems and percentages.
- `bestGrade`: the numeric value of the top mark (e.g., `1.0` or `4.0` or `100`).
- `publishesPercentageEquivalents`: `true` only if the school **officially** publishes a percentage-to-grade mapping; otherwise `false` and leave each `percentMin`/`percentMax` as `null`.
- `grades`: the **complete** official table, including special symbols (INC, W, WP, WF, FA, P, F, S, U, NE, Dropped, etc.). For non-numeric marks set `points`, `percentMin`, `percentMax` to `null` and still record an honest `descriptor` and `passing` flag.
- `lowestPassingGrade`: the lowest mark that earns credit, exactly as published.
- `failingGrades`: list every mark that does not earn credit.
- `honors`: each tier as the school states it (keep the school's own band phrasing). Use `null` for any tier the school does not define or that you cannot verify. Put Dean's-List / President's-List / scholastic-honor rules in `deansList`.
- `variesByProgram` / `variationNote`: always fill `variationNote` with what the headline values represent and the reason for any `null`.
- `sourceUrl` / `honorsSourceUrl`: the official document(s). If grades and honors come from one document, repeat it. If honors cannot be verified to an official URL, set `honorsSourceUrl` to `null` and leave the honors tiers `null` rather than approximating.
- `sourceName`: human-readable citation including the exact policy/document number when one exists.
- `asOf`: the source document's effective/publication year.
- `notes`: verification trail (status code seen, date, host quirks, staleness, conflicts).

## DELIVERABLE FORMAT

1. The **JSON array** of all verified institutions (Philippine-first, plus the single US 4.0 reference entry), each object matching the schema above field-for-field.
2. A **verification appendix** table: institution, `sourceUrl`, HTTP status you observed, and date checked.
3. A **"could not verify" list**: institutions you attempted but dropped, with one line each on why (no official document found, source returned 404, only blog-level sources existed, conflicting figures, etc.). This is as valuable as the dataset itself.
4. A short **conflict/staleness log**: any cases where an official figure contradicts a commonly-cited third-party number, or where the official document is old enough that I should re-verify.

Be skeptical and precise. When in doubt, prefer `null` + a `notes` explanation over a confident guess. Capture each school exactly as it publishes its own rules.

---
