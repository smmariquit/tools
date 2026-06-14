import { Metadata } from "next";
import Link from "next/link";
import { toolCategories } from "../../../lib/routes";

export const metadata: Metadata = {
	title: "Tool Categories | PHTools",
	description: "Browse all free Philippine calculators and utilities by category.",
};

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[\s\W-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export default function CategoriesPage() {
	return (
		<div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
			<h1 style={{ marginBottom: "16px" }}>PHTools Category Hubs</h1>
			<p style={{ marginBottom: "40px", color: "var(--text-secondary)", fontSize: "1.1rem" }}>
				Explore our deep, mathematically rigorous utilities divided by specific statutory and academic sectors.
			</p>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
				{toolCategories.map((cat) => (
					<Link
						key={cat.category}
						href={`/categories/${slugify(cat.category)}`}
						style={{
							padding: "24px",
							backgroundColor: "var(--card-bg, #ffffff)",
							border: "1px solid var(--border, #e0e0e0)",
							borderRadius: "12px",
							textDecoration: "none",
							color: "inherit",
							display: "block",
							boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
						}}
					>
						<h2 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--primary, #0d47a1)" }}>{cat.category}</h2>
						<p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
							Explore {cat.items.length} highly accurate tools and resources.
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
