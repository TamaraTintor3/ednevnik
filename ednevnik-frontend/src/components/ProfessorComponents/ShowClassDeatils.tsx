import { useState } from "react";
import { useParams } from "react-router-dom";
import { initialClass } from "../../models/ISchoolClass";
import React from "react";
import axiosInstance from "../../services/axiosConfig";
import { Typography } from "@mui/material";
import TableComponent from "../TableComponent/TableComponent";
import { getSchoolClassById } from "../../services/SchoolClassApi";
import TableGradesComponent from "../TableComponent/TableGradesComponent";
import {  getGradesbySchoolClassIdAndProfessorId } from "../../services/GradesApi";
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
    const [students, setStudents] = useState(initialStudentsTable);
    const [profId, setProfId]  = useState(0);
    const [subject, setSubject] = useState(initialSubject);
    const [professor, setProfessor] = useState(initialProfessor)
    const [schoolClass, setSchoolClass] = useState(initialClass);
    const authentiaction = useAuth();
    const professorContext = useProfessorContext();
    React.useEffect(() => {

        console.log("+++++" + professorContext?.professorId)

        

        getProfessorByUserId(authentiaction?.getUserId()).then(resp => {
            console.log(resp.data.professorId);
            setProfessor(resp.data);
            setProfId(resp.data.professorId);
      })

      getSchoolClassById(Number(id)).then((resp) => {
        setSchoolClass(resp.data);
      })

        getGradesbySchoolClassIdAndProfessorId(Number(id), profId)
          .then((response) => {
            console.log(response.data)
            setStudents(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

          getSubjectByProfessorId(profId).then((resp) => {
            setSubject(resp.data);
          }).catch((error) => {
            console.log(error);
          });
      }, [profId]);

      
      const columns = [
        { header: "Ime", field: "firstName" },
        { header: "Prezime", field: "lastName" },
        { header: "Roditelj", field: "parent" },
        
      ];

      const gradeColumns = [
        { header: "Ocjene(Pismeni)", field: students }
      ]

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
        <TableGradesComponent  ></TableGradesComponent>
        <br />
    
      </div>
    );
  };
  
  export default ShowClassDetails;