
import React from "react";
import { Navigate, Outlet, Route, Routes, } from "react-router-dom";
import Registration from "./components/RegisterComponent/Registration";
import LoginComponent from "./components/LoginComponent/Login";
import HomeComponent from "./components/HomeComponent/Home";
import ResetPasswordForm from "./components/password-change/ResetPasswordForm";
import ChangePasswordForm from "./components/password-change/ChangePasswordForm";
import { useAuth, } from "./contexts/AuthenticationContext";
import MainComponent from "./components/MainComponent/MainComponent";
import ClassesComponent from "./components/AdministratorComponents/ClassesComponent";
import ShowAllUsers from "./components/AdministratorComponents/ShowAllUsers";


function App(props: any) {

  const authentication = useAuth();

  function AdminPrivateRoute() {
    if (authentication) 
      authentication.role = authentication.getRole();
    return (authentication?.isLogedIn() && authentication?.role == "ADMIN") == true ? <Outlet /> : <Navigate to="/login" replace />;
  }

  function IsLogedInPrivateRoute() {
    let loged = false;
    if (authentication) {  loged = authentication.isLogedIn(); }
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
        <Route path="/home" element={<HomeComponent />} />
        <Route path='/showAllUsers' element={<ShowAllUsers />}/>
        <Route path="/classes" element={<ClassesComponent/>} />
        <Route path="/register" element={<Registration />} />
         
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
