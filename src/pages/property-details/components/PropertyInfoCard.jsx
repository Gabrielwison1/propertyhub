import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyInfoCard = ({ property = {} }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const formatArea = (area) => {
    return new Intl.NumberFormat('en-US')?.format(area);
  };

  const getPropertyTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'house': return 'Home';
      case 'apartment': return 'Building2';
      case 'condo': return 'Building';
      case 'townhouse': return 'Home';
      case 'commercial': return 'Store';
      default: return 'Home';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available': return 'text-success bg-success/10';
      case 'sold': return 'text-destructive bg-destructive/10';
      case 'rented': return 'text-warning bg-warning/10';
      case 'pending': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
            {property?.title || "Property Title"}
          </h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span className="text-sm">{property?.address || "Property Address"}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property?.status)}`}>
          {property?.status || "Available"}
        </div>
      </div>
      {/* Price */}
      <div className="mb-6">
        <div className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-1">
          {formatPrice(property?.price || 0)}
        </div>
        {property?.pricePerSqft && (
          <div className="text-sm text-muted-foreground">
            ${property?.pricePerSqft}/sq ft
          </div>
        )}
      </div>
      {/* Key Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bed" size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">
              {property?.bedrooms || 0}
            </div>
            <div className="text-xs text-muted-foreground">Bedrooms</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bath" size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">
              {property?.bathrooms || 0}
            </div>
            <div className="text-xs text-muted-foreground">Bathrooms</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Square" size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">
              {formatArea(property?.area || 0)}
            </div>
            <div className="text-xs text-muted-foreground">Sq Ft</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getPropertyTypeIcon(property?.type)} size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-lg font-medium text-foreground">
              {property?.type || "House"}
            </div>
            <div className="text-xs text-muted-foreground">Type</div>
          </div>
        </div>
      </div>
      {/* Description */}
      {property?.description && (
        <div className="mb-6">
          <h3 className="text-lg font-heading font-medium text-foreground mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {property?.description}
          </p>
        </div>
      )}
      {/* Features */}
      {property?.features && property?.features?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-heading font-medium text-foreground mb-3">Features</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {property?.features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Property Details Table */}
      <div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-3">Property Details</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Property ID</span>
              <span className="font-medium text-foreground">{property?.id || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Year Built</span>
              <span className="font-medium text-foreground">{property?.yearBuilt || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Lot Size</span>
              <span className="font-medium text-foreground">{property?.lotSize || "N/A"}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Parking</span>
              <span className="font-medium text-foreground">{property?.parking || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Heating</span>
              <span className="font-medium text-foreground">{property?.heating || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Cooling</span>
              <span className="font-medium text-foreground">{property?.cooling || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoCard;