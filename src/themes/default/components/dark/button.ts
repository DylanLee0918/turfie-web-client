import type { ButtonColors } from "@themes/types";

const button: ButtonColors = {
    filled: {
        normal: {
            bg: "bg-blue-500",
            text: "text-white",
            border: "border-blue-500",
        },
        hover: {
            bg: "hover:bg-blue-400",
            text: "hover:text-white",
            border: "hover:border-blue-400",
        },
    },
    outlined: {
        normal: {
            bg: "bg-white/[0.03]",
            border: "border-white/10",
            text: "text-slate-200",
        },
        hover: {
            bg: "hover:bg-white/[0.06]",
            text: "hover:text-white",
            border: "hover:border-white/20",
        },
    },
};

export default button;
