import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { Box, Button, Typography, MenuItem, Select, InputLabel, FormControl, Paper } from "@mui/material";
import { getAllProfessors, assignClassToProfessor, getProfessorBySchoolClassId } from "../../services/ProfessorApi";
import { SelectChangeEvent } from "@mui/material";
import { AxiosError } from 'axios';
import SaveIcon from '@mui/icons-material/Save';

interface Professor {
    userId: number;
    firstName: string;
    lastName: string;
    username: string; 
  }
const AddClassProfessorComponent = () => {
    const { id } = useParams<{ id: string }>();
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [selectedProfessorId, setSelectedProfessorId] = useState<number | string>('');
    const [currentProfessor, setCurrentProfessor] = useState<Professor | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
   
    useEffect(() => {
      let isMounted = true;

      const fetchData = async () => {
          try {
              const professorResponse = await getAllProfessors();
              if (isMounted) {
                  setProfessors(professorResponse.data);

                  if (id) {

                      const currentProfessorResponse = await getProfessorBySchoolClassId(parseInt(id));
                      console.log("Current Professor Response:", currentProfessorResponse.data);
                      const currentProfessorData = currentProfessorResponse.data;

                      if (currentProfessorData) {
                          setCurrentProfessor(currentProfessorData);
                          setSelectedProfessorId(currentProfessorData.userId); 
                      } else {
                          setCurrentProfessor(null);
                          setSelectedProfessorId(''); 
                      }
                  }
              }
          } catch (error) {
              console.log('Error:', error);
          }
      };

      fetchData();

      return () => {
          isMounted = false;
      };
  }, [id]);

    const handleProfessorChange = (event: SelectChangeEvent<string | number>) => {
        const professorId = event.target.value as number;
        console.log("Professor selected:", professorId);
        setSelectedProfessorId(professorId);
    };
  
    const handleAssignProfessor = async () => {
      try {
          setErrorMessage(null);      
          await assignClassToProfessor(selectedProfessorId as number, parseInt(id || "0"));
          alert("Uspjesno dodavanje profesora");  
          const updatedProfessorResponse = await getProfessorBySchoolClassId(parseInt(id || "0"));
          const updatedProfessorData = updatedProfessorResponse.data;
  
          if (updatedProfessorData) {
              setCurrentProfessor(updatedProfessorData);
              setSelectedProfessorId(updatedProfessorData.userId);
          } else {
              setCurrentProfessor(null);
              setSelectedProfessorId('');
          }
      } catch (error) {
       
          if (error instanceof AxiosError) {
            setErrorMessage(error.response?.data?.message || "Izabrani profesor je razredni drugom odjeljenju.");
        } else {
            setErrorMessage("Izabrani profesor je razredni drugom odjeljenju.");
        }
        console.log("Error assigning professor:", error);
    }
  };
    return (
      <Box>
        {currentProfessor ? (
          <Typography variant="subtitle1">
              Razredni starješina:  {currentProfessor.firstName} {currentProfessor.lastName}
          </Typography>
      ) : (
          <Typography variant="subtitle1">Razredni starješina: Odjeljenje trenutno nema izabranog razrednog</Typography>
      )}

  
      {errorMessage && (
          <Typography variant="subtitle1" color="error">
              {errorMessage}
          </Typography>
      )}
      <Box display="flex"
      justifyContent="center"
      alignItems="center"
      p={8}> 
      
      <Paper elevation={3} style={{ padding: '16px', width: '100%', maxWidth: '500px' }}>
      <Typography variant="h5">Dodijeli razrednog profesora</Typography> 
      <FormControl fullWidth>
          <InputLabel>Izaberi profesora</InputLabel>
          <Select
              value={selectedProfessorId}
              onChange={handleProfessorChange}
          >
              {professors.map((professor) => (
                  <MenuItem key={professor.userId} value={professor.userId}>
                      {professor.username}
                  </MenuItem>
              ))}
          </Select>
      </FormControl>

      <Box pt={2}>
      <Button className='submitButton'
                onClick={handleAssignProfessor}
                type="submit" variant="contained" fullWidth sx={{
                    marginTop: '20px',
                    backgroundColor: '#3c3c3c',
                    color: '#fff',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#606060'
                    }
                }}><SaveIcon />Sačuvaj</Button>
          
      </Box>
      </Paper>
  </Box>
  </Box>
    );
}

export default AddClassProfessorComponent