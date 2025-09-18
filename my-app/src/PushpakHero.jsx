import React from "react";

/**
 * PushpakHero
 * Full-screen hero inspired by the G20 banner, customized for
 * "PUSHPAK - National Mission on Drone Technology".
 *
 * Changes from previous version:
 * - Full screen (100vh/100svh)
 * - Removes multilingual welcome texts
 * - Top two-line heading
 * - Center uses your logo image (pass via logoSrc)
 */
export default function PushpakHero({
  headingLine1 = "PUSHPAK - National Mission on Drone Technology",
  headingLine2 = "Towards Drone Excellence",
  logoSrc = "/logo.png", // <-- replace with your actual path
  logoAlt = "Pushpak Logo",
  gradientFrom = "#e97c1d",
  gradientTo = "#3aa74a",
}) {
  return (
    <section className="hero" role="banner" aria-label="Pushpak hero">
      {/* Subtle decorative flowers */}
      <Flower style={{ top: "8%", left: "6%", transform: "scale(1.1)" }} />
      <Flower style={{ top: "14%", right: "8%", transform: "scale(0.9)" }} delay={1.2} />
      <Flower style={{ bottom: "10%", left: "14%", transform: "scale(0.9)" }} delay={0.6} />
      <Flower style={{ bottom: "12%", right: "6%", transform: "scale(1.05)" }} delay={1.8} />

      {/* Top Heading */}
      <header className="top">
        <h1 className="h1">{headingLine1}</h1>
        <p className="h2">{headingLine2}</p>
      </header>

      {/* Center Logo */}
      <div className="center">
        <div className="logoHalo">
          <img src={logoSrc} alt={logoAlt} className="logo" />
          <Chakra className="chakra" />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 100svh; /* mobile safe */
          min-height: 100vh;
          color: #fff;
          background: radial-gradient(1200px 800px at 15% 20%, rgba(255,255,255,0.08), transparent 60%),
                      radial-gradient(1200px 800px at 85% 75%, rgba(255,255,255,0.07), transparent 60%),
                      linear-gradient(90deg, ${gradientFrom}, ${gradientTo});
          overflow: hidden;
          isolation: isolate;
        }
        .top {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 3;
          padding: 0 16px;
          max-width: min(92vw, 1200px);
        }
        .h1 {
          font-size: clamp(20px, 3.2vw, 36px);
          font-weight: 800;
          margin: 0 0 6px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.25);
          letter-spacing: 0.2px;
        }
        .h2 {
          font-size: clamp(14px, 2vw, 22px);
          margin: 0;
          opacity: 0.95;
          font-weight: 600;
        }
        .center {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          z-index: 3;
        }
        .logoHalo {
          position: relative;
          width: min(46vmin, 360px);
          height: min(46vmin, 360px);
          border-radius: 50%;
          background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.16), rgba(255,255,255,0.04)), rgba(255,255,255,0.08);
          box-shadow: inset 0 0 30px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.25);
          display: grid;
          place-items: center;
          animation: float 6s ease-in-out infinite;
        }
        .logo {
          width: 68%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.25));
        }
        .chakra { position: absolute; inset: 14% auto auto 50%; translate: -50% 0; opacity: 0.22; }

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes drift { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-18px) rotate(360deg); } }
      `}</style>
    </section>
  );
}

/* ---------------- Decorative Bits ---------------- */
function Flower({ style, delay = 0 }) {
  return (
    <div className="flower" style={style} aria-hidden>
      <svg viewBox="0 0 100 100" width="150" height="150">
        <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="50" rx="16" ry="40" transform={`rotate(${i * 22.5} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="6" stroke="rgba(255,255,255,0.25)" fill="none" />
        </g>
      </svg>
      <style>{`
        .flower { position: absolute; z-index: 1; opacity: 0.9; filter: blur(0.1px); }
        .flower svg { animation: drift 28s linear infinite; animation-delay: ${delay}s; }
      `}</style>
    </div>
  );
}

function Chakra({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" width="120" height="120" aria-hidden>
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#grad)" strokeWidth="3" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="60"
          y1="60"
          x2="60"
          y2="8"
          stroke="url(#grad)"
          strokeWidth="3"
          transform={`rotate(${(360 / 24) * i} 60 60)`}
        />
      ))}
      <style>{`
        svg { animation: spin 22s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </svg>
  );
}
