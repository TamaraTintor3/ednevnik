import { Box, Button, MenuItem, Select } from "@mui/material";
import { StyledTxtField } from "../LoginComponent/LoginTxtFieldStyled";
import { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { getProfessorsWithoutSubject } from "../../services/ProfessorApi";
import { addSubject } from "../../services/SubjectApi";
const AddSubject = () => {


    const [subjectName, setSubjectName] = useState('');
    const [selectedValue, setSelectedValue] = useState(' ');
    const [professors, setProfessors] = useState<any>([]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const subject: any = {
            name: subjectName,
            professorId: selectedValue
        }
        addSubject(subject).then((resp) => {
            if (resp.status == 200) {
                alert("Uspjesno dodan predmet!");
            }
        })
    }

    useEffect(() => {
        getProfessorsWithoutSubject().then((resp) => {
            console.log(resp.data)
            setProfessors(resp.data);
        })
    }, [])

    return (
        <div>
            <Box component="div" className="registrationContainer">




                <Box component="form" onSubmit={handleSave} noValidate autoComplete="off">
                    <Box pt={2}>
                        <label>Naziv predmeta</label>
                        <StyledTxtField
                            fullWidth
                            variant="outlined"
                            value={subjectName}
                            onChange={(e) => { setSubjectName(e.target.value); }
                            }

                            required
                            margin="none"
                        />
                    </Box>

                    <Box pt={2}>
                        Izaberite profesora za predmet
                        <br></br>
                        <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                            {professors.map((prof: any) => {
                                return (<MenuItem value={prof.professorId}>{prof.userFirstName + " " + prof.userLastName}</MenuItem>)
                            })}
                        </Select>
                    </Box>





                    <Button className='submitButton'
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

            </Box>
        </div>
    )
}
export default AddSubject;