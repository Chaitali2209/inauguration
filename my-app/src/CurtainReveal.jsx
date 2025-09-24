import React, { useEffect, useRef, useState } from "react";

/**
 * CurtainReveal
 * - Slow two-panel curtain that slides apart.
 * - Dark backdrop fades out during the slide.
 * - Unmounts immediately on animationend of BOTH halves (no lingering).
 *
 * Props:
 *  - onRevealed?: () => void
 *  - ctaText?: string                       (default: "Tap to unveil")
 *  - openMs?: number                        (default: 2800)  // curtain speed
 *  - ease?: string                          (default: "cubic-bezier(.2,.8,.2,1)")
 */
export default function CurtainReveal({
  onRevealed,
  ctaText = "Tap to unveil",
  openMs = 2800,
  ease = "cubic-bezier(.2,.8,.2,1)",
}) {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const doneCount = useRef(0);
  const fallbackTimer = useRef(null);

  // Respect reduced motion: skip animations and reveal immediately
  useEffect(() => {
    const q = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (q?.matches) {
      setHidden(true);
      onRevealed?.();
    }
  }, [onRevealed]);

  const finish = () => {
    if (hidden) return;
    setHidden(true);
    onRevealed?.();
  };

  const onHalfEnd = () => {
    doneCount.current += 1;
    if (doneCount.current >= 2) {
      // Both halves finished
      clearTimeout(fallbackTimer.current);
      finish();
    }
  };

  const handleOpen = () => {
    if (opening || hidden) return;

    // Attach listeners BEFORE starting the animation
    leftRef.current?.addEventListener("animationend", onHalfEnd, { once: true });
    rightRef.current?.addEventListener("animationend", onHalfEnd, { once: true });

    // Kick off animation next frame to avoid layout jank
    requestAnimationFrame(() => {
      setOpening(true);
      // Safety fallback in case animationend doesn't fire
      fallbackTimer.current = setTimeout(finish, openMs + 200);
    });
  };

  useEffect(() => {
    return () => clearTimeout(fallbackTimer.current);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`curtain-root ${opening ? "opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Curtain"
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
      tabIndex={0}
      style={{ ["--open-ms"]: `${openMs}ms`, ["--ease"]: ease }}
    >
      {/* Two halves */}
      <div ref={leftRef} className="curtain half left" aria-hidden />
      <div ref={rightRef} className="curtain half right" aria-hidden />

      {/* Center CTA */}
      <div className="curtain-cta">
        <div className="rope" />
        <button className="curtain-button" onClick={handleOpen} disabled={opening}>
          {opening ? "Opening…" : ctaText}
        </button>
      </div>

      {/* Styles */}
      <style>{`
        .curtain-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          overflow: hidden;
          outline: none;
        }

        /* Dark backdrop lives on ::before so we can fade it during the slide */
        .curtain-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #200;
          z-index: 0;
          will-change: opacity;
        }
        .curtain-root.opening::before {
          /* Fade out over the whole duration; the keyframe drops to 0 early */
          animation: bgFade var(--open-ms) linear forwards;
        }
        @keyframes bgFade {
          0%   { opacity: 1; }
          80%  { opacity: 0; }
          100% { opacity: 0; }
        }

        .curtain.half {
          position: absolute;
          top: 0; bottom: 0;
          width: 50vw;
          z-index: 1;
          background:
            radial-gradient(80% 100% at 10% 10%, rgba(255,255,255,0.12), transparent 60%),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0 8px, rgba(0,0,0,0.05) 8px 16px),
            linear-gradient(180deg, #b4121a, #7e0b10 60%, #5f070b);
          box-shadow: inset 0 0 60px rgba(0,0,0,.65);
          will-change: transform;
          transform: translate3d(0,0,0);
        }
        .left  { left: 0; }
        .right { right: 0; }

        .curtain-cta {
          position: relative;
          z-index: 2;
          text-align: center;
          display: grid;
          gap: 12px;
        }
        .rope {
          width: 4px; height: 110px; margin: 0 auto 8px;
          background: linear-gradient(180deg, #fce19a, #caa24a);
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(0,0,0,0.35);
        }
        .curtain-button {
          border: 0;
          padding: 12px 22px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          color: #240000;
          background: #ffd24d;
          box-shadow: 0 10px 24px rgba(0,0,0,0.35);
          transition: transform 160ms ease, filter 160ms ease;
        }
        .curtain-button:hover  { filter: brightness(1.03); transform: translateY(-1px); }
        .curtain-button:active { transform: translateY(0); }
        .curtain-button:disabled { opacity: .8; cursor: default; }

        /* Opening animations */
        .curtain-root.opening .left  { animation: slideLeft  var(--open-ms) var(--ease) forwards; }
        .curtain-root.opening .right { animation: slideRight var(--open-ms) var(--ease) forwards; }
        .curtain-root.opening .curtain-cta { animation: fadeDown 600ms ease forwards; }

        @keyframes slideLeft  {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-55vw,0,0); }
        }
        @keyframes slideRight {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(55vw,0,0); }
        }
        @keyframes fadeDown   {
          to { opacity: 0; transform: translateY(12px); }
        }

        /* Keyboard focus ring */
        .curtain-root:focus-visible .curtain-button {
          outline: 3px solid #fff;
          outline-offset: 4px;
        }

        /* Mobile tweaks */
        @media (max-width: 900px) {
          .rope { height: 90px; }
          .curtain-button { font-size: 15px; padding: 10px 18px; }
        }

        /* Reduced motion: (handled in JS by skipping entirely) */
      `}</style>
    </div>
  );
}
