import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Abstract book shapes */}
        <div className="absolute top-1/4 left-10 w-32 h-44 border-2 border-primary/20 rounded-lg transform -rotate-12 hidden lg:block" />
        <div className="absolute top-1/3 left-16 w-28 h-40 border-2 border-accent/30 rounded-lg transform -rotate-6 hidden lg:block" />
        <div className="absolute top-1/4 right-12 w-36 h-48 border-2 border-secondary/20 rounded-lg transform rotate-12 hidden lg:block" />
        <div className="absolute bottom-1/4 right-20 w-24 h-32 border-2 border-primary/15 rounded-lg transform rotate-6 hidden lg:block" />

        {/* Gold accent circles */}
        <div className="absolute top-20 right-1/4 w-3 h-3 rounded-full bg-accent/40" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-accent/30" />
        <div className="absolute top-1/2 right-10 w-4 h-4 rounded-full bg-accent/20" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto stagger-children">
          {/* Eyebrow */}
          <p className="small-caps text-sm tracking-[0.3em] text-muted-foreground mb-6 opacity-0">Est. 2024</p>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6 leading-tight opacity-0">
            Where ideas compile
            <span className="block text-primary">and minds sync.</span>
          </h1>

          {/* Tagline */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed opacity-0">
            A digital haven for curious builders and thinkers. a place for deep dives, shared breakthroughs, and the
            simple joy of exploring knowledge together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
            <Button variant="literary" size="lg">
              Explore Our Reads
            </Button>
            <Button variant="elegant" size="lg">
              About the Club
            </Button>
          </div>

          {/* Decorative Divider */}
          <div className="mt-16 opacity-0">
            <div className="literary-divider">
              <span className="text-accent text-2xl font-serif">❧</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#current"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          aria-label="Scroll to current read"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
