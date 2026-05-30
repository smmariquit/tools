import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Amilyar (Real Property Tax) Calculator Philippines | PHTools",
  description: "Estimate your annual Amilyar or Real Property Tax (RPT) in the Philippines, including the Special Education Fund (SEF) for residential and commercial properties.",
};

export default function AmilyarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Amilyar Calculator",
    "applicationCategory": "FinanceApplication",
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
