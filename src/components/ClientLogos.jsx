import { Box, Link } from '@mui/material';
import React, { useState, useRef } from 'react';


// CLIENT LOGOS
import BluHvn from '../assets/logos/bluhvned.png';
import DavideMessen from '../assets/logos/Davide_Messen.png';
import EquipImpec from '../assets/logos/Equip_impec.png';
import Mitchang from '../assets/logos/mitchang.png';
import OBDeleven from '../assets/logos/OBDeleven.png';
import PaintLab from '../assets/logos/Paint_lab.png';
import PaulineNguyen from '../assets/logos/Pauline_Nguyen.png';
import ProSine from '../assets/logos/proshine.png';
import SitaraClinic from '../assets/logos/Sitara_Clinic.png';
import Time from '../assets/logos/Time.png';

const clientData = [
  { src: BluHvn, link: 'https://bluehaven.com.au/' },
  { src: DavideMessen, link: 'https://davidmeessen.com/' },
  { src: EquipImpec, link: 'https://www.equip-impec.com/' },
  { src: Mitchang, link: 'https://www.mitchang2022.com/main' },
  { src: OBDeleven, link: 'https://obdeleven.com/' },
  { src: PaintLab, link: 'https://www.paintlab.ie/?srsltid=AfmBOooHKPg2baE6rA2dQfKt5l18mhj_R9IrzbNfOttiAulHVlMVTSeZ' },
  { src: PaulineNguyen, link: 'https://pauline-nguyen.com/' },
  { src: ProSine, link: 'https://www.proshines.ca/' },
  { src: SitaraClinic, link: 'https://sitaramedicalclinic.com/' },
  { src: Time, link: 'https://www.timeclinic.ie/' },
];

const ClientLogos = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const logosToDisplay = [...clientData, ...clientData]; 

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        marginTop: '3rem',
        overflow: 'hidden',
      }}
    >

      <Box
        ref={scrollRef}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          whiteSpace: 'nowrap',
          "&::-webkit-scrollbar": {
            display: "none",
          },
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' }, 
          },
          animation: 'scroll 30s linear infinite', 
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {logosToDisplay.map((client, index) => (
          <Link
            key={index}
            href={client.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'all 0.3s ease-in-out',
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Box
              component="img"
              src={client.src}
              alt={`Client Logo ${index + 1}`}
              sx={{
                height: '30px',
                width: 'auto',
              }}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default ClientLogos;