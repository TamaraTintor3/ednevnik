import { useEffect, useState } from "react";
import { getAllSubjects } from "../../services/SubjectApi";
import TableComponent from "../TableComponent/TableComponent";
import { Box, Button, Typography } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from "react-router-dom";

const SubjectsComponent = () => {

    const columns: any = [
        { header: 'Naziv predmeta', field: "name" },
        { header: 'Professor', field: "professor" }
    ]


    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getAllSubjects().then((resp) => {
            console.log(resp.data)
            setData(resp.data);
        })
    }, [])

    const handleAddSubject = () => {
        navigate("/addSubject");
    }

    return (
        <div>
            <Box pt={2} display="flex" alignItems="center">
                <Typography>Dodaj predmet</Typography>
                <Button
                    sx={{ color: "gray" }}
                    startIcon={<PlaylistAddIcon />}
                    onClick={handleAddSubject}
                />
            </Box>
            <br></br>
            <br></br>
            <hr></hr>
            <TableComponent columns={columns} data={data.map((s: any) => ({
                ...s,
                professor: s.professor.userFirstName + " " + s.professor.userLastName,
            }))} actions={[]}></TableComponent>
        </div>
    )
}
export default SubjectsComponent;