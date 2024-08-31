import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import url from "url";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        proxy: {
            "/api": {
                target: "http://13.124.197.8:8080",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "~components": path.resolve(__dirname, "./src/components"),
            "~assets": path.resolve(__dirname, "./src/assets"),
            "~apis": path.resolve(__dirname, "./src/lib/apis"),
            "~store": path.resolve(__dirname, "./src/store"),
        },
    },
});
