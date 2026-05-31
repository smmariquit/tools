// Simplified toll matrix based on TRB rates.
// Can be expanded to include all expressways by adding more objects.

export type ExpresswayData = {
	name: string;
	exits: string[];
	// Key format: "Origin|Destination"
	rates: Record<string, { class1: number; class2: number; class3: number }>;
};

export const expressways: ExpresswayData[] = [
	{
		name: "Skyway Stage 3",
		exits: [
			"Buendia",
			"Quirino",
			"Plaza Dilao",
			"E. Rodriguez",
			"Quezon Ave",
			"Balintawak",
			"NLEX",
		],
		rates: {
			"Buendia|Quirino": { class1: 105, class2: 210, class3: 315 },
			"Buendia|Plaza Dilao": { class1: 105, class2: 210, class3: 315 },
			"Buendia|E. Rodriguez": { class1: 264, class2: 528, class3: 792 },
			"Buendia|Quezon Ave": { class1: 264, class2: 528, class3: 792 },
			"Buendia|Balintawak": { class1: 264, class2: 528, class3: 792 },
			"Buendia|NLEX": { class1: 264, class2: 528, class3: 792 },

			"Quirino|E. Rodriguez": { class1: 105, class2: 210, class3: 315 },
			"Quirino|Quezon Ave": { class1: 105, class2: 210, class3: 315 },
			"Quirino|Balintawak": { class1: 129, class2: 258, class3: 387 },
			"Quirino|NLEX": { class1: 129, class2: 258, class3: 387 },

			"E. Rodriguez|Balintawak": { class1: 129, class2: 258, class3: 387 },
			"E. Rodriguez|NLEX": { class1: 129, class2: 258, class3: 387 },

			"Quezon Ave|Balintawak": { class1: 129, class2: 258, class3: 387 },
			"Quezon Ave|NLEX": { class1: 129, class2: 258, class3: 387 },
		},
	},
	{
		name: "SLEX (South Luzon Expressway)",
		exits: [
			"Alabang",
			"Filinvest",
			"MCX",
			"San Pedro",
			"Biñan",
			"Carmona",
			"Sta. Rosa",
			"Calamba",
		],
		rates: {
			"Alabang|Filinvest": { class1: 5, class2: 10, class3: 15 },
			"Alabang|MCX": { class1: 5, class2: 10, class3: 15 },
			"Alabang|San Pedro": { class1: 20, class2: 40, class3: 60 },
			"Alabang|Biñan": { class1: 30, class2: 60, class3: 90 },
			"Alabang|Carmona": { class1: 45, class2: 90, class3: 135 },
			"Alabang|Sta. Rosa": { class1: 75, class2: 150, class3: 225 },
			"Alabang|Calamba": { class1: 110, class2: 220, class3: 330 },

			"Sta. Rosa|Calamba": { class1: 35, class2: 70, class3: 105 },
		},
	},
	{
		name: "STAR Tollway",
		exits: [
			"Sto. Tomas",
			"Tanauan",
			"Malvar",
			"Lipa",
			"Ibaan",
			"Batangas City",
		],
		rates: {
			"Sto. Tomas|Tanauan": { class1: 17, class2: 34, class3: 51 },
			"Sto. Tomas|Malvar": { class1: 32, class2: 64, class3: 96 },
			"Sto. Tomas|Lipa": { class1: 56, class2: 112, class3: 168 },
			"Sto. Tomas|Ibaan": { class1: 85, class2: 170, class3: 255 },
			"Sto. Tomas|Batangas City": { class1: 104, class2: 208, class3: 312 },
		},
	},
	{
		name: "TPLEX",
		exits: [
			"Tarlac",
			"Victoria",
			"Pura",
			"Ramos",
			"Anao",
			"Carmen",
			"Urdaneta",
			"Binalonan",
			"Pozorrubio",
			"Rosario",
		],
		rates: {
			"Tarlac|Victoria": { class1: 38, class2: 95, class3: 114 },
			"Tarlac|Pura": { class1: 66, class2: 165, class3: 198 },
			"Tarlac|Ramos": { class1: 80, class2: 200, class3: 240 },
			"Tarlac|Anao": { class1: 100, class2: 250, class3: 300 },
			"Tarlac|Carmen": { class1: 161, class2: 403, class3: 483 },
			"Tarlac|Urdaneta": { class1: 216, class2: 540, class3: 648 },
			"Tarlac|Binalonan": { class1: 241, class2: 603, class3: 723 },
			"Tarlac|Pozorrubio": { class1: 270, class2: 675, class3: 810 },
			"Tarlac|Rosario": { class1: 311, class2: 778, class3: 933 },
		},
	},
	{
		name: "CAVITEX",
		exits: ["Manila (Parañaque)", "Las Piñas", "Kawit"],
		rates: {
			"Manila (Parañaque)|Las Piñas": { class1: 35, class2: 70, class3: 104 },
			"Manila (Parañaque)|Kawit": { class1: 73, class2: 146, class3: 219 },
			"Las Piñas|Kawit": { class1: 38, class2: 76, class3: 115 },
		},
	},
	{
		name: "NAIAX",
		exits: ["Skyway/SLEX", "NAIA T3", "NAIA T1/T2", "Macapagal"],
		rates: {
			"Skyway/SLEX|NAIA T3": { class1: 35, class2: 69, class3: 104 },
			"Skyway/SLEX|NAIA T1/T2": { class1: 45, class2: 90, class3: 135 },
			"Skyway/SLEX|Macapagal": { class1: 45, class2: 90, class3: 135 },
			"NAIA T3|NAIA T1/T2": { class1: 35, class2: 69, class3: 104 },
			"NAIA T3|Macapagal": { class1: 35, class2: 69, class3: 104 },
		},
	},
];

export const getTollFee = (
	expresswayName: string,
	origin: string,
	destination: string,
	vehicleClass: "class1" | "class2" | "class3",
): number | null => {
	const expressway = expressways.find((e) => e.name === expresswayName);
	if (!expressway) return null;

	if (origin === destination) return 0;

	// 1. Try direct route
	let rateObj = expressway.rates[`${origin}|${destination}`];

	// 2. Try reverse route if direct doesn't exist
	if (!rateObj) {
		rateObj = expressway.rates[`${destination}|${origin}`];
	}

	// 3. If still not found, estimate based on difference from the first exit (Base Station)
	// This works well for distance-based closed systems like SLEX/NLEX
	if (!rateObj) {
		const baseExit = expressway.exits[0];
		const originFromBase =
			expressway.rates[`${baseExit}|${origin}`] ||
			expressway.rates[`${origin}|${baseExit}`];
		const destFromBase =
			expressway.rates[`${baseExit}|${destination}`] ||
			expressway.rates[`${destination}|${baseExit}`];

		if (originFromBase && destFromBase) {
			return Math.abs(
				destFromBase[vehicleClass] - originFromBase[vehicleClass],
			);
		}
	}

	return rateObj ? rateObj[vehicleClass] : null;
};
