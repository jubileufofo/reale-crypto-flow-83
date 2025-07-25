import React, { useEffect, useState } from 'react';
import { CreditCard, Zap, BarChart3, Wallet, Repeat, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const SolutionsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setIsVisible(true);
          setHasBeenVisible(true);
          // Delay typewriter effect
          setTimeout(() => setShowTypewriter(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('solutions-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasBeenVisible]);

  const solutions = [
    {
      icon: CreditCard,
      title: "Conta Digital",
      description: "Conta completa para pessoas físicas e jurídicas com todas as funcionalidades bancárias",
      features: ["Transferências", "Pagamentos", "Cartão virtual", "Extrato em tempo real"],
      color: "primary"
    },
    {
      icon: Zap,
      title: "Pix Instantâneo",
      description: "Pagamentos e recebimentos via Pix com liquidação imediata e taxas reduzidas",
      features: ["24/7 disponível", "Taxa zero", "API integrada", "Automação"],
      color: "accent"
    },
    {
      icon: BarChart3,
      title: "Painel de Controle",
      description: "Dashboard completo para acompanhar todas suas transações e métricas em tempo real",
      features: ["Analytics", "Relatórios", "Notificações", "Personalização"],
      color: "primary"
    },
    {
      icon: Wallet,
      title: "Carteira Integrada",
      description: "Guarde e gerencie suas criptomoedas com segurança máxima e interface intuitiva",
      features: ["Multi-crypto", "Cold storage", "Backup", "Recovery"],
      color: "accent"
    },
    {
      icon: Repeat,
      title: "Compra e Venda de Cripto",
      description: "Trade de criptomoedas com as melhores taxas do mercado e execução instantânea",
      features: ["Taxas baixas", "Execução rápida", "Múltiplas moedas", "Trading avançado"],
      color: "primary"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção de nível bancário com autenticação multifator e criptografia de ponta",
      features: ["2FA", "Biometria", "Criptografia", "Auditoria"],
      color: "accent"
    }
  ];

  // Componente de contador animado
  const AnimatedCounter = ({ targetValue, isVisible, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    
    useEffect(() => {
      if (!isVisible || hasAnimated) return;
      
      const timeout = setTimeout(() => {
        // Extrair o número corretamente baseado no formato
        let numericValue = 0;
        let originalSuffix = '';
        
        if (targetValue.includes('%')) {
          numericValue = parseFloat(targetValue.replace('%', ''));
          originalSuffix = '%';
        } else if (targetValue.includes('+')) {
          numericValue = parseFloat(targetValue.replace('+', ''));
          originalSuffix = '+';
        } else if (targetValue.includes('/')) {
          // Para "24/7", extrair apenas o primeiro número
          const parts = targetValue.split('/');
          numericValue = parseFloat(parts[0]);
          originalSuffix = `/${parts[1]}`;
        } else if (targetValue.includes('-bit')) {
          numericValue = parseFloat(targetValue.replace('-bit', ''));
          originalSuffix = '-bit';
        } else {
          numericValue = parseFloat(targetValue);
        }
        
        const duration = 1500; // Reduzido para ser mais rápido
        const steps = 30; // Menos steps para melhor performance
        const increment = numericValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setCount(numericValue);
            setHasAnimated(true);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      }, delay);
      
      return () => clearTimeout(timeout);
    }, [targetValue, isVisible, delay, hasAnimated]);
    
    // Formatar o valor de volta ao formato original
    const formatValue = (value) => {
      if (targetValue.includes('%')) {
        return `${value.toFixed(1)}%`;
      } else if (targetValue.includes('+')) {
        return `+${Math.round(value)}`;
      } else if (targetValue.includes('/')) {
        const parts = targetValue.split('/');
        return `${Math.round(value)}/${parts[1]}`;
      } else if (targetValue.includes('-bit')) {
        return `${Math.round(value)}-bit`;
      }
      return Math.round(value).toString();
    };
    
    return <span className="tabular-nums">{formatValue(count)}</span>;
  };

  return (
    <section id="solutions-section" className="py-24 bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
      {/* Background Effects - Estático */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/2 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block overflow-hidden">
              <span 
                className={`inline-block ${showTypewriter ? 'animate-typewriter' : ''}`}
                style={{
                  animation: showTypewriter ? 'typewriter 2s steps(14, end), blink 0.75s step-end infinite' : 'none',
                  whiteSpace: 'nowrap',
                  borderRight: showTypewriter ? '3px solid hsl(var(--reale-blue))' : 'none',
                  overflow: 'hidden',
                  width: showTypewriter ? '100%' : '0'
                }}
              >
                Soluções Reale Bank
              </span>
            </span>
          </h2>
          <p className={`text-xl text-white/70 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Tecnologia de ponta para revolucionar sua experiência financeira
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 delay-${index * 100} ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Glow - Azul */}
              <div className={`absolute -inset-px bg-blue-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Card Content */}
              <div className="relative z-10 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-800/50 hover:border-blue-500/30 transition-all duration-500">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  hoveredCard === index 
                    ? 'bg-blue-500/20 scale-110' 
                    : 'bg-zinc-800/50'
                }`}>
                  <solution.icon className={`w-8 h-8 transition-colors duration-300 ${
                    hoveredCard === index 
                      ? 'text-blue-400' 
                      : 'text-zinc-400'
                  }`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  hoveredCard === index ? 'text-blue-400' : 'text-white'
                }`}>
                  {solution.title}
                </h3>
                <p className={`mb-6 transition-colors duration-300 ${
                  hoveredCard === index ? 'text-zinc-300' : 'text-zinc-400'
                }`}>
                  {solution.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`flex items-center space-x-2 transition-all duration-300 delay-${featureIndex * 100} ${
                        hoveredCard === index ? 'translate-x-2' : ''
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        hoveredCard === index 
                          ? 'bg-blue-400' 
                          : 'bg-zinc-600'
                      }`}></div>
                      <span className={`text-sm transition-colors duration-300 ${
                        hoveredCard === index 
                          ? 'text-zinc-300' 
                          : 'text-zinc-500'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive Element */}
                <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 transition-all duration-500 ${
                  hoveredCard === index 
                    ? 'border-blue-400 bg-blue-400/20 scale-110' 
                    : 'border-zinc-600'
                }`}>
                  <div className={`w-full h-full rounded-full transition-all duration-500 ${
                    hoveredCard === index 
                      ? 'bg-blue-400/20 animate-ping' 
                      : ''
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "+50", label: "Integrações" },
              { number: "24/7", label: "Suporte" },
              { number: "256-bit", label: "Criptografia" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter 
                    targetValue={stat.number} 
                    isVisible={isVisible} 
                    delay={1000 + (index * 150)} 
                  />
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Particles - Estático */}
      <div className="absolute top-20 right-10 w-2 h-2 bg-blue-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-500 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-50"></div>
    </section>
  );
};

export default SolutionsSection;