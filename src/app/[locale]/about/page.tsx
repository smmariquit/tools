import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
	title: "About PHTools & the Person Behind It | Simonee Mariquit",
	description:
		"PHTools is a free, open-source suite of Philippine calculators built by Simonee Ezekiel Mariquit (stimmie.dev). Here's who I am and why I made it.",
	openGraph: {
		title: "About PHTools & the Person Behind It",
		description:
			"Free, open-source Philippine calculators built by one developer. Here's the story.",
		type: "profile",
	},
};

const GITHUB_URL = "https://github.com/smmariquit/tools";
const SITE_URL = "https://stimmie.dev";
const COFFEE_URL = "https://kape.stimmie.dev";

export default function About() {
	const personLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Simonee Ezekiel Mariquit",
		alternateName: "stimmie",
		url: SITE_URL,
		image: "https://phtools.me/images/author.jpg",
		email: "semariquit@gmail.com",
		jobTitle: "Software Developer",
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: "University of the Philippines Los Baños",
		},
		sameAs: [SITE_URL, GITHUB_URL, "https://github.com/smmariquit"],
		worksFor: {
			"@type": "Organization",
			name: "PHTools",
			url: "https://phtools.me",
		},
	};

	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
			/>

			{/* Hero */}
			<div
				className="card"
				style={{
					display: "flex",
					gap: "24px",
					alignItems: "center",
					flexWrap: "wrap",
					marginBottom: "24px",
				}}
			>
				<Image
					src="/images/author.jpg"
					alt="Simonee Ezekiel Mariquit"
					width={96}
					height={96}
					priority
					fetchPriority="high"
					style={{
						borderRadius: "50%",
						objectFit: "cover",
						border: "3px solid var(--primary)",
						flexShrink: 0,
					}}
				/>
				<div style={{ flex: 1, minWidth: "260px" }}>
					<span className="eyebrow">the human behind the math ✦</span>
					<h1 className="page-title" style={{ marginBottom: "8px" }}>
						Hi, I&apos;m Simonee &mdash; I built PHTools.
					</h1>
					<p className="page-subtitle" style={{ margin: 0, fontSize: "16px" }}>
						One developer, a pile of Philippine tax tables, and a stubborn
						belief that this stuff shouldn&apos;t be this hard. Most people call
						me <strong>stimmie</strong>.
					</p>
				</div>
			</div>

			<div className="card" style={{ color: "var(--text-primary)" }}>
				<h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
					Why I made this
				</h2>
				<p style={{ marginBottom: "16px", fontSize: "16px", lineHeight: 1.8 }}>
					It started selfishly. I was trying to figure out my own take-home pay
					after SSS, PhilHealth, Pag-IBIG, and the TRAIN Law withholding tax,
					and every calculator I found was either outdated, buried under
					pop-ups, or weirdly secretive about how it got its numbers. So I read
					the actual circulars and built one for myself.
				</p>
				<p style={{ marginBottom: "16px", fontSize: "16px", lineHeight: 1.8 }}>
					Then friends asked for a 13th-month calculator. Then a freelancer
					asked about the 8% flat tax. Then someone needed BIR zonal values for
					a property sale. One tool became {""}
					<Link href="/" style={{ color: "var(--primary)" }}>
						a whole suite
					</Link>{" "}
					of free Philippine calculators &mdash; salary, loans, scholarships,
					LTO fees, board-exam ratings, and more. PHTools is just that itch,
					scaled up.
				</p>

				<h2
					style={{ fontSize: "22px", marginTop: "32px", marginBottom: "16px" }}
				>
					Who I am
				</h2>
				<p style={{ marginBottom: "16px", fontSize: "16px", lineHeight: 1.8 }}>
					I&apos;m a Computer Science student at the University of the
					Philippines Los Baños, and I&apos;m comfortable poring over DOLE
					handbooks and BIR revenue memos. I build things at{" "}
					<a
						href={SITE_URL}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "var(--primary)" }}
					>
						stimmie.dev
					</a>
					. PHTools is my biggest public project, and I maintain it solo.
				</p>

				<h2
					style={{ fontSize: "22px", marginTop: "32px", marginBottom: "16px" }}
				>
					It&apos;s open source
				</h2>
				<p style={{ marginBottom: "16px", fontSize: "16px", lineHeight: 1.8 }}>
					Every formula on this site is out in the open. If you don&apos;t trust
					a number, don&apos;t take my word for it &mdash; read the code. The
					entire project lives on{" "}
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "var(--primary)" }}
					>
						GitHub
					</a>
					, where you can file an issue if a rate changed, suggest a new
					calculator, or send a pull request. Transparency is the whole point:
					no hidden math, no data harvesting, everything runs in your browser.
				</p>

				<h2
					style={{ fontSize: "22px", marginTop: "32px", marginBottom: "16px" }}
				>
					How I keep it accurate
				</h2>
				<p style={{ marginBottom: "16px", fontSize: "16px", lineHeight: 1.8 }}>
					I track updates from the BIR, SSS, PhilHealth, Pag-IBIG, GSIS, DOLE,
					and LTO. When a contribution table or tax rule changes, I update the
					logic and the explanatory write-up beneath each tool. Every calculator
					links to the official source it&apos;s based on, and the math is
					covered by automated tests. These are still estimates &mdash; always
					confirm with the relevant agency &mdash; but I work hard to make them
					the most accurate free estimates you&apos;ll find.
				</p>

				{/* Coffee / support */}
				<div
					style={{
						marginTop: "40px",
						padding: "24px",
						backgroundColor: "var(--bg-color)",
						borderRadius: "var(--border-radius)",
						border: "1px solid var(--border-color)",
						textAlign: "center",
					}}
				>
					<h3
						style={{
							fontSize: "18px",
							marginBottom: "12px",
							color: "var(--primary)",
						}}
					>
						Found this useful?
					</h3>
					<p style={{ marginBottom: "16px", color: "var(--text-secondary)" }}>
						PHTools is free and ad-light. If it saved you time, you can buy me a
						coffee &mdash; it genuinely keeps the late-night updates going.
					</p>
					<div
						style={{
							display: "flex",
							gap: "12px",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						<a
							href={COFFEE_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-primary"
							style={{ display: "inline-block" }}
						>
							☕ Buy me a coffee
						</a>
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-secondary"
							style={{ display: "inline-block" }}
						>
							⭐ Star on GitHub
						</a>
						<Link
							href="/contact"
							className="btn-secondary"
							style={{ display: "inline-block" }}
						>
							Suggest a tool
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
