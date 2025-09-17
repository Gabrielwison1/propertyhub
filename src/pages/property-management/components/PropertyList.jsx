import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PropertyList = ({ 
  properties = [], 
  onEdit = () => {}, 
  onDelete = () => {}, 
  onBulkAction = () => {},
  onStatusChange = () => {},
  loading = false 
}) => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_desc');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const sortOptions = [
    { value: 'created_desc', label: 'Newest First' },
    { value: 'created_asc', label: 'Oldest First' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'title_asc', label: 'Title: A to Z' }
  ];

  const bulkActions = [
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2', variant: 'destructive' },
    { value: 'available', label: 'Mark Available', icon: 'Check', variant: 'success' },
    { value: 'pending', label: 'Mark Pending', icon: 'Clock', variant: 'warning' },
    { value: 'sold', label: 'Mark Sold', icon: 'CheckCircle', variant: 'default' }
  ];

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProperties(filteredProperties?.map(p => p?.id));
    } else {
      setSelectedProperties([]);
    }
  };

  const handleSelectProperty = (propertyId, checked) => {
    if (checked) {
      setSelectedProperties(prev => [...prev, propertyId]);
    } else {
      setSelectedProperties(prev => prev?.filter(id => id !== propertyId));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedProperties?.length === 0) return;
    
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedProperties?.length} properties?`)) {
        onBulkAction(action, selectedProperties);
        setSelectedProperties([]);
      }
    } else {
      onBulkAction(action, selectedProperties);
      setSelectedProperties([]);
    }
  };

  const handleStatusChange = (propertyId, newStatus) => {
    onStatusChange(propertyId, newStatus);
  };

  const filteredProperties = properties?.filter(property => {
    const matchesSearch = property?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         property?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property?.status === statusFilter;
    const matchesType = typeFilter === 'all' || property?.propertyType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedProperties = [...filteredProperties]?.sort((a, b) => {
    switch (sortBy) {
      case 'created_asc':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'created_desc':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'price_asc':
        return a?.price - b?.price;
      case 'price_desc':
        return b?.price - a?.price;
      case 'title_asc':
        return a?.title?.localeCompare(b?.title);
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'sold': return 'bg-primary/10 text-primary';
      case 'rented': return 'bg-secondary/10 text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4">
            <div className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="w-20 h-8 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Input
            type="search"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />

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

          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>

        {/* Bulk Actions */}
        {selectedProperties?.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-foreground">
              {selectedProperties?.length} properties selected
            </span>
            <div className="flex items-center space-x-2">
              {bulkActions?.map((action) => (
                <Button
                  key={action?.value}
                  size="sm"
                  variant={action?.variant}
                  onClick={() => handleBulkAction(action?.value)}
                  iconName={action?.icon}
                  iconPosition="left"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Properties List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-muted/30 border-b border-border p-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedProperties?.length === sortedProperties?.length && sortedProperties?.length > 0}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
              <span className="md:col-span-2">Property</span>
              <span>Type</span>
              <span>Price</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
          </div>
        </div>

        {/* Property Rows */}
        <div className="divide-y divide-border">
          {sortedProperties?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="Home" size={32} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            sortedProperties?.map((property) => (
              <div key={property?.id} className="p-4 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedProperties?.includes(property?.id)}
                    onChange={(e) => handleSelectProperty(property?.id, e?.target?.checked)}
                  />

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Property Info */}
                    <div className="md:col-span-2 flex items-center space-x-3">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {property?.images && property?.images?.length > 0 ? (
                          <Image
                            src={property?.images?.[0]}
                            alt={property?.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon name="Home" size={20} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground truncate">{property?.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {property?.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {property?.bedrooms} bed • {property?.bathrooms} bath • {property?.squareFootage} sq ft
                        </p>
                      </div>
                    </div>

                    {/* Type */}
                    <div>
                      <span className="capitalize text-sm text-foreground">{property?.propertyType}</span>
                    </div>

                    {/* Price */}
                    <div>
                      <span className="font-semibold text-foreground">
                        ${parseInt(property?.price)?.toLocaleString()}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <Select
                        options={statusOptions?.filter(opt => opt?.value !== 'all')}
                        value={property?.status}
                        onChange={(value) => handleStatusChange(property?.id, value)}
                        className="w-full"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(property?.id)}
                        iconName="Edit3"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this property?')) {
                            onDelete(property?.id);
                          }
                        }}
                        iconName="Trash2"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Results Summary */}
      {sortedProperties?.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {sortedProperties?.length} of {properties?.length} properties
        </div>
      )}
    </div>
  );
};

export default PropertyList;