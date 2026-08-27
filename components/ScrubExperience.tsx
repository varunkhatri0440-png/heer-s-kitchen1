"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CanvasScrubber from "./CanvasScrubber";
import ProductOverlays from "./ProductOverlays";
import Navbar from "./Navbar";
import Preloader from "./Preloader";
import ProductDrawer from "./ProductDrawer";
import {
  WHISK_COLLECTION,
  KNIFE_COLLECTION,
  ENSEMBLE_COLLECTION,
  CollectionData,
} from "@/types/kitchenware";

export default function ScrubExperience() {
  // Preloader tracking state
  const [f1LoadedCount, setF1LoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Arrays of loaded Image elements for O(1) instant memory lookup
  const f1FramesRef = useRef<(HTMLImageElement | null)[]>(new Array(118).fill(null));
  const f2FramesRef = useRef<(HTMLImageElement | null)[]>(new Array(66).fill(null));
  const f3FramesRef = useRef<(HTMLImageElement | null)[]>(new Array(117).fill(null));

  // Active loading set to avoid duplicate fetches
  const loadingSetRef = useRef<Set<string>>(new Set());

  // Stages: 'f1' | 'transition' | 'f2' | 'f3'
  const [currentStage, setCurrentStage] = useState<"f1" | "transition" | "f2" | "f3">("f1");

  // Horizontal translation offset (0 = Section 1 active, -100 = Section 2/3 active)
  const [horizontalOffset, setHorizontalOffset] = useState<number>(0);

  // Smooth Interpolated Frames
  const [f1Frame, setF1Frame] = useState(0);
  const [f2Frame, setF2Frame] = useState(118);
  const [f3Frame, setF3Frame] = useState(184);

  // Progress states for UI overlays
  const [f1Progress, setF1Progress] = useState(0);
  const [f2Progress, setF2Progress] = useState(0);
  const [f3Progress, setF3Progress] = useState(0);

  // Physics & LERP targets
  const targetF1ProgressRef = useRef(0);
  const currentF1ProgressRef = useRef(0);

  const targetF2ProgressRef = useRef(0);
  const currentF2ProgressRef = useRef(0);

  const targetF3ProgressRef = useRef(0);
  const currentF3ProgressRef = useRef(0);

  // UI Drawer state
  const [activeDrawerCollection, setActiveDrawerCollection] = useState<CollectionData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isTransitioningRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);

  const totalF1Frames = WHISK_COLLECTION.totalFrames; // 118

  // Dedicated single-frame loader with GPU pre-decoding
  const fetchFrame = useCallback(
    (src: string, targetArray: (HTMLImageElement | null)[], index: number): Promise<void> => {
      if (targetArray[index] || loadingSetRef.current.has(src)) {
        return Promise.resolve();
      }
      loadingSetRef.current.add(src);

      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = async () => {
          try {
            if ("decode" in img) {
              await img.decode().catch(() => {});
            }
          } catch {}
          targetArray[index] = img;
          if (targetArray === f1FramesRef.current) {
            setF1LoadedCount((prev) => prev + 1);
          }
          resolve();
        };
        img.onerror = () => {
          targetArray[index] = img;
          if (targetArray === f1FramesRef.current) {
            setF1LoadedCount((prev) => prev + 1);
          }
          resolve();
        };
      });
    },
    []
  );

  // Preload & Background Stream Pipeline
  useEffect(() => {
    let isMounted = true;

    const runPipeline = async () => {
      // 1. Preload the first batch of f1 frames to allow immediate interaction
      const initialF1Batch: Promise<void>[] = [];
      for (let i = 0; i < 40; i++) {
        initialF1Batch.push(
          fetchFrame(`/f1/frame_${String(i).padStart(6, "0")}.webp`, f1FramesRef.current, i)
        );
      }
      // Also pre-fetch first 5 frames of f2 and f3
      for (let i = 0; i < 5; i++) {
        initialF1Batch.push(
          fetchFrame(`/f2/frame_${String(118 + i).padStart(6, "0")}.webp`, f2FramesRef.current, i)
        );
        initialF1Batch.push(
          fetchFrame(`/f3/frame_${String(184 + i).padStart(6, "0")}.webp`, f3FramesRef.current, i)
        );
      }

      await Promise.all(initialF1Batch);
      if (!isMounted) return;
      setIsReady(true);

      // 2. Stream helper with concurrency = 6
      const streamBatch = async (
        start: number,
        end: number,
        folder: string,
        targetArray: (HTMLImageElement | null)[],
        offset: number
      ) => {
        const concurrency = 6;
        for (let i = start; i < end; i += concurrency) {
          if (!isMounted) break;
          const chunk: Promise<void>[] = [];
          for (let j = i; j < Math.min(end, i + concurrency); j++) {
            chunk.push(
              fetchFrame(`/${folder}/frame_${String(offset + j).padStart(6, "0")}.webp`, targetArray, j)
            );
          }
          await Promise.all(chunk);
        }
      };

      // Finish remainder of f1
      await streamBatch(40, 118, "f1", f1FramesRef.current, 0);
      // Stream f2
      await streamBatch(5, 66, "f2", f2FramesRef.current, 118);
      // Stream f3
      await streamBatch(5, 117, "f3", f3FramesRef.current, 184);
    };

    runPipeline();

    return () => {
      isMounted = false;
    };
  }, [fetchFrame]);

  // Proximity Window Preloader: Bumps upcoming scroll frames to high priority
  const preloadSurroundingFrames = useCallback(
    (stage: "f1" | "f2" | "f3", centerIdx: number) => {
      const windowSize = 12;
      if (stage === "f1") {
        const start = Math.max(0, centerIdx - windowSize);
        const end = Math.min(117, centerIdx + windowSize);
        for (let i = start; i <= end; i++) {
          if (!f1FramesRef.current[i]) {
            fetchFrame(`/f1/frame_${String(i).padStart(6, "0")}.webp`, f1FramesRef.current, i);
          }
        }
      } else if (stage === "f2") {
        const start = Math.max(0, centerIdx - 118 - windowSize);
        const end = Math.min(65, centerIdx - 118 + windowSize);
        for (let i = start; i <= end; i++) {
          if (!f2FramesRef.current[i]) {
            fetchFrame(`/f2/frame_${String(118 + i).padStart(6, "0")}.webp`, f2FramesRef.current, i);
          }
        }
      } else if (stage === "f3") {
        const start = Math.max(0, centerIdx - 184 - windowSize);
        const end = Math.min(116, centerIdx - 184 + windowSize);
        for (let i = start; i <= end; i++) {
          if (!f3FramesRef.current[i]) {
            fetchFrame(`/f3/frame_${String(184 + i).padStart(6, "0")}.webp`, f3FramesRef.current, i);
          }
        }
      }
    },
    [fetchFrame]
  );

  // Continuous 60/120fps RAF Linear Interpolation (LERP) Physics Loop
  useEffect(() => {
    let animFrameId: number;

    const updatePhysics = () => {
      const lerpFactor = 0.12; // Responsive fluid momentum

      // 1. Interpolate F1
      const diffF1 = targetF1ProgressRef.current - currentF1ProgressRef.current;
      if (Math.abs(diffF1) > 0.0001) {
        currentF1ProgressRef.current += diffF1 * lerpFactor;
        const clampedProgress = Math.max(0, Math.min(1, currentF1ProgressRef.current));
        const calcFrame = Math.round(clampedProgress * 117);
        setF1Frame((prev) => (prev !== calcFrame ? calcFrame : prev));
        setF1Progress(clampedProgress);
        preloadSurroundingFrames("f1", calcFrame);
      }

      // 2. Interpolate F2
      const diffF2 = targetF2ProgressRef.current - currentF2ProgressRef.current;
      if (Math.abs(diffF2) > 0.0001) {
        currentF2ProgressRef.current += diffF2 * lerpFactor;
        const clampedProgress = Math.max(0, Math.min(1, currentF2ProgressRef.current));
        const calcFrame = 118 + Math.round(clampedProgress * 65);
        setF2Frame((prev) => (prev !== calcFrame ? calcFrame : prev));
        setF2Progress(clampedProgress);
        preloadSurroundingFrames("f2", calcFrame);
      }

      // 3. Interpolate F3
      const diffF3 = targetF3ProgressRef.current - currentF3ProgressRef.current;
      if (Math.abs(diffF3) > 0.0001) {
        currentF3ProgressRef.current += diffF3 * lerpFactor;
        const clampedProgress = Math.max(0, Math.min(1, currentF3ProgressRef.current));
        const calcFrame = 184 + Math.round(clampedProgress * 116);
        setF3Frame((prev) => (prev !== calcFrame ? calcFrame : prev));
        setF3Progress(clampedProgress);
        preloadSurroundingFrames("f3", calcFrame);
      }

      animFrameId = requestAnimationFrame(updatePhysics);
    };

    animFrameId = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(animFrameId);
  }, [preloadSurroundingFrames]);

  // Trigger horizontal transition forward to Section 2 (Knife)
  const triggerSlideToKnife = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentStage("transition");
    setHorizontalOffset(-100);

    setTimeout(() => {
      setCurrentStage("f2");
      targetF2ProgressRef.current = 0;
      currentF2ProgressRef.current = 0;
      setF2Progress(0);
      setF2Frame(118);
      isTransitioningRef.current = false;
    }, 750);
  }, []);

  // Trigger horizontal transition back to Section 1 (Whisk)
  const triggerSlideToWhisk = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentStage("transition");
    setHorizontalOffset(0);

    setTimeout(() => {
      setCurrentStage("f1");
      targetF1ProgressRef.current = 1;
      currentF1ProgressRef.current = 1;
      setF1Progress(1);
      setF1Frame(117);
      isTransitioningRef.current = false;
    }, 750);
  }, []);

  // Transition into F3 (Ensemble emerging from the middle)
  const triggerEmergeF3 = useCallback(() => {
    setCurrentStage("f3");
    targetF3ProgressRef.current = 0;
    currentF3ProgressRef.current = 0;
    setF3Progress(0);
    setF3Frame(184);
  }, []);

  // Return back from F3 to F2
  const triggerReturnToF2 = useCallback(() => {
    setCurrentStage("f2");
    targetF2ProgressRef.current = 1;
    currentF2ProgressRef.current = 1;
    setF2Progress(1);
    setF2Frame(183);
  }, []);

  // Handle stage jump directly from Navbar
  const handleJumpStage = useCallback((targetStage: "f1" | "f2" | "f3") => {
    if (targetStage === "f1") {
      setHorizontalOffset(0);
      setCurrentStage("f1");
      targetF1ProgressRef.current = 0;
      currentF1ProgressRef.current = 0;
      setF1Progress(0);
      setF1Frame(0);
    } else if (targetStage === "f2") {
      setHorizontalOffset(-100);
      setCurrentStage("f2");
      targetF2ProgressRef.current = 0;
      currentF2ProgressRef.current = 0;
      setF2Progress(0);
      setF2Frame(118);
    } else if (targetStage === "f3") {
      setHorizontalOffset(-100);
      setCurrentStage("f3");
      targetF3ProgressRef.current = 0;
      currentF3ProgressRef.current = 0;
      setF3Progress(0);
      setF3Frame(184);
    }
  }, []);

  // Open Specs Drawer
  const handleOpenSpecs = (col: CollectionData = WHISK_COLLECTION) => {
    setActiveDrawerCollection(col);
    setIsDrawerOpen(true);
  };

  // High-Precision Smooth Wheel Coordinator
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isDrawerOpen) return;

      e.preventDefault();

      if (isTransitioningRef.current) return;

      const delta = e.deltaY;
      const sensitivity = 0.00075;

      if (currentStage === "f1") {
        if (delta > 0) {
          if (targetF1ProgressRef.current < 0.999) {
            targetF1ProgressRef.current = Math.min(1, targetF1ProgressRef.current + delta * sensitivity);
            wheelAccumulatorRef.current = 0;
          } else {
            wheelAccumulatorRef.current += delta;
            if (wheelAccumulatorRef.current > 20) {
              wheelAccumulatorRef.current = 0;
              triggerSlideToKnife();
            }
          }
        } else {
          targetF1ProgressRef.current = Math.max(0, targetF1ProgressRef.current + delta * sensitivity);
          wheelAccumulatorRef.current = 0;
        }
      } else if (currentStage === "f2") {
        if (delta > 0) {
          if (targetF2ProgressRef.current < 0.999) {
            targetF2ProgressRef.current = Math.min(1, targetF2ProgressRef.current + delta * sensitivity);
            wheelAccumulatorRef.current = 0;
          } else {
            wheelAccumulatorRef.current += delta;
            if (wheelAccumulatorRef.current > 18) {
              wheelAccumulatorRef.current = 0;
              triggerEmergeF3();
            }
          }
        } else {
          if (targetF2ProgressRef.current > 0.001) {
            targetF2ProgressRef.current = Math.max(0, targetF2ProgressRef.current + delta * sensitivity);
            wheelAccumulatorRef.current = 0;
          } else {
            wheelAccumulatorRef.current += Math.abs(delta);
            if (wheelAccumulatorRef.current > 20) {
              wheelAccumulatorRef.current = 0;
              triggerSlideToWhisk();
            }
          }
        }
      } else if (currentStage === "f3") {
        if (delta > 0) {
          targetF3ProgressRef.current = Math.min(1, targetF3ProgressRef.current + delta * sensitivity);
          wheelAccumulatorRef.current = 0;
        } else {
          if (targetF3ProgressRef.current > 0.001) {
            targetF3ProgressRef.current = Math.max(0, targetF3ProgressRef.current + delta * sensitivity);
            wheelAccumulatorRef.current = 0;
          } else {
            wheelAccumulatorRef.current += Math.abs(delta);
            if (wheelAccumulatorRef.current > 18) {
              wheelAccumulatorRef.current = 0;
              triggerReturnToF2();
            }
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [
    currentStage,
    isDrawerOpen,
    triggerSlideToKnife,
    triggerSlideToWhisk,
    triggerEmergeF3,
    triggerReturnToF2,
  ]);

  // Touch swipe support for mobile / tablets
  useEffect(() => {
    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (isDrawerOpen) return;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDrawerOpen || isTransitioningRef.current) return;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = startY - currentY;
      const deltaX = startX - currentX;
      startY = currentY;
      startX = currentX;

      const sensitivity = 0.0025;

      // Handle horizontal swipe between f1 and f2
      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 10) {
        if (deltaX > 20 && currentStage === "f1" && targetF1ProgressRef.current >= 0.8) {
          triggerSlideToKnife();
          return;
        } else if (deltaX < -20 && currentStage === "f2" && targetF2ProgressRef.current <= 0.2) {
          triggerSlideToWhisk();
          return;
        }
      }

      // Vertical swipe handling
      if (currentStage === "f1") {
        if (deltaY > 0) {
          if (targetF1ProgressRef.current < 0.999) {
            targetF1ProgressRef.current = Math.min(1, targetF1ProgressRef.current + deltaY * sensitivity);
          } else {
            triggerSlideToKnife();
          }
        } else {
          targetF1ProgressRef.current = Math.max(0, targetF1ProgressRef.current + deltaY * sensitivity);
        }
      } else if (currentStage === "f2") {
        if (deltaY > 0) {
          if (targetF2ProgressRef.current < 0.999) {
            targetF2ProgressRef.current = Math.min(1, targetF2ProgressRef.current + deltaY * sensitivity);
          } else {
            triggerEmergeF3();
          }
        } else {
          if (targetF2ProgressRef.current > 0.001) {
            targetF2ProgressRef.current = Math.max(0, targetF2ProgressRef.current + deltaY * sensitivity);
          } else {
            triggerSlideToWhisk();
          }
        }
      } else if (currentStage === "f3") {
        if (deltaY > 0) {
          targetF3ProgressRef.current = Math.min(1, targetF3ProgressRef.current + deltaY * sensitivity);
        } else {
          if (targetF3ProgressRef.current > 0.001) {
            targetF3ProgressRef.current = Math.max(0, targetF3ProgressRef.current + deltaY * sensitivity);
          } else {
            triggerReturnToF2();
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [
    currentStage,
    isDrawerOpen,
    triggerSlideToKnife,
    triggerSlideToWhisk,
    triggerEmergeF3,
    triggerReturnToF2,
  ]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDrawerOpen) return;

      if (e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        if (currentStage === "f1") {
          if (targetF1ProgressRef.current < 0.98) {
            targetF1ProgressRef.current = Math.min(1, targetF1ProgressRef.current + 0.08);
          } else {
            triggerSlideToKnife();
          }
        } else if (currentStage === "f2") {
          if (targetF2ProgressRef.current < 0.98) {
            targetF2ProgressRef.current = Math.min(1, targetF2ProgressRef.current + 0.08);
          } else {
            triggerEmergeF3();
          }
        } else if (currentStage === "f3") {
          targetF3ProgressRef.current = Math.min(1, targetF3ProgressRef.current + 0.08);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (currentStage === "f1") {
          targetF1ProgressRef.current = Math.max(0, targetF1ProgressRef.current - 0.08);
        } else if (currentStage === "f2") {
          if (targetF2ProgressRef.current > 0.02) {
            targetF2ProgressRef.current = Math.max(0, targetF2ProgressRef.current - 0.08);
          } else {
            triggerSlideToWhisk();
          }
        } else if (currentStage === "f3") {
          if (targetF3ProgressRef.current > 0.02) {
            targetF3ProgressRef.current = Math.max(0, targetF3ProgressRef.current - 0.08);
          } else {
            triggerReturnToF2();
          }
        }
      } else if (e.key === "ArrowRight") {
        if (currentStage === "f1") triggerSlideToKnife();
        else if (currentStage === "f2") triggerEmergeF3();
      } else if (e.key === "ArrowLeft") {
        if (currentStage === "f3") triggerReturnToF2();
        else if (currentStage === "f2") triggerSlideToWhisk();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentStage,
    isDrawerOpen,
    triggerSlideToKnife,
    triggerSlideToWhisk,
    triggerEmergeF3,
    triggerReturnToF2,
  ]);

  const activeCollection =
    currentStage === "f3"
      ? ENSEMBLE_COLLECTION
      : currentStage === "f2"
      ? KNIFE_COLLECTION
      : WHISK_COLLECTION;

  const loadingProgress = (f1LoadedCount / totalF1Frames) * 100;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070709] select-none">
      {/* Preloader */}
      <Preloader
        progress={loadingProgress}
        isReady={isReady}
        totalFrames={totalF1Frames}
        loadedFrames={f1LoadedCount}
      />

      {/* Luxury Navigation Bar */}
      <Navbar
        currentStage={currentStage}
        currentCollection={activeCollection}
        onOpenSpecs={() => handleOpenSpecs(activeCollection)}
        onJumpStage={handleJumpStage}
      />

      {/* Subtle Ambient Lighting Overlays with hardware acceleration */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-noise pointer-events-none z-10 opacity-20" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none z-10"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none z-10"
        style={{ transform: "translateZ(0)" }}
      />

      {/* ========================================================================= */}
      {/* HORIZONTAL CONTAINER SLIDER (100vw panels with GPU spring transition) */}
      {/* ========================================================================= */}
      <div
        className="flex w-[200vw] h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translate3d(${horizontalOffset}vw, 0, 0)`,
          willChange: "transform",
        }}
      >
        {/* PANEL 1: WHISK ATELIER (f1) */}
        <div className="relative w-[100vw] h-full flex-shrink-0">
          <CanvasScrubber
            currentFrame={f1Frame}
            folder="f1"
            framesArray={f1FramesRef.current}
            startFrameOffset={0}
            className="w-full h-full"
          />
        </div>

        {/* PANEL 2: HYDRO CHEF'S KNIFE (f2) & ENSEMBLE (f3) */}
        <div className="relative w-[100vw] h-full flex-shrink-0 overflow-hidden">
          {/* Base Layer: Knife (f2) */}
          <CanvasScrubber
            currentFrame={f2Frame}
            folder="f2"
            framesArray={f2FramesRef.current}
            startFrameOffset={118}
            className="w-full h-full"
          />

          {/* ===================================================================== */}
          {/* F3 BACKGROUND ELEMENT (Emerges midway from the middle of the page) */}
          {/* ===================================================================== */}
          <div
            className={`absolute inset-0 z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
              currentStage === "f3"
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-90 blur-sm"
            }`}
            style={{
              transformOrigin: "center center",
              willChange: "transform, opacity, filter",
            }}
          >
            <CanvasScrubber
              currentFrame={f3Frame}
              folder="f3"
              framesArray={f3FramesRef.current}
              startFrameOffset={184}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Narrative Overlays & Hotspots */}
      <ProductOverlays
        stage={currentStage}
        f1Progress={f1Progress}
        f2Progress={f2Progress}
        f3Progress={f3Progress}
        f1Frame={f1Frame}
        f2Frame={f2Frame}
        f3Frame={f3Frame}
        whiskCollection={WHISK_COLLECTION}
        knifeCollection={KNIFE_COLLECTION}
        ensembleCollection={ENSEMBLE_COLLECTION}
        onOpenSpecs={handleOpenSpecs}
      />

      {/* Full Technical Specifications & Ordering Drawer */}
      <ProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        collection={activeDrawerCollection || activeCollection}
      />
    </div>
  );
}
