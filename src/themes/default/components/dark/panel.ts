import type { PanelColors } from "@themes/types";

const panel: PanelColors = {
    body: {
        normal: {
            bg: "bg-portfolio-card",
            border: "border-portfolio-border",
        },
    },
    card: {
        normal: {
            bg: "bg-black/20",
            border: "border-white/5",
        },
    },
    title: {
        normal: {
            text: "text-white",
        },
    },
    paragraph: {
        normal: {
            text: "text-slate-400",
        },
    },
    pill: {
        normal: {
            bg: "bg-white/5",
            text: "text-slate-400",
        },
    },
    pillSuccess: {
        normal: {
            bg: "bg-emerald-500/10",
            text: "text-emerald-300",
        },
    },
};

export default panel;
