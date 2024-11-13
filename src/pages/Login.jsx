import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {
  const { login } = useAuthCall();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(info);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ textAlign: "center", mt: "1rem", p: "0.5rem" }}>
      {loading && (
        <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)", 
          zIndex: 3
        }}
        >
       <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "-1rem",
              left: 0,
              backdropFilter: "blur(5px)", 
            }}
          />
          <img
            src="https://i.gifer.com/ZKZg.gif"
            alt="loading"
            style={{
              width: "3rem",
              zIndex: "3",
            }}
          />
        </Box>
      )}
      <Typography
        onClick={() => navigate("/")}
        sx={{
          color: "#000000",
          fontSize: "1.6rem",
          mb: "3rem",
          fontFamily: "Helvetica sans-serif",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        HOW TO SELL
      </Typography>
      <Typography
        sx={{
          fontFamily: "Helvetica Neue sans-serif",
          fontSize: "1.3rem",
          color: "#585858",
          mb: "2rem",
        }}
      >
        Hello, who's this?
      </Typography>

      <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
        <Box
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
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
              Email
            </Typography>
            <FormControl sx={{ width: "320px" }}>
              <OutlinedInput
                required
                placeholder="bruce@wayne.com"
                name="email"
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
            <FormControl sx={{ width: "320px" }}>
              <OutlinedInput
                required
                placeholder="At least 8 characters"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => handleChange(e)}
                endAdornment={
                  <InputAdornment position="end">
                    <div
                      onClick={handleClickShowPassword}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </div>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            mb: 2,
            pl: 4,
            pr: 4,
            backgroundColor: "#F2F2F2",
            color: "#242424",
            borderRadius: "1rem",
            width: "8rem",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#000000",
              color: "white",
            },
          }}
        >
          Sign in
        </Button>
        <Box>
 

        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Link
                      href="/dbmain/forgotpass"
            sx={{
              cursor:"pointer",
              color: "#797979",
              textDecoration: "none",
              "&:hover": { color: "#000000" },
            }}
          >
            Forgot password?
          </Link>

          <Link
            href="/dbmain/register"
            sx={{
              cursor:"pointer",
              color: "#797979",
              textDecoration: "none",
              width: "100px",
              "&:hover": { color: "#000000" },
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
