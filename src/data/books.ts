export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  color: string;
  month: string;
  genre: string;
  pageCount: number;
  readerCount: number;
  isCurrent: boolean;
  description: string;
  discussionQuestions: string[];
  meetingDate: string;
  coverImage?: string;
}

import phoenixProjectCover from "@/assets/covers/the-phoenix-project.jpg";
import howGoogleWorksCover from "@/assets/covers/how-google-works.jpg";
import refactoringUICover from "@/assets/covers/refactoring-ui.jpg";

export const books: Book[] = [
  {
    id: 1,
    slug: "the-phoenix-project",
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr & George Spafford",
    color: "from-orange-600 via-red-600 to-orange-800",
    month: "Jan 2025",
    genre: "Business Fiction",
    pageCount: 382,
    readerCount: 18,
    isCurrent: true,
    description: "A novel about IT, DevOps, and helping your business win. Bill Palmer is an IT manager who is suddenly promoted to VP of IT Operations when his predecessor is unexpectedly fired. The company is in crisis: a critical initiative called Phoenix is massively over budget and behind schedule. Bill must save the project and transform how IT operates using manufacturing principles that revolutionize how we think about technology work.",
    discussionQuestions: [
      "How does the story illustrate the connection between IT work and manufacturing principles?",
      "What parallels do you see between the Four Types of Work and your own experience?",
      "How did the relationship between IT and the business change throughout the book?",
      "What lessons about constraints and bottlenecks resonated most with you?"
    ],
    meetingDate: "January 18, 2025",
    coverImage: phoenixProjectCover
  },
  {
    id: 2,
    slug: "how-google-works",
    title: "How Google Works",
    author: "Eric Schmidt & Jonathan Rosenberg",
    color: "from-blue-500 via-green-500 to-yellow-500",
    month: "Dec 2024",
    genre: "Business & Technology",
    pageCount: 305,
    readerCount: 22,
    isCurrent: false,
    description: "Google Executive Chairman and former CEO Eric Schmidt and former SVP of Products Jonathan Rosenberg share the lessons they learned while helping to build one of the most successful companies of our time. From corporate culture to strategy, talent to decision-making, this book reveals the inner workings of one of the world's most innovative companies and provides a framework for success in the new technological age.",
    discussionQuestions: [
      "How does Google's approach to hiring 'smart creatives' differ from traditional hiring?",
      "What aspects of Google's culture could be applied to other organizations?",
      "How has Google balanced innovation with business sustainability?",
      "What surprised you most about Google's management philosophy?"
    ],
    meetingDate: "December 15, 2024",
    coverImage: howGoogleWorksCover
  },
  {
    id: 3,
    slug: "refactoring-ui",
    title: "Refactoring UI",
    author: "Adam Wathan & Steve Schoger",
    color: "from-violet-600 via-purple-600 to-indigo-700",
    month: "Nov 2024",
    genre: "Design & Development",
    pageCount: 252,
    readerCount: 27,
    isCurrent: false,
    description: "Learn how to design beautiful user interfaces by yourself using specific tactics explained from a developer's point-of-view. This isn't a book about design theory or principles—it's a collection of specific, actionable tips for improving your designs. Whether you're a developer who wants to create better-looking interfaces or a designer looking for practical techniques, this book provides concrete strategies for spacing, color, typography, hierarchy, and more.",
    discussionQuestions: [
      "Which design tactics have you already started applying to your projects?",
      "How does thinking about design 'systematically' change your approach?",
      "What was the most surprising insight about visual hierarchy?",
      "How can developers and designers better collaborate using these principles?"
    ],
    meetingDate: "November 20, 2024",
    coverImage: refactoringUICover
  },
  {
    id: 4,
    slug: "the-house-of-spirits",
    title: "The House of Spirits",
    author: "Isabel Allende",
    color: "from-primary via-primary to-forest-light",
    month: "Oct 2024",
    genre: "Magical Realism",
    pageCount: 433,
    readerCount: 24,
    isCurrent: false,
    description: "A sweeping multigenerational saga that weaves together the personal and political, the magical and the mundane. Through the eyes of the Trueba family, Allende paints a vivid portrait of love, ambition, and the indomitable spirit of women across generations. Set against the backdrop of social and political upheaval in an unnamed Latin American country, this novel explores themes of fate, memory, and the bonds that tie families together through joy and tragedy alike.",
    discussionQuestions: [
      "How does Allende use magical realism to enhance the story's emotional impact?",
      "What role do the women of the Trueba family play in shaping the narrative?",
      "How does the political backdrop influence the characters' personal journeys?",
      "In what ways does Clara's silence serve as both protest and protection?"
    ],
    meetingDate: "October 15, 2024"
  },
  {
    id: 5,
    slug: "circe",
    title: "Circe",
    author: "Madeline Miller",
    color: "from-amber-700 to-amber-900",
    month: "Sep 2024",
    genre: "Mythological Fiction",
    pageCount: 393,
    readerCount: 31,
    isCurrent: false,
    description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power—the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.",
    discussionQuestions: [
      "How does Circe's relationship with her power evolve throughout the novel?",
      "What role does isolation play in Circe's transformation and growth?",
      "How does Miller reimagine the traditional portrayal of Circe from The Odyssey?",
      "What does the novel say about the nature of immortality versus mortality?"
    ],
    meetingDate: "September 15, 2024"
  },
  {
    id: 6,
    slug: "beloved",
    title: "Beloved",
    author: "Toni Morrison",
    color: "from-rose-800 to-rose-950",
    month: "Aug 2024",
    genre: "Literary Fiction",
    pageCount: 324,
    readerCount: 28,
    isCurrent: false,
    description: "Sethe, a former slave living in Cincinnati after the Civil War, is haunted by the ghost of her baby, who died nameless and whose tombstone is engraved with a single word: Beloved. When a mysterious young woman arrives, calling herself Beloved, Sethe's family begins to unravel as the weight of the past refuses to stay buried.",
    discussionQuestions: [
      "How does Morrison use supernatural elements to explore the trauma of slavery?",
      "What does Beloved represent in the context of the novel's themes?",
      "How does memory function as both burden and necessity in the story?",
      "What role does community play in the characters' healing process?"
    ],
    meetingDate: "August 20, 2024"
  },
  {
    id: 7,
    slug: "the-secret-history",
    title: "The Secret History",
    author: "Donna Tartt",
    color: "from-slate-700 to-slate-900",
    month: "Jul 2024",
    genre: "Dark Academia",
    pageCount: 559,
    readerCount: 35,
    isCurrent: false,
    description: "Under the influence of their charismatic classics professor, a group of clever, eccentric misfits at an elite New England college discover a way of thinking and living that is a world away from the humdrum existence of their contemporaries. But when they go beyond the boundaries of normal morality, their lives are irrevocably changed.",
    discussionQuestions: [
      "How does the academic setting contribute to the novel's atmosphere?",
      "What commentary does Tartt make about beauty, morality, and obsession?",
      "How does Richard's outsider status affect his reliability as a narrator?",
      "What role does Greek philosophy play in the characters' justifications?"
    ],
    meetingDate: "July 18, 2024"
  }
];

export const getCurrentBook = (): Book | undefined => {
  return books.find(book => book.isCurrent);
};

export const getPastReads = (): Book[] => {
  return books.filter(book => !book.isCurrent);
};

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find(book => book.slug === slug);
};

export const getAllBooks = (): Book[] => {
  return books;
};
