import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { getParentByUserId } from "../../services/ParentApi";
import { useAuth } from "../../contexts/AuthenticationContext";
import { getCurrentSchoolYear } from "../../services/SchoolClassApi";
import { IschoolYearInitial } from "../../models/ISchoolYear";
import { getStudentByParentId, getStudentGradesByParentId } from "../../services/StudentApi";
import TableComponent from "../TableComponent/TableComponent";
import { Grade, Padding } from "@mui/icons-material";
import { GradeEnum } from "../../enums/GradeEnum";
import { initialStudent } from "../../models/IStudentDetails";
import { MenuItem, Select, Typography, SelectChangeEvent as MuiSelectChangeEvent } from "@mui/material";
import { getAllSubjects } from "../../services/SubjectApi";

const ParentHomePageComponent = () => {

    const [parentId, setParent] = useState(0);
    const [schoolYear, setScholYear] = useState(IschoolYearInitial);
    const [grades, setGrades] = useState<any>([]);
    const [student, setStudent] = useState(initialStudent);
    const [subjets, setSubjects] = useState<any>([]);
    const authentication = useAuth();
    const [defaultSelectedValue, setDefaultSelectedValue] = useState('0');
    const [counter, setCounter] = useState(1);
    const [keyTable, setKeyTable] = useState(0);
    const [tableGradesData, setTableGradesData] = useState<any>([]);


    const columns = [
        { header: "Predmet", field: "subjectSubjectName" },
        { header: "Ocjena", field: "grade" },
        { header: "Datum", field: "date" },
        { header: "Opis", field: "description" },
    ];

    useEffect(() => {


        let parent = 0;
        getParentByUserId(authentication?.getUserId()).then((response) => {
            parent = response.data.parentId

            setParent(response.data.parentId);
            setCounter(counter => counter + 1);
            getStudentByParentId(response.data.parentId).then((resp) => {
                setStudent(resp?.data);
            })


            getCurrentSchoolYear().then((resp) => {
                console.log(resp.data);
                setScholYear(resp.data);
                getStudentGradesByParentId(response.data.parentId, resp.data.schoolYearId).then((resp) => {
                    console.log(resp?.data)
                    setGrades(resp?.data);
                    setTableGradesData(resp?.data);
                })
                setCounter(counter => counter + 1);
            })

        })


        getAllSubjects().then((resp) => {
            setSubjects(resp.data);
        })



    }, [])


    const handleChange = (event: MuiSelectChangeEvent<string>) => {
        setDefaultSelectedValue(event.target.value as string);
        if (event.target.value === '0') {
            setTableGradesData(grades);
            setKeyTable(key => key + 1);
        } else {
            const newArray = grades.filter((grade: any) => {
                console.log(grade.subjectSubjectId)
                console.log(event.target.value)
                return grade.subjectSubjectId === event.target.value;
            });
            console.log("-----------" + newArray)
            setTableGradesData(newArray);
            setKeyTable(key => key + 1);
        }


    };

    return (
        <div>
            <Typography>
                Školska godina: {schoolYear.year}
            </Typography>
            <Typography>
                Polugodište: {schoolYear.semester}
            </Typography>
            <Typography>
                Učenik: {student.firstName}  {student.lastName}
            </Typography>
            <div style={{ paddingBottom: "10px" }}>
                Filtriraj po predmetu <Select value={defaultSelectedValue}
                    onChange={handleChange}>
                    <MenuItem value={'0'}>{"Svi"}</MenuItem>
                    {subjets.map((s: any) =>
                        <MenuItem value={s.subjectId}>{s.name}</MenuItem>
                    )}
                </Select>
            </div>

            <TableComponent key={keyTable} actions={[]} columns={columns} data={tableGradesData.map((g: any) => ({
                ...g,
                grade: "(" + g.grade + ") " + GradeEnum[Number(g.grade)],
            }))}></TableComponent>
        </div>
    )

}

export default ParentHomePageComponent;