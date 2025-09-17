import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterBar = ({ onFilterChange, filters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(filters);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const propertyTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const inquiryOptions = [
    { value: 'all', label: 'All Inquiries' },
    { value: 'high', label: 'High Activity (10+)' },
    { value: 'medium', label: 'Medium Activity (5-9)' },
    { value: 'low', label: 'Low Activity (1-4)' },
    { value: 'none', label: 'No Inquiries' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: 'all',
      propertyType: 'all',
      dateRange: 'all',
      inquiryLevel: 'all',
      priceMin: '',
      priceMax: '',
      search: ''
    };
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => 
      value && value !== 'all' && value !== ''
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      {/* Filter Toggle Bar */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="left"
            >
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>
            
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Quick Search */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search properties..."
                value={activeFilters?.search || ''}
                onChange={(e) => handleFilterChange('search', e?.target?.value)}
                className="w-64"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </div>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Status"
              options={statusOptions}
              value={activeFilters?.status || 'all'}
              onChange={(value) => handleFilterChange('status', value)}
            />

            <Select
              label="Property Type"
              options={propertyTypeOptions}
              value={activeFilters?.propertyType || 'all'}
              onChange={(value) => handleFilterChange('propertyType', value)}
            />

            <Select
              label="Date Added"
              options={dateRangeOptions}
              value={activeFilters?.dateRange || 'all'}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            <Select
              label="Inquiry Activity"
              options={inquiryOptions}
              value={activeFilters?.inquiryLevel || 'all'}
              onChange={(value) => handleFilterChange('inquiryLevel', value)}
            />
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Minimum Price"
              type="number"
              placeholder="Min price ($)"
              value={activeFilters?.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
            />

            <Input
              label="Maximum Price"
              type="number"
              placeholder="Max price ($)"
              value={activeFilters?.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
            />
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {getActiveFilterCount() > 0 && (
        <div className="px-6 py-3 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (!value || value === 'all' || value === '') return null;
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                >
                  <span>{key}: {value}</span>
                  <button
                    onClick={() => handleFilterChange(key, key === 'search' ? '' : 'all')}
                    className="hover:text-primary/80 transition-colors duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;