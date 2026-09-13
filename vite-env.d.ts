/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],

    optimizeDeps: {
      exclude: ["maplibre-gl"],
    },

    // عند التشغيل المحلي اجبره على التعرّف على الجذر /
    base: command === "serve" ? "/" : "/React-Online-Store-Only-FrontEnd/",
  };
});