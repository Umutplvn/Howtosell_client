import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import useDataCall from "../hooks/useDataCall";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6a6a6a",
  boxShadow: 12,
  pt: 4,
  px: 4,
  height: "35rem",
  overflow: "scroll",
};

export default function NestedModal({ clientOpen, setClientOpen }) {
  const { createClient } = useDataCall();

  const handleClientClose = () => {
    setClientOpen(false);
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const [info, setInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    insta: "",
    companyName: "",
    companyWebsite: "",
    role: "",
    teamSize: "",
    goal: "",
    challenge: "",
    urgency: "",
    investment: "",
    when: "",
  });

  const handleSubmit = () => {
    if (!info.name || !info.email || !info.phone) {
      toast.error("Please fill required fields");
    } else {
      createClient(info);
      setInfo({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        insta: "",
        companyName: "",
        companyWebsite: "",
        role: "",
        teamSize: "",
        goal: "",
        challenge: "",
        urgency: "",
        investment: "",
        when: "",
      });
      handleClientClose();
    }
  };

  return (
    <Box>
      <Modal
        open={clientOpen}
        onClose={handleClientClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "90%",
            maxWidth: "550px",
            borderRadius: "1rem",
          }}
        >
          {/* First Name */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>First Name*</Typography>
            <TextField
              required
              variant="standard"
              placeholder="Jane"
              sx={{ width: "100%" }}
              name="name"
              onChange={handleChange}
              value={info.name}
            />
          </Box>

          {/* Last Name */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>Last Name</Typography>
            <TextField
              placeholder="Smith"
              variant="standard"
              sx={{ width: "100%" }}
              name="lastName"
              onChange={handleChange}
              value={info.lastName}
            />
          </Box>

          {/* Email */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>Email*</Typography>
            <TextField
              required
              variant="standard"
              placeholder="name@example.com"
              sx={{ width: "100%" }}
              name="email"
              onChange={handleChange}
              value={info.email}
            />
          </Box>

          {/* Phone Number */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Phone Number (WhatsApp preferred for contact)*
            </Typography>
            <TextField
              required
              variant="standard"
              placeholder="+90 (541) 223 88 88"
              sx={{ width: "100%" }}
              name="phone"
              onChange={handleChange}
              value={info.phone}
            />
          </Box>

          {/* Instagram Handle */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Instagram Handle (optional, helps us find you faster)
            </Typography>
            <TextField
              variant="standard"
              placeholder="@username"
              sx={{ width: "100%" }}
              name="insta"
              onChange={handleChange}
              value={info.insta}
            />
          </Box>

          {/* Company Name */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>Company Name</Typography>
            <TextField
              placeholder="Please type..."
              variant="standard"
              sx={{ width: "100%" }}
              name="companyName"
              onChange={handleChange}
              value={info.companyName}
            />
          </Box>

          {/* Company Website */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Company Website (if you have one)
            </Typography>
            <TextField
              placeholder="Please type..."
              variant="standard"
              sx={{ width: "100%" }}
              name="companyWebsite"
              onChange={handleChange}
              value={info.companyWebsite}
            />
          </Box>

          {/* Which best describes you? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Which best describes you?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., Entrepreneur / Business Owner"
              sx={{ width: "100%" }}
              name="role"
              onChange={handleChange}
              value={info.role}
            />
          </Box>

          {/* How many reps are on your sales team? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              How many reps are on your sales team (if any)?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., Just Me, 2-5 people"
              sx={{ width: "100%" }}
              name="teamSize"
              onChange={handleChange}
              value={info.teamSize}
            />
          </Box>

          {/* What are you aiming to achieve with sales training? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              What are you aiming to achieve with sales training?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., Increase sales revenue"
              sx={{ width: "100%" }}
              name="goal"
              onChange={handleChange}
              value={info.goal}
            />
          </Box>

          {/* What’s the biggest sales challenge you’re facing right now? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              What’s the biggest sales challenge you’re facing right now?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., Lead generation, closing deals"
              sx={{ width: "100%" }}
              name="challenge"
              onChange={handleChange}
              value={info.challenge}
            />
          </Box>

          {/* What makes now the right time to fix this? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              What makes now the right time to fix this?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., Our targets are increasing"
              sx={{ width: "100%" }}
              name="urgency"
              onChange={handleChange}
              value={info.urgency}
            />
          </Box>

          {/* What investment range would feel comfortable? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              If this could solve your exact problem, what investment range
              would feel comfortable?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., €5,000–€10,000"
              sx={{ width: "100%" }}
              name="investment"
              onChange={handleChange}
              value={info.investment}
            />
          </Box>

          {/* When would you ideally like to start? */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              When would you ideally like to start?
            </Typography>
            <TextField
              variant="standard"
              placeholder="e.g., Immediately, Within a month"
              sx={{ width: "100%" }}
              name="when"
              onChange={handleChange}
              value={info.when}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 4,
                mb: 5,
                textAlign: "center",
                backgroundColor: "#000000",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#37a629",
                  color: "white",
                },
              }}
              onClick={handleSubmit}
            >
              submit
            </Button>

            <Button
              type="submit"
              variant="contained"
              onClick={handleClientClose}
              sx={{
                mt: 4,
                mb: 5,
                textAlign: "center",
                backgroundColor: "#000000",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#bc3a3a",
                  color: "white",
                },
              }}
            >
              close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}