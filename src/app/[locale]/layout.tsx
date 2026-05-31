import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "../../components/ThemeProvider";
import { ThemeToggle } from "../../components/ThemeToggle";
import LanguageSwitcher from "../components/LanguageSwitcher";
import OfflineToast from "../components/OfflineToast";
import { PostHogProvider } from "./providers";
import Navbar from "./components/Navbar";

const locales = ["en", "tl", "ceb"];

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
	title: "PH Tools & Calculators | Free Online Utilities",
	description:
		"Free, accurate calculators and tools for Filipinos. Compute your SSS, PhilHealth, Pag-IBIG, tax, net pay, and more.",
	manifest: "/manifest.json",
	themeColor: "#0d47a1",
	icons: {
		icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛠️</text></svg>',
	},
	openGraph: {
		title: "PH Tools & Calculators | Free Online Utilities",
		description:
			"Free, accurate calculators and tools for Filipinos. Compute your SSS, PhilHealth, Pag-IBIG, tax, net pay, and more.",
		url: "https://www.phtools.me",
		siteName: "PHTools",
		locale: "en_PH",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "PH Tools & Calculators",
		description: "Free, accurate calculators and tools for Filipinos.",
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	setRequestLocale(locale);
	const messages = await getMessages();
	const t = await getTranslations("Navigation");

	return (
		<html lang={locale}>
			<head>
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9785940474424207"
					crossOrigin="anonymous"
				></script>
			</head>
			<body className={inter.className}>
				<a href="#main-content" className="skip-to-content">
					Skip to content
				</a>
				<ThemeProvider>
					<NextIntlClientProvider messages={messages}>
						<PostHogProvider>
							<Navbar />

							<main
								id="main-content"
								style={{ minHeight: "calc(100vh - 140px)", padding: "40px 0" }}
							>
								<div className="container">{children}</div>
							</main>
							<OfflineToast />

							<footer
								style={{
									backgroundColor: "var(--surface-color)",
									borderTop: "1px solid var(--border-color)",
									padding: "32px 0 16px 0",
									marginTop: "auto",
								}}
							>
								<div className="container">
									<div
										style={{
											display: "flex",
											flexWrap: "wrap",
											justifyContent: "space-between",
											gap: "24px",
											marginBottom: "24px",
										}}
									>
										<div>
											<Link
												href="/"
												style={{
													fontSize: "20px",
													fontWeight: 600,
													color: "var(--text-primary)",
													textDecoration: "none",
												}}
											>
												<span style={{ color: "var(--primary)" }}>PH</span>Tools
											</Link>
											<p
												style={{
													color: "var(--text-secondary)",
													fontSize: "14px",
													marginTop: "8px",
													maxWidth: "300px",
												}}
											>
												Free, accurate, and fast online calculators and
												utilities designed specifically for the Philippines.
											</p>
										</div>

										<div style={{ display: "flex", gap: "48px" }}>
											<div>
												<h4
													style={{
														fontSize: "14px",
														color: "var(--text-primary)",
														marginBottom: "12px",
														textTransform: "uppercase",
													}}
												>
													Company
												</h4>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														gap: "8px",
													}}
												>
													<Link
														href="/about"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														About Us
													</Link>
													<Link
														href="/faq"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														Help & FAQs
													</Link>
													<Link
														href="/contact"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														Contact
													</Link>
												</div>
											</div>

											<div>
												<h4
													style={{
														fontSize: "14px",
														color: "var(--text-primary)",
														marginBottom: "12px",
														textTransform: "uppercase",
													}}
												>
													Legal
												</h4>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														gap: "8px",
													}}
												>
													<Link
														href="/privacy-policy"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														Privacy Policy
													</Link>
													<Link
														href="/terms-of-use"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														Terms of Use
													</Link>
												</div>
											</div>
										</div>
									</div>

									<div
										style={{
											borderTop: "1px solid var(--border-color)",
											paddingTop: "16px",
											textAlign: "center",
											color: "var(--text-secondary)",
											fontSize: "13px",
										}}
									>
										<p>
											&copy; {new Date().getFullYear()} PHTools. All rights
											reserved.
										</p>
										<p
											style={{
												marginTop: "8px",
												fontSize: "12px",
												maxWidth: "800px",
												margin: "8px auto 0 auto",
												lineHeight: "1.5",
											}}
										>
											<strong>Limitation of Liability:</strong> All calculators
											and tools provided on this platform are for estimation
											purposes only and do not replace official payroll
											processing or tax advice. PHTools and its developers shall
											not be held liable for any damages, penalties, or
											financial losses resulting from the use of, or reliance
											on, these computations.
										</p>
									</div>
								</div>
							</footer>
							<Analytics />
						</PostHogProvider>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
