import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";

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
          {/* Q1 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              1.First Name
            </Typography>

            <Typography sx={{ color: "#0445AF" }}>{formatName(data?.name)}</Typography>
          </Box>

          {/* Q2 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              2.Last Name
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {formatName(data?.lastName)}
            </Typography>
          </Box>

          {/* Q3 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              3.Email
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {formatName(data?.email)}
            </Typography>
          </Box>

          {/* Q4 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              4.Phone Number
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.phone}</Typography>
          </Box>
          {/* Q5 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              5.Company Name
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.companyName}</Typography>
          </Box>
          {/* Q6 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              6.Company Website
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.companyWebsite}</Typography>
          </Box>
          {/* Q7 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              7.How Large Is Your Sales Team?
            </Typography>

            <Typography sx={{ color: "#0445AF" }}>
              {data?.teamMembers}
            </Typography>
          </Box>
          {/* Q8 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              8.What outcome would make sales training a massive win for you?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.goal}</Typography>
          </Box>

          {/* Q9 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              9.What Are the Biggest Challenges You or Your Sales Team Is Facing? 
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.challenges}</Typography>
          </Box>

          {/* Q10 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              10.If you were confident that our sales training would help your team achieve these goals, what investment range would you feel comfortable with?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.directInvest}</Typography>
          </Box>

          {/* Q11 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              11.When Are You Looking to Implement Sales Training?

            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.when}</Typography>
          </Box>

          {/* Q12 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              12.Preferred Mode of Contact
            </Typography>

            <Typography sx={{ color: "#0445AF" }}>
              {data?.contactMode}
            </Typography>
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
