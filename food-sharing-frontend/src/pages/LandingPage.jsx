import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Nature,
  LocationOn,
  Group,
  TrendingUp,
  Restaurant,
  Favorite,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocationOn />,
      title: 'Hyperlocal Matching',
      description: 'Find food near you with AI-powered location matching',
    },
    {
      icon: <Nature />,
      title: 'Reduce Food Waste',
      description: 'Help save the environment by sharing surplus food',
    },
    {
      icon: <Group />,
      title: 'Community Driven',
      description: 'Connect with neighbors and build stronger communities',
    },
    {
      icon: <TrendingUp />,
      title: 'AI Insights',
      description: 'Smart predictions for freshness and demand',
    },
  ];

  const sampleListings = [
    {
      id: '1',
      title: 'Fresh Homemade Pasta',
      category: 'meals',
      quantity: '4 servings',
      location: 'Koramangala, Bangalore',
      freshness: 95,
      donor: 'Priya',
    },
    {
      id: '2',
      title: 'Organic Vegetables',
      category: 'vegetables',
      quantity: '2kg mixed',
      location: 'Indiranagar, Bangalore',
      freshness: 88,
      donor: 'Rahul',
    },
    {
      id: '3',
      title: 'Homemade Bread',
      category: 'bakery',
      quantity: '2 loaves',
      location: 'Whitefield, Bangalore',
      freshness: 92,
      donor: 'Anita',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            🌱 FoodShare
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Reduce Food Waste, Build Community
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.2rem' }}>
            Connect with neighbors to share surplus food, reduce waste, and build a sustainable community.
            Powered by AI for smart matching and freshness prediction.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/create-listing')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              Start Sharing Food
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/browse')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Find Food Near Me
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Impact Stats */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" color="primary" gutterBottom>
              1,250+
            </Typography>
            <Typography variant="body1">Meals Shared</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" color="primary" gutterBottom>
              500+
            </Typography>
            <Typography variant="body1">Active Users</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" color="primary" gutterBottom>
              850kg
            </Typography>
            <Typography variant="body1">CO₂ Saved</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" color="primary" gutterBottom>
              95%
            </Typography>
            <Typography variant="body1">Success Rate</Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" gutterBottom>
            Why Choose FoodShare?
          </Typography>
          <Typography variant="body1" textAlign="center" paragraph sx={{ mb: 6 }}>
            AI-powered features that make food sharing simple, safe, and sustainable
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.light',
                        mx: 'auto',
                        mb: 2,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sample Listings */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Available Food Near You
        </Typography>
        <Typography variant="body1" textAlign="center" paragraph sx={{ mb: 6 }}>
          Fresh, quality food shared by your neighbors
        </Typography>
        <Grid container spacing={3}>
          {sampleListings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <Card sx={{ height: '100%' }}>
                <Box
                  sx={{
                    height: 200,
                    background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Restaurant sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                    <Typography variant="h6" component="div">
                      {listing.title}
                    </Typography>
                    <Chip
                      label={`${listing.freshness}% fresh`}
                      color="success"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {listing.quantity} • {listing.category}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {listing.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
                        {listing.donor.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        {listing.donor}
                      </Typography>
                    </Box>
                    <Button size="small" variant="contained">
                      Claim
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join thousands of people reducing food waste in their communities
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#f0f0f0' },
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
