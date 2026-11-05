import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type Tone = "info" | "success" | "error";

const toneStyles: Record<Tone, string> = {
    info: "border-blue-500/25 bg-blue-500/10 text-blue-200",
    success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
    error: "border-red-500/25 bg-red-500/10 text-red-200",
};

const icons = {
    info: Info,
    success: CheckCircle2,
    error: AlertCircle,
};

export function Alert({
    tone = "info",
    children,
    className,
}: {
    tone?: Tone;
    children: ReactNode;
    className?: string;
}) {
    const Icon = icons[tone];

    return (
        <div
            className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
                toneStyles[tone],
                className,
            )}
        >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div>{children}</div>
        </div>
    );
}
