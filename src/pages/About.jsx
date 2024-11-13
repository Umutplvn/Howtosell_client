import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import salesperformance from "../assets/salesperformance.jpg";
import salesteam from "../assets/Sales Teams.jpg";
import realestate from "../assets/realestatesales.jpg";
import mobiless from "../assets/mobileabout.png";
import desktopss from "../assets/desktopabout.png";
import salesnumbers from "../assets/Salesnumbers.jpg";
import softwaresales from "../assets/SoftwareSales.jpg";
import salesVideo from "../assets/SalesCoachingAbout.mp4";
import ppAbout from "../assets/pp.png"
import { useEffect } from "react";

const About = () => {
  const navigate = useNavigate();
const imgBoxStyle={display:"flex", width:"100%", justifyContent:"center", pt: "1rem", pb: "1rem" }
  
useEffect(() => {
  const videoElement = document.getElementById("videoElement");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const createPoster = () => {
    videoElement.currentTime = 5; 
  };
  const captureFrame = () => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    videoElement.setAttribute("poster", dataURL);
  };

  videoElement.addEventListener("loadeddata", createPoster);
  videoElement.addEventListener("seeked", captureFrame);

  return () => {
    videoElement.removeEventListener("loadeddata", createPoster);
    videoElement.removeEventListener("seeked", captureFrame);
  };
}, []);


return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      {/* Header */}
      <Header />

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          color:"white"
        }}
      >
        <Box
          sx={{
            width: "95vw",
            p:"2rem",
            maxWidth: "50rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to top, #010101, #282C30)",
            borderRadius:"1rem",
            mb: { xs: "4rem" },
          }}
        >
          <Box>
            <Box sx={{width:"100%", display:"flex", justifyContent:"center", mb:"2rem"}}>
              <img src={ppAbout} alt="Me" style={{width:"8rem"}}/>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  width: "100%",
                  pb: "1rem",
                }}
              >
                Hi, I'm Babar Askary, and I'd like to share a bit of my story
                with you.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  width: "100%",
                  pb: "1rem",
                }}
              >
                Early Entrepreneurial Spirit
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: "300",
                  width: "100%",
                }}
              >
                My journey in sales started unknowingly at an early age. As a
                kid, I’d go door-to-door and I had little hustles throughout my
                early years– I just wanted money for video games. Naturally, I’m
                quite introverted but those early experiences taught me, if you
                want to make money, it pays to shake hands & knock on doors.
              </Typography>
            </Box>
            <Box sx={imgBoxStyle}>
              <figure style={{ maxWidth: "21rem" }}>
                <img
                  src={salesperformance}
                  alt="Sales performance graph"
                  style={{ maxWidth: "100%", borderRadius:"0.5rem" }}
                />
                <figcaption
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                     textAlign:"center"
                  }}
                > Ready to punch his way to success. Young Babar knew the value of hard work 💪💰
                </figcaption>
              </figure>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              University Ventures
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
              After finishing school, I attended university where I started a
              strength and fitness society. I organized fitness classes and
              offered personal training sessions that became quite popular. It
              was here that I honed my skills in promoting services and
              understanding client needs.
            </Typography>
          </Box>
          <Box sx={imgBoxStyle}>
          <figure style={{ maxWidth: "21rem" }}>
                <img
                  src={salesteam}
                  alt="Sales performance graph"
                  style={{ maxWidth: "100%", borderRadius:"0.5rem" }}
                />
                <figcaption
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                     textAlign:"center"
                  }}
                > My University Fitness Classes
                </figcaption>
              </figure>
          
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              The Leap to Dubai{" "}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
              Eager for a new challenge, I moved to Dubai for my first real
              sales job in real estate. Feeling great in my new suit, I packed a
              suitcase, kissed my mum goodbye, and took a one-way flight to
              Dubai. This was where I truly paid my dues in sales.
            </Typography>
          </Box>

          
          <Box sx={imgBoxStyle}>
          <figure style={{ maxWidth: "21rem" }}>
                <img
                  src={realestate}
                  alt="Sales performance graph"
                  style={{ maxWidth: "100%", borderRadius:"0.5rem" }}
                />
                <figcaption
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                     textAlign:"center"
                  }}
                > Real Estate in Dubai
                </figcaption>
              </figure>
       
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Swimming with Sharks
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
              In Dubai's real estate market, competition was fierce—there were a
              million agents and no base salary, only commission. I arrived with
              enough savings for just two or three months. It was sink or swim.{" "}
              <br /> <br />I chose to swim. <br /> <br />
              Every day, I'd arrive at the office at 8 AM and start cold calling
              until 8 PM. The only reason I'd stop was because calling people
              after 9 PM tended to get on their nerves a bit more than usual.
              This relentless routine taught me resilience and the art of
              perseverance.
            </Typography>
          </Box>
          <Box sx={imgBoxStyle}>
          <figure style={{ maxWidth: "21rem" }}>
                <img
                  src={mobiless}
                  alt="Sales performance graph"
                  style={{ maxWidth: "100%", borderRadius:"0.5rem" }}
                />
                <figcaption
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                     textAlign:"center"
                  }}
                >  Recognition from one of my first mentors in Sales. I saw he sold the most on our office floor, so I strategically moved my seat to be next to him in the office. One of my best moves :)
                </figcaption>
              </figure>
           
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Returning Home and Rising Above{" "}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
              After some time, I moved back to Ireland because I didn't like
              seeing my family only once or twice a year. I also saw many people
              in their 40s and 50s still stuck on the same hamster wheel they
              started on at 20 years old when they first came to Dubai – I
              didn’t want that.
              <br />
              <br /> Back in Ireland, I began selling fitness memberships and
              quickly became the top seller. Coming from the shark tank of
              Dubai, it felt like jumping into the kiddie pool. I ran laps
              around the other sellers by building genuine relationships with
              all my customers.
            </Typography>
          </Box>
          <Box sx={imgBoxStyle}>
          <figure style={{ width: "100%", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center" }}>
                <img
                  src={salesnumbers}
                  alt="Sales performance graph"
                  style={{ width: "21rem", borderRadius:"0.5rem" }}
                />
                <figcaption
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                     textAlign:"center",
                     maxWidth:"21rem"
                  }}
                > Numbers don't lie. I was obsessed with the CRM stats. I'd wake up in the middle of the night and check I was still on top of it. No joke 🙉
                </figcaption>
              </figure>
       
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Joining Forces to Build Something Big{" "}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
              The rest is history. I started working with him—Twana—as hire
              number three in his software company. Initially, it was just me,
              him, and Marco in a modest office. Together, we scaled the company
              from a single client to over 20 enterprise clients and grew the
              team to over 100 employees.
            </Typography>
          </Box>
          <Box sx={imgBoxStyle}>
          <figure style={{ maxWidth: "21rem" }}>
                <img
                  src={softwaresales}
                  alt="Sales performance graph"
                  style={{ maxWidth: "100%", borderRadius:"0.5rem" }}
                />
                <figcaption
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.8rem",
                     textAlign:"center"
                  }}
                >  My days as Head of Sales, Dev Centre House. 
                </figcaption>
              </figure>

            
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Venturing Into New Territories
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
              After serving as Head of Sales for a few years, I felt the urge to
              pursue my own path. I ventured into weight loss coaching and began
              creating content on TikTok. My content resonated with many, and I
              garnered over 350,000 followers, helping numerous clients achieve
              their fitness goals and I enjoyed the sales and marketing side of
              it, but coaching weight loss had lost its appeal to me.
            </Typography>
          </Box>

          <Box sx={{ width: "100%" }}>
    <Box sx={imgBoxStyle}>
      <figure>
        <video
          id="videoElement"
          style={{ maxWidth: "21rem", borderRadius: "0.5rem" }}
          width="100%"
          controls
        >
          <source src={salesVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figcaption
          style={{
            fontFamily: "Inter",
            fontSize: "0.8rem",
            textAlign: "center",
            maxWidth: "21rem",
          }}
        >
          Transition into content creation, one of my most viral videos in the weight loss niche.
        </figcaption>
      </figure>
    </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Rediscovering My True Passion
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
             Despite the success, I realized I wasn't following my true passion and dream <strong>to help people win in sales!</strong> 
 The same gift that helped me become a top seller in real estate and fitness sales,
and help scale a software company from scratch, was what I truly wanted to share with others.
            </Typography>
          </Box>
         
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "1.2rem",
                width: "100%",
                pt: "2rem",
                pb: "1rem",
              }}
            >
              Now, I'm Here to Help You
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "300",
                width: "100%",
              }}
            >
            Nothing makes me happier than helping other business owners and sales leaders who have a
great product or service to offer the world, but need help selling more of it! <br /><br />
I'm dedicated to using my experience and expertise to help you drive significant growth for your
sales team. <br /><br />
I've been in the trenches, built and ran effective sales teams, and learned what it takes to win in
competitive markets! <br /><br />
<strong>If you're ready to take your sales performance to the next level, let's connect. <br /><br />
Apply for a call with me using the button below, and let's see if I can help you.</strong>
            </Typography>
          </Box>




         {/* Apply For Free Consultation Button */}
         <Box sx={{ display: "flex", justifyContent: "center", m: "4rem 0 3rem 0" }}>
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
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default About;
