import { useState, useEffect } from 'react';
import { CheckCircle, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WalletSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });

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

    const element = document.getElementById('wallet-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(false);
      // Reset form or show success message
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="wallet-section" className="py-24 bg-reale-dark-gray relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Carteira Segura
              </span>{' '}
              Multichain
            </h2>
            <p className={`text-xl text-white/80 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              Armazene suas criptos com segurança avançada, swap integrado e suporte às principais redes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}>
              <div className="glass-card rounded-3xl p-8">
                {!isSubmitted ? (
                  <>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-white text-sm mb-2">E-mail</label>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm mb-2">Celular</label>
                        <Input
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-primary"
                        />
                      </div>

                      <Button type="submit" className="btn-primary w-full text-lg">
                        Criar Carteira Segura
                      </Button>
                    </form>

                    <p className="text-center text-white/60 text-sm mt-4">
                      Processo seguro e rápido
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Carteira criada com sucesso!</h3>
                    <p className="text-white/70 mb-6">
                      Sua Carteira Segura foi criada. Você receberá um e-mail com as instruções de acesso em breve.
                    </p>
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className={`space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Armazenamento Protegido</h3>
                    <p className="text-white/70">Cold storage e criptografia de ponta</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Swap Integrado</h3>
                    <p className="text-white/70">Troque tokens direto na carteira</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Multi-chain</h3>
                    <p className="text-white/70">BTC, ETH, SOL, POL suportados</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="glass-card rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">100%</div>
                    <div className="text-white/60 text-sm">Seguro</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">4+</div>
                    <div className="text-white/60 text-sm">Blockchains</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;