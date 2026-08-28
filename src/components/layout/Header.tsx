import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'A Clínica', path: '/clinica' },
    { name: 'Tratamentos', path: '/tratamentos' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md" 
          : "bg-white/50 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex justify-between items-center transition-all duration-300",
          isScrolled ? "h-16" : "h-24"
        )}>
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              src="https://i.postimg.cc/dtGvqWF1/images-(1).png" 
              alt="Dentalis Odontologia Integrada" 
              className={cn(
                "w-auto object-contain transition-all duration-300",
                isScrolled ? "h-12" : "h-16"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-turquoise-500",
                  location.pathname === link.path ? "text-turquoise-500" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/agendamento"
              className="bg-turquoise-500 hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full transition-all shadow-sm"
            >
              Agendar Avaliação
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-turquoise-500 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "block px-3 py-3 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "bg-turquoise-50 text-turquoise-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-turquoise-500"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/agendamento"
                className="block w-full text-center bg-turquoise-500 hover:bg-turquoise-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Agendar Avaliação
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
