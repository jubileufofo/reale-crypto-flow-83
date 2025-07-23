"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
}
interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}
export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]"
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentFeature(current => (current + 1) % features.length);
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 50));
      });
    }, 50);
    return () => clearInterval(timer);
  }, [features.length, autoPlayInterval]);
  return <div className={cn("p-4 sm:p-6 md:p-8 lg:p-12 bg-background overflow-x-hidden", className)}>
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-foreground px-4 leading-tight">
          {title}
        </h2>

        <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto px-2">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="relative flex items-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 rounded-xl border border-border bg-card/50 max-w-full overflow-hidden" 
              initial={{
                opacity: 0.3
              }} 
              animate={{
                opacity: index === currentFeature ? 1 : 0.6
              }} 
              transition={{
                duration: 0.5
              }}
            >
              <motion.div 
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0", 
                  index === currentFeature 
                    ? "bg-foreground border-foreground text-background scale-110 shadow-lg" 
                    : "bg-muted border-muted-foreground text-muted-foreground"
                )}
              >
                {index <= currentFeature ? (
                  <span className="text-lg font-bold">✓</span>
                ) : (
                  <span className="text-lg font-semibold">{index + 1}</span>
                )}
              </motion.div>

              <div className="flex-1">
                <h3 className={cn(
                  "text-lg sm:text-xl md:text-2xl font-semibold mb-2 transition-colors duration-300 leading-tight", 
                  index === currentFeature ? "text-foreground" : "text-muted-foreground"
                )}>
                  {feature.title || feature.step}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  {feature.content}
                </p>
              </div>

              {/* Progress indicator for current step */}
              {index === currentFeature && (
                  <div className="w-full absolute bottom-0 left-0">
                    <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-foreground rounded-full" 
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05, ease: "linear" }} 
                      />
                    </div>
                  </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>;
}