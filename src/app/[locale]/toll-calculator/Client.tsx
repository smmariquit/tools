"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ExpresswayMap from "../../components/ExpresswayMap";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";
import { expressways, getMaxTollFee, getTollFee, isClosedSystem } from "./tollData";

type TripLeg = {
	id: string;
	expressway: string;
	origin: string;
	destination: string;
	noEntryScan: boolean;
};

const getWikiUrl = (expresswayName: string) => {
	if (expresswayName.includes("NLEX"))
		return "https://en.wikipedia.org/wiki/North_Luzon_Expressway";
	if (expresswayName.includes("SLEX"))
		return "https://en.wikipedia.org/wiki/South_Luzon_Expressway";
	if (expresswayName.includes("Skyway"))
		return "https://en.wikipedia.org/wiki/Skyway_(Metro_Manila)";
	if (expresswayName.includes("TPLEX"))
		return "https://en.wikipedia.org/wiki/Tarlac%E2%80%93Pangasinan%E2%80%93La_Union_Expressway";
	if (expresswayName.includes("CAVITEX"))
		return "https://en.wikipedia.org/wiki/Manila%E2%80%93Cavite_Expressway";
	if (expresswayName.includes("NAIAX"))
		return "https://en.wikipedia.org/wiki/NAIA_Expressway";
	if (expresswayName.includes("CALAX"))
		return "https://en.wikipedia.org/wiki/Cavite%E2%80%93Laguna_Expressway";
	if (expresswayName.includes("STAR"))
		return "https://en.wikipedia.org/wiki/Southern_Tagalog_Arterial_Road";
	if (expresswayName.includes("CCLEX"))
		return "https://en.wikipedia.org/wiki/Cebu%E2%80%93Cordova_Link_Expressway";
	return "https://en.wikipedia.org/wiki/Philippine_expressway_network";
};

export default function TollCalculatorClient() {
	const t = useTranslations("TollCalculator");
	const [vehicleClass, setVehicleClass] = useState<
		"class1" | "class2" | "class3"
	>("class1");
	const [zoomedExpressway, setZoomedExpressway] = useState<string | null>(null);
	const [legs, setLegs] = useState<TripLeg[]>([
		{
			id: Date.now().toString(),
			expressway: expressways[0].name,
			origin: expressways[0].exits[0],
			destination: expressways[0].exits[expressways[0].exits.length - 1],
			noEntryScan: false,
		},
	]);

	const addLeg = () => {
		setLegs([
			...legs,
			{
				id: Date.now().toString(),
				expressway: expressways[0].name,
				origin: expressways[0].exits[0],
				destination: expressways[0].exits[expressways[0].exits.length - 1],
				noEntryScan: false,
			},
		]);
	};

	const removeLeg = (id: string) => {
		if (legs.length > 1) {
			setLegs(legs.filter((leg) => leg.id !== id));
		}
	};

	const updateLeg = (id: string, field: keyof TripLeg, value: string) => {
		setLegs((prevLegs) =>
			prevLegs.map((leg) => {
				if (leg.id === id) {
					const updated = { ...leg, [field]: value };
					if (field === "expressway") {
						const newExits =
							expressways.find((exp) => exp.name === value)?.exits || [];
						if (newExits.length > 0) {
							updated.origin = newExits[0];
							updated.destination = newExits[newExits.length - 1];
						}
						// "No entry record" only applies to closed (distance) systems.
						if (!isClosedSystem(value)) {
							updated.noEntryScan = false;
						}
					}
					return updated;
				}
				return leg;
			}),
		);
	};

	const toggleNoEntryScan = (id: string, checked: boolean) => {
		setLegs((prevLegs) =>
			prevLegs.map((leg) =>
				leg.id === id ? { ...leg, noEntryScan: checked } : leg,
			),
		);
	};

	const handleMapSelect = (name: string) => {
		if (legs.length > 0) {
			updateLeg(legs[legs.length - 1].id, "expressway", name);
		}
		setZoomedExpressway(name);
	};

	const handleMapNodeSelect = (expresswayName: string, nodeName: string) => {
		if (legs.length === 0) return;
		setLegs((prevLegs) => {
			const newLegs = [...prevLegs];
			const lastLegIndex = newLegs.length - 1;
			const lastLeg = { ...newLegs[lastLegIndex] };

			if (lastLeg.expressway !== expresswayName) {
				lastLeg.expressway = expresswayName;
				lastLeg.origin = nodeName;
				lastLeg.destination = "";
			} else {
				if (lastLeg.origin && lastLeg.destination) {
					lastLeg.origin = nodeName;
					lastLeg.destination = "";
				} else if (lastLeg.origin && !lastLeg.destination) {
					if (lastLeg.origin !== nodeName) {
						lastLeg.destination = nodeName;
					}
				} else {
					lastLeg.origin = nodeName;
					lastLeg.destination = "";
				}
			}
			newLegs[lastLegIndex] = lastLeg;
			return newLegs;
		});
	};

	let totalToll = 0;
	const computedLegs = legs.map((leg) => {
		const closed = isClosedSystem(leg.expressway);
		const maxCharged = leg.noEntryScan && closed;
		const fee = maxCharged
			? getMaxTollFee(leg.expressway, vehicleClass)
			: getTollFee(leg.expressway, leg.origin, leg.destination, vehicleClass) ||
				0;
		totalToll += fee;
		return { ...leg, fee, closed, maxCharged };
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<div>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">
						{t("subtitle")}
					</p>
				</div>

				<AdBanner dataAdSlot="toll-top" />

				<div
					style={{
						marginTop: "24px",
						display: "flex",
						flexDirection: "column",
						gap: "24px",
					}}
				>
					{/* Interactive Map and Side Panel */}
					<div
						className={zoomedExpressway ? "tool-grid-even" : ""}
						style={{
							alignSelf: "stretch",
							transition: "all 0.3s ease",
							alignItems: "stretch",
						}}
					>
						<div style={{ display: "flex" }}>
							<ExpresswayMap
								onSelectExpressway={handleMapSelect}
								onSelectNode={handleMapNodeSelect}
								selectedExpressway={legs[legs.length - 1]?.expressway}
							/>
						</div>

						{zoomedExpressway && (
							<div
								className="card"
								style={{
									padding: "16px",
									height: "100%",
									maxHeight: "650px",
									overflowY: "auto",
									display: "flex",
									flexDirection: "column",
									animation: "fadeIn 0.3s ease",
									margin: 0,
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginBottom: "12px",
										borderBottom: "1px solid var(--border-color)",
										paddingBottom: "8px",
									}}
								>
									<h2 style={{ margin: 0, fontSize: "16px" }}>
										{t("exitsHeading", { name: zoomedExpressway })}
									</h2>
									<button
										type="button"
										className="btn-secondary"
										onClick={() => setZoomedExpressway(null)}
										style={{
											fontSize: "12px",
											padding: "4px 8px",
											display: "flex",
											alignItems: "center",
											gap: "4px",
										}}
									>
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<line x1="18" y1="6" x2="6" y2="18"></line>
											<line x1="6" y1="6" x2="18" y2="18"></line>
										</svg>
										{t("close")}
									</button>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "8px",
									}}
								>
									{expressways
										.find((e) => e.name === zoomedExpressway)
										?.exits.map((exit, index) => (
											<div
												key={exit}
												style={{
													display: "flex",
													alignItems: "flex-start",
													gap: "12px",
													padding: "8px",
													backgroundColor: "var(--bg-color)",
													borderRadius: "6px",
													border: "1px solid var(--border-color)",
												}}
											>
												<div
													style={{
														width: "20px",
														height: "20px",
														borderRadius: "50%",
														backgroundColor: "var(--primary)",
														color: "white",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														fontSize: "10px",
														fontWeight: "bold",
														flexShrink: 0,
														marginTop: "2px",
													}}
												>
													{index + 1}
												</div>
												<div
													style={{
														flex: 1,
														display: "flex",
														flexDirection: "column",
														gap: "2px",
													}}
												>
													<span
														style={{
															fontWeight: 600,
															fontSize: "14px",
															lineHeight: "1.2",
														}}
													>
														{exit}
													</span>
													<span
														style={{
															fontSize: "11px",
															color: "var(--text-secondary)",
															lineHeight: "1.2",
														}}
													>
													{t("accessNote")}
												</span>
												</div>
												<a
													href={getWikiUrl(zoomedExpressway)}
													target="_blank"
													rel="noreferrer"
													style={{
														fontSize: "11px",
														color: "var(--primary)",
														textDecoration: "none",
														backgroundColor: "rgba(0,122,255,0.1)",
														padding: "4px 8px",
														borderRadius: "4px",
														whiteSpace: "nowrap",
													}}
												>
													{t("wiki")}
												</a>
											</div>
										))}
								</div>
							</div>
						)}
					</div>

					{/* Input Card */}
					<div className="card" style={{ alignSelf: "stretch" }}>
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
							<h2 style={{ fontSize: "18px", margin: 0 }}>{t("tripPlanner")}</h2>
							<select
								className="form-control"
								style={{ width: "auto", padding: "4px 8px" }}
								value={vehicleClass}
								onChange={(e) =>
									setVehicleClass(
										e.target.value as "class1" | "class2" | "class3",
									)
								}
							>
								<option value="class1">{t("class1")}</option>
								<option value="class2">{t("class2")}</option>
								<option value="class3">{t("class3")}</option>
							</select>
						</div>

						<div
							style={{ display: "flex", flexDirection: "column", gap: "16px" }}
						>
							{computedLegs.map((leg, index) => {
								const currentExpressway =
									expressways.find((e) => e.name === leg.expressway) ||
									expressways[0];
								return (
									<div
										key={leg.id}
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
											<strong>{t("leg", { number: index + 1 })}</strong>
											{legs.length > 1 && (
												<button
													onClick={() => removeLeg(leg.id)}
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

										<div
											className="form-group"
											style={{ marginBottom: "12px" }}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<label
													className="form-label"
													htmlFor={`expressway-${leg.id}`}
												>
													{t("expresswayLabel")}
												</label>
												<button
													type="button"
													className="btn-secondary"
													onClick={() => setZoomedExpressway(leg.expressway)}
													style={{
														padding: "4px 8px",
														fontSize: "12px",
														display: "flex",
														alignItems: "center",
														gap: "4px",
													}}
												>
													{t("routeDetails")}
												</button>
											</div>
											<select
												id={`expressway-${leg.id}`}
												className="form-control"
												value={leg.expressway}
												onChange={(e) =>
													updateLeg(leg.id, "expressway", e.target.value)
												}
											>
												{expressways.map((exp) => (
													<option key={exp.name} value={exp.name}>
														{exp.name}
													</option>
												))}
											</select>
										</div>

										<div style={{ display: "flex", gap: "12px" }}>
											<div className="form-group" style={{ flex: 1 }}>
												<label className="form-label" htmlFor="entry-origin">
													{t("entryOrigin")}
												</label>
												<select
													id="entry-origin"
													className="form-control"
													value={leg.origin}
													onChange={(e) =>
														updateLeg(leg.id, "origin", e.target.value)
													}
												>
													{currentExpressway.exits.map((exit) => (
														<option key={exit} value={exit}>
															{exit}
														</option>
													))}
												</select>
											</div>
											<div className="form-group" style={{ flex: 1 }}>
												<label
													className="form-label"
													htmlFor="exit-destination"
												>
													{t("exitDestination")}
												</label>
												<select
													id="exit-destination"
													className="form-control"
													value={leg.destination}
													onChange={(e) =>
														updateLeg(leg.id, "destination", e.target.value)
													}
												>
													{currentExpressway.exits.map((exit) => (
														<option key={exit} value={exit}>
															{exit}
														</option>
													))}
												</select>
											</div>
										</div>
										{leg.closed && (
											<div style={{ marginTop: "12px" }}>
												<label
													htmlFor={`no-entry-${leg.id}`}
													style={{
														display: "flex",
														alignItems: "flex-start",
														gap: "8px",
														fontSize: "13px",
														cursor: "pointer",
														color: "var(--text-secondary)",
													}}
												>
													<input
														id={`no-entry-${leg.id}`}
														type="checkbox"
														checked={leg.noEntryScan}
														onChange={(e) =>
															toggleNoEntryScan(leg.id, e.target.checked)
														}
														style={{
															marginTop: "2px",
															width: "16px",
															height: "16px",
															flexShrink: 0,
															cursor: "pointer",
														}}
													/>
													<span>{t("noEntryScanLabel")}</span>
												</label>
												{leg.maxCharged && (
													<p
													role="note"
													style={{
														fontSize: "12px",
														color: "var(--warning-text)",
														margin: "8px 0 0",
														paddingLeft: "24px",
														lineHeight: 1.4,
													}}
													>
														{t("noEntryScanNote")}
													</p>
												)}
											</div>
										)}
										<div
											style={{
												textAlign: "right",
												marginTop: "12px",
												color: leg.maxCharged
													? "var(--warning-text)"
													: "var(--primary)",
												fontWeight: "bold",
											}}
										>
											{t("feeLabel")} {formatCurrency(leg.fee)}
										</div>
									</div>
								);
							})}
						</div>

						<button
							onClick={addLeg}
							className="btn-secondary"
							style={{ width: "100%", marginTop: "16px" }}
						>
							{t("addExpressway")}
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
								{t("totalTollFees")}
							</h2>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<span style={{ fontSize: "16px" }}>{t("totalEstimatedCost")}</span>
								<strong style={{ fontSize: "32px", color: "var(--primary)" }}>
									{formatCurrency(totalToll)}
								</strong>
							</div>
						</div>

						<div
							className="card"
							style={{ border: "2px solid var(--primary)" }}
						>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "12px",
									color: "var(--primary)",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
									<line x1="2" y1="10" x2="22" y2="10"></line>
								</svg>
								{t("reloadRfid")}
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "16px",
								}}
							>
								{t("reloadRfidDesc")}
							</p>
							<div
								style={{
									display: "flex",
									gap: "12px",
									flexDirection: "column",
								}}
							>
								<a
									href="https://easytrip.ph"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-primary"
									style={{ textAlign: "center", textDecoration: "none" }}
								>
									{t("reloadEasytrip")}
								</a>
								<a
									href="https://autosweeprfid.com"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-secondary"
									style={{ textAlign: "center", textDecoration: "none" }}
								>
									{t("reloadAutosweep")}
								</a>
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
								{t("openVsClosedTitle")}
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "12px",
								}}
							>
								{t("openVsClosedIntro")}
							</p>
							<ul
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									paddingLeft: "20px",
									marginBottom: "12px",
								}}
							>
								<li style={{ marginBottom: "8px" }}>
									<strong>{t("openSystemTitle")}</strong> {t("openSystemDesc")}
									<br />
									<span style={{ fontSize: "12px", fontStyle: "italic" }}>
										{t("openSystemExamples")}
									</span>
								</li>
								<li>
									<strong>{t("closedSystemTitle")}</strong>{" "}
									{t.rich("closedSystemDesc", {
										b: (chunks) => <strong>{chunks}</strong>,
									})}
									<br />
									<span style={{ fontSize: "12px", fontStyle: "italic" }}>
										{t("closedSystemExamples")}
									</span>
								</li>
							</ul>
							<p
								style={{
									fontSize: "12px",
									color: "var(--text-secondary)",
									fontStyle: "italic",
								}}
							>
								{t("systemsNote")}
							</p>
							<div
								style={{
									marginTop: "12px",
									padding: "12px",
									borderRadius: "6px",
									backgroundColor: "var(--warning-bg)",
									border: "1px solid var(--warning-border)",
								}}
							>
								<h4
									style={{
										fontSize: "14px",
										margin: "0 0 6px",
										color: "var(--warning-text)",
									}}
								>
									{t("noEntryCardTitle")}
								</h4>
								<p
									style={{
										fontSize: "13px",
										color: "var(--text-secondary)",
										margin: 0,
										lineHeight: 1.5,
									}}
								>
									{t("noEntryCardDesc")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
