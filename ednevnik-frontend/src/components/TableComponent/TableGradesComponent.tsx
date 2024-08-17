import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthenticationContext";
import { getGradesbySchoolClassIdAndProfessorId } from "../../services/GradesApi";
import { getProfessorByUserId } from "../../services/UserApi";
import { useProfessorContext } from "../../contexts/ProfessorContext";
import React from "react";
import { initialStudentsTable } from "../../models/IStudentTable";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from "react-router-dom";


const TableGradesComponent = () => {


    const { id } = useParams();
    const [students, setStudents] = useState(initialStudentsTable);
    const [profId, setProfId] = useState(0);
    const authentiaction = useAuth();
    const professorContext = useProfessorContext();
    const navigate = useNavigate();
    React.useEffect(() => {

        console.log("+++++" + professorContext?.professorId)

        getProfessorByUserId(authentiaction?.getUserId()).then(resp => {
            console.log(resp.data.professorId);
            setProfId(resp.data.professorId);
        })

        getGradesbySchoolClassIdAndProfessorId(Number(id), profId)
            .then((response) => {
                console.log(response.data)
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [profId]);

    const columns = [
        { header: "Ime" },
        { header: "Prezime" },
        { header: "Roditelj" },
        { header: "Ocjene(Pismeni)" },
        { header: "Ocjene(Usmeni)" }
    ];


    function addGrade(studentId: number) {
        //  console.log(studentId);
    }

    function addFinalGrade(studentId: number){

    }

    function editGrade(studentId: number){
        console.log("Edited grade")
    }

    function addAbsence(studentId: number){
        navigate(`/addAbsence/${studentId}`);
    }


    return (
        <TableContainer component={Paper} className="table-container">
            <Table stickyHeader className="table">
                <TableHead >
                    <TableRow>

                        {columns.map((column, index) => (
                            <TableCell key={index} className="header-cell" sx={{
                                backgroundColor: '#d6d6d6',
                                fontWeight: 'bold',
                            }}>{column.header}</TableCell>
                        ))}

                        <TableCell className="header-cell" sx={{ fontWeight: 'bold', backgroundColor: '#d6d6d6' }}>Akcije</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((s) => (

                        <TableRow>
                            <TableCell>{s.firstName}</TableCell>
                            <TableCell>{s.lastName}</TableCell>
                            <TableCell>{s.parent.userFirstName + " " + s.parent.userLastName}</TableCell>
                            <TableCell>
                                {s.gradesWritten?.map((g) => (
                                    <TableRow>{g.date + " (" + g.grade + ")"}</TableRow>
                                ))}

                            </TableCell>
                            <TableCell>
                                {s.gradesVerbal?.map((g) => (
                                    <TableRow>{g.date + " (" + g.grade + ")"}</TableRow>
                                ))}

                            </TableCell>
                            <TableCell>
                                <Tooltip title="Dodaj ocjenu">
                                    <IconButton onClick={() => addGrade(s.studentId)} sx={{ p: 0 }}>

                                        <PlaylistAddIcon />

                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Zaključi ocjenu">
                                    <IconButton onClick={() => addFinalGrade(s.studentId)} sx={{ p: 0 }}>

                                        <PlaylistAddCheckIcon />

                                    </IconButton>                
                                </Tooltip>

                                <Tooltip title="Izmjeni ocjenu" onClick={() => editGrade(s.studentId)} sx={{ p: 0 }}>
                                        <IconButton>
                                            <EditNoteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Dodaj izostanak" onClick={() => addAbsence(s.studentId)} sx={{ p: 0 }}>
                                    <IconButton>

                                        <PlaylistAddIcon />

                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>

                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableGradesComponent;