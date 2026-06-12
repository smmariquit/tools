"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SssPensionClient() {
	const t = useTranslations("SSSPension");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [mounted, setMounted] = useState(false);
	const [amsc, setAmsc] = useState(
		parseFloat(searchParams.get("amsc") || "20000"),
	);
	const [cys, setCys] = useState(parseFloat(searchParams.get("cys") || "15"));

	useEffect(() => {
		setMounted(true);
	}, []);

	const updateUrl = (updates: Record<string, string>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value) {
				newSearchParams.set(key, value);
			} else {
				newSearchParams.delete(key);
			}
		}
		router.replace(`${pathname}?${newSearchParams.toString()}`, {
			scroll: false,
		});
	};

	// Computations
	let formula1 = 0;
	let formula2 = 0;
	let formula3 = 0;
	let monthlyPension = 0;
	let bestFormula = "";

	if (cys >= 10) {
		formula1 = 300 + 0.2 * amsc + 0.02 * amsc * (cys - 10);
		formula2 = 0.4 * amsc;
		formula3 = cys >= 20 ? 2400 : 1200;

		monthlyPension = Math.max(formula1, formula2, formula3);

		if (monthlyPension === formula1) bestFormula = t("formula1");
		else if (monthlyPension === formula2) bestFormula = t("formula2");
		else bestFormula = t("formula3");
	}

	const formatCurrency = (val: number) => {
		return (
			"₱" +
			val.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		);
	};

	const totalAt80 = monthlyPension * 12 * 20; // 20 years from 60 to 80

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="sss-pension-top"
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
						label={t("amsc")}
						value={amsc}
						min={0}
						max={35000}
						step={500}
						onChange={(val) => {
							setAmsc(val);
							updateUrl({ amsc: val.toString() });
						}}
						hint={t("amscHint")}
					/>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("cys")}
							value={cys}
							min={0}
							max={50}
							step={1}
							onChange={(val) => {
								setCys(val);
								updateUrl({ cys: val.toString() });
							}}
							hint={t("cysHint")}
						/>
					</div>

					{cys < 10 && (
						<TipCard title="Notice" type="warning">
							{t("warningMinimum")}
						</TipCard>
					)}
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
							marginBottom: "24px",
							padding: "24px",
							backgroundColor: "rgba(13, 71, 161, 0.05)",
							border: "1px solid var(--primary)",
							borderRadius: "8px",
							textAlign: "center",
						}}
					>
						<span
							style={{
								display: "block",
								fontSize: "16px",
								color: "var(--text-secondary)",
								marginBottom: "8px",
							}}
						>
							{t("monthlyPension")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(monthlyPension)}
						</strong>
					</div>

					{cys >= 10 && (
						<>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "16px",
									fontSize: "14px",
								}}
							>
								<span style={{ color: "var(--text-secondary)" }}>
									{t("formulaUsed")}
								</span>
								<strong style={{ color: "#4caf50" }}>{bestFormula}</strong>
							</div>

							<div
								style={{
									padding: "16px",
									border: "1px dashed var(--border-color)",
									borderRadius: "8px",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "8px",
										fontSize: "15px",
									}}
								>
									<span style={{ fontWeight: 600 }}>{t("totalAt80")}</span>
									<strong style={{ color: "var(--text-primary)" }}>
										{formatCurrency(totalAt80)}
									</strong>
								</div>
								<p
									style={{
										fontSize: "12px",
										color: "var(--text-secondary)",
										margin: 0,
									}}
								>
									{t("totalAt80Hint")}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</ToolLayout>
	);
}
