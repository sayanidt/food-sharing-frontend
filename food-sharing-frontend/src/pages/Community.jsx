import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar, Card, CardContent } from '@mui/material';
import { Group } from '@mui/icons-material';

const Community = () => {
  const communityMembers = [
    { name: 'Priya Sharma', donations: 15, location: 'Koramangala' },
    { name: 'Rahul Patel', donations: 12, location: 'Indiranagar' },
    { name: 'Anita Kumar', donations: 18, location: 'Whitefield' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          👥 Community
        </Typography>
        <Typography variant="body1" paragraph>
          Connect with food sharers in your area
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {communityMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                  {member.name.charAt(0)}
                </Avatar>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.location}
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ mt: 1 }}>
                  {member.donations} donations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Community;
