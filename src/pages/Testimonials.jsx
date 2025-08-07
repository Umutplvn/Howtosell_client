import React, { useState, useRef } from "react";
import { Box, Skeleton, Typography, Button, Link } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function VideoWithSkeleton() {
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);
  const navigate = useNavigate();

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  const handlePlay = (playingVideoRef) => {
    if (playingVideoRef.current !== videoRef1.current) {
      videoRef1.current.pause();
    }
    if (playingVideoRef.current !== videoRef2.current) {
      videoRef2.current.pause();
    }
    if (playingVideoRef.current !== videoRef3.current) {
      videoRef3.current.pause();
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100vw",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        {/* VIDEO1 */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "720px",
            marginBottom: "3rem",
          }}
        >
          {!loaded1 && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height={"350px"}
            />
          )}
          <video
            src="https://www.dl.dropboxusercontent.com/scl/fi/d8cunzqt190lqtvlmface/video1103012576.mov?rlkey=he07g37guw87f5n6wz2h0pisg&st=0evie6ft"
            controls
            onLoadedData={() => setLoaded1(true)}
            onPlay={() => handlePlay(videoRef1)}
            ref={videoRef1} // Referansı atama
            style={{
              display: loaded1 ? "block" : "none",
              width: "100%",
              borderRadius: "0.4rem",
            }}
          />
          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: { xs: "0.8rem", md: "1rem" },
                color: "#333",
                position: "relative",
                paddingLeft: { xs: "1.5rem", md: "2rem" },
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  color: "#ccc",
                }}
              />
              “Honestly, Babar, I like that you have a little bit of an edge to
              you like you’re not afraid to crack the whip. These people are
              unknown to you. You live on the other side of the big ocean. And I
              love that you have imposed yourself into their day-to-day in a way
              that I would have my sales manager impose himself on these people,
              right? We need to get them to do the practices once they fall in
              line with that, we’ve seen you know that the results follow.”
            </Typography>

            <Box
              sx={{
                textAlign: "right",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  color: "#555",
                }}
              >
                – Jay Wheeler, CEO
              </Typography>
              <Link
                href="https://equip-impec.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "0.75rem", md: "0.9rem" },
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Equip-Impec
              </Link>
            </Box>
          </Box>
        </Box>

        {/* VIDEO2 */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "720px",
            marginBottom: "3rem",
            marginTop: "1rem",
          }}
        >
          {!loaded2 && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height={"350px"}
            />
          )}
          <video
            src="https://www.dl.dropboxusercontent.com/scl/fi/mu9jbo058rvinnyxfcwp3/Darius-Testimonial.mov?rlkey=7jvpa71b516gcedepcobm34hg&st=jpjvl2cs"
            controls
            onLoadedData={() => setLoaded2(true)}
            onPlay={() => handlePlay(videoRef2)}
            ref={videoRef2} // Referansı atama
            style={{
              display: loaded2 ? "block" : "none",
              width: "100%",
              borderRadius: "0.4rem",
            }}
          />

          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: { xs: "0.8rem", md: "1rem" },
                color: "#333",
                position: "relative",
                paddingLeft: { xs: "1.5rem", md: "2rem" },
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  color: "#ccc",
                }}
              />
             “They gained motivation. They gained some clarity. And if I keep that pace with them, they’ll bring some nice numbers by the end of the year. Just because of the increased number of cold outreach, and the increased number of tasks they are doing in a way that they want to do it.”
            </Typography>

            <Box
              sx={{
                textAlign: "right",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  color: "#555",
                }}
              >
                – Darius Matulionis, Head of B2B Sales
              </Typography>
              <Link
                href="https://obdeleven.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "0.75rem", md: "0.9rem" },
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                OBDeleven
              </Link>
            </Box>
          </Box>
        </Box>

        {/* VIDEO3 */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "720px",
            marginBottom: "3rem",
            marginTop: "1rem",
          }}
        >
          {!loaded3 && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height={"350px"}
            />
          )}
          <video
            src="https://www.dl.dropboxusercontent.com/scl/fi/47431xmakqezozfdtvmwm/video6109995811.mov?rlkey=mikjhu6kjp427o62eydsmd99h&st=rl7ax9ch"
            controls
            onLoadedData={() => setLoaded3(true)}
            onPlay={() => handlePlay(videoRef3)}
            ref={videoRef3} // Referansı atama
            style={{
              display: loaded3 ? "block" : "none",
              width: "100%",
              borderRadius: "0.4rem",
            }}
          />
          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: { xs: "0.8rem", md: "1rem" },
                color: "#333",
                position: "relative",
                paddingLeft: { xs: "1.5rem", md: "2rem" },
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  color: "#ccc",
                }}
              />
      “What I learned from you the most is… just execute, listen to the customer, listen to what they need, and use different strategies to ask the right questions and be precise like BOOM. Like that’s how you do it. Don’t overthink, don’t wait, just act!”
            </Typography>

            <Box
              sx={{
                textAlign: "right",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  color: "#555",
                }}
              >
                – Olivier Gagnon, Salesperson
              </Typography>
              <Link
                href="https://www.equip-impec.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: "400",
                  fontSize: { xs: "0.75rem", md: "0.9rem" },
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Equip-Impec
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Apply For Free Consultation Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: "2rem 0 0rem 0",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0171E2",
              borderRadius: "2rem",
              height: "2.5rem",
              fontWeight: "400",
              fontFamily: "Inter",
              fontOpticalSizing: "auto",
              cursor: "pointer",
              fontSize: "1.02rem",
              textTransform: "capitalize",
              boxShadow: "0 0 0 0 ",
              "&:hover": {
                backgroundColor: "#0b76e1",
                boxShadow: "0 0 0 0 ",
              },
            }}
            onClick={() => navigate("/apply")}
          >
            Apply for Free Consultation
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          width: "100%",
          margin: "auto",
          maxWidth: "1200px",
          border: "1px solid #e2e2e2",
        }}
      />
      <Footer />
    </>
  );
}

export default VideoWithSkeleton;
