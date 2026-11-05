import { Route, Routes } from "react-router-dom";
import useScrollbar from "@hooks/useScrollBar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { GuildLayout } from "./layouts/GuildLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { GamePanelPage } from "./pages/GamePanelPage";
import { GuildOverviewPage } from "./pages/GuildOverviewPage";
import { GuildsPage } from "./pages/GuildsPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
    useScrollbar();

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<GuildsPage />} />
                    <Route
                        path="dashboard/:guildId"
                        element={<GuildLayout />}
                    >
                        <Route index element={<GuildOverviewPage />} />
                        <Route path="panel" element={<GamePanelPage />} />
                        <Route path="access" element={<GamePanelPage />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
