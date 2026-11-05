import type { FunctionComponent } from "react";
import { useThemeContext } from "@context/ThemeContext";
import { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ButtonTheme: FunctionComponent = () => {
    const theme = useTheme();
    const { isDarkMode, toggleDarkMode } = useThemeContext();

    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleDarkMode()}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`rounded-full p-2 transition-colors ${theme.navigation.switch.normal.text} ${theme.navigation.switch.hover?.text} ${theme.navigation.switch.hover?.bg}`}
        >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
    );
};

export default ButtonTheme;
