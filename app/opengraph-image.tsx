import { ImageResponse } from "next/og";

export const alt = "SHUTR LAB — Canon tethering for macOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0E0E",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          color: "#FAFAF8",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 60,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="14 19 94 90"
            fill="#10DD5C"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.74,102.02l6.92-16.46c.75-1.79,2.3-3.64,4.5-3.65l29.94-.11c2.96-.01,4.95-2.28,5.97-4.65l7.97-18.63c.69-1.61,2.95-2.12,4.41-2.22l2.55-.19,23.4-.02c.8,0,1.87.69,2.2,1.22.38.61.44,1.92.1,2.7l-18.32,42.96c-.41.97-2.52,2.04-3.58,2.05l-63.39.02c-1.48,0-3.35-1.43-2.68-3.02Z" />
            <path d="M61.61,56.07l4.25.08c1,.02,2.38,1.38,1.93,2.47l-3.08,7.45c-.84,2.03-2.31,3.9-4.89,3.9l-30.7.05c-2.07,0-3.61-1.27-3.43-3.44l15.92-38.33c.94-2.26,2.43-3.78,5.06-3.78h51.79c1.67,0,2.44,1.32,2.19,2.93l-6.86,15.83c-.41.94-2.39,2.12-3.4,2.13l-23.73.09c-1.67,0-3.54,1.25-4.17,2.63l-2.62,5.78c-.15.34.11,1.42.37,1.68s.98.52,1.38.53Z" />
          </svg>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            SHUTR LAB
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            marginBottom: 36,
          }}
        >
          <span>Canon tether.</span>
          <span style={{ color: "#10DD5C" }}>Built for macOS.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: "#888",
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          Native USB tethering for Canon EOS cameras. Catches every shot, files
          it correctly, stays out of your way.
        </div>
      </div>
    ),
    { ...size }
  );
}
