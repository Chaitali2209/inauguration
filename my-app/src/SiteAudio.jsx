// src/SiteAudio.jsx
import { useEffect, useRef } from "react";

export default function SiteAudio({ src, volume = 0.4, showToggle = true }) {
  const aref = useRef(null);

  useEffect(() => {
    const a = new Audio(src);
    aref.current = a;
    a.loop = true;
    a.preload = "auto";
    a.volume = volume;
    a.muted = localStorage.getItem("site-audio") !== "on"; // start muted unless user allowed before
    a.setAttribute("playsinline", "true");

    a.play().catch(() => {}); // attempt muted autoplay

    const unlock = () => {
      a.muted = false;
      a.play().catch(() => {});
      localStorage.setItem("site-audio", "on");
      ["pointerdown", "keydown", "touchstart"].forEach(ev =>
        window.removeEventListener(ev, unlock)
      );
    };

    if (a.muted) {
      ["pointerdown", "keydown", "touchstart"].forEach(ev =>
        window.addEventListener(ev, unlock, { once: true })
      );
    }

    return () => {
      a.pause();
      a.src = "";
    };
  }, [src, volume]);

  const toggle = () => {
    const a = aref.current;
    if (!a) return;
    if (a.paused) {
      a.muted = false;
      a.play().catch(() => {});
      localStorage.setItem("site-audio", "on");
    } else {
      a.pause();
      localStorage.setItem("site-audio", "off");
    }
  };

  if (!showToggle) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle site music"
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 9999,
        padding: "8px 12px",
        borderRadius: 9999,
        background: "#0008",
        color: "#fff",
        border: "1px solid #fff3",
        backdropFilter: "blur(6px)"
      }}
    >
      🔊 Music
    </button>
  );
}
