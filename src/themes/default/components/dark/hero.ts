import type { HeroColors } from "@themes/types";

const hero: HeroColors = {
    body: {
        normal: {
            bg: "bg-portfolio-bg",
            text: "text-white",
        },
    },
    container: {
        normal: {
            text: "text-portfolio-text",
            border: "border-blue-500/20",
            primarybg: "bg-blue-500",
            secondarybg: "bg-blue-500/10",
        },
    },
    links: {
        normal: {
            text: "text-slate-400",
        },
        hover: {
            text: "hover:text-white",
            bg: "hover:bg-white/5",
        },
    },
    paragraph: {
        normal: {
            text: "text-portfolio-sub-text",
        },
    },
    badge: {
        normal: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            text: "text-blue-300",
        },
    },
    category: {
        normal: {
            text: "text-slate-500",
        },
    },
};

export default hero;
