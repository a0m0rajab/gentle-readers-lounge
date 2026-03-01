

## Image Gallery Page

Create a dedicated `/gallery` page that aggregates all photos from every event into a single, visually rich masonry-style grid inspired by the Vercel image gallery pattern.

### Design

- Full-width masonry grid using CSS columns (2 on mobile, 3 on tablet, 4 on desktop)
- Each photo card shows the image with a hover overlay revealing the caption and which event/book it belongs to
- Clicking a photo opens the existing Lightbox component for full-screen viewing with navigation across ALL photos
- Optional filter pills at the top to filter by event/book
- Minimal hero with title "Gallery" and a subtitle

### Implementation

1. **Create `src/pages/Gallery.tsx`**
   - Import `getAllEvents` to collect every photo across all events
   - Flatten all event photos into a single array, enriching each with its parent event's book title and date
   - Render a CSS columns-based masonry layout (`columns-2 md:columns-3 lg:columns-4 gap-4`)
   - Each image uses `break-inside-avoid` for proper masonry flow
   - Hover overlay shows caption + book name badge
   - Click opens the existing `Lightbox` component, passing the full flattened photo array
   - Add filter pills for each event/book at the top

2. **Add route in `src/App.tsx`**
   - Add `/gallery` route pointing to the new page

3. **Add navigation link in `src/components/Header.tsx`**
   - Add "Gallery" to the site navigation

