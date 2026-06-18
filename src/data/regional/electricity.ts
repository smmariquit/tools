/**
 * Distribution-utility (DU) residential electricity rates by franchise area.
 *
 * End-user ₱/kWh is set by the DU holding the regional franchise, not by a
 * single national rate. Figures are APPROXIMATE residential blended rates
 * captured for the Q1/Q2 2026 period and fluctuate monthly with the
 * generation mix and WESM spot prices — always treat them as editable
 * defaults, not exact bills.
 *
 * Source: ERC-approved DU tariffs; rate advisories per utility.
 * See e.g. Davao Light advisory (Feb 2026):
 * https://aboitizeyes.aboitiz.com/power/davao-light-bares-lower-electricity-rate-this-february-2026/
 */

export interface DistributionUtility {
	id: string;
	/** Proper-noun brand; rendered untranslated. */
	name: string;
	/** Primary franchise / coverage area (place names, locale-neutral). */
	coverage: string;
	/** Representative residential rate applied when selected. */
	ratePerKwh: number;
	/** Lower bound of the observed range, when the DU publishes a band. */
	rateMin?: number;
	/** Upper bound of the observed range, when the DU publishes a band. */
	rateMax?: number;
	/** Capture period for the rate. */
	asOf: string;
}

export const ELECTRICITY_AS_OF = "Q1 2026";

export const distributionUtilities: DistributionUtility[] = [
	{
		id: "meralco",
		name: "Meralco",
		coverage: "NCR, Bulacan, Rizal, Cavite",
		ratePerKwh: 14.33,
		asOf: ELECTRICITY_AS_OF,
	},
	{
		id: "veco",
		name: "VECO",
		coverage: "Cebu City, Mandaue, Talisay",
		ratePerKwh: 12.88,
		asOf: ELECTRICITY_AS_OF,
	},
	{
		id: "cepalco",
		name: "CEPALCO",
		coverage: "Cagayan de Oro",
		ratePerKwh: 13.09,
		asOf: ELECTRICITY_AS_OF,
	},
	{
		id: "more",
		name: "MORE Electric",
		coverage: "Iloilo City",
		ratePerKwh: 11.87,
		asOf: ELECTRICITY_AS_OF,
	},
	{
		id: "davao-light",
		name: "Davao Light",
		coverage: "Davao City, Panabo",
		ratePerKwh: 10.42,
		rateMin: 10.3,
		rateMax: 10.53,
		asOf: ELECTRICITY_AS_OF,
	},
	{
		id: "beneco",
		name: "BENECO",
		coverage: "Baguio City, Benguet",
		ratePerKwh: 10.18,
		rateMin: 9.59,
		rateMax: 10.77,
		asOf: ELECTRICITY_AS_OF,
	},
];

export const DEFAULT_UTILITY_ID = "meralco";

export function getUtility(id: string): DistributionUtility | undefined {
	return distributionUtilities.find((u) => u.id === id);
}
