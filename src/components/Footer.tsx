import { BookOpen, Heart, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", href: "#", icon: InstagramIcon },
    { name: "Twitter", href: "#", icon: TwitterIcon },
    { name: "Goodreads", href: "#", icon: BookIcon },
    { name: "Email", href: "mailto:hello@gentlereaders.club", icon: Mail },
  ];

  const footerLinks = [
    { label: "About Us", href: "#" },
    { label: "Reading Guidelines", href: "#" },
    { label: "Book Nominations", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-serif text-lg font-semibold">
                  The Gentle Readers
                </span>
              </div>
            </div>
            <p className="font-body text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              A community of passionate readers exploring literature together, 
              one page at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm small-caps tracking-widest mb-4 text-primary-foreground/80">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-sm small-caps tracking-widest mb-4 text-primary-foreground/80">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground/40 hover:bg-primary-foreground/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p className="font-body flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for book lovers
            </p>
            <p className="font-body">
              © {new Date().getFullYear()} The Gentle Readers Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Custom minimal line-art icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733-16z" />
    <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
  </svg>
);

export default Footer;
