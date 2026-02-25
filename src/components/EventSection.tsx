import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { getAllEvents } from "@/data/events";
import { getBookBySlug } from "@/data/books";
import { parse, isAfter } from "date-fns";

const getFutureEvents = () => {
  const allEvents = getAllEvents();
  const now = new Date();
  return allEvents
    .filter((event) => {
      const eventDate = parse(event.date, "MMMM d, yyyy", new Date());
      return isAfter(eventDate, now);
    })
    .sort((a, b) => {
      const dateA = parse(a.date, "MMMM d, yyyy", new Date());
      const dateB = parse(b.date, "MMMM d, yyyy", new Date());
      return dateA.getTime() - dateB.getTime();
    });
};

const EventSection = () => {
  const futureEvents = getFutureEvents();

  return (
    <section id="schedule" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="small-caps text-xs tracking-[0.3em] text-accent mb-3">
            Mark Your Calendar
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
            Discussion Schedule
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Join us for thoughtful conversations, literary explorations, and the
            warmth of shared reading experiences.
          </p>
        </div>

        {/* Events Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {futureEvents.length > 0 ? (
            futureEvents.map((event, index) => {
              const book = getBookBySlug(event.bookSlug);
              return (
                <div
                  key={event.id}
                  className="bg-card rounded-xl border border-border p-6 md:p-8 hover-lift group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-center group-hover:bg-primary/20 transition-colors">
                        <span className="font-serif text-2xl font-semibold text-primary">
                          {event.date.split(" ")[1]?.replace(",", "")}
                        </span>
                        <span className="text-xs text-muted-foreground small-caps tracking-wider">
                          {event.date.split(" ")[0]?.slice(0, 3)}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow">
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {book?.title || event.bookSlug}
                      </h3>
                      {book?.author && (
                        <p className="text-sm text-muted-foreground italic mb-3">
                          by {book.author}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex-shrink-0">
                      <Link to={`/event/${event.id}`}>
                        <Button variant="outline" className="w-full md:w-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-xl text-muted-foreground mb-2">
                No upcoming events scheduled
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon or browse our{" "}
                <Link to="/events" className="text-accent hover:underline">
                  past events
                </Link>.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Never Miss a Gathering
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Subscribe to our newsletter for reading recommendations, event
              reminders, and exclusive literary content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-grow px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-body"
              />
              <Button variant="literary">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
