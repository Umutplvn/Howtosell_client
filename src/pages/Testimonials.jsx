import React, { useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Header from "../components/Header";

function VideoWithSkeleton() {
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);

  return (
    <>
    <Header/>

    
    <Box sx={{width:"100%", padding:"2rem"}}>
{/* VIDEO1 */}
        <Box
      sx={{
        width: "100%",
        maxWidth: "720px",
        marginBottom: "4rem",
      }}
    >
    
      {loaded1&&
      <>
      <Typography sx={{fontWeight:"600", marginBottom:"0.5rem",  fontFamily: "Inter"}}>
        Sales success doesn’t happen by accident.
      </Typography>
      <Typography sx={{marginBottom:"1rem",  fontFamily: "Inter",
                fontWeight: "300"}}>
        It happens when the right strategy meets the right support. Our clients didn’t just work harder. They worked smarter, and the results speak for themselves.
      </Typography>
      </>

      }

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
        }}
      />
    </Box>

    {/* VIDEO2 */}
        <Box
      sx={{
        width: "100%",
        maxWidth: "720px",
        margin: "2rem auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        bgcolor: "#fff",
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
        src="https://www.dl.dropboxusercontent.com/scl/fi/d8cunzqt190lqtvlmface/video1103012576.mov?rlkey=he07g37guw87f5n6wz2h0pisg&st=0evie6ft"
        controls
        onLoadedData={() => setLoaded2(true)}
        style={{
          display: loaded2 ? "block" : "none",
          width: "100%",
        }}
      />
    </Box>

        {/* VIDEO3 */}
        <Box
      sx={{
        width: "100%",
        maxWidth: "720px",
        margin: "2rem auto",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        bgcolor: "#fff",
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
        style={{
          display: loaded3 ? "block" : "none",
          width: "100%",
        }}
      />
    </Box>



    </Box>

    
    </>

  );
}

export default VideoWithSkeleton;
