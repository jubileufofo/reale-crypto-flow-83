"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { HamburgerButton } from '@/components/ui/hamburger-button';
import { 
  Home, 
  Bitcoin, 
  Settings, 
  UserCircle, 
  PlusCircle, 
  Smartphone, 
  ChevronDown,
  ChevronUp,
  CreditCard,
  Zap,
  Code
} from 'lucide-react';

interface DockProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Dock({ isOpen, onClose }: DockProps) {
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const menuItems = [
    { 
      label: 'Home', 
      href: '#home', 
      icon: Home,
      action: 'scroll'
    },
    { 
      label: 'Comprar Cripto', 
      href: '#crypto-section', 
      icon: Bitcoin,
      action: 'scroll'
    },
    { 
      label: 'Suporte', 
      href: '#footer', 
      icon: Settings,
      action: 'scroll'
    },
    { 
      label: 'API e Desenvolvedores', 
      href: '#api-developers', 
      icon: Code,
      action: 'scroll'
    },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.action === 'scroll' && item.href.startsWith('#')) {
      const targetId = item.href.slice(1);
      
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
        return;
      }
      
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      onClose();
    }
  };

  const handleAccountDropdownClick = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleAccountOptionClick = (option: 'digital' | 'crypto') => {
    setIsAccountDialogOpen(true);
    setIsAccountDropdownOpen(false);
  };

  const handleAppDownloadClick = () => {
    setIsAccountDialogOpen(false);
    const element = document.getElementById('app-download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-500 ease-in-out"
          onClick={onClose}
        />
      )}

      {/* Dock */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-80 bg-reale-black/95 backdrop-blur-xl 
          border-l border-white/10 z-50 
          transition-all duration-500 ease-in-out
          ${isOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
          }
        `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold text-white">
                Reale Bank
              </span>
            </div>
            <HamburgerButton 
              className="text-white border-white/20 hover:bg-white/10"
              open={isOpen}
              setOpen={() => onClose()}
            />
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center gap-3 text-white hover:text-reale-yellow"
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}

            {/* Abra sua Conta Button */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <button 
                onClick={handleAppDownloadClick}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-300 flex items-center gap-3 justify-start text-base"
              >
                <PlusCircle className="w-5 h-5" />
                Abra sua Conta
              </button>
            </div>

            {/* Account Dropdown Section */}
            <div className="pt-2">
              <button
                onClick={handleAccountDropdownClick}
                className="w-full px-4 py-3 bg-reale-blue hover:bg-reale-blue/90 rounded-lg transition-all duration-300 flex items-center justify-between text-white text-base"
              >
                <div className="flex items-center gap-3">
                  <UserCircle className="w-5 h-5" />
                  Acesse sua conta
                </div>
                {isAccountDropdownOpen ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                }
              </button>

              {/* Dropdown Options */}
              <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isAccountDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => handleAccountOptionClick('digital')}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 rounded-md transition-all duration-200 flex items-center gap-3 text-white/80 hover:text-reale-yellow text-sm"
                  >
                    <CreditCard className="w-4 h-4" />
                    Conta digital completa
                  </button>
                  <button
                    onClick={() => handleAccountOptionClick('crypto')}
                    className="w-full text-left px-4 py-2 hover:bg-white/5 rounded-md transition-all duration-200 flex items-center gap-3 text-white/80 hover:text-reale-yellow text-sm"
                  >
                    <Zap className="w-4 h-4" />
                    Conta de compra rápida cripto
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Account Dialog */}
      <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
        <DialogContent className="bg-reale-black/95 backdrop-blur-xl border-white/10">
          <DialogTitle className="text-white text-center">Entrar na minha conta</DialogTitle>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-white/80 text-center">
              Para entrar na sua conta digital completa baixe o app do Reale clicando aqui
            </p>
            <Button 
              onClick={handleAppDownloadClick}
              className="w-full bg-reale-blue hover:bg-reale-blue/90 text-white shadow-lg transition-all duration-300"
            >
              Baixar App
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}