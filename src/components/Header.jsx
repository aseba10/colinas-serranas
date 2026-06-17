import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/cabana_premium_tandil', label: 'Cabañas Premium' },
    { path: '/cabana_duplex_tandil', label: 'Cabañas Dúplex' },
    { path: '/#contacto', label: 'Contacto' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  
  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      setTimeout(() => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <img
              src="/images/logo-colinas.png"
              alt="Colinas Serranas"
              className="h-10 w-auto group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-xl font-bold text-white">
              Colinas Serranas
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const className = `text-sm font-medium transition-colors duration-200 relative ${
                isScrolled
                  ? 'text-foreground hover:text-primary'
                  : 'text-white/90 hover:text-white'
              }`;

              // CONTACTO (anchor)
              if (link.path.includes('#')) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={handleContactClick}
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              }

              // INICIO (scroll top extra)
              if (link.label === 'Inicio') {
                return (
                  <Link
                    key={link.path}
                    to="/"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className={className}
                  >
                    Inicio

                    {isActive('/') && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              }

              // DEFAULT LINKS
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={className}
                >
                  {link.label}

                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* BOTÓN RESERVA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar ahora
              </a>
            </Button>
          </div>
          {/* BOTÓN HAMBURGUESA */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden p-2 ${
                    isScrolled
                      ? 'text-foreground'
                      : 'text-white'
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
        </div>
      </div>
      
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background border-t border-border"
        >
          <nav className="section-container py-4 flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Inicio
            </Link>

            <Link
              to="/cabana_premium_tandil"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cabañas Premium
            </Link>

            <Link
              to="/cabana_duplex_tandil"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cabañas Dúplex
            </Link>

            <a
              href="/#contacto"
              onClick={handleContactClick}
            >
              Contacto
            </a>

          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </header>
  );
}

export default Header;