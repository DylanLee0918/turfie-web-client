import type { NavigationColors } from "@themes/types";

const navigation: NavigationColors = {
    logo: {
        normal: {
            text: "text-white",
        },
    },
    nav: {
        normal: {
            bg: "bg-portfolio-bg",
            border: "border-white/5",
        },
    },
    menu: {
        normal: {
            text: "text-slate-400",
            bg: "bg-portfolio-card",
            border: "border-portfolio-border",
        },
        hover: {
            text: "hover:text-white",
            bg: "hover:bg-white/5",
        },
    },
    switch: {
        normal: {
            text: "text-slate-400",
        },
        hover: {
            text: "hover:text-white",
            bg: "hover:bg-white/5",
        },
    },
};

export default navigation;
