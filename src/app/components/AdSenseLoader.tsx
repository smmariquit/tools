"use client";

import { useEffect } from "react";

const ADSENSE_SCRIPT_ID = "adsbygoogle-js";
const ADSENSE_SRC =
	"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9785940474424207";

export default function AdSenseLoader() {
	useEffect(() => {
		let loaded = false;

		const load = () => {
			if (loaded || document.getElementById(ADSENSE_SCRIPT_ID)) return;
			loaded = true;
			cleanup();

			const script = document.createElement("script");
			script.id = ADSENSE_SCRIPT_ID;
			script.async = true;
			script.src = ADSENSE_SRC;
			script.crossOrigin = "anonymous";
			document.head.appendChild(script);
		};

		// Load on first user interaction, or when the main thread goes idle —
		// whichever comes first. Keeps the third-party script off the critical
		// path so it doesn't hurt TBT/LCP in Lighthouse.
		const events: (keyof WindowEventMap)[] = [
			"scroll",
			"pointerdown",
			"keydown",
			"touchstart",
		];
		const cleanup = () => {
			for (const e of events) window.removeEventListener(e, load);
		};
		for (const e of events)
			window.addEventListener(e, load, { once: true, passive: true });

		const useIdle = typeof window.requestIdleCallback === "function";
		const idleId = useIdle
			? window.requestIdleCallback(load, { timeout: 5000 })
			: window.setTimeout(load, 3000);

		return () => {
			cleanup();
			if (useIdle) window.cancelIdleCallback(idleId);
			else window.clearTimeout(idleId);
		};
	}, []);

	return null;
}
