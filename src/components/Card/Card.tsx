import type { HTMLAttributes, ReactNode } from "react";
import { useTheme } from "styled-components";
import { cn } from "@utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    const theme = useTheme();

    return (
        <div
            className={cn(
                "rounded-2xl border backdrop-blur-sm",
                theme.features.card.normal.bg,
                theme.features.card.normal.border,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    title,
    description,
    action,
}: {
    title: string;
    description?: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-portfolio-border px-6 py-5">
            <div>
                <h2 className="font-display text-lg font-semibold text-white">
                    {title}
                </h2>
                {description ? (
                    <p className="mt-1 text-sm text-portfolio-sub-text">
                        {description}
                    </p>
                ) : null}
            </div>
            {action}
        </div>
    );
}

export function CardBody({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return <div className={cn("px-6 py-5", className)}>{children}</div>;
}
