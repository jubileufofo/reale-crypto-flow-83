import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
const AppDownloadSection = () => {
  return <section className="bg-reale-black overflow-hidden">
      <ContainerScroll titleComponent={<div className="text-center">
            <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
              <span className="text-sm text-yellow-300 font-medium mb-4 block">Baixe a Reale Wallet
        </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Tudo na palma{' '}
                <span className="text-white/60">
                  da sua mão
                </span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">Acesse sua Carteira Segura Multichain no app: compra de cripto via Pix, swap integrado e segurança de alto nível.</p>
              
              <div className="flex gap-4 justify-center">
                <motion.a href="#" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  <Apple className="w-6 h-6" />
                  App Store
                </motion.a>
                <motion.a href="#" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  <Play className="w-6 h-6" />
                  Google Play
                </motion.a>
              </div>
            </motion.div>
          </div>}>
        <div className="h-full w-full p-4 md:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">R</span>
            </div>
            <span className="text-white font-semibold text-xl">Reale</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 text-base">Saldo Disponível</h3>
              <p className="text-2xl font-bold text-zinc-300">R$ 12.547,89 (R$+Cripto)</p>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 text-base">Cripto Portfolio</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Bitcoin</span>
                  <span className="text-green-400 text-sm">+2.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Ethereum</span>
                  <span className="text-green-400 text-sm">+1.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Solana</span>
                  <span className="text-red-400 text-sm">-0.8%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 text-base">Comprar Cripto</h3>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-3 text-black">
                <p className="text-xs font-medium">Compra Instantânea</p>
                <p className="font-bold text-base">Bitcoin/Pix</p>
                <p className="text-xs">Disponível 24/7</p>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 text-base">Pagar com Pix</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Transferências</span>
                  <span className="text-green-400 text-sm">Instantâneo</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Taxa</span>
                  <span className="text-green-400 text-sm">R$ 0,00</span>
                </div>
              </div>
            </div>

            

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3 text-base">Últimas Transações</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Compra BTC</span>
                  <span className="text-red-400 text-sm">-R$ 200,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Transfer ETH</span>
                  <span className="text-red-400 text-sm">-R$ 150,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Swap Enviado</span>
                  <span className="text-red-400 text-sm">-R$ 100,00</span>
                </div>
              </div>
            </div>

            

            

            
          </div>
        </div>
      </ContainerScroll>
    </section>;
};
export default AppDownloadSection;