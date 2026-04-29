// Camera-sensor background:
//   1. A tight, dim dot grid covering the viewport — reads as a sensor pixel
//      array. CSS `radial-gradient` repeating, masked with a soft vignette so
//      it fades toward the edges.
//   2. A handful of "AF points" overlaid that fire on staggered loops — small
//      green squares + dots that pulse briefly like a Canon's autofocus
//      indicators locking on. Positions are pre-baked (not random) so SSR and
//      hydration agree.
//
// Pure CSS, no JS, no canvas. `aria-hidden` + `pointer-events-none` so it never
// interferes with anything. Honours `prefers-reduced-motion` (see globals.css).

const FOCUS_POINTS: Array<{
  x: number;
  y: number;
  delay: number;
  type: "dot" | "box";
}> = [
  { x: 10, y: 14, delay: 0.0, type: "dot" },
  { x: 30, y: 24, delay: 1.6, type: "box" },
  { x: 52, y: 16, delay: 3.2, type: "dot" },
  { x: 74, y: 22, delay: 4.8, type: "dot" },
  { x: 90, y: 38, delay: 2.4, type: "box" },
  { x: 8,  y: 46, delay: 6.0, type: "dot" },
  { x: 24, y: 60, delay: 0.8, type: "box" },
  { x: 70, y: 56, delay: 5.6, type: "dot" },
  { x: 92, y: 70, delay: 3.6, type: "dot" },
  { x: 14, y: 78, delay: 4.4, type: "dot" },
  { x: 44, y: 86, delay: 7.2, type: "box" },
  { x: 80, y: 84, delay: 2.0, type: "dot" },
];

const FIRE_DURATION = 9; // seconds — long quiet between pulses

export function SensorGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Dot grid — repeating radial gradient, masked with a soft radial vignette */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--color-paper) 0.8px, transparent 1.4px)",
          backgroundSize: "30px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at center, black 25%, transparent 95%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at center, black 25%, transparent 95%)",
        }}
      />

      {/* AF points firing */}
      {FOCUS_POINTS.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `af-fire ${FIRE_DURATION}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          {p.type === "box" ? (
            <div
              className="size-3.5 rounded-[2px] border border-accent/70"
              style={{
                boxShadow: "0 0 10px rgba(16,221,92,0.4)",
              }}
            />
          ) : (
            <div
              className="size-1.5 rounded-full bg-accent"
              style={{
                boxShadow:
                  "0 0 6px var(--color-accent), 0 0 14px rgba(16,221,92,0.5)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
