import { ZonalRegion } from "../types/zonalValues";

export const zonalData: ZonalRegion[] = [
    {
        region: "National Capital Region (NCR)",
        cities: [
            {
                name: "Makati City",
                rdo: "47",
                doNumber: "DO No. 042-2021",
                effectivityDate: "July 24, 2021",
                barangays: [
                    {
                        name: "Bel-Air",
                        streets: [
                            { street: "Burgos St.", classification: "CR", valuePerSqm: 280000 },
                            { street: "Jupiter St.", classification: "CR", valuePerSqm: 300000 },
                            { street: "Makati Ave.", classification: "CR", valuePerSqm: 450000 },
                            { street: "Polaris St.", classification: "CR", valuePerSqm: 250000 },
                            { street: "All Other Streets", classification: "RR", valuePerSqm: 180000 },
                            { street: "All Condominiums", classification: "RC", valuePerSqm: 220000 }
                        ]
                    },
                    {
                        name: "San Lorenzo",
                        streets: [
                            { street: "Amorsolo St.", classification: "CR", valuePerSqm: 300000 },
                            { street: "Arnaiz Ave (Pasay Rd)", classification: "CR", valuePerSqm: 350000 },
                            { street: "Ayala Avenue", classification: "CR", valuePerSqm: 800000 },
                            { street: "Legaspi St.", classification: "CR", valuePerSqm: 320000 },
                            { street: "All Other Streets", classification: "RR", valuePerSqm: 200000 },
                            { street: "All Condominiums", classification: "RC", valuePerSqm: 240000 }
                        ]
                    }
                ]
            },
            {
                name: "Taguig City",
                rdo: "44",
                doNumber: "DO No. 021-2020",
                effectivityDate: "July 01, 2020",
                barangays: [
                    {
                        name: "Fort Bonifacio",
                        streets: [
                            { street: "5th Avenue", classification: "CR", valuePerSqm: 550000 },
                            { street: "11th Avenue", classification: "CR", valuePerSqm: 400000 },
                            { street: "32nd Street", classification: "CR", valuePerSqm: 450000 },
                            { street: "McKinley Parkway", classification: "CR", valuePerSqm: 350000 },
                            { street: "All Other Streets", classification: "RR", valuePerSqm: 250000 },
                            { street: "All Condominiums", classification: "RC", valuePerSqm: 300000 }
                        ]
                    }
                ]
            }
        ]
    }
];

export function getZonalDataBySlug(regionSlug: string, citySlug: string, barangaySlug: string) {
    const region = zonalData.find(r => slugify(r.region) === regionSlug);
    if (!region) return null;

    const city = region.cities.find(c => slugify(c.name) === citySlug);
    if (!city) return null;

    const barangay = city.barangays.find(b => slugify(b.name) === barangaySlug);
    if (!barangay) return null;

    return {
        region: region.region,
        city: city.name,
        rdo: city.rdo,
        doNumber: city.doNumber,
        effectivityDate: city.effectivityDate,
        barangay: barangay.name,
        streets: barangay.streets
    };
}

export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
