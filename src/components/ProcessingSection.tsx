import { useEffect, useState } from 'react';
import { RefreshCw, Shield, Globe, Puzzle, Briefcase } from 'lucide-react';
import { HeroMono } from '@/components/ui/hero-mono';

const ProcessingSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('processing-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const cards = [
    {
      icon: RefreshCw,
      title: "Pagamentos Automatizados",
      description: "Processamento 100% digital sem complicações",
      delay: "0s"
    },
    {
      icon: Shield,
      title: "KYC & AML Automatizados",
      description: "Fluxo semi-automático com integração simples",
      delay: "0.2s"
    },
    {
      icon: Globe,
      title: "Do digital ao real em segundos.",
      description: "Compre cripto ou receba em moeda local — direto, sem barreiras.",
      delay: "0.4s"
    },
    {
      icon: Puzzle,
      title: "Integração via API",
      description: "Conecte o Reale ao seu ecossistema com facilidade",
      delay: "0.6s"
    },
    {
      icon: Briefcase,
      title: "Conta PJ e PF",
      description: "Infraestrutura para empresas e pessoas físicas com cadastro ágil",
      delay: "0.8s"
    }
  ];

  return (
    <section id="processing-section" className="py-24 bg-reale-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            Infraestrutura de pagamentos para o futuro. Tecnologia blockchain, pagamentos locais e integração cripto. Tudo em um só lugar, sem intermediários desnecessários. Tudo isso com sua conta{' '}
            <span className="text-reale-blue font-semibold">digital completa</span>.
          </>
        }
        actions={[
          {
            label: "Baixe o app",
            href: "#app-download",
            variant: "default"
          }
        ]}
        className="min-h-[60vh] mb-16"
        titleClassName="text-4xl md:text-5xl lg:text-6xl"
        subtitleClassName="text-lg md:text-xl"
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
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
              <div className="w-10 h-10 bg-white/20 border border-white/30 rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-white/15 border border-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="text-white">
              <p className="font-semibold">+10.000 empresas conectadas</p>
              <p className="text-sm text-white/60">Processando milhões em transações</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - monocromáticos */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-white/40 rounded-full animate-float opacity-60"></div>
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-white/30 rounded-full animate-float opacity-40" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-20 w-2 h-2 bg-white/50 rounded-full animate-float opacity-80" style={{ animationDelay: '1.5s' }}></div>
    </section>
  );
};

export default ProcessingSection;