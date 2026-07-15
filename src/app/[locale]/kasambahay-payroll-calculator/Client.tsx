"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function KasambahayPayrollClient() {
	const t = useTranslations("KasambahayPayroll");
	const [salary, setSalary] = useState(6000);

	let sssEmployer = 0;
	let sssEmployee = 0;

	// Approximation for 2025 SSS tables (15% total, 10% ER, 5% EE) + ₱10 EC
	// Minimum MSC is ₱5,000.
	const msc = Math.max(5000, Math.min(35000, Math.ceil(salary / 500) * 500));

	if (salary < 5000) {
		// ER pays 100% of SSS for salaries below ₱5,000 (Batas Kasambahay rule)
		sssEmployer = msc * 0.15 + 10;
		sssEmployee = 0;
	} else {
		sssEmployer = msc * 0.1 + 10;
		sssEmployee = msc * 0.05;
	}

	// PhilHealth (5% total, split equally)
	const phTotal = Math.max(500, Math.min(5000, salary * 0.05));
	const phEmployer = phTotal / 2;
	const phEmployee = phTotal / 2;

	// Pag-IBIG (2% total)
	let pagibigEmployer = 0;
	let pagibigEmployee = 0;
	if (salary <= 1500) {
		pagibigEmployer = salary * 0.02;
		pagibigEmployee = salary * 0.01;
	} else {
		pagibigEmployer = Math.min(200, salary * 0.02);
		pagibigEmployee = Math.min(200, salary * 0.02);
	}

	// Under Batas Kasambahay, if wage is < ₱5,000, ER pays PhilHealth and Pag-IBIG fully?
	// Actually, the <5000 rule strictly applies to SSS, PhilHealth, Pag-IBIG in some interpretations,
	// but standard rule is <5000 all premium goes to Employer.
	if (salary < 5000) {
		pagibigEmployer = pagibigEmployer + pagibigEmployee;
		pagibigEmployee = 0;
	}

	const totalEmployer = sssEmployer + phEmployer + pagibigEmployer;
	const totalEmployee = sssEmployee + phEmployee + pagibigEmployee;
	const netPay = salary - totalEmployee;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader title={t("title")} subtitle={t("subtitle")} />

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("salaryDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("monthlySalary")}</label>
							<input
								type="number"
								className="form-control"
								value={salary || ""}
								onChange={(e) => setSalary(Number(e.target.value))}
							/>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								{t("salaryHint")}
							</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div
						className="card"
						style={{
							position: "sticky",
							top: "100px",
							backgroundColor: "var(--bg-color)",
						}}
					>
						<h2
							style={{
								fontSize: "20px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("computationTitle")}
						</h2>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(13, 71, 161, 0.05)",
								borderRadius: "8px",
								marginBottom: "16px",
							}}
						>
							<h3
								style={{
									fontSize: "14px",
									marginBottom: "12px",
									color: "var(--primary)",
								}}
							>
								{t("employerShare")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("sss")}</span> <span>{formatPHP(sssEmployer)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("philhealth")}</span>{" "}
								<span>{formatPHP(phEmployer)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("pagibig")}</span>{" "}
								<span>{formatPHP(pagibigEmployer)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									fontWeight: "bold",
									marginTop: "8px",
								}}
							>
								<span>{t("totalErShare")}</span>{" "}
								<span>{formatPHP(totalEmployer)}</span>
							</div>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(239, 68, 68, 0.05)",
								borderRadius: "8px",
								marginBottom: "16px",
							}}
						>
							<h3
								style={{ fontSize: "14px", marginBottom: "12px", color: "red" }}
							>
								{t("employeeDeductions")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("sss")}</span> <span>{formatPHP(sssEmployee)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("philhealth")}</span>{" "}
								<span>{formatPHP(phEmployee)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("pagibig")}</span>{" "}
								<span>{formatPHP(pagibigEmployee)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									fontWeight: "bold",
									marginTop: "8px",
								}}
							>
								<span>{t("totalEeDeductions")}</span>{" "}
								<span>{formatPHP(totalEmployee)}</span>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								paddingTop: "12px",
								borderTop: "1px dashed rgba(13, 71, 161, 0.2)",
								fontSize: "18px",
								fontWeight: 700,
								color: "var(--primary)",
							}}
						>
							<span>{t("netTakeHome")}</span>
							<span>{formatPHP(netPay)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
