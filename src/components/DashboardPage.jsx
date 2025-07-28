import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ModalUnstyled from "../components/DeleteClientModal";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import useDataCall from "../hooks/useDataCall";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NestedModal from "./CreateClientModal";
import ReadNestedModal from "./ReadClientModal";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
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


  console.log(clients);

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
  const handleClientOpen = () => {
    setClientOpen(true);
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
      const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(2); 
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
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
    height: "3rem",
    overflow: "scroll",
    minWidth: "200px",
    m: "-0.5rem",
  };

  const stickyStyle={ position: 'sticky', top: 0, backgroundColor: '#f8f8f8'
}


  const handleExport = () => {
    const data = filterUsers?.map((user) => ({
      "First Name": formatName(user.name),
      "Last Name": user.lastName,
      "Email": user.email,
      "Phone Number": user.phone,
      "Company Name": user.companyName,
      "Company Website": user.companyWebsite,
      "How Large Is Your Sales Team?": user.teamMembers,
      "What outcome would make sales training a massive win for you?": user.goal,
      "What Are the Biggest Challenges You or Your Sales Team Is Facing?": user.challenges,
      "If you were confident that our sales training would help your team achieve these goals, what investment range would you feel comfortable with?": user.directInvest,
      "When Are You Looking to Implement Sales Training?": user.when,
      "Preferred Mode of Contact":
        user.contactMode,
      "Created At": formatDate(user.createdAt), 
        "Connected":user.connected,
        "Connected By":user.connectedBy
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "Clients.xlsx");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          pt: "2rem",
          mb: "2rem",
        }}
      >
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          variant="outlined"
          sx={{
            width: { xs: "15rem", md: "20rem" },
            borderRadius: "2rem",
            "& .MuiOutlinedInput-root": {
              height: "2.2rem",
              "& fieldset": {
                borderColor: "black",
                borderRadius: "2rem",
              },
              "&:hover fieldset": {
                borderColor: "#FE5E00",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FE5E00",
              },
              "& input": {
                height: "auto",
                padding: "0.75rem",
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          overflow: "scroll",
          m: "auto",
          width: `75vw`,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "1rem",
            overflow: "scroll",
            m: "auto",
            height: "55vh",
          }}
        >
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead sx={{position:"sticky", pb:"4rem"}}>
              <TableRow sx={cellStyle}>
                <TableCell sx={stickyStyle}></TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                   First Name
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    Last Name
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  Email
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    Phone Number
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  Company Name
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  Company Website
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  How Large Is Your Sales Team?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
What outcome would make sales training a massive win for you?                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  What Are the Biggest Challenges You or Your Sales Team Is Facing?                   </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  If you were confident that our sales training would help your team achieve these goals, what investment range would you feel comfortable with?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  When Are You Looking to Implement Sales Training?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  Preferred Mode of Contact                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                  Created At                 </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={{ width: "80px", height: "3rem", }}>Contacted</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={{ width: "100px", height: "3rem", }}>Contacted By</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
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
                        gap: "0.5rem",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          color: "#0445AF",
                        }}
                      >
                        {index + 1})
                      </Typography>{" "}
                      <HighlightOffIcon
                        onClick={() => handleOpen(row)}
                        sx={{
                          color: "#4b4b4b",
                          ":hover": {
                            cursor: "pointer",
                            transform: "scale(1.04)",
                            color: "#c72525",
                            transition:
                              "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                          },
                        }}
                      />
                      <CenterFocusWeakIcon
                        onClick={() => handleReadFucn(row)}
                        sx={{
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
         

                  <TableCell align="left">
                    <Typography sx={cellStyle}>
                      {formatName(row.name)}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>
                      {formatName(row.lastName)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.email}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.phone}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.companyName}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.companyWebsite}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.teamMembers}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.goal}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.challenges}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.directInvest}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.when}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.contactMode}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{formatDate(row.createdAt)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {row.connected ? (
                      <ThumbUpAltIcon
                        onClick={() => noContFunc({ userId: row._id })}
                        sx={{
                          color: "#24a062",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <ThumbDownIcon
                        onClick={() => contFunc({ userId: row._id })}
                        sx={{
                          color: "#cc2525",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                        }}
                      />
                    )}{" "}
                  </TableCell>

                  <TableCell sx={{ minWidth: "150px" }} align="left">
                    {formatName(row.connectedBy)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              mb: 5,
              textAlign: "center",
              backgroundColor: "#F2F2F2",
              color: "#494b56",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",

              "&:hover": {
                backgroundColor: "#000000",
                color: "white",
              },
            }}
            onClick={handleClientOpen}
          >
            <AddCircleIcon sx={{ mr: "0.5rem" }} />
            CREATE
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              mb: 5,
              textAlign: "center",
              backgroundColor: "#F2F2F2",
              color: "#494b56",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",

              "&:hover": {
                backgroundColor: "#000000",
                color: "white",
              },
            }}
            onClick={handleExport}
          >
            <CloudDownloadIcon sx={{ mr: "0.5rem" }} />
            EXPORT
          </Button>
        </Box>
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
