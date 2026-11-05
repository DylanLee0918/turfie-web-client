import { useCallback, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe, loginWithDiscord, logout as logoutRequest } from "../api/auth";
import { queryClient } from "../utils/queryClient";
import {
    AuthContext,
    type AuthContextValue,
} from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
    const meQuery = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        retry: false,
    });

    const login = useCallback(() => {
        loginWithDiscord();
    }, []);

    const logout = useCallback(async () => {
        await logoutRequest();
        queryClient.setQueryData(["me"], null);
        queryClient.removeQueries({ queryKey: ["guilds"] });
        queryClient.removeQueries({ queryKey: ["guild"] });
        window.location.href = "/";
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user: meQuery.data ?? null,
            loading: meQuery.isLoading,
            login,
            logout,
        }),
        [meQuery.data, meQuery.isLoading, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
