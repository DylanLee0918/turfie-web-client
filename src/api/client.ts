export const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
    readonly status: number;
    readonly details?: unknown;

    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

interface ErrorBody {
    message?: string | string[];
    error?: string;
}

export async function apiFetch<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init.headers ?? {}),
        },
    });

    if (response.status === 204) {
        return undefined as T;
    }

    if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as ErrorBody;
        const message = Array.isArray(body.message)
            ? body.message.join(", ")
            : (body.message ?? body.error ?? "Request failed.");

        throw new ApiError(response.status, message, body);
    }

    return (await response.json()) as T;
}
