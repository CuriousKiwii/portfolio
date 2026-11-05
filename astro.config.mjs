// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages: https://curiouskiwii.github.io/portfolio/
export default defineConfig({
  site: "https://curiouskiwii.github.io",
  base: "/portfolio",
  vite: {
    plugins: [tailwindcss()],
    css: {
      // Some older libraries ship old-IE "star hacks"; strip them instead of failing.
      lightningcss: { errorRecovery: true },
      preprocessorOptions: {
        scss: { quietDeps: true, silenceDeprecations: ["if-function", "import", "global-builtin"] },
      },
    },
    build: { chunkSizeWarningLimit: 1500 },
  },
});
