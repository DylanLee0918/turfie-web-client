import type { FeatureColors } from "@themes/types";

const features: FeatureColors = {
    body: {
        normal: {
            bg: "bg-portfolio-bg",
            text: "text-white",
        },
    },
    card: {
        normal: {
            bg: "bg-portfolio-card/80",
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
    badge: {
        normal: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            text: "text-blue-300",
        },
    },
};

export default features;
