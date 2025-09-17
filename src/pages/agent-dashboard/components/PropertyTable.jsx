import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PropertyTable = ({ properties, onEdit, onDelete, onStatusChange }) => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'price', label: 'Price' },
    { value: 'title', label: 'Property Name' },
    { value: 'status', label: 'Status' },
    { value: 'inquiries', label: 'Inquiries' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'sold':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rented':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'inactive':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProperties(properties?.map(p => p?.id));
    } else {
      setSelectedProperties([]);
    }
  };

  const handleSelectProperty = (propertyId, checked) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, propertyId]);
    } else {
      setSelectedProperties(selectedProperties?.filter(id => id !== propertyId));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedProperties = [...properties]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'price') {
      aValue = parseFloat(aValue?.toString()?.replace(/[^0-9.-]+/g, ''));
      bValue = parseFloat(bValue?.toString()?.replace(/[^0-9.-]+/g, ''));
    }
    
    if (sortBy === 'dateAdded') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedProperties?.length === properties?.length}
                onChange={(e) => handleSelectAll(e?.target?.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                {selectedProperties?.length > 0 ? `${selectedProperties?.length} selected` : 'Select all'}
              </span>
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-40"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSort(sortBy)}
              iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
              iconPosition="right"
            >
              Sort
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Inquiries
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProperties?.map((property) => (
              <tr key={property?.id} className="hover:bg-muted/30 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedProperties?.includes(property?.id)}
                      onChange={(e) => handleSelectProperty(property?.id, e?.target?.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={property?.images?.[0]}
                        alt={property?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{property?.title}</h4>
                      <p className="text-sm text-muted-foreground">{property?.location}</p>
                      <p className="text-xs text-muted-foreground">
                        {property?.bedrooms} bed • {property?.bathrooms} bath • {property?.sqft} sq ft
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">
                    {formatPrice(property?.price)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Select
                    options={statusOptions}
                    value={property?.status}
                    onChange={(value) => onStatusChange(property?.id, value)}
                    className="w-32"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{property?.inquiries}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(property?.dateAdded)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/property-details?id=${property?.id}`)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(property?.id)}
                      iconName="Edit3"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(property?.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedProperties?.map((property) => (
          <div key={property?.id} className="p-4">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedProperties?.includes(property?.id)}
                onChange={(e) => handleSelectProperty(property?.id, e?.target?.checked)}
                className="mt-1 rounded border-border text-primary focus:ring-primary"
              />
              <div className="w-20 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={property?.images?.[0]}
                  alt={property?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{property?.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{property?.location}</p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {formatPrice(property?.price)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property?.status)}`}>
                    {property?.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/property-details?id=${property?.id}`)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(property?.id)}
                      iconName="Edit3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTable;