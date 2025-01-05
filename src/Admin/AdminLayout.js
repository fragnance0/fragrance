import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)"); // Detect screen size

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      {isDesktop ? (
        <Sidebar variant="permanent" open={true} />
      ) : (
        <Sidebar variant="temporary" open={isSidebarOpen} onClose={toggleSidebar} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" sx={{ boxShadow: "none", backgroundColor: "#263238" }}>
          <Toolbar>
            {!isDesktop && (
              <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3}}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
