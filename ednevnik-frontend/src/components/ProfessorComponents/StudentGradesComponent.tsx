import React, { useState } from "react";
import GenericGradesTable from "../TableComponent/GenericGradesTable";
import { getStudentGradesBySubjects } from "../../services/GradesApi";
import { useLocation } from "react-router-dom";
import { getStudentDetails } from "../../services/StudentApi";
import { Grid, Typography } from "@mui/material";
import IStudentDetails, { initialStudent } from "../../models/IStudentDetails";
import IStudentGrades from "../../models/IStudentGrades";
const columns = [
  { header: "Predmet", field: "subjectName" },
  { header: "Profesor", field: "professorFullName" },
];
const StudentGradesComponent = (props: any) => {
  const [grades, setGrades] = useState<IStudentGrades[]>([]);
  const [student, setStudent] = useState<IStudentDetails>(initialStudent);
  const { state } = useLocation();
  React.useEffect(() => {
    getStudentDetails(state.studentId)
      .then((student) => {
        setStudent(student.data);
        getStudentGradesBySubjects(state.schoolYearId, state.studentId)
          .then((response) => {
            setGrades(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          Roditelj:{" "}
          {student.parent.userFirstName + " " + student.parent.userLastName}
          <Typography variant="h3">
            {student.firstName + " " + student.lastName}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <p>JMB: {student.jmbg}</p>
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
