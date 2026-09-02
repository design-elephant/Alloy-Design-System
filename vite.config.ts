import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev server + demo build. Library build is handled separately via `tsc`.
export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist-demo",
  },
});
