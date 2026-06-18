"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	DEFAULT_UTILITY_ID,
	distributionUtilities,
	getUtility,
} from "../../../data/regional/electricity";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

type Appliance = {
	id: string;
	name: string;
	wattsStr: string;
	hoursStr: string;
	daysStr: string;
};

export default function ElectricBillClient() {
	const t = useTranslations("ElectricBill");
	const [utilityId, setUtilityId] = useState(DEFAULT_UTILITY_ID);
	const [rateStr, setRateStr] = useState(
		String(getUtility(DEFAULT_UTILITY_ID)?.ratePerKwh ?? 14.33),
	);

	const handleUtilityChange = (id: string) => {
		setUtilityId(id);
		const u = getUtility(id);
		if (u) setRateStr(String(u.ratePerKwh));
	};

	const handleRateChange = (value: string) => {
		setRateStr(value);
		// Diverging from a preset rate means the user is on a custom rate.
		const u = getUtility(utilityId);
		if (u && value !== String(u.ratePerKwh)) setUtilityId("custom");
	};
	const [appliances, setAppliances] = useState<Appliance[]>([
		{
			id: Date.now().toString(),
			name: t("nameAirconNonInverter"),
			wattsStr: "1000",
			hoursStr: "8",
			daysStr: "30",
		},
	]);

	const rate = parseFloat(rateStr) || 0;

	const addAppliance = () => {
		setAppliances([
			...appliances,
			{
				id: Date.now().toString(),
				name: t("nameCustom"),
				wattsStr: "0",
				hoursStr: "0",
				daysStr: "30",
			},
		]);
	};

	const removeAppliance = (id: string) => {
		if (appliances.length > 1) {
			setAppliances(appliances.filter((app) => app.id !== id));
		}
	};

	const updateAppliance = (
		id: string,
		field: keyof Appliance,
		value: string,
	) => {
		setAppliances(
			appliances.map((app) => {
				if (app.id === id) {
					return { ...app, [field]: value };
				}
				return app;
			}),
		);
	};

	const handlePresetChange = (id: string, value: string) => {
		if (!value) return;
		const [presetWatts, presetName] = value.split("|");
		updateAppliance(id, "wattsStr", presetWatts);
		updateAppliance(id, "name", presetName);
	};

	let totalMonthlyKwh = 0;
	let totalMonthlyCost = 0;

	const computedAppliances = appliances.map((app) => {
		const watts = parseFloat(app.wattsStr) || 0;
		const hours = parseFloat(app.hoursStr) || 0;
		const days = parseFloat(app.daysStr) || 0;

		const kwh = (watts / 1000) * hours * days;
		const cost = kwh * rate;

		totalMonthlyKwh += kwh;
		totalMonthlyCost += cost;

		return { ...app, kwh, cost };
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<div style={{ width: "100%", margin: "0 auto" }}>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
				</div>

				<AdBanner dataAdSlot="electric-bill-top" />

				<div className="tool-grid" style={{ marginTop: "24px" }}>
					{/* Input Card */}
					<div className="card" style={{ alignSelf: "start" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
							}}
						>
							<h2 style={{ fontSize: "18px", margin: 0 }}>
								{t("yourAppliances")}
							</h2>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "12px",
									flexWrap: "wrap",
									justifyContent: "flex-end",
								}}
							>
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<label
										style={{ fontSize: "14px", color: "var(--text-secondary)" }}
										htmlFor="du-provider"
									>
										{t("providerLabel")}
									</label>
									<select
										id="du-provider"
										className="form-control"
										style={{ width: "auto", padding: "4px 8px" }}
										value={utilityId}
										onChange={(e) => handleUtilityChange(e.target.value)}
									>
										{distributionUtilities.map((u) => (
											<option key={u.id} value={u.id}>
												{u.name} · ₱{u.ratePerKwh.toFixed(2)}
											</option>
										))}
										<option value="custom">{t("providerCustom")}</option>
									</select>
								</div>
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<label
										style={{ fontSize: "14px", color: "var(--text-secondary)" }}
										htmlFor="global-rate"
									>
										{t("rateLabel")}
									</label>
									<input
										id="global-rate"
										type="number"
										className="form-control"
										style={{ width: "80px", padding: "4px 8px" }}
										value={rateStr}
										onChange={(e) => handleRateChange(e.target.value)}
										min="0"
										step="any"
									/>
								</div>
							</div>
						</div>

						<div
							style={{ display: "flex", flexDirection: "column", gap: "16px" }}
						>
							{computedAppliances.map((app, _index) => (
								<div
									key={app.id}
									style={{
										padding: "16px",
										border: "1px solid var(--border-color)",
										borderRadius: "8px",
										position: "relative",
										backgroundColor: "var(--bg-color)",
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: "12px",
										}}
									>
										<input
											type="text"
											value={app.name}
											onChange={(e) =>
												updateAppliance(app.id, "name", e.target.value)
											}
											style={{
												fontWeight: "bold",
												border: "none",
												background: "transparent",
												fontSize: "16px",
												color: "var(--text-primary)",
												outline: "none",
												borderBottom: "1px dashed var(--border-color)",
											}}
										/>
										{appliances.length > 1 && (
											<button
												onClick={() => removeAppliance(app.id)}
												style={{
													background: "none",
													border: "none",
													color: "red",
													cursor: "pointer",
												}}
											>
												{t("remove")}
											</button>
										)}
									</div>

									<div className="form-group" style={{ marginBottom: "12px" }}>
										<select
											className="form-control"
											onChange={(e) =>
												handlePresetChange(app.id, e.target.value)
											}
											defaultValue=""
										>
											<option value="">{t("loadCommon")}</option>
											<option value={`1000|${t("nameAirconNonInverter")}`}>
												{t("optAirconNonInverter")}
											</option>
											<option value={`600|${t("nameAirconInverter")}`}>
												{t("optAirconInverter")}
											</option>
											<option value={`60|${t("nameFan")}`}>{t("optFan")}</option>
											<option value={`150|${t("nameRef")}`}>{t("optRef")}</option>
											<option value={`70|${t("nameTv")}`}>{t("optTv")}</option>
											<option value={`500|${t("nameWasher")}`}>
												{t("optWasher")}
											</option>
											<option value={`400|${t("nameRice")}`}>
												{t("optRice")}
											</option>
											<option value={`1000|${t("nameFlatIron")}`}>
												{t("optFlatIron")}
											</option>
											<option value={`60|${t("nameLaptop")}`}>
												{t("optLaptop")}
											</option>
										</select>
									</div>

									<div
										style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
									>
										<div className="form-group" style={{ flex: "1 1 30%" }}>
											<label className="form-label" htmlFor={`watts-${app.id}`}>
												{t("watts")}
											</label>
											<input
												id={`watts-${app.id}`}
												type="number"
												className="form-control"
												value={app.wattsStr}
												onChange={(e) =>
													updateAppliance(app.id, "wattsStr", e.target.value)
												}
												min="0"
											/>
										</div>
										<div className="form-group" style={{ flex: "1 1 30%" }}>
											<label className="form-label" htmlFor={`hrs-${app.id}`}>
												{t("hrsPerDay")}
											</label>
											<input
												id={`hrs-${app.id}`}
												type="number"
												className="form-control"
												value={app.hoursStr}
												onChange={(e) =>
													updateAppliance(app.id, "hoursStr", e.target.value)
												}
												min="0"
												max="24"
											/>
										</div>
										<div className="form-group" style={{ flex: "1 1 30%" }}>
											<label className="form-label" htmlFor={`days-${app.id}`}>
												{t("daysPerMonth")}
											</label>
											<input
												id={`days-${app.id}`}
												type="number"
												className="form-control"
												value={app.daysStr}
												onChange={(e) =>
													updateAppliance(app.id, "daysStr", e.target.value)
												}
												min="0"
												max="31"
											/>
										</div>
									</div>

									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginTop: "12px",
											paddingTop: "8px",
											borderTop: "1px dashed var(--border-color)",
										}}
									>
										<span
											style={{
												fontSize: "14px",
												color: "var(--text-secondary)",
											}}
										>
											{t("monthlyCons", { kwh: app.kwh.toFixed(1) })}
										</span>
										<span
											style={{ fontWeight: "bold", color: "var(--primary)" }}
										>
											{formatCurrency(app.cost)}
										</span>
									</div>
								</div>
							))}
						</div>

						<button
							onClick={addAppliance}
							className="btn-secondary"
							style={{ width: "100%", marginTop: "16px" }}
						>
							{t("addAnother")}
						</button>
					</div>

					{/* Results Card */}
					<div
						style={{ display: "flex", flexDirection: "column", gap: "16px" }}
					>
						<div
							className="card"
							style={{ backgroundColor: "var(--bg-color)" }}
						>
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									borderBottom: "1px solid var(--border-color)",
									paddingBottom: "8px",
									color: "var(--primary)",
								}}
							>
								{t("totalEstimatedBill")}
							</h2>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "12px",
								}}
							>
								<span>{t("totalMonthlyConsumption")}</span>
								<strong>{totalMonthlyKwh.toFixed(2)} kWh</strong>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginTop: "16px",
									paddingTop: "16px",
									borderTop: "1px dashed var(--border-color)",
								}}
							>
								<span style={{ fontSize: "16px" }}>{t("estimatedTotalCost")}</span>
								<strong style={{ fontSize: "32px", color: "var(--primary)" }}>
									{formatCurrency(totalMonthlyCost)}
								</strong>
							</div>
						</div>

						<div className="card">
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "8px",
									color: "var(--primary)",
								}}
							>
								{t("formulaTips")}
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "12px",
								}}
							>
								{t("formulaIntro")}
							</p>
							<code
								style={{
									display: "block",
									background: "var(--bg-color)",
									padding: "12px",
									borderRadius: "4px",
									fontSize: "13px",
									marginBottom: "12px",
								}}
							>
								{t("formula")}
							</code>
							<ul
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									paddingLeft: "20px",
								}}
							>
								<li style={{ marginBottom: "8px" }}>{t("tip1")}</li>
								<li style={{ marginBottom: "8px" }}>{t("tip2")}</li>
								<li>{t("tip3")}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
