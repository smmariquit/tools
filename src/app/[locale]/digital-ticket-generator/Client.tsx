"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function DigitalTicketClient() {
	const [attendeeName, setAttendeeName] = useState("Juan Dela Cruz");
	const [eventName, setEventName] = useState("Philippine Startup Week 2026");
	const [ticketType, setTicketType] = useState("VIP Pass");

	// Simulated Cryptographic Signature (Mock JWT Payload)
	const timestamp = new Date().getTime();
	const payload = JSON.stringify({
		name: attendeeName,
		event: eventName,
		tier: ticketType,
		issuedAt: timestamp,
		hash: typeof window !== 'undefined' ? btoa(`${attendeeName}-${eventName}-${timestamp}`).slice(0, 16) : ''
	}, null, 2);

	return (
		<ToolLayout>
			<ToolHeader
				title="Digital Ticketing QR Generator"
				subtitle="Generate secure, stateless JSON payloads ready for QR encoding without a centralized database."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Attendee Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Attendee Full Name</label>
							<input type="text" className="form-control" value={attendeeName} onChange={(e) => setAttendeeName(e.target.value)} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Event Name</label>
							<input type="text" className="form-control" value={eventName} onChange={(e) => setEventName(e.target.value)} />
						</div>

						<div className="form-group">
							<label className="form-label">Ticket Tier</label>
							<select className="form-control" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
								<option value="General Admission">General Admission</option>
								<option value="VIP Pass">VIP Pass</option>
								<option value="Backstage Access">Backstage Access</option>
							</select>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)", textAlign: "center" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Verifiable Ticket Payload</h2>
						
						<div style={{ 
							width: "200px", 
							height: "200px", 
							backgroundColor: "var(--text-color)", 
							margin: "0 auto 16px", 
							display: "flex", 
							alignItems: "center", 
							justifyContent: "center",
							borderRadius: "8px",
							color: "var(--bg-color)"
						}}>
							{/* Placeholder for actual QR code rendering library */}
							<div style={{ padding: "16px", textAlign: "center" }}>
								<div style={{ fontSize: "48px", marginBottom: "8px" }}>🎟️</div>
								<div style={{ fontSize: "12px", fontWeight: "bold" }}>QR Code Target</div>
							</div>
						</div>
						
						<div style={{ textAlign: "left", backgroundColor: "rgba(13, 71, 161, 0.05)", padding: "12px", borderRadius: "8px" }}>
							<div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: "bold" }}>Stateless JSON Data:</div>
							<pre style={{ fontSize: "12px", overflowX: "auto", margin: 0, fontFamily: "monospace" }}>
								{payload}
							</pre>
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							In production, this JSON is cryptographically signed and encoded into the QR code above. Scanners verify the signature locally using a public key.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
