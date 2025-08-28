import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HamburgerButton } from '@/components/ui/hamburger-button';
import { Dock } from '@/components/ui/dock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileHeader, setShowMobileHeader] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      
      if (shouldBeScrolled !== isScrolled) {
        if (shouldBeScrolled) {
          setTimeout(() => {
            setShowMobileHeader(true);
          }, 250);
        } else {
          setShowMobileHeader(false);
        }
      }
      
      setIsScrolled(shouldBeScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <>
      {/* Desktop/Tablet Header */}
      {/* Desktop/Tablet Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 hidden md:block ${
        isScrolled ? 'bg-reale-black/80 backdrop-blur-xl border-b border-white/10' : ''
      }`}>
        <div className="container mx-auto px-6 py-4 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg animate-glow"></div>
            <span className="text-2xl font-bold text-white">
              Reale Bank
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white/80 hover:text-white transition-colors duration-300">
              Home
            </a>
            <a href="#crypto" className="text-white/80 hover:text-white transition-colors duration-300">
              Comprar Cripto
            </a>
            <a href="#wallet" className="text-white/80 hover:text-white transition-colors duration-300">
              Carteira Segura
            </a>
            <a href="#api" className="text-white/80 hover:text-white transition-colors duration-300">
              API e Desenvolvedores
            </a>
            <a href="#support" className="text-white/80 hover:text-white transition-colors duration-300">
              Suporte
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Fixed Header */}
      <header 
        className={`
          fixed top-0 w-full z-40 
          transition-all duration-500 ease-in-out 
          md:hidden
          ${isScrolled && showMobileHeader 
            ? 'bg-reale-black/80 backdrop-blur-xl border-b border-white/10 translate-y-0 opacity-100' 
            : 'translate-y-[-20px] opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-lg"></div>
            <span className="text-lg font-bold text-white">
              Reale Bank
            </span>
          </div>
          <HamburgerButton 
            className="text-white border-white/20 hover:bg-white/10"
            open={isDockOpen}
            setOpen={setIsDockOpen}
          />
        </div>
      </header>

      {/* Dock Component */}
      <Dock isOpen={isDockOpen} onClose={() => setIsDockOpen(false)} />
    </>
  );
};

export default Header;