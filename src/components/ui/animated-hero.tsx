import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, UserPlus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["rápida", "segura", "inteligente", "moderna", "confiável"], []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  return <div className="w-full overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex gap-6 sm:gap-8 py-12 sm:py-16 md:py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Conheça nossa tecnologia <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl tracking-tighter text-center font-regular leading-tight px-4">
              <span className="text-reale-white block sm:inline">Transforme seus Reais em</span>
              <br className="hidden sm:block" />
              <span className="text-reale-blue block sm:inline">Cripto da forma mais</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center pb-2 pt-1 md:pb-4 md:pt-1 min-h-[1.2em]">
                &nbsp;
                {titles.map((title, index) => <motion.span key={index} className="absolute font-semibold text-reale-blue whitespace-nowrap" initial={{
                opacity: 0,
                y: -100
              }} transition={{
                type: "spring",
                stiffness: 50
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1
              } : {
                y: titleNumber > index ? -150 : 150,
                opacity: 0
              }}>
                    {title}
                  </motion.span>)}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight max-w-3xl text-center text-muted-foreground px-4">
              Precisa de cripto com rapidez? Pague com <span className="text-reale-blue font-semibold animate-pulse">Pix</span>. 
              <br />
              Para mais recursos, crie sua carteira segura multichain em poucos minutos disponível com swap integrado.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 w-full max-w-md sm:max-w-lg sm:mx-auto justify-center">
            <Button size="lg" className="gap-2 sm:gap-4 w-full sm:w-auto text-sm sm:text-base" variant="outline">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Baixe a Carteira Web3 Reale
            </span>
              <span className="sm:hidden">Abrir conta</span>
            </Button>
            <Button size="lg" className="gap-2 sm:gap-4 w-full sm:w-auto text-sm sm:text-base">
              <Zap className="w-4 h-4" />
              Compre Cripto com o Pix
            </Button>
          </div>
          
          {/* Aviso sobre carteira digital */}
        </div>
      </div>
    </div>;
}
export { Hero };