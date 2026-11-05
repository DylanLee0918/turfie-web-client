import type { DashboardColors } from "@themes/types";

const dashboard: DashboardColors = {
    body: {
        normal: {
            bg: "bg-portfolio-bg",
            text: "text-white",
        },
    },
    sidebar: {
        normal: {
            bg: "bg-portfolio-card/70",
            border: "border-portfolio-border",
        },
    },
    card: {
        normal: {
            bg: "bg-portfolio-card/70",
            border: "border-portfolio-border",
        },
        hover: {
            bg: "hover:bg-portfolio-card",
            border: "hover:border-blue-500/30",
        },
    },
    title: {
        normal: {
            text: "text-white",
        },
    },
    paragraph: {
        normal: {
            text: "text-portfolio-sub-text",
        },
    },
    nav: {
        normal: {
            text: "text-slate-400",
        },
        hover: {
            text: "hover:text-white",
            bg: "hover:bg-white/5",
        },
    },
    navActive: {
        normal: {
            bg: "bg-blue-500/10",
            text: "text-blue-200",
            border: "border-blue-500/20",
        },
    },
};

export default dashboard;
