import React from "react";
import CardsComponent from "../CardComponents/CardsComponent";
import { Box, Button, Typography } from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from "react-router-dom";

const ClassesComponent = () => {
  const navigate = useNavigate();
  const handleAddClass = () => {
        navigate('/addSchoolClass');
  }
  return (
    <div>
      <Box pl={11} display="flex" alignItems="center" >
        <Typography>Dodaj odjeljenje</Typography>
        <Button onClick={handleAddClass} sx={{ color: 'gray' }} startIcon={<AddCardIcon/>}/>
      </Box>
      <Box pt={2}>
      <CardsComponent></CardsComponent>
      </Box>
    </div>
  );
};

export default ClassesComponent;
