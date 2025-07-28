import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import pp from "../assets/ppSquare.png";
import Footer from "../components/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";

const Submitted = () => {
  const isMobile = useMediaQuery("(max-width:500px)");

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
          pb: "3rem",
        }}
      >
        <Box
          sx={{
            mt: "1.5rem",
            maxWidth: "50rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "0 2rem",
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
            You're In. Here's What Happens Next.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              width: "100%",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: isMobile ? "1rem" : "0",
                width: isMobile ? "100%" : "25rem",
              }}
            >
              <img
                src={pp}
                style={{
                  maxWidth: "100%",
                  minWidth: "10rem",
                  maxHeight: "10rem",
                  borderRadius: "0.3rem",
                }}
                alt=""
              />
            </Box>

            <Typography sx={{ fontFamily: "Inter", fontWeight: "300" }}>
              Thanks for applying for a strategy session.
              <br />
              <br />
              Over the next 24 hours, I’ll reach out via <strong style={{fontWeight:'600'}}>WhatsApp</strong>  or <strong style={{fontWeight:'600'}}>Instagram</strong>

              {' '} to arrange a quick <strong style={{fontWeight:'600'}}>15–20 minute call.</strong>
              <br />
              <br /> This first call is casual, it’s just to see if we’re a good fit and if I can actually help you. If it makes sense for both of us, we’ll book a second, longer Zoom call where I’ll walk you through how everything works and what the next steps would be.
              <br />
              <br />
              <strong style={{fontWeight:'600'}}>
              Important:
              </strong>
              <br />
             Please make sure you’re in a quiet space for both calls, no driving, no airports, no background noise. If the line is too noisy, we’ll end the call and won’t reschedule.
              <br />
              <br /> I look forward to learning more about your business and showing you what’s possible.
              <br />
              <br />
              -Babar
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Submitted;
