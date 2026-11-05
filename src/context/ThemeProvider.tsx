import { ThemeContext } from "./ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useThemeMode } from "@hooks/useThemeMode";
import { themes } from "@themes/index";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { mode, toggleDarkMode } = useThemeMode();

    return (
        <ThemeContext.Provider
            value={{
                isDarkMode: mode === "dark",
                toggleDarkMode,
            }}
        >
            <StyledThemeProvider
                theme={mode === "dark" ? themes.dark : themes.light}
            >
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
