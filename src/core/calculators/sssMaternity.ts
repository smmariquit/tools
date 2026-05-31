export function calculateSSSMaternity(msc: number, type: string) {
	const cappedMsc = Math.min(msc, 30000);
	const totalMsc = cappedMsc * 6;
	const adsc = totalMsc / 180;

	let days = 105;
	if (type === "solo-parent") days = 120;
	if (type === "miscarriage") days = 60;

	return {
		cappedMsc,
		adsc,
		days,
		benefit: adsc * days,
	};
}
