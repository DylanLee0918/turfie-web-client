import { cn } from "../utils/cn";

interface GuildIconProps {
    id: string;
    name: string;
    icon: string | null;
    size?: "sm" | "md" | "lg";
}

const sizes = {
    sm: "size-9 text-sm",
    md: "size-12 text-base",
    lg: "size-16 text-xl",
};

export function GuildIcon({ id, name, icon, size = "md" }: GuildIconProps) {
    const initials = name
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    if (icon) {
        return (
            <img
                src={`https://cdn.discordapp.com/icons/${id}/${icon}.png?size=128`}
                alt={name}
                className={cn("shrink-0 rounded-2xl object-cover", sizes[size])}
            />
        );
    }

    return (
        <div
            className={cn(
                "flex shrink-0 items-center justify-center rounded-2xl border border-portfolio-border bg-portfolio-icon-container font-display font-semibold text-portfolio-icon",
                sizes[size],
            )}
        >
            {initials}
        </div>
    );
}
