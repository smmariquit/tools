export type PropertyClassification = "RR" | "CR" | "RC" | "CC" | "I" | "X" | "A" | "GL";

export interface ZonalStreet {
    street: string;
    vicinity?: string;
    classification: PropertyClassification;
    valuePerSqm: number;
}

export interface ZonalBarangay {
    name: string;
    streets: ZonalStreet[];
}

export interface ZonalCity {
    name: string;
    rdo: string;
    doNumber: string;
    effectivityDate: string;
    barangays: ZonalBarangay[];
}

export interface ZonalRegion {
    region: string;
    cities: ZonalCity[];
}
