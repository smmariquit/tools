import type { Metadata, Viewport } from "next";
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
import CookieConsent from "../components/CookieConsent";
import Logo from "../components/Logo";
import OfflineToast from "../components/OfflineToast";
import Navbar from "./components/Navbar";
import { PostHogProvider } from "./providers";

const locales = ["en", "tl", "ceb"];

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
	themeColor: "#0d47a1",
};

export const metadata: Metadata = {
	metadataBase: new URL("https://phtools.me"),
	title: "PH Tools & Calculators | Free Online Utilities",
	description:
		"Free, accurate calculators and tools for Filipinos. Compute your SSS, PhilHealth, Pag-IBIG, tax, net pay, and more.",
	manifest: "/manifest.json",
	icons: {
		icon: 'data:image/svg+xml,<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="2" width="18" height="20" rx="4" fill="%230d47a1" /><rect x="6" y="5" width="12" height="6" rx="1" fill="white" /><circle cx="8" cy="15" r="1.5" fill="white" /><circle cx="12" cy="15" r="1.5" fill="white" /><circle cx="16" cy="15" r="1.5" fill="white" /><circle cx="8" cy="19" r="1.5" fill="white" /><circle cx="12" cy="19" r="1.5" fill="white" /><circle cx="16" cy="19" r="1.5" fill="white" /></svg>',
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9785940474424207"
					crossOrigin="anonymous"
				></script>
			</head>
			<body>
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
												<Logo width={24} height={24} />
												<span>PHTools</span>
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
														href="/editorial-policy"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														Editorial Policy
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
													<Link
														href="/accessibility"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														Accessibility Statement
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
											reserved. Not affiliated with any government agency.
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
											These calculators are for reference purposes only and do
											not constitute professional tax or payroll advice. Always
											verify with the official agencies (SSS, PhilHealth,
											Pag-IBIG, BIR, GSIS) for exact computations.
										</p>
									</div>
								</div>
							</footer>
							<CookieConsent />
							<Analytics />
						</PostHogProvider>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
