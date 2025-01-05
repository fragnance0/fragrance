import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

export default function AdminDashboard() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '0.5rem',
            }}
          >
            <AccountCircleRoundedIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Users
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '0.5rem',
            }}
          >
            <BarChartRoundedIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Analytics
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '0.5rem',
            }}
          >
            <FolderRoundedIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Products
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
