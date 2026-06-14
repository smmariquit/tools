import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toolCategories } from "../../../../lib/routes";

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[\s\W-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
	return toolCategories.map((cat) => ({
		slug: slugify(cat.category),
	}));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
	const categoryData = toolCategories.find((cat) => slugify(cat.category) === resolvedParams.slug);
	if (!categoryData) return {};
	return {
		title: `${categoryData.category} Calculators & Tools | PHTools`,
		description: `Explore our highly accurate ${categoryData.category.toLowerCase()} calculators for the Philippines.`,
	};
}

export default async function CategoryHubPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
	const categoryData = toolCategories.find((cat) => slugify(cat.category) === resolvedParams.slug);

	if (!categoryData) {
		notFound();
	}

	return (
		<div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
			<div style={{ marginBottom: "24px" }}>
				<Link href="/categories" style={{ color: "var(--primary, #0d47a1)", textDecoration: "none", fontSize: "0.9rem" }}>
					&larr; Back to all categories
				</Link>
			</div>
			<h1 style={{ marginBottom: "16px", fontSize: "2.2rem" }}>{categoryData.category} Utilities</h1>
			<div style={{ 
				marginBottom: "40px", 
				backgroundColor: "#f5f9ff", 
				padding: "24px", 
				borderRadius: "12px",
				border: "1px solid #d0e1fd",
				color: "var(--text-secondary)"
			}}>
				<h3 style={{ marginTop: 0, color: "var(--primary, #0d47a1)" }}>About this Category Hub</h3>
				<p style={{ margin: 0, lineHeight: 1.6 }}>
					Welcome to the official <strong>{categoryData.category}</strong> hub. The tools listed here are built utilizing strict Philippine statutory regulations, institutional frameworks, and academic benchmarks. Whether you are dealing with government contributions, complex academic grading, or real estate amortization, every calculator below features a peer-reviewed mathematical algorithm and an extensive methodological guide to ensure absolute accuracy and transparency.
				</p>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
				{categoryData.items.map((item) => (
					<Link
						key={item.path}
						href={item.path}
						style={{
							padding: "20px",
							backgroundColor: "var(--card-bg, #ffffff)",
							border: "1px solid var(--border, #e0e0e0)",
							borderRadius: "8px",
							textDecoration: "none",
							color: "inherit",
							display: "block",
							transition: "transform 0.2s ease",
						}}
						className="hub-tool-card"
					>
						<h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>{item.name}</h3>
						<p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0, lineHeight: 1.4 }}>
							{item.desc}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
