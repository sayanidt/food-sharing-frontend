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
  EcoOutlined,
  TrendingUp,
  LocationOn,
  Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import apiService from '../../services/api';
import MapView from '../../components/maps/MapView';
import FoodListingCard from '../../components/ui/FoodListingCard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { location: userLocation } = useLocation();
  const [nearbyListings, setNearbyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    foodShared: 0,
    foodReceived: 0,
    carbonSaved: 0,
    impactScore: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, [userLocation]);

  const fetchDashboardData = async () => {
    if (!userLocation) return;

    try {
      setLoading(true);
      const listings = await apiService.getNearbyListings(
        userLocation.longitude,
        userLocation.latitude,
        5000
      );
      setNearbyListings(listings);
      
      // Update stats from user data
      if (user?.sustainability) {
        setStats({
          foodShared: user.sustainability.food_shared || 0,
          foodReceived: user.sustainability.food_received || 0,
          carbonSaved: user.sustainability.carbon_saved || 0,
          impactScore: calculateImpactScore(user.sustainability),
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateImpactScore = (sustainability) => {
    const { food_shared = 0, carbon_saved = 0 } = sustainability;
    return Math.min(100, Math.round((food_shared * 10 + carbon_saved * 2) / 10));
  };

  const QuickActionCard = ({ title, description, icon, onClick, color = 'primary' }) => (
    <Card sx={{ cursor: 'pointer', transition: 'all 0.2s' }} onClick={onClick}>
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
    <Paper sx={{ p: 3, textAlign: 'center' }}>
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
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue your journey of reducing food waste
          </Typography>
        </Box>
        <IconButton onClick={fetchDashboardData} disabled={loading}>
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
            icon={<EcoOutlined />}
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

        {/* Map View */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Food Available Near You
              </Typography>
              <Chip
                icon={<LocationOn />}
                label={`${nearbyListings.length} items found`}
                color="primary"
                variant="outlined"
              />
            </Box>
            <Box height="400px">
              <MapView
                listings={nearbyListings}
                userLocation={userLocation}
                onListingClick={(listing) => navigate(`/food/${listing.id}`)}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Listings */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, height: '460px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Recent Listings
            </Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <LinearProgress sx={{ width: '100%' }} />
              </Box>
            ) : nearbyListings.length > 0 ? (
              nearbyListings.slice(0, 3).map((listing) => (
                <FoodListingCard
                  key={listing.id}
                  listing={listing}
                  compact
                  onClaim={(listing) => handleClaimFood(listing)}
                  onContact={(phone) => window.open(`tel:${phone}`)}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                No food listings found nearby
              </Typography>
            )}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/browse')}
              sx={{ mt: 2 }}
            >
              View All
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  async function handleClaimFood(listing) {
    try {
      await apiService.claimFoodListing(listing.id);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Failed to claim food:', error);
    }
  }
};

export default DashboardPage;
