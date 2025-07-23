"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
interface TextRevealByWordProps {
  text: string;
  className?: string;
}
const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "end 0.3"]
  });
  const words = text.split(" ");
  return <div ref={targetRef} className={cn("relative z-0", className)}>
      <div className="relative mx-auto flex items-center justify-center bg-transparent py-[2px] px-[16px]">
        <p className="flex flex-wrap justify-center text-lg md:text-xl leading-relaxed tracking-tight text-zinc-600/30 max-w-4xl px-2">
          {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>;
        })}
        </p>
      </div>
    </div>;
};
interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}
const Word: FC<WordProps> = ({
  children,
  progress,
  range
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{
      opacity
    }} className="text-zinc-600">
        {children}
      </motion.span>
    </span>;
};
export { TextRevealByWord };