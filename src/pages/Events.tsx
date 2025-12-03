import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Camera, MapPin, Calendar, Users, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllEvents, BookEvent } from "@/data/events";
import { getBookBySlug } from "@/data/books";

const EventCard = ({ event }: { event: BookEvent }) => {
  const book = getBookBySlug(event.bookSlug);
  
  return (
    <article 
      id={event.bookSlug}
      className="bg-card border border-border rounded-2xl overflow-hidden scroll-mt-28"
    >
      {/* Event Header */}
      <div className="p-6 lg:p-8 border-b border-border/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
              <Camera className="w-4 h-4" />
              <span className="text-xs font-medium small-caps tracking-wider">Event Archive</span>
            </div>
            {book && (
              <Link 
                to={`/book/${book.slug}`}
                className="font-serif text-2xl lg:text-3xl text-foreground hover:text-primary transition-colors"
              >
                {book.title}
              </Link>
            )}
            <p className="font-body text-muted-foreground mt-1 italic">by {book?.author}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
          </div>
        </div>
        
        {event.description && (
          <p className="mt-4 text-muted-foreground font-body">{event.description}</p>
        )}
      </div>

      {/* Photo Gallery - Full Grid */}
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {event.photos.map((photo, index) => (
            <div 
              key={photo.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                photo.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
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
                  <p className="absolute bottom-4 left-4 right-4 text-primary-foreground font-body">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendees & Highlights */}
      <div className="px-6 lg:px-8 pb-6 lg:pb-8">
        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
          {/* Attendees */}
          <div>
            <p className="text-xs text-muted-foreground small-caps tracking-wider mb-4">Attendees</p>
            <div className="flex flex-wrap gap-3">
              {event.attendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1">
                  <Avatar className="w-7 h-7">
                    {attendee.avatar ? (
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                    ) : null}
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
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground small-caps tracking-wider mb-4">Discussion Highlights</p>
              <ul className="space-y-2">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Link to Book */}
        {book && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <Link 
              to={`/book/${book.slug}`}
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors group"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Book Details & Discussion</span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

const Events = () => {
  const location = useLocation();
  const events = getAllEvents();

  // Scroll to hash on load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body text-sm">Back to Home</span>
            </Link>

            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium small-caps tracking-wider">Event Archive</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Our Gatherings
              </h1>
              <p className="font-body text-xl text-muted-foreground leading-relaxed">
                A visual journey through our book club meetings—capturing the conversations, 
                connections, and memorable moments we've shared over great literature.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="space-y-12">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Empty State */}
            {events.length === 0 && (
              <div className="text-center py-20">
                <Camera className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-2">No Events Yet</h3>
                <p className="text-muted-foreground">Check back soon for photos from our gatherings.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
