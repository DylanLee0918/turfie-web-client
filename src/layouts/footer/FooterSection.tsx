import type { FunctionComponent } from "react";
import { useTheme } from "styled-components";
import { Logo } from "@components/Logo";
import { FOOTER_COLUMNS } from "./constants";

const CURRENT_YEAR = new Date().getFullYear();

const FooterSection: FunctionComponent = () => {
    const theme = useTheme();
    const border =
        theme.mode === "dark" ? "border-white/5" : "border-slate-200";

    return (
        <footer
            className={`border-t ${border} ${theme.footer.body.normal.bg} ${theme.footer.body.normal.text}`}
        >
            <div className="mx-auto w-full max-w-6xl px-5 py-14">
                <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
                    <div>
                        <Logo />
                        <p
                            className={`mt-4 max-w-xs text-sm leading-relaxed ${theme.footer.paragraph.normal.text}`}
                        >
                            Game access panels, whitelist approvals, lobby
                            nights, and member profiles — configured from one
                            clean dashboard.
                        </p>
                    </div>

                    {FOOTER_COLUMNS.map((column) => (
                        <div key={column.title}>
                            <p className={`text-sm font-semibold ${theme.footer.title.normal.text}`}>
                                {column.title}
                            </p>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className={`text-sm transition-colors ${theme.footer.nav.normal.text} ${theme.footer.nav.hover?.text}`}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center ${border} ${theme.footer.copyright.normal.text}`}
                >
                    <p>
                        © {CURRENT_YEAR} Turfie. Not affiliated with Discord
                        Inc.
                    </p>
                    <p className="inline-flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        All systems operational
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
