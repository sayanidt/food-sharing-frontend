import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Park,
  LocationOn,
  Group,
  TrendingUp,
  Restaurant,
  KeyboardArrowDown,
  PlayArrow,
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

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <LocationOn />,
      title: 'Hyperlocal Matching',
      description: 'AI-powered location-based food discovery within minutes',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Park />,
      title: 'Zero Waste Mission',
      description: 'Join the movement to eliminate food waste globally',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <Group />,
      title: 'Community Power',
      description: 'Connect with 10,000+ neighbors building sustainability',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <TrendingUp />,
      title: 'Smart Predictions',
      description: 'Real-time freshness scoring and demand forecasting',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
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
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,80,0.2) 0%, transparent 70%)',
          animation: `${float} 6s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,195,74,0.2) 0%, transparent 70%)',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '1s',
          zIndex: 0,
        }}
      />

      {/* Navigation */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
          background: scrollY > 50 ? alpha('#fff', 0.8) : 'transparent',
          transition: 'all 0.3s',
          boxShadow: scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🌱 FoodShare
            </Typography>
            <Box display="flex" gap={3}>
              <Button
                variant="text"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Services
              </Button>
              <Button
                variant="text"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                About us
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                  boxShadow: '0 4px 20px rgba(46,125,50,0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 30px rgba(46,125,50,0.6)',
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 15 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: `${slideUp} 1s ease-out`,
              }}
            >
              <Chip
                label="🚀 Reduce waste by 50% in your community"
                sx={{
                  mb: 3,
                  bgcolor: alpha('#fff', 0.9),
                  backdropFilter: 'blur(10px)',
                  fontWeight: 600,
                  px: 2,
                  py: 3,
                  fontSize: '0.875rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 50%, #66bb6a 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                THE FASTEST WAY TO
                <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #76ff03 0%, #64dd17 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  SHARE FOOD
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontWeight: 400,
                  maxWidth: 500,
                }}
              >
                Traditional, yet modern food sharing that utilizes advanced AI
                technology to provide sustainable solutions.
              </Typography>
              <Box display="flex" gap={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  startIcon={<PlayArrow />}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                    boxShadow: '0 8px 32px rgba(46,125,50,0.4)',
                    '&:hover': {
                      boxShadow: '0 12px 48px rgba(46,125,50,0.6)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  Start Sharing Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderWidth: 2,
                    borderColor: '#2e7d32',
                    color: '#2e7d32',
                    '&:hover': {
                      borderWidth: 2,
                      background: alpha('#2e7d32', 0.05),
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
              
              {/* Rotating Badge */}
              <Box
                sx={{
                  position: 'relative',
                  width: 150,
                  height: 150,
                  mt: 4,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #76ff03 0%, #64dd17 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: `${rotate} 20s linear infinite`,
                    boxShadow: '0 8px 32px rgba(118,255,3,0.4)',
                  }}
                >
                  <Box
                    sx={{
                      width: '85%',
                      height: '85%',
                      borderRadius: '50%',
                      bgcolor: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `${rotate} 20s linear infinite reverse`,
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} color="primary">
                      Enjoy
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      the fastest way
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                animation: `${float} 6s ease-in-out infinite`,
              }}
            >
              {/* 3D Card Effect */}
              <Box
                sx={{
                  background: alpha('#fff', 0.9),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 6,
                  p: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transform: 'perspective(1000px) rotateY(-10deg)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Animated Circles */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '80%',
                      height: '80%',
                      borderRadius: '50%',
                      border: '2px dashed rgba(255,255,255,0.3)',
                      animation: `${rotate} 30s linear infinite`,
                    }}
                  />
                  <Restaurant
                    sx={{
                      fontSize: 120,
                      color: 'white',
                      animation: `${pulse} 3s ease-in-out infinite`,
                    }}
                  />
                </Box>
                <Box mt={3}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    🌱 FoodShare
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Join 10,000+ people reducing food waste
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Scroll Indicator */}
        <Box
          textAlign="center"
          mt={8}
          sx={{
            animation: `${float} 2s ease-in-out infinite`,
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scroll Down
          </Typography>
          <IconButton sx={{ animation: `${float} 2s ease-in-out infinite` }}>
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      </Container>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '50K+', label: 'Meals Shared' },
            { value: '2.5M kg', label: 'CO₂ Saved' },
            { value: '98%', label: 'Success Rate' },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                textAlign="center"
                sx={{
                  animation: `${slideUp} 1s ease-out ${index * 0.1}s both`,
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(135deg, #1b5e20 0%, #66bb6a 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose FoodShare?
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
            AI-powered features that make food sharing simple, safe, and
            sustainable
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  background: alpha('#fff', 0.9),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  animation: `${slideUp} 1s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      background: feature.gradient,
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                  >
                    {React.cloneElement(feature.icon, { sx: { fontSize: 35 } })}
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
          py: 12,
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" fontWeight={800} color="white" gutterBottom>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.9)" paragraph sx={{ mb: 4 }}>
            Join thousands reducing food waste in their communities
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: 3,
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #76ff03 0%, #64dd17 100%)',
              color: '#1b5e20',
              boxShadow: '0 8px 32px rgba(118,255,3,0.4)',
              '&:hover': {
                boxShadow: '0 12px 48px rgba(118,255,3,0.6)',
                transform: 'translateY(-4px)',
              },
              transition: 'all 0.3s',
            }}
          >
            Get Started Now
          </Button>
        </Container>

        {/* Animated Background Circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(118,255,3,0.2) 0%, transparent 70%)',
            animation: `${float} 8s ease-in-out infinite`,
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
