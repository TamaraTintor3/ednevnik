import { Box, Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { StyledTxtField } from "../LoginComponent/LoginTxtFieldStyled";
import SaveIcon from '@mui/icons-material/Save';
import { NumberLiteralType } from "typescript";
import { useState } from "react";


interface GradeFormComponentProps{
    
    dateParam : string;
    gradeParam : string;
    descriptionParam : string;
    actionParam : Action;
    titleParam:string;
 }

 interface Action {
    onClick: (item1: any, item2:any, item3:any) => void;
  }

const GradeFormComponent : React.FC<GradeFormComponentProps> = ({dateParam, gradeParam, descriptionParam, actionParam, titleParam}) => {


    const [date, setDate] = useState(dateParam);
    const [grade, setGrade] = useState(gradeParam);
    const [description, setDescription] = useState(descriptionParam)
    // const { state } = useLocation();
    // const { subjectId } = state;
    // const {schoolYearId} = state;
    // const { studentId } = useParams<{ studentId: string }>();
    // const [date, setDate] = useState('');
    // const [grade, setGrade] = useState('');
    // const [description, setDescription] = useState('')

    const [errors, setErrors] = useState({
        date: '',
        grade: '',
        description: ''
    });
    const validate = () => {
        const newErrors = {
            date: '',
            grade: '',
            description: ''
        };

        if (!date) {
            newErrors.date = "Datum ocjene je obavezan.";
        }
        if (grade === '') {
            newErrors.grade = "Ocjena je obavezno polje.";
        }
        if (description === '') {
            newErrors.description = "Opis je obavezno polje.";
        }
        setErrors(newErrors);

        return !Object.values(newErrors).some((error) => error !== '');
    };


//   const  handleSubmit = () => {
//     const subGrade:SubjectGradesPayload = {

//         studentId : Number(studentId),
//         date : date,
//         grade : Number(grade),
//         finalSubjectGrade : false,
//         description : description,
//         subjectId : subjectId,
//         schoolYearId : schoolYearId

//     }
//     addNewGrade(subGrade).then((resp) =>{
//         console.log(resp.status)
//         if(resp.status==200){
//             alert("Uspjesno dodana ocjena");
//         }
//     })
//    }

    return (
  
                <Box display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6" gutterBottom>
                         {titleParam}
                                      
                                             </Typography>


                    <label>DATUM</label>
                    <StyledTxtField
                        margin="none"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        error={!!errors.date}
                        helperText={errors.date}
                    />
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
                    <Box pt={2}>
                        <FormControl fullWidth className="formControl" variant="outlined" required>
                            <label>OPIS</label>
                            <Select
                                value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                className="selectInput">
                                <MenuItem value="PISMENI">PISMENI</MenuItem>
                                <MenuItem value="USMENI">USMENI</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                              onClick={() => actionParam.onClick(date,grade,description)}
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
           
    )

}

export default GradeFormComponent;