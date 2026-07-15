"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function InfluencerRateClient() {
	const t = useTranslations("InfluencerRate");
	const [platform, setPlatform] = useState("ig");
	const [followers, setFollowers] = useState(50000);
	const [likes, setLikes] = useState(1500);
	const [comments, setComments] = useState(100);
	const [shares, setShares] = useState(50);
	const [views, setViews] = useState(10000);

	const [isVideo, setIsVideo] = useState(false);
	const [hasUsageRights, setHasUsageRights] = useState(false);
	const [hasExclusivity, setHasExclusivity] = useState(false);

	let engagements = likes + comments + shares;
	if (platform === "tiktok") {
		engagements += views;
	}

	const er = followers > 0 ? (engagements / followers) * 100 : 0;

	let multiplier = 0.25; // default micro
	if (followers <= 10000) multiplier = 0.45;
	else if (followers <= 100000) multiplier = 0.32;
	else if (followers <= 1000000) multiplier = 0.17;
	else multiplier = 0.1;

	const usdToPhp = 56; // Standard exchange rate for estimates
	const baseRateUSD = (er / 100) * followers * multiplier;
	const baseRatePHP = baseRateUSD * usdToPhp;

	let totalPremium = 1.0;
	if (isVideo) totalPremium += 0.25;
	if (hasUsageRights) totalPremium += 0.75;
	if (hasExclusivity) totalPremium += 0.35;

	const finalRatePHP = baseRatePHP * totalPremium;

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
							{t("metrics")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("platform")}</label>
							<select
								className="form-control"
								value={platform}
								onChange={(e) => setPlatform(e.target.value)}
							>
								<option value="ig">{t("platformIg")}</option>
								<option value="tiktok">{t("platformTiktok")}</option>
								<option value="yt">{t("platformYt")}</option>
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("followerCount")}</label>
							<input
								type="number"
								className="form-control"
								value={followers || ""}
								onChange={(e) => setFollowers(Number(e.target.value))}
							/>
						</div>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "16px",
								marginBottom: "16px",
							}}
						>
							<div className="form-group">
								<label className="form-label">{t("avgLikes")}</label>
								<input
									type="number"
									className="form-control"
									value={likes || ""}
									onChange={(e) => setLikes(Number(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<label className="form-label">{t("avgComments")}</label>
								<input
									type="number"
									className="form-control"
									value={comments || ""}
									onChange={(e) => setComments(Number(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<label className="form-label">{t("avgShares")}</label>
								<input
									type="number"
									className="form-control"
									value={shares || ""}
									onChange={(e) => setShares(Number(e.target.value))}
								/>
							</div>
							{platform === "tiktok" && (
								<div className="form-group">
									<label className="form-label">{t("avgViews")}</label>
									<input
										type="number"
										className="form-control"
										value={views || ""}
										onChange={(e) => setViews(Number(e.target.value))}
									/>
								</div>
							)}
						</div>

						<h2
							style={{
								fontSize: "16px",
								marginBottom: "12px",
								color: "var(--primary)",
							}}
						>
							{t("creativePremiums")}
						</h2>

						<div className="form-group">
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
									marginBottom: "8px",
								}}
							>
								<input
									type="checkbox"
									checked={isVideo}
									onChange={(e) => setIsVideo(e.target.checked)}
								/>
								<span style={{ fontSize: "14px" }}>{t("premiumVideo")}</span>
							</label>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
									marginBottom: "8px",
								}}
							>
								<input
									type="checkbox"
									checked={hasUsageRights}
									onChange={(e) => setHasUsageRights(e.target.checked)}
								/>
								<span style={{ fontSize: "14px" }}>
									{t("premiumUsageRights")}
								</span>
							</label>
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
									checked={hasExclusivity}
									onChange={(e) => setHasExclusivity(e.target.checked)}
								/>
								<span style={{ fontSize: "14px" }}>
									{t("premiumExclusivity")}
								</span>
							</label>
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
							{t("pricingTitle")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("engagementRate")}</span>
							<strong>{er.toFixed(2)}%</strong>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(16, 185, 129, 0.05)",
								border: "1px solid rgba(16, 185, 129, 0.2)",
								borderRadius: "8px",
								marginBottom: "16px",
								marginTop: "16px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("baseRate")}</span>
								<strong>{formatPHP(baseRatePHP)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								<span>{t("premiumsAddons")}</span>
								<span>+ {formatPHP(finalRatePHP - baseRatePHP)}</span>
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
							<span>{t("recommendedRate")}</span>
							<span>{formatPHP(finalRatePHP)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
