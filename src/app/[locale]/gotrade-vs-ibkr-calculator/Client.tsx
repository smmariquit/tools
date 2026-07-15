"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function GotradeIbkrClient() {
	const t = useTranslations("GoTradeVsIBKR");
	const [depositPhp, setDepositPhp] = useState(50000);
	const [usdPhpRate, setUsdPhpRate] = useState(56);
	const [trades, setTrades] = useState(1);

	// GoTrade Logic
	const gotradeFxSpread = 0.015; // 1.5%
	const gotradeUsdPhpRate = usdPhpRate * (1 + gotradeFxSpread);
	const gotradeUsdDeposited = depositPhp / gotradeUsdPhpRate;

	const gotradeTradeFee = 0; // assuming no trade fee on clearing, just spread
	const gotradeTotalFriction =
		depositPhp -
		gotradeUsdDeposited * usdPhpRate +
		gotradeTradeFee * trades * usdPhpRate;

	// IBKR + Wise Logic
	const wiseFeePercentage = 0.00635; // approx 0.635%
	const wiseFlatFee = 35; // approx PHP 35 fixed
	const ibkrTradeFeeUsd = 0.35; // minimum tiered fee

	const wiseDepositFeePhp = depositPhp * wiseFeePercentage + wiseFlatFee;
	const ibkrUsdDeposited = (depositPhp - wiseDepositFeePhp) / usdPhpRate;

	const ibkrTotalTradeFeePhp = ibkrTradeFeeUsd * trades * usdPhpRate;
	const ibkrTotalFriction = wiseDepositFeePhp + ibkrTotalTradeFeePhp;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	const formatUSD = (val: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
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
							{t("investmentDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-depositAmountLabel">
								{t("depositAmountLabel")}
							</label>
							<input
								id="f-depositAmountLabel"
								type="number"
								className="form-control"
								value={depositPhp || ""}
								onChange={(e) => setDepositPhp(Number(e.target.value))}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-baseRateLabel">
								{t("baseRateLabel")}
							</label>
							<input
								id="f-baseRateLabel"
								type="number"
								className="form-control"
								value={usdPhpRate || ""}
								onChange={(e) => setUsdPhpRate(Number(e.target.value))}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-numTradesLabel">
								{t("numTradesLabel")}
							</label>
							<input
								id="f-numTradesLabel"
								type="number"
								className="form-control"
								value={trades || ""}
								onChange={(e) => setTrades(Number(e.target.value))}
							/>
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
							{t("comparisonResults")}
						</h2>

						<div
							style={{
								padding: "16px",
								backgroundColor: "var(--bg-color)",
								borderRadius: "8px",
								marginBottom: "16px",
								borderLeft: "4px solid var(--chart-2)",
							}}
						>
							<h3
								style={{
									fontSize: "14px",
									marginBottom: "12px",
									color: "var(--chart-2)",
								}}
							>
								{t("gotradeTitle")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("actualUsdReceived")}</span>{" "}
								<strong>{formatUSD(gotradeUsdDeposited)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "red",
									marginTop: "4px",
								}}
							>
								<span>{t("gotradeTotalLoss")}</span>{" "}
								<span>{formatPHP(gotradeTotalFriction)}</span>
							</div>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "var(--bg-color)",
								borderRadius: "8px",
								marginBottom: "16px",
								borderLeft: "4px solid var(--danger)",
							}}
						>
							<h3
								style={{
									fontSize: "14px",
									marginBottom: "12px",
									color: "var(--danger)",
								}}
							>
								{t("ibkrTitle")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("actualUsdReceived")}</span>{" "}
								<strong>{formatUSD(ibkrUsdDeposited)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "red",
									marginTop: "4px",
								}}
							>
								<span>{t("ibkrTotalLoss")}</span>{" "}
								<span>{formatPHP(ibkrTotalFriction)}</span>
							</div>
						</div>

						<div
							style={{
								marginTop: "16px",
								padding: "12px",
								backgroundColor:
									gotradeTotalFriction < ibkrTotalFriction
										? "rgba(14, 165, 233, 0.1)"
										: "rgba(217, 45, 32, 0.1)",
								textAlign: "center",
								borderRadius: "8px",
								fontWeight: "bold",
							}}
						>
							{t("winnerLabel")}{" "}
							{gotradeTotalFriction < ibkrTotalFriction
								? t("winnerGotrade")
								: t("winnerIbkr")}
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
