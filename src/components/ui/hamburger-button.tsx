"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HamburgerButtonProps {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function HamburgerButton({ className, open, setOpen }: HamburgerButtonProps) {
  return (
    <Button
      className={`group ${className}`}
      variant="outline"
      size="icon"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
    >
      <svg
        className="pointer-events-none"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </Button>
  );
}

export { HamburgerButton };