import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Lightbulb, Users, Check, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const nominationSchema = z.object({
  bookTitle: z.string().trim().min(1, { message: "Book title is required" }).max(200),
  author: z.string().trim().min(1, { message: "Author name is required" }).max(100),
  genre: z.string().min(1, { message: "Please select a genre" }),
  whyRead: z.string().trim().min(20, { message: "Please write at least 20 characters about why we should read this" }).max(1000),
  yourName: z.string().trim().min(1, { message: "Your name is required" }).max(100),
  yourEmail: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
});

type NominationFormData = z.infer<typeof nominationSchema>;

const genres = [
  "Literary Fiction",
  "Historical Fiction",
  "Contemporary Fiction",
  "Magical Realism",
  "Mystery/Thriller",
  "Memoir",
  "Biography",
  "Essays",
  "Poetry",
  "Science Fiction",
  "Fantasy",
  "Other",
];

const guidelines = [
  {
    icon: BookOpen,
    title: "Quality Over Popularity",
    description: "We prioritize thought-provoking narratives that spark rich discussions.",
  },
  {
    icon: Lightbulb,
    title: "Diverse Perspectives",
    description: "We seek voices from various backgrounds, cultures, and experiences.",
  },
  {
    icon: Users,
    title: "Discussion Potential",
    description: "Books with layered themes and complex characters tend to generate the best conversations.",
  },
];

const Nominate = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<NominationFormData>({
    resolver: zodResolver(nominationSchema),
  });

  const selectedGenre = watch("genre");

  const onSubmit = async (data: NominationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    toast({
      title: "Nomination received!",
      description: "Thank you for your book suggestion.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-serif text-4xl text-foreground mb-4">
                Thank You!
              </h1>
              <p className="font-body text-lg text-muted-foreground mb-8">
                Your nomination has been submitted. Our reading committee reviews all 
                suggestions and you'll be notified if your book is selected for a future month.
              </p>
              <Button
                variant="literary"
                onClick={() => {
                  setIsSubmitted(false);
                  reset();
                }}
              >
                Nominate Another Book
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-accent font-body text-sm tracking-widest uppercase">
                Suggest a Read
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
                Nominate a Book
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Help shape our reading journey. Suggest a book that moved you, 
                challenged you, or simply deserves more readers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {guidelines.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <guide.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">{guide.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{guide.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card rounded-2xl p-8 md:p-12 border border-border space-y-6"
              >
                <h2 className="font-serif text-2xl text-foreground mb-2">Book Details</h2>
                
                {/* Book Title */}
                <div className="space-y-2">
                  <Label htmlFor="bookTitle" className="font-body text-foreground">
                    Book Title *
                  </Label>
                  <Input
                    id="bookTitle"
                    {...register("bookTitle")}
                    placeholder="The Great Gatsby"
                    className="bg-background border-border focus:border-accent"
                  />
                  {errors.bookTitle && (
                    <p className="text-destructive text-xs">{errors.bookTitle.message}</p>
                  )}
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author" className="font-body text-foreground">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    {...register("author")}
                    placeholder="F. Scott Fitzgerald"
                    className="bg-background border-border focus:border-accent"
                  />
                  {errors.author && (
                    <p className="text-destructive text-xs">{errors.author.message}</p>
                  )}
                </div>

                {/* Genre */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground">Genre *</Label>
                  <Select
                    value={selectedGenre}
                    onValueChange={(value) => setValue("genre", value)}
                  >
                    <SelectTrigger className="bg-background border-border focus:border-accent">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.genre && (
                    <p className="text-destructive text-xs">{errors.genre.message}</p>
                  )}
                </div>

                {/* Why Read */}
                <div className="space-y-2">
                  <Label htmlFor="whyRead" className="font-body text-foreground">
                    Why should we read this? *
                  </Label>
                  <Textarea
                    id="whyRead"
                    {...register("whyRead")}
                    placeholder="Tell us what makes this book special and why it would spark great discussions..."
                    rows={5}
                    className="bg-background border-border focus:border-accent resize-none"
                  />
                  {errors.whyRead && (
                    <p className="text-destructive text-xs">{errors.whyRead.message}</p>
                  )}
                </div>

                <div className="border-t border-border pt-6 mt-6">
                  <h2 className="font-serif text-2xl text-foreground mb-4">Your Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Your Name */}
                    <div className="space-y-2">
                      <Label htmlFor="yourName" className="font-body text-foreground">
                        Your Name *
                      </Label>
                      <Input
                        id="yourName"
                        {...register("yourName")}
                        placeholder="Your name"
                        className="bg-background border-border focus:border-accent"
                      />
                      {errors.yourName && (
                        <p className="text-destructive text-xs">{errors.yourName.message}</p>
                      )}
                    </div>

                    {/* Your Email */}
                    <div className="space-y-2">
                      <Label htmlFor="yourEmail" className="font-body text-foreground">
                        Your Email *
                      </Label>
                      <Input
                        id="yourEmail"
                        {...register("yourEmail")}
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background border-border focus:border-accent"
                      />
                      {errors.yourEmail && (
                        <p className="text-destructive text-xs">{errors.yourEmail.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="literary"
                  size="lg"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Nomination
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Nominate;
