import { defineConfig } from "vite";

export default defineConfig({
  server: {
    hmr: {
      host: "d05c-2a02-8108-4cc0-2890-6cad-4a37-e69f-29ec.ngrok.io",
      clientPort: 443,
    },
  },
});
