"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "../../../components/ThemeToggle";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import Logo from "../../components/Logo";

export default function Navbar() {
	const t = useTranslations("Navigation");
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const [query, setQuery] = useState("");

	return (
		<header
			style={{
				backgroundColor: "var(--surface-color)",
				borderBottom: "1px solid var(--border-color)",
				padding: "16px 0",
				position: "relative",
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

					<form
						onSubmit={(e) => {
							e.preventDefault();
							const parts = (pathname || "").split("/").filter(Boolean);
							const localePrefix = parts.length ? `/${parts[0]}` : "";
							const qs = encodeURIComponent(query.trim());
							if (qs.length) router.push(`${localePrefix}/search?query=${qs}`);
						}}
						style={{ marginLeft: "12px", marginRight: "12px" }}
						role="search"
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
								minWidth: 200,
								background: "var(--surface-color)",
								color: "var(--text-primary)",
							}}
						/>
					</form>
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
						display: "none", // Hidden by default, shown via CSS on mobile
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
					<Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>
						{t("tools")}
					</Link>
					<Link
						href="/blog"
						className="nav-link"
						onClick={() => setIsOpen(false)}
					>
						{t("blog")}
					</Link>
					<Link
						href="/salary-calculator"
						className="nav-link"
						onClick={() => setIsOpen(false)}
					>
						{t("salary")}
					</Link>
					<Link
						href="/13th-month-pay-calculator"
						className="nav-link"
						onClick={() => setIsOpen(false)}
					>
						{t("13thMonth")}
					</Link>
					<Link
						href="/pagibig-calculator"
						className="nav-link"
						onClick={() => setIsOpen(false)}
					>
						{t("pagibig")}
					</Link>
					<Link
						href="/id-photo-maker"
						className="nav-link"
						onClick={() => setIsOpen(false)}
					>
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
