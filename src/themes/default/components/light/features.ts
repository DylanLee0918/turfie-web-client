import type { FeatureColors } from "@themes/types";

const features: FeatureColors = {
    body: {
        normal: {
            bg: "bg-slate-50",
            text: "text-slate-900",
        },
    },
    card: {
        normal: {
            bg: "bg-white",
            border: "border-slate-200",
        },
        hover: {
            bg: "hover:bg-white",
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
    badge: {
        normal: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
        },
    },
};

export default features;
