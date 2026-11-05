import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
    type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@utils/cn";

export interface SelectOption {
    value: string;
    label: string;
    group?: string;
}

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    hint?: ReactNode;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}

export function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    hint,
    error,
    disabled = false,
    placeholder = "Not set",
}: SelectFieldProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlighted, setHighlighted] = useState(0);
    const [dropUp, setDropUp] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const selectableRef = useRef<SelectOption[]>([]);
    const valueRef = useRef(value);

    const selected =
        options.find((option) => option.value === value) ??
        (value ? { value, label: `Unknown (${value})` } : null);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return options;

        return options.filter((option) =>
            option.label.toLowerCase().includes(query),
        );
    }, [options, search]);

    const selectable = useMemo(() => {
        const list: SelectOption[] = [];

        if (!search.trim() && !options.some((option) => option.value === "")) {
            list.push({ value: "", label: "Not set" });
        }

        return [...list, ...filtered];
    }, [filtered, options, search]);

    useEffect(() => {
        selectableRef.current = selectable;
    }, [selectable]);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const rows = useMemo(() => {
        const result: Array<
            | { type: "group"; label: string }
            | { type: "option"; option: SelectOption; index: number }
        > = [];
        let lastGroup = "";

        selectable.forEach((option, index) => {
            const group = option.group ?? "";
            if (group && group !== lastGroup) {
                result.push({ type: "group", label: group });
            }
            result.push({ type: "option", option, index });
            lastGroup = group;
        });

        return result;
    }, [selectable]);

    useEffect(() => {
        if (!open) return;

        const selectedIndex = selectableRef.current.findIndex(
            (option) => option.value === valueRef.current,
        );
        setHighlighted(selectedIndex >= 0 ? selectedIndex : 0);

        const timer = window.setTimeout(() => searchRef.current?.focus(), 0);
        return () => window.clearTimeout(timer);
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                setSearch("");
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const openMenu = () => {
        if (disabled) return;

        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            setDropUp(window.innerHeight - rect.bottom < 300);
        }

        setSearch("");
        setOpen(true);
    };

    const closeMenu = () => {
        setOpen(false);
        setSearch("");
    };

    const choose = (option: SelectOption) => {
        onChange(option.value);
        closeMenu();
        triggerRef.current?.focus();
    };

    const move = (delta: number) => {
        if (!selectable.length) return;
        setHighlighted((current) => {
            const next = current + delta;
            if (next < 0) return selectable.length - 1;
            if (next >= selectable.length) return 0;
            return next;
        });
    };

    const handleSearchKeyDown = (
        event: ReactKeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
        } else if (event.key === "Enter") {
            event.preventDefault();
            const option = selectable[highlighted];
            if (option) choose(option);
        } else if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            triggerRef.current?.focus();
        }
    };

    return (
        <div className="space-y-2">
            <label
                htmlFor={`${name}-trigger`}
                className="block text-sm font-medium text-slate-200"
            >
                {label}
            </label>

            <div ref={wrapperRef} className="relative">
                <button
                    ref={triggerRef}
                    type="button"
                    id={`${name}-trigger`}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-label={label}
                    disabled={disabled}
                    onClick={() => (open ? closeMenu() : openMenu())}
                    className={cn(
                        "flex h-11 w-full items-center justify-between gap-3 rounded-xl border bg-portfolio-bg/70 px-3.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-icon/25 disabled:cursor-not-allowed disabled:opacity-50",
                        error
                            ? "border-red-500/70"
                            : open
                              ? "border-portfolio-icon"
                              : "border-portfolio-border hover:border-[#2a4266]",
                    )}
                >
                    <span
                        className={cn(
                            "truncate",
                            selected ? "text-white" : "text-slate-500",
                        )}
                    >
                        {selected?.label ?? placeholder}
                    </span>
                    <ChevronDown
                        className={cn(
                            "size-4 shrink-0 text-slate-400 transition-transform duration-200",
                            open && "rotate-180",
                        )}
                    />
                </button>

                <AnimatePresence>
                    {open ? (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: dropUp ? 4 : -4,
                                scale: 0.98,
                            }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{
                                opacity: 0,
                                y: dropUp ? 4 : -4,
                                scale: 0.98,
                            }}
                            transition={{ duration: 0.12 }}
                            className={cn(
                                "absolute left-0 right-0 z-50 overflow-hidden rounded-xl border border-portfolio-border bg-portfolio-card shadow-2xl shadow-black/50",
                                dropUp ? "bottom-full mb-2" : "top-full mt-2",
                            )}
                            role="listbox"
                        >
                            <div className="border-b border-white/5 p-2">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
                                    <input
                                        ref={searchRef}
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                            setHighlighted(0);
                                        }}
                                        onKeyDown={handleSearchKeyDown}
                                        placeholder="Search…"
                                        className="h-9 w-full rounded-lg border border-white/5 bg-white/[0.03] pl-8 pr-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-portfolio-icon/40"
                                    />
                                </div>
                            </div>

                            <div className="max-h-64 overflow-y-auto p-1.5">
                                {rows.length ? (
                                    rows.map((row) => {
                                        if (row.type === "group") {
                                            return (
                                                <div
                                                    key={`group-${row.label}`}
                                                    className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                                                >
                                                    {row.label}
                                                </div>
                                            );
                                        }

                                        const isSelected =
                                            row.option.value === value;
                                        const isHighlighted =
                                            row.index === highlighted;

                                        return (
                                            <button
                                                key={`${row.option.value}-${row.index}`}
                                                type="button"
                                                role="option"
                                                aria-selected={isSelected}
                                                onMouseEnter={() =>
                                                    setHighlighted(row.index)
                                                }
                                                onClick={() =>
                                                    choose(row.option)
                                                }
                                                className={cn(
                                                    "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                                                    isHighlighted
                                                        ? "bg-white/[0.06] text-white"
                                                        : "text-slate-300",
                                                    isSelected &&
                                                        "text-blue-300",
                                                )}
                                            >
                                                <span className="truncate">
                                                    {row.option.label}
                                                </span>
                                                {isSelected ? (
                                                    <Check className="size-4 shrink-0 text-blue-400" />
                                                ) : null}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <p className="px-3 py-6 text-center text-xs text-slate-500">
                                        No options found.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {error ? (
                <p className="text-xs text-red-400">{error}</p>
            ) : hint ? (
                <p className="text-xs text-portfolio-sub-text">{hint}</p>
            ) : null}
        </div>
    );
}
