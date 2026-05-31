import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function useCalculatorState<T>(
	initialValues: T,
	parsers: { [K in keyof T]: (val: string) => T[K] },
) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Initialize state from URL or fallback to initialValues
	const [state, setState] = useState<T>(() => {
		const initialState = { ...initialValues };
		for (const key in parsers) {
			const queryVal = searchParams.get(key);
			if (queryVal !== null) {
				try {
					initialState[key] = parsers[key](queryVal);
				} catch (e) {
					console.error(`Failed to parse URL param for ${key}`);
				}
			}
		}
		return initialState;
	});

	// Update URL and State simultaneously
	const updateState = useCallback(
		(updates: Partial<T>) => {
			setState((prev) => ({ ...prev, ...updates }));

			const newSearchParams = new URLSearchParams(searchParams.toString());
			for (const [key, value] of Object.entries(updates)) {
				if (value !== undefined && value !== null && value !== "") {
					newSearchParams.set(key, String(value));
				} else {
					newSearchParams.delete(key);
				}
			}
			router.replace(`${pathname}?${newSearchParams.toString()}`, {
				scroll: false,
			});
		},
		[pathname, router, searchParams],
	);

	return [state, updateState] as const;
}
