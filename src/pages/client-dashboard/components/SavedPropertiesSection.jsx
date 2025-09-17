import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedPropertiesSection = ({ savedProperties = [], onRemoveProperty = () => {} }) => {
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  const handleRemoveProperty = (propertyId) => {
    if (window.confirm('Remove this property from your saved list?')) {
      onRemoveProperty(propertyId);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getPriceChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  if (savedProperties?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Saved Properties
        </h3>
        <p className="text-muted-foreground mb-6">
          Start saving properties you're interested in to keep track of them here.
        </p>
        <Button
          variant="default"
          onClick={() => navigate('/property-details')}
          iconName="Search"
          iconPosition="left"
        >
          Browse Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Saved Properties
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {savedProperties?.length} {savedProperties?.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            iconName="Grid3X3"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            iconName="List"
          />
        </div>
      </div>
      {/* Properties Grid/List */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties?.map((property) => (
              <div key={property?.id} className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-shadow duration-200">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={property?.images?.[0]}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveProperty(property?.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-error hover:bg-background transition-colors duration-200"
                  >
                    <Icon name="Heart" size={16} className="fill-current" />
                  </button>
                  {property?.status && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {property?.status}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-heading font-medium text-foreground mb-2 line-clamp-2">
                    {property?.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-semibold text-foreground">
                      {formatPrice(property?.price)}
                    </span>
                    {property?.priceChange && (
                      <div className={`flex items-center space-x-1 ${getPriceChangeColor(property?.priceChange)}`}>
                        <Icon name={getPriceChangeIcon(property?.priceChange)} size={14} />
                        <span className="text-xs font-medium">
                          {Math.abs(property?.priceChange)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    <span className="truncate">{property?.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Bed" size={14} />
                      <span>{property?.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Bath" size={14} />
                      <span>{property?.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Square" size={14} />
                      <span>{property?.area} sq ft</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleViewProperty(property?.id)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {savedProperties?.map((property) => (
              <div key={property?.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border hover:shadow-elevation-1 transition-shadow duration-200">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={property?.images?.[0]}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                  {property?.status && (
                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground px-1 py-0.5 rounded text-xs font-medium">
                      {property?.status}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-medium text-foreground mb-1 truncate">
                    {property?.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-semibold text-foreground">
                      {formatPrice(property?.price)}
                    </span>
                    {property?.priceChange && (
                      <div className={`flex items-center space-x-1 ${getPriceChangeColor(property?.priceChange)}`}>
                        <Icon name={getPriceChangeIcon(property?.priceChange)} size={12} />
                        <span className="text-xs font-medium">
                          {Math.abs(property?.priceChange)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span className="truncate">{property?.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Bed" size={12} />
                      <span>{property?.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Bath" size={12} />
                      <span>{property?.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Square" size={12} />
                      <span>{property?.area} sq ft</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewProperty(property?.id)}
                    iconName="Eye"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveProperty(property?.id)}
                    iconName="Heart"
                    className="text-error hover:text-error"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPropertiesSection;