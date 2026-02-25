import { motion } from "framer-motion";
import { BookOpen, Heart, Users, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const foundingMembers = [
  {
    name: "Abdurrahman Rajab",
    role: "Founder & Lead Curator",
    bio: "A software engineer with a passion for community, development, and learning. Abdurrahman started the club in the university with his friends and a shared love for tech.",
    avatar: "https://github.com/a0m0rajab.png"
  },
  {
    name: "Adnan Fahed",
    role: "Discussion Facilitator",
    bio: "Software engineer with passion for new technologies, who love to share his experience with the community",
    avatar: "https://github.com/adnanjpg.png"
  },
];

const values = [
  {
    icon: BookOpen,
    title: "Thoughtful Reading",
    description: "We believe in savoring books, not racing through them. Quality discussion over quantity of titles."
  },
  {
    icon: Users,
    title: "Inclusive Community",
    description: "Every voice matters. We welcome readers of all backgrounds and experience levels."
  },
  {
    icon: Heart,
    title: "Genuine Connection",
    description: "Beyond the books, we forge lasting friendships built on shared stories and perspectives."
  },
  {
    icon: Sparkles,
    title: "Literary Exploration",
    description: "We venture beyond comfort zones, discovering hidden gems and challenging narratives together."
  }
];

const testimonials = [
  {
    quote: "This club transformed my relationship with reading. I've discovered authors I never would have found on my own, and the discussions add so much depth to every book.",
    name: "Rachel Kim",
    role: "Member since 2020",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "As someone who moved to a new city, The Gentle Readers gave me an instant community. These people have become some of my closest friends.",
    name: "David Okafor",
    role: "Member since 2021",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The discussions here are unlike anything I've experienced. It's intellectual without being pretentious, welcoming without being shallow.",
    name: "Mira Patel",
    role: "Member since 2019",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const About = () => {
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
                Our Story
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 mb-6">
                About The Gentle Readers
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                What began as a small gathering of friends in 2019 has blossomed into a vibrant 
                community of literary enthusiasts united by our love of meaningful stories and 
                thoughtful conversation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-background rounded-2xl p-8 md:p-12 shadow-soft border border-border">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 text-center">
                  Our Mission
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed text-center text-lg">
                  <span className="drop-cap">W</span>e exist to create a sanctuary for readers—a place 
                  where books become bridges between hearts and minds. Through carefully curated selections 
                  and intimate discussions, we aim to foster deeper understanding of ourselves, each other, 
                  and the world around us. Every page turned together is an opportunity for growth, empathy, 
                  and connection.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                What We Believe
              </h2>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto">
                Our club is built on principles that guide every book selection and discussion.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="bg-card rounded-xl p-6 border border-border hover-lift"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{value.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Founding Members Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-body text-sm tracking-widest uppercase">
                The People Behind the Pages
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-4 mb-4">
                Founding Members
              </h2>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto">
                Meet the book lovers who turned a simple idea into a thriving literary community.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {foundingMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="relative mb-4 inline-block">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent/40 transition-colors duration-300 mx-auto">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-1">{member.name}</h3>
                  <p className="font-body text-accent text-sm mb-3">{member.role}</p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-body text-sm tracking-widest uppercase">
                What Our Members Say
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-4 mb-4">
                Reader Testimonials
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  variants={itemVariants}
                  className="bg-card rounded-2xl p-8 border border-border relative"
                >
                  <div className="absolute -top-4 left-8 text-6xl text-accent/20 font-serif">"</div>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6 relative z-10">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-foreground font-medium">{testimonial.name}</p>
                      <p className="font-body text-accent text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-body text-sm tracking-widest uppercase">
                  Reach Out
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-4 mb-4">
                  Questions?
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  Whether you're curious about our book selections, events, or membership options, 
                  we're here to help. Send us a message and a founding member will get back to you.
                </p>
                <div className="literary-divider" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Join Our Story
              </h2>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Whether you're a lifelong bibliophile or just rediscovering the joy of reading, 
                there's a place for you at our table. Come for the books, stay for the community.
              </p>
              <div className="literary-divider mx-auto" />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
