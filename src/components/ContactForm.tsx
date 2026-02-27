import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl p-8 border border-border text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-serif text-2xl text-foreground mb-2">Thank You!</h3>
        <p className="font-body text-muted-foreground">
          We've received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-8 border border-border">
      <h3 className="font-serif text-2xl text-foreground mb-2">Get in Touch</h3>
      <p className="font-body text-muted-foreground mb-6">
        Have questions about membership or want to learn more? We'd love to hear from you.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-body text-foreground">Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your name"
            className="bg-background border-border focus:border-accent"
          />
          {errors.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="font-body text-foreground">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="bg-background border-border focus:border-accent"
          />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="font-body text-foreground">Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Tell us what you'd like to know..."
            rows={4}
            className="bg-background border-border focus:border-accent resize-none"
          />
          {errors.message && (
            <p className="text-destructive text-xs">{errors.message.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          variant="literary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
