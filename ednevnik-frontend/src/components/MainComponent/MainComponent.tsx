import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainComponent = ({ children }: any) => {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {/* {children} */}
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default MainComponent;
