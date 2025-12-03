import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  color: string;
  month: string;
}

const books: Book[] = [
  { id: 1, title: "Circe", author: "Madeline Miller", color: "from-amber-700 to-amber-900", month: "Nov 2024" },
  { id: 2, title: "Beloved", author: "Toni Morrison", color: "from-rose-800 to-rose-950", month: "Oct 2024" },
  { id: 3, title: "The Secret History", author: "Donna Tartt", color: "from-slate-700 to-slate-900", month: "Sep 2024" },
  { id: 4, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", color: "from-emerald-700 to-emerald-900", month: "Aug 2024" },
  { id: 5, title: "The Remains of the Day", author: "Kazuo Ishiguro", color: "from-stone-600 to-stone-800", month: "Jul 2024" },
  { id: 6, title: "Pachinko", author: "Min Jin Lee", color: "from-indigo-700 to-indigo-900", month: "Jun 2024" },
];

const BookCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="past-reads" className="py-24 bg-cream-dark/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="small-caps text-sm tracking-[0.3em] text-accent mb-3">
              Our Library
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
              Past Reads
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {books.map((book, index) => (
            <div
              key={book.id}
              className="flex-shrink-0 snap-start group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-44 md:w-52">
                {/* Book Cover */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
                  <div
                    className={`relative w-full h-64 md:h-72 bg-gradient-to-br ${book.color} rounded-lg shadow-card group-hover:shadow-elevated transition-all duration-300 flex items-center justify-center p-4`}
                  >
                    <div className="text-center">
                      <div className="w-8 h-0.5 bg-white/30 mx-auto mb-3" />
                      <h4 className="font-serif text-sm md:text-base text-white leading-tight mb-1">
                        {book.title}
                      </h4>
                      <div className="w-8 h-0.5 bg-white/30 mx-auto mt-3" />
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="px-1">
                  <h4 className="font-serif text-base text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground italic mb-1">
                    {book.author}
                  </p>
                  <p className="text-xs text-accent small-caps tracking-wider">
                    {book.month}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="font-body text-muted-foreground hover:text-foreground gold-underline transition-colors inline-flex items-center gap-2"
          >
            View complete reading history
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookCarousel;
