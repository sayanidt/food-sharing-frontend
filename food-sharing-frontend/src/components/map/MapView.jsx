import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Chip, Button, Typography, Avatar, Rating } from '@mui/material';
import { LocationOn, Schedule, Grade } from '@mui/icons-material';

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
});

const MapView = ({ listings = [], userLocation, onListingClick, height = 400 }) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const mapRef = useRef(null);

  // Create custom icons based on food category
  const createCustomIcon = (category, freshness) => {
    const getColor = () => {
      if (freshness >= 80) return '#4CAF50'; // Green
      if (freshness >= 60) return '#FF9800'; // Orange
      return '#F44336'; // Red
    };

    const categoryIcons = {
      meals: '🍽️',
      vegetables: '🥕',
      fruits: '🍎',
      bakery: '🍞',
      dairy: '🥛',
      packaged: '📦',
    };

    return L.divIcon({
      className: 'custom-food-marker',
      html: `
        <div style="
          background: ${getColor()};
          border: 3px solid white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          font-size: 18px;
        ">
          ${categoryIcons[category] || '🍴'}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35],
    });
  };

  // Create user location icon
  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `
      <div style="
        background: #2196F3;
        border: 4px solid white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
          100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
        }
      </style>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const MapController = () => {
    const map = useMap();
    mapRef.current = map;

    useEffect(() => {
      if (userLocation && listings.length > 0) {
        const group = new L.featureGroup([
          L.marker([userLocation.latitude, userLocation.longitude]),
          ...listings.map(listing => 
            L.marker([listing.location.coordinates[1], listing.location.coordinates[0]])
          )
        ]);
        map.fitBounds(group.getBounds().pad(0.1));
      } else if (userLocation) {
        map.setView([userLocation.latitude, userLocation.longitude], 13);
      }
    }, [userLocation, listings, map]);

    return null;
  };

  const formatTimeRemaining = (bestBefore) => {
    const now = new Date();
    const expiry = new Date(bestBefore);
    const hours = Math.floor((expiry - now) / (1000 * 60 * 60));
    
    if (hours < 24) return `${hours}h left`;
    const days = Math.floor(hours / 24);
    return `${days}d left`;
  };

  const defaultCenter = userLocation 
    ? [userLocation.latitude, userLocation.longitude]
    : [20.5937, 78.9629]; // India center

  return (
    <Box sx={{ height, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <LocationOn color="primary" />
                <Typography variant="body2" fontWeight="bold">
                  Your Location
                </Typography>
              </Box>
            </Popup>
          </Marker>
        )}

        {/* Food Listings Markers */}
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.location.coordinates[1], listing.location.coordinates[0]]}
            icon={createCustomIcon(listing.category, listing.ai_predictions.freshness_score)}
            eventHandlers={{
              click: () => setSelectedListing(listing),
            }}
          >
            <Popup maxWidth={300} minWidth={250}>
              <Box sx={{ p: 1 }}>
                {/* Header */}
                <Box display="flex" justifyContent="between" alignItems="start" mb={1}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {listing.title}
                  </Typography>
                </Box>

                {/* AI Insights */}
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    icon={<Grade />}
                    label={`${Math.round(listing.ai_predictions.freshness_score)}% fresh`}
                    size="small"
                    color={listing.ai_predictions.freshness_score >= 80 ? 'success' : 
                           listing.ai_predictions.freshness_score >= 60 ? 'warning' : 'error'}
                  />
                  <Chip
                    icon={<Schedule />}
                    label={formatTimeRemaining(listing.availability.best_before)}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                {/* Food Details */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                  <strong>Type:</strong> {listing.food_type} • <strong>Qty:</strong> {listing.quantity}
                </Typography>

                {listing.description && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {listing.description.length > 80 
                      ? `${listing.description.substring(0, 80)}...`
                      : listing.description
                    }
                  </Typography>
                )}

                {/* Donor Info */}
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
                    {listing.donor_name?.charAt(0) || 'D'}
                  </Avatar>
                  <Typography variant="body2">
                    {listing.donor_name}
                  </Typography>
                  <Rating
                    value={listing.donor_reputation || 5}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                </Box>

                {/* Images */}
                {listing.images && listing.images.length > 0 && (
                  <Box mb={2}>
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                )}

                {/* Actions */}
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={() => onListingClick && onListingClick(listing)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(`tel:${listing.donor_phone || ''}`)}
                  >
                    Call
                  </Button>
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;
