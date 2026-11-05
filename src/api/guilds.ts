import { apiFetch } from "./client";
import type {
    GuildConfig,
    GuildDetail,
    GuildGame,
    GuildListResponse,
    GuildResources,
} from "../types";

export async function fetchGuilds(): Promise<GuildListResponse> {
    return apiFetch<GuildListResponse>("/api/guilds");
}

export async function fetchGuild(guildId: string): Promise<GuildDetail> {
    return apiFetch<GuildDetail>(`/api/guilds/${guildId}`);
}

export async function fetchGuildResources(
    guildId: string,
): Promise<GuildResources> {
    return apiFetch<GuildResources>(`/api/guilds/${guildId}/resources`);
}

export type GuildConfigPatch = Partial<
    Omit<GuildConfig, "id" | "guildId" | "createdAt" | "updatedAt">
>;

export async function updateGuildConfig(
    guildId: string,
    patch: GuildConfigPatch,
): Promise<GuildConfig> {
    return apiFetch<GuildConfig>(`/api/guilds/${guildId}/config`, {
        method: "PATCH",
        body: JSON.stringify(patch),
    });
}

export interface GuildGameInput {
    name: string;
    emoji?: string | null;
    emojiName?: string | null;
    roleId?: string | null;
    requestChannelId?: string | null;
    memberListChannelId?: string | null;
    approverRoleIds?: string[];
    nicknameFormat?: string;
    requiresApproval?: boolean;
    enabled?: boolean;
    position?: number;
}

export async function createGuildGame(
    guildId: string,
    input: GuildGameInput,
): Promise<GuildGame> {
    return apiFetch<GuildGame>(`/api/guilds/${guildId}/games`, {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export async function updateGuildGame(
    guildId: string,
    gameId: string,
    input: Partial<GuildGameInput>,
): Promise<GuildGame> {
    return apiFetch<GuildGame>(`/api/guilds/${guildId}/games/${gameId}`, {
        method: "PATCH",
        body: JSON.stringify(input),
    });
}

export async function deleteGuildGame(
    guildId: string,
    gameId: string,
): Promise<{ ok: boolean }> {
    return apiFetch<{ ok: boolean }>(
        `/api/guilds/${guildId}/games/${gameId}`,
        { method: "DELETE" },
    );
}
