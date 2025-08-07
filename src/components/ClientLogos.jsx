import { Box, Link } from '@mui/material';
import React, { useState, useRef } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// CLIENT LOGOS
import BluHvn from '../assets/logos/bluhvned.png';
import Coromandel from '../assets/logos/Coromandel.png';
import DavideMessen from '../assets/logos/Davide_Messen.png';
import EquipImpec from '../assets/logos/Equip_impec.png';
import HolyName from '../assets/logos/Holy_Name.png';
import IonExchange from '../assets/logos/Ion_Exchange.png';
import Mitchang from '../assets/logos/mitchang.png';
import OBDeleven from '../assets/logos/OBDeleven.png';
import PaintLab from '../assets/logos/Paint_lab.png';
import PaulineNguyen from '../assets/logos/Pauline_Nguyen.png';
import ProSine from '../assets/logos/proshine.png';
import SitaraClinic from '../assets/logos/Sitara_Clinic.png';
import TCS from '../assets/logos/TCS.png';
import Time from '../assets/logos/Time.png';

const clientData = [
  { src: BluHvn, link: 'https://bluehaven.com.au/' },
  { src: Coromandel, link: 'https://www.coromandel.biz/' },
  { src: DavideMessen, link: 'https://davidmeessen.com/' },
  { src: EquipImpec, link: 'https://www.equip-impec.com/' },
  { src: HolyName, link: 'https://www.holyname.org/' },
  { src: IonExchange, link: 'https://ionexchangeglobal.com/' },
  { src: Mitchang, link: 'https://www.mitchang2022.com/main' },
  { src: OBDeleven, link: 'https://obdeleven.com/' },
  { src: PaintLab, link: 'https://www.paintlab.ie/?srsltid=AfmBOooHKPg2baE6rA2dQfKt5l18mhj_R9IrzbNfOttiAulHVlMVTSeZ' },
  { src: PaulineNguyen, link: 'https://pauline-nguyen.com/' },
  { src: ProSine, link: 'https://www.proshines.ca/' },
  { src: SitaraClinic, link: 'https://sitaramedicalclinic.com/' },
  { src: TCS, link: 'https://www.tcs.com/home-page' },
  { src: Time, link: 'https://www.timeclinic.ie/' },
];

const ClientLogos = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const scrollAmount = 200;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollBy = direction === 'left' ? -scrollAmount : scrollAmount;
      current.scrollBy({
        left: scrollBy,
        behavior: 'smooth',
      });
    }
  };

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
      {/* Sol Ok */}
      <Box
        onClick={() => handleScroll('left')}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '50px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in-out, visibility 0.3s',
          zIndex: 1,
        }}
      >
        <ArrowBackIosNewIcon />
      </Box>

      {/* Sağ Ok */}
      <Box
        onClick={() => handleScroll('right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '50px',
          cursor: 'pointer',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in-out, visibility 0.3s',
          zIndex: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '2.5rem',
          overflowX: 'scroll',
          padding: '1rem',
          whiteSpace: 'nowrap',
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {clientData.map((client, index) => (
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
           cursor:"pointer"
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