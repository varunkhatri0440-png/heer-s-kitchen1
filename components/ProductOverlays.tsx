"use client";

import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { CollectionData } from "@/types/kitchenware";
import ProductHotspot from "./ProductHotspot";

interface ProductOverlaysProps {
  stage: "f1" | "transition" | "f2" | "f3";
  f1Progress: number;
  f2Progress: number;
  f3Progress: number;
  f1Frame: number;
  f2Frame: number;
  f3Frame: number;
  whiskCollection: CollectionData;
  knifeCollection: CollectionData;
  ensembleCollection: CollectionData;
  onOpenSpecs: (col: CollectionData) => void;
}

export default function ProductOverlays({
  stage,
  f1Progress,
  f2Progress,
  f3Progress,
  f1Frame,
  f2Frame,
  f3Frame,
  whiskCollection,
  knifeCollection,
  ensembleCollection,
  onOpenSpecs,
}: ProductOverlaysProps) {
  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION 1: WHISK OVERLAYS (f1) */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          stage === "f1" || stage === "transition" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hotspots for Whisk Collection */}
        {whiskCollection.hotspots.map((spot) => (
          <div key={spot.id} className="pointer-events-auto">
            <ProductHotspot
              hotspot={spot}
              currentFrame={f1Frame}
              onOpenDrawer={() => onOpenSpecs(whiskCollection)}
            />
          </div>
        ))}

        {/* Hero Entry Text (0% - 30%) */}
        <div
          className={`absolute left-6 md:left-16 top-28 md:top-36 max-w-xl transition-all duration-700 ${
            f1Progress >= 0 && f1Progress < 0.32
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-[#c5a880] uppercase">
              The Atelier Collection // 01
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-4">
            Sculpted for <br />
            <span className="text-gold-gradient">Master Emulsions.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6 max-w-md">
            Hand-balanced surgical stainless steel paired with calibrated 12-tine flexibility.
            Scroll downward to witness kinetic assembly and precision balance.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenSpecs(whiskCollection)}
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#c5a880] transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <span>Explore Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
              <ChevronDown className="w-4 h-4 animate-bounce text-[#c5a880]" />
              <span>Scroll Downward</span>
            </div>
          </div>
        </div>

        {/* Mid-point Whisk Aerodynamics Card (30% - 70%) */}
        <div
          className={`absolute right-6 md:right-16 top-1/3 max-w-sm transition-all duration-700 ${
            f1Progress >= 0.32 && f1Progress < 0.72
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="liquid-glass-glow p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#c5a880] tracking-widest uppercase bg-[#c5a880]/15 px-2.5 py-1 rounded-md border border-[#c5a880]/20">
                12-Tine Matrix
              </span>
              <span className="text-xs font-mono text-white/50">18/10 STEEL</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              Dynamic Vortex Aeration
            </h3>

            <p className="text-xs text-white/80 leading-relaxed font-light">
              Calibrated elliptical spring wires maximize shear velocity without batter splashing.
              Yields 40% denser peaks with half the kinetic energy.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block">Weight Ratio</span>
                <span className="font-mono font-bold text-white">54:46 Pivot</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block">Air Retention</span>
                <span className="font-mono font-bold text-[#c5a880]">+40% Density</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acacia Spoons Emergence (70% - 95%) */}
        <div
          className={`absolute left-6 md:left-16 bottom-24 max-w-md transition-all duration-700 ${
            f1Progress >= 0.72 && f1Progress < 0.98
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="liquid-glass p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ORGANIC ACACIA ARRAY</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Hand-Healed Sauté & Tasting Array
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Complementary set of 4 artisanal acacia spoons, naturally non-reactive and heat-safe
              to 450°F.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: HYDRO KNIFE OVERLAYS (f2) */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          stage === "f2" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hotspots for Knife Collection */}
        {knifeCollection.hotspots.map((spot) => (
          <div key={spot.id} className="pointer-events-auto">
            <ProductHotspot
              hotspot={spot}
              currentFrame={f2Frame}
              onOpenDrawer={() => onOpenSpecs(knifeCollection)}
            />
          </div>
        ))}

        {/* Knife Hero Card (0% - 35%) */}
        <div
          className={`absolute left-6 md:left-16 top-36 max-w-xl transition-all duration-700 ${
            f2Progress >= 0 && f2Progress < 0.38
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill mb-4 border-sky-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-sky-300 uppercase">
              The Hydro-Cutlery Series // 02
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-4">
            Forged for <br />
            <span className="text-cyan-gradient">Zero Surface Friction.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6 max-w-md">
            Cryogenically hardened German High-Carbon Steel (62 HRC) with microscopic hydrophobic
            surface channels that shed liquid instantly.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenSpecs(knifeCollection)}
              className="px-6 py-3 rounded-xl bg-sky-400 text-black font-semibold text-xs tracking-wider uppercase hover:bg-sky-300 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.3)] flex items-center gap-2"
            >
              <span>Explore Blade Specs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
              <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
              <span>Scroll to Scrub Water Splash</span>
            </div>
          </div>
        </div>

        {/* Mid-point Hydrodynamic Fluid Dynamics Card (38% - 75%) */}
        <div
          className={`absolute right-6 md:right-16 top-1/4 max-w-md transition-all duration-700 ${
            f2Progress >= 0.38 && f2Progress < 0.78
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="liquid-glass-glow p-6 rounded-2xl space-y-4 border border-sky-400/30 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-sky-300 tracking-widest uppercase bg-sky-500/20 px-2.5 py-1 rounded-md border border-sky-400/40">
                Hydro-Shield Surface
              </span>
              <span className="text-xs font-mono text-white/50">62 HRC</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              Zero-Adhesion Micro-Bevel
            </h3>

            <p className="text-xs text-white/80 leading-relaxed font-light">
              High-pressure water droplets bead effortlessly off the cryogenic blade face.
              Eliminates the frustrating vacuum suction when slicing potatoes, onions, and delicate meats.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block">Edge Hone</span>
                <span className="font-mono font-bold text-white">11° Per Side</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block">Hardness</span>
                <span className="font-mono font-bold text-sky-300">Cryo-62 HRC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Blade Mastery & Checkout Strip (78% - 100%) */}
        <div
          className={`absolute inset-x-6 md:inset-x-16 bottom-10 transition-all duration-700 ${
            f2Progress >= 0.78
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="liquid-glass-glow p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-400/35">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-mono text-sky-400 tracking-wider uppercase font-semibold">
                  Aurelia Hydro-Series Chef&apos;s Knife
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                  Lifetime Guarantee
                </span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                Mastery in Every Cut • {knifeCollection.price}
              </h4>
              <p className="text-xs text-white/70 font-light">
                Hand-inspected, serialized, packaged in solid velvet-lined walnut storage casket.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onOpenSpecs(knifeCollection)}
                className="flex-1 md:flex-none px-5 py-3 rounded-xl liquid-glass-pill text-white text-xs font-mono uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Inspect Metallurgical Lab
              </button>
              <button
                onClick={() => onOpenSpecs(knifeCollection)}
                className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Knife</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: ENSEMBLE OVERLAYS (f3 - Emerging midway/from the middle) */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          stage === "f3" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hotspots for Ensemble Collection */}
        {ensembleCollection.hotspots.map((spot) => (
          <div key={spot.id} className="pointer-events-auto">
            <ProductHotspot
              hotspot={spot}
              currentFrame={f3Frame}
              onOpenDrawer={() => onOpenSpecs(ensembleCollection)}
            />
          </div>
        ))}

        {/* Ensemble Hero Card (0% - 35%) */}
        <div
          className={`absolute left-6 md:left-16 top-36 max-w-xl transition-all duration-700 ${
            f3Progress >= 0 && f3Progress < 0.38
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill mb-4 border-amber-400/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d8b88d] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-[#d8b88d] uppercase">
              The Grand Atelier // 03
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-4">
            Zero-Gravity <br />
            <span className="text-gold-gradient">Kinetic Symphony.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6 max-w-md">
            14 precision-crafted instruments in continuous radial equilibrium. Hand-turned acacia,
            perforated micro-skimmers, and surgical ladles that gracefully settle on your countertop.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenSpecs(ensembleCollection)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d8b88d] via-[#f7ebd6] to-[#d8b88d] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <span>Inspect 14-Piece Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
              <ChevronDown className="w-4 h-4 animate-bounce text-[#d8b88d]" />
              <span>Scroll to Settle Instruments</span>
            </div>
          </div>
        </div>

        {/* Mid-point Radial Equilibrium Card (38% - 75%) */}
        <div
          className={`absolute right-6 md:right-16 top-1/4 max-w-md transition-all duration-700 ${
            f3Progress >= 0.38 && f3Progress < 0.78
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="liquid-glass-glow p-6 rounded-2xl space-y-4 border border-[#d8b88d]/30 shadow-[0_0_40px_rgba(216,184,141,0.18)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#d8b88d] tracking-widest uppercase bg-[#c5a880]/20 px-2.5 py-1 rounded-md border border-[#d8b88d]/40">
                Radial Equilibrium
              </span>
              <span className="text-xs font-mono text-white/50">14 PIECES</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              Surgical & Acacia Balance
            </h3>

            <p className="text-xs text-white/80 leading-relaxed font-light">
              Every utensil is dynamically counterweighted to balance mid-air and rest elevated,
              preventing contact between working heads and preparation counters.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block">Hardwood</span>
                <span className="font-mono font-bold text-white">Old-Growth Acacia</span>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-white/40 block">Thermal Rating</span>
                <span className="font-mono font-bold text-[#d8b88d]">600°F (315°C)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Suite Showcase & Acquisition Strip (78% - 100%) */}
        <div
          className={`absolute inset-x-6 md:inset-x-16 bottom-10 transition-all duration-700 ${
            f3Progress >= 0.78
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="liquid-glass-glow p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#d8b88d]/40 shadow-2xl">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-mono text-[#d8b88d] tracking-wider uppercase font-semibold">
                  Aurelia Complete Grand Atelier Ensemble
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                  Museum Edition
                </span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                The Master Kitchen Symphony • {ensembleCollection.price}
              </h4>
              <p className="text-xs text-white/70 font-light">
                Includes floating walnut stand, numbered authenticity plaque, and custom leather roll.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onOpenSpecs(ensembleCollection)}
                className="flex-1 md:flex-none px-5 py-3 rounded-xl liquid-glass-pill text-white text-xs font-mono uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Inspect Collection Lab
              </button>
              <button
                onClick={() => onOpenSpecs(ensembleCollection)}
                className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#d8b88d] via-[#f7ebd6] to-[#d8b88d] hover:brightness-110 text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(216,184,141,0.4)] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Full Suite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
