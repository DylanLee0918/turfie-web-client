import { useState, type FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import { Button } from "@components/Button";
import { Logo } from "@components/Logo";
import { NAVIGATION_BAR_ITEMS } from "@constants/navigation/NavigationItem";
import { useAuth } from "@context/auth-context";

const Navbar: FunctionComponent = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`sticky top-0 z-40 border-b backdrop-blur-xl ${theme.navigation.nav.normal.bg} ${theme.navigation.nav.normal.border}`}
        >
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
                <Logo />

                <div className="hidden items-center gap-8 md:flex">
                    {NAVIGATION_BAR_ITEMS.map((item) => (
                        <motion.a
                            key={item.key}
                            href={item.route}
                            whileHover={{ y: -1 }}
                            className={`text-sm font-medium transition-colors ${theme.navigation.menu.normal.text} ${theme.navigation.menu.hover?.text}`}
                        >
                            {item.title}
                        </motion.a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {user ? (
                        <Link to="/dashboard">
                            <Button
                                size="sm"
                                leftIcon={<ArrowRight className="size-4" />}
                            >
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <Button
                                size="sm"
                                leftIcon={<LogIn className="size-4" />}
                            >
                                Login with Discord
                            </Button>
                        </Link>
                    )}
                    <button
                        type="button"
                        aria-label="Toggle navigation"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className={`rounded-full p-2 transition-colors md:hidden ${theme.navigation.menu.normal.text} ${theme.navigation.menu.hover?.bg}`}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mx-5 mb-4 rounded-xl border p-4 md:hidden ${theme.navigation.menu.normal.bg} ${theme.navigation.menu.normal.border}`}
                    >
                        {NAVIGATION_BAR_ITEMS.map((item) => (
                            <a
                                key={item.key}
                                href={item.route}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block w-full rounded-lg px-3 py-2 text-sm transition-colors ${theme.navigation.menu.normal.text} ${theme.navigation.menu.hover?.text} ${theme.navigation.menu.hover?.bg}`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
