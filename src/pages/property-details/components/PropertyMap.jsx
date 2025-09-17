import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PropertyMap = ({ property = {} }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock coordinates for demonstration
  const lat = property?.coordinates?.lat || 40.7128;
  const lng = property?.coordinates?.lng || -74.0060;

  const nearbyAmenities = [
    { name: "Central Park", type: "Park", distance: "0.3 miles", icon: "Trees" },
    { name: "Metro Station", type: "Transport", distance: "0.1 miles", icon: "Train" },
    { name: "Whole Foods", type: "Grocery", distance: "0.2 miles", icon: "ShoppingCart" },
    { name: "City Hospital", type: "Healthcare", distance: "0.5 miles", icon: "Heart" },
    { name: "Elementary School", type: "Education", distance: "0.4 miles", icon: "GraduationCap" },
    { name: "Starbucks", type: "Coffee", distance: "0.1 miles", icon: "Coffee" }
  ];

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-heading font-medium text-foreground mb-4">Location & Neighborhood</h3>
      {/* Address */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="MapPin" size={16} className="text-primary" />
        <span className="text-muted-foreground">{property?.address || "123 Main Street, New York, NY 10001"}</span>
      </div>
      {/* Map Container */}
      <div className="relative w-full h-64 lg:h-80 bg-muted rounded-lg overflow-hidden mb-6">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={property?.title || "Property Location"}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`}
          onLoad={handleMapLoad}
          className="border-0"
        />
      </div>
      {/* Neighborhood Info */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Neighborhood Highlights</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Located in the heart of {property?.neighborhood || "Manhattan"}, this property offers easy access to 
          public transportation, shopping, dining, and entertainment. The area is known for its vibrant 
          community, excellent schools, and convenient amenities.
        </p>
      </div>
      {/* Nearby Amenities */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Nearby Amenities</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {nearbyAmenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={amenity?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground text-sm">{amenity?.name}</div>
                <div className="text-xs text-muted-foreground">{amenity?.type}</div>
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {amenity?.distance}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Walk Score */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground mb-1">Walk Score</h4>
            <p className="text-xs text-muted-foreground">Based on nearby amenities</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">92</div>
            <div className="text-xs text-muted-foreground">Walker's Paradise</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;