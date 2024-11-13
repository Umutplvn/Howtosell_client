import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import useAuthCall from "../hooks/useAuthCall";
import BasicModal from "./DelAccModal";

const Account = () => {
  const { name, email, userId } = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState({ name: "", password: "", userId });
  const [error, setError] = useState(false);
  const { update, logout } = useAuthCall();
  const [open, setOpen] = useState(false);

  const style = {
    width: "5rem",
    textAlign: "start",
    fontWeight: "600",
    height: "2rem",
    display: "flex",
    alignItems: "flex-end",
  };
  const handleOpen = () => setOpen(true);

  const handleChange = (e) => {
    setError(false);
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (info.password && info.password.length < 8) {
      setError(true);
      return;
    }

    const updateData = {};
    if (info.name) updateData.name = info.name;
    if (info.password) updateData.password = info.password;

    try {
      await update({ updateData }, userId);
      console.log("updateData", updateData);
    } catch (error) {
      setError(true);
      console.error("Update failed:", error);
    } finally {
      setInfo({ name: "", password: "", userId });
    }
  };


  return (
    <Box
      sx={{ border: "1px solid #e1e1e1", p: "2.5rem 1.5rem", borderRadius: "0.5rem" }}
    >
      <Box>
        <LockIcon sx={{ fontSize: "2.5rem", color: "#000000" }} />
        <Typography sx={{ fontSize: "0.8rem", color: "#747474" }}>
          {email}
        </Typography>
      </Box>

      <Box sx={{ width:{xs:"300px", md:"400px",mt: "4rem"} }} >
        <Box
          sx={{
            mb: "1rem",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            maxWidth: "500px",
            mt:"2rem"
          }}
        >
          <Typography
            sx={{ fontSize: "0.9rem", color: "#656464", textAlign: "left" }}
          >
            Name
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              required
              placeholder={name}
              value={info.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            mb: "1rem",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            maxWidth: "500px",
          }}
        >
          <Typography
            sx={{ fontSize: "0.9rem", color: "#656464", textAlign: "left" }}
          >
            Password
          </Typography>
          <FormControl sx={{ width: "100%" }} >
            <OutlinedInput
              required
              placeholder="* * * * * * * *"
              type={showPassword ? "text" : "password"}
              name="password"
              value={info.password}
              onChange={(e) => handleChange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <div
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </InputAdornment>
              }
            />
          </FormControl>
          {error && (
            <Box
              sx={{
                backgroundColor: "#F7E6E5",
                color: "#bc1616",
                p: "0.5rem",
                mt: "0.5rem",
                mb: "-1rem",
                borderRadius: "0.2rem",
                textAlign: "center",
                display: "flex",
                gap: "0.2rem",
              }}
            >
              <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
              <Typography sx={{ fontSize: "0.8rem" }}>
                At least 8 characters
              </Typography>
            </Box>
          )}{" "}
        </Box>
        <Button
          onClick={(e) => handleSubmit(e)}
          sx={{
            mt: "2rem",
            border: "1.5px solid #c9c9c9",
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "5rem",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#000000",
              color: "white",
            },
          }}
        >
          UPDATE
        </Button>

        <hr style={{marginTop:"1rem"}}/>

        <Box sx={{mt:"1rem", display:"flex", justifyContent:"space-between"}}>
        <Button 
         onClick={handleOpen}
        sx={{color: "#797979", "&:hover": { color: "black" } }}>Delete Account</Button>
        <Button onClick={()=>logout()} sx={{color: "#797979", "&:hover": { color: "black" } }}>Logout</Button>
        </Box>
      </Box>
      <BasicModal open={open} setOpen={setOpen}/>
    </Box>
  );
};

export default Account;
