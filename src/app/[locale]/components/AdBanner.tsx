type AdBannerProps = {
	dataAdSlot: string;
	dataAdFormat?: "auto" | "fluid" | "rectangle";
	dataFullWidthResponsive?: boolean;
};

export default function AdBanner(_props: AdBannerProps) {
	// ponytail: keep manual slots off for re-review; restore one measured slot
	// per long-form page only after approval and a content-to-ad audit.
	return null;
}
