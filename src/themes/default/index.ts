import type Theme from "../types";
import { lightComponents } from "./components/light";
import { darkComponents } from "./components/dark";

export const lightTheme: Theme = {
    mode: "light",
    navigation: lightComponents.navigation,
    button: lightComponents.button,
    hero: lightComponents.hero,
    features: lightComponents.features,
    pricing: lightComponents.pricing,
    dashboard: lightComponents.dashboard,
    panel: lightComponents.panel,
    footer: lightComponents.footer,
};

export const darkTheme: Theme = {
    mode: "dark",
    navigation: darkComponents.navigation,
    button: darkComponents.button,
    hero: darkComponents.hero,
    features: darkComponents.features,
    pricing: darkComponents.pricing,
    dashboard: darkComponents.dashboard,
    panel: darkComponents.panel,
    footer: darkComponents.footer,
};
