import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const PropertyOversightTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      type: "apartment",
      price: 450000,
      location: "Downtown, Seattle",
      status: "pending",
      agent: "Sarah Johnson",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"],
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      featured: false,
      createdDate: "2024-09-15"
    },
    {
      id: 2,
      title: "Luxury Family Home",
      type: "house",
      price: 750000,
      location: "Bellevue, WA",
      status: "approved",
      agent: "Michael Chen",
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop"],
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      featured: true,
      createdDate: "2024-09-12"
    },
    {
      id: 3,
      title: "Cozy Studio Loft",
      type: "apartment",
      price: 320000,
      location: "Capitol Hill, Seattle",
      status: "approved",
      agent: "David Wilson",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop"],
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      featured: false,
      createdDate: "2024-09-10"
    },
    {
      id: 4,
      title: "Suburban Townhouse",
      type: "townhouse",
      price: 580000,
      location: "Redmond, WA",
      status: "rejected",
      agent: "Sarah Johnson",
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop"],
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1850,
      featured: false,
      createdDate: "2024-09-08"
    },
    {
      id: 5,
      title: "Waterfront Condo",
      type: "condo",
      price: 890000,
      location: "Kirkland, WA",
      status: "approved",
      agent: "Michael Chen",
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop"],
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      featured: true,
      createdDate: "2024-09-05"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' }
  ];

  const filteredProperties = properties?.filter(property => {
    const matchesSearch = property?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         property?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         property?.agent?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property?.status === statusFilter;
    const matchesType = typeFilter === 'all' || property?.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handlePropertyAction = (propertyId, action) => {
    console.log(`${action} property ${propertyId}`);
    // Handle property actions
  };

  const handleBulkAction = (action) => {
    console.log(`${action} properties:`, selectedProperties);
    // Handle bulk actions
    setSelectedProperties([]);
  };

  const handleSelectProperty = (propertyId) => {
    setSelectedProperties(prev => 
      prev?.includes(propertyId) 
        ? prev?.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProperties?.length === filteredProperties?.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties?.map(p => p?.id));
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-success/10 text-success`;
      case 'pending':
        return `${baseClasses} bg-warning/10 text-warning`;
      case 'rejected':
        return `${baseClasses} bg-error/10 text-error`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
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

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search properties by title, location, or agent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
            placeholder="Filter by type"
          />
          
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/property-management')}
          >
            Add Property
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedProperties?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedProperties?.length} properties selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Check"
                onClick={() => handleBulkAction('approve')}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                onClick={() => handleBulkAction('reject')}
              >
                Reject
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Star"
                onClick={() => handleBulkAction('feature')}
              >
                Feature
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedProperties([])}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Properties Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProperties?.length === filteredProperties?.length && filteredProperties?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Property</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Price</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Agent</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Featured</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProperties?.map((property) => (
                <tr key={property?.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedProperties?.includes(property?.id)}
                      onChange={() => handleSelectProperty(property?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={property?.images?.[0]}
                          alt={property?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{property?.title}</p>
                        <p className="text-sm text-muted-foreground">{property?.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {property?.bedrooms} bed • {property?.bathrooms} bath • {property?.sqft} sqft
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-foreground">{formatPrice(property?.price)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-foreground">{property?.agent}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(property?.status)}>
                      {property?.status?.charAt(0)?.toUpperCase() + property?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Icon 
                        name={property?.featured ? "Star" : "StarOff"} 
                        size={16} 
                        className={property?.featured ? "text-warning" : "text-muted-foreground"} 
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => navigate(`/property-details?id=${property?.id}`)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit3"
                        onClick={() => handlePropertyAction(property?.id, 'edit')}
                      />
                      {property?.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Check"
                            onClick={() => handlePropertyAction(property?.id, 'approve')}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            onClick={() => handlePropertyAction(property?.id, 'reject')}
                          />
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={property?.featured ? "StarOff" : "Star"}
                        onClick={() => handlePropertyAction(property?.id, 'toggle-feature')}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredProperties?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyOversightTab;