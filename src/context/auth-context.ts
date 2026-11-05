import { createContext, useContext } from "react";
import type { SessionUser } from "../types";

export interface AuthContextValue {
    user: SessionUser | null;
    loading: boolean;
    login: () => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }
    return context;
}
