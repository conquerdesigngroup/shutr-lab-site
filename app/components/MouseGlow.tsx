"use client";

import { useEffect, useRef } from "react";

// A soft lime-green halo that follows the cursor on desktop. Sits in the same
// background layer as the SensorGrid (z = -10) so it brightens the dot grid
// near the pointer without ever sitting on top of content.
//
//   - Driven by a single requestAnimationFrame loop, lerping toward the latest
//     mousemove target, so the glow eases instead of snapping.
//   - Disabled on touch devices (`pointer: coarse`) and when the user has
//     `prefers-reduced-motion: reduce` set — it just doesn't render.
//   - `pointer-events-none` so it never steals hover/clicks.
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skip = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce)"
    );
    if (skip.matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    const SIZE = 800; // matches the rendered div's width/height
    let raf = 0;

    function tick() {
      // Lerp factor — lower = lazier follow. 0.08 ≈ 80ms cinematic ease.
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${current.x - SIZE / 2}px, ${current.y - SIZE / 2}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-10 size-[800px] rounded-full"
      style={{
        background:
          "radial-gradient(circle at center, rgba(16,221,92,0.18), rgba(16,221,92,0.05) 40%, transparent 72%)",
        willChange: "transform",
      }}
    />
  );
}
