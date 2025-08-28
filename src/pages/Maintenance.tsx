import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-reale-black via-reale-dark-gray to-reale-black flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-reale-blue/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Wrench className="w-12 h-12 text-reale-blue" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Estamos em manutenção no momento
        </h1>
        
        <p className="text-white/70 text-lg mb-8">
          Favor aguarde alguns minutos :)
        </p>
        
        <Link to="/">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Maintenance;