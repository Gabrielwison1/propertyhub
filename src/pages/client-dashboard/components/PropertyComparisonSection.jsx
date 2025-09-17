import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyComparisonSection = ({ 
  comparisonProperties = [], 
  onRemoveFromComparison = () => {},
  onAddToComparison = () => {} 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  const handleRemoveProperty = (propertyId) => {
    onRemoveFromComparison(propertyId);
  };

  const comparisonFeatures = [
    { key: 'price', label: 'Price', format: formatPrice },
    { key: 'bedrooms', label: 'Bedrooms', format: (val) => val },
    { key: 'bathrooms', label: 'Bathrooms', format: (val) => val },
    { key: 'area', label: 'Area (sq ft)', format: (val) => val?.toLocaleString() },
    { key: 'yearBuilt', label: 'Year Built', format: (val) => val },
    { key: 'propertyType', label: 'Type', format: (val) => val },
    { key: 'parking', label: 'Parking', format: (val) => val || 'N/A' },
    { key: 'hoa', label: 'HOA Fee', format: (val) => val ? formatPrice(val) : 'None' }
  ];

  if (comparisonProperties?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="BarChart3" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-heading font-medium text-foreground mb-2">
          No Properties to Compare
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add properties to your comparison list to see them side by side.
        </p>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate('/property-details')}
          iconName="Plus"
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
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Property Comparison
          </h2>
          <p className="text-sm text-muted-foreground">
            {comparisonProperties?.length} {comparisonProperties?.length === 1 ? 'property' : 'properties'} selected
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          />
        </div>
      </div>
      {/* Compact View */}
      {!isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonProperties?.slice(0, 3)?.map((property) => (
              <div key={property?.id} className="relative bg-background rounded-lg border border-border overflow-hidden">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={property?.images?.[0]}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveProperty(property?.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-error hover:bg-background transition-colors duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
                
                <div className="p-3">
                  <h3 className="font-heading font-medium text-foreground text-sm mb-1 line-clamp-1">
                    {property?.title}
                  </h3>
                  <p className="text-lg font-semibold text-foreground mb-2">
                    {formatPrice(property?.price)}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{property?.bedrooms} bed</span>
                    <span>{property?.bathrooms} bath</span>
                    <span>{property?.area} sq ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {comparisonProperties?.length > 3 && (
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                iconName="ChevronDown"
                iconPosition="right"
              >
                View All {comparisonProperties?.length} Properties
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Expanded Comparison Table */}
      {isExpanded && (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  {comparisonProperties?.map((property) => (
                    <th key={property?.id} className="text-left py-3 px-2 min-w-48">
                      <div className="relative">
                        <div className="w-full h-24 overflow-hidden rounded-lg mb-2">
                          <Image
                            src={property?.images?.[0]}
                            alt={property?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveProperty(property?.id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-error hover:bg-background transition-colors duration-200"
                        >
                          <Icon name="X" size={12} />
                        </button>
                        <h3 className="text-sm font-medium text-foreground line-clamp-2">
                          {property?.title}
                        </h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures?.map((feature) => (
                  <tr key={feature?.key} className="border-b border-border">
                    <td className="py-3 px-2 text-sm font-medium text-foreground">
                      {feature?.label}
                    </td>
                    {comparisonProperties?.map((property) => (
                      <td key={property?.id} className="py-3 px-2 text-sm text-foreground">
                        {feature?.format(property?.[feature?.key]) || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              {comparisonProperties?.map((property) => (
                <Button
                  key={property?.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewProperty(property?.id)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              iconName="ChevronUp"
              iconPosition="left"
            >
              Collapse
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyComparisonSection;