'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Bitcoin, Loader2, Plus, Lock, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}
interface SwapState {
  realAmount: string;
  cryptoAmount: string;
  isLoading: boolean;
  selectedCrypto: 'bitcoin' | 'ethereum' | 'usdt';
}
const cryptoOptions = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿'
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ'
  },
  usdt: {
    name: 'USDT',
    symbol: 'USDT',
    icon: '₮'
  }
};
const moreCryptoOptions = [{
  name: 'Solana',
  symbol: 'SOL',
  icon: '◎'
}, {
  name: 'Cardano',
  symbol: 'ADA',
  icon: '₳'
}, {
  name: 'Polygon',
  symbol: 'MATIC',
  icon: '⬣'
}, {
  name: 'Chainlink',
  symbol: 'LINK',
  icon: '🔗'
}, {
  name: 'Litecoin',
  symbol: 'LTC',
  icon: 'Ł'
}, {
  name: 'Dogecoin',
  symbol: 'DOGE',
  icon: 'Ð'
}];
export function CryptoSwapComponent() {
  const [swapState, setSwapState] = useState<SwapState>({
    realAmount: '',
    cryptoAmount: '',
    isLoading: false,
    selectedCrypto: 'bitcoin'
  });
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, CryptoPrice>>({});
  const [isPriceLoading, setIsPriceLoading] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Função para buscar preços da OKX
  const fetchCryptoPrices = async () => {
    try {
      setIsPriceLoading(true);

      // Mapping dos símbolos para a API da OKX
      const symbolMap = {
        bitcoin: 'BTC-USDT',
        ethereum: 'ETH-USDT',
        usdt: 'USDT-BRL'
      };
      const promises = Object.entries(symbolMap).map(async ([key, symbol]) => {
        const response = await fetch(`https://www.okx.com/api/v5/market/ticker?instId=${symbol}`);
        const data = await response.json();
        if (data.code === '0' && data.data?.[0]) {
          const tickerData = data.data[0];
          let priceInBRL = parseFloat(tickerData.last);

          // Se não for USDT-BRL, converter para BRL (assumindo 1 USD = 5.20 BRL)
          if (symbol !== 'USDT-BRL') {
            priceInBRL = priceInBRL * 5.20;
          }
          return {
            [key]: {
              symbol: key === 'bitcoin' ? 'BTC' : key === 'ethereum' ? 'ETH' : 'USDT',
              price: priceInBRL,
              change24h: parseFloat(tickerData.sodUtc8) || 0
            }
          };
        }
        return {};
      });
      const results = await Promise.all(promises);
      const pricesData = results.reduce((acc, curr) => ({
        ...acc,
        ...curr
      }), {});
      setCryptoPrices(pricesData);
    } catch (error) {
      console.error('Erro ao buscar preços:', error);
      // Preços de fallback
      setCryptoPrices({
        bitcoin: {
          symbol: 'BTC',
          price: 260000,
          change24h: 2.5
        },
        ethereum: {
          symbol: 'ETH',
          price: 12000,
          change24h: -1.2
        },
        usdt: {
          symbol: 'USDT',
          price: 5.20,
          change24h: 0.1
        }
      });
    } finally {
      setIsPriceLoading(false);
    }
  };

  // Buscar preços ao carregar o componente
  useEffect(() => {
    fetchCryptoPrices();
    // Atualizar preços a cada 30 segundos
    const interval = setInterval(fetchCryptoPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calcular o valor em crypto quando o valor em reais muda
  useEffect(() => {
    if (swapState.realAmount && cryptoPrices[swapState.selectedCrypto]) {
      const realValue = parseFloat(swapState.realAmount.replace(/[^\d,]/g, '').replace(',', '.'));
      const cryptoPrice = cryptoPrices[swapState.selectedCrypto].price;
      if (!isNaN(realValue) && cryptoPrice > 0) {
        const cryptoAmount = (realValue / cryptoPrice).toFixed(8);
        setSwapState(prev => ({
          ...prev,
          cryptoAmount
        }));
      }
    } else {
      setSwapState(prev => ({
        ...prev,
        cryptoAmount: ''
      }));
    }
  }, [swapState.realAmount, swapState.selectedCrypto, cryptoPrices]);
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';
    const formatted = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
    return formatted;
  };
  const handleRealAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setSwapState(prev => ({
      ...prev,
      realAmount: formatted
    }));
  };
  const handleSimulateSwap = async () => {
    if (!swapState.realAmount || !swapState.cryptoAmount) return;
    setSwapState(prev => ({
      ...prev,
      isLoading: true
    }));

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSwapState(prev => ({
      ...prev,
      isLoading: false,
      realAmount: '',
      cryptoAmount: ''
    }));
  };
  const selectedCryptoData = cryptoOptions[swapState.selectedCrypto];
  const currentPrice = cryptoPrices[swapState.selectedCrypto];
  return <div className="w-full max-w-md mx-auto px-4">
      <motion.div className="bg-reale-dark-gray/50 backdrop-blur-lg border border-reale-gray rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-full overflow-hidden" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-reale-white mb-2">
            Simulador de Compra
          </h2>
          <p className="text-sm text-reale-white/60">
            Veja como é fácil e rápido
          </p>
        </div>

        {/* Valor em Reais */}
        <div className="mb-4">
          <label className="block text-sm text-reale-white/80 mb-2">
            Valor em Reais
          </label>
          <div className="relative">
            <input type="text" placeholder="R$ 1.000,00" value={swapState.realAmount} onChange={handleRealAmountChange} className="w-full bg-reale-black/50 border border-reale-gray rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg font-semibold text-reale-white placeholder:text-reale-white/40 focus:outline-none focus:border-reale-blue transition-colors" />
          </div>
        </div>

        {/* Seleção de Criptomoeda */}
        <div className="mb-6">
          <label className="block text-sm text-reale-white/80 mb-3">
            Criptomoeda
          </label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {Object.entries(cryptoOptions).map(([key, crypto]) => <motion.button key={key} className={cn("p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-200 text-center min-h-[50px] sm:min-h-[60px]", swapState.selectedCrypto === key ? "bg-reale-blue/20 border-reale-blue text-reale-blue" : "bg-reale-black/30 border-reale-gray text-reale-white/60 hover:border-reale-white/40")} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={() => setSwapState(prev => ({
            ...prev,
            selectedCrypto: key as any
          }))}>
                <div className="text-base sm:text-lg font-bold">{crypto.icon}</div>
                <div className="text-xs font-medium">{crypto.symbol}</div>
              </motion.button>)}
          </div>

          {/* Botão Ver Mais Opções */}
          <Dialog open={showMoreOptions} onOpenChange={setShowMoreOptions}>
            <DialogTrigger asChild>
              <motion.button className="w-full p-3 rounded-xl border border-dashed border-reale-gray text-reale-white/60 hover:border-reale-blue hover:text-reale-blue transition-all duration-200 flex items-center justify-center gap-2" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Ver mais opções</span>
              </motion.button>
            </DialogTrigger>
            
            <DialogContent className="bg-reale-dark-gray border-reale-gray max-w-md">
              <DialogHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-reale-blue/20 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-reale-blue" />
                </div>
                <DialogTitle className="text-xl font-bold text-reale-white">
                  Mais Opções Disponíveis
                </DialogTitle>
                <DialogDescription className="text-reale-white/70 mt-2">
                  Para acessar mais de 50+ criptomoedas disponíveis, é necessário criar uma conta gratuita.
                </DialogDescription>
              </DialogHeader>

              {/* Preview das opções bloqueadas */}
              <div className="my-6">
                <p className="text-sm text-reale-white/60 mb-3">Algumas das opções disponíveis:</p>
                <div className="grid grid-cols-3 gap-2 opacity-60">
                  {moreCryptoOptions.slice(0, 6).map((crypto, index) => <div key={index} className="bg-reale-black/30 border border-reale-gray rounded-lg p-2 text-center relative">
                      <div className="text-sm font-bold text-reale-white/50">{crypto.icon}</div>
                      <div className="text-xs text-reale-white/40">{crypto.symbol}</div>
                      <div className="absolute inset-0 bg-reale-black/50 rounded-lg flex items-center justify-center">
                        <Lock className="w-3 h-3 text-reale-white/40" />
                      </div>
                    </div>)}
                </div>
              </div>

              <DialogFooter className="flex flex-col gap-3">
                <Button className="w-full bg-gradient-primary text-white hover:opacity-90 transition-all duration-300">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar Conta Gratuita
                </Button>
                <Button variant="outline" className="w-full border-reale-gray text-reale-white hover:bg-reale-gray/20">
                  Já tenho conta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Resultado */}
        {swapState.cryptoAmount && currentPrice && <motion.div className="bg-reale-blue/10 border border-reale-blue/30 rounded-xl p-4 mb-6" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} transition={{
        duration: 0.3
      }}>
            <div className="flex items-center justify-between">
              <span className="text-reale-white/80">Você receberá:</span>
              <div className="text-right">
                <div className="text-lg font-bold text-reale-blue">
                  ≈ {swapState.cryptoAmount} {selectedCryptoData.symbol}
                </div>
                {isPriceLoading ? <div className="text-xs text-reale-white/40 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Atualizando...
                  </div> : <div className="text-xs text-reale-white/60">
                    R$ {currentPrice.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por {selectedCryptoData.symbol}
                  </div>}
              </div>
            </div>
          </motion.div>}

        {/* Botão de Simular */}
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-white/90 flex items-center gap-2 px-8 py-4 text-lg font-semibold w-full"
          onClick={() => window.location.href = '/maintenance'}
        >
          <ArrowUpDown className="w-5 h-5" />
          Comprar Cripto Agora
        </Button>

        {/* Info adicional */}
        <div className="mt-4 text-center">
          <p className="text-xs text-reale-white/40">*Simulação baseada em preços em tempo real </p>
        </div>
      </motion.div>
    </div>;
}