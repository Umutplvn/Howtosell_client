import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

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

export default function ReadNestedModal({ readOpen, setReadOpen, data }) {
  const handleReadClose = () => {
    setReadOpen(false);
  };

  const formatName = (name) => {
    if (!name) return "";
    // email'i formatlamaması için kontrol ekledim
    if (name.includes('@')) {
      return name;
    }
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Box>
      <Modal
        open={readOpen}
        onClose={handleReadClose}
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
            <Typography sx={{ fontWeight: "700" }}>First Name</Typography>
            <Typography sx={{ color: "#0445AF" }}>{formatName(data?.name)}</Typography>
          </Box>

          {/* Last Name */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>Last Name</Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {formatName(data?.lastName)}
            </Typography>
          </Box>

          {/* Email */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>Email</Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {data?.email}
            </Typography>
          </Box>

          {/* Phone Number */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Phone Number
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.phone}</Typography>
          </Box>

          {/* Instagram Handle */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Instagram Handle
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.insta}</Typography>
          </Box>
          
          {/* Company Name */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>Company Name</Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.companyName}</Typography>
          </Box>

          {/* Company Website */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Company Website
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.companyWebsite}</Typography>
          </Box>

          {/* Role */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Which best describes you?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.role}</Typography>
          </Box>

          {/* Team Size */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              How many reps are on your sales team?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {data?.teamSize}
            </Typography>
          </Box>

          {/* Goal */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              What are you aiming to achieve with sales training?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.goal}</Typography>
          </Box>

          {/* Challenge */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              What’s the biggest sales challenge you’re facing right now?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.challenge}</Typography>
          </Box>
          
          {/* Urgency */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              What makes now the right time to fix this?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.urgency}</Typography>
          </Box>

          {/* Investment */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              Investment Range
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.investment}</Typography>
          </Box>

          {/* When */}
          <Box sx={{ mb: "1rem" }}>
            <Typography sx={{ fontWeight: "700" }}>
              When would you ideally like to start?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.when}</Typography>
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
              onClick={handleReadClose}
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