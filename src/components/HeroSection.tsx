import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Elements - Estático */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-primary/5 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-accent/15 rounded-full"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'animate-scale-in' : ''}`}>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm text-white">Nova era dos pagamentos digitais</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-up' : ''}`}>
            Transforme seus{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow">
              Reais em Cripto
            </span>{' '}
            de forma <span className="text-primary">rápida</span>, <span className="text-accent">segura</span> e <span className="text-primary">moderna</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-up' : ''}`}>
            Pague com <strong>Pix</strong> e receba diretamente na nossa <strong>Carteira Segura Multichain</strong>, com <strong>swap integrado</strong>.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'animate-scale-in' : ''}`}>
            <Button className="btn-primary group">
              Comprar Cripto com Pix
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button className="btn-ghost">
              Conheça a Carteira
            </Button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-in' : ''}`}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-white">+500%</span>
              </div>
              <p className="text-white/60">Crescimento em 2024</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-accent mr-2" />
                <span className="text-2xl font-bold text-white">100%</span>
              </div>
              <p className="text-white/60">Seguro e Regulamentado</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <p className="text-white/60">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;