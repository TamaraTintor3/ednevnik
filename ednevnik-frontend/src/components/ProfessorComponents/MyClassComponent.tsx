import React, { useState } from "react";
import ISchoolClass, { initialClass } from "../../models/ISchoolClass";
import { getMyClass } from "../../services/ProfessorApi";
import { useProfessorContext } from "../../contexts/ProfessorContext";
import TableComponent from "../TableComponent/TableComponent";
import { Typography } from "@mui/material";
import { addAbsence } from "../../services/AbsenceApi";
import {
  AnnouncementTwoTone,
  GradeTwoTone,
  MoreHoriz,
  Print,
  PrintTwoTone,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";


const MyClassComponent = () => {
  const [schoolClass, setSchoolClass] = useState<ISchoolClass>(initialClass);
  const authentication = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    getMyClass({ userId: authentication?.userId })
      .then((response: any) => {
        console.log(authentication?.userId);
        setSchoolClass(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const columns = [
    { header: "Br.", field: "studentId" },
    { header: "Ime", field: "firstName" },
    { header: "Prezime", field: "lastName" },
    { header: "Roditelj", field: "parent" },
  ];
  const actions = [
    {
      icon: (
        <AnnouncementTwoTone titleAccess="Izostanci" sx={{ color: "gray" }} />
      ),
      onClick: handleAbsences,
    },
    {
      icon: <GradeTwoTone titleAccess="Vladanje" sx={{ color: "gray" }} />,
      onClick: handleBehavior,
    },
    
    {
      icon: <MoreHoriz titleAccess="Detalji" sx={{ color: "gray" }} />,
      onClick: openStudentDetails,
    },
  ];
  function handleAbsences(student: any) {
    navigate(`/absences/${student.studentId}`);
  }
  function handleBehavior(student: any) {
    navigate(`/studentBehavior/${student.studentId}`, { state: { schoolClassId: schoolClass.schoolClassId} });
  }
  function openStudentDetails(student: any) {
    console.log(student);
    navigate("/student-grades", {
      state: {
        schoolYearId: schoolClass.schoolClassId,
        studentId: student.studentId,
        schoolClassName : schoolClass.name,
        schoolClassYear : schoolClass.schoolYearYear,
        schoolClassYearSemester : schoolClass.schoolYearSemester
      },
    });
  }


  
  return (
    <div>
      <Typography variant="h4">{schoolClass.name}</Typography>
      <Typography fontWeight="bold">
        {" " +
          schoolClass.schoolYearYear +
          " " +
          schoolClass.schoolYearSemester +
          ". polugodište"}
      </Typography>
      <i>
        Razredni starješina
        {schoolClass.professors.map(
          (p) => " - " + p.userFirstName + " " + p.userLastName
        )}
      </i>
      <br />
      <br />
      <TableComponent
        columns={columns}
        data={schoolClass.students.map((s) => ({
          ...s,
          parent: s.parent.userFirstName + " " + s.parent.userLastName,
        }))}
        actions={actions}
      ></TableComponent>
    </div>
  );
};

export default MyClassComponent;
