import { motion } from "framer-motion";
import {
    ArrowRight,
    ExternalLink,
    Server,
    Settings2,
    ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { GuildIcon } from "../components/GuildIcon";
import { FullPageSpinner } from "../components/Spinner";
import { useAuth } from "../context/auth-context";
import { useGuilds } from "../hooks/useGuilds";

const INVITE_PERMISSIONS = "361247501376";

function inviteUrl(clientId: string, guildId: string): string {
    const params = new URLSearchParams({
        client_id: clientId,
        permissions: INVITE_PERMISSIONS,
        scope: "bot applications.commands",
        guild_id: guildId,
        disable_guild_select: "true",
    });

    return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export function GuildsPage() {
    const { user, login } = useAuth();
    const guildsQuery = useGuilds();
    const guilds = guildsQuery.data?.guilds ?? [];
    const inviteClientId = guildsQuery.data?.inviteClientId ?? null;
    const installedCount = guilds.filter((guild) => guild.botInstalled).length;

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm text-portfolio-icon">Dashboard</p>
                <h1 className="mt-1 font-display text-3xl font-bold text-white">
                    Welcome back
                    {user?.globalName ? `, ${user.globalName}` : ""}.
                </h1>
                <p className="mt-2 text-sm text-portfolio-sub-text">
                    Choose a server to configure. Servers without Turfie are
                    grayed out — invite the bot to enable them.
                </p>
            </div>

            {guildsQuery.isLoading ? (
                <FullPageSpinner label="Loading your servers" />
            ) : guildsQuery.isError ? (
                <Alert tone="error">
                    {guildsQuery.error instanceof Error
                        ? guildsQuery.error.message
                        : "Could not load your servers."}
                </Alert>
            ) : !guilds.length ? (
                <Card className="p-10 text-center">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-portfolio-border bg-portfolio-icon-container text-portfolio-icon">
                        <ShieldAlert className="size-6" />
                    </span>
                    <h2 className="mt-5 font-display text-xl font-semibold text-white">
                        No manageable servers found
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-portfolio-sub-text">
                        You need the <strong>Manage Server</strong> permission
                        on a server before it appears here. If you just created
                        one, sign in again so Discord refreshes your server
                        list.
                    </p>
                    <Button
                        className="mt-6"
                        variant="secondary"
                        onClick={login}
                    >
                        Re-authenticate
                    </Button>
                </Card>
            ) : (
                <>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-portfolio-sub-text">
                        <span>
                            {guilds.length} server(s) you can manage
                        </span>
                        <span className="text-slate-600">•</span>
                        <span>
                            Turfie installed in {installedCount}
                        </span>
                    </div>

                    <p className="text-xs text-slate-500">
                        Pilot note: Turfie currently runs on one server at a
                        time. The invite buttons are ready for multi-server
                        support.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        {guilds.map((guild, index) => {
                            const canInvite =
                                !guild.botInstalled && Boolean(inviteClientId);
                            const invite = canInvite
                                ? inviteUrl(inviteClientId as string, guild.id)
                                : null;

                            return (
                                <motion.div
                                    key={guild.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04 }}
                                >
                                    <Card
                                        className={`flex h-full flex-col p-5 transition-colors ${
                                            guild.botInstalled
                                                ? "hover:border-blue-500/30 hover:bg-portfolio-card"
                                                : "border-white/5 bg-portfolio-card/40 opacity-60"
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <GuildIcon
                                                id={guild.id}
                                                name={guild.name}
                                                icon={guild.icon}
                                                size="md"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-display text-lg font-semibold text-white">
                                                    {guild.name}
                                                </p>
                                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                                    {guild.botInstalled ? (
                                                        <Badge
                                                            tone={
                                                                guild.configured
                                                                    ? "success"
                                                                    : "warning"
                                                            }
                                                        >
                                                            {guild.configured
                                                                ? "Configured"
                                                                : "Not configured"}
                                                        </Badge>
                                                    ) : (
                                                        <Badge tone="danger">
                                                            Bot not installed
                                                        </Badge>
                                                    )}
                                                    {guild.isOwner ? (
                                                        <Badge>
                                                            Owner
                                                        </Badge>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-portfolio-border pt-4">
                                            <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-portfolio-sub-text">
                                                <Server className="size-3.5 shrink-0" />
                                                <span className="truncate">
                                                    {guild.id}
                                                </span>
                                            </span>
                                            {guild.botInstalled ? (
                                                <Link
                                                    to={`/dashboard/${guild.id}`}
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        leftIcon={
                                                            <Settings2 className="size-4" />
                                                        }
                                                    >
                                                        Configure
                                                    </Button>
                                                </Link>
                                            ) : invite ? (
                                                <a
                                                    href={invite}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        leftIcon={
                                                            <ExternalLink className="size-4" />
                                                        }
                                                    >
                                                        Invite bot
                                                    </Button>
                                                </a>
                                            ) : (
                                                <Button size="sm" disabled>
                                                    Invite bot
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </>
            )}

            {guilds.length ? (
                <Card className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="font-medium text-white">
                            Just created a server?
                        </p>
                        <p className="mt-1 text-sm text-portfolio-sub-text">
                            Sign in again to refresh your Discord server list.
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={login}
                        leftIcon={<ArrowRight className="size-4" />}
                    >
                        Re-authenticate
                    </Button>
                </Card>
            ) : null}
        </div>
    );
}
