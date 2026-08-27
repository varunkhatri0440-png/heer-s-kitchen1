"use client";

import { useEffect, useRef, useCallback } from "react";

interface CanvasScrubberProps {
  currentFrame: number;
  folder?: "f1" | "f2" | "f3";
  framesArray: (HTMLImageElement | null)[];
  startFrameOffset?: number; // e.g. 0 for f1, 118 for f2, 184 for f3
  className?: string;
}

export default function CanvasScrubber({
  currentFrame,
  framesArray,
  startFrameOffset = 0,
  className = "",
}: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRenderedImgRef = useRef<HTMLImageElement | null>(null);

  // Cached layout dimensions
  const layoutRef = useRef<{
    dpr: number;
    destX: number;
    destY: number;
    destW: number;
    destH: number;
    canvasW: number;
    canvasH: number;
  }>({
    dpr: 1,
    destX: 0,
    destY: 0,
    destW: 0,
    destH: 0,
    canvasW: 0,
    canvasH: 0,
  });

  // Calculate layout geometry once on resize
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    const canvasW = Math.round(displayWidth * dpr);
    const canvasH = Math.round(displayHeight * dpr);

    if (canvas.width !== canvasW || canvas.height !== canvasH) {
      canvas.width = canvasW;
      canvas.height = canvasH;
    }

    // Fixed aspect ratio (1920x1080 = 16:9)
    const imgRatio = 1920 / 1080;
    const canvasRatio = displayWidth / displayHeight;

    let renderWidth = displayWidth;
    let renderHeight = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = displayWidth;
      renderHeight = displayWidth / imgRatio;
      offsetY = (displayHeight - renderHeight) / 2;
    } else {
      renderHeight = displayHeight;
      renderWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - renderWidth) / 2;
    }

    layoutRef.current = {
      dpr,
      destX: Math.round(offsetX * dpr),
      destY: Math.round(offsetY * dpr),
      destW: Math.round(renderWidth * dpr),
      destH: Math.round(renderHeight * dpr),
      canvasW,
      canvasH,
    };
  }, []);

  // Zero-flicker rock-solid frame drawing
  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d", { alpha: false });
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    const localIndex = Math.max(0, currentFrame - startFrameOffset);
    let img = framesArray[localIndex];

    // If exact frame is still decoding/buffering, scan for nearest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      const maxScan = framesArray.length;
      for (let offset = 1; offset < maxScan; offset++) {
        const prev = framesArray[localIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = framesArray[localIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    // Fallback to last rendered frame to guarantee no black or blank frames
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = lastRenderedImgRef.current;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastRenderedImgRef.current = img;

    const layout = layoutRef.current;
    if (layout.canvasW === 0 || layout.canvasH === 0) {
      updateDimensions();
    }

    const { destX, destY, destW, destH } = layoutRef.current;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, destX, destY, destW, destH);
  }, [currentFrame, startFrameOffset, framesArray, updateDimensions]);

  // Trigger draw on frame update
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(drawCurrentFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawCurrentFrame]);

  // Setup resize listeners
  useEffect(() => {
    updateDimensions();
    drawCurrentFrame();

    const handleResize = () => {
      updateDimensions();
      drawCurrentFrame();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updateDimensions, drawCurrentFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block object-cover select-none pointer-events-none ${className}`}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    />
  );
}
