import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import sitemapPlugin from "./plugins/sitemap-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    {
      enforce: "pre" as const,
      ...mdx({
        remarkPlugins: [remarkGfm],
        // Prevent production bundles from calling jsxDEV (dev-only).
        development: mode === "development",
        // Enable MDXProvider components mapping.
        providerImportSource: "@mdx-js/react",
        // Use the React automatic JSX runtime.
        jsxRuntime: "automatic",
        jsxImportSource: "react",
      }),
    },
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ensure production bundles can execute even if some MDX output uses jsxDEV.
      "react/jsx-dev-runtime": path.resolve(__dirname, "./src/lib/jsx-dev-runtime-shim.ts"),
    },
  },
}));
