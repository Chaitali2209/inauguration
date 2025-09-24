// import PushpakHero from "./PushpakHero";

// import meityLogo from "./assets/meity_logo.png";

// export default function Home() {
//   return (
//     <PushpakHero
//       logoSrc={meityLogo}
//       headingLine1="PUSHPAK - National Mission on Drone Technology"
//       headingLine2="Towards Drone Excellence"
//     />
//   );
// }
// ------>
// App.jsx
// App.jsx

import React, { useState } from "react";
import InaugurationScreen from "./InaugurationScreen";
import CurtainReveal from "./CurtainReveal";
import SiteAudio from "./SiteAudio";

import meityLogo from "./assets/meity_logo.png";
import iitb from "./assets/iitb.png";
import namaste from "./assets/namaste.png";
import jitin from "./assets/jitin_prasada.jpeg";
import theme from "./assets/site.mp3";
import chakra from "./assets/cha.png";
import iitbLogo from "./assets/iitb.png";
import vjtiLogo from "./assets/collaboration/vjti.png";
import iitgLogo from "./assets/collaboration/iitg.png";
import iiserbLogo from "./assets/collaboration/iiserb.png";
import cdacLogo from "./assets/collaboration/cdac.png";
import kareLogo from "./assets/collaboration/kare.png";

const ORGS = [
  { id: "iitb", name: "IIT Bombay", logo: iitbLogo, to: "/partners/iitb", delay: 0.10 },
  { id: "vjti", name: "VJTI, Mumbai", logo: vjtiLogo, to: "/partners/vjti", delay: 0.15 },
  { id: "iitgn", name: "IIT Gandhinagar", logo: iitgLogo, to: "/partners/iitgn", delay: 0.20 },
  { id: "iiserb", name: "IISER Bhopal", logo: iiserbLogo, to: "/partners/iiserb", delay: 0.25 },
  { id: "cdac-tvpm", name: "CDAC - Thiruvananthapuram", logo: cdacLogo, to: "/partners/cdac-trivandrum", delay: 0.30 },
  { id: "cdac-blr", name: "CDAC - Bengaluru", logo: cdacLogo, to: "/partners/cdac-bengaluru", delay: 0.35 },
  { id: "kare", name: "KARE, Tamil Nadu", logo: kareLogo, to: "/partners/kare", delay: 0.40 },
];

export default function App() {
  const [curtainOpened, setCurtainOpened] = useState(false);

  return (
    <>
      {!curtainOpened && (
        <CurtainReveal
          ctaText="Tap to unveil"
          onRevealed={() => setCurtainOpened(true)} // ← flip when curtain is fully open
        />
      )}

      <InaugurationScreen
         nodalCenterId="iitb"                      // ✅ highlight IIT Bombay on top
  nodalLabel="Nodal Center"
  participantsLabel="Participating Organisations"
      
        startSequence={curtainOpened}   // ← animations gated by this
        ministryLogoSrc={meityLogo}
        ministryName="Ministry of Electronics & Information Technology"
        ministryLogoSize="300px"
        ministerPhotoSrc={jitin}
        ministerName="Shri Jitin Prasada"
        ministerTitle="Hon'ble Minister of State"
        ministerDept="Ministry of Electronics and Information Technology (MeitY), Govt. of India"
        iitbLogoSrc={iitb}
        iitbName="Indian Institute of Technology Bombay"
        lotusSrc={namaste}
        orgs={ORGS}
      />

      <SiteAudio src={theme} volume={0.5} />
    </>
  );
}
