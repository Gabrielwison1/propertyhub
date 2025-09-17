import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarProperties = ({ currentPropertyId = null }) => {
  const navigate = useNavigate();

  const similarProperties = [
    {
      id: "PROP002",
      title: "Modern Downtown Loft",
      price: 850000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "Loft",
      address: "456 Broadway, New York, NY",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      status: "available"
    },
    {
      id: "PROP003",
      title: "Luxury Penthouse Suite",
      price: 1200000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      type: "Penthouse",
      address: "789 Park Avenue, New York, NY",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      status: "available"
    },
    {
      id: "PROP004",
      title: "Cozy Garden Apartment",
      price: 650000,
      bedrooms: 2,
      bathrooms: 1,
      area: 950,
      type: "Apartment",
      address: "321 Green Street, New York, NY",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      status: "available"
    },
    {
      id: "PROP005",
      title: "Spacious Family Home",
      price: 950000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      type: "House",
      address: "654 Oak Street, New York, NY",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      status: "available"
    }
  ];

  // Filter out current property
  const filteredProperties = similarProperties?.filter(prop => prop?.id !== currentPropertyId);

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

  const handlePropertyClick = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
    window.scrollTo(0, 0);
  };

  const handleSaveProperty = (propertyId, event) => {
    event?.stopPropagation();
    // Handle save functionality
    console.log('Saving property:', propertyId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Similar Properties
        </h3>
        <Button
          variant="ghost"
          onClick={() => navigate('/property-search')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties?.slice(0, 4)?.map((property) => (
          <div
            key={property?.id}
            onClick={() => handlePropertyClick(property?.id)}
            className="group cursor-pointer bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
          >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property?.image}
                alt={property?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Save Button */}
              <button
                onClick={(e) => handleSaveProperty(property?.id, e)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="Heart" size={16} className="text-muted-foreground hover:text-accent" />
              </button>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-full">
                {property?.status}
              </div>
            </div>

            {/* Property Info */}
            <div className="p-4">
              <div className="mb-2">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                  {property?.title}
                </h4>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {property?.address}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-lg font-bold text-primary mb-3">
                {formatPrice(property?.price)}
              </div>

              {/* Features */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
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
                    <span>{formatArea(property?.area)} sq ft</span>
                  </div>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {property?.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => navigate('/property-search')}
          iconName="Search"
          iconPosition="left"
        >
          Browse More Properties
        </Button>
      </div>
    </div>
  );
};

export default SimilarProperties;