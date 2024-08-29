import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        proxy: {
            "/api": {
                target: "http://43.203.224.71:8083",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "~components": path.resolve(__dirname, "./src/components"),
            "~assets": path.resolve(__dirname, "./src/assets"),
            "~apis": path.resolve(__dirname, "./src/lib/apis"),
        },
    },
});
