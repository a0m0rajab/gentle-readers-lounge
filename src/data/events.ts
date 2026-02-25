export interface EventAttendee {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

export interface EventPhoto {
  id: string;
  url: string;
  caption?: string;
  featured?: boolean;
}

export interface BookEvent {
  id: string;
  bookSlug: string;
  date: string;
  location: string;
  description?: string;
  attendeeCount: number;
  attendees: EventAttendee[];
  photos: EventPhoto[];
  highlights?: string[];
}

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

export const getEventById = (id: string): BookEvent | undefined => {
  return events.find(event => event.id === id);
};

export const getEventMDXComponent = (id: string): React.ComponentType | null => {
  const entry = Object.entries(mdxModules).find(
    ([path]) => path.replace("../content/events/", "").replace(".mdx", "") === id
  );
  return entry ? entry[1].default : null;
};

export const getEventByBookSlug = (bookSlug: string): BookEvent | undefined => {
  return events.find(event => event.bookSlug === bookSlug);
};

export const getAllEvents = (): BookEvent[] => {
  return events;
};

export const getRecentEvents = (count: number = 3): BookEvent[] => {
  return events.slice(0, count);
};
