import type { Plugin } from "vite";

const BASE_URL = "https://gentlereaders.club";

const STATIC_ROUTES = [
  "/",
  "/books",
  "/events",
  "/about",
  "/membership",
  "/contact",
  "/nominate",
  "/guides",
];

// Book slugs — keep in sync with src/data/books.ts
const BOOK_SLUGS = [
  "the-phoenix-project",
  "how-google-works",
  "refactoring-ui",
  "the-house-of-spirits",
  "circe",
  "beloved",
  "the-secret-history",
  "pachinko",
  "one-hundred-years-of-solitude",
  "the-remains-of-the-day",
  "the-secret-history",
];

function buildSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  const allUrls = [
    ...STATIC_ROUTES.map((r) => ({ loc: `${BASE_URL}${r}`, priority: r === "/" ? "1.0" : "0.8" })),
    ...[...new Set(BOOK_SLUGS)].map((slug) => ({ loc: `${BASE_URL}/book/${slug}`, priority: "0.7" })),
  ];

  const entries = allUrls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export default function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    closeBundle() {
      // Write sitemap.xml into the dist output during build
      const fs = require("fs");
      const path = require("path");
      const outDir = path.resolve(__dirname, "../dist");
      if (fs.existsSync(outDir)) {
        fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap(), "utf-8");
        console.log("✅ sitemap.xml generated");
      }
    },
    configureServer(server) {
      // Serve sitemap.xml during dev
      server.middlewares.use((req, res, next) => {
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          res.end(buildSitemap());
          return;
        }
        next();
      });
    },
  };
}
