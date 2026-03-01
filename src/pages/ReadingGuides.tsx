import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Users, ArrowRight, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { books } from "@/data/books";
import { Badge } from "@/components/ui/badge";

const ReadingGuides = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // Breadcrumbs for structured data
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Reading Guides", url: "/guides" },
  ];

  // ItemList structured data for the collection
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Reading Guides Collection",
    description: "Curated reading guides from Hadith Tech book discussions",
    numberOfItems: books.length,
    itemListElement: books.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Book",
        name: book.title,
        author: { "@type": "Person", name: book.author },
        genre: book.genre,
        numberOfPages: book.pageCount,
        url: `https://gentlereaders.club/book/${book.slug}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Reading Guides - Book Discussion Companions"
        description="Dive deeper into our book selections with curated reading guides featuring themes, discussion highlights, member reviews, and literary companions."
        canonicalUrl="/guides"
        breadcrumbs={breadcrumbs}
      />
      {/* ItemList JSON-LD for the book collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs text-muted-foreground small-caps tracking-widest mb-4 block">
              Literary Companions
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Reading Guides
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Dive deeper into our past selections with curated guides featuring themes, 
              discussion highlights, member reviews, and reading companions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8"
          >
            {books.map((book) => {
              const themes = book.themes || [book.genre];
              const highlight = book.highlight || book.description.substring(0, 150) + "...";

              return (
                <motion.article
                  key={book.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link to={`/book/${book.slug}`}>
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:border-accent/30">
                      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Book Cover */}
                        <div className="flex-shrink-0">
                          <div className="relative w-32 h-48 lg:w-40 lg:h-60 mx-auto lg:mx-0">
                            {book.coverImage ? (
                              <img
                                src={book.coverImage}
                                alt={`${book.title} cover`}
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                              />
                            ) : (
                              <div
                                className={`w-full h-full rounded-lg shadow-lg bg-gradient-to-br ${book.color} flex flex-col items-center justify-center p-4 text-white`}
                              >
                                <span className="font-serif text-sm text-center leading-tight">
                                  {book.title}
                                </span>
                                <span className="text-xs opacity-80 mt-2 text-center">
                                  {book.author.split(",")[0]}
                                </span>
                              </div>
                            )}
                            {book.isCurrent && (
                              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                                Current
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <div>
                              <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                                {book.title}
                              </h2>
                              <p className="text-muted-foreground text-sm mt-1">
                                by {book.author}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {book.genre}
                            </Badge>
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {book.meetingDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="w-4 h-4" />
                              {book.totalAttendees || book.readerCount} readers
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4" />
                              {book.pageCount} pages
                            </span>
                          </div>

                          {/* Themes */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {themes.slice(0, 5).map((theme) => (
                              <span
                                key={theme}
                                className="inline-flex items-center gap-1 text-xs bg-secondary/50 text-secondary-foreground px-2.5 py-1 rounded-full"
                              >
                                <Bookmark className="w-3 h-3" />
                                {theme}
                              </span>
                            ))}
                          </div>

                          {/* Highlight */}
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                            <span className="text-foreground font-medium">Discussion highlight:</span>{" "}
                            {highlight}
                          </p>

                          {/* CTA */}
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                            Read Full Guide
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Want to Suggest Our Next Read?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Members can nominate books for future selections. Your recommendation could 
              become our next reading adventure.
            </p>
            <Link
              to="/nominate"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Nominate a Book
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReadingGuides;
