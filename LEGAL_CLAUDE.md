# ⚖️ PHTools Legal & Domain Knowledge Matrix (LEGAL_CLAUDE.md)

This document contains "elite ball knowledge" regarding Philippine Labor, Tax, and Privacy Laws. When building or updating calculators in this repository, **you must cross-reference these legal boundaries** to ensure accuracy and prevent liability.

## 1. Unauthorized Practice of Accountancy (Republic Act No. 9298)
You are building tools, **not** providing professional services. 
- **The Danger:** Under RA 9298 (Philippine Accountancy Act of 2004), holding yourself out as a CPA or providing personalized accounting services without a license is illegal.
- **The Solution:** Every financial calculator must be strictly informational. **Never** use language like "We recommend you file X" or "This is your official tax return."
- **Enforcement:** Always ensure the Terms of Use disclaimer is active. "Computations are estimates based on standard Philippine rates and are not professional financial advice."

## 2. Data Privacy Act of 2012 (Republic Act No. 10173)
The NPC (National Privacy Commission) strictly regulates "Personal Information."
- **The Rule:** If a calculator processes PII (Personal Identifiable Information) on a server, we fall under heavy compliance (Data Protection Officer, NPC Registration).
- **Our Architecture:** **ALL calculators must be 100% Client-Side (`"use client"`).** 
- **The Loophole:** Because computations (salary, taxes, cropping ID photos) happen entirely in the user's browser, and we do not store, transmit, or link this data to IPs/names, we bypass heavy DPA processing liabilities. 
- **AdSense Note:** Because we use Google AdSense, we *do* use third-party DART cookies, which is why our Privacy Policy explicitly discloses third-party tracking.

## 3. DOLE Labor Advisories: "Elite Level" Payroll Nuances
If building tools related to Holiday Pay, Final Pay, or 13th Month Pay, adhere to these strict DOLE rules:

### 13th Month Pay (Presidential Decree No. 851)
- **Formula:** `Total Basic Salary Earned during the year / 12`.
- **The "Basic Salary" Trap:** Do **NOT** include Overtime Pay, Holiday Pay, Night Shift Differential (NSD), or allowances in the 13th-month base formula unless the employer explicitly integrated them into basic pay (rare).
- **Taxation (TRAIN Law):** The 13th-month pay and other bonuses are absolutely **TAX-EXEMPT up to ₱90,000**. Any excess is added to the Gross Taxable Income for the year.
- **Proration:** Prorate for resigned/new employees based on the exact months worked.

### Holiday Pay Nuances
- **Regular Holidays** (e.g., Christmas, Independence Day):
  - Not worked: 100% pay (if present/on paid leave the day prior).
  - Worked: 200% pay for the first 8 hours.
  - Worked + Overtime: 260% hourly rate.
  - Worked + Rest Day: 260% for the first 8 hours.
- **Special Non-Working Holidays** (e.g., Ninoy Aquino Day):
  - Not worked: "No work, no pay" (0%).
  - Worked: 130% pay.
  - Worked + Rest Day: 150% pay.

## 4. Taxation: TRAIN Law (RA 10963) & EOPT Act (RA 11976)
- **₱250k Exemption:** The first ₱250,000 of annual taxable income is exempt (₱20,833/month).
- **8% Flat Income Tax Rate:** Applicable ONLY to Self-Employed Individuals/Professionals whose gross receipts/sales are below the ₱3,000,000 VAT threshold. 
  - **Formula:** `(Gross Sales/Receipts - ₱250,000) * 8%`.
  - If they opt for this, they do NOT pay percentage tax.
- **Ease of Paying Taxes (EOPT) Act 2024 Updates:** When dealing with business taxes or invoices, remember that the EOPT Act removed the distinction between "Official Receipts" (for services) and "Sales Invoices" (for goods). Everything is now just an "Invoice."

## 5. Mandatory Contributions (2026 Caps)
- **SSS (Republic Act No. 11199):** 15% rate. MSC capped at ₱35,000. **Crucial:** Anything above ₱20,000 MSC goes to the Mandatory Provident Fund (WISP), not the regular pension fund.
- **PhilHealth (Universal Health Care Act):** 5% rate, split 50/50. Income floor is ₱10,000; income ceiling is ₱100,000.
- **Pag-IBIG:** 2% for Employee, 2% for Employer. Maximum Fund Salary (MFS) is ₱10,000, meaning the maximum contribution is ₱200 each (Total ₱400).

## 6. Development Directives
When asked to develop a new tool:
1. Verify the current law.
2. If the user requests a calculation that violates DOLE or BIR standards, you must inform them of the legal standard and build the tool using the legal standard.
3. Include footnotes in the UI explaining the legal basis (e.g., "Computed based on TRAIN Law RA 10963").
