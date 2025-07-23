import Header from '@/components/Header';
import { Hero } from '@/components/ui/animated-hero';
import ProcessingSection from '@/components/ProcessingSection';
import CryptoSection from '@/components/CryptoSection';
import AccountSection from '@/components/AccountSection';
import SolutionsSection from '@/components/SolutionsSection';
import AppDownloadSection from '@/components/AppDownloadSection';
import Footer from '@/components/Footer';
import { FeatureSteps } from '@/components/ui/feature-section';
import { AccountOptionsSlider } from '@/components/ui/account-options-slider';

const features = [
  { 
    step: 'Passo 1', 
    title: 'Escolha Como Deseja Começar',
    content: 'Pague com Pix direto, ou abra sua conta digital em minutos com aprovação automática e KYC integrado para pessoa física ou jurídica.', 
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: 'Passo 2',
    title: 'Configure Seus Pagamentos',
    content: 'Use sua conta digital ou integre nossa API para aceitar pagamentos locais e globais com rapidez e simplicidade.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Passo 3',
    title: 'Comece a Operar',
    content: 'Compre cripto com Pix, processe pagamentos e gerencie suas transações com segurança e eficiência.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
]

const Index = () => {
  return (
    <div className="min-h-screen bg-reale-black">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <ProcessingSection />
      <CryptoSection />
      <div id="account-section">
        <AccountOptionsSlider />
      </div>
      <SolutionsSection />
      <FeatureSteps 
        features={features}
        title="Como Começar no Reale"
        autoPlayInterval={4000}
      />
      <div id="app-download">
        <AppDownloadSection />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
