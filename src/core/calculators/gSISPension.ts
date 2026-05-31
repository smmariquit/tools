export function calculateGSISPension(amc: number, cvs: number) {
	if (cvs < 15) {
		return { bmp: 0 }; // Not eligible for regular pension if < 15 years
	}

	let bmp = 0.025 * amc * cvs;

	// Max BMP is 90% of AMC
	const maxBmp = amc * 0.9;
	if (bmp > maxBmp) {
		bmp = maxBmp;
	}

	// Min BMP is 5000 according to current GSIS rules
	if (bmp < 5000) {
		bmp = 5000;
	}

	return { bmp };
}
