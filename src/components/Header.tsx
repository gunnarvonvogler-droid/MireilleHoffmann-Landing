import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ScreenType } from '../types';
import isotipo from '../assets/isotipo.svg';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}

export default function Header({ currentScreen, setScreen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (currentScreen !== 'home') {
      setScreen('home');
      // Wait for screen transition, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-md border-b border-outline-variant/10 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center w-full">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 md:gap-3 hover:opacity-90 transition-opacity"
        >
          <img src={isotipo} alt="" className="w-8 h-8 md:w-9 md:h-9 flex-none" />
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Mireille Hoffmann
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {currentScreen === 'home' ? (
            <>
              <button
                onClick={() => navigateToSection('metodologia')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Metodología
              </button>
              <button
                onClick={() => navigateToSection('curso')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Curso
              </button>
              <button
                onClick={() => navigateToSection('precios')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Pricing
              </button>
              <button
                onClick={() => navigateToSection('politicas')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Políticas
              </button>
              <button
                onClick={() => setScreen('contact')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Contacto
              </button>
            </>
          ) : currentScreen === 'apply' ? (
            <>
              <button
                onClick={() => navigateToSection('filosofia-bio')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Philosophy
              </button>
              <button
                onClick={() => navigateToSection('metodologia')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Methodology
              </button>
              <button
                onClick={() => setScreen('contact')}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Contacto
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setScreen('home');
                  setTimeout(() => navigateToSection('precios'), 100);
                }}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Sesiones
              </button>
              <button
                onClick={() => {
                  setScreen('home');
                  setTimeout(() => navigateToSection('filosofia-bio'), 100);
                }}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                Filosofía
              </button>
              <span className="font-sans text-xs uppercase tracking-widest font-bold text-secondary border-b border-secondary pb-0.5 select-none">
                Contacto
              </span>
            </>
          )}

          {/* Call to Action Button */}
          <button
            onClick={() => setScreen('apply')}
            className={`font-sans text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-xl transition-all duration-300 border ${
              currentScreen === 'apply'
                ? 'bg-transparent border-secondary text-secondary hover:bg-secondary/10'
                : 'bg-primary border-primary text-white hover:bg-primary/90 hover:shadow-md'
            }`}
          >
            Apply Now
          </button>
        </nav>

        {/* Mobile Menu Action */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary focus:outline-none p-1 hover:text-secondary transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-outline-variant/20 shadow-lg py-6 px-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-5 duration-200">
          {currentScreen === 'home' ? (
            <>
              <button
                onClick={() => navigateToSection('metodologia')}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Metodología
              </button>
              <button
                onClick={() => navigateToSection('curso')}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Curso
              </button>
              <button
                onClick={() => navigateToSection('precios')}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Pricing
              </button>
              <button
                onClick={() => navigateToSection('politicas')}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Políticas
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setScreen('contact');
                }}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1"
              >
                Contacto
              </button>
            </>
          ) : currentScreen === 'apply' ? (
            <>
              <button
                onClick={() => navigateToSection('filosofia-bio')}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Philosophy
              </button>
              <button
                onClick={() => navigateToSection('metodologia')}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Methodology
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setScreen('contact');
                }}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1"
              >
                Contacto
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setScreen('home');
                  setTimeout(() => navigateToSection('precios'), 100);
                }}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Sesiones
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setScreen('home');
                  setTimeout(() => navigateToSection('filosofia-bio'), 100);
                }}
                className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant py-1 border-b border-outline-variant/10"
              >
                Filosofía
              </button>
              <span className="text-left font-sans text-sm uppercase tracking-widest font-bold text-secondary py-1">
                Contacto
              </span>
            </>
          )}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setScreen('apply');
            }}
            className="w-full text-center bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold py-3 rounded-xl hover:bg-primary/90 mt-2"
          >
            Apply Now
          </button>
        </div>
      )}
    </header>
  );
}
