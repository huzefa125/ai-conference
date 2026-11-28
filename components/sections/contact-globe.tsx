"use client";

import * as React from "react";
import createGlobe, { type Arc, type Marker } from "cobe";
import { useReducedMotion } from "motion/react";

/*
 * A dotted WebGL globe (cobe) centred on Hyderabad, with arcs flying in from cities researchers travel from.
 * It sways gently around India, can be dragged, pauses while off screen, and stays still for reduced motion.
 */

type LatLon = [number, number];

const HYDERABAD: LatLon = [17.385, 78.4867];

// Cities on the India-facing side of the globe, so the arcs stay visible while it sways.
const ORIGINS: LatLon[] = [
  [51.5072, -0.1276], // London
  [52.52, 13.405], // Berlin
  [30.0444, 31.2357], // Cairo
  [-1.2921, 36.8219], // Nairobi
  [25.2048, 55.2708], // Dubai
  [1.3521, 103.8198], // Singapore
  [35.6762, 139.6503], // Tokyo
  [-33.8688, 151.2093], // Sydney
  [-26.2041, 28.0473], // Johannesburg
];

// Site blue (#0052ff) as 0–1 RGB, as cobe expects.
const BLUE: [number, number, number] = [0, 0.322, 1];
// Site cyan (#00b8d9) for the flight paths.
const CYAN: [number, number, number] = [0, 0.722, 0.851];

const MARKERS: Marker[] = [
  { location: HYDERABAD, size: 0.1, color: BLUE },
  ...ORIGINS.map((location) => ({ location, size: 0.035 })),
];
const ARCS: Arc[] = ORIGINS.map((from) => ({ from, to: HYDERABAD }));

/** cobe's rotation for a longitude: puts that meridian facing the viewer. */
const phiFor = (lon: number) => Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2);
const BASE_PHI = phiFor(HYDERABAD[1]);
const THETA = 0.28; // tilt so the northern hemisphere (and Hyderabad) sits a little higher
const SWAY = 0.55; // radians either side of Hyderabad
const SWAY_SPEED = 0.18; // radians of sway phase per second

export default function ContactGlobe({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drag = React.useRef<{ startX: number; offset: number } | null>(null);
  const dragOffset = React.useRef(0);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = wrap.clientWidth;
    let frame = 0;
    let visible = true;
    let swayPhase = 0;
    let last = performance.now();

    const setPixels = () => {
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };
    setPixels();

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: BASE_PHI,
      theta: THETA,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.94, 0.95, 0.98],
      markerColor: BLUE,
      glowColor: [0.9, 0.93, 1],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: CYAN,
      arcWidth: 0.6,
      arcHeight: 0.28,
      markerElevation: 0.01,
    });

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // While dragging, hold the sway; otherwise ease the drag offset back toward Hyderabad.
      if (!drag.current) {
        if (!reduce) swayPhase += dt * SWAY_SPEED * Math.PI * 2 * 0.25;
        dragOffset.current *= 0.96;
      }
      const sway = reduce ? 0 : Math.sin(swayPhase) * SWAY;
      globe.update({ phi: BASE_PHI + sway + dragOffset.current, width: size * dpr, height: size * dpr });
      if (visible) frame = requestAnimationFrame(render);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      last = performance.now();
      frame = requestAnimationFrame(render);
    };

    // Keep the canvas sharp when the layout changes.
    const resizer = new ResizeObserver(() => {
      size = wrap.clientWidth;
      setPixels();
      globe.update({ width: size * dpr, height: size * dpr });
    });
    resizer.observe(wrap);

    // Stop drawing while the globe is off screen.
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    watcher.observe(wrap);

    start();
    const fadeIn = window.setTimeout(() => setReady(true), 60);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fadeIn);
      resizer.disconnect();
      watcher.disconnect();
      globe.destroy();
    };
  }, [reduce]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drag.current = { startX: e.clientX, offset: dragOffset.current };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    const width = wrapRef.current?.clientWidth || 1;
    dragOffset.current = drag.current.offset + ((e.clientX - drag.current.startX) / width) * Math.PI;
  };
  const endDrag = () => {
    drag.current = null;
  };

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        aria-label="Globe with flight paths from cities around the world to Hyderabad"
        role="img"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`h-full w-full cursor-grab touch-pan-y transition-opacity duration-1000 active:cursor-grabbing ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
