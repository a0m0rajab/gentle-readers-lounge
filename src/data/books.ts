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
}

export const books: Book[] = [
  {
    id: 1,
    slug: "the-house-of-spirits",
    title: "The House of Spirits",
    author: "Isabel Allende",
    color: "from-primary via-primary to-forest-light",
    month: "Dec 2024",
    genre: "Magical Realism",
    pageCount: 433,
    readerCount: 24,
    isCurrent: true,
    description: "A sweeping multigenerational saga that weaves together the personal and political, the magical and the mundane. Through the eyes of the Trueba family, Allende paints a vivid portrait of love, ambition, and the indomitable spirit of women across generations. Set against the backdrop of social and political upheaval in an unnamed Latin American country, this novel explores themes of fate, memory, and the bonds that tie families together through joy and tragedy alike.",
    discussionQuestions: [
      "How does Allende use magical realism to enhance the story's emotional impact?",
      "What role do the women of the Trueba family play in shaping the narrative?",
      "How does the political backdrop influence the characters' personal journeys?",
      "In what ways does Clara's silence serve as both protest and protection?"
    ],
    meetingDate: "December 15, 2024"
  },
  {
    id: 2,
    slug: "circe",
    title: "Circe",
    author: "Madeline Miller",
    color: "from-amber-700 to-amber-900",
    month: "Nov 2024",
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
    meetingDate: "November 15, 2024"
  },
  {
    id: 3,
    slug: "beloved",
    title: "Beloved",
    author: "Toni Morrison",
    color: "from-rose-800 to-rose-950",
    month: "Oct 2024",
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
    meetingDate: "October 20, 2024"
  },
  {
    id: 4,
    slug: "the-secret-history",
    title: "The Secret History",
    author: "Donna Tartt",
    color: "from-slate-700 to-slate-900",
    month: "Sep 2024",
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
    meetingDate: "September 18, 2024"
  },
  {
    id: 5,
    slug: "one-hundred-years-of-solitude",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    color: "from-emerald-700 to-emerald-900",
    month: "Aug 2024",
    genre: "Magical Realism",
    pageCount: 417,
    readerCount: 29,
    isCurrent: false,
    description: "The brilliant, bestselling, landmark novel that tells the story of the Buendía family, and chronicles the irreconcilable conflict between the desire for solitude and the need for love. Deeply rooted in the mythology and superstitions of Latin America, this masterpiece blurs the distinction between reality and fantasy.",
    discussionQuestions: [
      "How does the cyclical nature of time function in the narrative?",
      "What significance do the recurring names hold for the Buendía family?",
      "How does Márquez blend the magical with the mundane so seamlessly?",
      "What does Macondo represent as both a physical and metaphorical space?"
    ],
    meetingDate: "August 22, 2024"
  },
  {
    id: 6,
    slug: "the-remains-of-the-day",
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    color: "from-stone-600 to-stone-800",
    month: "Jul 2024",
    genre: "Literary Fiction",
    pageCount: 258,
    readerCount: 26,
    isCurrent: false,
    description: "A profoundly compelling portrait of the perfect English butler and of his fading, insular world in postwar England. Stevens, the butler, embarks on a journey that leads him to confront the reality of his life, his profession, and his country.",
    discussionQuestions: [
      "How does Stevens' definition of dignity shape his life choices?",
      "What does the novel say about repressed emotion and its consequences?",
      "How does Ishiguro use the English landscape as a reflection of Stevens' inner world?",
      "What role does regret play in the narrative's emotional impact?"
    ],
    meetingDate: "July 17, 2024"
  },
  {
    id: 7,
    slug: "pachinko",
    title: "Pachinko",
    author: "Min Jin Lee",
    color: "from-indigo-700 to-indigo-900",
    month: "Jun 2024",
    genre: "Historical Fiction",
    pageCount: 490,
    readerCount: 33,
    isCurrent: false,
    description: "Pachinko follows one Korean family through the generations, beginning in early 1900s Korea with Sunja, the prized daughter of a poor yet proud family, whose unplanned pregnancy threatens to shame them all. Deserted by her wealthy lover, Sunja is saved when a young tubercular minister offers to marry and take her to Japan.",
    discussionQuestions: [
      "How does the novel explore themes of identity and belonging?",
      "What role does discrimination play in shaping the characters' choices?",
      "How do generational differences affect the family's relationship with their heritage?",
      "What does the pachinko parlor symbolize in the context of the story?"
    ],
    meetingDate: "June 19, 2024"
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
