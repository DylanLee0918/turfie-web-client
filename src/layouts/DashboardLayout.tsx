import { LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Button } from "@components/Button";
import { Logo } from "../components/Logo";
import { useAuth } from "../context/auth-context";

function avatarUrl(discordId: string, avatar: string | null): string | null {
    if (!avatar) return null;
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png?size=64`;
}

export function DashboardLayout() {
    const { user, logout } = useAuth();
    const avatar = user ? avatarUrl(user.discordId, user.avatar) : null;

    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b border-portfolio-border/60 bg-portfolio-bg/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
                    <Logo />
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-3 sm:flex">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt={user?.username}
                                    className="size-9 rounded-full"
                                />
                            ) : (
                                <div className="flex size-9 items-center justify-center rounded-full bg-portfolio-icon-container text-sm font-semibold text-portfolio-icon">
                                    {user?.username.slice(0, 1).toUpperCase()}
                                </div>
                            )}
                            <div className="leading-tight">
                                <p className="text-sm font-medium text-white">
                                    {user?.globalName ?? user?.username}
                                </p>
                                <p className="text-xs text-portfolio-sub-text">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => void logout()}
                            leftIcon={<LogOut className="size-4" />}
                        >
                            Sign out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
                <Outlet />
            </main>
        </div>
    );
}
