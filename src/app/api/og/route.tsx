import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const title = searchParams.has("title")
			? searchParams.get("title")?.slice(0, 100)
			: "PHTools Calculator";

		const desc = searchParams.has("desc")
			? searchParams.get("desc")?.slice(0, 150)
			: "Free online calculators and tools for the Philippines.";

		const stat1Label = searchParams.get("s1l");
		const stat1Value = searchParams.get("s1v");
		const stat2Label = searchParams.get("s2l");
		const stat2Value = searchParams.get("s2v");
		const stat3Label = searchParams.get("s3l");
		const stat3Value = searchParams.get("s3v");

		const hasStats = stat1Label || stat2Label || stat3Label;

		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: "#121212",
					padding: "60px 80px",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<h1
						style={{
							fontSize: 72,
							fontWeight: 800,
							color: "#66b2ff",
							lineHeight: 1.1,
							marginBottom: 24,
							letterSpacing: "-0.02em",
						}}
					>
						{title}
					</h1>
					<p
						style={{
							fontSize: 32,
							color: "#c4c7c5",
							maxWidth: "85%",
							lineHeight: 1.4,
						}}
					>
						{desc}
					</p>
				</div>

				<div
					style={{
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
						alignItems: "flex-end",
					}}
				>
					{hasStats ? (
						<div style={{ display: "flex", gap: "40px" }}>
							{[
								{ l: stat1Label, v: stat1Value, color: "#99ccff" },
								{ l: stat2Label, v: stat2Value, color: "#4caf50" },
								{ l: stat3Label, v: stat3Value, color: "#ff9800" },
							].map((stat, i) => {
								if (!stat.l && !stat.v) return null;
								return (
									<div
										key={i}
										style={{
											display: "flex",
											flexDirection: "column",
											backgroundColor: "#1e1e1e",
											padding: "24px 32px",
											borderRadius: "16px",
											border: `2px solid ${stat.color}40`,
											minWidth: "200px",
										}}
									>
										<span
											style={{
												color: "#9aa0a6",
												fontSize: 24,
												marginBottom: 8,
												textTransform: "uppercase",
												letterSpacing: "1px",
											}}
										>
											{stat.l || "Value"}
										</span>
										<span
											style={{
												color: stat.color,
												fontSize: 42,
												fontWeight: "bold",
											}}
										>
											{stat.v || "-"}
										</span>
									</div>
								);
							})}
						</div>
					) : (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								fontSize: 48,
								color: "#66b2ff",
								fontWeight: "bold",
							}}
						>
							Read Full Guide &rarr;
						</div>
					)}

					<div
						style={{
							display: "flex",
							fontSize: 40,
							fontWeight: "bold",
							color: "#ffffff",
							letterSpacing: "-1px",
						}}
					>
						PHTools.com
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			},
		);
	} catch (e: any) {
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
