import { Box, Button, FormControl, MenuItem, Paper, Select, Typography } from "@mui/material";
import { StyledTxtField } from "../LoginComponent/LoginTxtFieldStyled";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SubjectGradesPayload } from "../../interfaces/SubjectGradesPayload";
import { addNewGrade } from "../../services/GradesApi";
import SaveIcon from '@mui/icons-material/Save';
import GradeFormComponent from "./GradeFormComponent";


const AddGradeComponent = () => {

    const { state } = useLocation();
    const { subjectId } = state;
    const {schoolYearId} = state;
    const { studentId } = useParams<{ studentId: string }>();
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    const [description, setDescription] = useState('')


  const  handleSubmit = (date:string,grade:string,description:string) => {
    const subGrade:SubjectGradesPayload = {

        studentId : Number(studentId),
        date : date,
        grade : Number(grade),
        finalSubjectGrade : false,
        description : description,
        subjectId : subjectId,
        schoolYearId : schoolYearId

    }
    addNewGrade(subGrade).then((resp) =>{
        console.log(resp.status)
        if(resp.status==200){
            alert("Uspjesno dodana ocjena");
        }
    })
   }

   const actions  =  {onClick: handleSubmit };
   
    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={8}>
            <Paper elevation={3} style={{ padding: '16px', width: '100%', maxWidth: '500px' }}>
                <GradeFormComponent titleParam={"Dodaj ocjenu"} dateParam={date} gradeParam={grade} descriptionParam={description} actionParam={actions}></GradeFormComponent>
            </Paper>
        </Box>
    )

}

export default AddGradeComponent;