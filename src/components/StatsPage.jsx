import React, { useEffect, useState } from 'react';
import useDataCall from "../hooks/useDataCall";
import { useSelector } from 'react-redux';
import { Box, Typography, Button} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import * as XLSX from "xlsx";
import ModalUnstyled from "../components/DeleteClientModal";
import NestedModal from "./CreateClientModal";
import ReadNestedModal from "./ReadClientModal";

const StatsPage = () => {
  const { listClients } = useDataCall();
  const { clients } = useSelector((state) => state.appData);
  const [clientOpen, setClientOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [readOpen, setReadOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    listClients();
  }, []);

  const groupByDate = (clients) => {
    const groupedData = {};

    clients.forEach(client => {
      const date = dayjs(client.createdAt).format('DD.MM.YY');
      if (!groupedData[date]) {
        groupedData[date] = 0;
      }
      groupedData[date]++;
    });
    return Object.entries(groupedData).map(([date, count]) => ({ date, count }));
  };

    const handleClientOpen = () => {
    setClientOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };
  const data = groupByDate(clients);

  const filterUsers = clients?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.email?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.phone.includes(search)
  );

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

    const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };



    const handleExport = () => {
    const data = filterUsers?.map((user) => ({
      "First Name": formatName(user.name),
      "Last Name": user.lastName,
      Email: user.email,
      "Phone Number": user.phone,
      "Company Name": user.companyName,
      "Company Website": user.companyWebsite,
      "How Large Is Your Sales Team?": user.teamMembers,
      "What outcome would make sales training a massive win for you?":
        user.goal,
      "What Are the Biggest Challenges You or Your Sales Team Is Facing?":
        user.challenges,
      "If you were confident that our sales training would help your team achieve these goals, what investment range would you feel comfortable with?":
        user.directInvest,
      "When Are You Looking to Implement Sales Training?": user.when,
      "Preferred Mode of Contact": user.contactMode,
      "Created At": formatDate(user.createdAt),
      Connected: user.connected,
      "Connected By": user.connectedBy,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "Clients.xlsx");
  };

  return (
    <Box sx={{width:"100%", maxHeight:"30rem", padding:"0 2rem"}}>
      <Typography sx={{fontSize:"1.5rem", fontWeight:"700", pb:"2rem", m:"auto"}}>Client Creation Statistics</Typography>
 <ResponsiveContainer width="100%" height={400}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis 
  dataKey="date"
  tick={{
    fontSize: 10,
    angle: -45,
    dy: 10,
  }}
/>
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>


       <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  paddingTop: "2rem",
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
                    fontSize:"0.75rem",
      
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
                          fontSize:"0.75rem",

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

export default StatsPage;
