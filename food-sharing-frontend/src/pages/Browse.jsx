import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Browse = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          🔍 Browse Food
        </Typography>
        <Typography variant="body1">
          Find available food near you! (Coming soon with advanced features)
        </Typography>
      </Box>
    </Container>
  );
};

export default Browse;
