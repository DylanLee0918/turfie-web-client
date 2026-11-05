import {
    ArrowRight,
    AtSign,
    CheckCircle2,
    Circle,
    CreditCard,
    ShieldCheck,
    Swords,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "../components/Badge";
import { Card, CardBody, CardHeader } from "@components/Card";
import { GuildIcon } from "../components/GuildIcon";
import { FullPageSpinner } from "../components/Spinner";
import { useGuild } from "../hooks/useGuilds";

const checklist = [
    { key: "gameAccessChannelId", label: "Game access channel" },
    { key: "ownerRoleId", label: "Owner role" },
    { key: "adminRoleId", label: "Admin role" },
    { key: "modRoleId", label: "Moderator role" },
] as const;

export function GuildOverviewPage() {
    const { guildId } = useParams();
    const guildQuery = useGuild(guildId);

    if (guildQuery.isLoading || !guildQuery.data) {
        return <FullPageSpinner label="Loading server" />;
    }

    const guild = guildQuery.data;
    const config = guild.config;
    const games = guild.games ?? [];
    const checklistItems = [
        ...checklist.map((item) => ({
            label: item.label,
            done: Boolean(config[item.key]),
        })),
        {
            label: "At least one game configured",
            done: games.length > 0,
        },
    ];
    const completed = checklistItems.filter((item) => item.done).length;
    const progress = Math.round(
        (completed / checklistItems.length) * 100,
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
                <GuildIcon
                    id={guild.id}
                    name={guild.name}
                    icon={guild.icon}
                    size="lg"
                />
                <div>
                    <h1 className="font-display text-3xl font-bold text-white">
                        {guild.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge tone="success">Bot installed</Badge>
                        <Badge tone="info">Free plan</Badge>
                        <span className="text-xs text-portfolio-sub-text">
                            {guild.id}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-portfolio-icon">
                            <ShieldCheck className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="font-display text-base font-semibold text-white">
                                Game Panel
                            </p>
                            <p className="mt-1 text-sm text-portfolio-sub-text">
                                Panel title, description, games, emojis, roles,
                                and whitelist settings.
                            </p>
                        </div>
                    </div>
                    <Link
                        to={`/dashboard/${guild.id}/panel`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-portfolio-icon hover:text-blue-300"
                    >
                        Configure panel
                        <ArrowRight className="size-4" />
                    </Link>
                </Card>

                <Card className="p-5 opacity-80">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400">
                            <Swords className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-display text-base font-semibold text-white">
                                    Lobby Nights
                                </p>
                                <Badge>Soon</Badge>
                            </div>
                            <p className="mt-1 text-sm text-portfolio-sub-text">
                                Lobby panels, player limits, and DOTA profile
                                gating.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-portfolio-icon">
                            <AtSign className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="font-display text-base font-semibold text-white">
                                Nicknames
                            </p>
                            <p className="mt-1 text-sm text-portfolio-sub-text">
                                {games.length
                                    ? games.map((game, index) => (
                                          <span key={game.id}>
                                              {index > 0 ? " · " : ""}
                                              {game.name}:{" "}
                                              <span className="text-slate-300">
                                                  {game.nicknameFormat}
                                              </span>
                                          </span>
                                      ))
                                    : "No games configured yet."}
                            </p>
                        </div>
                    </div>
                    <Link
                        to={`/dashboard/${guild.id}/panel`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-portfolio-icon hover:text-blue-300"
                    >
                        Configure in Game Panel
                        <ArrowRight className="size-4" />
                    </Link>
                </Card>

                <Card className="p-5 opacity-80">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400">
                            <CreditCard className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-display text-base font-semibold text-white">
                                    Billing
                                </p>
                                <Badge>Soon</Badge>
                            </div>
                            <p className="mt-1 text-sm text-portfolio-sub-text">
                                PayMongo subscriptions and plan management.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card>
                <CardHeader
                    title="Configuration checklist"
                    description={`${completed} of ${checklistItems.length} settings complete (${progress}%)`}
                />
                <CardBody>
                    <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                            className="h-full rounded-full bg-portfolio-text transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {checklistItems.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2.5 text-sm"
                            >
                                {item.done ? (
                                    <CheckCircle2 className="size-4 text-emerald-400" />
                                ) : (
                                    <Circle className="size-4 text-slate-600" />
                                )}
                                <span
                                    className={
                                        item.done
                                            ? "text-slate-200"
                                            : "text-slate-500"
                                    }
                                >
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link
                        to={`/dashboard/${guild.id}/panel`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-portfolio-icon hover:text-blue-300"
                    >
                        Finish setup
                        <ArrowRight className="size-4" />
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}
