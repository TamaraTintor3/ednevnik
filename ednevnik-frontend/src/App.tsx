import React from 'react';
import {BrowserRouter ,Navigate,Outlet,Route,  Routes, useNavigate } from 'react-router-dom';
import Registration from './components/RegisterComponent/Registration';
import LoginComponent from './components/LoginComponent/Login';
import HomeComponent from './components/HomeComponent/Home';
import AuthProvider, { useAuth } from './contexts/AuthenticationContext';



function App(props:any) {
  
  const authentication = useAuth();

  function AdminPrivateRoute() {
  
   alert("privvvv" + authentication?.getRole())

    return (authentication?.isLogedIn() && authentication.getRole() == "ADMIN") == true ? <Outlet /> : <Navigate to="/login" replace />;
  }
  
  return (
   
   
      <Routes>
        <Route path='/' element={<LoginComponent/>} />
        <Route path='/login' element={<LoginComponent/>} />
        <Route path="/home" element={<HomeComponent/>} />
        <Route element={<AdminPrivateRoute />}>
        <Route path='/register' element={<Registration/>} /></Route>
      </Routes>
      
  );
}

export default App;
