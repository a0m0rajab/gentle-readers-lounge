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

interface MDXBookModule {
  default: React.ComponentType;
  title: string;
  author: string;
  genre: string;
  month: string;
  pageCount: number;
  readerCount: number;
  isCurrent: boolean;
  color: string;
  meetingDate: string;
  coverImage?: string;
  description: string;
  discussionQuestions: string[];
}

// Eagerly load all MDX book files
const mdxModules = import.meta.glob<MDXBookModule>(
  "../content/books/*.mdx",
  { eager: true }
);

// Build the books array from MDX frontmatter
const booksUnsorted: Book[] = Object.entries(mdxModules).map(
  ([path, mod], index) => {
    // Extract slug from file path: "../content/books/the-phoenix-project.mdx" -> "the-phoenix-project"
    const slug = path.replace("../content/books/", "").replace(".mdx", "");

    return {
      id: index + 1,
      slug,
      title: mod.title,
      author: mod.author,
      genre: mod.genre,
      month: mod.month,
      pageCount: mod.pageCount,
      readerCount: mod.readerCount,
      isCurrent: mod.isCurrent ?? false,
      color: mod.color,
      meetingDate: mod.meetingDate,
      coverImage: mod.coverImage,
      description: mod.description,
      discussionQuestions: mod.discussionQuestions ?? [],
    };
  }
);

// Sort: current book first, then by month descending (newest first)
const monthOrder: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseMonthYear(monthStr: string | undefined): number {
  if (!monthStr) return 0;
  const parts = monthStr.split(" ");
  const mon = monthOrder[parts[0]] ?? 0;
  const year = parseInt(parts[1]) || 2024;
  return year * 100 + mon;
}

export const books: Book[] = booksUnsorted.sort((a, b) => {
  if (a.isCurrent && !b.isCurrent) return -1;
  if (!a.isCurrent && b.isCurrent) return 1;
  return parseMonthYear(b.month) - parseMonthYear(a.month);
});

// Re-assign IDs after sorting
books.forEach((book, i) => {
  book.id = i + 1;
});

// Get the MDX component for a given slug
export function getBookMDXComponent(slug: string): React.ComponentType | null {
  const path = `../content/books/${slug}.mdx`;
  const mod = mdxModules[path];
  return mod ? mod.default : null;
}

export const getCurrentBook = (): Book | undefined => {
  return books.find((book) => book.isCurrent);
};

export const getPastReads = (): Book[] => {
  return books.filter((book) => !book.isCurrent);
};

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find((book) => book.slug === slug);
};

export const getAllBooks = (): Book[] => {
  return books;
};
