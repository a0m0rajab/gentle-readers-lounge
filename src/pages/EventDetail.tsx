import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, MapPin, Users, Camera } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getEventById, getEventMDXComponent, getAllEvents, EventPhoto } from "@/data/events";
import { getBookBySlug } from "@/data/books";
import { mdxComponents } from "@/components/mdx/MDXComponents";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = getEventById(id || "");
  const book = event ? getBookBySlug(event.bookSlug) : undefined;
  const allEvents = getAllEvents();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const MDXContent = useMemo(() => {
    if (!id) return null;
    return getEventMDXComponent(id);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
            <Link to="/events">
              <Button variant="literary">Browse All Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Navigation
  const currentIndex = allEvents.findIndex((e) => e.id === event.id);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-body text-sm">Back to Events</span>
              </Link>
            </motion.div>

            <div className="max-w-3xl">
              <motion.div
                className="flex items-center gap-2 text-accent mb-4"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium small-caps tracking-wider">Event Recap</span>
              </motion.div>

              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                {book?.title || event.bookSlug}
              </motion.h1>

              {book && (
                <motion.p
                  className="font-body text-xl text-secondary italic mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.25 }}
                >
                  by {book.author}
                </motion.p>
              )}

              <motion.div
                className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent/70" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent/70" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent/70" />
                  <span>{event.attendeeCount} attendees</span>
                </div>
              </motion.div>

              {event.description && (
                <motion.p
                  className="font-body text-lg text-muted-foreground leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.35 }}
                >
                  {event.description}
                </motion.p>
              )}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {event.photos.length > 0 && (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <p className="text-xs text-muted-foreground small-caps tracking-wider mb-6">Photo Gallery</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {event.photos.map((photo, i) => (
                    <motion.div
                      key={photo.id}
                      className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                        photo.featured ? "md:col-span-2 md:row-span-2" : ""
                      }`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handlePhotoClick(i)}
                    >
                      <div className={`${photo.featured ? "aspect-[4/3]" : "aspect-square"}`}>
                        <img
                          src={photo.url}
                          alt={photo.caption || "Event photo"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {photo.caption && (
                          <p className="absolute bottom-4 left-4 right-4 text-primary-foreground font-body text-sm">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MDX Body Content */}
        {MDXContent && (
          <section className="py-16 md:py-20 bg-card/50">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-3xl mx-auto prose-custom">
                <MDXProvider components={mdxComponents}>
                  <MDXContent />
                </MDXProvider>
              </div>
            </div>
          </section>
        )}

        {/* Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <p className="text-xs text-muted-foreground small-caps tracking-wider mb-6">Discussion Highlights</p>
                <ul className="space-y-3">
                  {event.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-accent mt-0.5">•</span>
                      <span className="font-body">{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Attendees */}
        <section className="py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs text-muted-foreground small-caps tracking-wider mb-6">
                Attendees ({event.attendeeCount})
              </p>
              <div className="flex flex-wrap gap-3">
                {event.attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1"
                  >
                    <Avatar className="w-7 h-7">
                      {attendee.avatar && <AvatarImage src={attendee.avatar} alt={attendee.name} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {attendee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{attendee.name}</span>
                  </div>
                ))}
                {event.attendeeCount > event.attendees.length && (
                  <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-1">
                    <span className="text-sm text-muted-foreground">
                      +{event.attendeeCount - event.attendees.length} more
                    </span>
                  </div>
                )}
              </div>

              {/* Link to book */}
              {book && (
                <div className="mt-10">
                  <Link
                    to={`/book/${book.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>View Book Details →</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              {prevEvent ? (
                <Link
                  to={`/event/${prevEvent.id}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs small-caps tracking-wider text-accent mb-1">Previous Event</p>
                    <p className="font-serif text-foreground">
                      {getBookBySlug(prevEvent.bookSlug)?.title || prevEvent.bookSlug}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextEvent ? (
                <Link
                  to={`/event/${nextEvent.id}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
                >
                  <div>
                    <p className="text-xs small-caps tracking-wider text-accent mb-1">Next Event</p>
                    <p className="font-serif text-foreground">
                      {getBookBySlug(nextEvent.bookSlug)?.title || nextEvent.bookSlug}
                    </p>
                  </div>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Lightbox
        photos={event.photos}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default EventDetail;
