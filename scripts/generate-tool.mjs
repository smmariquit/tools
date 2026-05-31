import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Please provide a tool name. Example: npm run generate:tool "Visa Show Money"');
    process.exit(1);
}

let rawName = args[0];
if (rawName.toLowerCase().endsWith(' calculator')) {
    rawName = rawName.slice(0, -11).trim();
}

// Format transformations
const kebabCase = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const pascalCase = rawName.replace(/(^\w|-\w|\s\w)/g, m => m.replace(/[- ]/, '').toUpperCase());
const camelCase = pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);

const toolSlug = `${kebabCase}-calculator`;

console.log(`🚀 Scaffolding tool: ${rawName}`);
console.log(`- Slug: ${toolSlug}`);
console.log(`- PascalCase: ${pascalCase}`);
console.log(`- camelCase: ${camelCase}\n`);

// 1. Create Core Math Logic
const coreMathPath = path.join(rootDir, 'src/core/calculators', `${camelCase}.ts`);
const coreMathContent = `export function calculate${pascalCase}(amount: number) {
	// TODO: Implement domain logic
	const result = amount * 2;
	return { result };
}
`;
fs.writeFileSync(coreMathPath, coreMathContent);
console.log(`✅ Created ${coreMathPath}`);

// 2. Create Test File
const testPath = path.join(rootDir, '__tests__', `${kebabCase}.test.ts`);
const testContent = `import { describe, expect, it } from "vitest";
import { calculate${pascalCase} } from "../src/core/calculators/${camelCase}";

describe("${rawName} Logic", () => {
	it("should calculate correctly", () => {
		const res = calculate${pascalCase}(100);
		expect(res.result).toBe(200);
	});
});
`;
fs.writeFileSync(testPath, testContent);
console.log(`✅ Created ${testPath}`);

// 3. Create Page Component
const appDir = path.join(rootDir, `src/app/[locale]/${toolSlug}`);
if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
}

const pageContent = `import { setRequestLocale } from "next-intl/server";
import ${pascalCase}Client from "./Client";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "${pascalCase}" });
	return {
		title: t("title"),
		description: t("subtitle"),
	};
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
	setRequestLocale(locale);
	return <${pascalCase}Client />;
}
`;
fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);
console.log(`✅ Created ${appDir}/page.tsx`);

// 4. Create Client Component
const clientContent = `"use client";

import { useTranslations } from "next-intl";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import { calculate${pascalCase} } from "../../../core/calculators/${camelCase}";

export default function ${pascalCase}Client() {
	const t = useTranslations("${pascalCase}");

	const [state, updateState] = useCalculatorState(
		{ amount: 100 },
		{ amount: parseFloat }
	);

	const { result } = calculate${pascalCase}(state.amount);

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="${kebabCase}-top"
			/>

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				{/* Input Card */}
				<div className="card">
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("inputDetails")}
					</h2>
					<InteractiveSlider
						label={t("amountLabel")}
						value={state.amount}
						min={0}
						max={1000}
						step={10}
						onChange={(val) => updateState({ amount: val })}
					/>
				</div>

				{/* Results Card */}
				<div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
							color: "var(--primary)",
						}}
					>
						{t("resultsTitle")}
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>{t("resultLabel")}</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{result}
						</strong>
					</div>
				</div>
			</div>

			<ToolFooter currentPath="/${toolSlug}" />
		</ToolLayout>
	);
}
`;
fs.writeFileSync(path.join(appDir, 'Client.tsx'), clientContent);
console.log(`✅ Created ${appDir}/Client.tsx`);

// 5. Update messages/en.json and tl.json
const locales = ['en', 'tl'];
for (const loc of locales) {
    const i18nPath = path.join(rootDir, 'messages', `${loc}.json`);
    try {
        const i18nRaw = fs.readFileSync(i18nPath, 'utf8');
        const i18nObj = JSON.parse(i18nRaw);
        
        if (!i18nObj[pascalCase]) {
            const baseDict = {
                "title": `${rawName} Calculator`,
                "subtitle": "Calculate your values accurately.",
                "inputDetails": "Your Details",
                "amountLabel": "Amount",
                "resultsTitle": "Computation Results",
                "resultLabel": "Result"
            };
            
            // For Tagalog, append placeholder tags to satisfy i18n
            if (loc === 'tl') {
                i18nObj[pascalCase] = {
                    "title": `${rawName} Calculator`,
                    "subtitle": "Kalkulahin ang iyong values accurately.",
                    "inputDetails": "Ang Iyong Detalye",
                    "amountLabel": "Halaga",
                    "resultsTitle": "Resulta ng Komputasyon",
                    "resultLabel": "Resulta"
                };
            } else {
                i18nObj[pascalCase] = baseDict;
            }
            fs.writeFileSync(i18nPath, JSON.stringify(i18nObj, null, "\t") + "\n");
            console.log(`✅ Appended to messages/${loc}.json`);
        } else {
            console.log(`⚠️ Key ${pascalCase} already exists in messages/${loc}.json`);
        }
    } catch (err) {
        console.error(`❌ Failed to update messages/${loc}.json:`, err.message);
    }
}

console.log(`\n🎉 Scaffolding complete! Next steps:
1. Add the route to src/lib/routes.ts manually.
2. Edit src/core/calculators/${camelCase}.ts to write the math logic.
3. Edit src/app/[locale]/${toolSlug}/Client.tsx to build the UI.`);
