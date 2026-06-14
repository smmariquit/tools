"use client";

import { useTranslations } from "next-intl";

export default function PrintButton() {
    const t = useTranslations("Navigation");

    return (
        <button 
            onClick={() => window.print()}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "var(--primary, #0d47a1)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "16px",
                marginBottom: "16px",
                width: "fit-content"
            }}
            className="print-button"
            aria-label="Print or Save Calculation as PDF"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Save as PDF / Print
        </button>
    );
}
