"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Star,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Flame,
  Droplets,
} from "lucide-react";
import { CollectionData } from "@/types/kitchenware";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  collection: CollectionData;
}

export default function ProductDrawer({
  isOpen,
  onClose,
  collection,
}: ProductDrawerProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "materials" | "care">("specs");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl transition-all"
          />

          {/* Liquid Glass Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl liquid-glass border-l border-white/25 shadow-[-25px_0_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white select-none"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/15 flex items-center justify-between bg-white/[0.04] backdrop-blur-3xl">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#d8b88d] block mb-1">
                  {collection.series}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  {collection.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white border border-white/20 shadow-sm transition-all"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Product Price & Rating Strip */}
              <div className="liquid-glass-spot rounded-2xl p-5 flex items-center justify-between border border-white/25">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-serif font-bold text-white tracking-tight">
                      {collection.price}
                    </span>
                    {collection.originalPrice && (
                      <span className="text-sm font-mono text-white/40 line-through">
                        {collection.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock • Complimentary Express Courier
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-white">{collection.rating}</span>
                  </div>
                  <span className="text-[11px] font-mono text-white/50">
                    ({collection.reviewsCount} Master Chef Reviews)
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm text-white/85 leading-relaxed italic border-l-2 border-[#d8b88d] pl-4 py-0.5">
                &ldquo;{collection.tagline}&rdquo;
              </p>

              {/* Liquid Tabs Navigation */}
              <div className="flex border-b border-white/15 gap-2">
                {(["specs", "materials", "care"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-5 text-xs font-mono tracking-wider uppercase transition-all relative ${
                      activeTab === tab
                        ? "text-[#d8b88d] font-bold"
                        : "text-white/40 hover:text-white/80"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeDrawerTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d8b88d] via-white to-[#d8b88d] shadow-[0_0_8px_#d8b88d]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "specs" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {collection.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 p-4 rounded-xl backdrop-blur-2xl shadow-sm transition-all duration-200"
                      >
                        <span className="text-[10px] font-mono uppercase text-white/50 block mb-1 tracking-wider">
                          {spec.label}
                        </span>
                        <span className="text-xs font-semibold text-white tracking-wide">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Key Engineering Highlights
                    </h5>
                    {collection.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d8b88d] mt-1.5 shrink-0 shadow-[0_0_6px_#d8b88d]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "materials" && (
                <div className="space-y-3">
                  {collection.materials.map((mat, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 p-4 rounded-xl backdrop-blur-2xl space-y-2 shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-serif font-bold text-[#d8b88d]">
                          {mat.name}
                        </h5>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/15 text-white/80 border border-white/20 shadow-inner">
                          {mat.purity}
                        </span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        {mat.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-3 text-xs text-white/80">
                  <div className="bg-white/[0.06] border border-white/15 p-4 rounded-xl backdrop-blur-2xl space-y-2">
                    <h5 className="font-semibold text-white flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Thermal & Dishwashing Guidelines
                    </h5>
                    <p className="leading-relaxed text-white/70 font-light">
                      While surgical steel components are dishwasher safe, we recommend warm hand washing with mild soap and immediate microfiber drying to preserve the satin mirror luster and wood grain integrity indefinitely.
                    </p>
                  </div>

                  <div className="bg-white/[0.06] border border-white/15 p-4 rounded-xl backdrop-blur-2xl space-y-2">
                    <h5 className="font-semibold text-white flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-sky-400" />
                      Conditioning & Maintenance
                    </h5>
                    <p className="leading-relaxed text-white/70 font-light">
                      Treat organic acacia surfaces with food-grade mineral oil or beeswax once every 6 months to maintain moisture barrier and deep wood luminescence.
                    </p>
                  </div>
                </div>
              )}

              {/* Lifetime Heirloom Guarantee */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#c5a880]/15 via-white/[0.05] to-transparent border border-[#d8b88d]/30 flex items-center gap-3.5 backdrop-blur-2xl shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#d8b88d] shrink-0" />
                <div>
                  <h6 className="text-xs font-semibold text-white">
                    Lifetime Heirloom Guarantee
                  </h6>
                  <p className="text-[11px] text-white/60 font-light mt-0.5">
                    Hand-inspected before dispatch. Guaranteed free of metallurgical defects for life.
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Footer / CTA */}
            <div className="p-6 border-t border-white/15 bg-white/[0.03] backdrop-blur-3xl space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  isAdded
                    ? "bg-emerald-500 text-black font-bold shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    : "bg-gradient-to-r from-[#d8b88d] via-[#f7ebd6] to-[#d8b88d] hover:brightness-110 active:scale-[0.99] text-black font-bold shadow-[0_0_35px_rgba(216,184,141,0.4)] border border-white/30"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Atelier Order Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acquire {collection.id === "whisk" ? "Whisk Atelier Set" : "Hydro Chef Knife"} • {collection.price}</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-4 text-[11px] text-white/50 font-mono">
                <span>Free Insured Shipping</span>
                <span>•</span>
                <span>30-Day Tasting Trial</span>
                <span>•</span>
                <span>Custom Wooden Box</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
