import { useQuery } from "@tanstack/react-query";
import { LogIn, ShieldCheck } from "lucide-react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { fetchAuthStatus } from "../api/auth";
import { Alert } from "../components/Alert";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { useAuth } from "../context/auth-context";

interface LocationState {
    from?: string;
}

export function LoginPage() {
    const { user, login } = useAuth();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const statusQuery = useQuery({
        queryKey: ["auth-status"],
        queryFn: fetchAuthStatus,
        retry: false,
    });

    if (user) {
        return <Navigate to={state?.from ?? "/dashboard"} replace />;
    }

    const error = searchParams.get("error");

    return (
        <div className="mx-auto flex w-full max-w-md flex-col justify-center px-5 py-20">
            <Card className="p-8">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-portfolio-icon">
                    <ShieldCheck className="size-6" />
                </span>
                <h1 className="mt-6 font-display text-2xl font-bold text-white">
                    Sign in to Turfie
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-portfolio-sub-text">
                    We use Discord to confirm who you are and which servers you
                    can manage. We never see your password.
                </p>

                {error ? (
                    <Alert tone="error" className="mt-6">
                        Discord sign-in failed or was cancelled. Please try
                        again.
                    </Alert>
                ) : null}

                {statusQuery.data && !statusQuery.data.oauthConfigured ? (
                    <Alert tone="info" className="mt-6">
                        Discord OAuth is not configured on the API yet. Add
                        <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5 text-xs">
                            DISCORD_CLIENT_ID
                        </code>
                        and
                        <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5 text-xs">
                            DISCORD_CLIENT_SECRET
                        </code>
                        to the API environment.
                    </Alert>
                ) : null}

                <Button
                    className="mt-6 w-full"
                    size="lg"
                    onClick={login}
                    leftIcon={<LogIn className="size-5" />}
                    disabled={
                        statusQuery.isSuccess &&
                        !statusQuery.data.oauthConfigured
                    }
                >
                    Continue with Discord
                </Button>

                <p className="mt-5 text-center text-xs text-slate-500">
                    By continuing you agree to the platform terms and privacy
                    policy.
                </p>
            </Card>
        </div>
    );
}
