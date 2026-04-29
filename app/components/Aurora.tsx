// Ambient drifting "aurora" blobs behind the page content.
// Three blurred green circles float in slow, asymmetric loops.
// Pure CSS — no JS, no canvas, no images. Renders behind everything via
// `fixed inset-0 -z-10`, and is `aria-hidden`/`pointer-events-none` so it
// never interferes with clicks or screen readers.
export function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div
        className="absolute -top-40 -left-40 size-[640px] rounded-full bg-accent/20 blur-[120px]"
        style={{ animation: "aurora-1 28s ease-in-out infinite" }}
      />
      <div
        className="absolute top-32 -right-60 size-[520px] rounded-full bg-accent/15 blur-[120px]"
        style={{ animation: "aurora-2 34s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-60 left-1/4 size-[760px] rounded-full bg-accent/10 blur-[140px]"
        style={{ animation: "aurora-3 30s ease-in-out infinite" }}
      />
    </div>
  );
}
