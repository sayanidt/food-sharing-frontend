import React from 'react';
import { Container, Typography, Box, Paper, Grid, LinearProgress } from '@mui/material';

const Impact = () => {
  const stats = [
    { title: 'Food Shared', value: 12, total: 50, color: 'success' },
    { title: 'Food Received', value: 8, total: 30, color: 'info' },
    { title: 'Carbon Saved', value: 24.5, total: 100, unit: 'kg', color: 'warning' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          🌱 My Impact
        </Typography>
        <Typography variant="body1" paragraph>
          Track your environmental contribution
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color={`${stat.color}.main`} gutterBottom>
                {stat.value}{stat.unit || ''}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {stat.title}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(stat.value / stat.total) * 100}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
                color={stat.color}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {Math.round((stat.value / stat.total) * 100)}% of goal
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Impact;
