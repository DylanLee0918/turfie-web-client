import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type Tone = "default" | "info" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
    default: "bg-white/5 text-slate-300 border-white/10",
    info: "bg-blue-500/10 text-blue-300 border-blue-500/25",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    danger: "bg-red-500/10 text-red-300 border-red-500/25",
};

export function Badge({
    children,
    tone = "default",
    className,
}: {
    children: ReactNode;
    tone?: Tone;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                tones[tone],
                className,
            )}
        >
            {children}
        </span>
    );
}
