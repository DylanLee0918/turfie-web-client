import { Link } from "react-router-dom";
import { Button } from "@components/Button";

export function NotFoundPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
            <p className="font-display text-7xl font-extrabold text-portfolio-icon">
                404
            </p>
            <h1 className="mt-4 font-display text-2xl font-bold text-white">
                Page not found
            </h1>
            <p className="mt-2 max-w-sm text-sm text-portfolio-sub-text">
                The page you are looking for does not exist or has moved.
            </p>
            <Link to="/" className="mt-6">
                <Button>Back home</Button>
            </Link>
        </div>
    );
}
