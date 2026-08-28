import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'A Clínica', path: '/clinica' },
    { name: 'Tratamentos', path: '/tratamentos' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              src="https://i.postimg.cc/dtGvqWF1/images-(1).png" 
              alt="Dentalis Odontologia Integrada" 
              className="h-16 w-auto object-contain"
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
