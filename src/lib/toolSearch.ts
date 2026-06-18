/**
 * Tiny, self-contained fuzzy ranker for the tool search.
 *
 * No dependencies — a heavy fuzzy lib (Fuse.js et al.) isn't worth the bundle
 * cost for ~60 tools. This matches against name + description + tags using a
 * token-based scheme with a small edit-distance tolerance, and ranks
 * exact/prefix/name hits above tag and fuzzy hits so result quality stays high.
 */

export interface SearchableTool {
	name: string;
	desc: string;
	path: string;
	tags?: readonly string[];
	/** Optional editorial weight used only as a tie-breaker. */
	priority?: number;
}

export interface RankedTool<T extends SearchableTool> {
	tool: T;
	score: number;
}

/** Lowercase + strip diacritics so "ñ"/accents don't block a match. */
function normalize(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "");
}

/** Levenshtein distance with an early cutoff once `max` is exceeded. */
function editDistance(a: string, b: string, max: number): number {
	const al = a.length;
	const bl = b.length;
	if (Math.abs(al - bl) > max) return max + 1;
	let prev = new Array<number>(bl + 1);
	for (let j = 0; j <= bl; j++) prev[j] = j;
	for (let i = 1; i <= al; i++) {
		const cur = new Array<number>(bl + 1);
		cur[0] = i;
		let rowMin = i;
		for (let j = 1; j <= bl; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
			if (cur[j] < rowMin) rowMin = cur[j];
		}
		if (rowMin > max) return max + 1;
		prev = cur;
	}
	return prev[bl];
}

/** Typo tolerance scales with token length so short tokens stay strict. */
function toleranceFor(token: string): number {
	if (token.length >= 6) return 2;
	if (token.length >= 4) return 1;
	return 0;
}

/**
 * Best score for a single query token against one normalized field.
 * Higher tiers (exact word, prefix, substring) beat fuzzy matches.
 */
function tokenFieldScore(token: string, field: string, weight: number): number {
	if (!field) return 0;
	if (field === token) return weight * 10;

	const words = field.split(/[^a-z0-9]+/).filter(Boolean);
	let best = 0;

	if (field.includes(token)) {
		best = weight * 4; // plain substring match
		for (const word of words) {
			if (word === token) best = Math.max(best, weight * 8);
			else if (word.startsWith(token)) best = Math.max(best, weight * 6);
		}
		return best;
	}

	const tol = toleranceFor(token);
	if (tol > 0) {
		for (const word of words) {
			if (Math.abs(word.length - token.length) > tol) continue;
			const dist = editDistance(word, token, tol);
			if (dist <= tol) best = Math.max(best, weight * (3 - dist));
		}
	}
	return best;
}

// Field weights: a hit in the name matters most, then tags, then description.
const NAME_WEIGHT = 3;
const TAG_WEIGHT = 2;
const DESC_WEIGHT = 1;

function scoreTool(
	tokens: string[],
	fullQuery: string,
	tool: SearchableTool,
): number | null {
	const nameN = normalize(tool.name);
	const descN = normalize(tool.desc);
	const tagsN = (tool.tags ?? []).map(normalize);

	let total = 0;
	for (const token of tokens) {
		let best = Math.max(
			tokenFieldScore(token, nameN, NAME_WEIGHT),
			tokenFieldScore(token, descN, DESC_WEIGHT),
		);
		for (const tag of tagsN) {
			best = Math.max(best, tokenFieldScore(token, tag, TAG_WEIGHT));
		}
		// Every query token must find a home, otherwise it's not a real match.
		if (best === 0) return null;
		total += best;
	}

	// Whole-query boosts keep clean name matches at the very top.
	if (nameN.startsWith(fullQuery)) total += 50;
	else if (nameN.includes(fullQuery)) total += 20;

	return total;
}

/**
 * Rank tools by relevance to `query`. Returns only matches, best-first.
 * An empty query returns an empty array (callers decide how to show "all").
 */
export function rankTools<T extends SearchableTool>(
	query: string,
	tools: readonly T[],
): RankedTool<T>[] {
	const fullQuery = normalize(query.trim());
	if (!fullQuery) return [];
	const tokens = fullQuery.split(/\s+/).filter(Boolean);

	const ranked: RankedTool<T>[] = [];
	for (const tool of tools) {
		const score = scoreTool(tokens, fullQuery, tool);
		if (score !== null) ranked.push({ tool, score });
	}

	ranked.sort(
		(a, b) =>
			b.score - a.score || (b.tool.priority ?? 0) - (a.tool.priority ?? 0),
	);
	return ranked;
}
