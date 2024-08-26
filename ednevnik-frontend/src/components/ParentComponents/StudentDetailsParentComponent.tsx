import { Box, Tab, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import React, { useEffect, useState } from "react";
import GenericGradesTable from "../TableComponent/GenericGradesTable";
import { getParentByUserId } from "../../services/ParentApi";
import { useAuth } from "../../contexts/AuthenticationContext";
import { getStudentByParentId } from "../../services/StudentApi";
import { getCurrentSchoolYear } from "../../services/SchoolClassApi";
import { getFinalGrades, getFinalGradesData, getStudentGradesBySubjects } from "../../services/GradesApi";
import IStudentGrades from "../../models/IStudentGrades";
import { getStudentClassesByParentId } from "../../services/StudentClassApi";
import '../TableComponent/TableComponent.css'
import IFinalGrades from "../../models/IFinalGrades";
import { GradeEnum } from "../../enums/GradeEnum";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface TableFinalGradesProps {
    schoolYearId: number;
    studentId: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;




    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>


    );
}

const TableFinalGrades = (props: TableFinalGradesProps) => {


    const { schoolYearId, studentId } = props;
    const [finalGrades, setFinalGrades] = useState<any>([]);

    useEffect(() => {

        getFinalGrades(schoolYearId, studentId).then((resp) => {
            setFinalGrades(resp.data);
        })
    },[])




    return (
        <div>
        <Table>
            <TableHead >
                <TableCell style={{padding:'16px', backgroundColor:'#d6d6d6',  fontWeight: 'bold'}}>Predmet</TableCell> 
   
                <TableCell style={{padding:'16px', backgroundColor:'#d6d6d6',  fontWeight: 'bold'}}>Ocjena</TableCell>
            </TableHead>
            <TableBody>
            <TableRow>
                        
                        </TableRow>
                {
                    finalGrades.map((el: any) => {
                        return( <TableRow>
                            <TableCell>{el.subjectSubjectName}</TableCell>
                            <TableCell>{GradeEnum[el.grade] + " ("+ el.grade + ")"}</TableCell>
                        </TableRow>)
                       
                    })
                }
            </TableBody>
        </Table></div>
    )
}

const StudentDetailsParentComponent = () => {
    const [value, setValue] = React.useState(0);
    const authentication = useAuth();
    const [grades, setGrades] = useState<IStudentGrades[]>([]);
    const [parentId, setParentId] = useState(0);
    const [studentClasses, setStudentClasses] = useState<any>([]);
    const [finalGrades, setFinalGrades] = useState<IFinalGrades[]>([]);
    let index = 0;
    const columns = [
        { header: "Predmet", field: "subjectName" },
        { header: "Profesor", field: "professorFullName" },
    ];



    useEffect(() => {
        getParentByUserId(authentication?.getUserId()).then((resp) => {
            getStudentClassesByParentId(resp.data.parentId).then((respClasses => {
                console.log(respClasses.data);
                setStudentClasses(respClasses.data);

            }))
            setParentId(resp.data.parentId);
            getStudentByParentId(resp.data.parentId).then((response) => {

                

                getCurrentSchoolYear().then((year) => {

                    getStudentGradesBySubjects(year.data.schoolYearId, response?.data.studentId==null?0:response?.data.studentId).then((finalResponse) => {

                        console.log("------" + finalResponse.data[0]);
                        setGrades(finalResponse.data);
                    })
                })
            })
        }
        )
    }, [])






    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

  

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Trenutni razred" {...a11yProps(0)} />
                    {studentClasses.map((c: any) => <Tab label={c.schoolClassName + " Polugodište: " + c.schoolClassSchoolYearSemester}></Tab>)}

                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={index}>
                <GenericGradesTable
                    columns={columns}
                    data={grades}
                    actions={[]}
                ></GenericGradesTable>

            </CustomTabPanel>
            {studentClasses.map((c: any) =>
                <CustomTabPanel value={value} index={++index}>


                    <TableFinalGrades schoolYearId={c.schoolClassSchoolYearId} studentId={c.studentStudentId}></TableFinalGrades>
                    <br></br>

                    <hr></hr>
                    Završna ocjena: {c.finalGrade}
                    <br></br>
                    Vladanje: {c.behavior}
                </CustomTabPanel>

            )}


        </div>
    )

}
export default StudentDetailsParentComponent;