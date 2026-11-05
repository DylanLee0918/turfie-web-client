import { API_URL, ApiError, apiFetch } from "./client";
import type { SessionUser } from "../types";

export async function fetchMe(): Promise<SessionUser | null> {
    try {
        return await apiFetch<SessionUser>("/api/auth/me");
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            return null;
        }
        throw error;
    }
}

export async function fetchAuthStatus(): Promise<{
    oauthConfigured: boolean;
    clientId: string | null;
}> {
    return apiFetch<{ oauthConfigured: boolean; clientId: string | null }>(
        "/api/auth/status",
    );
}

export function loginWithDiscord(): void {
    window.location.href = `${API_URL}/api/auth/discord`;
}

export async function logout(): Promise<void> {
    await apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}
