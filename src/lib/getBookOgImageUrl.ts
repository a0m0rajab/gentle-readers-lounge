import { Book } from "@/data/books";

const FALLBACK_COVER = "/placeholder.svg";

export const getBookOgImageUrl = (book: Pick<Book, "slug" | "title" | "author" | "genre" | "meetingDate" | "coverImage">) => {
  const baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/book-og`;
  const params = new URLSearchParams({
    slug: book.slug,
    title: book.title,
    author: book.author,
    genre: book.genre,
    meetingDate: book.meetingDate,
    coverImage: book.coverImage || `${window.location.origin}${FALLBACK_COVER}`,
  });

  return `${baseUrl}?${params.toString()}`;
};
