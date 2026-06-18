/**
 * Philippine administrative divisions (PSGC) — region / province / city-municipality.
 *
 * Barangays are intentionally excluded to keep the bundle small (~18KB gzip);
 * the regional nuance in PHTools (minimum wage, RPT, distribution-utility
 * rates, local holidays) operates at city/municipality level or higher.
 *
 * Data: Philippine Standard Geographic Code (PSGC), Philippine Statistics
 * Authority (PSA). Compiled from the open dataset
 * "open-admin-data/philippines-administrative-divisions" (CC-BY-4.0):
 * https://github.com/open-admin-data/philippines-administrative-divisions
 *
 * NCR is modelled as region "NCR" → pseudo-province "Metro Manila" → cities,
 * matching the PSA structure, so the cascade works uniformly nationwide.
 */
import raw from "./psgc.json";

export interface Region {
	/** Region code, e.g. "NCR", "R04A", "CAR". */
	id: string;
	/** English name. */
	n: string;
}

export interface Province {
	id: string;
	n: string;
	/** Parent region id. */
	r: string;
}

export interface CityMunicipality {
	id: string;
	n: string;
	/** Parent province id. */
	p: string;
}

const data = raw as {
	meta: Record<string, string>;
	regions: Region[];
	provinces: Province[];
	cities: CityMunicipality[];
};

export const regions: Region[] = data.regions;

export function getProvinces(regionId: string): Province[] {
	return data.provinces.filter((p) => p.r === regionId);
}

export function getCities(provinceId: string): CityMunicipality[] {
	return data.cities.filter((c) => c.p === provinceId);
}

export function getRegion(id: string): Region | undefined {
	return data.regions.find((r) => r.id === id);
}

export function getProvince(id: string): Province | undefined {
	return data.provinces.find((p) => p.id === id);
}

export function getCity(id: string): CityMunicipality | undefined {
	return data.cities.find((c) => c.id === id);
}
