import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "LTO Late Registration Penalty Calculator | PHTools",
  description: "Calculate the exact fines, MVUC surcharges, and total fees for late LTO vehicle or motorcycle registration renewal in the Philippines.",
};

export default function LtoPenaltyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LTO Penalty Calculator",
    "applicationCategory": "UtilitiesApplication",
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
