"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";
import TrustBadge from "../../components/TrustBadge";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const Chart = dynamic(() => import("./Chart"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--text-secondary)",
			}}
		>
			…
		</div>
	),
});

type UnitType = "mass" | "volume" | "count";

interface Unit {
	name: string;
	type: UnitType;
	toBase: number; // Multiplier to get to base unit (g, ml, pc)
}

const UNITS: Record<string, Unit> = {
	kg: { name: "Kilogram (kg)", type: "mass", toBase: 1000 },
	g: { name: "Gram (g)", type: "mass", toBase: 1 },
	mg: { name: "Milligram (mg)", type: "mass", toBase: 0.001 },
	lb: { name: "Pound (lb)", type: "mass", toBase: 453.592 },
	oz: { name: "Ounce (oz)", type: "mass", toBase: 28.3495 },
	l: { name: "Liter (L)", type: "volume", toBase: 1000 },
	ml: { name: "Milliliter (ml)", type: "volume", toBase: 1 },
	cup: { name: "Cup", type: "volume", toBase: 240 },
	tbsp: { name: "Tablespoon (tbsp)", type: "volume", toBase: 15 },
	tsp: { name: "Teaspoon (tsp)", type: "volume", toBase: 5 },
	pc: { name: "Piece (pc)", type: "count", toBase: 1 },
	pack: { name: "Pack", type: "count", toBase: 1 },
};

interface Ingredient {
	id: string;
	name: string;
	boughtPrice: number;
	boughtQty: number;
	boughtUnit: string;
	usedQty: number;
	usedUnit: string;
}

export default function FoodCostCalculatorClient() {
	const t = useTranslations("FoodCost");
	const [recipeName, setRecipeName] = useState("My Recipe");
	const [yieldServings, setYieldServings] = useState(1);

	const [ingredients, setIngredients] = useState<Ingredient[]>([
		{
			id: "1",
			name: "Pork Belly",
			boughtPrice: 350,
			boughtQty: 1,
			boughtUnit: "kg",
			usedQty: 500,
			usedUnit: "g",
		},
	]);

	const [laborCost, setLaborCost] = useState(0);
	const [overheadCost, setOverheadCost] = useState(0); // Packaging, Gas, etc

	const [targetMargin, setTargetMargin] = useState(60); // 60% food cost margin

	const [vatIncluded, setVatIncluded] = useState(false);
	const [serviceChargePct, setServiceChargePct] = useState(0);

	const [isLoaded, setIsLoaded] = useState(false);

	// Load from LocalStorage
	useEffect(() => {
		try {
			const saved = localStorage.getItem("foodCostDraft");
			if (saved) {
				const data = JSON.parse(saved);
				if (data.recipeName) setRecipeName(data.recipeName);
				if (data.yieldServings) setYieldServings(data.yieldServings);
				if (data.ingredients) setIngredients(data.ingredients);
				if (data.laborCost !== undefined) setLaborCost(data.laborCost);
				if (data.overheadCost !== undefined) setOverheadCost(data.overheadCost);
				if (data.targetMargin) setTargetMargin(data.targetMargin);
				if (data.vatIncluded !== undefined) setVatIncluded(data.vatIncluded);
				if (data.serviceChargePct !== undefined)
					setServiceChargePct(data.serviceChargePct);
			}
		} catch (e) {
			console.error("Failed to parse saved food cost data", e);
		}
		setIsLoaded(true);
	}, []);

	// Save to LocalStorage
	useEffect(() => {
		if (!isLoaded) return;
		const data = {
			recipeName,
			yieldServings,
			ingredients,
			laborCost,
			overheadCost,
			targetMargin,
			vatIncluded,
			serviceChargePct,
		};
		localStorage.setItem("foodCostDraft", JSON.stringify(data));
	}, [
		recipeName,
		yieldServings,
		ingredients,
		laborCost,
		overheadCost,
		targetMargin,
		vatIncluded,
		serviceChargePct,
		isLoaded,
	]);

	// --- Calculations ---

	const calculateIngredientCost = (ing: Ingredient) => {
		const bUnit = UNITS[ing.boughtUnit];
		const uUnit = UNITS[ing.usedUnit];

		if (!bUnit || !uUnit) return 0;
		if (
			bUnit.type !== uUnit.type &&
			bUnit.type !== "count" &&
			uUnit.type !== "count"
		) {
			// Cannot accurately convert mass to volume without density, default to simple ratio if they force it
			// But UI should ideally prevent this. For now, if mismatched, just assume 1:1 base
		}

		// Normalize both to their base units
		const boughtInBase = ing.boughtQty * bUnit.toBase;
		const usedInBase = ing.usedQty * uUnit.toBase;

		if (boughtInBase === 0) return 0;

		const costPerBase = ing.boughtPrice / boughtInBase;
		return costPerBase * usedInBase;
	};

	const totalIngredientsCost = ingredients.reduce(
		(sum, ing) => sum + calculateIngredientCost(ing),
		0,
	);
	const totalRecipeCost = totalIngredientsCost + laborCost + overheadCost;
	const costPerServing =
		yieldServings > 0 ? totalRecipeCost / yieldServings : 0;

	// Selling price calculation based on Target Margin
	const baseSellingPrice =
		costPerServing > 0 ? costPerServing / (1 - targetMargin / 100) : 0;

	const vatAmount = vatIncluded ? baseSellingPrice * 0.12 : 0;
	// SC is usually computed on the VAT-inclusive amount
	const scAmount = (baseSellingPrice + vatAmount) * (serviceChargePct / 100);

	const finalMenuPrice = baseSellingPrice + vatAmount + scAmount;
	const estimatedProfitPerServing = baseSellingPrice - costPerServing;

	// Senior Citizen & PWD Formula: (Price / 1.12) * 0.8 - Exempt from VAT, minus 20%
	const baseForSenior = vatIncluded ? finalMenuPrice / 1.12 : finalMenuPrice;
	const seniorPrice = baseForSenior * 0.8;

	// --- Actions ---
	const addIngredient = () => {
		setIngredients([
			...ingredients,
			{
				id: Math.random().toString(),
				name: "",
				boughtPrice: 0,
				boughtQty: 1,
				boughtUnit: "kg",
				usedQty: 1,
				usedUnit: "kg",
			},
		]);
	};

	const updateIngredient = (
		id: string,
		field: keyof Ingredient,
		value: any,
	) => {
		setIngredients(
			ingredients.map((ing) =>
				ing.id === id ? { ...ing, [field]: value } : ing,
			),
		);
	};

	const removeIngredient = (id: string) => {
		setIngredients(ingredients.filter((ing) => ing.id !== id));
	};

	const chartData = [
		{
			name: t("chartIngredients"),
			value: totalIngredientsCost,
			fill: "#3b82f6",
		},
		{ name: t("chartLabor"), value: laborCost, fill: "#10b981" },
		{ name: t("chartOverhead"), value: overheadCost, fill: "#f59e0b" },
		{
			name: t("chartProfit"),
			value: estimatedProfitPerServing * yieldServings,
			fill: "#8b5cf6",
		},
	].filter((d) => d.value > 0);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader title={t("title")} subtitle={t("subtitle")} />

			<div style={{ marginTop: "24px", width: "100%" }}>
				<TrustBadge year={2026} lastReviewed="May 2026" />
			</div>

			<div className="tool-grid">
				{/* LEFT COLUMN - INPUTS */}
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					{/* Recipe Details */}
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
								display: "flex",
								alignItems: "center",
								gap: "8px",
							}}
						>
							<span></span> {t("recipeDetails")}
						</h2>
						<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
							<div className="form-group" style={{ flex: "1 1 200px" }}>
								<label className="form-label">{t("recipeNameLabel")}</label>
								<input
									type="text"
									className="form-control"
									value={recipeName}
									onChange={(e) => setRecipeName(e.target.value)}
									placeholder={t("recipeNamePlaceholder")}
								/>
							</div>
							<div className="form-group" style={{ flex: "1 1 120px" }}>
								<label className="form-label">{t("yieldLabel")}</label>
								<input
									type="number"
									className="form-control"
									value={yieldServings || ""}
									onChange={(e) => setYieldServings(Number(e.target.value))}
									min="1"
								/>
							</div>
						</div>
					</div>

					{/* Ingredients List */}
					<div className="card">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "16px",
							}}
						>
							<h2
								style={{
									fontSize: "18px",
									color: "var(--primary)",
									margin: 0,
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<span></span> {t("ingredientsCosting")}
							</h2>
							<button
								className="btn-secondary"
								style={{
									padding: "6px 12px",
									fontSize: "14px",
									display: "flex",
									alignItems: "center",
									gap: "4px",
								}}
								onClick={addIngredient}
							>
								<span></span> {t("addItem")}
							</button>
						</div>

						{ingredients.length === 0 && (
							<p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
								{t("noIngredients")}
							</p>
						)}

						<div
							style={{ display: "flex", flexDirection: "column", gap: "16px" }}
						>
							{ingredients.map((ing, index) => (
								<div
									key={ing.id}
									style={{
										padding: "16px",
										border: "1px solid var(--border-color)",
										borderRadius: "8px",
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
										<strong style={{ fontSize: "14px" }}>
											{t("itemN", { n: index + 1 })}
										</strong>
										<button
											onClick={() => removeIngredient(ing.id)}
											style={{
												background: "none",
												border: "none",
												color: "red",
												cursor: "pointer",
												fontSize: "14px",
											}}
										>
											{t("remove")}
										</button>
									</div>

									<div className="form-group" style={{ marginBottom: "12px" }}>
										<input
											type="text"
											className="form-control"
											placeholder={t("ingredientNamePlaceholder")}
											value={ing.name}
											onChange={(e) =>
												updateIngredient(ing.id, "name", e.target.value)
											}
										/>
									</div>

									<div
										style={{
											display: "grid",
											gridTemplateColumns: "1fr 1fr",
											gap: "12px",
											marginBottom: "12px",
										}}
									>
										<div className="form-group">
											<label
												className="form-label"
												style={{ fontSize: "14px" }}
											>
												{t("boughtPrice")}
											</label>
											<input
												type="number"
												className="form-control"
												value={ing.boughtPrice || ""}
												onChange={(e) =>
													updateIngredient(
														ing.id,
														"boughtPrice",
														Number(e.target.value),
													)
												}
											/>
										</div>
										<div className="form-group">
											<label
												className="form-label"
												style={{ fontSize: "14px" }}
											>
												{t("boughtQtyUnit")}
											</label>
											<div style={{ display: "flex", gap: "4px" }}>
												<input
													type="number"
													className="form-control"
													value={ing.boughtQty || ""}
													onChange={(e) =>
														updateIngredient(
															ing.id,
															"boughtQty",
															Number(e.target.value),
														)
													}
													style={{ flex: 1 }}
												/>
												<select
													className="form-control"
													value={ing.boughtUnit}
													onChange={(e) =>
														updateIngredient(
															ing.id,
															"boughtUnit",
															e.target.value,
														)
													}
													style={{ flex: 1, padding: "8px 4px" }}
												>
													{Object.keys(UNITS).map((k) => (
														<option key={k} value={k}>
															{k}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									<div
										style={{
											display: "grid",
											gridTemplateColumns: "1fr 1fr",
											gap: "12px",
										}}
									>
										<div className="form-group">
											<label
												className="form-label"
												style={{ fontSize: "14px", color: "var(--primary)" }}
											>
												{t("costOfUsed")}
											</label>
											<div
												style={{
													padding: "8px",
													backgroundColor: "var(--surface-color)",
													border: "1px solid var(--border-color)",
													borderRadius: "6px",
													fontSize: "14px",
													fontWeight: 600,
												}}
											>
												{formatPHP(calculateIngredientCost(ing))}
											</div>
										</div>
										<div className="form-group">
											<label
												className="form-label"
												style={{ fontSize: "14px" }}
											>
												{t("usedQty")}
											</label>
											<div style={{ display: "flex", gap: "4px" }}>
												<input
													type="number"
													className="form-control"
													value={ing.usedQty || ""}
													onChange={(e) =>
														updateIngredient(
															ing.id,
															"usedQty",
															Number(e.target.value),
														)
													}
													style={{ flex: 1 }}
												/>
												<select
													className="form-control"
													value={ing.usedUnit}
													onChange={(e) =>
														updateIngredient(ing.id, "usedUnit", e.target.value)
													}
													style={{ flex: 1, padding: "8px 4px" }}
												>
													{Object.keys(UNITS).map((k) => (
														<option key={k} value={k}>
															{k}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Additional Costs */}
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
								display: "flex",
								alignItems: "center",
								gap: "8px",
							}}
						>
							<span>‍</span> {t("laborOverhead")}
						</h2>
						<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
							<div className="form-group" style={{ flex: "1 1 150px" }}>
								<label className="form-label">{t("laborCostLabel")}</label>
								<input
									type="number"
									className="form-control"
									value={laborCost || ""}
									onChange={(e) => setLaborCost(Number(e.target.value))}
								/>
							</div>
							<div className="form-group" style={{ flex: "1 1 150px" }}>
								<label className="form-label">{t("packagingLabel")}</label>
								<input
									type="number"
									className="form-control"
									value={overheadCost || ""}
									onChange={(e) => setOverheadCost(Number(e.target.value))}
								/>
							</div>
						</div>
					</div>

					{/* PH Pricing Adjustments */}
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
								display: "flex",
								alignItems: "center",
								gap: "8px",
							}}
						>
							<span></span> {t("taxesFees")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
								}}
							>
								<input
									type="checkbox"
									checked={vatIncluded}
									onChange={(e) => setVatIncluded(e.target.checked)}
									style={{ width: "18px", height: "18px" }}
								/>
								<span style={{ fontWeight: 500 }}>{t("vatLabel")}</span>
							</label>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
									marginLeft: "26px",
								}}
							>
								{t("vatHint")}
							</p>
						</div>

						<div className="form-group">
							<label className="form-label">{t("serviceChargeLabel")}</label>
							<div
								style={{ display: "flex", alignItems: "center", gap: "12px" }}
							>
								<input
									type="range"
									min="0"
									max="15"
									step="1"
									value={serviceChargePct}
									onChange={(e) => setServiceChargePct(Number(e.target.value))}
									style={{ flex: 1 }}
								/>
								<span style={{ fontWeight: 600, minWidth: "40px" }}>
									{serviceChargePct}%
								</span>
							</div>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								{t("serviceChargeHint")}
							</p>
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN - RESULTS */}
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div
						className="card"
						style={{
							backgroundColor: "var(--bg-color)",
							position: "sticky",
							top: "100px",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "12px",
							}}
						>
							<h2
								style={{
									fontSize: "20px",
									color: "var(--primary)",
									margin: 0,
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<span></span> {t("costingSummary")}
							</h2>
							{isLoaded && (
								<span
									style={{
										fontSize: "14px",
										color: "var(--text-secondary)",
										backgroundColor: "var(--surface-color)",
										padding: "4px 8px",
										borderRadius: "12px",
										border: "1px solid var(--border-color)",
									}}
								>
									{" "}
									{t("autoSaved")}
								</span>
							)}
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalIngredientsCost")}</span>
							<strong>{formatPHP(totalIngredientsCost)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("laborAndOverhead")}</span>
							<strong>{formatPHP(laborCost + overheadCost)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								paddingBottom: "16px",
								borderBottom: "1px dashed var(--border-color)",
								fontSize: "16px",
							}}
						>
							<span>{t("totalBatchCost")}</span>
							<strong>{formatPHP(totalRecipeCost)}</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "24px",
								fontSize: "18px",
								color: "var(--primary)",
								fontWeight: 700,
							}}
						>
							<span>{t("costPerServing")}</span>
							<span>{formatPHP(costPerServing)}</span>
						</div>

						<h3
							style={{
								fontSize: "16px",
								marginBottom: "12px",
								color: "var(--text-primary)",
							}}
						>
							{t("pricingStrategy")}
						</h3>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("targetMargin")}</label>
							<div
								style={{ display: "flex", alignItems: "center", gap: "12px" }}
							>
								<input
									type="range"
									min="10"
									max="90"
									step="1"
									value={targetMargin}
									onChange={(e) => setTargetMargin(Number(e.target.value))}
									style={{ flex: 1 }}
								/>
								<span style={{ fontWeight: 600, minWidth: "40px" }}>
									{targetMargin}%
								</span>
							</div>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(13, 71, 161, 0.05)",
								border: "1px solid rgba(13, 71, 161, 0.2)",
								borderRadius: "8px",
								marginBottom: "24px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "12px",
									fontSize: "14px",
								}}
							>
								<span>{t("baseSellingPrice")}</span>
								<strong>{formatPHP(baseSellingPrice)}</strong>
							</div>

							{vatIncluded && (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "12px",
										fontSize: "14px",
										color: "var(--text-secondary)",
									}}
								>
									<span>{t("vatLine")}</span>
									<span>{formatPHP(vatAmount)}</span>
								</div>
							)}

							{serviceChargePct > 0 && (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "12px",
										fontSize: "14px",
										color: "var(--text-secondary)",
									}}
								>
									<span>
										{t("serviceChargeLine", { pct: serviceChargePct })}
									</span>
									<span>{formatPHP(scAmount)}</span>
								</div>
							)}

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "16px",
									paddingTop: "12px",
									borderTop: "1px dashed rgba(13, 71, 161, 0.2)",
								}}
							>
								<span style={{ fontSize: "16px", fontWeight: 600 }}>
									{t("finalMenuPrice")}
								</span>
								<strong style={{ fontSize: "22px", color: "var(--primary)" }}>
									{formatPHP(finalMenuPrice)}
								</strong>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								<span>{t("profitPerServing")}</span>
								<strong style={{ color: "green" }}>
									+{formatPHP(estimatedProfitPerServing)}
								</strong>
							</div>
						</div>

						{/* Senior Discount Info */}
						<div
							style={{
								padding: "12px",
								backgroundColor: "rgba(245, 158, 11, 0.1)",
								border: "1px solid rgba(245, 158, 11, 0.3)",
								borderRadius: "8px",
								marginBottom: "24px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div>
									<h4
										style={{
											margin: "0 0 4px 0",
											fontSize: "14px",
											color: "#b45309",
										}}
									>
										{t("seniorTitle")}
									</h4>
									<p
										style={{
											margin: 0,
											fontSize: "14px",
											color: "var(--text-secondary)",
										}}
									>
										{t("seniorSubtitle")}
									</p>
								</div>
								<strong style={{ fontSize: "18px", color: "#b45309" }}>
									{formatPHP(seniorPrice)}
								</strong>
							</div>
						</div>

						<div style={{ height: "200px", width: "100%", marginTop: "16px" }}>
							<Chart data={chartData} formatValue={formatPHP} />
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
