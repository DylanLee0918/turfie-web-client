import type { ButtonColors } from "@themes/types";

const button: ButtonColors = {
    filled: {
        normal: {
            bg: "bg-blue-600",
            text: "text-white",
            border: "border-blue-600",
        },
        hover: {
            bg: "hover:bg-blue-500",
            text: "hover:text-white",
            border: "hover:border-blue-500",
        },
    },
    outlined: {
        normal: {
            bg: "bg-white",
            border: "border-slate-200",
            text: "text-slate-700",
        },
        hover: {
            bg: "hover:bg-slate-50",
            text: "hover:text-slate-900",
            border: "hover:border-slate-300",
        },
    },
};

export default button;
