import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSignup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    toast({
      title: "Welcome to our newsletter!",
      description: "You'll receive updates about our latest reads and events.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <div className="w-full max-w-md">
      <h4 className="font-serif text-lg text-foreground mb-2">Stay in the Loop</h4>
      <p className="font-body text-sm text-muted-foreground mb-4">
        Get monthly book picks and event updates.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div className="flex-1">
          <Input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="bg-background/50 border-border/50 focus:border-accent"
            disabled={isSubmitting || isSubmitted}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="literary"
          size="icon"
          disabled={isSubmitting || isSubmitted}
          className="shrink-0"
        >
          {isSubmitted ? (
            <Check className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
