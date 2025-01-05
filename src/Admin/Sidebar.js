import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AddBox as AddBoxIcon,
  ShoppingCart as ShoppingCartIcon,
  AssignmentReturnOutlined,
  ChevronLeft,
  ChevronRight,
  InventoryOutlined,
  LocalShipping
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ variant, open, onClose }) => {
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { label: "Dashboard", path: "/admin/", icon: <DashboardIcon /> },
    { label: "Add Product", path: "/admin/add-product", icon: <AddBoxIcon /> },
    { label: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon /> },
    { label: "Shipped Orders", path: "/admin/shipped-orders", icon: <LocalShipping /> },
    { label: "Delivered Orders", path: "/admin/delivered-orders", icon: <InventoryOutlined /> },
    { label: "Returned Orders", path: "/admin/returned-orders", icon: <AssignmentReturnOutlined /> },
    // { label: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: expanded ? 240 : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: expanded ? 240 : 72,
          boxSizing: "border-box",
          backgroundColor: "#263238",
          color: "#ffffff",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        {expanded && (
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Admin Panel
          </Typography>
        )}
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }
          }}
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }} />

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <Tooltip
            key={item.label}
            title={!expanded ? item.label : ""}
            placement="right"
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              onClick={expanded ? onClose : undefined}
              sx={{
                minHeight: 48,
                px: 2.5,
                "& svg": {
                  fontSize: "1.8rem", // Adjust icon size
                  color: "#b0bec5", // Default icon color
                  transition: "color 0.2s",
                },
                "&:hover svg": {
                  color: "#64b5f6", // Change color on hover
                  transform: "scale(1.1)", // Slightly enlarge icon on hover
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: expanded ? 2 : "auto",
                  justifyContent: "center",
                  color: "white", // Default icon color
                  fontSize: 32, // Default icon size
                  transition: "color 0.2s, transform 0.2s",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {expanded && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "rgba(255, 255, 255, 0.7)",
                      transition: "color 0.2s",
                    }
                  }}
                />
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }} />
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "#3949ab" }}>M</Avatar>
        {expanded && (
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#fff" }}>Muneer</Typography>
            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Admin
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;