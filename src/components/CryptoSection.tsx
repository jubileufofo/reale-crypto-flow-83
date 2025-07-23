import { useEffect, useState } from 'react';
import { ArrowRight, Zap, CreditCard, Wallet, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextRevealByWord } from '@/components/ui/text-reveal';
import { CryptoSwapComponent } from '@/components/ui/crypto-swap';
import DisplayCards from '@/components/ui/display-cards';
import { motion } from 'framer-motion';
const CryptoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const element = document.getElementById('crypto-section');
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  const steps = [{
    icon: CreditCard,
    title: "Escolha sua cripto",
    description: "Bitcoin, Ethereum, USDT e mais",
    color: "text-white"
  }, {
    icon: Zap,
    title: "Insira seu Pix",
    description: "Pagamento instantâneo via Pix",
    color: "text-white"
  }, {
    icon: Wallet,
    title: "Receba na carteira",
    description: "Criptos direto na sua wallet",
    color: "text-white"
  }];
  return <section id="crypto-section" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-reale-black via-reale-dark-gray to-reale-black relative overflow-hidden">
      {/* Divisor dinâmico e amigável */}
      <div className="relative w-full mb-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-reale-black px-8">
            <motion.div 
              className="w-16 h-16 rounded-full bg-gradient-to-br from-reale-blue/30 to-purple-500/30 border border-white/20 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowDown className="w-6 h-6 text-white/80" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/8 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/6 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Gradient lines */}
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <motion.div 
              className={`inline-flex items-center space-x-2 backdrop-blur-sm bg-yellow-500/20 border border-yellow-400/30 px-4 py-2 rounded-full mb-6 transition-all duration-1000 ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-90'}`}
              animate={isVisible ? {
                scale: [1, 1.1, 1],
                y: [0, -2, 0]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={isVisible ? {
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.div>
              <span className="text-sm text-yellow-300 font-medium">Em segundos</span>
            </motion.div>
            
            <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-300 leading-tight px-4 tracking-tight ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'}`}>
              Compre Cripto{' '}
              <span className="text-white/60">
                com Pix
              </span>
            </h2>
            
            <div className="px-4 max-w-3xl mx-auto">
              <TextRevealByWord text="O processo mais simples e rápido para converter seus reais em criptomoedas" />
            </div>
          </div>

          {/* Interactive Steps with Stacked Cards */}
          <div className="flex justify-center items-center min-h-[300px] mb-8 sm:mb-12 lg:mb-16">
            <DisplayCards 
              cards={[
                {
                  icon: <CreditCard className="size-4 text-white" />,
                  title: "1",
                  description: "Escolha sua cripto",
                  date: "Bitcoin, Ethereum, USDT e mais",
                  iconClassName: "text-white",
                  titleClassName: "text-white",
                  className: "[grid-area:stack] w-[140%] translate-x-8 hover:-translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 bg-white/5 border-white/15 transition-all duration-700",
                },
                {
                  icon: <Zap className="size-4 text-white" />,
                  title: "2", 
                  description: "Gere seu Pix",
                  date: "Pagamento instantâneo via Pix",
                  iconClassName: "text-white",
                  titleClassName: "text-white",
                  className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 bg-white/5 border-white/15 transition-all duration-700",
                },
                {
                  icon: <Wallet className="size-4 text-white" />,
                  title: "3",
                  description: "Receba na carteira", 
                  date: "Criptos direto na sua wallet",
                  iconClassName: "text-white",
                  titleClassName: "text-white",
                  className: "[grid-area:stack] translate-x-24 translate-y-20 hover:-translate-y-1 bg-white/5 border-white/15 transition-all duration-700",
                },
              ]}
            />
          </div>

          {/* Demo Interface */}
          <div className={`max-w-2xl mx-auto mb-12 sm:mb-16 mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-90'}`}>
            <CryptoSwapComponent />
          </div>
        </div>
      </div>
    </section>;
};
export default CryptoSection;