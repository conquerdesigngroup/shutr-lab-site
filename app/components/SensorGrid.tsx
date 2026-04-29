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
  type: "dot" | "box" | "zone";
}> = [
  { x: 6,  y: 12, delay: 0.0, type: "dot"  },
  { x: 18, y: 18, delay: 0.4, type: "box"  },
  { x: 28, y: 32, delay: 1.2, type: "dot"  },
  { x: 38, y: 14, delay: 1.8, type: "zone" },
  { x: 45, y: 26, delay: 2.4, type: "dot"  },
  { x: 56, y: 8,  delay: 3.0, type: "box"  },
  { x: 62, y: 22, delay: 0.6, type: "dot"  },
  { x: 70, y: 12, delay: 1.4, type: "dot"  },
  { x: 78, y: 28, delay: 2.0, type: "box"  },
  { x: 84, y: 18, delay: 2.6, type: "dot"  },
  { x: 92, y: 32, delay: 3.4, type: "zone" },
  { x: 4,  y: 38, delay: 0.8, type: "dot"  },
  { x: 12, y: 48, delay: 1.6, type: "box"  },
  { x: 24, y: 52, delay: 2.2, type: "dot"  },
  { x: 32, y: 44, delay: 2.8, type: "dot"  },
  { x: 48, y: 50, delay: 0.2, type: "zone" },
  { x: 60, y: 42, delay: 0.9, type: "dot"  },
  { x: 72, y: 50, delay: 1.5, type: "box"  },
  { x: 86, y: 46, delay: 2.1, type: "dot"  },
  { x: 96, y: 56, delay: 2.7, type: "dot"  },
  { x: 8,  y: 64, delay: 3.3, type: "box"  },
  { x: 20, y: 70, delay: 0.1, type: "dot"  },
  { x: 30, y: 76, delay: 0.7, type: "zone" },
  { x: 42, y: 68, delay: 1.3, type: "dot"  },
  { x: 50, y: 84, delay: 1.9, type: "dot"  },
  { x: 58, y: 72, delay: 2.5, type: "box"  },
  { x: 68, y: 80, delay: 3.1, type: "dot"  },
  { x: 78, y: 70, delay: 0.5, type: "dot"  },
  { x: 88, y: 78, delay: 1.1, type: "box"  },
  { x: 14, y: 88, delay: 1.7, type: "dot"  },
  { x: 36, y: 92, delay: 2.3, type: "zone" },
  { x: 80, y: 92, delay: 2.9, type: "dot"  },
];

const FIRE_DURATION = 3.6; // seconds — full loop length (faster = more alive)

export function SensorGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Dot grid — repeating radial gradient, masked with a soft radial vignette */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--color-paper) 1px, transparent 1.6px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at center, black 30%, transparent 95%)",
          maskImage:
            "radial-gradient(ellipse 95% 85% at center, black 30%, transparent 95%)",
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
          {p.type === "zone" ? (
            <div
              className="size-9 rounded-[4px] border-2 border-accent"
              style={{
                boxShadow:
                  "0 0 24px var(--color-accent), 0 0 48px rgba(16,221,92,0.5), inset 0 0 12px rgba(16,221,92,0.25)",
              }}
            />
          ) : p.type === "box" ? (
            <div
              className="size-6 rounded-[3px] border-2 border-accent"
              style={{
                boxShadow:
                  "0 0 18px var(--color-accent), 0 0 32px rgba(16,221,92,0.45)",
              }}
            />
          ) : (
            <div
              className="size-2.5 rounded-full bg-accent"
              style={{
                boxShadow:
                  "0 0 12px var(--color-accent), 0 0 28px var(--color-accent), 0 0 44px rgba(16,221,92,0.5)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
