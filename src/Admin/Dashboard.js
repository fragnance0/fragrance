import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const dataCards = [
    { title: "Total Products", value: 120, color: "#3f51b5" },
    { title: "Total Orders", value: 450, color: "#4caf50" },
    { title: "Revenue", value: "$12,340", color: "#ff9800" },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, Admin!
      </Typography>
      <Grid container spacing={3}>
        {dataCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Paper
              sx={{
                padding: 3,
                textAlign: "center",
                backgroundColor: card.color,
                color: "#fff",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography variant="h4" mt={1}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
