import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

  return (
    <Box sx={{ backgroundColor: "#f8f8f8", marginTop: "-2rem" }}>
      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          paddingTop: "2rem",
          borderBottom: "0.5px solid #a8a8a8",
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
              <TableRow sx={cellStyle}>
                <TableCell sx={stickyStyle}></TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                    minWidth: "90px",
                    maxWidth: "90px",
                    width: "90px",
                  }}
                >
                  <Typography sx={{ ...cellStyle, width: "90px" }}>
                    First Name
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                    minWidth: "90px",
                    maxWidth: "90px",
                    width: "90px",
                  }}
                >
                  <Typography sx={{ ...cellStyle, width: "70px" }}>
                    Last Name
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>Email</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>Phone Number</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>Instagram</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>Company Name</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>Company Website</Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",

                    minWidth: "120px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
                  >
                    Role/Position
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                    minWidth: "150px",
                    maxWidth: "150px",
                    width: "150px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
                  >
                    Team size
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",
                    top: 0,
                    minWidth: "150px",
                    maxWidth: "150px",
                    width: "150px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
                  >
                    What are you aiming to achieve with sales training?
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",
                    top: 0,
                    minWidth: "150px",
                    maxWidth: "150px",
                    width: "150px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
                  >
                    What’s the biggest sales challenge you’re facing right now?
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    minWidth: "150px",
                    maxWidth: "150px",
                    width: "150px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.75rem", whiteSpace: "normal" }}
                  >
                    What makes now the right time to fix this?
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    minWidth: "90px",
                    maxWidth: "90px",
                    width: "90px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      width: "90px",
                    }}
                  >
                    Investment Range
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    minWidth: "90px",
                    maxWidth: "90px",
                    width: "90px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      width: "90px",
                    }}
                  >
                    Ideal start time
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    minWidth: "80px",
                    maxWidth: "80px",
                    width: "80px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      width: "80px",
                    }}
                  >
                    Created At{" "}
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    minWidth: "80px",
                    maxWidth: "80px",
                    width: "80px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      width: "80px",
                    }}
                  >
                    Contacted
                  </Typography>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    position: "sticky",
                    backgroundColor: "white",

                    top: 0,
                    minWidth: "80px",
                    maxWidth: "80px",
                    width: "80px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      width: "80px",
                    }}
                  >
                    Contacted By
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterUsers?.map((row, index) => (
                <TableRow
                  key={row?._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.3rem",
                        alignItems: "center",
                        width: "2.7rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "800",
                        }}
                      >
                        {index + 1})
                      </Typography>{" "}
                      <ClearIcon
                        onClick={() => handleOpen(row)}
                        sx={{
                          color: "#4b4b4b",
                          fontSize: "1rem",
                          ":hover": {
                            cursor: "pointer",
                            transform: "scale(1.04)",
                            color: "#c72525",
                            transition:
                              "transform 0.2s ease-in-out, color 0.2s ease-in-out",
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
                            transition:
                              "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                          },
                        }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell sx={{ ...cellStyle, maxWidth: 80 }} align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        width: "90px",
                      }}
                    >
                      {formatName(row.name)}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ ...cellStyle, maxWidth: 80 }} align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "80px",
                      }}
                    >
                      {formatName(row.lastName)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cellStyle, maxWidth: 150 }} align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "120px",
                      }}
                    >
                      {row.email}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "110px",
                      }}
                    >
                      {row.phone}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100px",
                      }}
                    >
                      {row.insta}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100px",
                      }}
                    >
                      {row.companyName}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100px",
                      }}
                    >
                      {row.companyWebsite}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100px",
                      }}
                    >
                      {row.role}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100px",
                      }}
                    >
                      {row.teamSize}
                    </Typography>
                  </TableCell>

                  {/* Refactored Cell: Displays the 'goal' key */}
                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100px",
                      }}
                    >
                      {row.goal}
                    </Typography>
                  </TableCell>

                  {/* Refactored Cell: Displays the 'challenge' key */}
                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "150px",
                      }}
                    >
                      {row.challenge}
                    </Typography>
                  </TableCell>

                  {/* Refactored Cell: Displays the 'urgency' key */}
                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "120px",
                      }}
                    >
                      {row.urgency}
                    </Typography>
                  </TableCell>

                  {/* Refactored Cell: Displays the 'investment' key */}
                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "120px",
                      }}
                    >
                      {row.investment}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "120px",
                      }}
                    >
                      {row.when}
                    </Typography>
                  </TableCell>

  

                  <TableCell align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "90px",
                      }}
                    >
                      {formatDate(row.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {row.connected ? (
                      <ThumbUpAltIcon
                        onClick={() => noContFunc({ userId: row._id })}
                        sx={{
                          color: "#24a062",
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <ThumbDownIcon
                        onClick={() => contFunc({ userId: row._id })}
                        sx={{
                          color: "#cc2525",
                          fontSize: "1rem",
                          cursor: "pointer",
                        }}
                      />
                    )}{" "}
                  </TableCell>

                  <TableCell sx={{ minWidth: "150px" }} align="left">
                    <Typography
                      sx={{
                        ...cellStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "80px",
                        textAlign: "center",
                      }}
                    >
                      {formatName(row.connectedBy)}
                    </Typography>
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