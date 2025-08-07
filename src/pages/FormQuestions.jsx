import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../style/test1.css";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { AiOutlineEnter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const FormQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [required, setRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldProceed, setShouldProceed] = useState(false);
  const [otherText, setOtherText] = useState("");
  const progress = (currentQuestion / 13) * 100;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);
  const [answers, setAnswers] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("answers"));
    return storedUser || {};
  });
  const navigate = useNavigate();

  const [user, setUser] = useState({
      name:"",
      lastName: "",
      email: "",
      phone: "",
      insta: "",
      companyName: "",
      companyWebsite:"",
      role: "",
      teamSize: "",
      goal: "",
      challenge: "",
      urgency:  "",
      investment: "",
      when: "",
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth < 400);
  };
  useEffect(() => {
    if (shouldProceed) {
      handleNext();
      setShouldProceed(false);
    }
  }, [shouldProceed]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setUser({
      name: answers[0] || "",
      lastName: answers[1] || "",
      email: answers[2] || "",
      phone: answers[3] || "",
      insta: answers[4] || "",
      companyName: answers[5] || "",
      companyWebsite: answers[6] || "",
      role: answers[7] || "",
      teamSize: answers[8] || "",
      goal: answers[9] || "",
      challenge: answers[10] || "",
      urgency: answers[11] || "",
      investment: answers[12] || "",
      when: answers[13] || "",
    });
  }, [answers]);

  const handleRadioChange = (event) => {
    setRequired(false);
    setSelectedValue(event.target.value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: event.target.value,
    }));
    if (event.target.value !== "Other") {
      setShouldProceed(true);
    }
  };

  const handleOtherTextChange = (event) => {
    const value = event.target.value;
    setOtherText(value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value ? value : "Other",
    }));
  };

  const handleNextWithOther = () => {
    if (selectedValue == "Other" && otherText) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: otherText,
      }));
    }
    handleNext();
  };

  const handleRadioClick = (value) => {
    setRequired(false);
    setSelectedValue(value);
    if (value !== "Other") {
      setOtherText("");
    }
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
    if (value !== "Other") {
      setShouldProceed(true);
    }
  };

  const handleInputChange = (event) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: event.target.value,
    }));
    setRequired(false);
  };

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentAnswer = answers[currentQuestion];
    const requiredQuestions = [0, 1, 2, 3, 5, 7, 8, 9, 10, 11, 12, 13];
    localStorage.setItem("answers", JSON.stringify(answers));

    if (
      requiredQuestions.includes(currentQuestion) &&
      (currentAnswer === undefined || currentAnswer === "")
    ) {
      setRequired(true);
      setErrorMessage("Please fill this in");
      return;
    }
    if (currentQuestion === 2 && !emailRegex.test(currentAnswer)) {
      setRequired(true);
      setErrorMessage("Email is not valid");
      return;
    }

    if (currentQuestion === 3 && currentAnswer.length <= 5) {
      setRequired(true);
      setErrorMessage("Please fill this in");
      return;
    }

    if (currentQuestion === 7 && selectedValue === "Other" && !otherText.trim()) {
  setRequired(true);
  setErrorMessage("Please fill this in");
  return;
}

    setRequired(false);
    setErrorMessage("");
    setCurrentQuestion((prev) => Math.min(prev + 1, 13));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setRequired(false);
    localStorage.setItem("answers", JSON.stringify(answers));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentAnswer = answers[currentQuestion];
    localStorage.removeItem("answers");
    try {
      if (currentAnswer === undefined || currentAnswer === "") {
        setRequired(true);
        setErrorMessage("Please fill this in");
        return;
      }
      setLoading(true);

      const response = await axios.post(
        "https://howtosell-server-v2-2kdfsvutt-umutplvns-projects.vercel.app/api/user/create",
        user
      );
      console.log(response);

      navigate("/submitted");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNext();
    }
  };

  console.log("user", user);

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <LinearProgress variant="determinate" value={progress} />
      <TransitionGroup>
        <CSSTransition key={currentQuestion} timeout={300} classNames="fade">
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              mt: "2rem",
              alignItems: "center",
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {/* Question 1 - Name */}
            {currentQuestion === 0 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    1.
                  </span>

                  <span style={{ fontWeight: "700" }}>First Name</span>
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Jane"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      onKeyDown={handleKeyDown}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 2 - Last name*/}
            {currentQuestion === 1 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    2.
                  </span>
                  Last Name
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Smith"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      onKeyDown={handleKeyDown}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 3 - email */}
            {currentQuestion === 2 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    3.
                  </span>
                  Email
                </Typography>

                <TextField
                  autoFocus
                  variant="standard"
                  type="email"
                  placeholder="name@example.com"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      onKeyDown={handleKeyDown}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 4 - Number */}
            {currentQuestion === 3 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    4.
                  </span>
                  Phone Number
                </Typography>
                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.85rem",
                    },
                  }}
                >
                  (WhatsApp preferred for contact)
                </Typography>
                <Box
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    height: "3rem",
                    mt: "3rem",
                    mb: "1rem",
                  }}
                >
                  <form onKeyDown={handleKeyDown}>
                    <PhoneInput
                      autoFocus
                      defaultCountry="IRE"
                      defaultValue=""
                      value={answers[currentQuestion] || ""}
                      onChange={(value) => {
                        setAnswers((prev) => ({
                          ...prev,
                          [currentQuestion]: value,
                        }));
                        setRequired(false);
                      }}
                      inputProps={{
                        style: {
                          width: "100%",
                          color: "#0445AF",
                          fontSize: "1.2rem",
                        },
                      }}
                    />
                    {!isMobile && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          width: { xs: "300px", sm: "500px" },
                          mt: "1rem",
                        }}
                      >
                        <Button
                          onClick={handleNext}
                          sx={{
                            width: "2rem",
                            color: "white",
                            backgroundColor: "#0445AF",
                            height: "2rem",
                          }}
                        >
                          OK
                        </Button>
                        <Typography>
                          Press <strong>Enter</strong> <AiOutlineEnter />
                        </Typography>
                      </Box>
                    )}
                  </form>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "1.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 5 - Instagram*/}
            {currentQuestion === 4 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    5.
                  </span>
                  Instagram Handle
                </Typography>
                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.85rem",
                    },
                  }}
                >
                  (Optional, helps us find you faster)
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Please type..."
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 6 - Company Name */}
            {currentQuestion === 5 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    6.
                  </span>
                  Company Name
                </Typography>

                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Please type..."
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 7 - Company Name */}
            {currentQuestion === 6 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    7.
                  </span>
                  Company Website
                </Typography>
                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.85rem",
                    },
                  }}
                >
                  (If you have one)
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Please type..."
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 8 - Which best describes you?*/}
            {currentQuestion === 7 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    8.
                  </span>
                  Which best describes you?{" "}
                </Typography>
                <RadioGroup
                  sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleNextWithOther();
                  }}
                >
                  {[
                    "Salesperson",
                    "Entrepreneur / Business Owner",
                    "Sales Leader / Manager",
                    "Other",
                  ].map((value) => (
                    <Sheet
                      key={value}
                      sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
                    >
                      <Radio
                        onClick={() => handleRadioClick(value)}
                        label={value}
                        overlay
                        disableIcon
                        value={value}
                      />
                    </Sheet>
                  ))}
                </RadioGroup>
                {selectedValue === "Other" && (
                  <TextField
                    variant="standard"
                    placeholder="Please type..."
                    sx={{
                      width: { xs: "300px", sm: "400px" },
                      mt: 2,
                      "& .MuiInputBase-input": {
                        color: "#0445AF",
                        fontSize: "1.2rem",
                      },
                    }}
                    value={otherText}
                    onChange={handleOtherTextChange}
                    onKeyDown={handleKeyDown}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 9 - teamMembers*/}
            {currentQuestion === 8 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    9.
                  </span>
                  How many reps are on your sales team (if any)?{" "}
                </Typography>
                <RadioGroup
                  sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                  onKeyDown={handleKeyDown}
                >
                  {[
                    " Just Me",
                    "2-5 Members",
                    "6-15 Members",
                    "16+ Members",
                  ].map((value) => (
                    <Sheet
                      key={value}
                      sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
                    >
                      <Radio
                        onClick={() => handleRadioClick(value)}
                        label={value}
                        overlay
                        disableIcon
                        value={value}
                      />
                    </Sheet>
                  ))}
                </RadioGroup>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 10 - Goal*/}
            {currentQuestion === 9 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    10.
                  </span>
                  What are you aiming to achieve with sales training?
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder=" E.g. close more deals, fix team process, reduce ghosting"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                      "&::placeholder": {
                        fontSize: !isMobile ? "0.85rem" : undefined,
                      },
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 11 - challenge*/}
            {currentQuestion === 10 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    11.
                  </span>
                  What’s the biggest sales challenge you’re facing right now?
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="E.g. team not following structure, leads going cold, low close rates"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                      "&::placeholder": {
                        fontSize: !isMobile ? "0.85rem" : undefined,
                      },
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 12 - urgency*/}
            {currentQuestion === 11 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    12.
                  </span>
                  What makes now the right time to fix this?{" "}
                </Typography>

                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.85rem",
                    },
                  }}
                >
                  (Optional but powerful)
                </Typography>

                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Creates urgency. Lets you spot hot leads."
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                      "&::placeholder": {
                        fontSize: !isMobile ? "0.85rem" : undefined,
                      },
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                {!isMobile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: { xs: "300px", sm: "500px" },
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        width: "2rem",
                        color: "white",
                        backgroundColor: "#0445AF",
                        height: "2rem",
                      }}
                    >
                      OK
                    </Button>
                    <Typography>
                      Press <strong>Enter</strong> <AiOutlineEnter />
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 13 - Investment*/}
            {currentQuestion === 12 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    13.
                  </span>
If this could solve your exact problem, what investment range would feel comfortable?


                </Typography>
                <RadioGroup
                  sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                  onKeyDown={handleKeyDown}
                >
                  {[
                    "€5,000–€10,000",
                    "€10,000–€20,000",
                    "€20,000+"
                  ].map((value) => (
                    <Sheet
                      key={value}
                      sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
                    >
                      <Radio
                        onClick={() => handleRadioClick(value)}
                        label={value}
                        overlay
                        disableIcon
                        value={value}
                      />
                    </Sheet>
                  ))}
                </RadioGroup>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

       {/* Question 14 - when */}
{currentQuestion === 13 && (
  <>
    <Typography
      sx={{
        mb: 2,
        fontWeight: "500",
        fontSize: "1.3rem",
        letterSpacing: "0.03em",
        textAlign: "left",
        width: { xs: "300px", sm: "400px" },
      }}
    >
      <span style={{ color: "#0445AF", marginRight: "5px" }}>
        14.
      </span>
      When would you ideally like to start?
    </Typography>
    <RadioGroup
      sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
      value={answers[currentQuestion] || ""}
      onChange={handleRadioChange}
      onKeyDown={handleKeyDown}
    >
      {["ASAP", "1–2 weeks", "Within a month", "Just exploring"].map(
        (value) => (
          <Sheet
            key={value}
            sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
          >
            <Radio
              onClick={() => handleRadioClick(value)}
              label={value}
              overlay
              disableIcon
              value={value}
            />
          </Sheet>
        )
      )}
    </RadioGroup>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "300px", sm: "400px" },
      }}
    >
      {required ? (
        <Box
          sx={{
            backgroundColor: "#F7E6E5",
            color: "#bc1616",
            p: "0.5rem",
            mt: "0.5rem",
            mb: "-1rem",
            borderRadius: "0.2rem",
            width: "9rem",
            textAlign: "center",
            display: "flex",
            gap: "0.2rem",
          }}
        >
          <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
          <Typography sx={{ fontSize: "0.8rem" }}>
            Please fill this in
          </Typography>
        </Box>
      ) : (
        <Box sx={{ height: "2rem" }}></Box>
      )}
    </Box>

    {/*SUBMIT BUTTON */}
    {currentQuestion === 13 && !isMobile && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "1.5rem",
        }}
      >
        <LoadingButton
          size="small"
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{
            width: "7rem",
            backgroundColor: (theme) =>
              loading ? "#E0E0E0" : "#0544AF",
          }}
        >
          Submit
        </LoadingButton>
      </Box>
    )}
  </>
)}

            


          </Box>
        </CSSTransition>
      </TransitionGroup>
      {/* Arrow Icons */}
      {isMobile ? (
        <Box
          sx={{
            position: "fixed",
            zIndex: 3,
            bottom: "2rem",
            width: "100%",
            p: "0.5rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Button
            onClick={handlePrev}
            sx={{
              backgroundColor: (theme) => (loading ? "#E0E0E0" : "#0544AF"),

              color: "white",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
            disabled={currentQuestion === 0 || loading}
          >
            <ArrowBackIosIcon />
          </Button>

          {currentQuestion === 13 ? (
            <LoadingButton
              size="small"
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="center"
              variant="contained"
              sx={{
                width: "80%",
                backgroundColor: (theme) => (loading ? "#E0E0E0" : "#0544AF"),
              }}
            >
              Submit
            </LoadingButton>
          ) : (
            <Button
              onClick={handleNext}
              sx={{
                backgroundColor: "#0544AF",
                color: "white",
                borderRadius: "0.5rem",
                cursor: "pointer",
                width: "80%",
              }}
            >
              OK
            </Button>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            zIndex: 3,
            bottom: "1rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                pr: "1rem",
              }}
            >
              <Button
                onClick={handlePrev}
                sx={{
                  backgroundColor: (theme) => (loading ? "#E0E0E0" : "#0544AF"),
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                disabled={currentQuestion === 0 || loading}
              >
                <ExpandLessOutlinedIcon />
              </Button>

              <Button
                onClick={handleNext}
                sx={{
                  backgroundColor: (theme) => (loading ? "#E0E0E0" : "#0544AF"),
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                disabled={currentQuestion === 13}
              >
                <ExpandMoreOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FormQuestions;
