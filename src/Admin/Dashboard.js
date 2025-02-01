import React from "react";
import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InventoryOutlined, LocalShipping, AssignmentReturnOutlined } from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();
  const dataCards = [
    {
      title: "All Products",
      icon: <InventoryOutlined />,
      route: "/admin/all-product",
    },
    {
      title: "Orders",
      icon: <LocalShipping />,
      route: "/admin/orders",
    },
    {
      title: "Shipped Orders",
      icon: <AssignmentReturnOutlined />,
      route: "/admin/shipped-orders",
    },
    {
      title: "Delivered Orders",
      icon: <AssignmentReturnOutlined />,
      route: "/admin/delivered-orders",
    },
    {
      title: "Returned Orders",
      icon: <AssignmentReturnOutlined />,
      route: "/admin/returned-orders",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, Admin!
      </Typography>
      <Grid container spacing={3}>
        {dataCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Button
              onClick={() => navigate(card.route)}
              sx={{
                padding: 5,
                textAlign: "center",
                backgroundColor: '#000',
                color: "#fff",
                width: "100%",
                borderRadius: 2,

                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '1px solid #000'
                }
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography variant="h4" mt={1}>
                {card.value}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
