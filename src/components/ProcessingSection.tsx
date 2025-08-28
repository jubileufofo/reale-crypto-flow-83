import { useEffect, useState } from 'react';
import { RefreshCw, Shield, Globe, Puzzle, Briefcase } from 'lucide-react';
import { HeroMono } from '@/components/ui/hero-mono';

const ProcessingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.disconnect(); // Desconecta após animar uma vez
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('processing-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const cards = [
    {
      icon: RefreshCw,
      title: "Compra Instantânea",
      description: "Processamento de compra via Pix em segundos",
      delay: "0s"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção de alto nível com criptografia de ponta",
      delay: "0.2s"
    },
    {
      icon: Globe,
      title: "Carteira Multichain",
      description: "Suporte a BTC, ETH, SOL, POL em uma só carteira",
      delay: "0.4s"
    },
    {
      icon: Puzzle,
      title: "Integração via API",
      description: "Conecte o Reale ao seu ecossistema com facilidade",
      delay: "0.6s"
    }
  ];

  return (
    <section id="processing-section" className="py-24 bg-reale-black relative overflow-hidden">
      {/* Background Elements - Estático */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <HeroMono
        title={
          <>
            Processamento de pagamento{' '}
            <span className="text-white/60">mais inteligente</span>
          </>
        }
        subtitle={
          <>
            Compre cripto via Pix e armazene na Carteira Segura Multichain. Swap integrado, segurança avançada e suporte às principais redes blockchain, tudo em um só lugar.
          </>
        }
        actions={[
          {
            label: "Baixe o app",
            href: "/maintenance",
            variant: "default"
          }
        ]}
        className="min-h-[60vh] mb-16"
        titleClassName="text-4xl md:text-5xl lg:text-6xl"
        subtitleClassName="text-lg md:text-xl"
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`interactive-card group transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}
              style={{ animationDelay: isVisible ? card.delay : '0s' }}
            >
               {/* Icon Container */}
               <div className="relative mb-6">
                 <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                   <card.icon className="w-8 h-8 text-white" />
                 </div>
                 {/* Glow Effect */}
                 <div className="absolute -inset-2 bg-white/10 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl"></div>
               </div>

               {/* Content */}
               <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors duration-300">
                 {card.title}
               </h3>
               <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                 {card.description}
               </p>

               {/* Hover Line */}
               <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/40 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-4 glass-card px-8 py-4 rounded-2xl">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-white/20 border border-white/30 rounded-full"></div>
              <div className="w-10 h-10 bg-white/15 border border-white/25 rounded-full"></div>
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full"></div>
            </div>
            <div className="text-white">
              <p className="font-semibold">+10.000 empresas conectadas</p>
              <p className="text-sm text-white/60">Processando milhões em transações</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Estático */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full opacity-40"></div>
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-white/20 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-20 w-2 h-2 bg-white/25 rounded-full opacity-50"></div>
    </section>
  );
};

export default ProcessingSection;