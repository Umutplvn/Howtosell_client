import React from 'react'
import { Box, Typography } from '@mui/material'
import logo from "../assets/logoFigma.svg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

  return (
    <header>

    <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      pr: { xs: "1rem", sm: "1.5rem" },
      pl: "0.5rem",
      maxWidth: "1200px",
      m:"auto"

    }}
  >
    <Box  onClick={() => navigate("/")} sx={{ width: { xs: "12rem", sm: "15rem" }, ml: "-1rem", cursor:"pointer" }}>
      <img src={logo} alt="How To Sell" style={{ width: "100%" }} />
    </Box>


    <Box sx={{display:'flex', gap:{ xs: "0.5rem", sm: "1rem" }}}>
      <Typography
      onClick={() => navigate("/about")}
      sx={{
        fontFamily: "Inter",
        fontOpticalSizing: "auto",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: { xs: "1rem", sm: "1.4rem" },
        cursor: "pointer",
        color: "inherit",
      }}
    >
      About
    </Typography>

    <Typography
      onClick={() => navigate("/testimonials")}
      sx={{
        fontFamily: "Inter",
        fontOpticalSizing: "auto",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: { xs: "1rem", sm: "1.4rem" },
        cursor: "pointer",
        color: "inherit",
      }}
    >
      Testimonials
    </Typography>

    </Box>
  </Box>
    </header>
  )
}

export default Header