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
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Stack,
  alpha,
} from '@mui/material';
import {
  Search,
  Restaurant,
  LocationOn,
  AccessTime,
  FilterList,
  Person,
  EmojiEvents,
  LocalShipping,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ReceiverDashboard = () => {
  const navigate = useNavigate();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    radius: '5km',
    foodType: 'all',
    timeFrame: 'anytime',
    quantity: 'any',
  });

  const [availableFood, setAvailableFood] = useState([]);
  const [myClaims, setMyClaims] = useState([]);
  const [stats, setStats] = useState({
    foodReceived: 8,
    activeClaims: 2,
    savedMoney: 650,
    carbonSaved: 12.5,
  });

  useEffect(() => {
    // Simulate fetching available food
    setAvailableFood([
      {
        id: 1,
        title: 'Fresh Homemade Pasta',
        donor: { name: 'Priya Sharma', rating: 4.8, avatar: 'P' },
        location: { address: 'Koramangala, Bangalore', distance: '1.2 km' },
        quantity: '4 servings',
        category: 'Meals',
        freshness: 95,
        availableUntil: '6:00 PM Today',
        pickupTime: '5:00 PM - 7:00 PM',
        postedTime: '2 hours ago',
      },
      {
        id: 2,
        title: 'Organic Vegetables Mix',
        donor: { name: 'Rahul Patel', rating: 4.5, avatar: 'R' },
        location: { address: 'Indiranagar, Bangalore', distance: '2.5 km' },
        quantity: '2kg mixed',
        category: 'Vegetables',
        freshness: 88,
        availableUntil: '8:00 PM Today',
        pickupTime: '6:00 PM - 9:00 PM',
        postedTime: '4 hours ago',
      },
      {
        id: 3,
        title: 'Homemade Bread Loaves',
        donor: { name: 'Anita Kumar', rating: 4.9, avatar: 'A' },
        location: { address: 'Whitefield, Bangalore', distance: '3.1 km' },
        quantity: '3 loaves',
        category: 'Bakery',
        freshness: 92,
        availableUntil: '10:00 PM Today',
        pickupTime: '7:00 PM - 10:00 PM',
        postedTime: '1 hour ago',
      },
      {
        id: 4,
        title: 'Fresh Fruits Basket',
        donor: { name: 'Sanjay Reddy', rating: 4.7, avatar: 'S' },
        location: { address: 'HSR Layout, Bangalore', distance: '1.8 km' },
        quantity: '3kg assorted',
        category: 'Fruits',
        freshness: 90,
        availableUntil: '5:00 PM Today',
        pickupTime: '4:00 PM - 6:00 PM',
        postedTime: '30 minutes ago',
      },
    ]);

    setMyClaims([
      {
        id: 1,
        title: 'Rice & Dal Combo',
        donor: 'Meera Singh',
        status: 'confirmed',
        pickupTime: 'Today, 6:00 PM',
        location: 'Koramangala',
      },
      {
        id: 2,
        title: 'Fresh Salad Bowl',
        donor: 'Karthik Rao',
        status: 'pending',
        pickupTime: 'Tomorrow, 11:00 AM',
        location: 'Indiranagar',
      },
    ]);
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Stat Card Component
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
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
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

  // Food Card Component
  const FoodCard = ({ food, index }) => (
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
          height: 160,
          background: `linear-gradient(135deg, ${alpha('#2196f3', 0.9)} 0%, ${alpha('#42a5f5', 0.9)} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Restaurant sx={{ fontSize: 60, color: 'white' }} />
        <Chip
          label={`${food.freshness}% Fresh`}
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
        <Chip
          label={food.postedTime}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: alpha('#000', 0.5),
            color: 'white',
            fontWeight: 600,
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Title & Category */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            {food.title}
          </Typography>
          <Chip
            label={food.category}
            size="small"
            sx={{
              bgcolor: alpha('#2196f3', 0.1),
              color: '#2196f3',
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
              <strong>Quantity:</strong> {food.quantity}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn fontSize="small" sx={{ color: '#f44336' }} />
            <Typography variant="body2" color="text.secondary">
              {food.location.address} ({food.location.distance})
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" sx={{ color: '#ff9800' }} />
            <Typography variant="body2" color="text.secondary">
              <strong>Pickup:</strong> {food.pickupTime}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <TrendingUp fontSize="small" sx={{ color: '#9c27b0' }} />
            <Typography variant="body2" color="text.secondary">
              <strong>Available until:</strong> {food.availableUntil}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Donor Info */}
        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Avatar
            sx={{
              bgcolor: '#2196f3',
              width: 36,
              height: 36,
              fontWeight: 700,
              fontSize: '0.875rem',
            }}
          >
            {food.donor.avatar}
          </Avatar>
          <Box flex={1}>
            <Typography variant="body2" fontWeight={600}>
              {food.donor.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <EmojiEvents sx={{ fontSize: 14, color: '#ffc107' }} />
              <Typography variant="caption" color="text.secondary">
                {food.donor.rating} rating
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack spacing={1}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              bgcolor: '#2196f3',
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1976d2',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
              },
            }}
          >
            Claim This Food
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Contact Donor
          </Button>
        </Stack>
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
        <Box mb={4} sx={{ animation: `${fadeIn} 0.6s ease-out` }}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            🔍 Find Food Near You
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover fresh food available in your community
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Food Received"
              value={stats.foodReceived}
              icon={<Restaurant />}
              color="#2196f3"
              description="Items claimed"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Active Claims"
              value={stats.activeClaims}
              icon={<LocalShipping />}
              color="#4caf50"
              description="Pending pickups"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Money Saved"
              value={`₹${stats.savedMoney}`}
              icon={<TrendingUp />}
              color="#ff9800"
              description="Estimated savings"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Carbon Saved"
              value={`${stats.carbonSaved}kg`}
              icon={<LocationOn />}
              color="#9c27b0"
              description="CO₂ equivalent"
            />
          </Grid>
        </Grid>

        {/* Search & Filter Section */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <FilterList color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Search & Filter Food
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* Search Bar */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search for food type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            {/* Location Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Radius</InputLabel>
                <Select
                  value={filters.radius}
                  label="Radius"
                  onChange={(e) => handleFilterChange('radius', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="1km">Within 1km</MenuItem>
                  <MenuItem value="2km">Within 2km</MenuItem>
                  <MenuItem value="5km">Within 5km</MenuItem>
                  <MenuItem value="10km">Within 10km</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Food Type Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Food Type</InputLabel>
                <Select
                  value={filters.foodType}
                  label="Food Type"
                  onChange={(e) => handleFilterChange('foodType', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="meals">Meals</MenuItem>
                  <MenuItem value="vegetables">Vegetables</MenuItem>
                  <MenuItem value="fruits">Fruits</MenuItem>
                  <MenuItem value="bakery">Bakery</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Time Frame Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>When</InputLabel>
                <Select
                  value={filters.timeFrame}
                  label="When"
                  onChange={(e) => handleFilterChange('timeFrame', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="anytime">Anytime</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="tomorrow">Tomorrow</MenuItem>
                  <MenuItem value="weekend">This Weekend</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Quantity Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={filters.quantity}
                  label="Quantity"
                  onChange={(e) => handleFilterChange('quantity', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="any">Any Amount</MenuItem>
                  <MenuItem value="small">Small (1-2 servings)</MenuItem>
                  <MenuItem value="medium">Medium (3-5 servings)</MenuItem>
                  <MenuItem value="large">Large (6+ servings)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Available Food */}
          <Grid item xs={12} lg={9}>
            <Box mb={3}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Available Food Near You
              </Typography>
              <Chip
                label={`${availableFood.length} items available`}
                sx={{
                  bgcolor: alpha('#2196f3', 0.1),
                  color: '#2196f3',
                  fontWeight: 700,
                }}
              />
            </Box>
            <Grid container spacing={3}>
              {availableFood.map((food, index) => (
                <Grid item xs={12} md={6} key={food.id}>
                  <FoodCard food={food} index={index} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* My Claims Sidebar */}
          <Grid item xs={12} lg={3}>
            <Paper sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                My Claims ({myClaims.length})
              </Typography>
              {myClaims.map((claim) => (
                <Card key={claim.id} sx={{ mb: 2, border: '1px solid #f0f0f0' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {claim.title}
                      </Typography>
                      <Chip
                        label={claim.status}
                        size="small"
                        color={claim.status === 'confirmed' ? 'success' : 'warning'}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Donor: {claim.donor}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      📍 {claim.location}
                    </Typography>
                    <Typography variant="caption" color="primary" fontWeight={600} display="block" mt={1}>
                      ⏰ {claim.pickupTime}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ReceiverDashboard;
