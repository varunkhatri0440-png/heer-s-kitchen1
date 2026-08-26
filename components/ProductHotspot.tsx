"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { ProductHotspotItem } from "@/types/kitchenware";

interface ProductHotspotProps {
  hotspot: ProductHotspotItem;
  currentFrame: number;
  onOpenDrawer?: () => void;
}

export default function ProductHotspot({
  hotspot,
  currentFrame,
  onOpenDrawer,
}: ProductHotspotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible =
    currentFrame >= hotspot.frameRange[0] &&
    currentFrame <= hotspot.frameRange[1];

  if (!isVisible) return null;

  return (
    <div
      className="absolute z-30 transition-all duration-700 ease-out"
      style={{
        top: hotspot.top,
        left: hotspot.left,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Liquid Glass Hotspot Pulse Target */}
      <div className="relative group p-4 flex items-center justify-center cursor-pointer select-none">
        {/* Outer expanding liquid pulse ring */}
        <span className="absolute w-12 h-12 rounded-full bg-[#c5a880]/15 animate-ping pointer-events-none" />
        <span className="absolute w-8 h-8 rounded-full bg-[#c5a880]/25 transition-transform duration-500 group-hover:scale-150 pointer-events-none" />

        {/* Core Liquid Glass Button */}
        <button
          className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#0a0a0e]/90 border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(197,168,128,0.5)] backdrop-blur-md transition-all duration-300 group-hover:border-[#c5a880] group-hover:shadow-[0_0_25px_rgba(197,168,128,0.8)] focus:outline-none"
          aria-label={hotspot.title}
        >
          {/* Inner specular glossy dot */}
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#9f794d] via-[#d8b88d] to-[#ffffff] shadow-[0_0_8px_#ffffff]" />
          <span className="absolute top-1 left-1.5 w-1.5 h-1 rounded-full bg-white/70 blur-[0.5px]" />
        </button>
      </div>

      {/* Liquid Glass Popover Card (Opens strictly on cursor hover) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 md:w-80 liquid-glass-spot rounded-2xl p-5 text-left z-40 pointer-events-auto"
          >
            {/* Header Badge & Tag */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#c5a880]/20 to-white/10 text-[#d8b88d] border border-[#c5a880]/30 shadow-sm">
                {hotspot.badge}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]"></span>
              </span>
            </div>

            {/* Title & Subtitle */}
            <h4 className="font-serif text-base font-bold text-white tracking-wide leading-tight">
              {hotspot.title}
            </h4>
            <p className="text-xs text-[#d8b88d] font-mono tracking-wider mb-2.5">
              {hotspot.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs text-white/80 leading-relaxed font-light mb-3.5">
              {hotspot.description}
            </p>

            {/* Metric pill if available */}
            {hotspot.metric && (
              <div className="flex items-center justify-between pt-2.5 border-t border-white/15 text-xs">
                <span className="text-white/60 text-[11px] font-medium">
                  {hotspot.metricLabel || "Metric"}:
                </span>
                <span className="font-mono font-bold text-white tracking-wider bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20 shadow-inner">
                  {hotspot.metric}
                </span>
              </div>
            )}

            {/* View Full Specs Link */}
            {onOpenDrawer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDrawer();
                }}
                className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-medium border border-white/20 shadow-md transition-all duration-200"
              >
                <span>View Full Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
