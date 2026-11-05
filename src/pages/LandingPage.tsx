import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
    ArrowDown,
    ArrowRight,
    Check,
    Gamepad2,
    LayoutDashboard,
    Lock,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fetchAuthStatus } from "../api/auth";
import { Badge } from "../components/Badge";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { useAuth } from "../context/auth-context";

const INVITE_PERMISSIONS = "361247501376";

function inviteUrl(clientId: string): string {
    const params = new URLSearchParams({
        client_id: clientId,
        permissions: INVITE_PERMISSIONS,
        scope: "bot applications.commands",
    });

    return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

function GameRow({
    emoji,
    name,
    count,
    whitelisted,
}: {
    emoji: string;
    name: string;
    count: string;
    whitelisted: boolean;
}) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-white/5 text-sm">
                {emoji}
            </span>
            <span className="flex-1 text-sm font-medium text-slate-200">
                {name}
            </span>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                {count}
            </span>
            <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                    whitelisted
                        ? "bg-blue-500/10 text-blue-300"
                        : "bg-emerald-500/10 text-emerald-300"
                }`}
            >
                {whitelisted ? "Whitelisted" : "Open"}
            </span>
        </div>
    );
}

function PanelPreview() {
    return (
        <div className="rounded-2xl border border-portfolio-border bg-portfolio-card/80 p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Live Discord panel preview
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
                # TURF - Gaming Hub
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
                Welcome to the TURF gaming community. Pick a game below to
                join.
            </p>

            <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-3">
                <p className="text-xs font-semibold text-slate-300">
                    📊 Server Status
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        Online 24
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-amber-400" />
                        Idle 8
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-red-400" />
                        DND 3
                    </span>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <GameRow
                    emoji="🎯"
                    name="VALORANT"
                    count="42 Members"
                    whitelisted
                />
                <GameRow
                    emoji="⚔️"
                    name="DOTA 2"
                    count="87 Members"
                    whitelisted={false}
                />
                <GameRow
                    emoji="🛡️"
                    name="AION 2"
                    count="31 Members"
                    whitelisted
                />
            </div>
        </div>
    );
}

function SettingsPreview() {
    return (
        <div className="space-y-3 rounded-2xl border border-portfolio-border bg-portfolio-card/80 p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Game Access</span>
                <span className="h-5 w-9 rounded-full bg-blue-500 px-0.5 py-0.5">
                    <span className="ml-4 block size-4 rounded-full bg-white" />
                </span>
            </div>
            <div className="space-y-2">
                <p className="text-[11px] text-slate-500">Panel title</p>
                <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-300">
                    TURF - Gaming Hub
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-[11px] text-slate-500">Panel description</p>
                <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-400">
                    Welcome to the TURF gaming community…
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-400">
                    # game-access
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-400">
                    @ Daeva
                </div>
            </div>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs text-blue-200">
                Settings saved — the bot refreshes in 30 seconds.
            </div>
        </div>
    );
}

function StatusPreview() {
    return (
        <div className="grid gap-3 rounded-2xl border border-portfolio-border bg-portfolio-card/80 p-5 shadow-2xl shadow-black/40 sm:grid-cols-2">
            {[
                { label: "Online", value: "24", color: "bg-emerald-400" },
                { label: "Idle", value: "8", color: "bg-amber-400" },
                { label: "Do Not Disturb", value: "3", color: "bg-red-400" },
                { label: "Game members", value: "160", color: "bg-blue-400" },
            ].map((item) => (
                <div
                    key={item.label}
                    className="rounded-xl border border-white/5 bg-black/20 p-4"
                >
                    <span
                        className={`inline-block size-2 rounded-full ${item.color}`}
                    />
                    <p className="mt-3 font-display text-2xl font-bold text-white">
                        {item.value}
                    </p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                </div>
            ))}
        </div>
    );
}

const features = [
    {
        eyebrow: "Setup",
        icon: LayoutDashboard,
        title: "Configure everything visually",
        description:
            "Stop editing .env files. Set your panel title, description, channels, roles, and games from a clean browser dashboard.",
        bullets: [
            "Pick channels and roles from Discord",
            "Change settings without restarting",
            "Live panel refresh every 30 seconds",
        ],
        visual: <SettingsPreview />,
    },
    {
        eyebrow: "Game panel",
        icon: Gamepad2,
        title: "One panel for every game",
        description:
            "Add your gaming communities with their own emoji, role, and nickname format. The bot builds the Discord panel from your list.",
        bullets: [
            "Custom game emojis and roles",
            "Per-game member counts",
            "Optional server status section",
        ],
        visual: <PanelPreview />,
    },
    {
        eyebrow: "Access",
        icon: ShieldCheck,
        title: "Whitelist only what you want",
        description:
            "Decide which games require admin or moderator approval. Open games can grant their role immediately.",
        bullets: [
            "Per-game approval toggle",
            "Admin and moderator controls",
            "Clear whitelisted / open tags",
        ],
        visual: (
            <div className="space-y-3 rounded-2xl border border-portfolio-border bg-portfolio-card/80 p-5 shadow-2xl shadow-black/40">
                {[
                    { name: "VALORANT", approval: true, emoji: "🎯" },
                    { name: "DOTA 2", approval: false, emoji: "⚔️" },
                    { name: "AION 2", approval: true, emoji: "🛡️" },
                ].map((game) => (
                    <div
                        key={game.name}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-3"
                    >
                        <span className="text-lg">{game.emoji}</span>
                        <span className="flex-1 text-sm text-slate-200">
                            {game.name}
                        </span>
                        <Lock className="size-3.5 text-slate-500" />
                        <span
                            className={`h-5 w-9 rounded-full px-0.5 py-0.5 ${
                                game.approval ? "bg-blue-500" : "bg-slate-700"
                            }`}
                        >
                            <span
                                className={`block size-4 rounded-full bg-white transition ${
                                    game.approval ? "ml-4" : ""
                                }`}
                            />
                        </span>
                    </div>
                ))}
                <p className="pt-1 text-center text-[11px] text-slate-500">
                    Approval is configured per game.
                </p>
            </div>
        ),
    },
    {
        eyebrow: "Status",
        icon: Users,
        title: "See who's actually around",
        description:
            "The server status section counts members who hold your game roles, broken into online, idle, and do not disturb.",
        bullets: [
            "Only counts game members",
            "Presence-aware counts",
            "Updates live as members change",
        ],
        visual: <StatusPreview />,
    },
];

export function LandingPage() {
    const { user } = useAuth();
    const statusQuery = useQuery({
        queryKey: ["auth-status"],
        queryFn: fetchAuthStatus,
        retry: false,
    });

    const clientId = statusQuery.data?.clientId ?? null;
    const invite = clientId ? inviteUrl(clientId) : null;

    const primaryButton = invite ? (
        <a href={invite} target="_blank" rel="noreferrer">
            <Button size="lg" leftIcon={<Gamepad2 className="size-5" />}>
                Add to Discord
            </Button>
        </a>
    ) : (
        <Link to="/login">
            <Button size="lg" leftIcon={<Gamepad2 className="size-5" />}>
                Add to Discord
            </Button>
        </Link>
    );

    return (
        <div>
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(79,140,255,0.22),transparent_60%)]" />
                <div className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-24 text-center sm:pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <Badge tone="info" className="mb-7">
                            <Sparkles className="size-3.5" />
                            The Discord gaming hub dashboard
                        </Badge>
                        <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-7xl">
                            Build your gaming
                            <span className="block text-portfolio-text">
                                community on Discord.
                            </span>
                        </h1>
                        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-portfolio-sub-text sm:text-lg">
                            Game access panels, whitelist approvals, lobby
                            nights, and member profiles — configured from one
                            clean dashboard. No code, no .env editing.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                            {primaryButton}
                            <Link to={user ? "/dashboard" : "/login"}>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    leftIcon={
                                        <LayoutDashboard className="size-5" />
                                    }
                                >
                                    Open Dashboard
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                                <Check className="size-3.5 text-emerald-400" />
                                Free to start
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Check className="size-3.5 text-emerald-400" />
                                No code required
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Check className="size-3.5 text-emerald-400" />
                                Discord-native
                            </span>
                        </div>

                        <div className="mt-14 flex items-center justify-center gap-3 text-xs text-slate-500">
                            <div className="flex -space-x-2">
                                {["V", "D", "A"].map((letter, index) => (
                                    <span
                                        key={letter}
                                        className={`flex size-7 items-center justify-center rounded-full border border-portfolio-bg text-[10px] font-bold text-white ${
                                            index === 0
                                                ? "bg-blue-500"
                                                : index === 1
                                                  ? "bg-emerald-600"
                                                  : "bg-violet-600"
                                        }`}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </div>
                            Built for gaming communities
                        </div>
                    </motion.div>

                    <a
                        href="#features"
                        className="mx-auto mt-14 flex w-fit items-center justify-center rounded-full border border-white/10 p-2 text-slate-500 transition hover:border-white/20 hover:text-white"
                        aria-label="See features"
                    >
                        <ArrowDown className="size-4" />
                    </a>
                </div>
            </section>

            <section
                id="features"
                className="mx-auto w-full max-w-6xl space-y-24 px-5 py-20"
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    const reverse = index % 2 === 1;

                    return (
                        <div
                            key={feature.title}
                            className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
                                reverse ? "lg:flex-row-reverse" : ""
                            }`}
                        >
                            <div className="flex-1">
                                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-portfolio-text">
                                    <Icon className="size-4" />
                                    {feature.eyebrow}
                                </p>
                                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    {feature.title}
                                </h2>
                                <p className="mt-4 max-w-lg text-base leading-relaxed text-portfolio-sub-text">
                                    {feature.description}
                                </p>
                                <ul className="mt-6 space-y-2.5">
                                    {feature.bullets.map((bullet) => (
                                        <li
                                            key={bullet}
                                            className="flex items-start gap-2.5 text-sm text-slate-300"
                                        >
                                            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to={user ? "/dashboard" : "/login"}
                                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-portfolio-icon transition hover:text-blue-300"
                                >
                                    {user ? "Open dashboard" : "Get started"}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                            <div className="w-full flex-1">{feature.visual}</div>
                        </div>
                    );
                })}
            </section>

            <section
                id="how-it-works"
                className="border-y border-white/5 bg-white/[0.015]"
            >
                <div className="mx-auto w-full max-w-6xl px-5 py-20">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-portfolio-text">
                            How it works
                        </p>
                        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                            From invite to configured in minutes
                        </h2>
                    </div>
                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {[
                            {
                                step: "01",
                                title: "Add Turfie",
                                description:
                                    "Invite the bot to your server and sign in with Discord.",
                            },
                            {
                                step: "02",
                                title: "Build your panel",
                                description:
                                    "Add games, emojis, roles, and choose which games need approval.",
                            },
                            {
                                step: "03",
                                title: "Go live",
                                description:
                                    "Post the panel and let members join their gaming communities.",
                            },
                        ].map((item) => (
                            <Card key={item.step} className="p-6">
                                <span className="font-display text-sm font-bold text-portfolio-icon">
                                    {item.step}
                                </span>
                                <h3 className="mt-3 font-display text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-portfolio-sub-text">
                                    {item.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pricing" className="mx-auto w-full max-w-6xl px-5 py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-portfolio-text">
                        Pricing
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                        Start free. Upgrade when you grow.
                    </h2>
                    <p className="mt-3 text-portfolio-sub-text">
                        Paid plans through PayMongo are coming soon.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
                    <Card className="p-6">
                        <Badge>Free</Badge>
                        <p className="mt-4 font-display text-4xl font-bold text-white">
                            ₱0
                            <span className="text-sm font-normal text-portfolio-sub-text">
                                {" "}
                                / month
                            </span>
                        </p>
                        <ul className="mt-6 space-y-2.5 text-sm text-portfolio-sub-text">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />1
                                Discord server
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Game panel + whitelist
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Nickname formats
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Community support
                            </li>
                        </ul>
                        <Link to={user ? "/dashboard" : "/login"}>
                            <Button className="mt-6 w-full" variant="secondary">
                                Get started
                            </Button>
                        </Link>
                    </Card>
                    <Card className="border-blue-500/30 p-6">
                        <Badge tone="info">Pro · coming soon</Badge>
                        <p className="mt-4 font-display text-4xl font-bold text-white">
                            ₱299
                            <span className="text-sm font-normal text-portfolio-sub-text">
                                {" "}
                                / month
                            </span>
                        </p>
                        <ul className="mt-6 space-y-2.5 text-sm text-portfolio-sub-text">
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Multiple servers
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Lobby Nights + advanced profiles
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Priority support
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="size-4 text-emerald-400" />
                                Plan management via PayMongo
                            </li>
                        </ul>
                        <Button className="mt-6 w-full" disabled>
                            Coming soon
                        </Button>
                    </Card>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl px-5 pb-24">
                <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-blue-500/10 px-6 py-16 text-center">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,140,255,0.25),transparent_60%)]" />
                    <div className="relative">
                        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                            Ready to build your community?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
                            Set up your game panel in minutes. Free to start,
                            no credit card required.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                            {primaryButton}
                            <Link to={user ? "/dashboard" : "/login"}>
                                <Button size="lg" variant="secondary">
                                    Open Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
