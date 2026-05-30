import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { PostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PH Tools & Calculators | Free Online Utilities",
  description: "Free, accurate calculators and tools for Filipinos. Compute your SSS, PhilHealth, Pag-IBIG, tax, net pay, and more.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛠️</text></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9785940474424207" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid var(--border-color)", padding: "16px 0" }}>
            <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link href="/" style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }}>
                <span style={{ color: "var(--primary)" }}>PH</span>Tools
              </Link>
              <nav style={{ display: "flex", gap: "20px" }}>
                <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>Tools</Link>
                <Link href="/blog" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>Blog</Link>
                <Link href="/salary-calculator" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>Salary</Link>
                <Link href="/13th-month-pay-calculator" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>13th Month</Link>
                <Link href="/pagibig-calculator" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>Pag-IBIG/MP2</Link>
                <Link href="/id-photo-maker" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>ID Photo</Link>
              </nav>
            </div>
          </header>
          
          <main style={{ minHeight: "calc(100vh - 140px)", padding: "40px 0" }}>
            <div className="container">
              {children}
            </div>
          </main>
          
          <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid var(--border-color)", padding: "32px 0 16px 0", marginTop: "auto" }}>
            <div className="container">
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px", marginBottom: "24px" }}>
                <div>
                  <Link href="/" style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }}>
                    <span style={{ color: "var(--primary)" }}>PH</span>Tools
                  </Link>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px", maxWidth: "300px" }}>
                    Free, accurate, and fast online calculators and utilities designed specifically for the Philippines.
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "48px" }}>
                  <div>
                    <h4 style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase" }}>Company</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <Link href="/about" style={{ color: "var(--text-secondary)", fontSize: "14px" }}>About Us</Link>
                      <Link href="/contact" style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Contact</Link>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase" }}>Legal</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <Link href="/privacy-policy" style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Privacy Policy</Link>
                      <Link href="/terms-of-use" style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Terms of Use</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px", textAlign: "center", color: "var(--text-secondary)", fontSize: "13px" }}>
                <p>&copy; {new Date().getFullYear()} PHTools. All rights reserved.</p>
                <p style={{ marginTop: "4px", fontSize: "12px" }}>Disclaimer: Computations are estimates based on standard Philippine rates and are not professional financial advice.</p>
              </div>
            </div>
          </footer>
        </PostHogProvider>
      </body>
    </html>
  );
}
