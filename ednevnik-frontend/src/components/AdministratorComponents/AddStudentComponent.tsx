import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, FormControl,  MenuItem, Paper, Select, Typography} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { StyledTxtField } from '../LoginComponent/LoginTxtFieldStyled';
import { fetchParents, addStudent} from '../../services/AdminApi';
import { Parent } from '../../interfaces/ParentInterface';


const AddStudentComponent = () => {

    const { id } = useParams<{ id: string }>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jmbg, setJmbg] = useState("");
    const [parentId, setParentId] = useState<number | ''>('');
    const [parents, setParents] = useState<Parent[]>([]);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        jmbg: '',
        parentId: ''
    });

    useEffect(() => {
        const loadParents = async () => {
            try {
                const parentsArray = await fetchParents();
                setParents(parentsArray);
            } catch (error) {
                console.error("Failed to fetch parents:", error);
            }
        };

        loadParents();
    }, []);

    const validate = () => {
        const newErrors = {
            firstName: '',
            lastName: '',
            jmbg: '',
            parentId: ''
        };

        if (!firstName.trim()) {
            newErrors.firstName = "Ime je obavezno.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Prezime je obavezno.";
        }

        if (!jmbg.trim() || !/^\d{13}$/.test(jmbg)) {
            newErrors.jmbg = "JMBG mora sadržati tačno 13 cifara.";
        }

        if (!parentId) {
            newErrors.parentId = "Izaberite roditelja.";
        }

        setErrors(newErrors);

        
        return !Object.values(newErrors).some((error) => error !== '');
    };


    const handleSubmit = async () => {
        
        if (!validate()) {
            return; 
        }
       
        const studentData = { firstName, lastName, jmbg, parentId: Number(parentId), schoolClassId: Number(id) };

        try {
            const response = await addStudent(studentData);
            console.log("Uspješno dodavanje učenika", response);
            alert("Uspješno dodavanje učenika");
        } catch (error: any) {
            console.error("Došlo je do greške prilikom dodavanja učenika:", error);
            if (error.response && error.response.data && typeof error.response.data === 'string') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    jmbg: error.response.data
                }));
            } else {
                alert("Student sa datim JMBG-om već postoji");
            }
        }
    };

    const handleParentChange = (e: SelectChangeEvent<number | ''>) => {
        const value = e.target.value;
        setParentId(value ? Number(value) : '');
    };

  return (
    <Box display="flex"
            justifyContent="center"
            alignItems="center"
            p={8}
            >
        <Paper elevation={3} style={{ padding: '16px', width: '100%', maxWidth: '500px' }}>
        <Box display="flex" flexDirection="column" >      
        <label>IME</label>                
        <StyledTxtField
        margin="none"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
        />        
        <label>PREZIME</label> 
        <StyledTxtField
        margin="none"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
        />
        <label>JMBG</label> 
        <StyledTxtField
        margin="none"
        variant="outlined"
        value={jmbg}
        onChange={(e) => setJmbg(e.target.value)}
        error={!!errors.jmbg}
        helperText={errors.jmbg}
        />
        
       <FormControl fullWidth margin="normal">
       <label>RODITELJ</label> 
                <Select
                    labelId="parent-select-label"
                    id="parent-select"
                    value={parentId || ''}
                    onChange={handleParentChange}
                    displayEmpty
                >
                    <MenuItem value="">Izaberite roditelja</MenuItem>
                    {parents.map((parent) => (
                        <MenuItem key={parent.parentId} value={parent.parentId}>
                            {parent.firstName} {parent.lastName}
                        </MenuItem>
                    ))}
                </Select>
                {errors.parentId && <Typography color="error">{errors.parentId}</Typography>}
            </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{
                                                marginTop: '20px',
                                                backgroundColor: '#3c3c3c',
                                                color: '#fff',
                                                borderRadius: '50px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#606060'
                                                }
                                            }}>
             Dodaj učenika
        </Button>
    </Box>
    </Paper>
    </Box>
  )
}

export default AddStudentComponent