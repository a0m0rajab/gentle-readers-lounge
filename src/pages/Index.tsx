import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedBook from "@/components/FeaturedBook";
import BookCarousel from "@/components/BookCarousel";
import EventSection from "@/components/EventSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedBook />
        <BookCarousel />
        <EventSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
