import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import pp from "../assets/ppSquare.png";
import Footer from "../components/Footer";
import useMediaQuery from '@mui/material/useMediaQuery';

const Submitted = () => {
  const isMobile = useMediaQuery('(max-width:500px)');

  return (
<Box sx={{ height: "100vh", position: "relative" }}>
     <Header />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          pb:"3rem"
        }}
      >
        <Box
          sx={{
            mt: "1.5rem",
            maxWidth: "50rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p:"0 2rem",
            
            
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "1.3rem",
              color: "black",
              fontWeight: "600",
              maxWidth: "500px",
              display: "inline-block",
              textAlign: "center",
              mb: "2rem",
            }}
          >
            Awesome! Your Application is Complete & We’ll be in Touch With You
            Soon!
          </Typography>

          <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: isMobile ? '1rem' : '0',
          width:isMobile? "100%":"25rem",
        }}
      >
        <img src={pp} style={{ maxWidth: '100%',minWidth:"10rem", maxHeight: '10rem' }} alt="" />
      </Box>

      <Typography sx={{ fontFamily: 'Inter', fontWeight: '300' }}>
        Thanks for Applying for your breakthrough strategy session.
        <br />
        <br />
        I will get in touch with you to arrange a call or simply call you
        directly via WhatsApp or Phone (depending on what you selected in
        the survey).
        <br />
        <br /> Please make sure that when we arrange to speak, that you
        are in a quiet room and do not take the call from your car,
        airport, or any other noisy place.
        <br />
        <br /> If you take the call in a noisy location, we will cancel
        the call with you and not allow you to reschedule another one.
        <br />
        <br /> I look forward to helping you explode your business and
        achieve massive success!
        <br />
        <br />
        -Babar
      </Typography>
    </Box>
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default Submitted;
