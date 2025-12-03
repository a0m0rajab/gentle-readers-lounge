import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { EventPhoto } from "@/data/events";

interface LightboxProps {
  photos: EventPhoto[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox = ({ photos, initialIndex, isOpen, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, goToPrevious, goToNext]);

  const currentPhoto = photos[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-background/10 text-primary-foreground hover:bg-background/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Previous */}
          {photos.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-background/10 text-primary-foreground hover:bg-background/20 transition-colors hidden md:block"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation - Next */}
          {photos.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-background/10 text-primary-foreground hover:bg-background/20 transition-colors hidden md:block"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image container with touch support */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-12 md:p-20"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative max-w-full max-h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption || "Event photo"}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption & Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            {currentPhoto.caption && (
              <motion.p
                key={`caption-${currentIndex}`}
                className="text-primary-foreground font-body mb-3 px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentPhoto.caption}
              </motion.p>
            )}
            {photos.length > 1 && (
              <div className="flex items-center justify-center gap-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary-foreground w-6"
                        : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            )}
            {/* Mobile swipe hint */}
            {photos.length > 1 && (
              <p className="text-primary-foreground/60 text-xs mt-3 md:hidden">
                Swipe to navigate
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;