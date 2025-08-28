import { useState, useEffect } from 'react';
import { CheckCircle, User, Building, Mail, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AccountSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [accountType, setAccountType] = useState<'pf' | 'pj'>('pf');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    document: '',
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

    const element = document.getElementById('account-section');
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
    <section id="account-section" className="py-24 bg-reale-dark-gray relative overflow-hidden">
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
              Abra sua{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Conta Digital
              </span>
            </h2>
            <p className={`text-xl text-white/80 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              Conta completa para pessoa física e jurídica com aprovação em minutos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}>
              <div className="glass-card rounded-3xl p-8">
                {!isSubmitted ? (
                  <>
                    {/* Account Type Selector */}
                    <div className="flex space-x-4 mb-8">
                      <button
                        onClick={() => setAccountType('pf')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-300 ${
                          accountType === 'pf' 
                            ? 'bg-primary text-white' 
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Pessoa Física</span>
                      </button>
                      <button
                        onClick={() => setAccountType('pj')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-300 ${
                          accountType === 'pj' 
                            ? 'bg-primary text-white' 
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <Building className="w-5 h-5" />
                        <span>Pessoa Jurídica</span>
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-white text-sm mb-2">
                          {accountType === 'pf' ? 'Nome Completo' : 'Razão Social'}
                        </label>
                        <Input
                          placeholder={accountType === 'pf' ? 'Seu nome completo' : 'Nome da empresa'}
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm mb-2">
                          {accountType === 'pf' ? 'CPF' : 'CNPJ'}
                        </label>
                        <Input
                          placeholder={accountType === 'pf' ? '000.000.000-00' : '00.000.000/0000-00'}
                          value={formData.document}
                          onChange={(e) => handleInputChange('document', e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-primary"
                        />
                      </div>

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
                        Abrir Conta Digital
                      </Button>
                    </form>

                    <p className="text-center text-white/60 text-sm mt-4">
                      Análise em até 24 horas úteis
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Conta enviada para análise!</h3>
                    <p className="text-white/70 mb-6">
                      Recebemos sua solicitação e nossa equipe irá analisar seus dados.
                      Você receberá um e-mail com o resultado em até 24 horas.
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
                    <h3 className="text-xl font-bold text-white mb-2">Conta 100% Digital</h3>
                    <p className="text-white/70">Abertura totalmente online sem burocracia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">KYC Automatizado</h3>
                    <p className="text-white/70">Verificação de identidade rápida e segura</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Suporte Especializado</h3>
                    <p className="text-white/70">Atendimento personalizado para sua conta</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="glass-card rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">98%</div>
                    <div className="text-white/60 text-sm">Aprovação</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">24h</div>
                    <div className="text-white/60 text-sm">Análise</div>
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

export default AccountSection;