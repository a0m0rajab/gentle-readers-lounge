import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@hadithtech.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Portland, Oregon",
    description: "Monthly gatherings at local cafés and libraries",
  },
  {
    icon: Clock,
    title: "Meeting Times",
    details: "Third Thursday of each month",
    description: "7:00 PM - 9:00 PM PT",
  },
];

const Contact = () => {
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
                Get in Touch
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
                Contact Us
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Have questions about joining, book selections, or upcoming events? 
                We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border text-center hover-lift"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{info.title}</h3>
                  <p className="font-body text-foreground font-medium mb-1">{info.details}</p>
                  <p className="font-body text-sm text-muted-foreground">{info.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
