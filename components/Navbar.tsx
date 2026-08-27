"use client";

import { ShoppingBag, SlidersHorizontal } from "lucide-react";
import { CollectionData } from "@/types/kitchenware";

interface NavbarProps {
  currentStage: "f1" | "transition" | "f2" | "f3";
  currentCollection: CollectionData;
  onOpenSpecs: () => void;
  onJumpStage: (stage: "f1" | "f2" | "f3") => void;
}

export default function Navbar({
  currentCollection,
  onOpenSpecs,
  onJumpStage,
}: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 flex items-center justify-between pointer-events-none select-none">
      {/* Brand Identity */}
      <div
        className="flex items-center gap-3 pointer-events-auto group cursor-pointer"
        onClick={() => onJumpStage("f1")}
      >
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg group-hover:border-[#c5a880]/50 transition-all duration-300">
          <span className="font-serif font-bold text-lg text-gold-gradient">A</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold tracking-[0.25em] text-sm md:text-base text-white uppercase">
              Aurelia
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#c5a880] uppercase px-1.5 py-0.5 rounded bg-[#c5a880]/10 border border-[#c5a880]/20 hidden sm:inline-block">
              Atelier
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/40 tracking-wider block">
            PRECISION CULINARY INSTRUMENTS
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          onClick={onOpenSpecs}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-white/80 hover:text-white hover:border-[#c5a880]/40 transition-all text-xs font-mono tracking-wider uppercase"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Specs & Lab</span>
        </button>

        <button
          onClick={onOpenSpecs}
          className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black hover:bg-[#c5a880] hover:text-black transition-all duration-300 text-xs font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Acquire</span>
          <span className="font-mono">{currentCollection.price}</span>
        </button>
      </div>
    </header>
  );
}
