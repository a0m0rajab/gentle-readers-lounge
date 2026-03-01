import { useState, useMemo } from "react";
import { getAllEvents } from "@/data/events";
import { getBookBySlug } from "@/data/books";
import { EventPhoto } from "@/data/events";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";

interface EnrichedPhoto extends EventPhoto {
  bookTitle: string;
  bookSlug: string;
  eventDate: string;
}

const Gallery = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { photos, bookFilters } = useMemo(() => {
    const events = getAllEvents();
    const allPhotos: EnrichedPhoto[] = [];
    const filterSet = new Map<string, string>();

    for (const event of events) {
      const book = getBookBySlug(event.bookSlug);
      const bookTitle = book?.title ?? event.bookSlug;
      filterSet.set(event.bookSlug, bookTitle);

      for (const photo of event.photos) {
        allPhotos.push({
          ...photo,
          bookTitle,
          bookSlug: event.bookSlug,
          eventDate: event.date,
        });
      }
    }

    return {
      photos: allPhotos,
      bookFilters: Array.from(filterSet.entries()).map(([slug, title]) => ({
        slug,
        title,
      })),
    };
  }, []);

  const filteredPhotos = selectedBook
    ? photos.filter((p) => p.bookSlug === selectedBook)
    : photos;

  const lightboxPhotos = filteredPhotos.map((p) => ({
    id: p.id,
    url: p.url,
    caption: p.caption,
    featured: p.featured,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title="Gallery | The Gentle Readers Book Club"
        description="Browse photos from all our book club events and gatherings."
      />
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="container mx-auto px-6 py-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
            Gallery
          </h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Moments captured from our book club gatherings and discussions.
          </p>
        </section>

        {/* Filters */}
        {bookFilters.length > 1 && (
          <section className="container mx-auto px-6 pb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedBook === null ? "default" : "elegant"}
                size="sm"
                onClick={() => setSelectedBook(null)}
              >
                All
              </Button>
              {bookFilters.map((f) => (
                <Button
                  key={f.slug}
                  variant={selectedBook === f.slug ? "default" : "elegant"}
                  size="sm"
                  onClick={() => setSelectedBook(f.slug)}
                >
                  {f.title}
                </Button>
              ))}
            </div>
          </section>
        )}

        {/* Masonry Grid */}
        <section className="container mx-auto px-6 pb-20">
          {filteredPhotos.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              No photos yet.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredPhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  className="break-inside-avoid mb-4 w-full group relative rounded-lg overflow-hidden cursor-pointer block"
                  onClick={() => openLightbox(index)}
                  aria-label={photo.caption || "View photo"}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || "Event photo"}
                    className="w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100">
                    {photo.caption && (
                      <p className="text-background font-body text-sm mb-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {photo.bookTitle}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      <Lightbox
        photos={lightboxPhotos}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default Gallery;
