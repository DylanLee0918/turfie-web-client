import { Outlet } from "react-router-dom";
import { useTheme } from "styled-components";
import Navbar from "@layouts/navigation/Navbar";
import FooterSection from "@layouts/footer/FooterSection";
import { cn } from "@utils/cn";

export function PublicLayout() {
    const theme = useTheme();

    return (
        <div
            className={cn(
                "flex min-h-screen flex-col",
                theme.hero.body.normal.bg,
                theme.hero.body.normal.text,
            )}
        >
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <FooterSection />
        </div>
    );
}
