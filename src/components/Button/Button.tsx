import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useTheme } from "styled-components";
import { cn } from "@utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: ReactNode;
}

const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
};

export function Button({
    className,
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const theme = useTheme();

    const filled = theme.button.filled;
    const outlined = theme.button.outlined;

    const variants: Record<Variant, string> = {
        primary: cn(
            "border shadow-[0_8px_30px_-12px_rgba(59,143,255,0.8)]",
            filled.normal.bg,
            filled.normal.text,
            filled.normal.border,
            filled.hover?.bg,
            filled.hover?.text,
            filled.hover?.border,
        ),
        secondary: cn(
            "border",
            outlined.normal.bg,
            outlined.normal.text,
            outlined.normal.border,
            outlined.hover?.bg,
            outlined.hover?.text,
            outlined.hover?.border,
        ),
        ghost: "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
        danger: "bg-red-500/90 text-white hover:bg-red-500",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-icon focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg disabled:cursor-not-allowed disabled:opacity-50",
                variants[variant],
                sizes[size],
                className,
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
                leftIcon
            )}
            {children}
        </button>
    );
}
