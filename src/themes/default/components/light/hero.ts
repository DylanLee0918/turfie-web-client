import type { HeroColors } from "@themes/types";

const hero: HeroColors = {
    body: {
        normal: {
            bg: "bg-slate-50",
            text: "text-slate-900",
        },
    },
    container: {
        normal: {
            text: "text-blue-600",
            border: "border-blue-200",
            primarybg: "bg-blue-600",
            secondarybg: "bg-blue-50",
        },
    },
    links: {
        normal: {
            text: "text-slate-600",
        },
        hover: {
            text: "hover:text-slate-900",
            bg: "hover:bg-slate-100",
        },
    },
    paragraph: {
        normal: {
            text: "text-slate-600",
        },
    },
    badge: {
        normal: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
        },
    },
    category: {
        normal: {
            text: "text-slate-500",
        },
    },
};

export default hero;
