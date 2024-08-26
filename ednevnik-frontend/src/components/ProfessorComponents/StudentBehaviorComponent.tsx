import React, {useEffect, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Box, Button, Typography, Paper } from "@mui/material";
import axiosInstance from '../../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { StyledTxtField } from '../LoginComponent/LoginTxtFieldStyled';
import SaveIcon from '@mui/icons-material/Save';


interface StudentClass {
  studentClassId?: number;
  studentStudentId: number;
  schoolClassId?: number; 
  behavior: string;
  finalGrade: number;
}

const StudentBehaviorComponent = () => {
  const { state } = useLocation();
  const { schoolClassId: locationSchoolClassId } = state || {};
  const { studentId } = useParams();
  console.log(studentId);
  const [studentClass, setStudentClass] = useState<StudentClass>({
    studentStudentId: Number(studentId),
    behavior: '',
    finalGrade: 0,
    schoolClassId: locationSchoolClassId
});

    const [isNew, setIsNew] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      console.log("Location state:", state);
      console.log("schoolClassId from location:", locationSchoolClassId);
  
      axiosInstance.get(`/api/student-classes/${studentId}`)
        .then(response => {
          if (response.data.length > 0) {
            const data = response.data[0];
            setStudentClass({
              ...data,
              studentStudentId: Number(studentId),
              schoolClassId: data.schoolClass?.schoolClassId || locationSchoolClassId
            });
            setIsNew(false);
          }
        })
        .catch(error => {
          console.error("Greška prilikom prikaza podataka!", error);
        });
    }, [studentId, locationSchoolClassId]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setStudentClass(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const url = isNew ? '/api/student-classes/add' : `/api/student-classes/update/${studentClass.studentClassId}`;
      const method = isNew ? 'POST' : 'PUT';
  
      const dataToSend = {
        ...studentClass,
        schoolClassId: studentClass.schoolClassId 
      };
  
      console.log('Sending data:', dataToSend);
  
      axiosInstance({ method, url, data: dataToSend })
        .then(response => {
          console.log("Response Data:", response.data); 
          alert("Uspješno sačuvani podaci!");
          navigate(`/studentBehavior/${studentId}`);
        })
        .catch(error => {
          console.error("Došlo je do greške priliko čuvanja podataka!", error);
        });
    };
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={8}>
        <Paper  style={{ padding: 20 }}>
            <Typography variant="h5">{isNew ? 'Dodaj' : 'Uredi'} vladanje i završnu ocjenu za učenika</Typography>
            
            <form onSubmit={handleSubmit}>
              <label>VLADANJE</label>
                <StyledTxtField
                    name="behavior"
                    variant="outlined"
                    value={studentClass.behavior}
                    onChange={handleChange}
                    fullWidth
                    margin="none"
                />
                <label>ZAVRŠNA OCJENA</label>
                <StyledTxtField
                    name="finalGrade"
                    variant="outlined"
                    type="number"
                    value={studentClass.finalGrade}
                    onChange={handleChange}
                    fullWidth
                    margin="none"
                />
                <Button startIcon={<SaveIcon/>} type="submit"  color="primary" sx={{ color: 'gray' }} style={{ marginTop: 20 }}>
                    Sačuvaj
                </Button>
            </form>
        </Paper>
        </Box>
    );
};


export default StudentBehaviorComponent