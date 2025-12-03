import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Camera, MapPin, Calendar, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllEvents, BookEvent } from "@/data/events";
import { getBookBySlug } from "@/data/books";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const EventCard = ({ event, index }: { event: BookEvent; index: number }) => {
  const book = getBookBySlug(event.bookSlug);
  
  return (
    <motion.article 
      id={event.bookSlug}
      className="bg-card border border-border rounded-2xl overflow-hidden scroll-mt-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Event Header */}
      <motion.div 
        className="p-6 lg:p-8 border-b border-border/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
      </motion.div>

      {/* Photo Gallery - Full Grid */}
      <div className="p-6 lg:p-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {event.photos.map((photo, photoIndex) => (
            <motion.div 
              key={photo.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                photo.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
              variants={photoVariants}
              transition={{ delay: photoIndex * 0.08 }}
              whileHover={{ scale: 1.02 }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Attendees & Highlights */}
      <motion.div 
        className="px-6 lg:px-8 pb-6 lg:pb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
          {/* Attendees */}
          <div>
            <p className="text-xs text-muted-foreground small-caps tracking-wider mb-4">Attendees</p>
            <motion.div 
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {event.attendees.map((attendee, i) => (
                <motion.div 
                  key={attendee.id} 
                  className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1"
                  variants={fadeInUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <Avatar className="w-7 h-7">
                    {attendee.avatar ? (
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {attendee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{attendee.name}</span>
                </motion.div>
              ))}
              {event.attendeeCount > event.attendees.length && (
                <motion.div 
                  className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-1"
                  variants={fadeInUp}
                >
                  <span className="text-sm text-muted-foreground">
                    +{event.attendeeCount - event.attendees.length} more
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground small-caps tracking-wider mb-4">Discussion Highlights</p>
              <motion.ul 
                className="space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {event.highlights.map((highlight, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                    variants={fadeInUp}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-accent mt-0.5">•</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          )}
        </div>

        {/* Link to Book */}
        {book && (
          <motion.div 
            className="mt-6 pt-6 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link 
              to={`/book/${book.slug}`}
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors group"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Book Details & Discussion</span>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.article>
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-body text-sm">Back to Home</span>
              </Link>
            </motion.div>

            <div className="max-w-3xl">
              <motion.div 
                className="flex items-center gap-2 text-accent mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium small-caps tracking-wider">Event Archive</span>
              </motion.div>
              <motion.h1 
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Gatherings
              </motion.h1>
              <motion.p 
                className="font-body text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                A visual journey through our book club meetings—capturing the conversations, 
                connections, and memorable moments we've shared over great literature.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="space-y-12">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {events.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Camera className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-foreground mb-2">No Events Yet</h3>
                <p className="text-muted-foreground">Check back soon for photos from our gatherings.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
