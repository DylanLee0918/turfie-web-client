import { useEffect, useMemo, useState } from "react";
import {
    Gamepad2,
    Pencil,
    Plus,
    RefreshCw,
    Save,
    Trash2,
    X,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { Button } from "@components/Button";
import { Card, CardBody, CardHeader } from "@components/Card";
import { MultiSelectField } from "../components/MultiSelectField";
import { FullPageSpinner, Spinner } from "../components/Spinner";
import { SelectField, type SelectOption } from "../components/SelectField";
import { TextAreaField } from "../components/TextAreaField";
import { TextField } from "../components/TextField";
import { Toggle } from "../components/Toggle";
import {
    useCreateGuildGame,
    useDeleteGuildGame,
    useGuild,
    useGuildResources,
    useUpdateGuildConfig,
    useUpdateGuildGame,
} from "../hooks/useGuilds";
import type {
    GuildChannel,
    GuildConfig,
    GuildEmoji,
    GuildGame,
    GuildRole,
} from "../types";

const EMPTY_CHANNELS: GuildChannel[] = [];
const EMPTY_ROLES: GuildRole[] = [];
const EMPTY_EMOJIS: GuildEmoji[] = [];

interface PanelFormState {
    gameAccessTitle: string;
    gameAccessDescription: string;
    serverStatusEnabled: boolean;
    gameAccessEnabled: boolean;
    lobbyEnabled: boolean;
    nicknameSyncEnabled: boolean;
    gameAccessChannelId: string;
    lobbyChannelId: string;
    ownerRoleId: string;
    adminRoleId: string;
    modRoleId: string;
}

interface GameFormState {
    name: string;
    emoji: string;
    emojiName: string;
    roleId: string;
    requestChannelId: string;
    memberListChannelId: string;
    approverRoleIds: string[];
    nicknameFormat: string;
    requiresApproval: boolean;
    enabled: boolean;
}

function toPanelForm(config: GuildConfig): PanelFormState {
    return {
        gameAccessTitle: config.gameAccessTitle,
        gameAccessDescription: config.gameAccessDescription,
        serverStatusEnabled: config.serverStatusEnabled,
        gameAccessEnabled: config.gameAccessEnabled,
        lobbyEnabled: config.lobbyEnabled,
        nicknameSyncEnabled: config.nicknameSyncEnabled,
        gameAccessChannelId: config.gameAccessChannelId ?? "",
        lobbyChannelId: config.lobbyChannelId ?? "",
        ownerRoleId: config.ownerRoleId ?? "",
        adminRoleId: config.adminRoleId ?? "",
        modRoleId: config.modRoleId ?? "",
    };
}

function emptyGameForm(): GameFormState {
    return {
        name: "",
        emoji: "",
        emojiName: "",
        roleId: "",
        requestChannelId: "",
        memberListChannelId: "",
        approverRoleIds: [],
        nicknameFormat: "{ign}",
        requiresApproval: true,
        enabled: true,
    };
}

function toGameForm(game: GuildGame): GameFormState {
    return {
        name: game.name,
        emoji: game.emoji ?? "",
        emojiName: game.emojiName ?? "",
        roleId: game.roleId ?? "",
        requestChannelId: game.requestChannelId ?? "",
        memberListChannelId: game.memberListChannelId ?? "",
        approverRoleIds: game.approverRoleIds ?? [],
        nicknameFormat: game.nicknameFormat,
        requiresApproval: game.requiresApproval,
        enabled: game.enabled,
    };
}

function orNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
}

function isCustomEmoji(value: string): boolean {
    return /^\d{17,20}$/.test(value);
}

function resourceName(
    items: { id: string; name: string }[],
    id: string | null,
    fallback: string,
): string {
    if (!id) return fallback;
    return items.find((item) => item.id === id)?.name ?? fallback;
}

function EmojiPreview({
    emoji,
    emojiName,
}: {
    emoji: string | null;
    emojiName: string | null;
}) {
    if (!emoji) {
        return (
            <span className="flex size-10 items-center justify-center rounded-xl border border-portfolio-border bg-portfolio-icon-container text-portfolio-icon">
                <Gamepad2 className="size-5" />
            </span>
        );
    }

    if (isCustomEmoji(emoji)) {
        return (
            <img
                src={`https://cdn.discordapp.com/emojis/${emoji}.png?size=64`}
                alt={emojiName ?? "game emoji"}
                className="size-10 rounded-xl object-contain"
            />
        );
    }

    return (
        <span className="flex size-10 items-center justify-center rounded-xl border border-portfolio-border bg-portfolio-icon-container text-2xl">
            {emoji}
        </span>
    );
}

export function GamePanelPage() {
    const { guildId } = useParams();
    const guildQuery = useGuild(guildId);
    const resourcesQuery = useGuildResources(guildId);
    const updateConfig = useUpdateGuildConfig(guildId);
    const createGame = useCreateGuildGame(guildId);
    const updateGame = useUpdateGuildGame(guildId);
    const deleteGame = useDeleteGuildGame(guildId);

    const [panelForm, setPanelForm] = useState<PanelFormState | null>(null);
    const [editingId, setEditingId] = useState<string | "new" | null>(null);
    const [gameForm, setGameForm] = useState<GameFormState | null>(null);

    useEffect(() => {
        if (guildQuery.data) {
            setPanelForm(toPanelForm(guildQuery.data.config));
        }
    }, [guildQuery.data]);

    const resources = resourcesQuery.data;
    const channels = resources?.channels ?? EMPTY_CHANNELS;
    const roles = resources?.roles ?? EMPTY_ROLES;
    const emojis = resources?.emojis ?? EMPTY_EMOJIS;

    const channelOptions = useMemo<SelectOption[]>(() => {
        const categories = new Map(
            channels
                .filter((channel) => channel.type === 4)
                .map((channel) => [channel.id, channel.name]),
        );

        return channels
            .filter((channel) => channel.type === 0 || channel.type === 5)
            .sort((a, b) => a.position - b.position)
            .map((channel) => ({
                value: channel.id,
                label: `#${channel.name}`,
                group: channel.parentId
                    ? (categories.get(channel.parentId) ?? "Uncategorized")
                    : "No category",
            }));
    }, [channels]);

    const roleOptions = useMemo<SelectOption[]>(
        () => roles.map((role) => ({ value: role.id, label: `@${role.name}` })),
        [roles],
    );

    const emojiOptions = useMemo<SelectOption[]>(
        () =>
            emojis.map((emoji) => ({
                value: emoji.id,
                label: `:${emoji.name}:`,
            })),
        [emojis],
    );

    if (guildQuery.isLoading || !panelForm || !guildQuery.data) {
        return <FullPageSpinner label="Loading panel settings" />;
    }

    const guild = guildQuery.data;
    const games = guild?.games ?? [];
    const useSelects = Boolean(resources);

    const updatePanel = <Key extends keyof PanelFormState>(
        key: Key,
        value: PanelFormState[Key],
    ) => {
        setPanelForm((current) =>
            current ? { ...current, [key]: value } : current,
        );
    };

    const savePanel = () => {
        updateConfig.mutate({
            gameAccessTitle:
                panelForm.gameAccessTitle.trim() || "Game Access",
            gameAccessDescription:
                panelForm.gameAccessDescription.trim() ||
                "Choose a game to join its community.",
            serverStatusEnabled: panelForm.serverStatusEnabled,
            gameAccessEnabled: panelForm.gameAccessEnabled,
            lobbyEnabled: panelForm.lobbyEnabled,
            nicknameSyncEnabled: panelForm.nicknameSyncEnabled,
            gameAccessChannelId: orNull(panelForm.gameAccessChannelId),
            lobbyChannelId: orNull(panelForm.lobbyChannelId),
            ownerRoleId: orNull(panelForm.ownerRoleId),
            adminRoleId: orNull(panelForm.adminRoleId),
            modRoleId: orNull(panelForm.modRoleId),
        });
    };

    const startCreate = () => {
        setEditingId("new");
        setGameForm(emptyGameForm());
    };

    const startEdit = (game: GuildGame) => {
        setEditingId(game.id);
        setGameForm(toGameForm(game));
    };

    const cancelEdit = () => {
        setEditingId(null);
        setGameForm(null);
    };

    const updateGameField = <Key extends keyof GameFormState>(
        key: Key,
        value: GameFormState[Key],
    ) => {
        setGameForm((current) =>
            current ? { ...current, [key]: value } : current,
        );
    };

    const saveGame = () => {
        if (!gameForm) return;

        const name = gameForm.name.trim();
        if (!name) return;

        const input = {
            name,
            emoji: gameForm.emoji.trim() || null,
            emojiName: gameForm.emojiName.trim() || null,
            roleId: gameForm.roleId || null,
            requestChannelId: gameForm.requestChannelId || null,
            memberListChannelId: gameForm.memberListChannelId || null,
            approverRoleIds: gameForm.approverRoleIds,
            nicknameFormat: gameForm.nicknameFormat.trim() || "{ign}",
            requiresApproval: gameForm.requiresApproval,
            enabled: gameForm.enabled,
        };

        if (editingId === "new") {
            createGame.mutate(input, { onSuccess: cancelEdit });
            return;
        }

        if (editingId) {
            updateGame.mutate(
                { gameId: editingId, input },
                { onSuccess: cancelEdit },
            );
        }
    };

    const removeGame = (game: GuildGame) => {
        if (window.confirm(`Delete ${game.name} from the panel?`)) {
            deleteGame.mutate(game.id);
        }
    };

    const selectedServerEmoji =
        gameForm && isCustomEmoji(gameForm.emoji) ? gameForm.emoji : "";

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-white">
                        Game Panel
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-portfolio-sub-text">
                        Build the panel members see in Discord: title,
                        description, games, emojis, roles, and status counts.
                    </p>
                </div>
                <Button
                    onClick={savePanel}
                    loading={updateConfig.isPending}
                    leftIcon={<Save className="size-4" />}
                >
                    Save panel settings
                </Button>
            </div>

            {updateConfig.isSuccess ? (
                <Alert tone="success">
                    Panel settings saved. The bot will refresh them within 30
                    seconds.
                </Alert>
            ) : null}

            {updateConfig.isError ? (
                <Alert tone="error">
                    {updateConfig.error instanceof Error
                        ? updateConfig.error.message
                        : "Could not save the panel settings."}
                </Alert>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-portfolio-border bg-portfolio-card/50 px-4 py-3 text-sm">
                <div className="flex items-center gap-2 text-portfolio-sub-text">
                    {resourcesQuery.isLoading ? (
                        <>
                            <Spinner className="size-4" />
                            Loading channels, roles, and emojis from Discord…
                        </>
                    ) : resourcesQuery.isError ? (
                        <span className="text-red-300">
                            Could not load Discord resources. Manual ID entry is
                            available below.
                        </span>
                    ) : resources ? (
                        <span>
                            Loaded {channels.length} channels, {roles.length}{" "}
                            roles, and {emojis.length} emojis from Discord.
                        </span>
                    ) : null}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => resourcesQuery.refetch()}
                    loading={resourcesQuery.isFetching}
                    leftIcon={<RefreshCw className="size-4" />}
                >
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader
                    title="Panel settings"
                    description="What members see at the top of the Game Access panel."
                />
                <CardBody className="space-y-5">
                    <TextField
                        label="Panel title"
                        name="gameAccessTitle"
                        value={panelForm.gameAccessTitle}
                        onChange={(event) =>
                            updatePanel("gameAccessTitle", event.target.value)
                        }
                        placeholder="TURF - Gaming Hub"
                        hint="Shown as the main heading in Discord."
                    />
                    <TextAreaField
                        label="Panel description"
                        name="gameAccessDescription"
                        value={panelForm.gameAccessDescription}
                        onChange={(event) =>
                            updatePanel(
                                "gameAccessDescription",
                                event.target.value,
                            )
                        }
                        placeholder="Welcome to our gaming community…"
                        hint="Shown under the title. Keep it short and welcoming."
                    />
                    <Toggle
                        label="Show server status"
                        description="Shows online, idle, and do-not-disturb counts for members with game roles."
                        checked={panelForm.serverStatusEnabled}
                        onChange={(value) =>
                            updatePanel("serverStatusEnabled", value)
                        }
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader
                    title="Games"
                    description="Each game gets an emoji, a community role, and its own whitelist setting."
                    action={
                        <Button
                            size="sm"
                            onClick={startCreate}
                            leftIcon={<Plus className="size-4" />}
                        >
                            Add game
                        </Button>
                    }
                />
                <CardBody className="space-y-4">
                    {!games.length ? (
                        <div className="rounded-xl border border-dashed border-portfolio-border px-5 py-8 text-center text-sm text-portfolio-sub-text">
                            No games yet. Add one to start building the panel.
                        </div>
                    ) : (
                        games.map((game) => (
                            <div
                                key={game.id}
                                className="flex flex-wrap items-center gap-4 rounded-xl border border-portfolio-border bg-portfolio-bg/40 p-4"
                            >
                                <EmojiPreview
                                    emoji={game.emoji}
                                    emojiName={game.emojiName}
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium text-white">
                                            {game.name}
                                        </p>
                                        {game.requiresApproval ? (
                                            <Badge tone="info">
                                                Whitelisted
                                            </Badge>
                                        ) : (
                                            <Badge tone="success">Open</Badge>
                                        )}
                                        {!game.enabled ? (
                                            <Badge>Disabled</Badge>
                                        ) : null}
                                    </div>
                                    <p className="mt-1 text-xs text-portfolio-sub-text">
                                        Role:{" "}
                                        {resourceName(
                                            roles,
                                            game.roleId,
                                            "not set",
                                        )}{" "}
                                        · Members list:{" "}
                                        {resourceName(
                                            channels,
                                            game.memberListChannelId,
                                            "not set",
                                        )}
                                    </p>
                                    <p className="mt-0.5 text-xs text-portfolio-sub-text">
                                        Requests:{" "}
                                        {resourceName(
                                            channels,
                                            game.requestChannelId,
                                            "not set",
                                        )}{" "}
                                        · Approvers:{" "}
                                        {game.approverRoleIds.length
                                            ? game.approverRoleIds
                                                  .map((roleId) =>
                                                      resourceName(
                                                          roles,
                                                          roleId,
                                                          "unknown",
                                                      ),
                                                  )
                                                  .join(", ")
                                            : "Global owner/admin"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => startEdit(game)}
                                        leftIcon={<Pencil className="size-4" />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeGame(game)}
                                        leftIcon={<Trash2 className="size-4" />}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}

                    {editingId && gameForm ? (
                        <div className="rounded-xl border border-blue-500/25 bg-blue-500/5 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-display text-base font-semibold text-white">
                                    {editingId === "new"
                                        ? "Add game"
                                        : "Edit game"}
                                </h3>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={cancelEdit}
                                    leftIcon={<X className="size-4" />}
                                >
                                    Cancel
                                </Button>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <TextField
                                    label="Game name"
                                    name="game-name"
                                    value={gameForm.name}
                                    onChange={(event) =>
                                        updateGameField(
                                            "name",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="e.g. VALORANT"
                                />
                                <div className="flex items-end gap-3">
                                    <div className="flex-1">
                                        <SelectField
                                            label="Server emoji"
                                            name="game-emoji"
                                            value={selectedServerEmoji}
                                            onChange={(value) => {
                                                const emoji = emojis.find(
                                                    (entry) =>
                                                        entry.id === value,
                                                );
                                                updateGameField("emoji", value);
                                                updateGameField(
                                                    "emojiName",
                                                    emoji?.name ?? "",
                                                );
                                            }}
                                            options={emojiOptions}
                                            hint={
                                                <>
                                                    Pick an emoji uploaded to
                                                    this server.
                                                    {emojis.length === 0 ? (
                                                        <span className="mt-1 block text-amber-300">
                                                            No server emojis
                                                            found. Upload emojis
                                                            in Discord, then
                                                            click Refresh.
                                                        </span>
                                                    ) : null}
                                                    {gameForm.emoji &&
                                                    !isCustomEmoji(
                                                        gameForm.emoji,
                                                    ) ? (
                                                        <span className="mt-1 block text-amber-300">
                                                            This game currently
                                                            uses the unicode
                                                            emoji{" "}
                                                            {gameForm.emoji}.
                                                            Choose a server emoji
                                                            to replace it.
                                                        </span>
                                                    ) : null}
                                                </>
                                            }
                                        />
                                    </div>
                                    <EmojiPreview
                                        emoji={gameForm.emoji || null}
                                        emojiName={gameForm.emojiName || null}
                                    />
                                </div>
                                <SelectField
                                    label="Community role"
                                    name="game-role"
                                    value={gameForm.roleId}
                                    onChange={(value) =>
                                        updateGameField("roleId", value)
                                    }
                                    options={roleOptions}
                                    hint="Members with this role are counted in the panel."
                                />
                                <SelectField
                                    label="Request channel"
                                    name="game-request-channel"
                                    value={gameForm.requestChannelId}
                                    onChange={(value) =>
                                        updateGameField(
                                            "requestChannelId",
                                            value,
                                        )
                                    }
                                    options={channelOptions}
                                    hint="Where pending applications are posted for staff review."
                                />
                                <SelectField
                                    label="Member-list channel"
                                    name="game-member-list-channel"
                                    value={gameForm.memberListChannelId}
                                    onChange={(value) =>
                                        updateGameField(
                                            "memberListChannelId",
                                            value,
                                        )
                                    }
                                    options={channelOptions}
                                    hint="Where approved profiles for this game are posted."
                                />
                                <TextField
                                    label="Nickname format"
                                    name="game-nickname-format"
                                    value={gameForm.nicknameFormat}
                                    onChange={(event) =>
                                        updateGameField(
                                            "nicknameFormat",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="{ign}"
                                    hint="Use {ign}, {tag}, and {game}."
                                />
                                <div className="sm:col-span-2">
                                    <MultiSelectField
                                        label="Approver roles"
                                        values={gameForm.approverRoleIds}
                                        options={roleOptions}
                                        onChange={(values) =>
                                            updateGameField(
                                                "approverRoleIds",
                                                values,
                                            )
                                        }
                                        hint="These roles can approve or reject requests for this game. Global owner/admin roles can always approve."
                                        emptyText="No assignable roles found. Create roles in Discord and refresh."
                                    />
                                </div>
                            </div>

                            <div className="mt-4 divide-y divide-portfolio-border">
                                <Toggle
                                    label="Requires approval (whitelisted)"
                                    description="If off, clicking the game grants the role immediately."
                                    checked={gameForm.requiresApproval}
                                    onChange={(value) =>
                                        updateGameField(
                                            "requiresApproval",
                                            value,
                                        )
                                    }
                                />
                                <Toggle
                                    label="Show in panel"
                                    description="Turn off to keep the game configured but hidden."
                                    checked={gameForm.enabled}
                                    onChange={(value) =>
                                        updateGameField("enabled", value)
                                    }
                                />
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Button
                                    onClick={saveGame}
                                    loading={
                                        createGame.isPending ||
                                        updateGame.isPending
                                    }
                                    leftIcon={<Save className="size-4" />}
                                >
                                    {editingId === "new"
                                        ? "Add game"
                                        : "Save game"}
                                </Button>
                            </div>

                            {createGame.isError || updateGame.isError ? (
                                <Alert tone="error" className="mt-4">
                                    {(createGame.error ??
                                        updateGame.error) instanceof Error
                                        ? (
                                              (createGame.error ??
                                                  updateGame.error) as Error
                                          ).message
                                        : "Could not save the game."}
                                </Alert>
                            ) : null}
                        </div>
                    ) : null}
                </CardBody>
            </Card>

            <Card>
                <CardHeader
                    title="Global staff roles"
                    description="Owner and admin roles can always approve any game. Add game-specific approvers inside each game. The moderator role is used for ticket access and mentions."
                />
                <CardBody className="space-y-5">
                    <div className="divide-y divide-portfolio-border">
                        <Toggle
                            label="Game Access"
                            description="Whitelist applications, profiles, and access roles."
                            checked={panelForm.gameAccessEnabled}
                            onChange={(value) =>
                                updatePanel("gameAccessEnabled", value)
                            }
                        />
                        <Toggle
                            label="Lobby Nights"
                            description="Lobby panels and player lists."
                            checked={panelForm.lobbyEnabled}
                            onChange={(value) =>
                                updatePanel("lobbyEnabled", value)
                            }
                        />
                        <Toggle
                            label="Nickname Sync"
                            description="Apply nickname rules when profiles change."
                            checked={panelForm.nicknameSyncEnabled}
                            onChange={(value) =>
                                updatePanel("nicknameSyncEnabled", value)
                            }
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <SelectField
                            label="Game access channel"
                            name="gameAccessChannelId"
                            value={panelForm.gameAccessChannelId}
                            onChange={(value) =>
                                updatePanel("gameAccessChannelId", value)
                            }
                            options={channelOptions}
                            hint="Where members open the Get Access flow."
                        />
                        <SelectField
                            label="Lobby channel"
                            name="lobbyChannelId"
                            value={panelForm.lobbyChannelId}
                            onChange={(value) =>
                                updatePanel("lobbyChannelId", value)
                            }
                            options={channelOptions}
                            hint="Where Lobby Nights panels are allowed."
                        />
                        <SelectField
                            label="Owner role"
                            name="ownerRoleId"
                            value={panelForm.ownerRoleId}
                            onChange={(value) =>
                                updatePanel("ownerRoleId", value)
                            }
                            options={roleOptions}
                            hint="Always able to approve any game."
                        />
                        <SelectField
                            label="Admin role"
                            name="adminRoleId"
                            value={panelForm.adminRoleId}
                            onChange={(value) =>
                                updatePanel("adminRoleId", value)
                            }
                            options={roleOptions}
                            hint="Always able to approve any game."
                        />
                        <SelectField
                            label="Moderator role"
                            name="modRoleId"
                            value={panelForm.modRoleId}
                            onChange={(value) =>
                                updatePanel("modRoleId", value)
                            }
                            options={roleOptions}
                            hint="Used for ticket access and mentions. Add this role to a game's approvers if mods should approve that game."
                        />
                    </div>

                    {!useSelects ? (
                        <Alert tone="info">
                            Discord resources could not be loaded. Refresh the
                            page after the bot is in the server.
                        </Alert>
                    ) : null}
                </CardBody>
            </Card>

            <div className="flex justify-end">
                <Button
                    onClick={savePanel}
                    loading={updateConfig.isPending}
                    leftIcon={<Save className="size-4" />}
                >
                    Save panel settings
                </Button>
            </div>
        </div>
    );
}
