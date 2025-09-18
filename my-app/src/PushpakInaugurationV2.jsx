import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PushpakInaugurationV2 (JSX, Vite React)
 * ------------------------------------------------------------------
 * Sequence inspired by the G20 site flow but tailored for your ask:
 * 1) Background: animated Indian flag (video) looping subtly
 * 2) Pushpak logo fades in
 * 3) "Inaugurated by <name>" text appears
 * 4) CTA: Inaugurate – on click, play ceremony:
 *    - Ashoka Chakra SVG animates (rotation)
 *    - Tricolor sweep and subtle particles
 *    - Mission title (e.g., "First National Drone Mission") appears
 * 5) Logo zooms out and either redirects to site or reveals an iframe overlay
 *
 * Props
 * - logoSrc: string (required) – path/url to Pushpak logo (PNG/SVG)
 * - flagVideoUrl?: string – mp4/webm loop of Indian flag
 * - ministerName?: string – for "Inaugurated by" line
 * - missionTitle?: string – e.g., "First National Drone Mission"
 * - siteUrl?: string – where to go/show after reveal
 * - revealMode?: 'redirect' | 'iframe' (default 'redirect')
 * - autoRedirectDelay?: number (ms) – only for redirect mode
 * - chakraColor?: string – default '#0A5BA8'
 *
 * Usage (Vite):
 *   <PushpakInaugurationV2
 *      logoSrc="/pushpak-logo.png"
 *      flagVideoUrl="/flag.mp4"
 *      ministerName="Hon. Minister XYZ"
 *      missionTitle="First National Drone Mission"
 *      siteUrl="https://pushpak.example.com"
 *      revealMode="redirect" // or 'iframe'
 *   />
 */

const LETTER_STAGGER = 0.06;

const TricolorSweep = ({ active = false }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {(["#FF9933", "#FFFFFF", "#138808"]).map((color, i) => (
      <motion.div
        key={i}
        className="absolute -left-full h-20 w-[200%] opacity-95"
        style={{ top: `${25 + i * 15}%`, background: color }}
        initial={{ x: 0, opacity: 0 }}
        animate={active ? { x: "100%", opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.12 }}
      />
    ))}
  </div>
);

const Chakra = ({ size = 160, color = "#0A5BA8", spin = false }) => {
  const spokes = 24;
  const spokesEls = new Array(spokes).fill(0).map((_, i) => (
    <line
      key={i}
      x1="50%"
      y1="50%"
      x2="50%"
      y2="10%"
      stroke={color}
      strokeWidth="2"
      transform={`rotate(${(360 / spokes) * i} 80 80)`}
      strokeLinecap="round"
      opacity="0.9"
    />
  ));
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className="drop-shadow-[0_6px_20px_rgba(10,91,168,0.45)]"
      animate={spin ? { rotate: 360 } : {}}
      transition={spin ? { repeat: Infinity, ease: "linear", duration: 8 } : {}}
    >
      <circle cx="80" cy="80" r="70" fill="none" stroke={color} strokeWidth="4" />
      {spokesEls}
      <circle cx="80" cy="80" r="4" fill={color} />
    </motion.svg>
  );
};

const ProjectNameReveal = ({ name, tagline }) => {
  const letters = Array.from(name || "PUSHPAK");
  return (
    <div className="relative z-20 mt-6 flex flex-col items-center">
      <div className="flex flex-wrap items-end justify-center gap-1">
        {letters.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="select-none font-semibold uppercase tracking-[0.18em]"
            style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.2 + i * LETTER_STAGGER, type: "spring", stiffness: 250, damping: 20 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </div>
      {tagline && (
        <motion.div
          className="mt-3 text-center text-base md:text-xl text-white/85"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + letters.length * LETTER_STAGGER }}
        >
          {tagline}
        </motion.div>
      )}
    </div>
  );
};

export default function PushpakInaugurationV2({
  logoSrc,
  flagVideoUrl,
  ministerName = "Hon. Minister",
  missionTitle = "First National Drone Mission",
  siteUrl,
  revealMode = "redirect",
  autoRedirectDelay = 1800,
  chakraColor = "#0A5BA8",
}) {
  const [phase, setPhase] = useState("intro"); // intro -> ready -> ceremony -> reveal -> launched
  const [showIframe, setShowIframe] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 1200);
    return () => clearTimeout(t);
  }, []);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setPhase("ceremony");
    setTimeout(() => setPhase("reveal"), 1800);
  };

  useEffect(() => {
    if (phase === "reveal" && siteUrl) {
      if (revealMode === "redirect") {
        const t = setTimeout(() => {
          try { window.location.href = siteUrl; } catch (_) {}
        }, autoRedirectDelay);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setShowIframe(true), 800);
        return () => clearTimeout(t);
      }
    }
  }, [phase, revealMode, siteUrl, autoRedirectDelay]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0f1a] text-white">
      {flagVideoUrl ? (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          src={flagVideoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70rem_70rem_at_50%_-10%,#0b1220,transparent),linear-gradient(180deg,#0a0f1a_0%,#0a0f1a_40%,#0e1626_100%)]" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      <AnimatePresence>{phase === "ceremony" && <TricolorSweep active />}</AnimatePresence>

      <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
        {logoSrc && (
          <motion.img
            key="logo"
            src={logoSrc}
            alt="Pushpak Logo"
            className="h-auto w-[180px] md:w-[240px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: phase === "reveal" ? 0.8 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        <ProjectNameReveal name="PUSHPAK" tagline={phase !== "ready" ? undefined : "Autonomous Aerial Intelligence"} />

        {phase === "ready" && (
          <motion.div className="mt-3 text-white/85" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Inaugurated by <span className="font-semibold">{ministerName}</span>
          </motion.div>
        )}

        {phase === "ready" && (
          <motion.button
            onClick={start}
            className="mt-6 rounded-2xl border border-white/20 bg-white/10 px-8 py-3 text-white backdrop-blur transition hover:bg-white/15"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Inaugurate
          </motion.button>
        )}

        {phase === "ceremony" && (
          <motion.div className="mt-8 flex flex-col items-center gap-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Chakra size={160} color={chakraColor} spin />
            <motion.div className="text-lg md:text-2xl text-white/95" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              {missionTitle}
            </motion.div>
          </motion.div>
        )}
      </div>

      {showIframe && revealMode === "iframe" && siteUrl && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20">
          <iframe src={siteUrl} title="Pushpak Website" className="h-full w-full border-0" />
        </motion.div>
      )}
    </div>
  );
}