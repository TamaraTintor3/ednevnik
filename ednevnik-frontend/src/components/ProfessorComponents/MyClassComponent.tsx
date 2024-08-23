import React, { useState } from "react";
import ISchoolClass, { initialClass } from "../../models/ISchoolClass";
import { getMyClass } from "../../services/ProfessorApi";
import { useProfessorContext } from "../../contexts/ProfessorContext";
import TableComponent from "../TableComponent/TableComponent";
import { Box, Button, Typography } from "@mui/material";
import { addAbsence } from "../../services/AbsenceApi";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  AnnouncementTwoTone,
  GradeTwoTone,
  MoreHoriz,
  Print,
  PrintTwoTone,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { getOrCreateClassSchedule } from "../../services/ClassScheduleApi";



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

  
  const handleCreateSchedule = () => {
    console.log("Creating schedule for class ID:", schoolClass.schoolClassId);
    getOrCreateClassSchedule(schoolClass.schoolClassId)
      .then(response => {
        const scheduleId = response.data.classScheduleId;
        console.log("Schedule created or fetched:", response.data);
        console.log("Navigating to schedule ID:", scheduleId);
        navigate(`/createSchedule/${scheduleId}`);
      })
      .catch(error => {
        console.error("Error fetching or creating schedule:", error);
      });
  };


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
      <Box display="flex" alignItems="center">
        <Typography variant="inherit">Raspored časova</Typography>
      <Button startIcon={<PostAddIcon/>} sx={{ color: 'gray' }} onClick={handleCreateSchedule}/>
      </Box>

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
