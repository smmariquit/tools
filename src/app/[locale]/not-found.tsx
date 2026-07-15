import Link from "next/link";
import { allToolPaths, toolCategories } from "../../lib/routes";

// Branded 404 so a wrong URL (or a crawler hitting a dead link) lands on
// something useful — home, search, and a few popular tools — instead of a
// bare error page.
const popular = [
	"/salary-calculator",
	"/income-tax-calculator",
	"/sss-contribution-calculator",
	"/philhealth-calculator",
	"/13th-month-pay-calculator",
	"/pagibig-mp2-calculator",
];

export default function NotFound() {
	const byPath = new Map(
		toolCategories.flatMap((c) => c.items).map((t) => [t.path, t.name]),
	);
	const links = popular.filter((p) => allToolPaths.includes(p));

	return (
		<div
			style={{
				maxWidth: "640px",
				margin: "0 auto",
				padding: "48px 20px",
				textAlign: "center",
			}}
		>
			<p
				style={{
					fontSize: "56px",
					fontWeight: 800,
					color: "var(--primary)",
					margin: 0,
					lineHeight: 1,
				}}
			>
				404
			</p>
			<h1 className="page-title" style={{ marginTop: "12px" }}>
				Page not found
			</h1>
			<p
				className="page-subtitle"
				style={{ maxWidth: "460px", margin: "8px auto 28px" }}
			>
				The page you are looking for does not exist or may have moved. Try one
				of these instead.
			</p>

			<div
				style={{
					display: "flex",
					gap: "12px",
					justifyContent: "center",
					flexWrap: "wrap",
					marginBottom: "36px",
				}}
			>
				<Link href="/" className="btn-primary">
					Go to homepage
				</Link>
				<Link href="/blog" className="btn-secondary">
					Read the guides
				</Link>
			</div>

			<h2
				style={{
					fontSize: "16px",
					color: "var(--text-secondary)",
					marginBottom: "16px",
				}}
			>
				Popular calculators
			</h2>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
					gap: "12px",
				}}
			>
				{links.map((path) => (
					<Link
						key={path}
						href={path}
						className="card"
						style={{
							textDecoration: "none",
							color: "var(--primary)",
							fontWeight: 600,
							padding: "16px",
						}}
					>
						{byPath.get(path)}
					</Link>
				))}
			</div>
		</div>
	);
}
