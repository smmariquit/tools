"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const DIGITAL_BANKS = [
	{ id: "maya", name: "Maya Bank", rate: 3.5 },
	{ id: "seabank", name: "SeaBank", rate: 4.5 },
	{ id: "gotyme", name: "GoTyme Bank", rate: 4.0 },
	{ id: "cimb", name: "CIMB Bank (GSave/UpSave)", rate: 2.5 },
	{ id: "tonik", name: "Tonik Bank (Stash)", rate: 4.0 },
	{ id: "uniondigital", name: "UnionDigital Bank", rate: 4.0 },
	{ id: "netbank", name: "Netbank", rate: 5.0 },
	{ id: "uno", name: "UNO Digital Bank", rate: 4.25 },
	{ id: "diskartech", name: "DiskarTech (RCBC)", rate: 6.5 },
	{ id: "komo", name: "Komo (EastWest)", rate: 2.5 },
	{ id: "custom", name: "Custom / Promo Rate", rate: 5.0 },
];

export default function DigitalBankClient() {
	const t = useTranslations("DigitalBank");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const selectId = useId();

	const [mounted, setMounted] = useState(false);
	const [initialDeposit, setInitialDeposit] = useState(
		parseFloat(searchParams.get("deposit") || "10000"),
	);
	const [monthlyAddition, setMonthlyAddition] = useState(
		parseFloat(searchParams.get("monthly") || "2000"),
	);
	const [selectedBank, setSelectedBank] = useState(
		searchParams.get("bank") || "seabank",
	);
	const [interestRate, setInterestRate] = useState(
		parseFloat(searchParams.get("rate") || "4.5"),
	);
	const [years, setYears] = useState(
		parseFloat(searchParams.get("years") || "5"),
	);

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

	const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const bankId = e.target.value;
		setSelectedBank(bankId);
		const bank = DIGITAL_BANKS.find((b) => b.id === bankId);
		if (bank && bankId !== "custom") {
			setInterestRate(bank.rate);
			updateUrl({ bank: bankId, rate: bank.rate.toString() });
		} else {
			updateUrl({ bank: bankId });
		}
	};

	// Simulation
	let balance = initialDeposit;
	let totalDeposited = initialDeposit;
	let grossInterestTotal = 0;
	let taxTotal = 0;

	const chartData = [];

	chartData.push({
		month: 0,
		balance: initialDeposit,
		deposits: initialDeposit,
		interest: 0,
	});

	for (let m = 1; m <= years * 12; m++) {
		const grossInterest = balance * (interestRate / 100 / 12);
		const tax = grossInterest * 0.2;
		const netInterest = grossInterest - tax;

		balance += netInterest + monthlyAddition;
		grossInterestTotal += grossInterest;
		taxTotal += tax;
		totalDeposited += monthlyAddition;

		if (m % 12 === 0 || m === years * 12) {
			chartData.push({
				month: m,
				label: `Year ${m / 12}`,
				balance: Math.round(balance),
				deposits: Math.round(totalDeposited),
				interest: Math.round(grossInterestTotal - taxTotal),
			});
		}
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

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="digital-bank-top"
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
						label={t("initialDeposit")}
						value={initialDeposit}
						min={0}
						max={1000000}
						step={5000}
						onChange={(val) => {
							setInitialDeposit(val);
							updateUrl({ deposit: val.toString() });
						}}
						hint={t("initialDepositHint")}
					/>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("monthlyAddition")}
							value={monthlyAddition}
							min={0}
							max={100000}
							step={1000}
							onChange={(val) => {
								setMonthlyAddition(val);
								updateUrl({ monthly: val.toString() });
							}}
							hint={t("monthlyAdditionHint")}
						/>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectId}>
							{t("selectBank")}
						</label>
						<select
							id={selectId}
							className="form-control"
							value={selectedBank}
							onChange={handleBankChange}
						>
							{DIGITAL_BANKS.map((bank) => (
								<option key={bank.id} value={bank.id}>
									{bank.name} ({bank.rate}% p.a.)
								</option>
							))}
						</select>
					</div>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("interestRate")}
							value={interestRate}
							min={0.1}
							max={15}
							step={0.1}
							onChange={(val) => {
								setInterestRate(val);
								setSelectedBank("custom");
								updateUrl({ rate: val.toString(), bank: "custom" });
							}}
							hint={t("interestRateHint")}
						/>
					</div>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("years")}
							value={years}
							min={1}
							max={30}
							step={1}
							onChange={(val) => {
								setYears(val);
								updateUrl({ years: val.toString() });
							}}
						/>
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
							{t("totalBalance")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(balance)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("totalDeposits")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(totalDeposited)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("netInterestEarned")}
						</span>
						<strong style={{ color: "#4caf50" }}>
							+ {formatCurrency(grossInterestTotal - taxTotal)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "24px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("taxDeducted")}
						</span>
						<strong style={{ color: "#f44336" }}>
							- {formatCurrency(taxTotal)}
						</strong>
					</div>

					{mounted && chartData.length > 1 && (
						<div
							style={{
								height: "250px",
								width: "100%",
								marginTop: "32px",
								marginBottom: "16px",
							}}
						>
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart
									data={chartData}
									margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
								>
									<defs>
										<linearGradient
											id="colorBalance"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="5%"
												stopColor="var(--primary)"
												stopOpacity={0.8}
											/>
											<stop
												offset="95%"
												stopColor="var(--primary)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray="3 3"
										vertical={false}
										stroke="var(--border-color)"
									/>
									<XAxis
										dataKey="label"
										tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
										axisLine={false}
										tickLine={false}
									/>
									<YAxis
										tickFormatter={(value) => `₱${value / 1000}k`}
										tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
										axisLine={false}
										tickLine={false}
									/>
									<Tooltip
										formatter={(value: any) => formatCurrency(Number(value))}
										labelStyle={{
											color: "black",
											fontWeight: "bold",
											marginBottom: "8px",
										}}
										contentStyle={{
											borderRadius: "8px",
											border: "none",
											boxShadow: "var(--shadow-md)",
										}}
									/>
									<Area
										type="monotone"
										dataKey="balance"
										name="Total Balance"
										stroke="var(--primary)"
										fillOpacity={1}
										fill="url(#colorBalance)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					)}

					<TipCard title="Important Note">{t("note")}</TipCard>
				</div>
			</div>

			<ToolFooter currentPath="/digital-bank-calculator" />
		</ToolLayout>
	);
}
