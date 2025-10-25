import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  Add,
  Restaurant,
  CheckCircle,
  Pending,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DonorDashboard = () => {
  const navigate = useNavigate();
  
  const [stats] = useState({
    totalDonations: 24,
    activeListing: 3,
    completedDonations: 21,
    peopleHelped: 45,
  });

  const [myListings] = useState([
    {
      id: 1,
      title: 'Fresh Vegetable Mix',
      status: 'active',
      quantity: '3kg',
      interestedUsers: 5,
      createdAt: '2 hours ago',
    },
    {
      id: 2,
      title: 'Homemade Pasta',
      status: 'claimed',
      quantity: '4 servings',
      claimedBy: 'Rahul',
      createdAt: '1 day ago',
    },
    {
      id: 3,
      title: 'Fresh Bread Loaves',
      status: 'completed',
      quantity: '6 loaves',
      completedAt: '3 days ago',
    },
  ]);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="h4" color={color} gutterBottom>
              {value}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.light` }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'claimed': return 'warning';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            🍽️ Donor Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your food donations
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={() => navigate('/create-listing')}
        >
          Share Food
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Donations"
            value={stats.totalDonations}
            icon={<Restaurant />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Listings"
            value={stats.activeListing}
            icon={<Pending />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completedDonations}
            icon={<CheckCircle />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="People Helped"
            value={stats.peopleHelped}
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* My Listings */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          My Food Listings
        </Typography>
        <List>
          {myListings.map((listing) => (
            <ListItem
              key={listing.id}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <Restaurant />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1">{listing.title}</Typography>
                    <Chip
                      label={listing.status}
                      color={getStatusColor(listing.status)}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {listing.quantity}
                    </Typography>
                    {listing.status === 'active' && (
                      <Typography variant="body2" color="success.main">
                        {listing.interestedUsers} people interested
                      </Typography>
                    )}
                    {listing.status === 'claimed' && (
                      <Typography variant="body2" color="warning.main">
                        Claimed by {listing.claimedBy}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {listing.createdAt || listing.completedAt}
                    </Typography>
                  </Box>
                }
              />
              <Button variant="outlined" size="small">
                View Details
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default DonorDashboard;
