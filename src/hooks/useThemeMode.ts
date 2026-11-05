import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

type Mode = "light" | "dark";

const VALID_MODES: Mode[] = ["light", "dark"];

const getInitialMode = (): Mode => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme") as Mode | null;
    if (stored && VALID_MODES.includes(stored)) return stored;
    return "dark";
};

export const useThemeMode = () => {
    const [mode, setMode] = useLocalStorage<Mode>("theme", getInitialMode());

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle("dark", mode === "dark");
    }, [mode]);

    const toggleDarkMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { mode, toggleDarkMode };
};
