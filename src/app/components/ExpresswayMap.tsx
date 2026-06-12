"use client";

import React from "react";

type ExpresswayMapProps = {
	onSelectExpressway: (name: string) => void;
	onSelectNode?: (expresswayName: string, nodeName: string) => void;
	selectedExpressway?: string;
};

export default function ExpresswayMap({
	onSelectExpressway,
	onSelectNode,
	selectedExpressway,
}: ExpresswayMapProps) {
	const isSelected = (name: string) => selectedExpressway === name;

	const handleNodeClick = (
		e: React.MouseEvent,
		expresswayName: string,
		nodeName: string,
	) => {
		e.stopPropagation(); // Prevent triggering the expressway line click
		if (onSelectNode) {
			onSelectNode(expresswayName, nodeName);
		}
	};

	const getStrokeOpacity = (name: string) => {
		if (!selectedExpressway) return 1;
		return isSelected(name) ? 1 : 0.3;
	};

	const getStrokeWidth = (name: string) => {
		return isSelected(name) ? 8 : 6;
	};

	const mapStyle = {
		backgroundColor: "var(--bg-color)",
		borderRadius: "8px",
		padding: "16px",
		border: "1px solid var(--border-color)",
		width: "100%",
		maxWidth: "500px",
		margin: "0 auto",
	};

	const textStyle = {
		fontFamily: "system-ui, sans-serif",
		fontSize: "12px",
		fontWeight: "600",
		fill: "var(--text-primary)",
		cursor: "pointer",
		userSelect: "none" as const,
	};

	const titleStyle = {
		...textStyle,
		fontSize: "16px",
		fontWeight: "bold",
		fill: "var(--primary)",
	};

	return (
		<div style={mapStyle}>
			<svg viewBox="0 0 400 650" style={{ width: "100%", height: "auto" }}>
				<defs>
					<filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>

				{/* Luzon Network Title */}
				<text x="20" y="30" style={titleStyle}>
					Luzon Toll Network
				</text>

				{/* TPLEX */}
				<g
					onClick={() => onSelectExpressway("TPLEX")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("TPLEX")}
				>
					<path
						d="M 200 60 L 200 140"
						stroke="#E91E63"
						strokeWidth={getStrokeWidth("TPLEX")}
						strokeLinecap="round"
					/>
					<g onClick={(e) => handleNodeClick(e, "TPLEX", "Rosario")}>
						<circle
							cx="200"
							cy="60"
							r="4"
							fill="#fff"
							stroke="#E91E63"
							strokeWidth="2"
						/>
						<text x="215" y="65" style={textStyle}>
							Rosario
						</text>
					</g>
					<text x="140" y="100" style={{ ...textStyle, fill: "#E91E63" }}>
						TPLEX
					</text>
					<g onClick={(e) => handleNodeClick(e, "TPLEX", "Tarlac")}>
						<circle
							cx="200"
							cy="140"
							r="4"
							fill="#fff"
							stroke="#E91E63"
							strokeWidth="2"
						/>
						<text x="215" y="145" style={textStyle}>
							Tarlac
						</text>
					</g>
				</g>

				{/* SCTEX */}
				<g
					onClick={() =>
						onSelectExpressway("SCTEX (Subic-Clark-Tarlac Expressway)")
					}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("SCTEX (Subic-Clark-Tarlac Expressway)")}
				>
					<path
						d="M 200 140 L 200 200 L 100 200 L 60 180"
						stroke="#9C27B0"
						strokeWidth={getStrokeWidth(
							"SCTEX (Subic-Clark-Tarlac Expressway)",
						)}
						strokeLinejoin="round"
						fill="none"
					/>
					<text x="120" y="190" style={{ ...textStyle, fill: "#9C27B0" }}>
						SCTEX
					</text>
					<g
						onClick={(e) =>
							handleNodeClick(
								e,
								"SCTEX (Subic-Clark-Tarlac Expressway)",
								"Subic",
							)
						}
					>
						<circle
							cx="60"
							cy="180"
							r="4"
							fill="#fff"
							stroke="#9C27B0"
							strokeWidth="2"
						/>
						<text x="40" y="170" style={textStyle}>
							Subic
						</text>
					</g>
					<g
						onClick={(e) =>
							handleNodeClick(
								e,
								"SCTEX (Subic-Clark-Tarlac Expressway)",
								"Clark",
							)
						}
					>
						<circle
							cx="200"
							cy="200"
							r="4"
							fill="#fff"
							stroke="#9C27B0"
							strokeWidth="2"
						/>
						<text x="215" y="205" style={textStyle}>
							Clark
						</text>
					</g>
				</g>

				{/* NLEX */}
				<g
					onClick={() => onSelectExpressway("NLEX (North Luzon Expressway)")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("NLEX (North Luzon Expressway)")}
				>
					<path
						d="M 200 200 L 200 300"
						stroke="#2196F3"
						strokeWidth={getStrokeWidth("NLEX (North Luzon Expressway)")}
						strokeLinecap="round"
					/>
					<text x="150" y="255" style={{ ...textStyle, fill: "#2196F3" }}>
						NLEX
					</text>
					<g
						onClick={(e) =>
							handleNodeClick(e, "NLEX (North Luzon Expressway)", "Balintawak")
						}
					>
						<circle
							cx="200"
							cy="300"
							r="4"
							fill="#fff"
							stroke="#2196F3"
							strokeWidth="2"
						/>
						<text x="215" y="305" style={textStyle}>
							Balintawak
						</text>
					</g>
				</g>

				{/* Skyway */}
				<g
					onClick={() => onSelectExpressway("Skyway")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("Skyway")}
				>
					<path
						d="M 200 300 L 200 380"
						stroke="#F44336"
						strokeWidth={getStrokeWidth("Skyway")}
						strokeLinecap="round"
					/>
					<text x="135" y="345" style={{ ...textStyle, fill: "#F44336" }}>
						Skyway
					</text>
					<g onClick={(e) => handleNodeClick(e, "Skyway", "Buendia/Alabang")}>
						<circle
							cx="200"
							cy="380"
							r="4"
							fill="#fff"
							stroke="#F44336"
							strokeWidth="2"
						/>
						<text x="215" y="385" style={textStyle}>
							Buendia/Alabang
						</text>
					</g>
				</g>

				{/* NAIAX */}
				<g
					onClick={() => onSelectExpressway("NAIAX")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("NAIAX")}
				>
					<path
						d="M 200 340 L 140 340"
						stroke="#FF9800"
						strokeWidth={getStrokeWidth("NAIAX")}
						strokeLinecap="round"
					/>
					<text x="145" y="330" style={{ ...textStyle, fill: "#FF9800" }}>
						NAIAX
					</text>
					<g onClick={(e) => handleNodeClick(e, "NAIAX", "NAIA")}>
						<circle
							cx="140"
							cy="340"
							r="4"
							fill="#fff"
							stroke="#FF9800"
							strokeWidth="2"
						/>
						<text x="100" y="345" style={textStyle}>
							NAIA
						</text>
					</g>
				</g>

				{/* SLEX */}
				<g
					onClick={() => onSelectExpressway("SLEX (South Luzon Expressway)")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("SLEX (South Luzon Expressway)")}
				>
					<path
						d="M 200 380 L 200 480"
						stroke="#4CAF50"
						strokeWidth={getStrokeWidth("SLEX (South Luzon Expressway)")}
						strokeLinecap="round"
					/>
					<text x="150" y="440" style={{ ...textStyle, fill: "#4CAF50" }}>
						SLEX
					</text>
					<g
						onClick={(e) =>
							handleNodeClick(e, "SLEX (South Luzon Expressway)", "Mamplasan")
						}
					>
						<circle
							cx="200"
							cy="450"
							r="4"
							fill="#fff"
							stroke="#4CAF50"
							strokeWidth="2"
						/>
						<text x="215" y="455" style={textStyle}>
							Mamplasan
						</text>
					</g>
					<g
						onClick={(e) =>
							handleNodeClick(e, "SLEX (South Luzon Expressway)", "Calamba")
						}
					>
						<circle
							cx="200"
							cy="480"
							r="4"
							fill="#fff"
							stroke="#4CAF50"
							strokeWidth="2"
						/>
						<text x="215" y="485" style={textStyle}>
							Calamba
						</text>
					</g>
				</g>

				{/* CAVITEX */}
				<g
					onClick={() => onSelectExpressway("CAVITEX")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("CAVITEX")}
				>
					<path
						d="M 140 340 L 140 420"
						stroke="#00BCD4"
						strokeWidth={getStrokeWidth("CAVITEX")}
						strokeLinecap="round"
					/>
					<text x="80" y="390" style={{ ...textStyle, fill: "#00BCD4" }}>
						CAVITEX
					</text>
					<g onClick={(e) => handleNodeClick(e, "CAVITEX", "Kawit")}>
						<circle
							cx="140"
							cy="420"
							r="4"
							fill="#fff"
							stroke="#00BCD4"
							strokeWidth="2"
						/>
						<text x="100" y="425" style={textStyle}>
							Kawit
						</text>
					</g>
				</g>

				{/* CALAX */}
				<g
					onClick={() => onSelectExpressway("CALAX (Cavite-Laguna Expressway)")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("CALAX (Cavite-Laguna Expressway)")}
				>
					<path
						d="M 140 420 L 200 450"
						stroke="#FFEB3B"
						strokeWidth={getStrokeWidth("CALAX (Cavite-Laguna Expressway)")}
						strokeLinecap="round"
					/>
					<text x="150" y="420" style={{ ...textStyle, fill: "#FBC02D" }}>
						CALAX
					</text>
					<g
						onClick={(e) =>
							handleNodeClick(
								e,
								"CALAX (Cavite-Laguna Expressway)",
								"Silang (Aguinaldo)",
							)
						}
					>
						<circle
							cx="160"
							cy="430"
							r="4"
							fill="#fff"
							stroke="#FBC02D"
							strokeWidth="2"
						/>
						<text x="145" y="445" style={textStyle}>
							Silang
						</text>
					</g>
					<g
						onClick={(e) =>
							handleNodeClick(
								e,
								"CALAX (Cavite-Laguna Expressway)",
								"Santa Rosa-Tagaytay",
							)
						}
					>
						<circle
							cx="180"
							cy="440"
							r="4"
							fill="#fff"
							stroke="#FBC02D"
							strokeWidth="2"
						/>
						<text x="180" y="430" style={textStyle}>
							Sta. Rosa
						</text>
					</g>
					<g
						onClick={(e) =>
							handleNodeClick(
								e,
								"CALAX (Cavite-Laguna Expressway)",
								"Mamplasan",
							)
						}
					>
						<circle
							cx="200"
							cy="450"
							r="4"
							fill="#fff"
							stroke="#FBC02D"
							strokeWidth="2"
						/>
						<text x="215" y="455" style={textStyle}>
							Mamplasan
						</text>
					</g>
				</g>

				{/* STAR Tollway */}
				<g
					onClick={() => onSelectExpressway("STAR Tollway")}
					style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
					opacity={getStrokeOpacity("STAR Tollway")}
				>
					<path
						d="M 200 480 L 200 560"
						stroke="#795548"
						strokeWidth={getStrokeWidth("STAR Tollway")}
						strokeLinecap="round"
					/>
					<text x="110" y="525" style={{ ...textStyle, fill: "#795548" }}>
						STAR Tollway
					</text>
					<g
						onClick={(e) => handleNodeClick(e, "STAR Tollway", "Batangas City")}
					>
						<circle
							cx="200"
							cy="560"
							r="4"
							fill="#fff"
							stroke="#795548"
							strokeWidth="2"
						/>
						<text x="215" y="565" style={textStyle}>
							Batangas City
						</text>
					</g>
				</g>

				{/* Cebu Box */}
				<g transform="translate(250, 480)">
					<rect
						x="0"
						y="0"
						width="120"
						height="80"
						fill="none"
						stroke="var(--border-color)"
						strokeWidth="1"
						rx="4"
					/>
					<text
						x="10"
						y="20"
						style={{ ...textStyle, fill: "var(--text-secondary)" }}
					>
						Cebu
					</text>

					<g
						onClick={() =>
							onSelectExpressway("CCLEX (Cebu-Cordova Link Expressway)")
						}
						style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
						opacity={getStrokeOpacity("CCLEX (Cebu-Cordova Link Expressway)")}
					>
						<path
							d="M 20 50 L 100 50"
							stroke="#607D8B"
							strokeWidth={getStrokeWidth(
								"CCLEX (Cebu-Cordova Link Expressway)",
							)}
							strokeLinecap="round"
						/>
						<text x="40" y="40" style={{ ...textStyle, fill: "#607D8B" }}>
							CCLEX
						</text>
						<circle
							cx="20"
							cy="50"
							r="3"
							fill="#fff"
							stroke="#607D8B"
							strokeWidth="2"
						/>
						<circle
							cx="100"
							cy="50"
							r="3"
							fill="#fff"
							stroke="#607D8B"
							strokeWidth="2"
						/>
					</g>
				</g>
			</svg>
			<p
				style={{
					textAlign: "center",
					fontSize: "12px",
					color: "var(--text-secondary)",
					marginTop: "8px",
				}}
			>
				Click a colored route to select it in the planner.
				<br />
				Click nodes (circles) to set Origin and Destination.
			</p>
		</div>
	);
}
