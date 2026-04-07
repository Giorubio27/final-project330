import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        events: resolve(__dirname, "src/events/index.html"),
        fighters: resolve(__dirname, "src/fighters/index.html"),
        membership: resolve( __dirname, "src/membership/index.html"),
        merchandise: resolve(__dirname, "src/merchandise/index.html"),
        
      },
    },
  },
});
