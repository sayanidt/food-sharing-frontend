import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import {
  LocationOn,
  Restaurant,
} from '@mui/icons-material';

const FoodListingCard = ({ 
  listing, 
  onClaim, 
  onContact,
  compact = false 
}) => {
  if (!listing) return null;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Food Image Placeholder */}
      <Box
        sx={{
          height: compact ? 120 : 160,
          background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Restaurant sx={{ fontSize: 60, color: 'white' }} />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title and Freshness */}
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
          <Typography variant={compact ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600 }}>
            {listing.title}
          </Typography>
          <Chip
            label={`${listing.ai_predictions?.freshness_score || 90}% fresh`}
            color="success"
            size="small"
          />
        </Box>

        {/* Quantity and Category */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {listing.quantity} • {listing.category}
        </Typography>

        {/* Location */}
        <Box display="flex" alignItems="center" gap={0.5} mb={2}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {listing.location?.address || 'Location not specified'}
          </Typography>
        </Box>

        {/* Donor Info */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mt="auto">
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
              {listing.donor?.name?.charAt(0) || listing.donor_name?.charAt(0) || 'D'}
            </Avatar>
            <Typography variant="body2">
              {listing.donor?.name || listing.donor_name || 'Anonymous'}
            </Typography>
          </Box>
          
          {onClaim && (
            <Button
              size="small"
              variant="contained"
              onClick={() => onClaim(listing)}
            >
              Claim
            </Button>
          )}
        </Box>

        {/* Contact Button */}
        {onContact && (
          <Button
            size="small"
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => onContact(listing.donor?.phone || listing.donor_phone)}
          >
            Contact
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodListingCard;
