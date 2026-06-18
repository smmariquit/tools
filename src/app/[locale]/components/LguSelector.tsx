"use client";

import { useTranslations } from "next-intl";
import React from "react";
import {
	getCities,
	getProvinces,
	regions,
} from "../../../data/regional/psgc";

export interface LguSelection {
	regionId?: string;
	provinceId?: string;
	cityId?: string;
}

interface LguSelectorProps {
	value: LguSelection;
	onChange: (next: LguSelection) => void;
	/** How deep the cascade goes. Defaults to "city". */
	depth?: "region" | "province" | "city";
	/** Optional whitelist of region ids (e.g. only wage-board regions). */
	regionIds?: string[];
	/** Layout direction of the selects. Defaults to "row". */
	direction?: "row" | "column";
}

export default function LguSelector({
	value,
	onChange,
	depth = "city",
	regionIds,
	direction = "row",
}: LguSelectorProps) {
	const t = useTranslations("Lgu");
	const baseId = React.useId();

	const regionOptions = regionIds
		? regions.filter((r) => regionIds.includes(r.id))
		: regions;
	const provinceOptions = value.regionId ? getProvinces(value.regionId) : [];
	const cityOptions = value.provinceId ? getCities(value.provinceId) : [];

	return (
		<div
			style={{
				display: "flex",
				flexDirection: direction === "row" ? "row" : "column",
				flexWrap: "wrap",
				gap: "12px",
			}}
		>
			<div className="form-group" style={{ flex: "1 1 160px", minWidth: 0 }}>
				<label className="form-label" htmlFor={`${baseId}-region`}>
					{t("regionLabel")}
				</label>
				<select
					id={`${baseId}-region`}
					className="form-control"
					value={value.regionId ?? ""}
					onChange={(e) =>
						onChange({ regionId: e.target.value || undefined })
					}
				>
					<option value="">{t("selectRegion")}</option>
					{regionOptions.map((r) => (
						<option key={r.id} value={r.id}>
							{r.n}
						</option>
					))}
				</select>
			</div>

			{depth !== "region" && (
				<div className="form-group" style={{ flex: "1 1 160px", minWidth: 0 }}>
					<label className="form-label" htmlFor={`${baseId}-province`}>
						{t("provinceLabel")}
					</label>
					<select
						id={`${baseId}-province`}
						className="form-control"
						value={value.provinceId ?? ""}
						disabled={!value.regionId}
						onChange={(e) =>
							onChange({
								regionId: value.regionId,
								provinceId: e.target.value || undefined,
							})
						}
					>
						<option value="">{t("selectProvince")}</option>
						{provinceOptions.map((p) => (
							<option key={p.id} value={p.id}>
								{p.n}
							</option>
						))}
					</select>
				</div>
			)}

			{depth === "city" && (
				<div className="form-group" style={{ flex: "1 1 160px", minWidth: 0 }}>
					<label className="form-label" htmlFor={`${baseId}-city`}>
						{t("cityLabel")}
					</label>
					<select
						id={`${baseId}-city`}
						className="form-control"
						value={value.cityId ?? ""}
						disabled={!value.provinceId}
						onChange={(e) =>
							onChange({
								regionId: value.regionId,
								provinceId: value.provinceId,
								cityId: e.target.value || undefined,
							})
						}
					>
						<option value="">{t("selectCity")}</option>
						{cityOptions.map((c) => (
							<option key={c.id} value={c.id}>
								{c.n}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
}
