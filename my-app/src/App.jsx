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
import InaugurationScreen from "./InaugurationScreen";
import SiteAudio from "./SiteAudio";

import meityLogo from "./assets/meity_logo.png";
import iitb from "./assets/iitb.png";           // still used on left card title
import namaste from "./assets/namaste.png";
import jitin from "./assets/jitin_prasada.jpeg"; // ← add this photo
import theme from "./assets/site.mp3";

export default function App() {
  return (
    <>
     <InaugurationScreen
  ministryLogoSrc={meityLogo}
  ministryName="Ministry of Electronics & Information Technology"
  ministryLogoSize="300px"
  ministerPhotoSrc={jitin} // square image recommended
  ministerName="Shri Jitin Prasada"
  ministerTitle="Hon'ble Minister of State"
  ministerDept="Ministry of Electronics and Information Technology (MeitY), Govt. of India"

  iitbLogoSrc={iitb}
  iitbName="Indian Institute of Technology Bombay"

  lotusSrc={namaste}
  redirectTo="/pushpak"
/>

      <SiteAudio src={theme} volume={0.5} />
    </>
  );
}
