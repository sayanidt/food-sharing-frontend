import React from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';

const Profile = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
            <Person sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
        </Box>

        <TextField fullWidth label="Name" defaultValue="Demo User" margin="normal" />
        <TextField fullWidth label="Email" defaultValue="demo@example.com" margin="normal" disabled />
        <TextField fullWidth label="Phone" defaultValue="+91 9876543210" margin="normal" />
        <TextField fullWidth label="Location" defaultValue="Bangalore, India" margin="normal" />

        <Button variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
