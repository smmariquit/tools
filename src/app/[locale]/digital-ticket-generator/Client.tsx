"use client";

import { useTranslations } from "next-intl";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function DigitalTicketClient() {
	const t = useTranslations("DigitalTicketGenerator");
	const [attendeeName, setAttendeeName] = useState("Juan Dela Cruz");
	const [eventName, setEventName] = useState("Philippine Startup Week 2026");
	const [ticketType, setTicketType] = useState("VIP Pass");
	const [qrDataUrl, setQrDataUrl] = useState("");

	const payload = useMemo(() => {
		const fingerprint =
			typeof window !== "undefined"
				? btoa(`${attendeeName}-${eventName}-${ticketType}`).slice(0, 16)
				: "";
		return JSON.stringify(
			{
				name: attendeeName,
				event: eventName,
				tier: ticketType,
				ref: fingerprint,
			},
			null,
			2,
		);
	}, [attendeeName, eventName, ticketType]);

	useEffect(() => {
		let active = true;
		QRCode.toDataURL(payload, { width: 200, margin: 1 })
			.then((url) => {
				if (active) setQrDataUrl(url);
			})
			.catch(() => {
				if (active) setQrDataUrl("");
			});
		return () => {
			active = false;
		};
	}, [payload]);

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
							{t("attendeeDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("attendeeNameLabel")}</label>
							<input
								type="text"
								className="form-control"
								value={attendeeName}
								onChange={(e) => setAttendeeName(e.target.value)}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("eventNameLabel")}</label>
							<input
								type="text"
								className="form-control"
								value={eventName}
								onChange={(e) => setEventName(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label className="form-label">{t("ticketTierLabel")}</label>
							<select
								className="form-control"
								value={ticketType}
								onChange={(e) => setTicketType(e.target.value)}
							>
								<option value="General Admission">{t("tierGeneral")}</option>
								<option value="VIP Pass">{t("tierVip")}</option>
								<option value="Backstage Access">{t("tierBackstage")}</option>
							</select>
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
							textAlign: "center",
						}}
					>
						<h2
							style={{
								fontSize: "20px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("payloadTitle")}
						</h2>

						<div
							style={{
								width: "200px",
								height: "200px",
								backgroundColor: "#ffffff",
								margin: "0 auto 16px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "8px",
								border: "1px solid var(--border-color)",
								padding: "8px",
							}}
						>
							{qrDataUrl ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={qrDataUrl}
									alt={t("qrTarget")}
									width={184}
									height={184}
								/>
							) : null}
						</div>

						<div
							style={{
								textAlign: "left",
								backgroundColor: "rgba(13, 71, 161, 0.05)",
								padding: "12px",
								borderRadius: "8px",
							}}
						>
							<div
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "8px",
									fontWeight: "bold",
								}}
							>
								{t("statelessJson")}
							</div>
							<pre
								style={{
									fontSize: "14px",
									overflowX: "auto",
									margin: 0,
									fontFamily: "monospace",
								}}
							>
								{payload}
							</pre>
						</div>

						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginTop: "16px",
							}}
						>
							{t("productionNote")}
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
