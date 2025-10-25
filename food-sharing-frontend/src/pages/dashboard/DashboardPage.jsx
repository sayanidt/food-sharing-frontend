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
  Divider,
  Chip,
  IconButton,
  alpha,
  Stack,
} from '@mui/material';
import {
  Add,
  Search,
  Park,
  TrendingUp,
  LocationOn,
  Refresh,
  Restaurant,
  ArrowForward,
  EmojiEvents,
  AccessTime,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

// Smooth animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

  useEffect(() => {
    setNearbyListings([
      {
        id: '1',
        title: 'Fresh Homemade Pasta',
        category: 'Meals',
        quantity: '4 servings',
        location: { address: 'Koramangala, Bangalore' },
        ai_predictions: { freshness_score: 95, demand_prediction: 0.8 },
        donor: { name: 'Priya Sharma', reputation: { rating: 4.8 } },
        expiresIn: '6 hours',
      },
      {
        id: '2',
        title: 'Organic Vegetables',
        category: 'Vegetables',
        quantity: '2kg mixed',
        location: { address: 'Indiranagar, Bangalore' },
        ai_predictions: { freshness_score: 88, demand_prediction: 0.6 },
        donor: { name: 'Rahul Patel', reputation: { rating: 4.5 } },
        expiresIn: '4 hours',
      },
      {
        id: '3',
        title: 'Homemade Bread Loaves',
        category: 'Bakery',
        quantity: '3 loaves',
        location: { address: 'Whitefield, Bangalore' },
        ai_predictions: { freshness_score: 92, demand_prediction: 0.7 },
        donor: { name: 'Anita Kumar', reputation: { rating: 4.9 } },
        expiresIn: '8 hours',
      }
    ]);
  }, []);

  // Clean Stat Card Component
  const StatCard = ({ title, value, icon, color, description }) => (
    <Card
      sx={{
        height: '100%',
        background: 'white',
        borderRadius: 2,
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s',
        animation: `${fadeIn} 0.6s ease-out`,
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transform: 'translateY(-4px)',
          borderColor: color,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500} mb={1}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={700} color={color} mb={0.5}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  // Quick Action Card
  const QuickActionCard = ({ title, description, icon, onClick, color }) => (
    <Card
      sx={{
        height: '100%',
        background: 'white',
        borderRadius: 2,
        border: `1px solid ${alpha(color, 0.2)}`,
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: `0 4px 20px ${alpha(color, 0.15)}`,
          transform: 'translateY(-4px)',
          borderColor: color,
          '& .action-arrow': {
            transform: 'translateX(4px)',
          },
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            bgcolor: alpha(color, 0.1),
            color: color,
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" fontWeight={600} mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
        <ArrowForward
          className="action-arrow"
          sx={{
            color: color,
            fontSize: 20,
            transition: 'transform 0.3s',
          }}
        />
      </CardContent>
    </Card>
  );

  // Food Listing Card
  const FoodListingCard = ({ listing, index }) => (
    <Card
      sx={{
        height: '100%',
        background: 'white',
        borderRadius: 2,
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s',
        animation: `${fadeIn} 0.6s ease-out ${index * 0.1}s both`,
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          transform: 'translateY(-6px)',
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          height: 180,
          background: `linear-gradient(135deg, ${alpha('#4caf50', 0.9)} 0%, ${alpha('#66bb6a', 0.9)} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Restaurant sx={{ fontSize: 64, color: 'white' }} />
        <Chip
          label={`${listing.ai_predictions.freshness_score}% Fresh`}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'white',
            fontWeight: 700,
            color: '#4caf50',
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Title & Category */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            {listing.title}
          </Typography>
          <Chip
            label={listing.category}
            size="small"
            sx={{
              bgcolor: alpha('#4caf50', 0.1),
              color: '#4caf50',
              fontWeight: 600,
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Details */}
        <Stack spacing={1.5} mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Restaurant fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              <strong>Quantity:</strong> {listing.quantity}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn fontSize="small" sx={{ color: '#f44336' }} />
            <Typography variant="body2" color="text.secondary">
              {listing.location.address}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" sx={{ color: '#ff9800' }} />
            <Typography variant="body2" color="text.secondary">
              <strong>Expires in:</strong> {listing.expiresIn}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Donor Info */}
        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Avatar
            sx={{
              bgcolor: '#4caf50',
              width: 36,
              height: 36,
              fontWeight: 700,
              fontSize: '0.875rem',
            }}
          >
            {listing.donor.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {listing.donor.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <EmojiEvents sx={{ fontSize: 14, color: '#ffc107' }} />
              <Typography variant="caption" color="text.secondary">
                {listing.donor.reputation.rating} rating
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            bgcolor: '#4caf50',
            borderRadius: 2,
            py: 1.2,
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#45a049',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
            },
          }}
        >
          Claim Food
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          sx={{ animation: `${fadeIn} 0.6s ease-out` }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              color="text.primary"
              gutterBottom
            >
              Welcome back! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Continue your journey of reducing food waste
            </Typography>
          </Box>
          <IconButton
            onClick={() => setLoading(!loading)}
            sx={{
              bgcolor: 'white',
              border: '1px solid #e0e0e0',
              '&:hover': {
                bgcolor: 'white',
                transform: 'rotate(180deg)',
                borderColor: '#4caf50',
              },
              transition: 'all 0.5s',
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Foods Shared"
              value={stats.foodShared}
              icon={<Restaurant />}
              color="#4caf50"
              description="Items donated"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Foods Received"
              value={stats.foodReceived}
              icon={<LocationOn />}
              color="#2196f3"
              description="Items claimed"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Carbon Saved"
              value={`${stats.carbonSaved}kg`}
              icon={<Park />}
              color="#ff9800"
              description="CO₂ equivalent"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Impact Score"
              value={stats.impactScore}
              icon={<TrendingUp />}
              color="#9c27b0"
              description="Sustainability rating"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Share Food"
                description="List surplus items"
                icon={<Add sx={{ fontSize: 28 }} />}
                onClick={() => navigate('/create-listing')}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Find Food"
                description="Browse available items"
                icon={<Search sx={{ fontSize: 28 }} />}
                onClick={() => navigate('/browse')}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="View Impact"
                description="Track contribution"
                icon={<Park sx={{ fontSize: 28 }} />}
                onClick={() => navigate('/impact')}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Community"
                description="Connect with others"
                icon={<Person sx={{ fontSize: 28 }} />}
                onClick={() => navigate('/community')}
                color="#9c27b0"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Food Listings */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight={700}>
              Available Food Near You
            </Typography>
            <Chip
              label={`${nearbyListings.length} items available`}
              sx={{
                bgcolor: alpha('#4caf50', 0.1),
                color: '#4caf50',
                fontWeight: 700,
              }}
            />
          </Box>
          <Grid container spacing={3}>
            {nearbyListings.map((listing, index) => (
              <Grid item xs={12} md={6} lg={4} key={listing.id}>
                <FoodListingCard listing={listing} index={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;
