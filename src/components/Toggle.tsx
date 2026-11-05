import { cn } from "../utils/cn";

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
    disabled?: boolean;
}

export function Toggle({
    checked,
    onChange,
    label,
    description,
    disabled = false,
}: ToggleProps) {
    return (
        <div className="flex items-start justify-between gap-4 py-3">
            <div>
                <p className="text-sm font-medium text-slate-100">{label}</p>
                {description ? (
                    <p className="mt-1 text-xs text-portfolio-sub-text">
                        {description}
                    </p>
                ) : null}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={label}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={cn(
                    "relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-icon focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-card disabled:cursor-not-allowed disabled:opacity-50",
                    checked
                        ? "border-portfolio-icon bg-portfolio-icon"
                        : "border-portfolio-border bg-[#1b2438]",
                )}
            >
                <span
                    className={cn(
                        "size-[18px] rounded-full bg-white shadow-sm transition-transform duration-200",
                        checked ? "translate-x-5" : "translate-x-0",
                    )}
                />
            </button>
        </div>
    );
}
