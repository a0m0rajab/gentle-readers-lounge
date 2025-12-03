import { Link } from "react-router-dom";
import { Camera, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookEvent } from "@/data/events";

interface EventGalleryProps {
  event: BookEvent;
  compact?: boolean;
}

const EventGallery = ({ event, compact = true }: EventGalleryProps) => {
  const displayedPhotos = compact ? event.photos.slice(0, 4) : event.photos;
  const remainingPhotos = event.photos.length - 4;
  const displayedAttendees = event.attendees.slice(0, 5);
  const remainingAttendees = event.attendeeCount - displayedAttendees.length;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2 text-accent mb-3">
          <Camera className="w-4 h-4" />
          <span className="text-xs font-medium small-caps tracking-wider">Event Memories</span>
        </div>
        <h3 className="font-serif text-xl text-foreground mb-4">Our Discussion Evening</h3>
        
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

      {/* Photo Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayedPhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 && compact ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className={`${index === 0 && compact ? "aspect-square" : "aspect-[4/3]"}`}>
                <img 
                  src={photo.url} 
                  alt={photo.caption || "Event photo"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption && (
                  <p className="absolute bottom-3 left-3 right-3 text-primary-foreground text-sm font-body">
                    {photo.caption}
                  </p>
                )}
              </div>
              
              {/* Show remaining count on last photo */}
              {compact && index === 3 && remainingPhotos > 0 && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                  <span className="text-primary-foreground font-serif text-2xl">+{remainingPhotos}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Attendees */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground small-caps tracking-wider mb-3">Who Was There</p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-3">
              {displayedAttendees.map((attendee) => (
                <Avatar key={attendee.id} className="w-10 h-10 border-2 border-background">
                  {attendee.avatar ? (
                    <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {attendee.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              {remainingAttendees > 0 && (
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-medium">+{remainingAttendees}</span>
                </div>
              )}
            </div>

            {compact && (
              <Link 
                to={`/events#${event.bookSlug}`}
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors group"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Highlights (shown in compact mode) */}
        {compact && event.highlights && event.highlights.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground small-caps tracking-wider mb-3">Discussion Highlights</p>
            <ul className="space-y-2">
              {event.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventGallery;
