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
  { x: 12, y: 18, delay: 0.0, type: "dot" },
  { x: 28, y: 32, delay: 1.2, type: "box" },
  { x: 45, y: 22, delay: 2.4, type: "dot" },
  { x: 62, y: 14, delay: 0.6, type: "box" },
  { x: 78, y: 28, delay: 3.6, type: "dot" },
  { x: 88, y: 48, delay: 1.8, type: "dot" },
  { x: 18, y: 56, delay: 4.2, type: "box" },
  { x: 38, y: 68, delay: 2.0, type: "dot" },
  { x: 55, y: 78, delay: 5.0, type: "box" },
  { x: 72, y: 65, delay: 3.0, type: "dot" },
  { x: 8, y: 82, delay: 4.8, type: "dot" },
  { x: 92, y: 80, delay: 1.0, type: "box" },
];

const FIRE_DURATION = 6; // seconds — full loop length

export function SensorGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Dot grid — repeating radial gradient, masked with a soft radial vignette */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--color-paper) 0.8px, transparent 1.4px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at center, black 30%, transparent 95%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at center, black 30%, transparent 95%)",
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
              className="size-3.5 rounded-[2px] border border-accent"
              style={{
                boxShadow: "0 0 12px var(--color-accent)",
              }}
            />
          ) : (
            <div
              className="size-1.5 rounded-full bg-accent"
              style={{
                boxShadow:
                  "0 0 8px var(--color-accent), 0 0 16px var(--color-accent)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
