

## Plan: Convert Events to MDX Files

### Problem
Event data is hardcoded in `src/data/events.ts`. Following the established pattern where MDX frontmatter is the single source of truth, events should also live in MDX files.

### Approach
Create MDX files in `src/content/events/` with all event metadata in YAML frontmatter, including nested arrays (attendees, photos). Load them via `import.meta.glob` just like books.

### New directory: `src/content/events/`

One MDX file per event, named by event ID:

| File | Source Event |
|------|-------------|
| `beloved-oct-2024.mdx` | Beloved discussion |
| `circe-nov-2024.mdx` | Circe discussion |
| `secret-history-sep-2024.mdx` | The Secret History discussion |
| `solitude-aug-2024.mdx` | One Hundred Years of Solitude discussion |
| `remains-jul-2024.mdx` | The Remains of the Day discussion |
| `pachinko-jun-2024.mdx` | Pachinko discussion |

### Frontmatter structure

Each event MDX file will contain YAML frontmatter like:

```yaml
---
bookSlug: "beloved"
date: "October 20, 2024"
location: "Inkwell Café, Downtown"
description: "An intimate evening discussing..."
attendeeCount: 28
attendees:
  - name: "Sarah Mitchell"
    initials: "SM"
  - name: "James Chen"
    initials: "JC"
photos:
  - url: "https://images.unsplash.com/..."
    caption: "Setting up for the evening"
    featured: true
  - url: "https://images.unsplash.com/..."
    caption: "Deep in discussion"
highlights:
  - "Explored the symbolism of water throughout the novel"
  - "Discussed the role of community in healing"
---

Optional MDX body content for richer event writeups in the future.
```

The `id` field is derived from the filename (same pattern as book slugs). Attendee `id` fields are auto-generated at load time from the array index.

### Files to modify

| File | Change |
|------|--------|
| `src/content/events/*.mdx` (6 new files) | Create event MDX files with frontmatter |
| `src/data/events.ts` | Replace hardcoded array with `import.meta.glob` loader; keep interfaces and helper functions |
| `src/types/mdx.d.ts` | No change needed (event MDX files are loaded via glob typing, not direct imports) |

### Files to delete

None. `src/data/events.ts` is kept but refactored to load from MDX instead of hardcoding.

### Technical detail: `src/data/events.ts` refactoring

The file will:
1. Keep the `EventAttendee`, `EventPhoto`, and `BookEvent` interfaces unchanged
2. Replace the hardcoded `events` array with an `import.meta.glob` eager loader for `../content/events/*.mdx`
3. Map frontmatter to the existing `BookEvent` shape, generating `id` from the filename and attendee `id` from array index
4. Keep `getEventByBookSlug`, `getAllEvents`, and `getRecentEvents` functions unchanged

```ts
interface EventFrontmatter {
  bookSlug: string;
  date: string;
  location: string;
  description?: string;
  attendeeCount: number;
  attendees: { name: string; avatar?: string; initials: string }[];
  photos: { url: string; caption?: string; featured?: boolean }[];
  highlights?: string[];
}

interface MDXEventModule {
  default: React.ComponentType;
  frontmatter: EventFrontmatter;
}

const mdxModules = import.meta.glob<MDXEventModule>(
  "../content/events/*.mdx",
  { eager: true }
);

export const events: BookEvent[] = Object.entries(mdxModules).map(
  ([path, mod]) => {
    const id = path.replace("../content/events/", "").replace(".mdx", "");
    const fm = mod.frontmatter;
    return {
      id,
      bookSlug: fm.bookSlug,
      date: fm.date,
      location: fm.location,
      description: fm.description,
      attendeeCount: fm.attendeeCount,
      attendees: fm.attendees.map((a, i) => ({ id: String(i + 1), ...a })),
      photos: fm.photos.map((p, i) => ({ id: `${id}-${i}`, ...p })),
      highlights: fm.highlights,
    };
  }
);
```

### Data flow after the change

```text
MDX frontmatter (src/content/events/*.mdx)
  → import.meta.glob (eager)
  → events array (BookEvent[])
  → getEventByBookSlug / getAllEvents / getRecentEvents
  → Events.tsx, BookDetail.tsx, EventGallery.tsx (unchanged)
```

### Consumer impact
Zero. The `BookEvent` interface and all helper functions keep the same signatures. `Events.tsx`, `BookDetail.tsx`, and `EventGallery.tsx` require no changes.

