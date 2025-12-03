import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { label: "Home", href: isHomePage ? "#home" : "/", isAnchor: isHomePage },
    { label: "Current Read", href: isHomePage ? "#current" : "/#current", isAnchor: isHomePage },
    { label: "Library", href: "/books", isAnchor: false },
    { label: "Events", href: "/events", isAnchor: false },
    { label: "About", href: "/about", isAnchor: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow duration-300">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-foreground leading-tight">
                The Gentle Readers
              </span>
              <span className="text-xs text-muted-foreground small-caps tracking-widest">
                Book Club
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-muted-foreground hover:text-foreground gold-underline transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-muted-foreground hover:text-foreground gold-underline transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Button variant="literary" size="sm" asChild>
              <Link to="/membership">Join Us</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-border mt-4 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="font-body text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Button variant="literary" className="mt-2" asChild>
                <Link to="/membership">Join Us</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
