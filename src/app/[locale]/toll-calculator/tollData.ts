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
    exits: ["Buendia", "Quirino", "Plaza Dilao", "E. Rodriguez", "Quezon Ave", "Balintawak", "NLEX"],
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

      "Quezon Ave|Balintawak": { class1: 129, class2: 258, class3: 387 },
      "Quezon Ave|NLEX": { class1: 129, class2: 258, class3: 387 },
    }
  },
  {
    name: "SLEX (South Luzon Expressway)",
    exits: ["Alabang", "Filinvest", "MCX", "San Pedro", "Biñan", "Carmona", "Sta. Rosa", "Calamba"],
    rates: {
      "Alabang|Filinvest": { class1: 5, class2: 10, class3: 15 },
      "Alabang|MCX": { class1: 5, class2: 10, class3: 15 },
      "Alabang|San Pedro": { class1: 20, class2: 40, class3: 60 },
      "Alabang|Biñan": { class1: 30, class2: 60, class3: 90 },
      "Alabang|Carmona": { class1: 45, class2: 90, class3: 135 },
      "Alabang|Sta. Rosa": { class1: 75, class2: 150, class3: 225 },
      "Alabang|Calamba": { class1: 110, class2: 220, class3: 330 },
      
      "Sta. Rosa|Calamba": { class1: 35, class2: 70, class3: 105 },
    }
  }
];

export const getTollFee = (expresswayName: string, origin: string, destination: string, vehicleClass: "class1" | "class2" | "class3"): number | null => {
  const expressway = expressways.find((e) => e.name === expresswayName);
  if (!expressway) return null;

  // Try direct route
  let rateObj = expressway.rates[`${origin}|${destination}`];
  
  // Try reverse route if direct doesn't exist (assuming symmetric pricing for now)
  if (!rateObj) {
    rateObj = expressway.rates[`${destination}|${origin}`];
  }

  return rateObj ? rateObj[vehicleClass] : null;
};
