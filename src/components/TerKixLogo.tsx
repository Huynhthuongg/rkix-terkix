import React from "react";

/* ─────────────────────────────────────────────
   TerKix Brand Assets
   Logomark: geometric TK monogram
   Usage:
     <TerKixMark size={32} />              — icon only
     <TerKixWordmark size={28} />          — icon + wordmark
     <TerKixBadge />                       — small inline badge
───────────────────────────────────────────── */

interface MarkProps {
  size?: number;
  className?: string;
}

/** Full SVG logomark — the geometric TK symbol */
export function TerKixMark({ size = 32, className = "" }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TerKix"
    >
      {/* Background */}
      <rect width="40" height="40" fill="#4B7FFF" />

      {/* T stem + K vertical (shared stroke) */}
      <rect x="9" y="8" width="3.5" height="24" fill="white" />

      {/* T crossbar */}
      <rect x="9" y="8" width="13" height="3.5" fill="white" />

      {/* K top diagonal */}
      <polygon
        points="12.5,19.5 24,8 28,8 16.5,19.5"
        fill="white"
        opacity="0.95"
      />

      {/* K bottom diagonal */}
      <polygon
        points="12.5,20.5 24,32 28,32 16.5,20.5"
        fill="white"
        opacity="0.95"
      />

      {/* Accent dot — bottom-right corner marker */}
      <rect x="30" y="30" width="3.5" height="3.5" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/** Horizontal lockup: mark + wordmark */
export function TerKixWordmark({ size = 28, className = "" }: MarkProps) {
  const scale = size / 40;
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <TerKixMark size={size} />
      <div style={{ transform: `scale(${Math.min(scale + 0.25, 1)})`, transformOrigin: "left center" }}>
        <svg
          viewBox="0 0 88 22"
          width={88 * Math.min(scale + 0.25, 1)}
          height={22 * Math.min(scale + 0.25, 1)}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* "TerKix" wordmark in Inter-like geometric letterforms */}
          <text
            x="0"
            y="17"
            fontFamily="Inter, ui-sans-serif, sans-serif"
            fontWeight="650"
            fontSize="18"
            letterSpacing="-0.5"
            fill="#eeeeee"
          >
            TerKix
          </text>
        </svg>
      </div>
    </div>
  );
}

/** Small square badge (used in topbar on mobile) */
export function TerKixBadge({ size = 24, className = "" }: MarkProps) {
  return (
    <div
      className={`flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <TerKixMark size={size} />
    </div>
  );
}

/** Full-color brand logo for splash / about pages */
export function TerKixFullLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Large mark */}
      <div className="relative">
        <TerKixMark size={64} />
        {/* Subtle glow */}
        <div
          className="absolute inset-0 -z-10 blur-2xl opacity-30"
          style={{ background: "#4B7FFF", borderRadius: 4 }}
        />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-sans font-semibold text-[#eeeeee] tracking-tight"
          style={{
            fontSize: 28,
            fontFamily: '"Inter", ui-sans-serif, sans-serif',
            letterSpacing: "-0.04em",
            fontFeatureSettings: '"ss01" 1, "kern" 1',
          }}
        >
          TerKix
        </span>
        <span
          className="font-mono text-[#555555] uppercase tracking-widest"
          style={{ fontSize: 10, letterSpacing: "0.18em" }}
        >
          Terminal OS
        </span>
      </div>
    </div>
  );
}

export default TerKixMark;
