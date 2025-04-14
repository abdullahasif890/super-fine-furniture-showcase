
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home page and then scroll to section
      window.location.href = `/#${sectionId}`;
    }
  };

  // Handle scroll event to change header background and detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Add shadow to header when scrolled
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Only detect active section on home page
      if (isHomePage) {
        // Determine active section for nav highlighting
        const sections = ['hero', 'about', 'products', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/placeholder.svg" 
              alt="Super Fine Industries Logo" 
              className="h-12 md:h-14"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Static link to Catalog page */}
          <Link 
            to="/catalog"
            className={cn(
              "nav-link text-base font-medium hover:text-brand-blue transition-colors",
              location.pathname === '/catalog' ? "text-brand-blue" : ""
            )}
          >
            Catalog
          </Link>
          
          {/* Home page section links */}
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className={cn(
                "nav-link text-base font-medium hover:text-brand-blue transition-colors",
                isHomePage && activeSection === link.id ? "active" : ""
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 animate-fade-in">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {/* Static link to Catalog page */}
            <Link
              to="/catalog"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg py-2 border-b border-gray-100",
                location.pathname === '/catalog' ? "text-brand-blue" : "text-gray-800"
              )}
            >
              Catalog
            </Link>
            
            {/* Home page section links */}
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={cn(
                  "text-lg py-2 border-b border-gray-100",
                  isHomePage && activeSection === link.id ? "text-brand-blue" : "text-gray-800"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
