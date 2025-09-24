// InaugurationScreen.jsx
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ import PNG from src/assets
import chakraPng from "./assets/cha.png";

/**
 * InaugurationScreen — AOS sequence
 * 1) Page zoom-out
 * 2) Right (Participating Institutes) fade-left (staggered)
 * 3) Left (Ministry + Inaugurated by) fade-right
 * 4) Center lotus zoom-in
 */
export default function InaugurationScreen({
  titleLine1 = "Launching of Web Portal for Pushpak",
  titleLine2 = "Towards Drone Excellence",

  // LEFT (Ministry + Inaugurated by)
  ministryName = "Ministry of Electronics and Information Technology,  Ministry of Commerce and Industry, Govt. of India",
  ministryLogoSrc = "/assets/meity_logo.png",
  ministryLogoSize, // e.g. "300px"
  ministerPhotoSrc = "/assets/jitin_prasada.jpg",
  ministerName = "Shri Jitin Prasada",
  ministerTitle = "Hon'ble Minister of State",
  ministerDept = "Ministry of Electronics and Information Technology,  Ministry of Commerce and Industry, Govt. of India",

  // RIGHT — Orgs
  orgs = [], // [{id,name,logo,to?,delay?}]
  nodalCenterId = null,                          // ✅ id of nodal center (e.g., "iitb")
  nodalLabel = "Nodal Center",                   // ✅ heading above nodal center
  participantsLabel = "Participating Organisations", // ✅ heading above the rest

  // Center lotus
  lotusSrc, // optional; defaults to inline SVG

  // callback to finish (parent will set flag + navigate("/"))
  onDone,

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
    setTimeout(() => onDone?.(), 1200);
  };

  // Respect prefers-reduced-motion for the idle lotus pulse
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (q.matches && lotusRef.current) lotusRef.current.style.animation = "none";
  }, []);

  // --- Split orgs into nodal + others (for right panel) ---
  const nodal = nodalCenterId ? orgs.find((o) => o.id === nodalCenterId) : null;
  const others = nodal ? orgs.filter((o) => o.id !== nodalCenterId) : orgs;

  return (
    <section className={`wrap ${fadeOut ? "fade" : ""}`} role="main" aria-label="Inauguration">
      {/* ✅ Fixed Ashoka Chakra on upper-left (decorative) */}
      <Cha src={chakraPng} />

      <div className="aosPage" data-aos="zoom-out" data-aos-duration="700" data-aos-delay="400">
        {/* Decorative flowers */}
        {/* <Flower style={{ top: "8%", left: "6%", transform: "scale(1.1)" }} /> */}
        <Flower style={{ top: "14%", right: "8%", transform: "scale(0.9)" }} delay={1.2} />
        <Flower style={{ bottom: "10%", left: "14%", transform: "scale(0.9)" }} delay={0.6} />
        <Flower style={{ bottom: "12%", right: "6%", transform: "scale(1.05)" }} delay={1.8} />

        {/* Heading */}
        <header className="top">
          <h1 className="h1">{titleLine1}</h1>
          <h1 className="h2">{titleLine2}</h1>
        </header>

        {/* Columns */}
        <div className="grid">
          {/* LEFT — Ministry + Web Portal Launch by (reordered) */}
          {/* LEFT — Ministry + Web Portal Launch by (reordered) */}
<aside
  className="panel leftPanel"
  aria-label={`${ministryName} details`}
  data-aos="fade-right"
  data-aos-delay="1400"
  data-aos-duration="800"
>
  <div className="panelStack leftStack">
    {/* Logo (top) */}
    <img
      className="panelLogo big"
      src={ministryLogoSrc}
      alt={`${ministryName} logo`}
      style={ministryLogoSize ? { width: ministryLogoSize, height: ministryLogoSize } : undefined}
    />

    {/* Big heading */}
    <div className="leftHeading">Web Portal Launch By</div>

    {/* Photo */}
    <img className="avatar large" src={ministerPhotoSrc} alt={ministerName} />

    {/* Details (bigger fonts) */}
    <div className="byText leftDetails">
      <div className="byName big">{ministerName}</div>
      <div className="byTitle big">{ministerTitle}</div>
      <div className="byDept big">{ministerDept}</div>
      
      <div className="byDept big"> Govt. of India</div>
    </div>

    {/* ✅ Spacer to create more bottom margin inside the panel */}
    <div className="leftSpacer" aria-hidden />
  </div>
</aside>

          {/* CENTER — Lotus + Button */}
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
              aria-label="Portal Launch"
              disabled={launching}
              data-aos="zoom-in-up"
              data-aos-delay="2200"
              data-aos-duration="600"
            >
              {launching ? "Inaugurating…" : "Portal Launch"}
            </button>
          </div>

          {/* RIGHT — Nodal Center (top-center) + Participating Organisations grid */}
          <aside
            className="panel orgsPanel"
            aria-label="Institutions list"
            data-aos="fade-left"
            data-aos-delay="800"
            data-aos-duration="800"
          >
            <div className="orgsStack">
              {/* --- Nodal Center block --- */}
              {nodal && (
                <div
                  className="nodalBlock"
                  data-aos="zoom-in"
                  data-aos-delay="980"
                  data-aos-duration="600"
                >
                  <div className="nodalLabel">{nodalLabel}</div>
                  <a className="nodalLink" href={nodal.to || "#"} aria-label={nodal.name}>
                    <div className="nodalCircle">
                      <img className="nodalLogo" src={nodal.logo} alt={`${nodal.name} logo`} />
                    </div>
                    <div className="nodalName">{nodal.name}</div>
                  </a>
                </div>
              )}

              {/* --- Participants heading --- */}
              <h2
                className="panelName participantsHeading"
                data-aos="fade-up"
                data-aos-delay={nodal ? "1120" : "940"}
                data-aos-duration="500"
              >
                {participantsLabel}
              </h2>

              {/* --- Participants grid --- */}
              <div className="orgsList" role="list">
                {others.map((o, idx) => {
                  const baseDelay = 1000;
                  const perItemDelayMs =
                    typeof o.delay === "number" ? Math.round(o.delay * 1000) : idx * 120;
                  const totalDelay = baseDelay + perItemDelayMs;

                  const ItemInner = (
                    <>
                      <div className="orgCircle">
                        <img className="orgLogo" src={o.logo} alt={`${o.name} logo`} />
                      </div>
                      <div className="orgName">{o.name}</div>
                    </>
                  );

                  return (
                    <div
                      key={o.id || idx}
                      className="orgItem"
                      role="listitem"
                      tabIndex={0}
                      data-aos="fade-left"
                      data-aos-delay={totalDelay}
                      data-aos-duration="600"
                    >
                      {o.to ? (
                        <a className="orgLink" href={o.to} aria-label={o.name}>
                          {ItemInner}
                        </a>
                      ) : (
                        <div className="orgLink" aria-label={o.name}>
                          {ItemInner}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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

        /* ---------- LEFT PANEL custom (logo high, big heading, bigger details) ---------- */
/* Push content to the top and add more bottom space */
.leftPanel {
  align-content: start;                     /* content at the top */
  padding-top: clamp(8px, 2vmin, 18px);     /* a bit tighter at top */
  padding-bottom: clamp(40px, 12vmin, 140px); /* extra room at bottom inside the card */
}

/* Make sure the inner grid doesn't center vertically */
.leftStack {
  align-content: start;   /* keep items at the top of the stack */
  gap: clamp(8px, 1.6vmin, 14px);
}

/* Responsive spacer height — increases bottom margin visually */
.leftSpacer {
  height: clamp(48px, 12vmin, 160px);
}

        .leftMinistryName {
          font-size: clamp(12px, 1.35vw, 14px);
          opacity: 0.95;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .leftHeading {
          margin-top: clamp(3px, 0vmin, 1px);
          font-size: clamp(18px, 2.4vw, 28px);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.98;
          text-shadow: 0 2px 10px rgba(0,0,0,0.25);
        }

        .avatar {
          width: clamp(110px, 14vmin, 180px);
          height: clamp(110px, 14vmin, 180px);
          object-fit: cover;
          border-radius: 999px;
          border: 3px solid rgba(255,255,255,0.7);
          box-shadow: 0 10px 32px rgba(0,0,0,0.35);
        }
        .avatar.large {
          width: clamp(130px, 18vmin, 220px);
          height: clamp(130px, 18vmin, 220px);
          border: 3px solid rgba(255,255,255,0.75);
          box-shadow: 0 12px 34px rgba(0,0,0,0.35);
        }

        .byText { display: grid; gap: 2px; }
        .byName  { font-weight: 800; }
        .byTitle { opacity: .95;  }
        .byDept  { opacity: .95; }

        .leftDetails .big.byName, .byName.big {
          font-size: clamp(20px, 2.8vw, 32px);
          font-weight: 900;
        }
        .leftDetails .big.byTitle, .byTitle.big {
          font-size: clamp(15px, 2.0vw, 22px);
          opacity: 0.98;
          font-weight: 700;
        }
        .leftDetails .big.byDept, .byDept.big {
          font-size: clamp(13.5px, 1.8vw, 20px);
          opacity: 0.96;
          font-weight: 600;
          line-height: 1.25;
        }

        /* ---------- CENTER ---------- */
        .center {
          display: grid;
          place-items: center;
          gap: 18px;
          overflow: hidden;                /* ⛔ kill the tiny internal scrollbar */
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .center::-webkit-scrollbar { display: none; }

        .lotusWrap {
          width: min(36vmin, 260px);
          height: min(36vmin, 260px);
          display: grid;
          place-items: center;
          position: relative;
          overflow: visible;               /* ✅ allow zoom to paint outside */
          contain: paint;                  /* ✅ without creating scroll */
        }
        .lotus {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 22px rgba(0,0,0,0.35));
          animation: idlePulse 3.2s ease-in-out infinite;
          overflow: visible;               /* ✅ */
          contain: paint;                  /* ✅ */
        }        @keyframes idlePulse { 0%,100% { transform: scale(1);} 50%  { transform: scale(1.04);} }

        .lotusWrap.zoom .lotus { animation: zoomOut 1200ms cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes zoomOut { 0% { transform: scale(1); opacity: 1; } 60% { transform: scale(3.2); opacity: 1; } 100% { transform: scale(7.8); opacity: 0.85; } }

        .cta {
          border: none; border-radius: 999px; padding: 14px 28px; font-weight: 800; font-size: 18px; cursor: pointer;
          color: #1a1a1a; background: #fff; box-shadow: 0 10px 24px rgba(0,0,0,0.25);
          transition: transform 160ms ease, box-shadow 160ms ease, opacity 200ms ease;
        }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 16px 30px rgba(0,0,0,0.28); }
        .cta.disabled { opacity: 0.7; cursor: default; }

        /* ---------- RIGHT PANEL: Nodal + Participants ---------- */
        .orgsPanel { min-height: clamp(540px, 68vh, 780px); } /* a bit taller */

        .orgsStack {
          display: grid;
          gap: 16px;
          text-align: center;
          justify-items: center;
        }

        /* --- Nodal Center --- */
        .nodalBlock {
          display: grid;
          gap: 10px;
          justify-items: center;
          margin-top: 4px;
          margin-bottom: 8px;
        }
        .nodalLabel {
          font-size: 13px;
          letter-spacing: .12em;
          text-transform: uppercase;
          opacity: .8;
          font-weight: 700;
        }
        .nodalLink {
          display: grid;
          gap: 10px;
          place-items: center;
          text-decoration: none;
          color: inherit;
        }
        .nodalCircle {
          width: 104px;
          height: 104px;
          border-radius: 999px;
          background: #fff;
          display: grid;
          place-items: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.22);
        }
        .nodalLogo {
          width: 78px;
          height: 78px;
          object-fit: contain;
        }
        .nodalName {
          font-size: clamp(14px, 1.8vw, 18px);
          font-weight: 900;
          line-height: 1.22;
          max-width: 26ch;
        }

        .participantsHeading {
          margin-top: 6px;
          font-size: clamp(15px, 1.6vw, 17px);
        }

        /* --- Participants Grid --- */
        .orgsList {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          overflow: visible;
          padding-right: 0;
        }
        @media (max-width: 1200px) {
          .orgsList { grid-template-columns: 1fr; }
        }

        .orgItem {
          background: rgba(255,255,255,0.10);
          border-radius: 20px;
          box-shadow: 0 10px 22px rgba(0,0,0,0.22);
          transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
          overflow: hidden;
        }
        .orgItem:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(0,0,0,0.28);
          background: rgba(255,255,255,0.14);
        }

        .orgLink {
          display: grid;
          grid-template-rows: auto auto;
          align-items: center;
          justify-items: center;
          gap: 10px;
          padding: 16px 14px;
          color: inherit;
          text-decoration: none;
          overflow: visible;
        }

        /* white circular badge */
        .orgCircle {
          width: 82px;
          height: 82px;
          border-radius: 999px;
          background: #fff;
          display: grid;
          place-items: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }
        .orgLogo {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }

        /* name below icon; clamp to 2 lines */
        .orgName {
          font-size: clamp(13px, 1.55vw, 15.5px);
          font-weight: 800;
          line-height: 1.25;
          text-align: center;
          max-width: 22ch;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* hide any nested scrollbars just in case */
        .orgItem * { scrollbar-width: none; }
        .orgItem *::-webkit-scrollbar { display: none; }

        /* Mobile */
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; gap: 20px; padding-top: 120px; padding-bottom: 40px; }
          .panel { max-width: 640px; min-height: clamp(260px, 44vh, 520px); }
          .orgsPanel { min-height: clamp(560px, 72vh, 860px); }
          .orgName { max-width: 26ch; }
        }
      `}</style>
    </section>
  );
}

/* --- "Cha" (Ashoka Chakra) component --- */
function Cha({
  src,
  size = "min(30vmin, 500px)",
  opacity = 0.5,
  spin = true,
  top = "18px",
  left = "18px",
}) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`cha ${spin ? "spin" : ""}`}
        style={{ top, left, width: size, opacity }}
      />
      <style>{`
        .cha {
          position: fixed;
          height: auto;
          z-index: 1;
          pointer-events: none;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));
          transform-origin: 50% 50%;
        }
        .cha.spin { animation: chaSpin 60s linear infinite; }
        @keyframes chaSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) { .cha.spin { animation: none; } }
        @media (max-width: 900px) {
          .cha { width: min(28vmin, 120px) !important; top: 12px !important; left: 12px !important; }
        }
      `}</style>
    </>
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
