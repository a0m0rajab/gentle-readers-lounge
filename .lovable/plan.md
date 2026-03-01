

## Layout Issues on /books Page

Based on browser inspection, the page has these problems:

1. **Past Reads header row is not visible** — The "Past Reads" label, search input, and 9 genre filter buttons are all crammed into a single flex row. They exist in the DOM but are effectively invisible or pushed off-screen.

2. **Book grid only shows 1 card** — All 10 book cards are in the DOM but only the last one ("The Remains of the Day") is visible. The others appear to be rendered with zero visible area or stacked.

3. **Search/filter controls overflow** — 9 genre buttons + search input don't fit in a single row alongside the "Past Reads" label.

## Plan

### Fix the Past Reads section layout in `src/pages/Books.tsx`:

1. **Restructure the header**: Move "Past Reads" to its own row as a proper section heading (like "Currently Reading" above it), not sharing a flex row with the controls.

2. **Stack search and filters vertically**: Place the search input on one line, genre filter pills below it — both full-width. This gives filters breathing room.

3. **Ensure grid renders properly**: Change the grid to `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` for better density and verify no parent container clips overflow.

4. **Reduce hero section padding**: The hero has `py-20 md:py-24` which creates excessive whitespace. Trim to `py-12 md:py-16`.

