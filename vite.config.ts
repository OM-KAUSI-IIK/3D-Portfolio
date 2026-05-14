import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor-react";
          }

          if (id.includes("node_modules/three") || id.includes("node_modules/three-stdlib")) {
            return "vendor-three";
          }

          if (id.includes("node_modules/gsap")) {
            return "vendor-gsap";
          }

          if (
            id.includes("node_modules/@react-three/fiber") ||
            id.includes("node_modules/@react-three/drei") ||
            id.includes("node_modules/@react-three/postprocessing") ||
            id.includes("node_modules/@react-three/rapier")
          ) {
            return "vendor-r3f";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "gsap", "react", "react-dom"],
  },
});
