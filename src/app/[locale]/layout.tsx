import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Caveat, Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-inter",
	display: "swap",
});

const caveat = Caveat({
	subsets: ["latin"],
	weight: ["600", "700"],
	variable: "--font-caveat",
	display: "swap",
});

import { NextIntlClientProvider } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "../../components/ThemeProvider";
import AdSenseLoader from "../components/AdSenseLoader";
import CookieConsent from "../components/CookieConsent";
import WavyDivider from "../components/doodle/WavyDivider";
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
	metadataBase: new URL("https://www.phtools.me"),
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
		images: [
			{
				url: "/api/og?title=PH%20Tools%20%26%20Calculators&desc=Free%2C%20accurate%20calculators%20and%20tools%20for%20the%20Philippines.",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "PH Tools & Calculators",
		description: "Free, accurate calculators and tools for Filipinos.",
		images: [
			"/api/og?title=PH%20Tools%20%26%20Calculators&desc=Free%2C%20accurate%20calculators%20and%20tools%20for%20the%20Philippines.",
		],
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
	const t = await getTranslations("Footer");

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${inter.variable} ${caveat.variable}`}
		>
			<head>
				<Script
					id="theme-init"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.setAttribute("data-theme",d);document.documentElement.style.colorScheme=d==="dark"?"dark":"light"}catch(e){}})();`,
					}}
				/>
				<Script
					id="grow-initializer"
					strategy="afterInteractive"
					data-grow-initializer=""
					dangerouslySetInnerHTML={{
						__html: `!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),e.src="https://faves.grow.me/main.js",(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTo0MTQ5MTYxNS1hMTg2LTRlNjgtOTJhYy1kNDZlMzEzMmI2MDI=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`,
					}}
				/>
			</head>
			<body>
				<a href="#main-content" className="skip-to-content">
					{t("skipToContent")}
				</a>
				<AdSenseLoader />
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
									padding: "0 0 16px 0",
									marginTop: "auto",
								}}
							>
								<div className="container" style={{ marginBottom: "28px" }}>
									<WavyDivider />
								</div>
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
												{t("tagline")}
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
													{t("company")}
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
														{t("about")}
													</Link>
													<Link
														href="/faq"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														{t("faq")}
													</Link>
													<Link
														href="/contact"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														{t("contact")}
													</Link>
													<a
														href="https://kape.stimmie.dev"
														target="_blank"
														rel="noopener noreferrer"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														{t("coffee")}
													</a>
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
													{t("legal")}
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
														{t("privacy")}
													</Link>
													<Link
														href="/editorial-policy"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														{t("editorial")}
													</Link>
													<Link
														href="/terms-of-use"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														{t("terms")}
													</Link>
													<Link
														href="/accessibility"
														style={{
															color: "var(--text-secondary)",
															fontSize: "14px",
														}}
													>
														{t("accessibility")}
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
										<p>{t("copyright", { year: new Date().getFullYear() })}</p>
										<p
											style={{
												marginTop: "8px",
												fontSize: "12px",
												maxWidth: "800px",
												margin: "8px auto 0 auto",
												lineHeight: "1.5",
											}}
										>
											{t("disclaimer")}
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
