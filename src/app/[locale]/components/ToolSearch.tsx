"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { toolCategories } from "../../../lib/routes";
import { rankTools } from "../../../lib/toolSearch";
import { doodles } from "../../components/illustrations/doodles";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import ToolIcon from "../../components/ToolIcon";
import Pagination from "./Pagination";

const TOOLS_PER_PAGE = 12;
const MAX_SUGGESTIONS = 7;

export default function ToolSearch() {
	const t = useTranslations("Index");
	const tRoutes = useTranslations("Routes");
	const router = useRouter();
	const pathname = usePathname();
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [page, setPage] = useState(1);
	const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

	// Typeahead suggestions state (additive — independent of the grid filter).
	const [suggestOpen, setSuggestOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const searchBoxRef = useRef<HTMLDivElement>(null);
	const listboxId = useId();

	// Locale prefix derived from the current path (mirrors search results page).
	const localePrefix = useMemo(() => {
		const parts = (pathname || "").split("/").filter(Boolean);
		return parts.length ? `/${parts[0]}` : "";
	}, [pathname]);

	// Debounce filtering so we don't re-render the whole grid on every keystroke.
	useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedQuery(query);
			setPage(1);
		}, 250);
		return () => clearTimeout(id);
	}, [query]);

	// Flat, locale-aware list of every tool — the source for suggestions.
	const localizedTools = useMemo(
		() =>
			toolCategories.flatMap((category) =>
				category.items.map((item) => {
					const key = item.path ? item.path.replace("/", "") : "";
					const name =
						key && tRoutes.has(`${key}.name`)
							? tRoutes(`${key}.name`)
							: item.name;
					const desc =
						key && tRoutes.has(`${key}.desc`)
							? tRoutes(`${key}.desc`)
							: item.desc;
					return {
						name,
						desc,
						path: item.path,
						tags: item.tags,
						priority: item.priority,
					};
				}),
			),
		[tRoutes],
	);

	// Suggestions track the live (un-debounced) query so the dropdown feels instant.
	const suggestionQuery = query.trim();
	const suggestions = useMemo(() => {
		if (!suggestionQuery) return [];
		return rankTools(suggestionQuery, localizedTools)
			.slice(0, MAX_SUGGESTIONS)
			.map((r) => r.tool);
	}, [localizedTools, suggestionQuery]);

	const showSuggestions = suggestOpen && suggestionQuery.length > 0;

	// Close the dropdown when clicking/tapping outside the search box.
	useEffect(() => {
		if (!showSuggestions) return;
		const handleOutside = (event: MouseEvent) => {
			if (
				searchBoxRef.current &&
				!searchBoxRef.current.contains(event.target as Node)
			) {
				setSuggestOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutside);
		return () => document.removeEventListener("mousedown", handleOutside);
	}, [showSuggestions]);

	const goToTool = (path: string) => {
		setSuggestOpen(false);
		setActiveIndex(-1);
		router.push(`${localePrefix}${path}`);
	};

	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") {
			setSuggestOpen(false);
			setActiveIndex(-1);
			return;
		}
		if (!showSuggestions || suggestions.length === 0) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => (i + 1) % suggestions.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
		} else if (e.key === "Enter") {
			if (activeIndex >= 0 && activeIndex < suggestions.length) {
				e.preventDefault();
				goToTool(suggestions[activeIndex].path);
			}
		}
	};

	const normalizedQuery = debouncedQuery.trim();
	// Fuzzy relevance scores keyed by tool path (null when the query is empty,
	// in which case we keep the default catalog order and show everything).
	const scoreByPath = useMemo(() => {
		if (!normalizedQuery) return null;
		const map = new Map<string, number>();
		for (const { tool, score } of rankTools(normalizedQuery, localizedTools)) {
			map.set(tool.path, score);
		}
		return map;
	}, [normalizedQuery, localizedTools]);

	const filteredCategories = toolCategories
		.map((category) => {
			const filteredItems = category.items
				.map((item) => {
					const key = item.path ? item.path.replace("/", "") : "";
					const localizedName =
						key && tRoutes.has(`${key}.name`)
							? tRoutes(`${key}.name`)
							: item.name;
					const localizedDesc =
						key && tRoutes.has(`${key}.desc`)
							? tRoutes(`${key}.desc`)
							: item.desc;
					return { ...item, name: localizedName, desc: localizedDesc };
				})
				.filter((item) => !scoreByPath || scoreByPath.has(item.path));
			// Rank within each category by relevance when searching.
			if (scoreByPath) {
				filteredItems.sort(
					(a, b) =>
						(scoreByPath.get(b.path) ?? 0) - (scoreByPath.get(a.path) ?? 0),
				);
			}
			return { ...category, items: filteredItems };
		})
		.filter((category) => category.items.length > 0);

	// Surface the most relevant category first while keeping items grouped.
	if (scoreByPath) {
		const bestScore = (cat: (typeof filteredCategories)[number]) =>
			cat.items.reduce(
				(max, item) => Math.max(max, scoreByPath.get(item.path) ?? 0),
				0,
			);
		filteredCategories.sort((a, b) => bestScore(b) - bestScore(a));
	}

	// Flatten across categories, paginate, then regroup so the page stays
	// category-organized while honoring a fixed per-page count.
	type FilteredCategory = (typeof filteredCategories)[number];
	const flatTools = filteredCategories.flatMap((category) =>
		category.items.map((item) => ({ category: category.category, item })),
	);
	const totalPages = Math.max(1, Math.ceil(flatTools.length / TOOLS_PER_PAGE));
	const currentPage = Math.min(page, totalPages);
	const pageSlice = flatTools.slice(
		(currentPage - 1) * TOOLS_PER_PAGE,
		currentPage * TOOLS_PER_PAGE,
	);
	const pageCategories: Pick<FilteredCategory, "category" | "items">[] = [];
	for (const { category, item } of pageSlice) {
		const last = pageCategories[pageCategories.length - 1];
		if (last && last.category === category) {
			last.items.push(item);
		} else {
			pageCategories.push({ category, items: [item] });
		}
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "40px",
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: "16px",
					maxWidth: "720px",
					margin: "16px auto 24px",
					width: "100%",
				}}
			>
				<div
					ref={searchBoxRef}
					style={{
						position: "relative",
						width: "100%",
					}}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--text-secondary)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						style={{
							position: "absolute",
							left: "16px",
							top: "50%",
							transform: "translateY(-50%)",
						}}
					>
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
					<input
						type="text"
						placeholder="Search tools, calculators, features..."
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setSuggestOpen(true);
							setActiveIndex(-1);
						}}
						onFocus={() => setSuggestOpen(true)}
						onKeyDown={handleSearchKeyDown}
						className="form-control"
						role="combobox"
						aria-expanded={showSuggestions}
						aria-controls={listboxId}
						aria-autocomplete="list"
						aria-activedescendant={
							showSuggestions && activeIndex >= 0
								? `${listboxId}-opt-${activeIndex}`
								: undefined
						}
						style={{
							paddingLeft: "52px",
							paddingRight: "20px",
							height: "60px",
							fontSize: "17px",
							borderRadius: "14px",
							boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
							border: "1px solid var(--border-color)",
						}}
					/>
					{showSuggestions && (
						<div
							id={listboxId}
							role="listbox"
							aria-label={t("suggestionsLabel")}
							style={{
								position: "absolute",
								top: "calc(100% + 8px)",
								left: 0,
								right: 0,
								padding: "6px",
								background: "var(--surface-color)",
								border: "1px solid var(--border-color)",
								borderRadius: "14px",
								boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
								zIndex: 1100,
								maxHeight: "360px",
								overflowY: "auto",
							}}
						>
							{suggestions.length > 0 ? (
								suggestions.map((tool, index) => {
									const active = index === activeIndex;
									return (
										<div
											key={tool.path}
											id={`${listboxId}-opt-${index}`}
											role="option"
											tabIndex={-1}
											aria-selected={active}
											onMouseDown={(e) => {
												// Prevent input blur before navigation fires.
												e.preventDefault();
												goToTool(tool.path);
											}}
											onMouseEnter={() => setActiveIndex(index)}
											style={{
												padding: "10px 14px",
												borderRadius: "10px",
												cursor: "pointer",
												background: active ? "var(--primary)" : "transparent",
												color: active ? "#ffffff" : "var(--text-primary)",
											}}
										>
											<span
												style={{
													display: "block",
													fontSize: "15px",
													fontWeight: 600,
												}}
											>
												{tool.name}
											</span>
											<span
												style={{
													display: "block",
													fontSize: "14px",
													color: active ? "#ffffff" : "var(--text-secondary)",
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
												}}
											>
												{tool.desc}
											</span>
										</div>
									);
								})
							) : (
								<div
									role="status"
									style={{
										padding: "10px 14px",
										fontSize: "14px",
										color: "var(--text-secondary)",
									}}
								>
									{t("noSuggestions")}
								</div>
							)}
						</div>
					)}
					<span
						className="hand-note"
						style={{
							position: "absolute",
							right: "8px",
							top: "calc(100% + 6px)",
							transform: "rotate(-2deg)",
							whiteSpace: "nowrap",
						}}
					>
						{t("searchNote")}
					</span>
				</div>
				<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
					<button
						onClick={() => setViewMode("list")}
						style={{
							padding: "12px",
							background:
								viewMode === "list" ? "var(--primary)" : "transparent",
							color: viewMode === "list" ? "white" : "var(--text-secondary)",
							border: "1px solid var(--border-color)",
							borderRadius: "12px",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "60px",
							transition:
								"background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
						}}
						aria-label="List View"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="8" y1="6" x2="21" y2="6"></line>
							<line x1="8" y1="12" x2="21" y2="12"></line>
							<line x1="8" y1="18" x2="21" y2="18"></line>
							<line x1="3" y1="6" x2="3.01" y2="6"></line>
							<line x1="3" y1="12" x2="3.01" y2="12"></line>
							<line x1="3" y1="18" x2="3.01" y2="18"></line>
						</svg>
					</button>
					<button
						onClick={() => setViewMode("grid")}
						style={{
							padding: "12px",
							background:
								viewMode === "grid" ? "var(--primary)" : "transparent",
							color: viewMode === "grid" ? "white" : "var(--text-secondary)",
							border: "1px solid var(--border-color)",
							borderRadius: "12px",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "60px",
							transition:
								"background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
						}}
						aria-label="Grid View"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="3" y="3" width="7" height="7"></rect>
							<rect x="14" y="3" width="7" height="7"></rect>
							<rect x="14" y="14" width="7" height="7"></rect>
							<rect x="3" y="14" width="7" height="7"></rect>
						</svg>
					</button>
				</div>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
				{filteredCategories.length > 0 ? (
					pageCategories.map((section) => (
						<div key={section.category}>
							<h2
								style={{
									fontSize: "20px",
									marginBottom: "20px",
									paddingBottom: "8px",
									borderBottom: "1px solid var(--border-color)",
								}}
							>
								{section.category}
							</h2>
							<div
								style={{
									display: viewMode === "grid" ? "grid" : "flex",
									gridTemplateColumns:
										viewMode === "grid"
											? "repeat(auto-fill, minmax(280px, 1fr))"
											: undefined,
									flexDirection: viewMode === "list" ? "column" : undefined,
									gap: "16px",
								}}
							>
								{section.items.map((tool) => (
									<Link
										href={tool.path}
										key={tool.name}
										style={{ textDecoration: "none" }}
									>
										<div className="card tool-card" style={{ height: "100%" }}>
											{viewMode === "grid" && (
												<div
													style={{
														marginBottom: "10px",
														display: "flex",
														justifyContent: "center",
													}}
												>
													{doodles[tool.path] ? (
														<ToolIllustration name={tool.path} width={104} />
													) : (
														<ToolIcon path={tool.path} />
													)}
												</div>
											)}
											<h3
												style={{
													fontSize: "16px",
													color: "var(--primary)",
													marginBottom: "8px",
													display: "flex",
													alignItems: "center",
													gap: "8px",
												}}
											>
												{viewMode === "list" && <ToolIcon path={tool.path} />}
												{tool.name}
											</h3>
											<p
												style={{
													fontSize: "14px",
													color: "var(--text-secondary)",
													margin: 0,
												}}
											>
												{tool.desc}
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					))
				) : (
					<div
						style={{
							textAlign: "center",
							padding: "40px",
							color: "var(--text-secondary)",
						}}
					>
						<p style={{ fontSize: "18px" }}>
							No tools found matching "{debouncedQuery}"
						</p>
						<button
							onClick={() => setQuery("")}
							className="btn-secondary"
							style={{ marginTop: "16px" }}
						>
							Clear Search
						</button>
					</div>
				)}
			</div>

			{filteredCategories.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setPage}
					prevLabel={t("paginationPrev")}
					nextLabel={t("paginationNext")}
					ariaLabel={t("paginationLabel")}
				/>
			)}
		</div>
	);
}
