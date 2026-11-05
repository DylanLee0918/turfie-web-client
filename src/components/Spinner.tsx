import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

export function Spinner({ className }: { className?: string }) {
    return (
        <Loader2
            className={cn("size-5 animate-spin text-portfolio-icon", className)}
        />
    );
}

export function FullPageSpinner({ label = "Loading" }: { label?: string }) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-sm text-portfolio-sub-text">
            <Spinner className="size-7" />
            <span>{label}…</span>
        </div>
    );
}
