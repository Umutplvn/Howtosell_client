import { Box } from '@mui/material';
import React, { useState, useRef } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// CLIENT LOGOS
import BluHvnPoolsHomz from '../assets/logos/Blu_Hvn_Pools_Homz.png';
import BluHvn from '../assets/logos/BluHvn.png';
import Coromandel from '../assets/logos/Coromandel.png';
import DavideMessen from '../assets/logos/Davide_Messen.png';
import EquipImpec from '../assets/logos/Equip_impec.png';
import HolyName from '../assets/logos/Holy_Name.png';
import IonExchange from '../assets/logos/Ion_Exchange.png';
import Mitchang from '../assets/logos/Mitchang.png';
import OBDeleven from '../assets/logos/OBDeleven.png';
import PaintLab from '../assets/logos/Paint_lab.png';
import PaulineNguyen from '../assets/logos/Pauline_Nguyen.png';
import ProSine from '../assets/logos/ProSine.png';
import SitaraClinic from '../assets/logos/Sitara_Clinic.png';
import TCS from '../assets/logos/TCS.png';
import Time from '../assets/logos/Time.png';

const logos = [
  BluHvnPoolsHomz,
  BluHvn,
  Coromandel,
  DavideMessen,
  EquipImpec,
  HolyName,
  IonExchange,
  Mitchang,
  OBDeleven,
  PaintLab,
  PaulineNguyen,
  ProSine,
  SitaraClinic,
  TCS,
  Time,
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
        padding: '1rem 2.5rem',
        overflow: 'hidden', 
      }}
    >
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

      {/* Right Arrow */}
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
        {logos.map((logo, index) => (
          <Box
            key={index}
            component="img"
            src={logo}
            alt={`Client Logo ${index + 1}`}
            sx={{
              height: '30px',
              width: 'auto',
              transition: 'all 0.3s ease-in-out',
              "&:hover": {
                cursor: 'pointer',
              },
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ClientLogos;