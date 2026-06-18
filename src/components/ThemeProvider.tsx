"use client";

import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
	theme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextValue>({
	theme: "system",
	setTheme: () => {},
});

function getSystemTheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(theme: Theme) {
	const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

	document.documentElement.setAttribute("data-theme", resolvedTheme);
	document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		const initialTheme =
			savedTheme === "light" || savedTheme === "dark" || savedTheme === "system"
				? savedTheme
				: "system";

		setThemeState(initialTheme);
		applyTheme(initialTheme);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemThemeChange = () => {
			if (theme === "system") {
				applyTheme("system");
			}
		};

		mediaQuery.addEventListener("change", handleSystemThemeChange);
		return () => {
			mediaQuery.removeEventListener("change", handleSystemThemeChange);
		};
	}, [theme]);

	const setTheme = useCallback<Dispatch<SetStateAction<Theme>>>(
		(nextTheme) => {
			setThemeState((currentTheme) => {
				const resolvedNextTheme =
					typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme;

				localStorage.setItem("theme", resolvedNextTheme);
				applyTheme(resolvedNextTheme);

				return resolvedNextTheme;
			});
		},
		[],
	);

	const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
