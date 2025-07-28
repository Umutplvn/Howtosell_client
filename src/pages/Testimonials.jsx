import React, { useState } from "react";
import { Box, Skeleton, Typography, Button } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function VideoWithSkeleton() {
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);
  const navigate = useNavigate();

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
          marginTop:'1rem'
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
          <Box>
            <Typography
              sx={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              Sales success doesn’t happen by accident.
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontFamily: "Inter",
                fontWeight: "300",
              }}
            >
              It happens when the right strategy meets the right support. Our
              clients didn’t just work harder. They worked smarter, and the
              results speak for themselves.
            </Typography>
          </Box>

          {!loaded1 && (
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
            onLoadedData={() => setLoaded1(true)}
            style={{
              display: loaded1 ? "block" : "none",
              width: "100%",
              borderRadius: "0.4rem",
            }}
          />
        </Box>

        {/* VIDEO2 */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "720px",
            marginBottom: "3rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              No pushy tactics. Just proven systems.
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontFamily: "Inter",
                fontWeight: "300",
              }}
            >
              These stories aren’t about pressure or gimmicks. They’re about
              clarity, confidence, and a repeatable process that works for any
              sales team.
            </Typography>
          </Box>

          {!loaded2 && (
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
            onLoadedData={() => setLoaded2(true)}
            style={{
              display: loaded2 ? "block" : "none",
              width: "100%",
              borderRadius: "0.4rem",
            }}
          />
        </Box>

        {/* VIDEO3 */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "720px",
            marginBottom: "3rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              Big results begin with one small step.{" "}
            </Typography>
            <Typography
              sx={{
                marginBottom: "1rem",
                fontFamily: "Inter",
                fontWeight: "300",
              }}
            >
              If you're ready to transform how you sell, without the stress,
              let's talk. Like these clients, your growth story starts with a
              single step.
            </Typography>
          </Box>
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
            style={{
              display: loaded3 ? "block" : "none",
              width: "100%",
              borderRadius: "0.4rem",
            }}
          />
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
      <Box style={{width:'100%', margin:'auto',       maxWidth: "1200px",
      border:'1px solid #e2e2e2',
       
}} />
      <Footer/>
    </>
  );
}

export default VideoWithSkeleton;
