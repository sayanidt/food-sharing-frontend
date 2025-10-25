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
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Restaurant,
  LocationOn,
  CheckCircle,
  LocalShipping,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ReceiverDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [stats] = useState({
    foodReceived: 12,
    activeClaims: 2,
    savedMoney: '₹850',
    carbonSaved: '15kg',
  });

  const [nearbyFood] = useState([
    {
      id: 1,
      title: 'Fresh Homemade Pasta',
      donor: 'Priya Sharma',
      location: 'Koramangala, 1.2 km',
      quantity: '4 servings',
      freshness: 95,
      available: true,
    },
    {
      id: 2,
      title: 'Organic Vegetables',
      donor: 'Rahul Patel',
      location: 'Indiranagar, 2.5 km',
      quantity: '2kg mixed',
      freshness: 88,
      available: true,
    },
    {
      id: 3,
      title: 'Homemade Bread',
      donor: 'Anita Kumar',
      location: 'Whitefield, 3.1 km',
      quantity: '3 loaves',
      freshness: 92,
      available: true,
    },
  ]);

  const [myClaims] = useState([
    {
      id: 1,
      title: 'Fresh Fruits Box',
      donor: 'Sanjay',
      status: 'confirmed',
      pickupTime: 'Today, 6:00 PM',
    },
    {
      id: 2,
      title: 'Rice & Dal',
      donor: 'Meera',
      status: 'pending',
      pickupTime: 'Tomorrow, 11:00 AM',
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          🔍 Find Food Near You
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Discover fresh food available in your community
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      {/* Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Food Received"
            value={stats.foodReceived}
            icon={<Restaurant />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Claims"
            value={stats.activeClaims}
            icon={<LocalShipping />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Money Saved"
            value={stats.savedMoney}
            icon={<CheckCircle />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Carbon Saved"
            value={stats.carbonSaved}
            icon={<LocationOn />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Available Food */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Available Food Near You ({nearbyFood.length})
            </Typography>
            <Grid container spacing={2}>
              {nearbyFood.map((food) => (
                <Grid item xs={12} md={6} key={food.id}>
                  <Card>
                    <Box
                      sx={{
                        height: 120,
                        background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Restaurant sx={{ fontSize: 50, color: 'white' }} />
                    </Box>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="h6">{food.title}</Typography>
                        <Chip
                          label={`${food.freshness}% fresh`}
                          color="success"
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {food.quantity}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {food.location}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        Donor: {food.donor}
                      </Typography>
                      <Button variant="contained" fullWidth>
                        Claim Food
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* My Claims */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Claims ({myClaims.length})
            </Typography>
            {myClaims.map((claim) => (
              <Card key={claim.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="subtitle1">{claim.title}</Typography>
                    <Chip
                      label={claim.status}
                      color={claim.status === 'confirmed' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Donor: {claim.donor}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    Pickup: {claim.pickupTime}
                  </Typography>
                  <Button variant="outlined" size="small" fullWidth sx={{ mt: 1 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReceiverDashboard;
