# PH Tools & Calculators 🇵🇭

A suite of free, accurate, and highly optimized online utilities and calculators specifically designed for the Philippines (Salary, SSS, Tax, ID Photos, etc.).

## 🏗️ Architecture & Philosophy
This repository is engineered to maximize Google AdSense revenue while maintaining **$0/month in server costs** and **bypassing Data Privacy Act (RA 10173)** liabilities.

*   **Framework:** Next.js 15 (App Router).
*   **Zero-Server Compute:** All calculators are strictly Client Components. Computations happen entirely in the user's browser.
*   **SEO Supremacy:** We use a strict Server/Client component split. `page.tsx` handles static metadata and JSON-LD schema, while `Client.tsx` handles the interactive UI.
*   **A/B Testing & Analytics:** Handled entirely by **PostHog** (`<PostHogProvider>`). We do not use custom databases or authentication to avoid maintenance and privacy liabilities.
*   **Legal Compliance:** All tools feature strict disclaimers stating they are estimates, protecting against Unauthorized Practice of Accountancy (RA 9298).

## 🚀 CI/CD & Agentic Workflow
This repository features an "ultimate closed-loop" agentic workflow:
1.  **Husky Pre-Commit Wall:** You cannot commit broken code. Husky enforces `eslint`, `tsc --noEmit`, and `vitest run` on every commit.
2.  **Self-Healing:** If a commit fails, run `npm run agent:verify`. This generates `.agent-log.txt` which an AI agent can read to autonomously fix its own bugs.
3.  **Vercel GitHub Actions:** Pushes to `main` deploy to production automatically. PRs deploy to preview environments.

## 🧠 AI Agent Knowledge Auto-Update
**Core Directive:** Whenever a developer or AI agent learns a new architectural constraint or rule while working on this repository, they are mandated to automatically update this `README.md` (for humans) and `CLAUDE.md` / `LEGAL_CLAUDE.md` (for agents).

## 💻 Local Development
```bash
npm install
npm run dev
```

To test the CI/CD pipeline locally before committing:
```bash
npm run agent:verify
```
