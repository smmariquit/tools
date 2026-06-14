import Image from "next/image";

export default function AuthorBio() {
    return (
        <div className="author-bio-container" style={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "var(--card-bg, #ffffff)",
            border: "1px solid var(--border, #e0e0e0)",
            borderRadius: "8px",
            marginTop: "32px",
            marginBottom: "32px",
            gap: "16px",
            flexWrap: "wrap"
        }}>
            <div style={{ flexShrink: 0 }}>
                <Image 
                    src="/images/author.jpg" 
                    alt="Simonee Ezekiel Mariquit" 
                    width={56} 
                    height={56} 
                    style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary, #0d47a1)" }}
                />
            </div>
            <div style={{ flex: 1, minWidth: "250px" }}>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", color: "var(--text-primary, #333)" }}>
                    Written by Simonee Ezekiel Mariquit
                </h4>
                <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem", color: "var(--text-secondary, #666)" }}>
                    Lead Developer & Researcher | Computer Science, UPLB | Accountancy, Business, and Management (ABM) Scholar
                </p>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ 
                        fontSize: "0.8rem", 
                        padding: "2px 8px", 
                        backgroundColor: "#e8f5e9", 
                        color: "#2e7d32", 
                        borderRadius: "12px",
                        fontWeight: "bold"
                    }}>
                        ✓ Mathematically Verified
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary, #666)" }}>
                        Last Updated: June 2026
                    </span>
                </div>
            </div>
            <div style={{ width: "100%", fontSize: "0.85rem", color: "var(--text-secondary, #666)", marginTop: "8px", borderTop: "1px solid var(--border, #e0e0e0)", paddingTop: "12px" }}>
                <strong>Editorial Transparency:</strong> The formulas and data used in this tool are sourced from official government circulars and public statutory laws. If you spot a discrepancy, you can contact me at <a href="mailto:semariquit@gmail.com" style={{ color: "var(--primary, #0d47a1)", textDecoration: "underline" }}>semariquit@gmail.com</a> for any corrections. Once I acknowledge your email, it will be fixed immediately.
            </div>
        </div>
    );
}
