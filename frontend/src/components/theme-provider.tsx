"use client";

import { createContext, useContext, useEffect, useState } from "react";

//object theme - can be light or dark
type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
     const [theme, setTheme] = useState<Theme>(() => {
        return "dark";
    });

    //loads theme from localStorage on prefered system theme
    useEffect(() => {
        const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
        if (stored === "light" || stored === "dark") {
        setTheme(stored);

        document.documentElement.classList.toggle("dark", stored === "dark");
        return;
        }

        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", prefersDark);
    }, []);

    //loads theme when the useState changes
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        try {
        localStorage.setItem("theme", theme);
        } catch {

        }
    }, [theme]);

    //changes useState
    function toggleTheme() {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}