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

// Sample placeholder images using consistent colors
const placeholderImages = {
  cozy: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
  books: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  reading: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
  cafe: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop",
  library: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
  discussion: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  tea: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop",
  evening: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=400&fit=crop",
};

export const events: BookEvent[] = [
  {
    id: "beloved-oct-2024",
    bookSlug: "beloved",
    date: "October 20, 2024",
    location: "Inkwell Café, Downtown",
    description: "An intimate evening discussing Toni Morrison's powerful masterpiece. The conversation explored themes of memory, trauma, and healing.",
    attendeeCount: 28,
    attendees: [
      { id: "1", name: "Sarah Mitchell", initials: "SM" },
      { id: "2", name: "James Chen", initials: "JC" },
      { id: "3", name: "Olivia Rose", initials: "OR" },
      { id: "4", name: "Marcus Thompson", initials: "MT" },
      { id: "5", name: "Elena García", initials: "EG" },
      { id: "6", name: "David Kim", initials: "DK" },
    ],
    photos: [
      { id: "b1", url: placeholderImages.cozy, caption: "Setting up for the evening", featured: true },
      { id: "b2", url: placeholderImages.discussion, caption: "Deep in discussion" },
      { id: "b3", url: placeholderImages.tea, caption: "Tea and reflection" },
      { id: "b4", url: placeholderImages.books, caption: "Our copies well-loved" },
      { id: "b5", url: placeholderImages.cafe, caption: "The cozy corner" },
      { id: "b6", url: placeholderImages.evening, caption: "Evening winds down" },
    ],
    highlights: [
      "Explored the symbolism of water throughout the novel",
      "Discussed the role of community in healing",
      "Shared personal connections to themes of memory"
    ]
  },
  {
    id: "circe-nov-2024",
    bookSlug: "circe",
    date: "November 15, 2024",
    location: "The Reading Room",
    description: "A magical evening exploring mythology and feminine power through Miller's reimagining of the witch goddess.",
    attendeeCount: 31,
    attendees: [
      { id: "1", name: "Maya Patel", initials: "MP" },
      { id: "2", name: "Robert Hayes", initials: "RH" },
      { id: "3", name: "Lily Zhang", initials: "LZ" },
      { id: "4", name: "Nathan Brooks", initials: "NB" },
      { id: "5", name: "Sofia Martinez", initials: "SM" },
      { id: "6", name: "Alex Turner", initials: "AT" },
      { id: "7", name: "Emma Wilson", initials: "EW" },
    ],
    photos: [
      { id: "c1", url: placeholderImages.library, caption: "Our library setting", featured: true },
      { id: "c2", url: placeholderImages.reading, caption: "Reading favorite passages" },
      { id: "c3", url: placeholderImages.books, caption: "Annotated copies" },
      { id: "c4", url: placeholderImages.tea, caption: "Herbal tea in theme" },
      { id: "c5", url: placeholderImages.discussion, caption: "Lively debate" },
    ],
    highlights: [
      "Compared Miller's Circe to Homer's original",
      "Discussed themes of transformation and agency",
      "Explored the mother-son relationship"
    ]
  },
  {
    id: "secret-history-sep-2024",
    bookSlug: "the-secret-history",
    date: "September 18, 2024",
    location: "University Club Library",
    description: "A dark academia-themed evening that perfectly complemented Tartt's atmospheric novel.",
    attendeeCount: 35,
    attendees: [
      { id: "1", name: "Catherine Bell", initials: "CB" },
      { id: "2", name: "William Drake", initials: "WD" },
      { id: "3", name: "Isabella Frost", initials: "IF" },
      { id: "4", name: "Henry Morrison", initials: "HM" },
      { id: "5", name: "Grace Liu", initials: "GL" },
    ],
    photos: [
      { id: "sh1", url: placeholderImages.library, caption: "The perfect setting", featured: true },
      { id: "sh2", url: placeholderImages.evening, caption: "Candlelit discussion" },
      { id: "sh3", url: placeholderImages.books, caption: "Our weathered copies" },
      { id: "sh4", url: placeholderImages.cozy, caption: "Settling in" },
    ],
    highlights: [
      "Debated the reliability of Richard as narrator",
      "Analyzed the Greek influence on morality",
      "Discussed the dark academia aesthetic"
    ]
  },
  {
    id: "solitude-aug-2024",
    bookSlug: "one-hundred-years-of-solitude",
    date: "August 22, 2024",
    location: "Casa del Sol Garden",
    description: "An outdoor gathering celebrating García Márquez's masterpiece with Latin American refreshments.",
    attendeeCount: 29,
    attendees: [
      { id: "1", name: "Carmen Reyes", initials: "CR" },
      { id: "2", name: "Daniel Ortiz", initials: "DO" },
      { id: "3", name: "Rosa Mendez", initials: "RM" },
      { id: "4", name: "Fernando Silva", initials: "FS" },
    ],
    photos: [
      { id: "s1", url: placeholderImages.cafe, caption: "Garden setting", featured: true },
      { id: "s2", url: placeholderImages.discussion, caption: "Tracing the family tree" },
      { id: "s3", url: placeholderImages.reading, caption: "Reading aloud" },
    ],
    highlights: [
      "Created a Buendía family tree together",
      "Discussed cyclical time and fate",
      "Shared favorite magical moments"
    ]
  },
  {
    id: "remains-jul-2024",
    bookSlug: "the-remains-of-the-day",
    date: "July 17, 2024",
    location: "The English Garden Tea Room",
    description: "An afternoon tea gathering befitting Ishiguro's refined meditation on duty and regret.",
    attendeeCount: 26,
    attendees: [
      { id: "1", name: "Edward Clarke", initials: "EC" },
      { id: "2", name: "Victoria Shaw", initials: "VS" },
      { id: "3", name: "Thomas Reid", initials: "TR" },
    ],
    photos: [
      { id: "r1", url: placeholderImages.tea, caption: "Afternoon tea", featured: true },
      { id: "r2", url: placeholderImages.cozy, caption: "English setting" },
    ],
    highlights: [
      "Discussed Stevens' emotional repression",
      "Explored the meaning of dignity",
      "Reflected on missed opportunities"
    ]
  },
  {
    id: "pachinko-jun-2024",
    bookSlug: "pachinko",
    date: "June 19, 2024",
    location: "Hanok Cultural Center",
    description: "A moving discussion of Lee's multi-generational Korean epic, with Korean tea and snacks.",
    attendeeCount: 33,
    attendees: [
      { id: "1", name: "Ji-yeon Park", initials: "JP" },
      { id: "2", name: "Michael Yoon", initials: "MY" },
      { id: "3", name: "Hannah Kim", initials: "HK" },
      { id: "4", name: "Chris Tanaka", initials: "CT" },
      { id: "5", name: "Soo-min Lee", initials: "SL" },
    ],
    photos: [
      { id: "p1", url: placeholderImages.library, caption: "Cultural center", featured: true },
      { id: "p2", url: placeholderImages.discussion, caption: "Sharing stories" },
      { id: "p3", url: placeholderImages.tea, caption: "Korean tea ceremony" },
      { id: "p4", url: placeholderImages.books, caption: "Well-read copies" },
    ],
    highlights: [
      "Discussed Korean-Japanese identity",
      "Explored generational trauma and resilience",
      "Shared family immigration stories"
    ]
  },
];

export const getEventByBookSlug = (bookSlug: string): BookEvent | undefined => {
  return events.find(event => event.bookSlug === bookSlug);
};

export const getAllEvents = (): BookEvent[] => {
  return events;
};

export const getRecentEvents = (count: number = 3): BookEvent[] => {
  return events.slice(0, count);
};
