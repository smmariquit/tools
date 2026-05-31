"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { computeSalary, EmploymentType } from "../../../lib/salaryLogic";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SalaryCalculator({
	initialSalary = "30000",
}: {
	initialSalary?: string;
}) {
	const t = useTranslations("SalaryCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const defaultSalary = searchParams.get("salary") || initialSalary;
	const defaultPeriod = searchParams.get("period") || "Monthly";
	const defaultTaxable = searchParams.get("taxable") || "";
	const defaultNonTaxable = searchParams.get("nontaxable") || "";
	const defaultEmploymentType =
		(searchParams.get("empType") as EmploymentType) || "Private";

	const [salaryStr, setSalaryStr] = useState(defaultSalary);
	const [payrollPeriod, setPayrollPeriod] = useState(defaultPeriod);
	const [taxableAllowance, setTaxableAllowance] = useState(defaultTaxable);
	const [nonTaxableAllowance, setNonTaxableAllowance] =
		useState(defaultNonTaxable);
	const [employmentType, setEmploymentType] = useState<EmploymentType>(
		defaultEmploymentType,
	);
	const [shareText, setShareText] = useState("Share Computation");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const {
		salary,
		sssDeduction,
		philhealthDeduction,
		pagibigDeduction,
		totalContributions,
		taxableIncome,
		tax,
		netPay,
	} = computeSalary(
		salaryStr,
		payrollPeriod,
		taxableAllowance,
		nonTaxableAllowance,
		employmentType,
	);

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

	const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setSalaryStr(val);
		updateUrl({ salary: val });
	};

	const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = e.target.value;
		setPayrollPeriod(val);
		updateUrl({ period: val });
	};

	const handleTaxableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTaxableAllowance(val);
		updateUrl({ taxable: val });
	};

	const handleNonTaxableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setNonTaxableAllowance(val);
		updateUrl({ nontaxable: val });
	};

	const handleEmploymentTypeChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const val = e.target.value as EmploymentType;
		setEmploymentType(val);
		updateUrl({ empType: val });
	};

	const handleShare = async () => {
		const shareData = {
			title: "My Philippine Salary Computation",
			text: `My gross salary is ₱${salary.toLocaleString()}, and my net take-home pay is ₱${netPay.toLocaleString()} after taxes and deductions! Calculate yours here:`,
			url: window.location.href,
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (error) {
				console.log("Error sharing", error);
			}
		} else {
			// Fallback for PC/Desktop: Copy to clipboard
			try {
				await navigator.clipboard.writeText(
					`${shareData.text} ${shareData.url}`,
				);
				setShareText(t("shareTextCopied"));
				setTimeout(() => setShareText(t("shareText")), 2500);
			} catch (err) {
				console.error("Failed to copy text: ", err);
			}
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const chartData = [
		{ name: t("chartNetPay"), value: netPay, color: "#1b5e20" },
		{ name: t("chartTax"), value: tax, color: "#b71c1c" },
		{
			name: employmentType === "Government" ? "GSIS" : t("chartSSS"),
			value: sssDeduction,
			color: "#f57c00",
		},
		{
			name: t("chartPhilhealth"),
			value: philhealthDeduction,
			color: "#1976d2",
		},
		{ name: t("chartPagibig"), value: pagibigDeduction, color: "#d32f2f" },
	].filter((item) => item.value > 0);

	return (
		<ToolLayout>
			<ToolHeader
				title="Salary Net Pay Calculator (2026)"
				subtitle="Calculate your take-home pay after SSS, PhilHealth, Pag-IBIG, and Withholding Tax deductions."
				adSlotId="1234567890"
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
						{t("detailsTitle")}
					</h2>
					<div className="form-group" style={{ marginBottom: "16px" }}>
						<label className="form-label" htmlFor="employmentType">
							Employment Type
						</label>
						<select
							id="employmentType"
							className="form-control"
							value={employmentType}
							onChange={handleEmploymentTypeChange}
						>
							<option value="Private">Private Sector</option>
							<option value="Government">Government / Public Sector</option>
							<option value="Minimum Wage">Minimum Wage Earner</option>
							<option value="Self-Employed">Self-Employed / Freelancer</option>
							<option value="Kasambahay">Kasambahay (Domestic Worker)</option>
						</select>
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="salary">
							{t("grossSalaryLabel")}
						</label>
						<input
							type="number"
							id="salary"
							className="form-control"
							value={salaryStr}
							onChange={handleSalaryChange}
							min="0"
							step="any"
							placeholder={t("grossSalaryPlaceholder")}
						/>
						<span className="form-hint">{t("grossSalaryHint")}</span>
					</div>
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
						}}
					>
						<span>{t("grossSalaryResult")}</span>
						<strong>{formatCurrency(salary)}</strong>
					</div>

					<div
						style={{
							margin: "16px 0",
							padding: "16px 0",
							borderTop: "1px dashed var(--border-color)",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							{t("mandatoryDeductions")}
						</h3>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
							}}
						>
							<span
								style={{ fontSize: "14px", color: "var(--text-secondary)" }}
							>
								{employmentType === "Government" ? "GSIS" : t("sss")}
							</span>
							<span style={{ fontSize: "14px", fontWeight: 500 }}>
								- {formatCurrency(sssDeduction)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("philhealth")}</span>
							<span style={{ color: "#b71c1c" }}>
								- {formatCurrency(philhealthDeduction)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("pagibig")}</span>
							<span style={{ color: "#b71c1c" }}>
								- {formatCurrency(pagibigDeduction)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "12px",
								paddingTop: "12px",
								borderTop: "1px solid var(--border-color)",
								fontSize: "14px",
								fontWeight: 600,
							}}
						>
							<span>{t("totalContributions")}</span>
							<span>{formatCurrency(totalContributions)}</span>
						</div>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span>{t("taxableIncome")}</span>
						<span>{formatCurrency(taxableIncome)}</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							fontSize: "14px",
						}}
					>
						<span>{t("tax")}</span>
						<span style={{ color: "#b71c1c" }}>- {formatCurrency(tax)}</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "24px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span>{t("netPay")}</span>
						<span style={{ color: "#1b5e20" }}>{formatCurrency(netPay)}</span>
					</div>

					<button
						onClick={handleShare}
						className="btn-secondary"
						style={{
							width: "100%",
							marginTop: "16px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: "8px",
						}}
					>
						{shareText === "Copied to Clipboard!" ? (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						) : (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="18" cy="5" r="3"></circle>
								<circle cx="6" cy="12" r="3"></circle>
								<circle cx="18" cy="19" r="3"></circle>
								<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
								<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
							</svg>
						)}
						{t("shareText") === "Share Computation" &&
						shareText === "Share Computation"
							? "Share Computation"
							: shareText}
					</button>

					<p
						style={{
							textAlign: "center",
							fontSize: "12px",
							color: "var(--text-secondary)",
							marginTop: "16px",
						}}
					>
						{t("estimateDisclaimer")}
					</p>
				</div>
			</div>

			{/* Recharts Visualization */}
			{mounted && salary > 0 && (
				<div className="card" style={{ marginTop: "24px", padding: "24px" }}>
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							textAlign: "center",
						}}
					>
						{t("chartTitle")}
					</h2>
					<div style={{ width: "100%", height: 300 }}>
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={chartData}
									cx="50%"
									cy="50%"
									innerRadius={50}
									outerRadius={80}
									paddingAngle={2}
									dataKey="value"
									label={({ value }) => formatCurrency(value)}
									labelLine={false}
								>
									{chartData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									formatter={(value) => formatCurrency(Number(value) || 0)}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
			)}

			{/* SEO Content */}
			<div
				style={{
					marginTop: "48px",
					paddingTop: "32px",
					borderTop: "1px solid var(--border-color)",
					color: "var(--text-primary)",
				}}
			>
				<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
					How to Compute Your Net Salary in the Philippines
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Calculating your take-home pay involves deducting your mandatory
					government contributions (SSS, PhilHealth, Pag-IBIG) and withholding
					tax from your gross basic salary.
				</p>

				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					1. Government Contributions (2026 Rates)
				</h3>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>
						<strong>SSS:</strong> The employee share is <strong>5%</strong> of
						the Monthly Salary Credit (MSC). The maximum MSC is ₱35,000, meaning
						the maximum employee deduction is ₱1,750.
					</li>
					<li>
						<strong>PhilHealth:</strong> The premium rate is <strong>5%</strong>{" "}
						of your basic salary, split equally between you and your employer (
						<strong>2.5% each</strong>). The salary floor is ₱10,000 and the
						ceiling is ₱100,000.
					</li>
					<li>
						<strong>Pag-IBIG:</strong> The standard employee contribution is{" "}
						<strong>₱200</strong> per month (2% of the ₱10,000 maximum fund
						salary).
					</li>
				</ul>

				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					2. Taxable Income & Withholding Tax
				</h3>
				<p style={{ marginBottom: "16px" }}>
					To find your taxable income, subtract your total contributions from
					your gross salary. Then, apply the TRAIN Law tax brackets to compute
					your withholding tax. If your taxable income is below ₱20,833 per
					month (₱250,000 annually), you are exempt from income tax.
				</p>
			</div>
		</ToolLayout>
	);
}
