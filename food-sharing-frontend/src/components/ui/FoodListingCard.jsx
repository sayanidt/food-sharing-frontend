import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Rating,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  AccessTime,
  LocationOn,
  Grade,
  TrendingUp,
  Phone,
  Favorite,
  FavoriteBorder,
  Share,
  EcoOutlined,
} from '@mui/icons-material';

const FoodListingCard = ({ 
  listing, 
  onClaim, 
  onContact, 
  onFavorite,
  compact = false,
  showActions = true 
}) => {
  const {
    id,
    title,
    description,
    food_type,
    category,
    quantity,
    images = [],
    location,
    availability,
    ai_predictions,
    donor_name,
    donor_reputation,
    status,
    created_at
  } = listing;

  const getFreshnessColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getTimeUntilExpiry = () => {
    const now = new Date();
    const expiry = new Date(availability.best_before);
    const hours = Math.floor((expiry - now) / (1000 * 60 * 60));
    
    if (hours < 0) return 'Expired';
    if (hours < 24) return `${hours}h left`;
    const days = Math.floor(hours / 24);
    return `${days}d left`;
  };

  const getDemandLevel = () => {
    const demand = ai_predictions.demand_prediction;
    if (demand > 0.8) return { text: 'High Demand', color: 'error' };
    if (demand > 0.5) return { text: 'Medium Demand', color: 'warning' };
    return { text: 'Low Demand', color: 'success' };
  };

  const getCarbonSavings = () => {
    // Estimate carbon savings based on food type and quantity
    const baseCarbon = { meals: 2.5, vegetables: 0.8, fruits: 0.6, packaged: 1.2 };
    return (baseCarbon[category] || 1.0).toFixed(1);
  };

  const demand = getDemandLevel();

  return (
    <Card 
      sx={{ 
        maxWidth: compact ? 300 : 400,
        mb: compact ? 1 : 2,
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      {/* AI Insights Badges */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Chip
          icon={<Grade />}
          label={`${Math.round(ai_predictions.freshness_score)}%`}
          size="small"
          color={getFreshnessColor(ai_predictions.freshness_score)}
          sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        />
        <Chip
          icon={<TrendingUp />}
          label={demand.text}
          size="small"
          color={demand.color}
          variant="outlined"
          sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        />
      </Box>

      {/* Status Badge */}
      {status !== 'available' && (
        <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
          <Chip
            label={status.toUpperCase()}
            size="small"
            color="secondary"
            sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          />
        </Box>
      )}

      {/* Food Image */}
      {images.length > 0 && (
        <CardMedia
          component="img"
          height={compact ? 120 : 200}
          image={images[0]}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ pb: compact ? 1 : 2 }}>
        {/* Title and Category */}
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
          <Typography 
            variant={compact ? "subtitle1" : "h6"} 
            component="div"
            sx={{ fontWeight: 600, lineHeight: 1.2 }}
          >
            {title}
          </Typography>
          <Chip
            label={category}
            size="small"
            variant="outlined"
            sx={{ ml: 1, flexShrink: 0 }}
          />
        </Box>

        {/* Description */}
        {!compact && description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </Typography>
        )}

        {/* Food Details */}
        <Box display="flex" gap={1} mb={1.5}>
          <Chip label={food_type} size="small" variant="outlined" />
          <Chip label={`Qty: ${quantity}`} size="small" variant="outlined" />
        </Box>

        {/* Time and Location */}
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {getTimeUntilExpiry()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {location.address.substring(0, 30)}...
            </Typography>
          </Box>
        </Box>

        {/* Environmental Impact */}
        <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
          <EcoOutlined fontSize="small" color="success" />
          <Typography variant="caption" color="success.main">
            Save {getCarbonSavings()}kg CO₂
          </Typography>
        </Box>

        {/* Freshness Progress */}
        <Box mb={1.5}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="caption" color="text.secondary">
              Freshness Score
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              {Math.round(ai_predictions.freshness_score)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={ai_predictions.freshness_score}
            color={getFreshnessColor(ai_predictions.freshness_score)}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>

        {/* Donor Info */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ width: 28, height: 28, fontSize: '14px' }}>
              {donor_name?.charAt(0) || 'D'}
            </Avatar>
            <Box>
              <Typography variant="caption" display="block">
                {donor_name}
              </Typography>
              <Rating
                value={donor_reputation || 5}
                precision={0.1}
                size="small"
                readOnly
              />
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {new Date(created_at).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
          <Box display="flex" gap={1} width="100%">
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={() => onClaim && onClaim(listing)}
              disabled={status !== 'available'}
              sx={{ flexGrow: 1 }}
            >
              {status === 'available' ? 'Claim Food' : 'Not Available'}
            </Button>
            
            <Tooltip title="Contact Donor">
              <IconButton
                size="small"
                onClick={() => onContact && onContact(listing.donor_phone)}
                color="primary"
              >
                <Phone />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Add to Favorites">
              <IconButton
                size="small"
                onClick={() => onFavorite && onFavorite(listing)}
                color="error"
              >
                {listing.is_favorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Share">
              <IconButton
                size="small"
                onClick={() => navigator.share && navigator.share({
                  title: listing.title,
                  text: `Check out this food sharing opportunity: ${listing.title}`,
                  url: window.location.href + `/food/${listing.id}`
                })}
              >
                <Share />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default FoodListingCard;
