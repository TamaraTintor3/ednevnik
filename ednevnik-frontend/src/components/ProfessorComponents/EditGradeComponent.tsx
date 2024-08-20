import { Box, Button, FormControl, MenuItem, Paper, Select, Typography } from "@mui/material";
import { StyledTxtField } from "../LoginComponent/LoginTxtFieldStyled";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SubjectGradesPayload } from "../../interfaces/SubjectGradesPayload";
import { addNewGrade, editGrade, getGradesbySchoolClassIdAndProfessorId } from "../../services/GradesApi";
import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';
import GradeFormComponent from "./GradeFormComponent";
import TableComponent from "../TableComponent/TableComponent";
import { initialStudentsTable } from "../../models/IStudentTable";
import { initialGrade, initialGradeArray } from "../../models/IGrades";


const EditGradeComponent = () => {

    const { state } = useLocation();
    const { subjectId } = state;
    const { schoolYearId } = state;
    const {classId} = state;
    const {profId} = state;
    const { studentId } = useParams<{ studentId: string }>();
    const [students, setStudents] = useState(initialStudentsTable);
    const [grade, setGrade] = useState(initialGrade);
    const [data1, setData1] = useState(initialGradeArray);
    const [data2, setData2] = useState(initialGradeArray);
    const [isVisible, setIsVisible] = useState(false);
    const [key, setKey] = useState(0);
    const [keyTable, setKeyTable] = useState(0);


    const handleEditClick = (d:any) => {

        setGrade(d);
        setKey((k) => k + 1)
        setIsVisible(true);
    }





    const columns1 = [
        { header: 'Ocjene(Pismeni)', field: 'gradeDesc' },
    
    ];
    const columns2 = [
        { header: 'Ocjene(Usmeni)', field: 'gradeDesc' }
    ];

    const actionsTable = [
        { icon: <EditNoteIcon titleAccess='Izmjeni ocjenu' sx={{ color: 'gray' }} />, onClick: handleEditClick }
    ]

   

    useEffect(() => {
        

        getGradesbySchoolClassIdAndProfessorId(Number(classId), profId)
        .then((response) => {
            setStudents(response.data);
            response.data.forEach((element :any) => {
                if(element.studentId==Number(studentId)){
                    setData1(element.gradesWritten);
                    setData2(element.gradesVerbal);
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });


    },[grade,keyTable]
    )

    const handleSubmit = (date: string, gradeNew: string, description: string) => {
        const subGrade: SubjectGradesPayload = {

            studentId: Number(studentId),
            date: date,
            grade: Number(gradeNew),
            finalSubjectGrade: false,
            description: description,
            subjectId: subjectId,
            schoolYearId: schoolYearId

        }
        editGrade(subGrade, grade.subjectGradesId).then((resp) => {
            console.log(resp.status)
            if (resp.status == 200) {
                setKeyTable((k) => k + 1)
                alert("Uspjesno izmijenjena ocjena");
                
            }
        })
    }

    const actions = { onClick: handleSubmit };

    return (
        <Box display="flex" alignItems="center" p={8} >
            <div key={keyTable} style={{ width: '50%', display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
                <div style={{ paddingTop: '10px', width: '50%' }}>
                    <TableComponent columns={columns1} data={data1.map((d) => ({
                     ...d,
                     gradeDesc : "(" + d.date + ") " +  d.grade 
                   }))} actions={actionsTable}></TableComponent>
                </div>
                <div style={{ paddingTop: '10px', width: '50%' }}>
                    <TableComponent columns={columns2} data={data2.map((d) => ({
                     ...d,
                     gradeDesc : "(" + d.date + ") " +  d.grade 
                   }))} actions={actionsTable}></TableComponent>
                </div>
            </div>

            <Paper key={key} elevation={1} style={{ padding: '16px', height: 'calc(100vh - 300px)', width: '50%', display: 'flex', flexDirection: 'row' }}>
                {isVisible ? <GradeFormComponent titleParam={"Izmijeni ocjenu"} dateParam={grade.date} gradeParam={String(grade.grade)} descriptionParam={grade.description} actionParam={actions}></GradeFormComponent> : null}


            </Paper>
        </Box>
    )

}

export default EditGradeComponent;