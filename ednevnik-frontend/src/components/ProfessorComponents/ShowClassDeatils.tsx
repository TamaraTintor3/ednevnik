import { useState } from "react";
import { useParams } from "react-router-dom";
import { initialClass } from "../../models/ISchoolClass";
import React from "react";
import axiosInstance from "../../services/axiosConfig";
import { Typography } from "@mui/material";
import TableComponent from "../TableComponent/TableComponent";
import { getSchoolClassById } from "../../services/SchoolClassApi";
import TableGradesComponent from "../TableComponent/TableGradesComponent";
import { getGradesbySchoolClassIdAndProfessorId } from "../../services/GradesApi";
import { useAuth } from "../../contexts/AuthenticationContext";
import { useProfessorContext } from "../../contexts/ProfessorContext";
import { getProfessorByUserId } from "../../services/UserApi";
import { initialStudents } from "../../models/IStudent";
import { initialStudentsTable } from "../../models/IStudentTable";
import { initialProfessor } from "../../models/IProfessor";
import { initialSubject } from "../../models/ISubject";
import { getSubjectByProfessorId } from "../../services/SubjectApi";

const ShowClassDetails = () => {

  const { id } = useParams();
  const [profId, setProfId] = useState(0);
  const [subject, setSubject] = useState(initialSubject);
  const [professor, setProfessor] = useState(initialProfessor)
  const [schoolClass, setSchoolClass] = useState(initialClass);
  const [schoolClassYearId, setSchoolClassYearId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const authentiaction = useAuth();
  const professorContext = useProfessorContext();

  React.useEffect(() => {

    getProfessorByUserId(authentiaction?.getUserId()).then(resp => {
      console.log(resp.data.professorId);
      setProfessor(resp.data);
      setProfId(resp.data.professorId);
    })

    getSchoolClassById(Number(id)).then((resp) => {
      console.log("++++++++++" + resp.data);
      setSchoolClass(resp.data);
      setSchoolClassYearId(resp.data.schoolYearId);
    })

   

    getSubjectByProfessorId(profId).then((resp) => {
      setSubject(resp.data);
      setSubjectId(resp.data.subjectId);
    }).catch((error) => {
      console.log(error);
    });
  }, [profId]);


 

  



  return (
    <div>
      <Typography variant="h4">{schoolClass.name}</Typography>
      <Typography>
        {" " +
          schoolClass.schoolYearYear +
          " " +
          schoolClass.schoolYearSemester +
          ". polugodište"}
      </Typography>
      <Typography>
        {
          professor.userFirstName + " " + professor.userLastName
        }
      </Typography>
      <Typography variant="h4">{subject.name}</Typography>
      <br />
      <TableGradesComponent subjectId={subjectId} schoolYearId={schoolClassYearId} ></TableGradesComponent>
      <br />

    </div>
  );
};

export default ShowClassDetails;