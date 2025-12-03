import { BookOpen, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { getCurrentBook } from "@/data/books";

const FeaturedBook = () => {
  const book = getCurrentBook();

  if (!book) return null;

  return (
    <section id="current" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="small-caps text-sm tracking-[0.3em] text-accent mb-3">
            Currently Reading
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
            This Month's Selection
          </h2>
        </div>

        {/* Featured Book Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border hover-lift">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Book Cover */}
              <Link to={`/book/${book.slug}`} className="relative bg-primary/5 p-8 md:p-12 flex items-center justify-center group">
                <div className="relative">
                  {/* Book shadow */}
                  <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
                  {/* Book cover */}
                  <div className={`relative w-48 md:w-56 h-72 md:h-80 bg-gradient-to-br ${book.color} rounded-lg shadow-elevated flex items-center justify-center`}>
                    <div className="text-center px-6">
                      <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
                      <h3 className="font-serif text-xl text-primary-foreground leading-tight mb-2">
                        {book.title.split(' ').slice(0, -1).join(' ')}
                      </h3>
                      <h3 className="font-serif text-2xl text-accent font-semibold leading-tight">
                        {book.title.split(' ').slice(-1)}
                      </h3>
                      <div className="w-12 h-0.5 bg-accent mx-auto mt-4" />
                      <p className="font-body text-sm text-primary-foreground/80 mt-4 italic">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Book Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full small-caps tracking-wider">
                    {book.genre}
                  </span>
                </div>

                <Link to={`/book/${book.slug}`} className="group">
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                </Link>
                <p className="font-body text-lg text-secondary mb-6 italic">
                  by {book.author}
                </p>

                <p className="font-body text-muted-foreground leading-relaxed mb-8 drop-cap line-clamp-4">
                  {book.description}
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="literary" size="lg">
                    Join Discussion
                  </Button>
                  <Link to={`/book/${book.slug}`}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;
