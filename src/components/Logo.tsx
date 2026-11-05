import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { cn } from "@utils/cn";

export function Logo({ className }: { className?: string }) {
    const theme = useTheme();

    return (
        <Link
            to="/"
            className={cn(
                "inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight",
                theme.navigation.logo.normal.text,
                className,
            )}
        >
            <span className="flex size-9 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-portfolio-icon">
                <Gamepad2 className="size-5" />
            </span>
            <span>
                Turf<span className="text-portfolio-text">ie</span>
            </span>
        </Link>
    );
}
