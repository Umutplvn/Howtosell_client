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
    <Typography
      onClick={() => navigate("/about")}
      sx={{
        fontFamily: "Inter",
        fontOpticalSizing: "auto",
        fontWeight: 850,
        fontStyle: "normal",
        fontSize: { xs: "1.2rem", sm: "1.5rem" },
        cursor: "pointer",
        color: "inherit",
      }}
    >
      About
    </Typography>
  </Box>
    </header>
  )
}

export default Header