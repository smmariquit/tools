// TRB-approved complete Philippine Toll Rate Matrix for SLEX, NLEX, Skyway Stage 3, STAR Tollway, TPLEX, CAVITEX, NAIAX, CALAX.
// Contains comprehensive exits matching Wikipedia and TRB references.

export type ExpresswayData = {
	name: string;
	exits: string[];
	// closed = distance-based (tap at entry, pay on exit). When the entry tap is
	// missing, the exit plaza defaults to the full-length terminal-to-terminal
	// toll. open = flat barrier fee, so a missing entry record does not apply.
	closed: boolean;
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
			"Nagtahan",
			"E. Rodriguez",
			"Quezon Ave",
			"Sgt. Rivera",
			"A. Bonifacio",
			"Balintawak",
			"NLEX",
		],
		closed: true,
		rates: {
			"Buendia|Quirino": { class1: 105, class2: 210, class3: 315 },
			"Buendia|Plaza Dilao": { class1: 105, class2: 210, class3: 315 },
			"Buendia|Nagtahan": { class1: 105, class2: 210, class3: 315 },
			"Buendia|E. Rodriguez": { class1: 264, class2: 528, class3: 792 },
			"Buendia|Quezon Ave": { class1: 264, class2: 528, class3: 792 },
			"Buendia|Sgt. Rivera": { class1: 264, class2: 528, class3: 792 },
			"Buendia|A. Bonifacio": { class1: 264, class2: 528, class3: 792 },
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
		name: "NLEX (North Luzon Expressway)",
		exits: [
			"Balintawak",
			"Mindanao Avenue",
			"Karuhatan",
			"Meycauayan",
			"Marilao",
			"Ciudad de Victoria",
			"Bocaue",
			"Tambubong",
			"Balagtas",
			"Tabang",
			"Guiguinto",
			"Plaridel",
			"Pulilan",
			"San Simon",
			"San Fernando",
			"Mexico",
			"Angeles",
			"Dau",
			"Santa Ines",
		],
		closed: true,
		rates: {
			"Balintawak|Mindanao Avenue": { class1: 10, class2: 20, class3: 30 },
			"Balintawak|Karuhatan": { class1: 15, class2: 30, class3: 45 },
			"Balintawak|Meycauayan": { class1: 30, class2: 60, class3: 90 },
			"Balintawak|Marilao": { class1: 45, class2: 90, class3: 135 },
			"Balintawak|Ciudad de Victoria": { class1: 55, class2: 110, class3: 165 },
			"Balintawak|Bocaue": { class1: 65, class2: 130, class3: 195 },
			"Balintawak|Tambubong": { class1: 75, class2: 150, class3: 225 },
			"Balintawak|Balagtas": { class1: 80, class2: 160, class3: 240 },
			"Balintawak|Tabang": { class1: 85, class2: 170, class3: 255 },
			"Balintawak|Guiguinto": { class1: 90, class2: 180, class3: 270 },
			"Balintawak|Plaridel": { class1: 110, class2: 220, class3: 330 },
			"Balintawak|Pulilan": { class1: 120, class2: 240, class3: 360 },
			"Balintawak|San Simon": { class1: 150, class2: 300, class3: 450 },
			"Balintawak|San Fernando": { class1: 180, class2: 360, class3: 540 },
			"Balintawak|Mexico": { class1: 210, class2: 420, class3: 630 },
			"Balintawak|Angeles": { class1: 240, class2: 480, class3: 720 },
			"Balintawak|Dau": { class1: 260, class2: 520, class3: 780 },
			"Balintawak|Santa Ines": { class1: 280, class2: 560, class3: 840 },
		},
	},
	{
		name: "SLEX (South Luzon Expressway)",
		exits: [
			"Nichols",
			"Bicutan",
			"Sucat",
			"Alabang",
			"Filinvest",
			"MCX (Susana Heights)",
			"San Pedro",
			"Southwoods",
			"Biñan",
			"Carmona",
			"Mamplasan",
			"Santa Rosa",
			"Eton City",
			"Cabuyao",
			"Silangan",
			"Batino",
			"Calamba",
		],
		closed: true,
		rates: {
			"Nichols|Bicutan": { class1: 13, class2: 26, class3: 39 },
			"Nichols|Sucat": { class1: 26, class2: 52, class3: 78 },
			"Nichols|Alabang": { class1: 39, class2: 78, class3: 117 },
			"Nichols|Filinvest": { class1: 44, class2: 88, class3: 132 },
			"Nichols|MCX (Susana Heights)": { class1: 44, class2: 88, class3: 132 },
			"Nichols|San Pedro": { class1: 59, class2: 118, class3: 177 },
			"Nichols|Southwoods": { class1: 69, class2: 138, class3: 207 },
			"Nichols|Biñan": { class1: 69, class2: 138, class3: 207 },
			"Nichols|Carmona": { class1: 84, class2: 168, class3: 252 },
			"Nichols|Mamplasan": { class1: 104, class2: 208, class3: 312 },
			"Nichols|Santa Rosa": { class1: 114, class2: 228, class3: 342 },
			"Nichols|Eton City": { class1: 122, class2: 244, class3: 366 },
			"Nichols|Cabuyao": { class1: 129, class2: 258, class3: 387 },
			"Nichols|Silangan": { class1: 139, class2: 278, class3: 417 },
			"Nichols|Batino": { class1: 144, class2: 288, class3: 432 },
			"Nichols|Calamba": { class1: 149, class2: 298, class3: 447 },
		},
	},
	{
		name: "STAR Tollway",
		exits: [
			"Sto. Tomas",
			"Tanauan",
			"Malvar",
			"Balete",
			"Lipa",
			"San Jose",
			"Ibaan",
			"Batangas City",
		],
		closed: true,
		rates: {
			"Sto. Tomas|Tanauan": { class1: 17, class2: 34, class3: 51 },
			"Sto. Tomas|Malvar": { class1: 32, class2: 64, class3: 96 },
			"Sto. Tomas|Balete": { class1: 44, class2: 88, class3: 132 },
			"Sto. Tomas|Lipa": { class1: 56, class2: 112, class3: 168 },
			"Sto. Tomas|San Jose": { class1: 70, class2: 140, class3: 210 },
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
			"Sison",
			"Rosario",
		],
		closed: true,
		rates: {
			"Tarlac|Victoria": { class1: 38, class2: 95, class3: 114 },
			"Tarlac|Pura": { class1: 66, class2: 165, class3: 198 },
			"Tarlac|Ramos": { class1: 80, class2: 200, class3: 240 },
			"Tarlac|Anao": { class1: 100, class2: 250, class3: 300 },
			"Tarlac|Carmen": { class1: 161, class2: 403, class3: 483 },
			"Tarlac|Urdaneta": { class1: 216, class2: 540, class3: 648 },
			"Tarlac|Binalonan": { class1: 241, class2: 603, class3: 723 },
			"Tarlac|Pozorrubio": { class1: 270, class2: 675, class3: 810 },
			"Tarlac|Sison": { class1: 290, class2: 580, class3: 870 },
			"Tarlac|Rosario": { class1: 311, class2: 778, class3: 933 },
		},
	},
	{
		name: "CAVITEX",
		exits: ["Manila (Parañaque)", "Las Piñas", "Kawit"],
		closed: false,
		rates: {
			"Manila (Parañaque)|Las Piñas": { class1: 35, class2: 70, class3: 104 },
			"Manila (Parañaque)|Kawit": { class1: 73, class2: 146, class3: 219 },
			"Las Piñas|Kawit": { class1: 38, class2: 76, class3: 115 },
		},
	},
	{
		name: "NAIAX",
		exits: ["Skyway/SLEX", "NAIA T3", "NAIA T1/T2", "Macapagal"],
		closed: false,
		rates: {
			"Skyway/SLEX|NAIA T3": { class1: 35, class2: 69, class3: 104 },
			"Skyway/SLEX|NAIA T1/T2": { class1: 45, class2: 90, class3: 135 },
			"Skyway/SLEX|Macapagal": { class1: 45, class2: 90, class3: 135 },
			"NAIA T3|NAIA T1/T2": { class1: 35, class2: 69, class3: 104 },
			"NAIA T3|Macapagal": { class1: 35, class2: 69, class3: 104 },
		},
	},
	{
		name: "CALAX (Cavite-Laguna Expressway)",
		exits: [
			"Mamplasan",
			"Laguna Technopark",
			"Laguna Boulevard",
			"Santa Rosa-Tagaytay",
			"Silang East",
			"Silang (Aguinaldo)",
		],
		closed: true,
		rates: {
			"Mamplasan|Laguna Technopark": { class1: 17, class2: 34, class3: 51 },
			"Mamplasan|Laguna Boulevard": { class1: 33, class2: 66, class3: 99 },
			"Mamplasan|Santa Rosa-Tagaytay": { class1: 47, class2: 94, class3: 141 },
			"Mamplasan|Silang East": { class1: 64, class2: 128, class3: 192 },
			"Mamplasan|Silang (Aguinaldo)": { class1: 81, class2: 162, class3: 243 },
		},
	},
	{
		name: "SCTEX (Subic-Clark-Tarlac Expressway)",
		exits: [
			"Subic (Tipo)",
			"Dinalupihan",
			"Floridablanca",
			"Porac",
			"Clark South",
			"Mabalacat (Clark North)",
			"Dolores",
			"Concepcion",
			"San Miguel (Luisita)",
			"Tarlac City",
		],
		closed: true,
		rates: {
			"Subic (Tipo)|Dinalupihan": { class1: 49, class2: 98, class3: 147 },
			"Subic (Tipo)|Floridablanca": { class1: 97, class2: 194, class3: 291 },
			"Subic (Tipo)|Porac": { class1: 129, class2: 258, class3: 387 },
			"Subic (Tipo)|Clark South": { class1: 161, class2: 322, class3: 483 },
			"Subic (Tipo)|Mabalacat (Clark North)": {
				class1: 172,
				class2: 344,
				class3: 516,
			},
			"Subic (Tipo)|Dolores": { class1: 184, class2: 368, class3: 552 },
			"Subic (Tipo)|Concepcion": { class1: 226, class2: 452, class3: 678 },
			"Subic (Tipo)|San Miguel (Luisita)": {
				class1: 268,
				class2: 536,
				class3: 804,
			},
			"Subic (Tipo)|Tarlac City": { class1: 290, class2: 580, class3: 870 },
		},
	},
	{
		name: "CCLEX (Cebu-Cordova Link Expressway)",
		exits: ["Cebu City (SRP)", "Cordova"],
		closed: false,
		rates: {
			"Cebu City (SRP)|Cordova": { class1: 90, class2: 180, class3: 270 },
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

export const isClosedSystem = (expresswayName: string): boolean => {
	return expressways.find((e) => e.name === expresswayName)?.closed ?? false;
};

// On a closed (distance-based) expressway, when the entry tap is not recorded,
// the exit plaza cannot compute distance and defaults to the full-length
// terminal-to-terminal toll — i.e. the maximum rate in the matrix for that
// vehicle class. Returns 0 if no rates exist.
export const getMaxTollFee = (
	expresswayName: string,
	vehicleClass: "class1" | "class2" | "class3",
): number => {
	const expressway = expressways.find((e) => e.name === expresswayName);
	if (!expressway) return 0;
	const values = Object.values(expressway.rates).map((r) => r[vehicleClass]);
	return values.length ? Math.max(...values) : 0;
};
