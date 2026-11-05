import {
    ArrowLeft,
    AtSign,
    CreditCard,
    LayoutDashboard,
    ShieldCheck,
    Swords,
    Users,
} from "lucide-react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { GuildIcon } from "../components/GuildIcon";
import { FullPageSpinner } from "../components/Spinner";
import { useGuild } from "../hooks/useGuilds";
import { cn } from "../utils/cn";

const navigation = [
    {
        label: "Overview",
        to: "",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: "Game Panel",
        to: "panel",
        icon: ShieldCheck,
    },
    {
        label: "Lobby Nights",
        to: "lobby",
        icon: Swords,
        soon: true,
    },
    {
        label: "Members",
        to: "members",
        icon: Users,
        soon: true,
    },
    {
        label: "Nicknames",
        to: "nicknames",
        icon: AtSign,
        soon: true,
    },
    {
        label: "Billing",
        to: "billing",
        icon: CreditCard,
        soon: true,
    },
];

export function GuildLayout() {
    const { guildId } = useParams();
    const guildQuery = useGuild(guildId);

    if (guildQuery.isLoading) {
        return <FullPageSpinner label="Loading server" />;
    }

    if (guildQuery.isError || !guildQuery.data) {
        return (
            <div className="space-y-4">
                <Alert tone="error">
                    {guildQuery.error instanceof Error
                        ? guildQuery.error.message
                        : "That server is not available."}
                </Alert>
                <NavLink
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-portfolio-icon hover:text-blue-300"
                >
                    <ArrowLeft className="size-4" />
                    Back to servers
                </NavLink>
            </div>
        );
    }

    const guild = guildQuery.data;
    const base = `/dashboard/${guild.id}`;

    return (
        <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="lg:w-64 lg:shrink-0">
                <div className="rounded-2xl border border-portfolio-border bg-portfolio-card/70 p-4">
                    <div className="flex items-center gap-3">
                        <GuildIcon
                            id={guild.id}
                            name={guild.name}
                            icon={guild.icon}
                            size="md"
                        />
                        <div className="min-w-0">
                            <p className="truncate font-display text-base font-semibold text-white">
                                {guild.name}
                            </p>
                            <Badge tone="info" className="mt-1">
                                Free plan
                            </Badge>
                        </div>
                    </div>

                    <nav className="mt-5 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            if (item.soon) {
                                return (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500"
                                    >
                                        <Icon className="size-4" />
                                        <span className="flex-1">
                                            {item.label}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                                            Soon
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.to ? `${base}/${item.to}` : base}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                                            isActive
                                                ? "bg-blue-500/10 text-blue-200 ring-1 ring-inset ring-blue-500/20"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white",
                                        )
                                    }
                                >
                                    <Icon className="size-4" />
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="mt-5 border-t border-portfolio-border pt-4">
                        <NavLink
                            to="/dashboard"
                            className="flex items-center gap-2 text-xs text-portfolio-sub-text transition hover:text-white"
                        >
                            <ArrowLeft className="size-3.5" />
                            All servers
                        </NavLink>
                    </div>
                </div>
            </aside>

            <section className="min-w-0 flex-1">
                <Outlet />
            </section>
        </div>
    );
}
