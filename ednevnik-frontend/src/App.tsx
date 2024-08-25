
import React from "react";
import { Navigate, Outlet, Route, Routes, } from "react-router-dom";
import Registration from "./components/RegisterComponent/Registration";
import LoginComponent from "./components/LoginComponent/Login";
import ResetPasswordForm from "./components/password-change/ResetPasswordForm";
import ChangePasswordForm from "./components/password-change/ChangePasswordForm";
import { useAuth, } from "./contexts/AuthenticationContext";
import MainComponent from "./components/MainComponent/MainComponent";
import ClassesComponent from "./components/AdministratorComponents/ClassesComponent";
import ShowAllUsers from "./components/AdministratorComponents/ShowAllUsers";
import EditUserComponent from "./components/AdministratorComponents/EditUserComponent";
import ClassDetailsComponent from "./components/AdministratorComponents/ClassDetailsComponent";
import AddSchoolClass from "./components/AdministratorComponents/AddSchoolClass";
import AddStudentComponent from "./components/AdministratorComponents/AddStudentComponent";

import ShowAllClassesComponent from "./components/ProfessorComponents/ShowAllClassesComponent";
import MyClassComponent from "./components/ProfessorComponents/MyClassComponent";
import ShowClassDetails from "./components/ProfessorComponents/ShowClassDeatils";
import AddAbsenceComponent from "./components/ProfessorComponents/AddAbsenceComponent";

import AddGradeComponent from "./components/ProfessorComponents/AddGradeComponent";
import EditGradeComponent from "./components/ProfessorComponents/EditGradeComponent";
import StudentGradesComponent from "./components/ProfessorComponents/StudentGradesComponent";
import CalendarComponent from "./components/ProfessorComponents/CalendarComponent";

import StudentAbsencesPage from "./components/ProfessorComponents/StudentAbsencesPage";
import StudentBehaviorComponent from "./components/ProfessorComponents/StudentBehaviorComponent";
import AddFinalGradeComponent from "./components/ProfessorComponents/AddFinalGradeComponent";

import CreateScheduleComponent from "./components/ProfessorComponents/CreateScheduleComponent";
import AbsencesComponent from "./components/ParentComponents/AbsencesComponent";
import DisplayScheduleComponent from "./components/ParentComponents/DisplayScheduleComponent";

import ParentHomePageComponent from "./components/ParentComponents/ParentHomePageComponent";
import StudentDetailsParentComponent from "./components/ParentComponents/StudentDetailsParentComponent";
import ParentInboxComponent from "./components/ParentComponents/ParentInboxComponent";
import ProfessorInboxComponent from "./components/ProfessorComponents/ProfessorInboxComponent";
import AddProfessorToClassComponent from "./components/AdministratorComponents/AddProfessorToClassComponent";
import { Subject } from "@mui/icons-material";
import SubjectsComponent from "./components/AdministratorComponents/SubjectsComponent";
import AddSubject from "./components/AdministratorComponents/AddSubject";


function App(props: any) {

  const authentication = useAuth();

  function AdminPrivateRoute() {
    if (authentication)
      authentication.role = authentication.getRole();
    return (authentication?.isLogedIn() && authentication?.role == "ADMIN") == true ? <Outlet /> : <Navigate to="/login" replace />;
  }

  function IsLogedInPrivateRoute() {
    let loged = false;
    if (authentication) { loged = authentication.isLogedIn(); }
    return (authentication?.isLogedIn()) == true ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route element={<AdminPrivateRoute />}>


      </Route>
      <Route path="/password-reset" element={<ResetPasswordForm />} />
      <Route path="/password-change/:token" element={<ChangePasswordForm />} />

      <Route element={<IsLogedInPrivateRoute />}>
        <Route element={<MainComponent />}>

          <Route path='/showAllUsers' element={<ShowAllUsers />} />
          <Route path="/classes" element={<ClassesComponent />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/editUser" element={<EditUserComponent />} />
          <Route path="/class/:id" element={<ClassDetailsComponent />} />
          <Route path="/addSchoolClass" element={<AddSchoolClass />} />
            <Route path="/showProfessorsClasses" element={<ShowAllClassesComponent  />}  />
            <Route path="/myClass" element={<MyClassComponent  />}  />
          <Route path="/addStudent/:id" element={<AddStudentComponent />} />
          <Route path="/showClassDetails/:id" element={<ShowClassDetails  />}  />
          <Route path="/addAbsence/:studentId" element={<AddAbsenceComponent />} />
          <Route path="/parentHomePage" element={<ParentHomePageComponent />} />
          <Route path="/addGrade/:studentId" element={<AddGradeComponent />} />
          <Route path="/editGrades/:studentId" element={<EditGradeComponent  />} />
          <Route path="/student-grades" element={<StudentGradesComponent  />} />
          <Route path="/absences/:studentId" element={<StudentAbsencesPage />} />
          <Route path="/studentBehavior/:studentId" element={<StudentBehaviorComponent />} />
          <Route path="/studentDetails" element={<StudentDetailsParentComponent/>} />
          <Route path="/addFinalGrade/:studentId" element={<AddFinalGradeComponent />} />
          <Route path="/calendar" element={<CalendarComponent/>} />
          <Route path="/createSchedule/:classScheduleId" element={<CreateScheduleComponent />} />
          <Route path="/absences" element={<AbsencesComponent />} />
          <Route path="/displaySchedule" element={<DisplayScheduleComponent/>} />
          <Route path="/parent-messages" element={<ParentInboxComponent/>} />
          <Route path="/professor-messages" element={<ProfessorInboxComponent/>} />
          <Route path="/professor-messages" element={<ProfessorInboxComponent/>} />
          <Route path="/subjects" element={<SubjectsComponent/>} />
          <Route path="/addSubject" element={<AddSubject/>} />
          <Route path="/addProfessorToClass/:id" element={<AddProfessorToClassComponent/>} />

          
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
