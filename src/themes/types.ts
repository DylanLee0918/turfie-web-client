interface Properties {
    bg?: string;
    border?: string;
    text?: string;
    primarybg?: string;
    secondarybg?: string;
}

type States = {
    normal: Properties;
} & Partial<
    Record<
        "hover" | "active" | "disabled" | "error" | "success" | "info" | "warning" | "pill",
        Properties
    >
>;

export type ButtonColors = Record<"filled" | "outlined", States>;
export type NavigationColors = Record<
    "logo" | "nav" | "menu" | "switch",
    States
>;
export type HeroColors = Record<
    "body" | "container" | "links" | "paragraph" | "badge" | "category",
    States
>;
export type FeatureColors = Record<
    "body" | "card" | "title" | "paragraph" | "badge",
    States
>;
export type PricingColors = FeatureColors;
export type DashboardColors = Record<
    "body" | "sidebar" | "card" | "title" | "paragraph" | "nav" | "navActive",
    States
>;
export type PanelColors = Record<
    "body" | "card" | "title" | "paragraph" | "pill" | "pillSuccess",
    States
>;
export type FooterColors = Record<
    "body" | "title" | "paragraph" | "nav" | "copyright",
    States
>;

interface Theme {
    mode: "light" | "dark";
    navigation: NavigationColors;
    button: ButtonColors;
    hero: HeroColors;
    features: FeatureColors;
    pricing: PricingColors;
    dashboard: DashboardColors;
    panel: PanelColors;
    footer: FooterColors;
}

export type AppTheme = Record<"light" | "dark", Theme>;

export default Theme;

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Theme {}
}
