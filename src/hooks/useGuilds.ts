import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createGuildGame,
    deleteGuildGame,
    fetchGuild,
    fetchGuildResources,
    fetchGuilds,
    updateGuildConfig,
    updateGuildGame,
    type GuildConfigPatch,
    type GuildGameInput,
} from "../api/guilds";

export function useGuilds() {
    return useQuery({
        queryKey: ["guilds"],
        queryFn: fetchGuilds,
    });
}

export function useGuild(guildId: string | undefined) {
    return useQuery({
        queryKey: ["guild", guildId],
        queryFn: () => fetchGuild(guildId as string),
        enabled: Boolean(guildId),
    });
}

export function useGuildResources(guildId: string | undefined) {
    return useQuery({
        queryKey: ["guild-resources", guildId],
        queryFn: () => fetchGuildResources(guildId as string),
        enabled: Boolean(guildId),
        staleTime: 60_000,
    });
}

export function useUpdateGuildConfig(guildId: string | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (patch: GuildConfigPatch) =>
            updateGuildConfig(guildId as string, patch),
        onSuccess: (config) => {
            queryClient.setQueryData(
                ["guild", guildId],
                (current: { config: typeof config } | undefined) =>
                    current ? { ...current, config } : current,
            );
            queryClient.invalidateQueries({ queryKey: ["guilds"] });
        },
    });
}

export function useCreateGuildGame(guildId: string | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: GuildGameInput) =>
            createGuildGame(guildId as string, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guild", guildId] });
            queryClient.invalidateQueries({ queryKey: ["guilds"] });
        },
    });
}

export function useUpdateGuildGame(guildId: string | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            gameId,
            input,
        }: {
            gameId: string;
            input: Partial<GuildGameInput>;
        }) => updateGuildGame(guildId as string, gameId, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guild", guildId] });
            queryClient.invalidateQueries({ queryKey: ["guilds"] });
        },
    });
}

export function useDeleteGuildGame(guildId: string | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (gameId: string) =>
            deleteGuildGame(guildId as string, gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guild", guildId] });
            queryClient.invalidateQueries({ queryKey: ["guilds"] });
        },
    });
}
