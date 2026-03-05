import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { getBookBySlug, getAllBooks, getBookMDXComponent, getBookStats } from "@/data/books";
import { getEventByBookSlug } from "@/data/events";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import BookStats from "@/components/BookStats";
import EventGallery from "@/components/EventGallery";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getBookOgImageUrl } from "@/lib/getBookOgImageUrl";
const BookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || "");
  
  const stats = getBookStats(slug || "");
  const event = getEventByBookSlug(slug || "");
  const allBooks = getAllBooks();

  // Get the MDX component directly (eagerly loaded)
  const MDXContent = useMemo(() => {
    if (!slug) return null;
    return getBookMDXComponent(slug);
  }, [slug]);

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">Book Not Found</h1>
            <p className="text-muted-foreground mb-8">The book you are looking for does not exist.</p>
            <Link to="/books">
              <Button variant="literary">Browse All Books</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find previous and next books
  const currentIndex = allBooks.findIndex(b => b.slug === book.slug);
  const prevBook = currentIndex > 0 ? allBooks[currentIndex - 1] : null;
  const nextBook = currentIndex < allBooks.length - 1 ? allBooks[currentIndex + 1] : null;

  // SEO meta description - truncate to ~155 chars
  const bookDescription = book.description || "";
  const seoDescription = bookDescription.length > 155
    ? bookDescription.substring(0, 152) + "..."
    : bookDescription;

  // Breadcrumbs for structured data
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Library", url: "/books" },
    { name: book.title, url: `/book/${book.slug}` },
  ];

  // Book structured data
  const bookData = {
    title: book.title,
    author: book.author,
    description: book.description,
    genre: book.genre,
    pageCount: book.pageCount,
    coverImage: book.coverImage,
    rating: stats?.averageRating,
    ratingCount: stats?.totalAttendees,
  };

  const ogImage = getBookOgImageUrl(book);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${book.title} by ${book.author} - Reading Guide`}
        description={seoDescription}
        canonicalUrl={`/book/${book.slug}`}
        ogImage={ogImage}
        ogType="book"
        breadcrumbs={breadcrumbs}
        book={bookData}
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
          <div className="container mx-auto px-6 lg:px-8 relative">
            {/* Back Link */}
            <Link 
              to="/books" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body text-sm">Back to Library</span>
            </Link>

            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
              {/* Book Cover - Takes 2 columns */}
              <div className="lg:col-span-2 flex justify-center lg:justify-end lg:sticky lg:top-28">
                <div className="relative">
                  <div className="absolute inset-0 bg-foreground/8 rounded-xl transform translate-x-4 translate-y-4" />
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={`${book.title} cover`}
                      className="relative w-56 md:w-64 h-80 md:h-96 rounded-xl shadow-elevated object-cover"
                    />
                  ) : (
                    <div className={`relative w-56 md:w-64 h-80 md:h-96 bg-gradient-to-br ${book.color} rounded-xl shadow-elevated flex items-center justify-center`}>
                      <div className="text-center px-6">
                        <div className="w-14 h-0.5 bg-accent mx-auto mb-5" />
                        <h1 className="font-serif text-xl md:text-2xl text-primary-foreground leading-tight mb-1">
                          {(book.title || "").split(' ').slice(0, -1).join(' ')}
                        </h1>
                        <h1 className="font-serif text-xl md:text-2xl text-accent font-semibold leading-tight">
                          {(book.title || "").split(' ').slice(-1)}
                        </h1>
                        <div className="w-14 h-0.5 bg-accent mx-auto mt-5" />
                        <p className="font-body text-sm text-primary-foreground/80 mt-5 italic">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details - Takes 3 columns */}
              <div className="lg:col-span-3">
                <span className="inline-block px-4 py-1.5 bg-accent/15 text-accent-foreground text-xs font-medium rounded-full small-caps tracking-wider mb-5">
                  {book.genre}
                </span>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">
                  {book.title}
                </h1>
                <p className="font-body text-xl text-secondary mb-8 italic">
                  by {book.author}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-8 mb-10 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span className="font-body">{book.pageCount} pages</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-body">{book.month}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="font-body">{book.readerCount} readers</span>
                  </div>
                </div>

                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 drop-cap max-w-2xl">
                  {book.description}
                </p>

                {book.isCurrent && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-10 max-w-md">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-primary">Next Meeting:</span>{" "}
                      <span className="text-muted-foreground">{book.meetingDate}</span>
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="literary" size="lg">
                    Join Discussion
                  </Button>
                  <Button variant="outline" size="lg">
                    Reading Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <BookStats stats={stats} bookTitle={book.title} />
              </div>
            </div>
          </section>
        )}

        {/* Event Gallery Section */}
        {event && (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <EventGallery event={event} compact={true} />
              </div>
            </div>
          </section>
        )}

        {/* MDX Content Section */}
        {MDXContent && (
          <section className="py-16 md:py-20 bg-card/50">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-3xl mx-auto prose-custom">
                <MDXProvider components={mdxComponents}>
                  <MDXContent />
                </MDXProvider>
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              {prevBook ? (
                <Link 
                  to={`/book/${prevBook.slug}`}
                  className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs small-caps tracking-wider text-accent mb-1">Previous</p>
                    <p className="font-serif text-foreground">{prevBook.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              
              {nextBook ? (
                <Link 
                  to={`/book/${nextBook.slug}`}
                  className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors text-right"
                >
                  <div className="text-right">
                    <p className="text-xs small-caps tracking-wider text-accent mb-1">Next</p>
                    <p className="font-serif text-foreground">{nextBook.title}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
