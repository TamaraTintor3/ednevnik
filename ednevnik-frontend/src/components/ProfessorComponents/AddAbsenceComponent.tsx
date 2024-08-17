import Ract, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';
import { addAbsence } from '../../services/AbsenceApi';
import { StyledTxtField } from '../LoginComponent/LoginTxtFieldStyled';



const AddAbsenceComponent = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [dateOfAbsence, setDateOfAbsence] = useState('');
  const [reason, setReason] = useState('');
  const [numberOfClasses, setNumberOfClasses] = useState<number | ''>('');
  const [errors, setErrors] = useState({
      dateOfAbsence: '',

      numberOfClasses: ''
  });
  const validate = () => {
    const newErrors = {
        dateOfAbsence: '',
 
        numberOfClasses: ''
    };

    if (!dateOfAbsence) {
        newErrors.dateOfAbsence = "Datum izostanka je obavezan.";
    }

 

    if (numberOfClasses === '' || isNaN(Number(numberOfClasses))) {
        newErrors.numberOfClasses = "Broj časova je obavezan i mora biti broj.";
    } 
    
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== '');
};

const handleSubmit = async () => {
  if (!validate()) {
      return;
  }

  const absenceData = {
      dateOfAbsence,
      numberOfClasses: Number(numberOfClasses),
      studentId: Number(studentId),
      approved: false
  };
  console.log("Poslati podaci:", absenceData);
  try {
      await addAbsence(absenceData);
      alert("Izostanak uspješno dodat");
  } catch (error) {
      console.error("Greška prilikom dodavanja izostanka:", error);
  }
};



  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={8}>
            <Paper elevation={3} style={{ padding: '16px', width: '100%', maxWidth: '500px' }}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6" gutterBottom>
                        Dodaj Izostanak
                    </Typography>


                    <label>DATUM IZOSTANKA</label>
                    <StyledTxtField
                        margin="none"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={dateOfAbsence}
                        onChange={(e) => setDateOfAbsence(e.target.value)}
                        error={!!errors.dateOfAbsence}
                        helperText={errors.dateOfAbsence}
                    />
                    <label>BROJ ČASOVA</label>
                    { <StyledTxtField
                        margin="none"
                        variant="outlined"
                        type="number"
                        value={numberOfClasses}
                        onChange={(e) => setNumberOfClasses(e.target.value ? Number(e.target.value) : '')}
                        error={!!errors.numberOfClasses}
                        helperText={errors.numberOfClasses}
                    /> }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            marginTop: '20px',
                            backgroundColor: '#3c3c3c',
                            color: '#fff',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: '#606060'
                            }
                        }}
                    >
                        Dodaj Izostanak
                    </Button>
                </Box>
            </Paper>
        </Box>
  )
}


export default AddAbsenceComponent