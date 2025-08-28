import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical, CheckCircle, Zap, Clock, Shield, Users, Bitcoin, ArrowRight } from "lucide-react";

function AccountOptionsSlider() {
  const [inset, setInset] = useState<number>(25);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);
  const [startTouch, setStartTouch] = useState<{ x: number; time: number } | null>(null);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    let newInset = Math.max(5, Math.min(95, percentage));
    
    // Auto-snap to edges when close
    if (newInset <= 20) {
      newInset = 5;
    } else if (newInset >= 80) {
      newInset = 95;
    }
    
    setInset(newInset);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartTouch({ 
      x: touch.clientX, 
      time: Date.now() 
    });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startTouch) return;
    
    const touchDuration = Date.now() - startTouch.time;
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Se foi um tap rápido (menos de 200ms), trata como clique
    if (touchDuration < 200) {
      const x = startTouch.x - rect.left;
      const percentage = (x / rect.width) * 100;
      let newInset = Math.max(5, Math.min(95, percentage));
      
      // Auto-snap to edges when close
      if (newInset <= 20) {
        newInset = 5;
      } else if (newInset >= 80) {
        newInset = 95;
      }
      
      setInset(newInset);
    }
    
    setStartTouch(null);
    setOnMouseDown(false);
  };

  const onClick = (e: React.MouseEvent) => {
    // Só funciona em desktop
    if (onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    let newInset = Math.max(5, Math.min(95, percentage));
    
    // Auto-snap to edges when close
    if (newInset <= 20) {
      newInset = 5;
    } else if (newInset >= 80) {
      newInset = 95;
    }
    
    setInset(newInset);
  };

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl overflow-x-hidden">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="text-center px-4">
            <Badge variant="outline" className="mb-4">Escolha sua Opção</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter font-bold text-white mb-4 leading-tight">
              Crie sua Carteira Segura
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed tracking-tight text-gray-300 px-2">
              Clique ou arraste o slider para comparar entre carteira completa e compra rápida de cripto
            </p>
          </div>
          
          <div className="pt-4 sm:pt-6 md:pt-12 lg:pt-16 w-full">
            <div
              className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden rounded-xl sm:rounded-2xl select-none bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 cursor-pointer"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={onTouchEnd}
              onClick={onClick}
              onTouchStart={onTouchStart}
            >
              {/* Slider Handle */}
              <div
                className="bg-white/20 backdrop-blur-sm h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-white rounded-full hover:scale-110 transition-all w-8 h-8 select-none -translate-y-1/2 absolute top-1/2 -ml-4 z-30 cursor-ew-resize flex justify-center items-center shadow-lg"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none text-gray-600" />
                </button>
              </div>

              {/* Left Side - Carteira Segura Completa */}
              <div
                className="absolute left-0 top-0 z-10 w-full h-full rounded-2xl select-none bg-gradient-to-br from-blue-900 to-blue-800 transition-all duration-300"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                  filter: inset > 50 ? `blur(${Math.min((inset - 50) * 0.1, 5)}px)` : "none",
                }}
              >
                <div className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8 overflow-y-auto">
                  <div className="text-center text-white space-y-3 sm:space-y-4 max-w-sm sm:max-w-md mx-auto w-full h-full flex flex-col justify-center py-4">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white">
                        Crie sua Carteira Segura Multichain
                      </h3>
                      <p className="text-blue-200 text-sm sm:text-base">
                        Armazene e gerencie suas criptos com segurança
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Conta 100% Digital</h4>
                          <p className="text-xs sm:text-sm text-blue-200">Abertura totalmente online, sem burocracia</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Receba Dinheiro</h4>
                          <p className="text-xs sm:text-sm text-blue-200">Transferências e depósitos instantâneos</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Pix e Boletos</h4>
                          <p className="text-xs sm:text-sm text-blue-200">Pague boletos e faça Pix sem taxas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Conta do Dia a Dia</h4>
                          <p className="text-xs sm:text-sm text-blue-200">Use sua conta Reale para tudo</p>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto mt-2">
                      Criar Carteira Segura
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Compra Rápida de Cripto */}
              <div 
                className="absolute left-0 top-0 w-full h-full rounded-2xl select-none bg-gradient-to-br from-gray-900 to-gray-800 transition-all duration-300"
                style={{
                  filter: inset < 50 ? `blur(${Math.min((50 - inset) * 0.1, 5)}px)` : "none",
                }}
              >
                <div className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8 overflow-y-auto">
                  <div className="text-center text-white space-y-3 sm:space-y-4 max-w-sm sm:max-w-md mx-auto w-full h-full flex flex-col justify-center py-4">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                        Compre Cripto Rapidamente
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Crie sua conta de compra rápida de cripto
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Escolha sua cripto</h4>
                          <p className="text-xs sm:text-sm text-gray-300">Bitcoin, Ethereum, USDT e outras disponíveis</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Pegue seu Pix</h4>
                          <p className="text-xs sm:text-sm text-gray-300">Pagamento instantâneo via Pix</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">Receba na carteira</h4>
                          <p className="text-xs sm:text-sm text-gray-300">Criptomoeda enviada direto para sua wallet</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="bg-blue-500 text-white hover:bg-blue-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto">
                        Compre Agora
                      </Button>
                      <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                        Compra feita via plataforma do Reale. Você pode comprar cripto direto na sua carteira segura.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AccountOptionsSlider };