import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * InaugurationScreen — AOS sequence
 * 1) Page zoom-out
 * 2) Right (IIT Bombay) fade from right (data-aos="fade-left")
 * 3) Left (Ministry + Inaugurated by) fade from left (data-aos="fade-right")
 * 4) Center lotus zoom-in
 */
export default function InaugurationScreen({
  titleLine1 = "PUSHPAK - National Mission on Drone Technology",
  titleLine2 = "Towards Drone Excellence",

  // LEFT (Ministry + Inaugurated by)
  ministryName = "Ministry of Electronics & Information Technology",
  ministryLogoSrc = "/assets/meity_logo.png",
  ministryLogoSize, // e.g. "300px"
  ministerPhotoSrc = "/assets/jitin_prasada.jpg",
  ministerName = "Shri Jitin Prasada",
  ministerTitle = "Hon'ble Minister of State",
  ministerDept = "Ministry of Electronics and Information Technology (MeitY), Govt. of India",

  // RIGHT (IIT Bombay)
  iitbName = "Indian Institute of Technology Bombay",
  iitbLogoSrc = "/assets/iitb_logo.png",

  // Center lotus
  lotusSrc, // optional; defaults to inline SVG
  redirectTo = "/home",

  // Colors
  gradientFrom = "#e97c1d",
  gradientTo = "#3aa74a",
}) {
  const [launching, setLaunching] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const lotusRef = useRef(null);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 0,
      easing: "ease-out-quart",
      anchorPlacement: "top-top",
    });
    setTimeout(() => AOS.refresh(), 50);
  }, []);

  const handleInaugurate = () => {
    if (launching) return;
    setLaunching(true);
    setTimeout(() => setFadeOut(true), 600);
    setTimeout(() => {
      window.location.replace(redirectTo);
    }, 1200);
  };

  // Respect prefers-reduced-motion for the idle lotus pulse
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (q.matches && lotusRef.current) lotusRef.current.style.animation = "none";
  }, []);

  return (
    <section className={`wrap ${fadeOut ? "fade" : ""}`} role="main" aria-label="Inauguration">
      <div className="aosPage" data-aos="zoom-out" data-aos-duration="700">
        {/* Decorative flowers */}
        <Flower style={{ top: "8%", left: "6%", transform: "scale(1.1)" }} />
        <Flower style={{ top: "14%", right: "8%", transform: "scale(0.9)" }} delay={1.2} />
        <Flower style={{ bottom: "10%", left: "14%", transform: "scale(0.9)" }} delay={0.6} />
        <Flower style={{ bottom: "12%", right: "6%", transform: "scale(1.05)" }} delay={1.8} />

        {/* Heading */}
        <header className="top">
          <h1 className="h1">{titleLine1}</h1>
          <p className="h2">{titleLine2}</p>
        </header>

        {/* Columns */}
        <div className="grid">
          {/* LEFT — Ministry + Inaugurated by (appears second) */}
          <aside
            className="panel"
            aria-label={`${ministryName} details`}
            data-aos="fade-right"      /* slides in from left */
            data-aos-delay="1400"
            data-aos-duration="800"
          >
            <div className="panelStack">
              <img
                className="panelLogo big"
                src={ministryLogoSrc}
                alt={`${ministryName} logo`}
                style={ministryLogoSize ? { width: ministryLogoSize, height: ministryLogoSize } : undefined}
              />
              <h2 className="panelName">{ministryName}</h2>

              <div className="byBlock">
                <div className="byLabel">Inaugurated by</div>
                <img className="avatar" src={ministerPhotoSrc} alt={ministerName} />
                <div className="byText">
                  <div className="byName">{ministerName}</div>
                  <div className="byTitle">{ministerTitle}</div>
                  <div className="byDept">{ministerDept}</div>
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER — Lotus + Button (appears last) */}
          <div className="center">
            <div
              className={`lotusWrap ${launching ? "zoom" : ""}`}
              data-aos="zoom-in"
              data-aos-delay="2000"
              data-aos-duration="800"
            >
              {lotusSrc ? (
                <img ref={lotusRef} className="lotus" src={lotusSrc} alt="Lotus" />
              ) : (
                <LotusSVG innerRef={lotusRef} className="lotus" />
              )}
            </div>
            <button
              className={`cta ${launching ? "disabled" : ""}`}
              onClick={handleInaugurate}
              aria-label="Inaugurate"
              disabled={launching}
              data-aos="zoom-in-up"
              data-aos-delay="2200"
              data-aos-duration="600"
            >
              {launching ? "Inaugurating…" : "Inaugurate"}
            </button>
          </div>

          {/* RIGHT — IIT Bombay (appears first) */}
          <aside
            className="panel"
            aria-label={`${iitbName} details`}
            data-aos="fade-left"       /* slides in from right */
            data-aos-delay="800"
            data-aos-duration="800"
          >
            <div className="panelStack">
              <img className="panelLogo big" src={iitbLogoSrc} alt={`${iitbName} logo`} />
              <h2 className="panelName">{iitbName}</h2>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .wrap {
          position: relative;
          min-height: 100svh;
          color: #fff;
          background:
            radial-gradient(1200px 800px at 15% 20%, rgba(255,255,255,0.08), transparent 60%),
            radial-gradient(1200px 800px at 85% 75%, rgba(255,255,255,0.07), transparent 60%),
            linear-gradient(90deg, ${gradientFrom}, ${gradientTo});
          overflow: hidden;
        }
        .wrap.fade::after {
          content: ""; position: absolute; inset: 0; background: #fff;
          opacity: 0; animation: fadeWhite 600ms ease forwards; z-index: 7;
        }
        @keyframes fadeWhite { to { opacity: 1; } }

        .aosPage { position: relative; min-height: 100svh; }

        .top {
          position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
          text-align: center; z-index: 3; padding: 0 16px; max-width: min(92vw, 1200px);
        }
        .h1 { font-size: clamp(20px, 3.2vw, 34px); font-weight: 800; margin: 0 0 6px; text-shadow: 0 2px 10px rgba(0,0,0,0.25); }
        .h2 { font-size: clamp(14px, 2vw, 20px); margin: 0; opacity: 0.95; font-weight: 600; }

        .grid {
          height: 100svh;
          display: grid;
          grid-template-columns: 1fr min(38rem, 36vw) 1fr;
          gap: clamp(12px, 3vw, 28px);
          align-items: center;
          justify-items: center;
          padding: 96px clamp(12px, 4vw, 40px) 32px;
          position: relative; z-index: 2;
        }

        .panel {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(6px);
          border-radius: 24px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.28);
          padding: clamp(22px, 3vw, 30px);
          min-height: clamp(320px, 50vh, 520px);
          display: grid;
          align-content: center;
        }
        .panelStack { display: grid; justify-items: center; gap: clamp(10px, 2.2vmin, 16px); text-align: center; }

        .panelLogo { width: clamp(72px, 10vmin, 120px); height: clamp(72px, 10vmin, 120px); object-fit: contain; filter: drop-shadow(0 6px 16px rgba(0,0,0,0.25)); }
        .panelLogo.big { width: clamp(96px, 14vmin, 160px); height: clamp(96px, 14vmin, 160px); }

        /* Inaugurated-by block (left panel) */
        .byBlock { display: grid; justify-items: center; gap: 10px; margin-top: clamp(8px, 1.8vmin, 14px); }
        .byLabel { font-size: clamp(12px, 1.3vw, 14px); letter-spacing: .12em; text-transform: uppercase; opacity: .9; }
        .avatar {
          width: clamp(110px, 14vmin, 180px);
          height: clamp(110px, 14vmin, 180px);
          object-fit: cover;
          border-radius: 999px;
          border: 3px solid rgba(255,255,255,0.7);
          box-shadow: 0 10px 32px rgba(0,0,0,0.35);
        }
        .byText { display: grid; gap: 2px; }
        .byName  { font-size: clamp(18px, 2.2vw, 26px); font-weight: 800; }
        .byTitle { font-size: clamp(13px, 1.6vw, 16px); opacity: .95; }
        .byDept  { font-size: clamp(12px, 1.4vw, 15px); opacity: .95; }

        .center { display: grid; place-items: center; gap: 18px; }
        .lotusWrap { width: min(36vmin, 260px); height: min(36vmin, 260px); display: grid; place-items: center; position: relative; }
        .lotus { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 10px 22px rgba(0,0,0,0.35)); animation: idlePulse 3.2s ease-in-out infinite; }
        @keyframes idlePulse { 0%,100% { transform: scale(1);} 50%  { transform: scale(1.04);} }

        .lotusWrap.zoom .lotus { animation: zoomOut 1200ms cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes zoomOut { 0% { transform: scale(1); opacity: 1; } 60% { transform: scale(3.2); opacity: 1; } 100% { transform: scale(7.8); opacity: 0.85; } }

        .cta {
          border: none; border-radius: 999px; padding: 14px 28px; font-weight: 800; font-size: 18px; cursor: pointer;
          color: #1a1a1a; background: #fff; box-shadow: 0 10px 24px rgba(0,0,0,0.25);
          transition: transform 160ms ease, box-shadow 160ms ease, opacity 200ms ease;
        }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 16px 30px rgba(0,0,0,0.28); }
        .cta.disabled { opacity: 0.7; cursor: default; }

        /* Mobile */
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; gap: 20px; padding-top: 120px; padding-bottom: 40px; }
          .panel { max-width: 640px; min-height: clamp(260px, 44vh, 480px); }
        }
      `}</style>
    </section>
  );
}

/* --- Support components --- */
function LotusSVG({ className = "", innerRef }) {
  return (
    <svg ref={innerRef} className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Lotus icon" role="img">
      <g fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
        <path d="M100 130c-30 0-55-8-70-22 8-2 23-1 37 6-8-14-9-29-3-44 9 8 16 19 20 33 2-22 10-40 26-54 16 13 24 31 26 54 4-14 11-25 20-33 6 15 5 30-3 44 14-7 29-8 37-6-15 14-40 22-70 22z" />
      </g>
    </svg>
  );
}

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
        .flower svg {
          animation: drift 28s linear infinite;
          animation-delay: ${delay}s;
          transform-origin: 50% 50%;
          transform-box: fill-box;
        }
        @keyframes drift {
          0%   { transform: rotate(0deg) translateY(0); }
          50%  { transform: rotate(180deg) translateY(-18px); }
          100% { transform: rotate(360deg) translateY(0); }
        }
      `}</style>
    </div>
  );
}
