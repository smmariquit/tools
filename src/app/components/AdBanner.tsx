"use client";

import { useEffect } from "react";

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat?: "auto" | "fluid" | "rectangle";
  dataFullWidthResponsive?: boolean;
};

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-expect-error Google AdSense injects this onto the window object
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div style={{ margin: "24px 0", textAlign: "center", minHeight: "280px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f3f4", border: "1px dashed var(--border-color)", color: "var(--text-secondary)", fontSize: "14px", overflow: "hidden" }}>
      {/* 
        This is a placeholder wrapper. When running locally or before approval, AdSense won't show.
        The inline styles above are just to show the banner area during development.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual AdSense Publisher ID
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
