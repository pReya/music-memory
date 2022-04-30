import { defineConfig } from "vite";

export default defineConfig({
  server: {
    hmr: {
      host: "a2cc-2a02-8108-4cc0-2890-538-7f70-439-81e9.ngrok.io",
      clientPort: 443,
    },
  },
});
