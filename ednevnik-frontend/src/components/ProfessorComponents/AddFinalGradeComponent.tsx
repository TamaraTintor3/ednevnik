import { Box, Button, Container, FormControl, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import { StyledTxtField } from "../LoginComponent/LoginTxtFieldStyled";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SubjectGradesPayload } from "../../interfaces/SubjectGradesPayload";
import { addNewGrade, getGradesbySchoolClassIdAndProfessorId } from "../../services/GradesApi";
import SaveIcon from '@mui/icons-material/Save';
import GradeFormComponent from "./GradeFormComponent";
import TableComponent from "../TableComponent/TableComponent";
import { initialGrade, initialGradeArray } from "../../models/IGrades";
import { initialStudentsTable } from "../../models/IStudentTable";
import moment from 'moment';


const AddFinalGradeComponent = () => {

    const { state } = useLocation();
    const { subjectId } = state;
    const { schoolYearId } = state;
    const { classId } = state;
    const { profId } = state;
    const [grade, setGrade] = useState('');
    const [averageGrade, setAverageGrade] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);

    const { studentId } = useParams<{ studentId: string }>();
    const [data1, setData1] = useState(initialGradeArray);
    const [data2, setData2] = useState(initialGradeArray);

    const columns1 = [
        { header: 'Ocjene(Pismeni)', field: 'gradeDesc' },

    ];
    const columns2 = [
        { header: 'Ocjene(Usmeni)', field: 'gradeDesc' }
    ];



    const dateToDateFormat = (date:any) => {
        const obj = date.split(/\//);
        return `${obj[1]}-${obj[0]}/${obj[2]}`;
      };

    useEffect(() => {

        


        getGradesbySchoolClassIdAndProfessorId(Number(classId), profId)
            .then((response) => {
                response.data.forEach((element: any) => {
                    if (element.studentId == Number(studentId)) {
                        setData1(element.gradesWritten);
                        setData2(element.gradesVerbal);
                        element.gradesWritten.forEach((el:any) => {

                            setAverageGrade((g) => g + el.grade);
                            setNumberOfElements((n) => n + 1);
                        });
                        element.gradesVerbal.forEach((el:any) => {

                            setAverageGrade((g) => g + el.grade);
                            setNumberOfElements((n) => n + 1);
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    
       
    }, []);

    const handleAddFinalGrade = () => {

        let currentDate = moment(new Date).format('YYYY-MM-DD');
      

        const subGrade:SubjectGradesPayload = {

            studentId : Number(studentId),
            date : currentDate,
            grade : Number(grade),
            finalSubjectGrade : true,
            description : 'USMENI',
            subjectId : subjectId,
            schoolYearId : schoolYearId
    
        }

        addNewGrade(subGrade).then((resp) =>{
            console.log(resp.status)
            if(resp.status==200){
                alert("Uspjesno zaključena ocjena");
            }
        })

    }

    return (
        <Container>
            <Grid container direction='row'>
                <Grid style={{ width: '45%', display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
                    <div style={{ paddingTop: '10px', width: '50%' }}>
                        <TableComponent columns={columns1} data={data1.map((d) => ({
                            ...d,
                            gradeDesc: "(" + d.date + ") " + d.grade
                        }))} actions={[]}></TableComponent>
                    </div>
                    <div style={{ paddingTop: '10px', width: '50%' }}>
                        <TableComponent columns={columns2} data={data2.map((d) => ({
                            ...d,
                            gradeDesc: "(" + d.date + ") " + d.grade
                        }))} actions={[]}></TableComponent>
                    </div>
                </Grid>
                <Paper elevation={1} style={{ padding: '16px', height: 'calc(100vh - 300px)', width: '50%', display: 'flex', flexDirection: 'row' }}>

                    <Box display="flex" flexDirection="column" width="100%">
                        <Typography variant="h6" gutterBottom>
                            Predložena zaključna ocjena

                        </Typography>



                        <Box pt={2}>

                        </Box>
                        <Box pt={2}>
                            <FormControl fullWidth className="formControl" variant="outlined" required>
                                <label>Prosječna ocjena</label>
                                <StyledTxtField
                                    margin="none"
                                    variant="outlined"
                                    type="text"
                                    value={averageGrade / numberOfElements}
                                    contentEditable='false'
                                />
                            </FormControl>
                        </Box>
                        <Box pt={2}>
                            <FormControl fullWidth className="formControl" variant="outlined" required>
                                <label>OCJENA</label>
                                <Select
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    className="selectInput">
                                    <MenuItem value="1">NEDOVOLJAN (1)</MenuItem>
                                    <MenuItem value="2">DOVOLJAN (2)</MenuItem>
                                    <MenuItem value="3">DOBAR (3)</MenuItem>
                                    <MenuItem value="4">VRLO DOBAR (4)</MenuItem>
                                    <MenuItem value="5">ODLIČAN (5)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddFinalGrade}
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
                        ><SaveIcon></SaveIcon>
                            Sačuvaj
                        </Button>
                    </Box>


                </Paper>
            </Grid>

        </Container>
    )

}

export default AddFinalGradeComponent;