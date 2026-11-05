import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import type { SelectOption } from "./SelectField";

interface MultiSelectFieldProps {
    label: string;
    values: string[];
    options: SelectOption[];
    onChange: (values: string[]) => void;
    hint?: ReactNode;
    emptyText?: string;
}

export function MultiSelectField({
    label,
    values,
    options,
    onChange,
    hint,
    emptyText = "No options available.",
}: MultiSelectFieldProps) {
    const allOptions = [
        ...options,
        ...values
            .filter(
                (value) =>
                    !options.some((option) => option.value === value),
            )
            .map((value) => ({
                value,
                label: `Unknown (${value})`,
            })),
    ];

    const toggle = (value: string) => {
        if (values.includes(value)) {
            onChange(values.filter((item) => item !== value));
        } else {
            onChange([...values, value]);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
                <label className="block text-sm font-medium text-slate-200">
                    {label}
                </label>
                {values.length ? (
                    <button
                        type="button"
                        onClick={() => onChange([])}
                        className="text-xs text-slate-500 transition hover:text-white"
                    >
                        Clear ({values.length})
                    </button>
                ) : null}
            </div>

            <div className="max-h-48 overflow-y-auto rounded-xl border border-portfolio-border bg-portfolio-bg/70">
                {allOptions.length ? (
                    <div className="divide-y divide-white/5">
                        {allOptions.map((option) => {
                            const checked = values.includes(option.value);

                            return (
                                <label
                                    key={option.value}
                                    className={cn(
                                        "flex cursor-pointer items-center gap-3 px-3.5 py-2.5 text-sm transition",
                                        checked
                                            ? "bg-blue-500/10 text-white"
                                            : "text-slate-300 hover:bg-white/[0.03]",
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggle(option.value)}
                                        className="size-4 rounded border-white/20 bg-transparent accent-blue-500"
                                    />
                                    <span className="truncate">
                                        {option.label}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                ) : (
                    <p className="px-3.5 py-3 text-xs text-slate-500">
                        {emptyText}
                    </p>
                )}
            </div>

            {hint ? (
                <p className="text-xs text-portfolio-sub-text">{hint}</p>
            ) : null}
        </div>
    );
}
