import React, { useState } from "react";
import GenericGradesTable from "../TableComponent/GenericGradesTable";
import { getFinalGrades, getStudentGradesBySubjects } from "../../services/GradesApi";
import { useLocation } from "react-router-dom";
import { getStudentDetails } from "../../services/StudentApi";
import { Button, Grid, Typography } from "@mui/material";
import IStudentDetails, { initialStudent } from "../../models/IStudentDetails";
import IStudentGrades from "../../models/IStudentGrades";
import { PrintTwoTone } from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import html2canvas from "html2canvas";
import IStudentClass, { initialStudentClass } from "../../models/IStudentClass";
import { getStudentClass } from "../../services/BehaviorApi";
import { getStudentClassByStudentId } from "../../services/StudentClassApi";


const columns = [
  { header: "Predmet", field: "subjectName" },
  { header: "Profesor", field: "professorFullName" },
];
const StudentGradesComponent = (props: any) => {
  const [grades, setGrades] = useState<IStudentGrades[]>([]);
  const [finalGrades, setFinalGrades] = useState<any[]>([]);
  const [student, setStudent] = useState<IStudentDetails>(initialStudent);
  const [studentClass, setStudentClass] =useState<IStudentClass>(initialStudentClass)
  const { state } = useLocation();
  const {schoolClassName} = state;
  const {schoolClassYear} = state;
  const {schoolClassYearSemester} = state;
  React.useEffect(() => {
    console.log("scJer" + state.studentId)
    getStudentDetails(state.studentId)
      .then((student) => {
        setStudent(student.data);
        getStudentGradesBySubjects(state.schoolYearId, state.studentId)
          .then((response) => {console.log(response.data)
            setGrades(response.data);
          })
          .catch((error) => {
            console.log(error);
          });


      })
      .catch((error) => {
        console.log(error);
      });

    getFinalGrades(state.schoolYearId, state.studentId).then((resp) => {
      console.log(resp.data)
      setFinalGrades(resp.data);
    }).catch((error) => {
      console.log(error);
    });

    getStudentClassByStudentId(state.studentId).then((resp) => {
      setStudentClass(resp.data[0]);
    })

  }, []);



  const printCertificate = async () => {

    alert(JSON.stringify('<i>'+schoolClassName+'</i>'));


    const doc = new jsPDF('p', 'px', 'a4');
    
    doc.setProperties({
      title: "Svjedočanstvo učenika " + student.firstName + " " + student.lastName
  });
  doc.text('SVJEDOCANSTVO', 170, 22);
  doc.text('o zavrsenom' + " " + schoolClassName + " razdredu " + schoolClassYear + " skolske godine, polugodiste " + schoolClassYearSemester , 55, 45);
  doc.text('Ucenik' + " " + student.firstName + " " + student.lastName +", maticni broj " + student.jmbg + ", sin/kci \n"  + student.parent.userFirstName + " " + student.parent.userLastName + " je zavrsio/la navedeni razred sljedecim uspjehom", 55, 65);
  doc.text('Ucenik je sa uspjehom: ' + studentClass.finalGrade + " i vladanjem: " + studentClass.behavior + " zavrsio " + schoolClassName + " razred", 25, 600);

    const col = [['Predmet', 'Ocjena']]
    const data: any[] = []
    finalGrades.forEach((grade: any) => {
      data.push([grade.subjectSubjectName, grade.grade]);
    })

    autoTable(doc, {
      head: col,
      body: data,
      startY: 90,
      theme : 'grid',
   
      styles :  {halign : 'center',  fontSize: 12},
       headStyles :{fillColor : [255, 235, 153]},
        alternateRowStyles: {fillColor : [255, 245, 204]},
         tableLineColor: [124, 95, 240], 
         tableLineWidth: 0.1,
      didDrawCell: (data) => {
      },
    });
    doc.save(student.firstName + " " + student.lastName + "_Svjedocanstvo.pdf");


  }






  return (
    <div>
    
      <Grid container spacing={2}>
        <Grid item xs={9} id="StudentData">
          Roditelj:{" "}
          {student.parent.userFirstName + " " + student.parent.userLastName}
          <Typography variant="h3">
            {student.firstName + " " + student.lastName}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <p>JMB: {student.jmbg}</p>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={printCertificate}>
            <PrintTwoTone titleAccess="Štampaj svjedočanstvo" sx={{ color: "gray" }} />
          </Button>


        </Grid>
      </Grid>
      <hr></hr>
      <GenericGradesTable
        columns={columns}
        data={grades}
        actions={[]}
      ></GenericGradesTable>
    </div>
  );
};

export default StudentGradesComponent;
