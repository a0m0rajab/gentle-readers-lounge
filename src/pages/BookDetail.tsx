import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import { Suspense, lazy, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { getBookBySlug, getAllBooks } from "@/data/books";
import { getBookStats } from "@/data/bookStats";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import BookStats from "@/components/BookStats";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dynamic MDX content loader
const mdxModules = import.meta.glob("../content/books/*.mdx");

const BookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || "");
  const stats = getBookStats(slug || "");
  const allBooks = getAllBooks();

  // Dynamically load MDX content
  const MDXContent = useMemo(() => {
    if (!slug) return null;
    const modulePath = `../content/books/${slug}.mdx`;
    if (mdxModules[modulePath]) {
      return lazy(mdxModules[modulePath] as () => Promise<{ default: React.ComponentType }>);
    }
    return null;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-6 relative">
            {/* Back Link */}
            <Link 
              to="/books" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-sm">Back to Library</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Book Cover */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-4 translate-y-4" />
                  <div className={`relative w-64 md:w-72 h-96 md:h-[28rem] bg-gradient-to-br ${book.color} rounded-lg shadow-elevated flex items-center justify-center`}>
                    <div className="text-center px-8">
                      <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
                      <h1 className="font-serif text-2xl md:text-3xl text-primary-foreground leading-tight mb-2">
                        {book.title.split(' ').slice(0, -1).join(' ')}
                      </h1>
                      <h1 className="font-serif text-2xl md:text-3xl text-accent font-semibold leading-tight">
                        {book.title.split(' ').slice(-1)}
                      </h1>
                      <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
                      <p className="font-body text-sm text-primary-foreground/80 mt-6 italic">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div>
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full small-caps tracking-wider mb-4">
                  {book.genre}
                </span>

                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                  {book.title}
                </h1>
                <p className="font-body text-xl text-secondary mb-6 italic">
                  by {book.author}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>{book.pageCount} pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{book.month}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{book.readerCount} readers</span>
                  </div>
                </div>

                <p className="font-body text-muted-foreground leading-relaxed mb-8 drop-cap">
                  {book.description}
                </p>

                {book.isCurrent && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-8">
                    <p className="text-sm text-accent-foreground">
                      <span className="font-semibold">Next Meeting:</span> {book.meetingDate}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
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
          <section className="py-12 bg-cream-dark/30">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto">
                <BookStats stats={stats} bookTitle={book.title} />
              </div>
            </div>
          </section>
        )}

        {/* MDX Content Section */}
        {MDXContent && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto prose-custom">
                <MDXProvider components={mdxComponents}>
                  <Suspense fallback={
                    <div className="animate-pulse space-y-4">
                      <div className="h-8 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/5"></div>
                    </div>
                  }>
                    <MDXContent />
                  </Suspense>
                </MDXProvider>
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              {prevBook ? (
                <Link 
                  to={`/book/${prevBook.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs small-caps tracking-wider text-accent">Previous</p>
                    <p className="font-serif">{prevBook.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              
              {nextBook ? (
                <Link 
                  to={`/book/${nextBook.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
                >
                  <div>
                    <p className="text-xs small-caps tracking-wider text-accent">Next</p>
                    <p className="font-serif">{nextBook.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
