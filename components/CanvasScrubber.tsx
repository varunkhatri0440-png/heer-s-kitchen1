"use client";

import { useEffect, useRef, useCallback } from "react";

interface CanvasScrubberProps {
  currentFrame: number;
  folder: "f1" | "f2" | "f3";
  framesArray: (HTMLImageElement | null)[];
  startFrameOffset?: number; // e.g. 0 for f1, 118 for f2, 184 for f3
  className?: string;
}

export default function CanvasScrubber({
  currentFrame,
  folder,
  framesArray,
  startFrameOffset = 0,
  className = "",
}: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRenderedImgRef = useRef<HTMLImageElement | null>(null);
  const dimensionsRef = useRef<{
    width: number;
    height: number;
    dpr: number;
    renderWidth: number;
    renderHeight: number;
    offsetX: number;
    offsetY: number;
  }>({
    width: 0,
    height: 0,
    dpr: 1,
    renderWidth: 0,
    renderHeight: 0,
    offsetX: 0,
    offsetY: 0,
  });

  // Calculate layout geometry once on resize
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    const newCanvasW = Math.round(displayWidth * dpr);
    const newCanvasH = Math.round(displayHeight * dpr);

    if (canvas.width !== newCanvasW || canvas.height !== newCanvasH) {
      canvas.width = newCanvasW;
      canvas.height = newCanvasH;
    }

    const imgWidth = 1920;
    const imgHeight = 1080;
    const imgRatio = imgWidth / imgHeight;
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

    dimensionsRef.current = {
      width: displayWidth,
      height: displayHeight,
      dpr,
      renderWidth,
      renderHeight,
      offsetX,
      offsetY,
    };
  }, []);

  // Zero-flicker rock-solid frame drawing
  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Standard double-buffered 2D context (no desynchronized to eliminate black flashes)
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const localIndex = Math.max(0, currentFrame - startFrameOffset);
    let img = framesArray[localIndex];

    // If exact frame is still decoding/buffering, scan for nearest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Scan outward
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

    // If still no frame in array, fallback to last rendered image
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = lastRenderedImgRef.current;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastRenderedImgRef.current = img;

    const dim = dimensionsRef.current;
    if (dim.width === 0 || dim.height === 0) {
      updateDimensions();
    }

    const { dpr, renderWidth, renderHeight, offsetX, offsetY } = dimensionsRef.current;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();
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
