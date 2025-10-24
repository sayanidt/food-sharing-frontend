import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} 
                    onClick={() => navigate('/')}>
          🌱 FoodShare
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/browse')}>
            Browse
          </Button>
          <Button color="inherit" onClick={() => navigate('/create-listing')}>
            Share Food
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
