"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../../../components/ThemeToggle";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import Logo from "../../components/Logo";

export default function Navbar() {
	const t = useTranslations("Navigation");
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();
	const pathname = usePathname();
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (pathname) setIsOpen(false);
	}, [pathname]);

	return (
		<header
			style={{
				backgroundColor: "var(--surface-color)",
				borderBottom: "1px solid var(--border-color)",
				padding: "16px 0",
				position: "sticky",
				top: 0,
				zIndex: 1000,
			}}
		>
			<div
				className="container"
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: "16px",
				}}
			>
				<Link
					href="/"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						fontSize: "20px",
						fontWeight: 700,
						color: "var(--text-primary)",
						textDecoration: "none",
						letterSpacing: "-0.5px",
					}}
				>
					<Logo width={28} height={28} />
					<span>PHTools</span>
				</Link>

				<button
					className="mobile-menu-btn"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
					style={{
						background: "none",
						border: "none",
						color: "var(--text-primary)",
						fontSize: "24px",
						cursor: "pointer",
					}}
				>
					{isOpen ? "✕" : "☰"}
				</button>

				<nav
					className={`main-nav ${isOpen ? "open" : ""}`}
					style={{
						display: "flex",
						gap: "16px",
						alignItems: "center",
					}}
				>
					<search>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								const parts = (pathname || "").split("/").filter(Boolean);
								const localePrefix = parts.length ? `/${parts[0]}` : "";
								const qs = encodeURIComponent(query.trim());
								if (qs.length)
									router.push(`${localePrefix}/search?query=${qs}`);
								setIsOpen(false);
							}}
							style={{ marginRight: "12px" }}
						>
							<input
								aria-label="Search tools"
								placeholder={t("searchPlaceholder")}
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								style={{
									padding: "8px 10px",
									borderRadius: 6,
									border: "1px solid var(--border-color)",
									width: "100%",
									minWidth: "120px",
									maxWidth: "200px",
									background: "var(--surface-color)",
									color: "var(--text-primary)",
								}}
							/>
						</form>
					</search>
					<Link
						href="/"
						className="nav-link"
						onClick={() => setIsOpen(false)}
						style={{ display: "flex", alignItems: "center", gap: "6px" }}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
						</svg>
						{t("tools")}
					</Link>
					<Link
						href="/blog"
						className="nav-link"
						onClick={() => setIsOpen(false)}
						style={{ display: "flex", alignItems: "center", gap: "6px" }}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
							<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
						</svg>
						{t("blog")}
					</Link>
					<Link
						href="/salary-calculator"
						className="nav-link"
						onClick={() => setIsOpen(false)}
						style={{ display: "flex", alignItems: "center", gap: "6px" }}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect width="20" height="14" x="2" y="5" rx="2" />
							<line x1="2" x2="22" y1="10" y2="10" />
						</svg>
						{t("salary")}
					</Link>
					<Link
						href="/13th-month-pay-calculator"
						className="nav-link"
						onClick={() => setIsOpen(false)}
						style={{ display: "flex", alignItems: "center", gap: "6px" }}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
							<line x1="16" x2="16" y1="2" y2="6" />
							<line x1="8" x2="8" y1="2" y2="6" />
							<line x1="3" x2="21" y1="10" y2="10" />
						</svg>
						{t("13thMonth")}
					</Link>
					<Link
						href="/pagibig-calculator"
						className="nav-link"
						onClick={() => setIsOpen(false)}
						style={{ display: "flex", alignItems: "center", gap: "6px" }}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
						{t("pagibig")}
					</Link>
					<Link
						href="/id-photo-maker"
						className="nav-link"
						onClick={() => setIsOpen(false)}
						style={{ display: "flex", alignItems: "center", gap: "6px" }}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
							<circle cx="9" cy="9" r="2" />
							<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
						</svg>
						{t("idPhoto")}
					</Link>
					<div
						className="nav-actions"
						style={{
							marginLeft: "12px",
							display: "flex",
							alignItems: "center",
							gap: "12px",
						}}
					>
						<ThemeToggle />
						<LanguageSwitcher />
					</div>
				</nav>
			</div>
		</header>
	);
}
