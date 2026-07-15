import Image from "next/image";

/** Single source of truth for the human-readable "last updated" date. */
function formatUpdated(date?: string): string | null {
	if (!date) return null;
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function AuthorBio({ updatedAt }: { updatedAt?: string }) {
	const lastUpdated = formatUpdated(updatedAt);
	return (
		<div
			className="author-bio-container"
			style={{
				display: "flex",
				alignItems: "center",
				padding: "16px",
				backgroundColor: "var(--bg-color)",
				border: "1px solid var(--border-color)",
				borderRadius: "8px",
				marginTop: "32px",
				marginBottom: "32px",
				gap: "16px",
				flexWrap: "wrap",
			}}
		>
			<div style={{ flexShrink: 0 }}>
				<Image
					src="/images/author.jpg"
					alt="Simonee Ezekiel Mariquit"
					width={56}
					height={56}
					style={{
						borderRadius: "50%",
						objectFit: "cover",
						border: "2px solid var(--primary, #0d47a1)",
					}}
				/>
			</div>
			<div style={{ flex: 1, minWidth: "250px" }}>
				<h4
					style={{
						margin: "0 0 4px 0",
						fontSize: "1.1rem",
						color: "var(--text-primary)",
					}}
				>
					Written by{" "}
					<a
						href="https://stimmie.dev"
						target="_blank"
						rel="author noopener noreferrer"
						style={{ color: "var(--primary, #0d47a1)", textDecoration: "none" }}
					>
						Simonee Ezekiel Mariquit
					</a>
				</h4>
				<p
					style={{
						margin: "0 0 8px 0",
						fontSize: "0.9rem",
						color: "var(--text-secondary)",
					}}
				>
					Solo developer behind PHTools | Computer Science, UPLB
				</p>
				<div
					style={{
						display: "flex",
						gap: "8px",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					{lastUpdated && (
						<>
							<span
								style={{
									fontSize: "0.875rem",
									color: "var(--text-secondary)",
								}}
							>
								Last Updated: {lastUpdated}
							</span>
							<span style={{ color: "var(--border-color)" }}>|</span>
						</>
					)}
					<a
						href="https://linkedin.com/in/stimmie"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							fontSize: "0.875rem",
							color: "var(--primary, #0d47a1)",
							textDecoration: "none",
						}}
					>
						LinkedIn
					</a>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					fontSize: "0.875rem",
					color: "var(--text-secondary)",
					marginTop: "8px",
					borderTop: "1px solid var(--border-color)",
					paddingTop: "12px",
				}}
			>
				<strong>Editorial Transparency:</strong> The formulas and data used in
				this tool are sourced from official government circulars and public
				statutory laws. PHTools is open source, so you can read every formula,
				file an issue, or send a fix on{" "}
				<a
					href="https://github.com/smmariquit/tools"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: "var(--primary, #0d47a1)",
						textDecoration: "underline",
					}}
				>
					GitHub
				</a>
				. Spotted a discrepancy? Email me at{" "}
				<a
					href="mailto:semariquit@gmail.com"
					style={{
						color: "var(--primary, #0d47a1)",
						textDecoration: "underline",
					}}
				>
					semariquit@gmail.com
				</a>{" "}
				and I&apos;ll fix it as soon as I confirm it.
			</div>
		</div>
	);
}
