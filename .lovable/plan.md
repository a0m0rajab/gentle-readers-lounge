

## How Books Work Today

Adding a new book currently requires editing **two separate files**:

1. **`src/data/books.ts`** — Add all metadata (title, author, slug, genre, pageCount, readerCount, description, discussionQuestions, meetingDate, color, isCurrent, coverImage import)
2. **`src/content/books/{slug}.mdx`** — Write the rich content (themes, reviews, discussion highlights, reading companion)

Plus optionally importing a cover image in the data file. This is error-prone and duplicative.

---

## Proposed Simplification: MDX Frontmatter as Single Source of Truth

Consolidate everything into a single MDX file per book using frontmatter for metadata.

### New MDX file format

Each book file (`src/content/books/{slug}.mdx`) becomes:

```text
---
title: "The Phoenix Project"
author: "Gene Kim, Kevin Behr & George Spafford"
genre: "Business Fiction"
month: "Jan 2025"
pageCount: 382
readerCount: 18
isCurrent: true
color: "from-orange-600 via-red-600 to-orange-800"
meetingDate: "January 18, 2025"
coverImage: "/covers/the-phoenix-project.jpg"
description: "A novel about IT, DevOps..."
discussionQuestions:
  - "How does the story illustrate..."
  - "What parallels do you see..."
---

import { BookQuote, ReadingNote } from "@/components/mdx/MDXComponents";

## About This Selection
...rest of MDX content...
```

### Changes required

1. **Install `gray-matter`** — Parse YAML frontmatter from MDX files at build time.

2. **Add `remark-frontmatter`** — So the MDX compiler strips frontmatter from rendered output (prevents it showing as text).

3. **Create `src/data/books-loader.ts`** — A new module that uses `import.meta.glob` with `{ eager: true }` to load all MDX modules, extract frontmatter metadata, and export the same `books` array plus helper functions (`getAllBooks`, `getBookBySlug`, etc.) that the rest of the app already uses.

4. **Move cover images to `public/covers/`** — Reference them as simple strings (`"/covers/the-phoenix-project.jpg"`) instead of requiring TypeScript imports in a data file.

5. **Update `src/data/books.ts`** — Replace the hardcoded array with re-exports from the loader, keeping the same API so nothing else breaks.

6. **Update `src/pages/BookDetail.tsx`** — Minor adjustment: frontmatter is already available from the MDX module, so no separate data lookup is needed (but we keep backward compatibility).

7. **Update `plugins/sitemap-plugin.ts`** — The regex approach still works since slugs come from filenames.

8. **Convert existing MDX files** — Add frontmatter blocks to all 10 existing MDX files, pulling metadata from the current `books.ts`.

### How to add a book after this change

One step: create a single MDX file with frontmatter + content. No other files to edit. The book automatically appears in the library, carousel, sitemap, and detail pages.

### Files to create/modify

| File | Action |
|------|--------|
| `src/content/books/*.mdx` (10 files) | Add frontmatter metadata |
| `src/data/books-loader.ts` | Create — glob MDX, extract metadata |
| `src/data/books.ts` | Simplify — re-export from loader |
| `src/pages/BookDetail.tsx` | Minor update for frontmatter access |
| `public/covers/*` | Move 3 images from `src/assets/covers/` |
| `package.json` | Add `gray-matter`, `remark-frontmatter` |
| `vite.config.ts` | Add remark-frontmatter to MDX plugin config |

