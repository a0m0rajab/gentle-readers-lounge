import type { BookStatsData } from "@/components/BookStats";

export const bookStats: Record<string, BookStatsData> = {
  "the-house-of-spirits": {
    totalAttendees: 24,
    averageRating: 4.5,
    totalDiscussions: 3,
    readingTime: "3 weeks",
    completionRate: 88,
    topContributor: "Elena R.",
    attendeeBreakdown: {
      firstTimers: 5,
      regulars: 12,
      veterans: 7,
    },
  },
  "circe": {
    totalAttendees: 31,
    averageRating: 4.7,
    totalDiscussions: 4,
    readingTime: "2.5 weeks",
    completionRate: 94,
    topContributor: "Priya S.",
    attendeeBreakdown: {
      firstTimers: 8,
      regulars: 15,
      veterans: 8,
    },
  },
  "beloved": {
    totalAttendees: 28,
    averageRating: 4.8,
    totalDiscussions: 5,
    readingTime: "3 weeks",
    completionRate: 79,
    topContributor: "Angela W.",
    attendeeBreakdown: {
      firstTimers: 4,
      regulars: 16,
      veterans: 8,
    },
  },
  "the-secret-history": {
    totalAttendees: 35,
    averageRating: 4.4,
    totalDiscussions: 4,
    readingTime: "3.5 weeks",
    completionRate: 91,
    topContributor: "Rachel K.",
    attendeeBreakdown: {
      firstTimers: 10,
      regulars: 17,
      veterans: 8,
    },
  },
  "one-hundred-years-of-solitude": {
    totalAttendees: 29,
    averageRating: 4.6,
    totalDiscussions: 5,
    readingTime: "4 weeks",
    completionRate: 72,
    topContributor: "Carlos M.",
    attendeeBreakdown: {
      firstTimers: 6,
      regulars: 15,
      veterans: 8,
    },
  },
  "the-remains-of-the-day": {
    totalAttendees: 26,
    averageRating: 4.5,
    totalDiscussions: 3,
    readingTime: "1.5 weeks",
    completionRate: 96,
    topContributor: "Margaret T.",
    attendeeBreakdown: {
      firstTimers: 4,
      regulars: 14,
      veterans: 8,
    },
  },
  "pachinko": {
    totalAttendees: 33,
    averageRating: 4.6,
    totalDiscussions: 4,
    readingTime: "3.5 weeks",
    completionRate: 85,
    topContributor: "Mei L.",
    attendeeBreakdown: {
      firstTimers: 7,
      regulars: 18,
      veterans: 8,
    },
  },
};

export const getBookStats = (slug: string): BookStatsData | undefined => {
  return bookStats[slug];
};
