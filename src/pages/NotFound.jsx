import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Box sx={{   width: "100wh", height:"100vh", display:"flex", justifyContent:"center", mt:"5rem"}}>

        <Typography variant="h4" sx={{fontWeight:"600", fontFamily: "Helvetica sans-serif"}}>Page Not Found</Typography>
    </Box>
    )
}

export default NotFound