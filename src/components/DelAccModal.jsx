import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #8e8e8e",
  boxShadow: 12,
  p: 4,
  borderRadius: "0.5rem",
};

const btnStyle = {
  mt: "1rem",
  border: "1.5px solid #c9c9c9",
  backgroundColor: "#F2F2F2",
  color: "#242424",
  borderRadius: "1rem",
  width: "3rem",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#000000",
    color: "white",
  },
};

export default function BasicModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { deleteAccount } = useAuthCall();
  const { userId } = useSelector((state) => state.auth);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Button onClick={() => deleteAccount(userId)} sx={btnStyle}>
              YES
            </Button>

            <Button onClick={handleClose} sx={btnStyle}>
              NO
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
