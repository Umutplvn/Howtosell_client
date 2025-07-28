import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
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
    companyName: "",
    companyWebsite: "",
    income: "",
    goal: "",
    challenges: "",
    directInvest: "",
    when: "",
    contactMode: "",
  });

  const handleSubmit = () => {
    if (!info.name || !info.email || !info.phone ) {
      toast.error("Please fill required fields");
    } else {
      createClient(info);
      setInfo({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        companyWebsite: "",
        income: "",
        goal: "",
        challenges: "",
        directInvest: "",
        when: "",
        contactMode: "",
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
          {/* Q1 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              1.First Name*
            </Typography>
            <TextField
              required
              variant="standard"
              placeholder="Jane"
              sx={{
                width: "100%",
              }}
              name="name"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              placeholder="Smith"
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {/* Q3 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              3.Email*
            </Typography>
            <TextField
            required
              variant="standard"
              placeholder="name@example.com"

              sx={{
                width: "100%",
              }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {/* Q4 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              4.Phone Number*
            </Typography>
            <TextField
            required
              variant="standard"
              placeholder="+90 (541) 223 88 88"
              sx={{
                width: "100%",
              }}
              name="phone"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
            placeholder="Please type..."
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="companyName"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
                        placeholder="Please type..."
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="companyWebsite"
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {/* Q7 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              7.How large is your sales team?
            </Typography>

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="teamMembers"
                defaultValue=""
              >
                <option value="" disabled>
                  Please Select
                </option>

                <option value={"Just Myself"}>Just Myself</option>
                <option value={"2-5 Members"}>2-5 Members</option>
                <option value={"6-10 Members"}>6-10 Members</option>
                <option value={"11-20 Members"}>11-20 Members</option>
                <option value={"21+ Members"}>21+ Members</option>
              </NativeSelect>
            </FormControl>
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

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="goal"
                defaultValue=""
              >
                <option value="" disabled>
                  Please Select
                </option>

                <option value={"Increase sales revenue"}>
                  Increase sales revenue
                </option>
                <option value={"Improve closing rates"}>
                  Improve closing rates
                </option>
                <option value={"Enhance product knowledge"}>
                  Enhance product knowledge
                </option>
                <option value={"Other"}>Other</option>
              </NativeSelect>
            </FormControl>
          </Box>

          {/* Q9 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              9.What Are the Biggest Challenges You or Your Sales Team Is
              Facing?
            </Typography>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="challenges"
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {/* Q10 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              10.If you were confident that our sales training would help your
              team achieve these goals, what investment range would you feel
              comfortable with?
            </Typography>

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="directInvest"
                defaultValue=""
              >
                <option value="" disabled>
                  Please Select
                </option>

                <option value={"Less than $5000"}>Less than $5000</option>
                <option value={"$5000-$10,000"}>$5000-$10,000</option>
                <option value={"10,000-$20,000"}>10,000-$20,000</option>
                <option value={"Over $20,000"}>Over $20,000</option>
              </NativeSelect>
            </FormControl>
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

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="when"
                defaultValue=""
              >
                <option value="" disabled>
                  Please Select
                </option>

                <option value={"Immediately"}>Immediately</option>
                <option value={"Within the next month"}>
                  Within the next month
                </option>
                <option value={"In 2-3 months"}>In 2-3 months</option>
                <option value={"Just exploring options"}>
                  Just exploring options
                </option>
              </NativeSelect>
            </FormControl>
          </Box>

          {/* Q11 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              12.Preferred Mode of Contact
            </Typography>

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="contactMode"
                defaultValue=""
              >
                <option value="" disabled>
                  Please Select
                </option>

                <option value={"Email"}>Email</option>
                <option value={"Phone"}>Phone</option>
                <option value={"WhatsApp"}>WhatsApp</option>
              </NativeSelect>
            </FormControl>
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
