

## Plan: Dynamic book slugs in sitemap plugin

The sitemap plugin currently hardcodes book slugs. We'll make it read them from `src/data/books.ts` automatically.

### Problem
`plugins/sitemap-plugin.ts` has a static `BOOK_SLUGS` array that must be manually updated when books are added.

### Approach
Since the plugin runs in Node (Vite build context), we cannot directly import the TypeScript source with path aliases. Instead, we'll extract just the slug list by reading and parsing the source file at build/serve time using a simple regex, avoiding any need for TypeScript compilation in the plugin.

### Changes

**`plugins/sitemap-plugin.ts`**
- Remove the hardcoded `BOOK_SLUGS` array.
- Add a `getBookSlugs()` function that reads `src/data/books.ts` as text and extracts all `slug: "..."` values via regex (`/slug:\s*["']([^"']+)["']/g`).
- Use `getBookSlugs()` inside `buildSitemap()` to generate book URLs dynamically.
- This is simple, has zero extra dependencies, and works in both dev server and build hooks.

### Technical detail

The regex approach is reliable here because `slug: "some-value"` is a consistent, simple pattern in the books data file. If the data format ever changes (e.g., computed slugs), this would need revisiting — but for a static data array it's robust.

