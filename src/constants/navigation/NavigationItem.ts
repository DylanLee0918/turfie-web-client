interface NavigationItem {
    title: string;
    route: string;
    key: string;
}

export const NAVIGATION_BAR_ITEMS: NavigationItem[] = [
    {
        title: "Features",
        route: "/#features",
        key: "features",
    },
    {
        title: "How it works",
        route: "/#how-it-works",
        key: "how-it-works",
    },
    {
        title: "Pricing",
        route: "/#pricing",
        key: "pricing",
    },
];
