import { Box, Button, MenuItem, Select } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import { addTeaching, getProfessorsByClassId } from "../../services/TeachingApi";
import { useParams } from "react-router-dom";
import TableComponent from "../TableComponent/TableComponent";
import { getAllProfessors } from "../../services/ProfessorApi";
import { all } from "axios";
const AddProfessorToClassComponent = () => {


    const [selectedValue, setSelectedValue] = useState('');
    const [professors, setProfessors] = useState<any>([]);
    const [allProfessors, setAllProfessors] = useState<any>([]);
    const [assignedProfessors, setAssignedProfessors] = useState<any>([]);
    const { id } = useParams<{ id: string }>();

    const columns = [
        { header: "Ime", field: "userFirstName" },
        { header: "Prezime", field: "userLastName" }
    ]


    useEffect(() =>{

        getProfessorsByClassId(Number(id)).then((resp) => {
            setAssignedProfessors(resp.data);
        
        })
        getAllProfessors().then((response) => {
            setAllProfessors(response.data);
           
            
        })

     
        

    },[])

    const handleSave = () => {

        const teaching :any = {
            schoolClassId : id,
            professorId : selectedValue
        }

        addTeaching(teaching).then((resp) => {
            if(resp.status==200){
                alert("Uspjesno dodijeljen profesor");
            }
        })

    }

    return (
        <div>

            <div>
                <Box component="div" className="registrationContainer">
                    Dodijeljeni professori
<TableComponent columns={columns} data={assignedProfessors} actions={[]}></TableComponent>


                    <Box component="form" onSubmit={handleSave} noValidate autoComplete="off">

                        <Box pt={2}>
                            Izaberite profesora za razred
                            <br></br>
                            <Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                                {allProfessors.map((prof: any) => {
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
        </div>
    )
}
export default AddProfessorToClassComponent;