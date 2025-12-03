import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Users, Search, X } from "lucide-react";
import { getAllBooks, getCurrentBook } from "@/data/books";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Books = () => {
  const allBooks = getAllBooks();
  const currentBook = getCurrentBook();
  const pastBooks = allBooks.filter(book => !book.isCurrent);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(pastBooks.map(book => book.genre));
    return Array.from(genreSet).sort();
  }, [pastBooks]);
  
  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return pastBooks.filter(book => {
      const matchesSearch = searchQuery === "" || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [pastBooks, searchQuery, selectedGenre]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent" />
          <div className="container mx-auto px-6 lg:px-8 relative text-center">
            <p className="small-caps text-xs tracking-[0.3em] text-accent mb-4">
              Our Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-5">
              The Library
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Explore all the books we've read together as a community. 
              Each selection has sparked meaningful conversations and lasting memories.
            </p>
          </div>
        </section>

        {/* Current Read */}
        {currentBook && (
          <section className="py-16">
            <div className="container mx-auto px-6 lg:px-8">
              <p className="small-caps text-xs tracking-[0.3em] text-accent mb-6">
                Currently Reading
              </p>
              <Link to={`/book/${currentBook.slug}`} className="block group">
                <div className="bg-card rounded-2xl shadow-card border border-border hover-lift overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Book Cover */}
                    <div className="relative bg-primary/5 p-8 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                        {currentBook.coverImage ? (
                          <img 
                            src={currentBook.coverImage} 
                            alt={`${currentBook.title} cover`}
                            className="relative w-36 h-52 rounded-lg shadow-card object-cover"
                          />
                        ) : (
                          <div className={`relative w-36 h-52 bg-gradient-to-br ${currentBook.color} rounded-lg shadow-card flex items-center justify-center`}>
                            <div className="text-center px-4">
                              <div className="w-8 h-0.5 bg-accent mx-auto mb-3" />
                              <h3 className="font-serif text-sm text-primary-foreground leading-tight">
                                {currentBook.title}
                              </h3>
                              <div className="w-8 h-0.5 bg-accent mx-auto mt-3" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 p-8 flex flex-col justify-center">
                      <span className="inline-block w-fit px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full small-caps tracking-wider mb-3">
                        {currentBook.genre}
                      </span>
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-1 group-hover:text-primary transition-colors">
                        {currentBook.title}
                      </h2>
                      <p className="font-body text-secondary italic mb-4">by {currentBook.author}</p>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {currentBook.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-accent" />
                          {currentBook.pageCount} pages
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-accent" />
                          {currentBook.readerCount} readers
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-accent" />
                          Meeting: {currentBook.meetingDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Past Reads Grid */}
        <section className="py-16 pb-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <p className="small-caps text-xs tracking-[0.3em] text-accent">
                Past Reads
              </p>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9 w-full sm:w-64 bg-card border-border"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Genre Filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedGenre(null)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      !selectedGenre
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    All
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                      className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                        selectedGenre === genre
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Results count */}
            {(searchQuery || selectedGenre) && (
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredBooks.length} of {pastBooks.length} books
              </p>
            )}
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No books match your search criteria.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedGenre(null); }}
                    className="mt-3 text-primary hover:underline text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredBooks.map((book) => (
                <Link 
                  key={book.id} 
                  to={`/book/${book.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-xl shadow-soft border border-border hover-lift p-6 h-full">
                    {/* Book Cover */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                        {book.coverImage ? (
                          <img 
                            src={book.coverImage} 
                            alt={`${book.title} cover`}
                            className="relative w-32 h-44 rounded-lg shadow-card object-cover"
                          />
                        ) : (
                          <div className={`relative w-32 h-44 bg-gradient-to-br ${book.color} rounded-lg shadow-card flex items-center justify-center`}>
                            <div className="text-center px-3">
                              <div className="w-6 h-0.5 bg-white/30 mx-auto mb-2" />
                              <h4 className="font-serif text-xs text-white leading-tight">
                                {book.title}
                              </h4>
                              <div className="w-6 h-0.5 bg-white/30 mx-auto mt-2" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="text-center">
                      <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full mb-2">
                        {book.genre}
                      </span>
                      <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground italic mb-3">
                        {book.author}
                      </p>
                      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-accent" />
                          {book.pageCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-accent" />
                          {book.month}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Books;
