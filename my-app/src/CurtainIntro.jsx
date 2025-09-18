import React, { useEffect, useState } from "react";

/**
 * CurtainIntro – auto-opens on mount, reveals whatever is underneath.
 * Use it on top of your InaugurationScreen. Hides itself after the animation.
 */
export default function CurtainIntro({
  title = "TADA!",
  curtainImage = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/950358/curtain.svg",
  totalDurationMs = 4300,          // ~2.5s + 1.5s + a smidge
}) {
  const [started, setStarted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start automatically (respect reduced motion by shortening)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startDelay = reduce ? 0 : 50;
    const hideDelay = reduce ? 300 : totalDurationMs;

    const t1 = setTimeout(() => setStarted(true), startDelay);
    const t2 = setTimeout(() => setHidden(true), startDelay + hideDelay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [totalDurationMs]);

  if (hidden) return null;

  return (
    <div className={`ci ${started ? "is-started" : ""}`}>
      <div id="starter" className={started ? "fade-out" : ""}>
        {/* helper text during the very first moments; quickly fades */}
        Opening…
      </div>

      <div id="scene" className={started ? "expand" : ""}>
        <div id="curtain" className={started ? "open" : ""}>
          <div className="left"  style={{ backgroundImage: `url(${curtainImage})` }} />
          <div className="right" style={{ backgroundImage: `url(${curtainImage})` }} />
        </div>
        <h1>{title}</h1>
        <div className="ground" />
      </div>

      <style>{`
/* --- Container overlay --- */
.ci {
  position: fixed;
  inset: 0;
  z-index: 9999; /* on top of your page */
  background: transparent;
  user-select: none;
  pointer-events: none; /* overlay is decorative */
}

/* Starter prompt (quick fade) */
#starter {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 320px;
  height: 50px;
  margin-top: -25px;
  margin-left: -160px;
  text-align: center;
  font: 600 22px/50px system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  color: white;
}
.fade-out { animation: fade-out 1s ease-in forwards; }

/* Stage scene */
#scene {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1200px;
  height: 600px;
  overflow: hidden;
  margin-top: -300px;
  margin-left: -600px;
  background-color: rgb(0,0,0);
  box-shadow: 0 0 0 2px white inset;
}
#curtain { position: absolute; inset: 0; background: transparent; }

/* Curtains */
#curtain .left,
#curtain .right {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  filter: brightness(180%);
  background-size: cover;
  background-repeat: no-repeat;
}
#curtain .left  { left: 0;   transform-origin: top right; }
#curtain .right { left: 50%; transform-origin: top left; }

/* Ground glow disk */
.ground {
  position: absolute;
  left: 50%;
  top: 133%;
  width: 10000px;
  height: 10000px;
  margin-left: -5000px;
  border-radius: 100%;
  box-shadow: 0 0 100px 100px white;
}

/* Center title */
h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 150px;
  margin-top: -90px;
  margin-left: -250px;
  text-align: center;
  font: 800 10em/1 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  color: white;
  transform: scale(0.75);
  opacity: 0;
}

/* Opening: expand & open */
#scene.expand {
  width: 140%;
  left: -20%;
  margin-left: 0;
  background-color: rgb(32,32,32);
  box-shadow: 0 0 0 0 white inset;
  animation-fill-mode: forwards;
  animation-name: expand-scene-horizontaly, expand-scene-verticaly;
  animation-duration: 2.5s, 1.5s;
  animation-timing-function: ease-in-out, ease-in-out;
  animation-delay: 0s, 2.5s;
  animation-iteration-count: 1, 1;
}
#curtain.open .left,
#curtain.open .right { filter: brightness(100%); }
#curtain.open .left {
  animation-fill-mode: forwards;
  animation-name: curtain-opening, left-curtain-opening;
  animation-duration: 2s, 4s;
  animation-timing-function: ease-in-out, ease-in-out;
}
#curtain.open .right {
  animation-fill-mode: forwards;
  animation-name: curtain-opening, right-curtain-opening;
  animation-duration: 2s, 4s;
  animation-timing-function: ease-in-out, ease-in-out;
}
#scene.expand .ground { animation: ground-rising 6s ease-out forwards; }
#scene.expand h1 {
  animation-fill-mode: forwards;
  animation-name: text-zoom, text-fade-in, text-glowing;
  animation-duration: 5s, 1s, 1s;
  animation-timing-function: ease-out, ease-in-out, ease-in-out;
  animation-delay: 3s, 3s, 0s;
  animation-iteration-count: 1, 1, infinite;
  animation-direction: normal, normal, alternate;
}

/* Keyframes */
@keyframes expand-scene-horizontaly {
  from { width: 1200px; left: 50%; margin-left: -600px; background-color: rgb(0,0,0); box-shadow: 0 0 0 2px white inset; }
  to   { width: 140%;   left: -20%; margin-left: 0;     background-color: rgb(32,32,32); box-shadow: 0 0 0 0 white inset; }
}
@keyframes expand-scene-verticaly {
  from { top: 50%; height: 600px; margin-top: -300px; }
  to   { top: 0;   height: 100%; margin-top: 0; }
}
@keyframes curtain-opening { from { filter: brightness(180%); } to { filter: brightness(100%); } }
@keyframes left-curtain-opening  { from { transform: translate(0) rotate(0)   scale(1,1); } to { transform: translate(-100%) rotate(20deg)  scale(0,2); } }
@keyframes right-curtain-opening { from { transform: translate(0) rotate(0)   scale(1,1); } to { transform: translate(100%)  rotate(-20deg) scale(0,2); } }
@keyframes ground-rising { from { top: 133%; } to { top: 105%; } }
@keyframes text-zoom { from { transform: scale(0.75); } to { transform: scale(1); } }
@keyframes text-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes text-glowing { from { text-shadow: 0 0 10px white; } to { text-shadow: 0 0 10px white, 0 0 20px white, 0 0 30px dodgerblue; } }
@keyframes fade-out { from { color: black; opacity: 1; } to { color: white; opacity: 0; } }
      `}</style>
    </div>
  );
}
