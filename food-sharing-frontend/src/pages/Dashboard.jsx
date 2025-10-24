import React, { useState, useEffect } from 'react';
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
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add,
  Search,
  Nature,
  TrendingUp,
  LocationOn,
  Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [nearbyListings, setNearbyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    foodShared: 12,
    foodReceived: 8,
    carbonSaved: 24.5,
    impactScore: 85,
  });

  // Mock nearby listings
  useEffect(() => {
    setNearbyListings([
      {
        id: '1',
        title: 'Fresh Homemade Pasta',
        category: 'meals',
        quantity: '4 servings',
        location: { address: 'Koramangala, Bangalore' },
        ai_predictions: { freshness_score: 95, demand_prediction: 0.8 },
        donor: { name: 'Priya', reputation: { rating: 4.8 } },
        images: []
      },
      {
        id: '2',
        title: 'Organic Vegetables',
        category: 'vegetables',
        quantity: '2kg mixed',
        location: { address: 'Indiranagar, Bangalore' },
        ai_predictions: { freshness_score: 88, demand_prediction: 0.6 },
        donor: { name: 'Rahul', reputation: { rating: 4.5 } },
        images: []
      }
    ]);
  }, []);

  const QuickActionCard = ({ title, description, icon, onClick, color = 'primary' }) => (
    <Card sx={{ cursor: 'pointer', transition: 'all 0.2s', height: '100%' }} onClick={onClick}>
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        <Avatar sx={{ bgcolor: `${color}.light`, mx: 'auto', mb: 2, width: 56, height: 56 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  const StatCard = ({ title, value, subtitle, progress, color = 'primary' }) => (
    <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
      <Typography variant="h3" color={`${color}.main`} gutterBottom>
        {value}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {subtitle}
      </Typography>
      {progress !== undefined && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mt: 1, height: 6, borderRadius: 3 }}
        />
      )}
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue your journey of reducing food waste
          </Typography>
        </Box>
        <IconButton onClick={() => setLoading(!loading)}>
          <Refresh />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Impact Stats */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Foods Shared"
            value={stats.foodShared}
            subtitle="Items donated"
            progress={(stats.foodShared / 50) * 100}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Foods Received"
            value={stats.foodReceived}
            subtitle="Items claimed"
            progress={(stats.foodReceived / 30) * 100}
            color="info"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Carbon Saved"
            value={`${stats.carbonSaved}kg`}
            subtitle="CO2 equivalent"
            progress={(stats.carbonSaved / 100) * 100}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Impact Score"
            value={stats.impactScore}
            subtitle="Sustainability rating"
            progress={stats.impactScore}
            color="primary"
          />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Quick Actions
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Share Food"
            description="List surplus food items"
            icon={<Add />}
            onClick={() => navigate('/create-listing')}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Find Food"
            description="Browse available items"
            icon={<Search />}
            onClick={() => navigate('/browse')}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="View Impact"
            description="Track your contribution"
            icon={<Nature />}
            onClick={() => navigate('/impact')}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Community"
            description="Connect with others"
            icon={<TrendingUp />}
            onClick={() => navigate('/community')}
            color="info"
          />
        </Grid>

        {/* Recent Listings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Food Near You ({nearbyListings.length} items)
            </Typography>
            {loading ? (
              <LinearProgress sx={{ my: 2 }} />
            ) : (
              <Grid container spacing={2}>
                {nearbyListings.map((listing) => (
                  <Grid item xs={12} md={6} key={listing.id}>
                    <Card>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                          <Typography variant="h6">{listing.title}</Typography>
                          <Chip 
                            label={`${listing.ai_predictions.freshness_score}% fresh`} 
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
                            {listing.location.address}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
                              {listing.donor.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2">
                              {listing.donor.name} (★ {listing.donor.reputation.rating})
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
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
