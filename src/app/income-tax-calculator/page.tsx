import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Philippine Income Tax Calculator (BIR 2026) | PHTools",
  description: "Official Philippine BIR income tax calculator. Compare the graduated TRAIN Law brackets against the 8% flat rate for freelancers.",
};

export default function IncomeTaxCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Income Tax Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "description": metadata.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "PHP"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Client />
    </>
  );
}
