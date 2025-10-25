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
  alpha,
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
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
        category: 'meals',
        quantity: '4 servings',
        location: { address: 'Koramangala, Bangalore' },
        ai_predictions: { freshness_score: 95, demand_prediction: 0.8 },
        donor: { name: 'Priya', reputation: { rating: 4.8 } },
      },
      {
        id: '2',
        title: 'Organic Vegetables',
        category: 'vegetables',
        quantity: '2kg mixed',
        location: { address: 'Indiranagar, Bangalore' },
        ai_predictions: { freshness_score: 88, demand_prediction: 0.6 },
        donor: { name: 'Rahul', reputation: { rating: 4.5 } },
      }
    ]);
  }, []);

  const QuickActionCard = ({ title, description, icon, onClick, gradient }) => (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        background: gradient,
        color: 'white',
        borderRadius: 4,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        '&:hover': {
          transform: 'translateY(-12px) scale(1.02)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          backgroundSize: '1000px 100%',
          animation: `${shimmer} 3s infinite`,
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center', py: 4, position: 'relative', zIndex: 1 }}>
        <Avatar
          sx={{
            bgcolor: 'rgba(255,255,255,0.25)',
            mx: 'auto',
            mb: 2,
            width: 70,
            height: 70,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            animation: `${pulse} 3s ease-in-out infinite`,
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
          {description}
        </Typography>
        <ArrowForward
          sx={{
            fontSize: 24,
            transition: 'transform 0.3s',
            '.MuiCard-root:hover &': {
              transform: 'translateX(8px)',
            },
          }}
        />
      </CardContent>
    </Card>
  );

  const StatCard = ({ title, value, subtitle, progress, gradient, icon }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        background: gradient,
        color: 'white',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        transition: 'all 0.4s',
        animation: `${slideUp} 0.8s ease-out`,
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              textShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            {value}
          </Typography>
          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              width: 56,
              height: 56,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
          {subtitle}
        </Typography>
        {progress !== undefined && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.25)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'white',
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(255,255,255,0.3)',
              },
            }}
          />
        )}
      </Box>

      {/* Animated Background Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          animation: `${float} 6s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '1s',
          zIndex: 0,
        }}
      />
    </Paper>
  );

  const SimpleFoodCard = ({ listing, index }) => (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        background: alpha('#fff', 0.95),
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        animation: `${slideUp} 0.8s ease-out ${index * 0.15}s both`,
        '&:hover': {
          transform: 'translateY(-12px) scale(1.02)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box
        sx={{
          height: 200,
          background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
          },
        }}
      >
        <Restaurant
          sx={{
            fontSize: 100,
            color: 'white',
            position: 'relative',
            zIndex: 1,
            animation: `${pulse} 3s ease-in-out infinite`,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          }}
        />
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
          <Typography variant="h6" fontWeight={700}>
            {listing.title}
          </Typography>
          <Chip
            label={`${listing.ai_predictions.freshness_score}% fresh`}
            color="success"
            size="small"
            sx={{
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(76,175,80,0.3)',
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={600}>
          {listing.quantity} • {listing.category}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5} mb={2}>
          <LocationOn fontSize="small" sx={{ color: '#e91e63' }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {listing.location.address}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {listing.donor.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700}>
              {listing.donor.name}
            </Typography>
            <Typography variant="caption" color="warning.main" fontWeight={600}>
              ⭐ {listing.donor.reputation.rating}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '1rem',
            borderRadius: 2,
            background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
            boxShadow: '0 4px 16px rgba(46,125,50,0.4)',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(46,125,50,0.6)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s',
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
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)',
          animation: `${float} 8s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,195,74,0.15) 0%, transparent 70%)',
          animation: `${float} 10s ease-in-out infinite`,
          animationDelay: '1s',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box sx={{ animation: `${slideUp} 0.8s ease-out` }}>
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                background: 'linear-gradient(135deg, #1b5e20 0%, #66bb6a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome back! 👋
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              Continue your journey of reducing food waste
            </Typography>
          </Box>
          <IconButton
            onClick={() => setLoading(!loading)}
            sx={{
              bgcolor: alpha('#fff', 0.9),
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: alpha('#fff', 1),
                transform: 'rotate(180deg)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.5s',
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Impact Stats */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Foods Shared"
              value={stats.foodShared}
              subtitle="Items donated"
              progress={(stats.foodShared / 50) * 100}
              gradient="linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)"
              icon={<Restaurant />}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Foods Received"
              value={stats.foodReceived}
              subtitle="Items claimed"
              progress={(stats.foodReceived / 30) * 100}
              gradient="linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)"
              icon={<LocationOn />}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Carbon Saved"
              value={`${stats.carbonSaved}kg`}
              subtitle="CO2 equivalent"
              progress={(stats.carbonSaved / 100) * 100}
              gradient="linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)"
              icon={<Park />}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard
              title="Impact Score"
              value={stats.impactScore}
              subtitle="Sustainability rating"
              progress={stats.impactScore}
              gradient="linear-gradient(135deg, #7b1fa2 0%, #ba68c8 100%)"
              icon={<TrendingUp />}
            />
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontWeight={800}
              gutterBottom
              sx={{
                mt: 2,
                mb: 1,
                color: '#1b5e20',
              }}
            >
              Quick Actions
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Share Food"
              description="List surplus food items"
              icon={<Add sx={{ fontSize: 36 }} />}
              onClick={() => navigate('/create-listing')}
              gradient="linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Find Food"
              description="Browse available items"
              icon={<Search sx={{ fontSize: 36 }} />}
              onClick={() => navigate('/browse')}
              gradient="linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="View Impact"
              description="Track your contribution"
              icon={<Park sx={{ fontSize: 36 }} />}
              onClick={() => navigate('/impact')}
              gradient="linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Community"
              description="Connect with others"
              icon={<TrendingUp sx={{ fontSize: 36 }} />}
              onClick={() => navigate('/community')}
              gradient="linear-gradient(135deg, #7b1fa2 0%, #ba68c8 100%)"
            />
          </Grid>

          {/* Recent Listings */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={2}
            >
              <Typography variant="h5" fontWeight={800} color="#1b5e20">
                Recent Food Near You
              </Typography>
              <Chip
                label={`${nearbyListings.length} items`}
                sx={{
                  fontWeight: 700,
                  bgcolor: alpha('#fff', 0.9),
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          </Grid>
          {nearbyListings.map((listing, index) => (
            <Grid item xs={12} md={6} key={listing.id}>
              <SimpleFoodCard listing={listing} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
