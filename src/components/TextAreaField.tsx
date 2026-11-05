import type { ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface TextAreaFieldProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    hint?: ReactNode;
    error?: string;
}

export function TextAreaField({
    label,
    hint,
    error,
    className,
    id,
    ...props
}: TextAreaFieldProps) {
    const inputId = id ?? props.name;

    return (
        <div className="space-y-2">
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-slate-200"
            >
                {label}
            </label>
            <textarea
                id={inputId}
                className={cn(
                    "min-h-28 w-full resize-y rounded-xl border bg-portfolio-bg/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-portfolio-icon focus:ring-2 focus:ring-portfolio-icon/25",
                    error
                        ? "border-red-500/70"
                        : "border-portfolio-border hover:border-[#2a4266]",
                    className,
                )}
                {...props}
            />
            {error ? (
                <p className="text-xs text-red-400">{error}</p>
            ) : hint ? (
                <p className="text-xs text-portfolio-sub-text">{hint}</p>
            ) : null}
        </div>
    );
}
