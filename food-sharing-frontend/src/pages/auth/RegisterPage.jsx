import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  LocationOn,
  Favorite,
  Restaurant,
} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { location: userLocation, getCurrentLocation } = useLocation();

  const [selectedRole, setSelectedRole] = useState(null); // null | 'donor' | 'receiver'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: { coordinates: [], address: '', pincode: '' },
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (error) setError('');
  };

  const handleLocationDetect = async () => {
    await getCurrentLocation();
    if (userLocation) {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: [userLocation.longitude, userLocation.latitude],
        },
      }));
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth
    console.log('Google Sign In clicked - Integrate Google OAuth here');
    alert('Google Sign-In will be integrated with OAuth 2.0');
  };

  const validateForm = () => {
    if (!selectedRole) {
      setError('Please select a role (Donate or Receive)');
      return false;
    }
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!formData.location.address) {
      setError('Address is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await register({ ...formData, role: selectedRole });
      
      if (selectedRole === 'donor') {
        navigate('/donor-dashboard');
      } else {
        navigate('/receiver-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Role Selection View
  if (!selectedRole) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
          display: 'flex',
          alignItems: 'center',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(76,175,80,0.2) 0%, transparent 70%)',
            animation: `${float} 6s ease-in-out infinite`,
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,
              background: alpha('#fff', 0.95),
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              animation: `${slideUp} 0.8s ease-out`,
            }}
          >
            <Box textAlign="center" mb={5}>
              <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>🌱</Typography>
              <Typography
                variant="h4"
                fontWeight={800}
                gutterBottom
                sx={{
                  background: 'linear-gradient(135deg, #1b5e20 0%, #66bb6a 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Join FoodShare
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>
                How would you like to participate?
              </Typography>
            </Box>

            <Box display="flex" gap={3} mb={4}>
              {/* Donate Card */}
              <Card
                onClick={() => setSelectedRole('donor')}
                sx={{
                  flex: 1,
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(76,175,80,0.3)',
                    borderColor: '#4caf50',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha('#4caf50', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <Restaurant sx={{ fontSize: 40, color: '#4caf50' }} />
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    I want to Donate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Share surplus food with your community and reduce waste
                  </Typography>
                </CardContent>
              </Card>

              {/* Receive Card */}
              <Card
                onClick={() => setSelectedRole('receiver')}
                sx={{
                  flex: 1,
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(33,150,243,0.3)',
                    borderColor: '#2196f3',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha('#2196f3', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <Favorite sx={{ fontSize: 40, color: '#2196f3' }} />
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    I want to Receive
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discover and claim free food shared by your neighbors
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Registration Form View
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,175,80,0.2) 0%, transparent 70%)',
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            background: alpha('#fff', 0.95),
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            animation: `${slideUp} 0.8s ease-out`,
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>🌱</Typography>
            <Typography
              variant="h4"
              fontWeight={800}
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #1b5e20 0%, #66bb6a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              As a {selectedRole === 'donor' ? 'Food Donor' : 'Food Receiver'}
            </Typography>
            <Button
              size="small"
              onClick={() => setSelectedRole(null)}
              sx={{ mt: 1 }}
            >
              Change Role
            </Button>
          </Box>

          {/* Google Sign In */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{
              mb: 3,
              py: 1.5,
              borderRadius: 2,
              borderWidth: 2,
              fontWeight: 600,
              '&:hover': {
                borderWidth: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              variant="outlined"
              onClick={handleLocationDetect}
              startIcon={<LocationOn />}
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                fontWeight: 700,
                '&:hover': { borderWidth: 2 },
              }}
            >
              Detect My Location
            </Button>

            <TextField
              fullWidth
              label="Address"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              margin="normal"
              multiline
              rows={2}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            
            <TextField
              fullWidth
              label="PIN Code"
              name="location.pincode"
              value={formData.location.pincode}
              onChange={handleChange}
              margin="normal"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.8,
                borderRadius: 2,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                boxShadow: '0 8px 24px rgba(46,125,50,0.4)',
                '&:hover': {
                  boxShadow: '0 12px 36px rgba(46,125,50,0.6)',
                },
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
