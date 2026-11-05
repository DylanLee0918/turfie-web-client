export interface SessionUser {
    id: string;
    discordId: string;
    username: string;
    globalName: string | null;
    avatar: string | null;
}

export interface GuildSummary {
    id: string;
    name: string;
    icon: string | null;
    configured: boolean;
    botInstalled: boolean;
    isOwner?: boolean;
}

export interface GuildListResponse {
    guilds: GuildSummary[];
    inviteClientId: string | null;
}

export interface GuildConfig {
    id: string;
    guildId: string;
    gameAccessEnabled: boolean;
    lobbyEnabled: boolean;
    nicknameSyncEnabled: boolean;
    gameAccessTitle: string;
    gameAccessDescription: string;
    serverStatusEnabled: boolean;
    gameAccessChannelId: string | null;
    aionWhitelistChannelId: string | null;
    dotaWhitelistChannelId: string | null;
    aionRoleId: string | null;
    dotaRoleId: string | null;
    ownerRoleId: string | null;
    adminRoleId: string | null;
    modRoleId: string | null;
    lobbyChannelId: string | null;
    aionNicknameFormat: string;
    dotaNicknameFormat: string;
    settings: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

export interface GuildGame {
    id: string;
    guildId: string;
    key: string;
    name: string;
    emoji: string | null;
    emojiName: string | null;
    roleId: string | null;
    requestChannelId: string | null;
    memberListChannelId: string | null;
    approverRoleIds: string[];
    nicknameFormat: string;
    requiresApproval: boolean;
    enabled: boolean;
    position: number;
    createdAt: string;
    updatedAt: string;
}

export interface GuildDetail extends GuildSummary {
    config: GuildConfig;
    games: GuildGame[];
}

export interface GuildChannel {
    id: string;
    name: string;
    type: number;
    parentId: string | null;
    position: number;
}

export interface GuildRole {
    id: string;
    name: string;
    color: number;
    position: number;
}

export interface GuildEmoji {
    id: string;
    name: string;
    animated: boolean;
}

export interface GuildResources {
    channels: GuildChannel[];
    roles: GuildRole[];
    emojis: GuildEmoji[];
}
