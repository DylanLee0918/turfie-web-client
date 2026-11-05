import type { DashboardColors } from "@themes/types";

const dashboard: DashboardColors = {
    body: {
        normal: {
            bg: "bg-slate-50",
            text: "text-slate-900",
        },
    },
    sidebar: {
        normal: {
            bg: "bg-white",
            border: "border-slate-200",
        },
    },
    card: {
        normal: {
            bg: "bg-white",
            border: "border-slate-200",
        },
        hover: {
            bg: "hover:bg-slate-50",
            border: "hover:border-blue-300",
        },
    },
    title: {
        normal: {
            text: "text-slate-900",
        },
    },
    paragraph: {
        normal: {
            text: "text-slate-600",
        },
    },
    nav: {
        normal: {
            text: "text-slate-600",
        },
        hover: {
            text: "hover:text-slate-900",
            bg: "hover:bg-slate-100",
        },
    },
    navActive: {
        normal: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
        },
    },
};

export default dashboard;
