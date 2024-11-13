import React, { useEffect } from 'react';
import useDataCall from "../hooks/useDataCall";
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const StatsPage = () => {
  const { listClients } = useDataCall();
  const { clients } = useSelector((state) => state.appData);

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

  const data = groupByDate(clients);

  return (
    <Box sx={{width:"50vw", maxHeight:"30rem"}}>
      <Typography sx={{fontSize:"1.5rem", fontWeight:"700", pb:"2rem", m:"auto"}}>Client Creation Statistics</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StatsPage;
