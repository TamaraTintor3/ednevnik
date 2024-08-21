import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getStudentClass, saveOrUpdateStudentClass } from '../../services/BehaviorApi'
import { TextField, Button, Typography } from "@mui/material";

const StudentBehaviorComponent = () => {
  const { studentClassId } = useParams();
  const [studentClass, setStudentClass] = useState({
    studentClassId: '',
    studentId: '',
    schoolClassId: '',
    behavior: '',
    finalGrade: ''
  });

  useEffect(() => {
    if (studentClassId) {
        console.log("Student Class ID:", studentClassId); 
      getStudentClass(Number(studentClassId))
        .then((response) => {
          console.log("Response Data:", response.data); 
          setStudentClass(response.data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error); 
        });
    }
  }, [studentClassId]);
      function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setStudentClass((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      function handleSave() {
        if (studentClass.studentClassId) {
          saveOrUpdateStudentClass(studentClass)
            .then(() => {
              console.log("Data saved successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

  return (
    <div>
        <Typography variant="h4">Uredi vladanje i završnu ocenu</Typography>
    <TextField
      name="behavior"
      label="Vladanje"
      value={studentClass.behavior}
      onChange={handleInputChange}
      fullWidth
    />
    <TextField
      name="finalGrade"
      label="Završna ocena"
      value={studentClass.finalGrade}
      onChange={handleInputChange}
      fullWidth
    />
    <Button onClick={handleSave}>Sačuvaj</Button>
  </div>
   
  )
}

export default StudentBehaviorComponent