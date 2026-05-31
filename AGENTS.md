<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:i18n-agent-rules -->
# Internationalization (i18n) & Translation

Every time you create or modify a UI component (like a calculator in `src/app/[locale]/`), you MUST ensure that all user-facing text is translated using `next-intl`.
1. **Never hardcode English text** in the JSX.
2. Use `useTranslations` (for Client Components) or `getTranslations` (for Server Components).
3. Add the extracted English strings to `messages/en.json`.
4. Translate the strings into conversational Taglish (Tagalog + English) following `CONVERSATIONAL_GUIDE.md` and add them to `messages/tl.json`.
5. Make sure your translation namespaces match the component name (e.g., `SalaryCalculator`, `IncomeTaxCalculator`).
<!-- END:i18n-agent-rules -->

<!-- BEGIN:tools-agent-rules -->
# Cross-Linking Tools

Whenever you create or significantly update a tool, you MUST include a "Related Tools" section at the bottom of the tool's interface (or blog post). This section should contain links to exactly 3 other tools on the platform that are contextually relevant (e.g., if it's the Salary Calculator, link to the 13th Month Pay, Income Tax, and Freelance Tax calculators).
<!-- END:tools-agent-rules -->

<!-- BEGIN:a11y-agent-rules -->
# Accessibility & Keyboard Navigation

We aim to ensure that our platform is highly accessible. Every time you create or modify a UI component:
1. Ensure all interactive elements (buttons, inputs, links) are easily focusable via `Tab`.
2. Do NOT break keyboard navigation. Support keyboard shortcuts where logical (e.g. `Enter` to submit, `Esc` to close modals).
3. Ensure sufficient color contrast and appropriate `aria-labels` for screen readers.
<!-- END:a11y-agent-rules -->
