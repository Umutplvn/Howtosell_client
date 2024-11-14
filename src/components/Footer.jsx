import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (

    <Box
      sx={{
        
        position:"static",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb:{xs:"3rem", sm:"1rem"},
        pt:"3rem",
        
      }}
    >
        <Typography sx={{ fontSize: "0.9rem", fontFamily: "Inter", maxWidth: "380px", textAlign: "center", color:"#717171" }}>
        We help Business Owners & Sales Professionals to Double their Sales Without Pushy Tactics
      </Typography>
     
      <Box sx={{mt:"0.5rem", mb:"0.5rem", display: "flex", flexDirection: "row", gap:'1rem' }}>
        <Box
        onMouseEnter={() => handleMouseEnter('youtube')}
        onMouseLeave={handleMouseLeave}

        sx={{
          width:"2.5rem",
          height:"2.5rem",
          p:"0.5rem",
          boxShadow:"rgba(0, 0, 0, 0.26) 0px 1px 1px",
          borderRadius:"50%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",

        }}>
        <a
          href="https://www.youtube.com/@babaraskary"
          target="_blank"
          rel="noopener noreferrer"        >
          <CiYoutube
            style={{
              fontSize: "1.5rem",
              color:hoveredIcon === 'youtube' ? "black" :"#404040",
              transition: "font-size 0.3s",
            }}
          />
        </a>
        </Box>
     
        <Box
         onMouseEnter={() => handleMouseEnter('instagram')}
         onMouseLeave={handleMouseLeave}
        sx={{
          width:"2.5rem",
          height:"2.5rem",
          p:"0.5rem",
          boxShadow:"rgba(0, 0, 0, 0.26) 0px 1px 1px",
          borderRadius:"50%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"

        }}>
        <a
          href="https://www.instagram.com/babaraskary/"
          target="_blank"
          rel="noopener noreferrer"
         
        >
          <FaInstagram
            style={{
              fontSize:"1.5rem",
              color:hoveredIcon === 'instagram' ? "black" :"#404040",
              transition: "font-size 0.3s",
            }}
          />
        </a>

     </Box>

     <Box
      onMouseEnter={() => handleMouseEnter('facebook')}
      onMouseLeave={handleMouseLeave}
     sx={{
          width:"2.5rem",
          height:"2.5rem",
          p:"0.5rem",
          boxShadow:"rgba(0, 0, 0, 0.26) 0px 1px 1px",
          borderRadius:"50%",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"

        }}>
        <a
          href="https://www.facebook.com/people/Babar-Askary/61559133112272/"
          target="_blank"
          rel="noopener noreferrer"
         
        >
          <FaFacebookF
            style={{
              fontSize: "1.5rem",
              color:hoveredIcon === 'facebook' ? "black" :"#404040",
              transition: "font-size 0.3s",
            }}
          />
        </a>
     </Box>
    
      </Box>
    
    </Box>
  );
};

export default Footer;
