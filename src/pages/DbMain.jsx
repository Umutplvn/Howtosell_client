import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const DbMain = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowMessageBox(true);
    }, 500);
  }, []);

  const GradientTypography = styled(Typography)({
    background: "linear-gradient(45deg, #485b6d, #278789, #e13939)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "1.2rem",
    fontFamily: "Helvetica sans-seri",
    fontWeight: 600,
    marginTop: "0.3rem",
    marginBottom: "-1rem",
  });

  const YourComponent = () => (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <GradientTypography>EMPOWER YOUR SALES JOURNEY</GradientTypography>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
      }}
    >
      <Typography
        sx={{
          fontSize: "1.8rem",
          fontFamily: "Helvetica sans-serif",
          fontWeight: "900",
          color: "#3b3b3b",
          mt: "3rem",
        }}
      >
        <ReactTyped strings={["HOW TO SELL"]} typeSpeed={200} />
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "5rem",
          transform: showMessageBox ? "translateY(0rem)" : "translateY(4rem)",
          transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
          opacity: showMessageBox ? "1" : "0",
          paddingLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mt: "4rem",
        }}
      >
        <YourComponent />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth:"900px",
          mt: "2rem",
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "1.5s",

          opacity: showMessageBox ? "1" : "0",
        }}
      >
        <Typography
          sx={{
            ml: "2rem",
            fontFamily: "Helvetica sans-serif",
            fontSize: "1.05rem",
            fontWeight: "700",
            color: "#535353",
          }}
        >
          DATA BASE MANAGEMENT SYSTEM
        </Typography>
        <Typography
          sx={{
            m: "1rem 2rem",
            fontFamily: "Helvetica sans-seri",
            fontSize: "1rem",
            color: "#000000",
          }}
        >
          Secure and reliable data storage for seamless data management,
          empowering your sales journey worldwide.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "3rem",
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "2s",
          opacity: showMessageBox ? "1" : "0",
          display: "flex",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#000000",
              color: "white",
            },
          }}
          onClick={() => navigate("/dbmain/login")}
        >
          Sign in
        </Button>
        <Button
          sx={{
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#000000",
              color: "white",
            },
          }}
          onClick={() => navigate("/dbmain/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default DbMain;
