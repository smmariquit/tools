export default function ToolIcon({ path }: { path: string }) {
	if (
		path.includes("tax") ||
		path.includes("salary") ||
		path.includes("pay") ||
		path.includes("budget") ||
		path.includes("fee")
	) {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{ marginBottom: "12px", color: "var(--primary)" }}
			>
				<rect width="20" height="12" x="2" y="6" rx="2" />
				<circle cx="12" cy="12" r="2" />
				<path d="M6 12h.01M18 12h.01" />
			</svg>
		);
	}
	if (
		path.includes("sss") ||
		path.includes("philhealth") ||
		path.includes("pagibig") ||
		path.includes("gsis") ||
		path.includes("loan") ||
		path.includes("bank") ||
		path.includes("insurance")
	) {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{ marginBottom: "12px", color: "var(--primary)" }}
			>
				<line x1="3" x2="21" y1="22" y2="22" />
				<line x1="6" x2="6" y1="18" y2="11" />
				<line x1="10" x2="10" y1="18" y2="11" />
				<line x1="14" x2="14" y1="18" y2="11" />
				<line x1="18" x2="18" y1="18" y2="11" />
				<polygon points="12 2 20 7 4 7" />
			</svg>
		);
	}
	if (
		path.includes("lto") ||
		path.includes("toll") ||
		path.includes("car") ||
		path.includes("shipping")
	) {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				style={{ marginBottom: "12px", color: "var(--primary)" }}
			>
				<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
				<circle cx="7" cy="17" r="2" />
				<path d="M9 17h6" />
				<circle cx="17" cy="17" r="2" />
			</svg>
		);
	}
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			style={{ marginBottom: "12px", color: "var(--primary)" }}
		>
			<rect width="16" height="20" x="4" y="2" rx="2" />
			<line x1="8" x2="16" y1="6" y2="6" />
			<line x1="16" x2="16" y1="14" y2="18" />
			<path d="M16 10h.01" />
			<path d="M12 10h.01" />
			<path d="M8 10h.01" />
			<path d="M12 14h.01" />
			<path d="M8 14h.01" />
			<path d="M12 18h.01" />
			<path d="M8 18h.01" />
		</svg>
	);
}
