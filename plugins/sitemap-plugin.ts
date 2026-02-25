import type { Plugin } from "vite";
import fs from "node:fs";
import nodePath from "node:path";

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

function getBookSlugs(): string[] {
  const booksFile = fs.readFileSync(
    nodePath.resolve(__dirname, "../src/data/books.ts"),
    "utf-8"
  );
  const slugs: string[] = [];
  const re = /slug:\s*["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(booksFile)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function buildSitemap(): string {
  const today = new Date().toISOString().split("T")[0];
  const allUrls = [
    ...STATIC_ROUTES.map((r) => ({ loc: `${BASE_URL}${r}`, priority: r === "/" ? "1.0" : "0.8" })),
    ...getBookSlugs().map((slug) => ({ loc: `${BASE_URL}/book/${slug}`, priority: "0.7" })),
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
    writeBundle(options) {
      const outDir = options.dir || nodePath.resolve("dist");
      fs.writeFileSync(nodePath.join(outDir, "sitemap.xml"), buildSitemap(), "utf-8");
      console.log("✅ sitemap.xml generated");
    },
    configureServer(server) {
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
