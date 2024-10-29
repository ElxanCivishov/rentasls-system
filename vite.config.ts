import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }],
    },
});
