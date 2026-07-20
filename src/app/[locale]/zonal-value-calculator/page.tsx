import { Metadata } from "next";
import Link from "next/link";
import { slugify, zonalData } from "../../../data/zonalValues";
import { ogImages } from "../../../lib/og";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import ToolPageBottom from "../../components/ToolPageBottom";
import ToolLayout from "../components/ToolLayout";

export const metadata: Metadata = {
	title: "BIR Zonal Values & Real Estate Tax Calculators | PHTools",
	description:
		"Find the exact BIR Zonal Value for your street and instantly calculate Capital Gains Tax and Doc Stamp Tax.",
	openGraph: {
		images: ogImages({
			tool: "zonal-value-calculator",
			title: "BIR Zonal Values & Real Estate Tax Calculators | PHTools",
			desc: "Find the exact BIR Zonal Value for your street and instantly calculate Capital Gains Tax and Doc Stamp Tax.",
		}),
	},
};

export default function ZonalValueHub() {
	return (
		<>
			<ToolLayout maxWidth="1000px">
				<ToolIllustration name="/zonal-value-calculator" />
				<ToolEyebrow />
				<h1 style={{ fontSize: "2.4rem", marginBottom: "16px" }}>
					Philippine BIR Zonal Value Engine
				</h1>
				<p
					style={{
						color: "var(--text-secondary)",
						fontSize: "1.1rem",
						marginBottom: "32px",
						maxWidth: "800px",
						lineHeight: 1.6,
					}}
				>
					Real estate taxes in the Philippines are computed based on either the
					actual selling price or the official <strong>BIR Zonal Value</strong>,
					whichever is higher. Select your specific property location below to
					instantly calculate your Capital Gains Tax (CGT) and Documentary Stamp
					Tax (DST).
				</p>

				<div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
					{zonalData.map((region) => (
						<div
							key={region.region}
							style={{
								backgroundColor: "var(--surface-color)",
								padding: "24px",
								borderRadius: "12px",
								border: "1px solid var(--border-color)",
							}}
						>
							<h2
								style={{
									fontSize: "1.5rem",
									color: "var(--primary)",
									borderBottom: "2px solid var(--primary)",
									paddingBottom: "8px",
									marginBottom: "24px",
								}}
							>
								{region.region}
							</h2>

							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
									gap: "24px",
								}}
							>
								{region.cities.map((city) => (
									<div key={city.name}>
										<h3 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>
											{city.name}{" "}
											<span
												style={{
													fontSize: "0.875rem",
													color: "var(--text-secondary)",
													fontWeight: "normal",
												}}
											>
												(RDO {city.rdo})
											</span>
										</h3>
										<ul
											style={{
												listStyle: "none",
												padding: 0,
												margin: 0,
												display: "flex",
												flexDirection: "column",
												gap: "8px",
											}}
										>
											{city.barangays.map((brgy) => (
												<li key={brgy.name}>
													<Link
														href={`/zonal-value-calculator/${slugify(region.region)}/${slugify(city.name)}/${slugify(brgy.name)}`}
														style={{
															color: "var(--text-primary)",
															textDecoration: "none",
															display: "flex",
															alignItems: "center",
															gap: "8px",
														}}
														className="hub-link"
													>
														<svg
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="var(--primary)"
															strokeWidth="2"
														>
															<circle cx="12" cy="10" r="3" />
															<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
														</svg>
														Brgy. {brgy.name}
													</Link>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</ToolLayout>
			<ToolPageBottom slug="bir-zonal-values-guide" />
		</>
	);
}
