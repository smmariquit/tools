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
			const w = window as any;
			const ads = w.adsbygoogle || [];
			ads.push({});
			w.adsbygoogle = ads;
		} catch (err) {
			console.error("AdSense error:", err);
		}
	}, []);

	return (
		<div
			style={{
				margin: "24px 0",
				textAlign: "center",
				minHeight: "280px",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#f1f3f4",
				border: "1px dashed var(--border-color)",
				color: "var(--text-secondary)",
				fontSize: "14px",
				overflow: "hidden",
			}}
		>
			{/* 
        This is a placeholder wrapper. When running locally or before approval, AdSense won't show.
        The inline styles above are just to show the banner area during development.
      */}
			<ins
				className="adsbygoogle"
				style={{ display: "block", width: "100%" }}
				data-ad-client="ca-pub-9785940474424207"
				data-ad-slot={dataAdSlot}
				data-ad-format={dataAdFormat}
				data-full-width-responsive={dataFullWidthResponsive.toString()}
			/>
		</div>
	);
}
