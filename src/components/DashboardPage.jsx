import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ModalUnstyled from "../components/DeleteClientModal";
import useDataCall from "../hooks/useDataCall";
import NestedModal from "./CreateClientModal";
import ReadNestedModal from "./ReadClientModal";
import ClearIcon from "@mui/icons-material/Clear";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const Members = () => {
  const { name } = useSelector((state) => state?.auth);
  const { clients } = useSelector((state) => state?.appData);
  const { listClients, updateClient } = useDataCall();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clientOpen, setClientOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    listClients();
  }, []);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleReadFucn = (row) => {
    setReadOpen(true);
    setData(row);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const contFunc = (userId) => {
    updateClient(userId.userId, {
      updateData: { connected: true, connectedBy: name },
    });
  };

  const noContFunc = (userId) => {
    updateClient(userId.userId, {
      updateData: { connected: false, connectedBy: "-" },
    });
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  const filterUsers = clients?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.email?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.phone.includes(search)
  );

  const cellStyle = {
    fontSize: "0.75rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const stickyStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    whiteSpace: "normal",
    wordBreak: "break-word",
    zIndex: 1,
  };

  const commonCellStyle = (min, max) => ({
    minWidth: min,
    maxWidth: max,
    width: max,
    ...cellStyle,
  });

  return (
    <Box sx={{ backgroundColor: "#f8f8f8", marginTop: "-2rem" }}>
      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          paddingTop: "2rem",
          borderBottom: "0.5px solid #a8a8a8",
          display:"flex",
          width:'100%',
          justifyContent:'center'
        }}
      >
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          variant="outlined"
          sx={{
            width: { xs: "15rem", md: "20rem" },
            borderRadius: "2rem",
            padding: "0 0 1rem 0",
            "& .MuiOutlinedInput-root": {
              fontSize: "0.75rem",
              height: "1.8rem",
              color: "black",
              "& fieldset": {
                borderColor: "black",
                borderRadius: "2rem",
              },
              "&:hover fieldset": {
                borderColor: "#4f7fee",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6490f5",
              },
              "& input": {
                height: "auto",
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          overflow: "scroll",
          m: "auto",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            overflow: "scroll",
            m: "auto",
            height: "90vh",
            width: "100vw",
            overflow: "scroll",
          }}
        >
          <Table sx={{ minWidth: 350 }} size="small" aria-label="simple table">
            <TableHead sx={{ position: "sticky", pb: "4rem" }}>
              <TableRow>
                <TableCell sx={stickyStyle}></TableCell>
                
                {/* Genişlik ayarlı başlıklar */}
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("90px", "90px") }}>
                  <Typography sx={{ ...cellStyle, width: "90px" }}>First Name</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("90px", "90px") }}>
                  <Typography sx={{ ...cellStyle, width: "70px" }}>Last Name</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("150px", "150px") }}>
                  <Typography sx={{ ...cellStyle, width: "150px" }}>Email</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("110px", "110px") }}>
                  <Typography sx={{ ...cellStyle, width: "110px" }}>Phone Number</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("120px", "120px") }}>
                  <Typography sx={{ ...cellStyle, width: "120px" }}>Instagram</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("150px", "150px") }}>
                  <Typography sx={{ ...cellStyle, width: "150px" }}>Company Name</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("150px", "150px") }}>
                  <Typography sx={{ ...cellStyle, width: "150px" }}>Company Website</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("120px", "120px") }}>
                  <Typography sx={{ ...cellStyle, width: "120px" }}>Role/Position</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("150px", "150px") }}>
                  <Typography sx={{ ...cellStyle, width: "150px" }}>Team size</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("200px", "200px") }}>
                  <Typography sx={{ ...cellStyle, width: "200px" }}>What are you aiming to achieve?</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("200px", "200px") }}>
                  <Typography sx={{ ...cellStyle, width: "200px" }}>Biggest sales challenge?</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("180px", "180px") }}>
                  <Typography sx={{ ...cellStyle, width: "180px" }}>  Why fix this now??</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("120px", "120px") }}>
                  <Typography sx={{ ...cellStyle, width: "120px" }}>Investment Range</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("120px", "120px") }}>
                  <Typography sx={{ ...cellStyle, width: "120px" }}>Ideal start time</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("120px", "120px") }}>
                  <Typography sx={{ ...cellStyle, width: "120px" }}>Created At</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("100px", "100px") }}>
                  <Typography sx={{ ...cellStyle, width: "100px" }}>Contacted</Typography>
                </TableCell>
                <TableCell align="left" sx={{ ...stickyStyle, ...commonCellStyle("120px", "120px") }}>
                  <Typography sx={{ ...cellStyle, width: "120px" }}>Contacted By</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterUsers?.map((row, index) => (
                <TableRow key={row?._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: "flex", gap: "0.3rem", alignItems: "center", width: "2.7rem" }}>
                      <Typography sx={{ fontSize: "0.9rem", fontWeight: "800" }}>{index + 1})</Typography>
                      <ClearIcon
                        onClick={() => handleOpen(row)}
                        sx={{
                          color: "#4b4b4b",
                          fontSize: "1rem",
                          ":hover": {
                            cursor: "pointer",
                            transform: "scale(1.04)",
                            color: "#c72525",
                            transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                          },
                        }}
                      />
                      <ZoomInIcon
                        onClick={() => handleReadFucn(row)}
                        sx={{
                          fontSize: "1rem",
                          color: "#4b4b4b",
                          ":hover": {
                            cursor: "pointer",
                            transform: "scale(1.04)",
                            color: "#0aaf04",
                            transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                          },
                        }}
                      />
                    </Box>
                  </TableCell>

                  {/* Genişlik ayarlı hücreler */}
                  <TableCell sx={commonCellStyle("90px", "90px")} align="left">
                    {formatName(row.name)}
                  </TableCell>
                  <TableCell sx={commonCellStyle("90px", "90px")} align="left">
                    {formatName(row.lastName)}
                  </TableCell>
                  <TableCell sx={commonCellStyle("150px", "150px")} align="left">
                    {row.email}
                  </TableCell>
                  <TableCell sx={commonCellStyle("110px", "110px")} align="left">
                    {row.phone}
                  </TableCell>
                  <TableCell sx={commonCellStyle("120px", "120px")} align="left">
                    {row.insta}
                  </TableCell>
                  <TableCell sx={commonCellStyle("150px", "150px")} align="left">
                    {row.companyName}
                  </TableCell>
                  <TableCell sx={commonCellStyle("150px", "150px")} align="left">
                    {row.companyWebsite}
                  </TableCell>
                  <TableCell sx={commonCellStyle("120px", "120px")} align="left">
                    {row.role}
                  </TableCell>
                  <TableCell sx={commonCellStyle("150px", "150px")} align="left">
                    {row.teamSize}
                  </TableCell>
                  <TableCell sx={commonCellStyle("200px", "200px")} align="left">
                    {row.goal}
                  </TableCell>
                  <TableCell sx={commonCellStyle("200px", "200px")} align="left">
                    {row.challenge}
                  </TableCell>
                  <TableCell sx={commonCellStyle("180px", "180px")} align="left">
                    {row.urgency}
                  </TableCell>
                  <TableCell sx={commonCellStyle("120px", "120px")} align="left">
                    {row.investment}
                  </TableCell>
                  <TableCell sx={commonCellStyle("120px", "120px")} align="left">
                    {row.when}
                  </TableCell>
                  <TableCell sx={commonCellStyle("120px", "120px")} align="left">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell sx={commonCellStyle("100px", "100px")} align="center">
                    {row.connected ? (
                      <ThumbUpAltIcon
                        onClick={() => noContFunc({ userId: row._id })}
                        sx={{ color: "#24a062", fontSize: "1rem", cursor: "pointer" }}
                      />
                    ) : (
                      <ThumbDownIcon
                        onClick={() => contFunc({ userId: row._id })}
                        sx={{ color: "#cc2525", fontSize: "1rem", cursor: "pointer" }}
                      />
                    )}{" "}
                  </TableCell>
                  <TableCell sx={commonCellStyle("120px", "120px")} align="center">
                    {formatName(row.connectedBy)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <NestedModal clientOpen={clientOpen} setClientOpen={setClientOpen} />
      <ReadNestedModal
        readOpen={readOpen}
        setReadOpen={setReadOpen}
        data={data}
      />
      {selectedUser && (
        <ModalUnstyled
          handleClose={handleClose}
          open={open}
          userId={selectedUser._id}
          name={selectedUser.name}
        />
      )}
    </Box>
  );
};

export default Members;