export function calculateAgeExact(
	birthDateStr: string,
	targetDateStr?: string,
) {
	if (!birthDateStr) {
		return {
			years: 0,
			months: 0,
			days: 0,
			isMinor: false,
			isSenior: false,
			prcEligible: false,
		};
	}

	const bDay = new Date(birthDateStr);
	const target = targetDateStr ? new Date(targetDateStr) : new Date();

	if (Number.isNaN(bDay.getTime()) || Number.isNaN(target.getTime())) {
		return {
			years: 0,
			months: 0,
			days: 0,
			isMinor: false,
			isSenior: false,
			prcEligible: false,
		};
	}

	let years = target.getFullYear() - bDay.getFullYear();
	let months = target.getMonth() - bDay.getMonth();
	let days = target.getDate() - bDay.getDate();

	if (days < 0) {
		months--;
		// Get days in previous month
		const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
		days += prevMonth.getDate();
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	// Handle future dates (not born yet)
	if (years < 0) {
		return {
			years: 0,
			months: 0,
			days: 0,
			isMinor: true,
			isSenior: false,
			prcEligible: false,
		};
	}

	return {
		years,
		months,
		days,
		isMinor: years < 18,
		isSenior: years >= 60,
		prcEligible: years >= 21,
	};
}
