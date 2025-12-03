import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { Button } from "./ui/button";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "virtual" | "in-person";
  book: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Monthly Discussion: The House of Spirits",
    date: "December 15, 2024",
    time: "7:00 PM EST",
    location: "Zoom Meeting",
    type: "virtual",
    book: "The House of Spirits",
  },
  {
    id: 2,
    title: "Author Spotlight: Latin American Literature",
    date: "December 22, 2024",
    time: "6:30 PM EST",
    location: "The Reading Room, Brooklyn",
    type: "in-person",
    book: "Various",
  },
  {
    id: 3,
    title: "New Year's Reading Goals Workshop",
    date: "January 5, 2025",
    time: "4:00 PM EST",
    location: "Zoom Meeting",
    type: "virtual",
    book: "N/A",
  },
];

const EventSection = () => {
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
          {events.map((event, index) => (
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
                      {event.date.split(" ")[1].replace(",", "")}
                    </span>
                    <span className="text-xs text-muted-foreground small-caps tracking-wider">
                      {event.date.split(" ")[0].slice(0, 3)}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.type === "virtual"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {event.type === "virtual" ? (
                        <Video className="w-3 h-3" />
                      ) : (
                        <MapPin className="w-3 h-3" />
                      )}
                      {event.type === "virtual" ? "Virtual" : "In-Person"}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <Button variant="outline" className="w-full md:w-auto">
                    <Calendar className="w-4 h-4 mr-2" />
                    RSVP
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
              <Button variant="literary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
