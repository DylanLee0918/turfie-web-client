import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@src": path.resolve(import.meta.dirname, "./src"),
            "@components": path.resolve(import.meta.dirname, "./src/components"),
            "@constants": path.resolve(import.meta.dirname, "./src/constants"),
            "@context": path.resolve(import.meta.dirname, "./src/context"),
            "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
            "@layouts": path.resolve(import.meta.dirname, "./src/layouts"),
            "@pages": path.resolve(import.meta.dirname, "./src/pages"),
            "@utils": path.resolve(import.meta.dirname, "./src/utils"),
            "@assets": path.resolve(import.meta.dirname, "./src/assets"),
            "@themes": path.resolve(import.meta.dirname, "./src/themes"),
        },
    },
    server: {
        port: 5173,
    },
});
