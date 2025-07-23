import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-reale-black border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          

          {/* Soluções */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Soluções</h3>
            <nav className="space-y-2">
              <a href="#crypto" className="block text-white/70 hover:text-white transition-colors duration-300">Compra de Cripto</a>
              <a href="#conta" className="block text-white/70 hover:text-white transition-colors duration-300">Conta Digital</a>
              <a href="#pagamentos" className="block text-white/70 hover:text-white transition-colors duration-300">Pagamentos</a>
              <a href="#api" className="block text-white/70 hover:text-white transition-colors duration-300">API</a>
            </nav>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Empresa</h3>
            <nav className="space-y-2">
              <a href="#sobre" className="block text-white/70 hover:text-white transition-colors duration-300">Sobre nós</a>
              <a href="#carreiras" className="block text-white/70 hover:text-white transition-colors duration-300">Carreiras</a>
              
              
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail className="w-4 h-4" />
                <span>contato@realebank.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone className="w-4 h-4" />
                <span>+55 11 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <a href="#termos" className="hover:text-white transition-colors duration-300">Termos de Uso</a>
              <a href="#privacidade" className="hover:text-white transition-colors duration-300">Política de Privacidade</a>
              <a href="#cookies" className="hover:text-white transition-colors duration-300">Cookies</a>
            </div>
            <div className="text-sm text-white/60">
              © 2024 Reale Bank. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;