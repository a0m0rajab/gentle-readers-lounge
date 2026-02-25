

## Plan: Merge All Hardcoded Book Data into MDX Frontmatter

Three separate hardcoded data sources need to be consolidated into the MDX frontmatter:

1. **`src/data/bookStats.ts`** — stats like totalAttendees, averageRating, completionRate, etc.
2. **`ReadingGuides.tsx` → `bookThemes`** — theme tag arrays per book
3. **`ReadingGuides.tsx` → `bookHighlights`** — discussion highlight strings per book

### New frontmatter fields per MDX file

Each book's MDX frontmatter gains these new fields:

```yaml
# Stats (from bookStats.ts)
totalAttendees: 18
averageRating: 4.4
totalDiscussions: 2
readingTime: "2.5 weeks"
completionRate: 92
topContributor: "Marcus T."
firstTimers: 6
regulars: 8
veterans: 4

# Reading Guides metadata (from ReadingGuides.tsx)
themes:
  - "DevOps"
  - "IT Management"
  - "Business Fiction"
highlight: "The story illustrates how IT principles mirror manufacturing..."
```

The nested `attendeeBreakdown` object is flattened to three top-level fields (`firstTimers`, `regulars`, `veterans`) since YAML frontmatter works best with flat structures and `remark-mdx-frontmatter` exports them as simple named values.

### Files to modify

| File | Change |
|------|--------|
| `src/content/books/*.mdx` (10 files) | Add stats, themes, highlight fields to frontmatter |
| `src/data/books.ts` | Expand `Book` interface and `MDXBookModule` to include new fields; export stats/themes/highlight as part of the book object |
| `src/types/mdx.d.ts` | Add new named exports for the new frontmatter fields |
| `src/pages/ReadingGuides.tsx` | Remove hardcoded `bookThemes`, `bookHighlights`, and `bookStats` import; read from `books` array instead |
| `src/pages/BookDetail.tsx` | Remove `getBookStats` import; build stats object from book fields |
| `src/components/BookStats.tsx` | No changes needed (interface stays the same, just receives data differently) |

### Files to delete

| File | Reason |
|------|--------|
| `src/data/bookStats.ts` | All data moves into MDX frontmatter |

### How data flows after the change

```text
MDX frontmatter → import.meta.glob → books array (with stats/themes/highlight)
                                        ↓
                            ReadingGuides.tsx reads book.themes, book.highlight
                            BookDetail.tsx builds BookStatsData from book fields
```

### Detail on key changes

**`src/data/books.ts`** — The `Book` interface gains:
```ts
totalAttendees?: number;
averageRating?: number;
totalDiscussions?: number;
readingTime?: string;
completionRate?: number;
topContributor?: string;
firstTimers?: number;
regulars?: number;
veterans?: number;
themes?: string[];
highlight?: string;
```

A new helper `getBookStats(slug)` is exported from this file to construct the `BookStatsData` shape from the flat fields, keeping the `BookStats` component unchanged.

**`src/pages/ReadingGuides.tsx`** — The two hardcoded objects and the `bookStats` import are removed. The template reads `book.themes`, `book.highlight`, and `book.totalAttendees` directly.

**`src/pages/BookDetail.tsx`** — Replaces `import { getBookStats } from "@/data/bookStats"` with the new helper from `books.ts`.

### Result

After this change, adding a new book with full stats, themes, and highlights requires editing only one MDX file. Zero separate data files.

