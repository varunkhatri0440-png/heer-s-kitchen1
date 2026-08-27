"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isReady: boolean;
  totalFrames: number;
  loadedFrames: number;
}

export default function Preloader({ progress, isReady, totalFrames, loadedFrames }: PreloaderProps) {
  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] select-none pointer-events-auto"
        >
          {/* Ambient background glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-[#38bdf8]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Logo & Header */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#c5a880]" />
              <span className="font-serif tracking-[0.35em] text-xs uppercase text-[#c5a880] font-semibold">
                Aurelia Atelier
              </span>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#c5a880]" />
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight mb-2">
              Culinary Artistry
            </h1>
            <p className="text-sm text-white/50 font-light mb-8 max-w-xs leading-relaxed">
              Synthesizing cryogenic materials & cinematic sequences
            </p>

            {/* Circular / Line Progress */}
            <div className="w-full max-w-xs space-y-3">
              <div className="relative h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#c5a880] via-[#e6cfb3] to-[#38bdf8]"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/40 tracking-wider">
                <span>BUFFERING 1080P ASSETS</span>
                <span className="text-[#c5a880] font-semibold">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Frame metadata tag */}
            <div className="mt-8 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
              <span>{loadedFrames} / {totalFrames} FRAMES CACHED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
