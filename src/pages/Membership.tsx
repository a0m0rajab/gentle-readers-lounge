import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Users, Calendar, Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const membershipSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }).max(50),
  lastName: z.string().trim().min(1, { message: "Last name is required" }).max(50),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  membershipType: z.enum(["reader", "explorer", "patron"], { required_error: "Please select a membership type" }),
  favoriteGenres: z.string().trim().max(500).optional(),
  howDidYouHear: z.string().trim().max(200).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
});

type MembershipFormData = z.infer<typeof membershipSchema>;

const membershipTypes = [
  {
    value: "reader",
    title: "Reader",
    description: "Access to monthly book selections and online discussions",
    price: "Free",
  },
  {
    value: "explorer",
    title: "Explorer",
    description: "Reader benefits plus in-person events and exclusive author talks",
    price: "$15/month",
  },
  {
    value: "patron",
    title: "Patron",
    description: "Explorer benefits plus early book access and special editions",
    price: "$35/month",
  },
];

const benefits = [
  { icon: BookOpen, text: "Curated monthly book selections" },
  { icon: Users, text: "Vibrant community discussions" },
  { icon: Calendar, text: "Exclusive member events" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Membership = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const selectedType = watch("membershipType");
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: MembershipFormData) => {
    const { error } = await supabase.from("membership_signups").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      membership_type: data.membershipType,
      favorite_genres: data.favoriteGenres || null,
      how_did_you_hear: data.howDidYouHear || null,
    });
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
    toast({
      title: "Welcome to the club!",
      description: "Your membership application has been received.",
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
                Welcome to the Club!
              </h1>
              <p className="font-body text-lg text-muted-foreground mb-8">
                We're thrilled to have you join The Gentle Readers. Check your email 
                for next steps and your first book recommendation.
              </p>
              <Button
                variant="literary"
                onClick={() => {
                  setIsSubmitted(false);
                  reset();
                }}
              >
                Back to Form
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
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-accent font-body text-sm tracking-widest uppercase">
                Join Us
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
                Become a Member
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Join a community of passionate readers who believe in the 
                transformative power of stories.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.text}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-body text-muted-foreground">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-background rounded-2xl p-8 md:p-12 shadow-soft border border-border space-y-8"
              >
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-body text-foreground">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Jane"
                      className="bg-card border-border focus:border-accent"
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-xs">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-body text-foreground">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Austen"
                      className="bg-card border-border focus:border-accent"
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-xs">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-card border-border focus:border-accent"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">{errors.email.message}</p>
                  )}
                </div>

                {/* Membership Type */}
                <div className="space-y-4">
                  <Label className="font-body text-foreground">Membership Type *</Label>
                  <RadioGroup
                    value={selectedType}
                    onValueChange={(value) => setValue("membershipType", value as "reader" | "explorer" | "patron")}
                    className="space-y-3"
                  >
                    {membershipTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`relative flex items-start p-4 rounded-xl border transition-colors cursor-pointer ${
                          selectedType === type.value
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                        onClick={() => setValue("membershipType", type.value as "reader" | "explorer" | "patron")}
                      >
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor={type.value}
                              className="font-serif text-lg text-foreground cursor-pointer"
                            >
                              {type.title}
                            </Label>
                            <span className="font-body text-accent font-medium">
                              {type.price}
                            </span>
                          </div>
                          <p className="font-body text-sm text-muted-foreground mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.membershipType && (
                    <p className="text-destructive text-xs">{errors.membershipType.message}</p>
                  )}
                </div>

                {/* Favorite Genres */}
                <div className="space-y-2">
                  <Label htmlFor="favoriteGenres" className="font-body text-foreground">
                    Favorite Genres (Optional)
                  </Label>
                  <Textarea
                    id="favoriteGenres"
                    {...register("favoriteGenres")}
                    placeholder="Literary fiction, historical novels, contemporary poetry..."
                    rows={3}
                    className="bg-card border-border focus:border-accent resize-none"
                  />
                </div>

                {/* How Did You Hear */}
                <div className="space-y-2">
                  <Label htmlFor="howDidYouHear" className="font-body text-foreground">
                    How did you hear about us? (Optional)
                  </Label>
                  <Input
                    id="howDidYouHear"
                    {...register("howDidYouHear")}
                    placeholder="Friend, social media, event..."
                    className="bg-card border-border focus:border-accent"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="agreeToTerms"
                      className="font-body text-sm text-muted-foreground cursor-pointer"
                    >
                      I agree to receive communications about book selections, events, and 
                      club updates. You can unsubscribe at any time.
                    </Label>
                    {errors.agreeToTerms && (
                      <p className="text-destructive text-xs mt-1">{errors.agreeToTerms.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="literary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Join The Gentle Readers
                      <ArrowRight className="w-4 h-4 ml-2" />
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

export default Membership;
