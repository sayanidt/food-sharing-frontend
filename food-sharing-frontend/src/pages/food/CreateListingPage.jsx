import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  Add,
  Delete,
  CameraAlt,
  LocationOn,
  SmartToy,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../context/LocationContext';
import apiService from '../../services/api';

const steps = ['Food Details', 'Location & Time', 'Images & Preview'];

const foodCategories = [
  'meals', 'vegetables', 'fruits', 'dairy', 'bakery', 'packaged', 'beverages', 'snacks'
];

const foodTypes = [
  'cooked', 'raw', 'packaged', 'dairy', 'frozen'
];

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { location: userLocation } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [showAiDialog, setShowAiDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    food_type: '',
    category: '',
    quantity: '',
    tags: [],
    location: {
      coordinates: userLocation ? [userLocation.longitude, userLocation.latitude] : [],
      address: '',
      pickupInstructions: '',
    },
    availability: {
      from_time: new Date(),
      to_time: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      best_before: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      is_flexible: true,
    },
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [customTag, setCustomTag] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleDateTimeChange = (name, value) => {
    const [parent, child] = name.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()],
      }));
      setCustomTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const generateAIInsights = async () => {
    if (!formData.title || !formData.food_type || !formData.category) {
      return;
    }

    try {
      // Simulate AI insights (in real app, call AI service)
      const insights = {
        freshness_prediction: Math.floor(Math.random() * 20) + 80, // 80-100%
        demand_forecast: Math.floor(Math.random() * 30) + 70, // 70-100%
        optimal_price: Math.floor(Math.random() * 50) + 50, // $50-100
        best_pickup_time: '6:00 PM - 8:00 PM',
        carbon_impact: (Math.random() * 3 + 1).toFixed(1), // 1-4 kg CO2
        recommendations: [
          'List in the evening for better visibility',
          'Add more photos to increase trust',
          'Consider reducing pickup time window for better demand'
        ]
      };

      setAiInsights(insights);
      setShowAiDialog(true);
    } catch (error) {
      console.error('Failed to generate AI insights:', error);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      generateAIInsights();
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create listing
      const response = await apiService.createFoodListing(formData);
      const listingId = response.id;

      // Upload images if any
      if (selectedImages.length > 0) {
        await apiService.uploadFoodImages(listingId, selectedImages);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Food Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., Fresh Homemade Biryani"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Food Type</InputLabel>
                <Select
                  name="food_type"
                  value={formData.food_type}
                  onChange={handleInputChange}
                  label="Food Type"
                >
                  {foodTypes.map(type => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {foodCategories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2 servings, 1kg, 5 pieces"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Describe the food, ingredients, preparation method..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={1} alignItems="center" mb={1}>
                <TextField
                  size="small"
                  label="Add Tags"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button variant="outlined" onClick={handleAddTag}>
                  Add
                </Button>
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap">
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => removeTag(tag)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pickup Address"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={2}
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary">
                        <LocationOn />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pickup Instructions"
                  name="location.pickupInstructions"
                  value={formData.location.pickupInstructions}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  placeholder="e.g., Ring the bell, use back gate, call before coming"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <DateTimePicker
                  label="Available From"
                  value={formData.availability.from_time}
                  onChange={(value) => handleDateTimeChange('availability.from_time', value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <DateTimePicker
                  label="Available Until"
                  value={formData.availability.to_time}
                  onChange={(value) => handleDateTimeChange('availability.to_time', value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <DateTimePicker
                  label="Best Before"
                  value={formData.availability.best_before}
                  onChange={(value) => handleDateTimeChange('availability.best_before', value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Add Photos (Optional)
              </Typography>
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                }}
                component="label"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageSelect}
                />
                <CameraAlt color="action" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body1">
                  Click to add food photos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Photos help build trust and get more claims
                </Typography>
              </Box>
            </Grid>

            {imagePreviewUrls.length > 0 && (
              <Grid item xs={12}>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {imagePreviewUrls.map((url, index) => (
                    <Box key={index} position="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          bgcolor: 'background.paper',
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📋 Listing Preview
                  </Typography>
                  <Box display="flex" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      {formData.title.charAt(0) || 'F'}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{formData.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formData.food_type} • {formData.category} • {formData.quantity}
                      </Typography>
                    </Box>
                  </Box>
                  {formData.description && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {formData.description}
                    </Typography>
                  )}
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {formData.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Share Your Food 🍽️
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Help reduce food waste in your community
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          <Box display="flex" gap={1}>
            {activeStep === 0 && (
              <Button
                variant="outlined"
                startIcon={<SmartToy />}
                onClick={generateAIInsights}
              >
                AI Insights
              </Button>
            )}
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? null : <CheckCircle />}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* AI Insights Dialog */}
      <Dialog
        open={showAiDialog}
        onClose={() => setShowAiDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          🤖 AI Insights for Your Listing
        </DialogTitle>
        <DialogContent>
          {aiInsights && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {aiInsights.freshness_prediction}%
                    </Typography>
                    <Typography variant="body2">
                      Predicted Freshness
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      {aiInsights.demand_forecast}%
                    </Typography>
                    <Typography variant="body2">
                      Expected Demand
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography variant="body2" gutterBottom>
                    💡 AI Recommendations:
                  </Typography>
                  {aiInsights.recommendations.map((rec, index) => (
                    <Typography key={index} variant="body2" component="div">
                      • {rec}
                    </Typography>
                  ))}
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">
                    🌱 Carbon Impact: Save {aiInsights.carbon_impact}kg CO₂
                  </Typography>
                  <Typography variant="body2">
                    ⏰ Best time: {aiInsights.best_pickup_time}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateListingPage;
