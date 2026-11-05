import { useEffect } from "react";

/**
 * Adds `is-scrolling` to <html> while the user scrolls and removes it after
 * 800ms of inactivity. This drives the show/hide scrollbar thumb in index.css.
 */
const useScrollbar = () => {
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const handleScroll = () => {
            document.documentElement.classList.add("is-scrolling");
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                document.documentElement.classList.remove("is-scrolling");
            }, 800);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
        };
    }, []);
};

export default useScrollbar;
