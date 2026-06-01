"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toolCategories } from "../../../lib/routes";

export default function ToolSearch() {
	const t = useTranslations("Index");
	const tRoutes = useTranslations("Routes");
	const [query, setQuery] = useState("");

	const filteredCategories = toolCategories
		.map((category) => {
			const filteredItems = category.items
				.map((item) => {
					const key = item.path.replace("/", "");
					const localizedName = tRoutes.has(`${key}.name`)
						? tRoutes(`${key}.name`)
						: item.name;
					const localizedDesc = tRoutes.has(`${key}.desc`)
						? tRoutes(`${key}.desc`)
						: item.desc;
					return { ...item, name: localizedName, desc: localizedDesc };
				})
				.filter((item) => {
					const searchStr = `${item.name} ${item.desc}`.toLowerCase();
					return searchStr.includes(query.toLowerCase());
				});
			return { ...category, items: filteredItems };
		})
		.filter((category) => category.items.length > 0);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "40px",
				width: "100%",
			}}
		>
			<div
				style={{
					position: "relative",
					maxWidth: "600px",
					margin: "0 auto",
					width: "100%",
				}}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="var(--text-secondary)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{
						position: "absolute",
						left: "16px",
						top: "50%",
						transform: "translateY(-50%)",
					}}
				>
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<input
					type="text"
					placeholder="Search tools, calculators, features..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="form-control"
					style={{
						paddingLeft: "48px",
						paddingRight: "16px",
						height: "54px",
						fontSize: "16px",
						borderRadius: "12px",
						boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
						border: "1px solid var(--border-color)",
					}}
				/>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
				{filteredCategories.length > 0 ? (
					filteredCategories.map((section) => (
						<div key={section.category}>
							<h2
								style={{
									fontSize: "20px",
									marginBottom: "20px",
									paddingBottom: "8px",
									borderBottom: "1px solid var(--border-color)",
								}}
							>
								{section.category}
							</h2>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "16px",
								}}
							>
								{section.items.map((tool) => (
									<Link
										href={tool.path}
										key={tool.name}
										style={{ textDecoration: "none" }}
									>
										<div className="card tool-card" style={{ height: "100%" }}>
											<h3
												style={{
													fontSize: "16px",
													color: "var(--primary)",
													marginBottom: "8px",
												}}
											>
												{tool.name}
											</h3>
											<p
												style={{
													fontSize: "14px",
													color: "var(--text-secondary)",
													margin: 0,
												}}
											>
												{tool.desc}
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					))
				) : (
					<div
						style={{
							textAlign: "center",
							padding: "40px",
							color: "var(--text-secondary)",
						}}
					>
						<p style={{ fontSize: "18px" }}>
							No tools found matching "{query}"
						</p>
						<button
							onClick={() => setQuery("")}
							className="btn-secondary"
							style={{ marginTop: "16px" }}
						>
							Clear Search
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
