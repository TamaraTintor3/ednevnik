import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Registration from './components/RegisterComponent/Registration';
import LoginComponent from './components/LoginComponent/Login';
import HomeComponent from './components/HomeComponent/Home';
import { useAuth } from './contexts/AuthenticationContext';




function App(props: any) {

  const authentication = useAuth();

  function AdminPrivateRoute() {

    if (authentication)
      authentication.role = authentication.getRole();
    return (authentication?.isLogedIn() && authentication?.role == "ADMIN") == true ? <Outlet /> : <Navigate to="/home" replace />;
  }

  function IsLogedInPrivateRoute() {
    let loged = false;
    if (authentication) {  loged = authentication.isLogedIn(); }
    return (authentication?.isLogedIn()) == true ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return (


    <Routes>
      <Route path='/' element={<LoginComponent />} />
      <Route path='/login' element={<LoginComponent />} />
      <Route element={<IsLogedInPrivateRoute />}>
        <Route path="/home" element={<HomeComponent />} />
      </Route>
      <Route element={<AdminPrivateRoute/>}>
        <Route path='/register' element={<Registration />} /></Route>
    </Routes>

  );
}

export default App;
