import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const SearchContextBar = ({ 
  isVisible = false,
  onSearch = () => {},
  onFilterChange = () => {},
  onSaveSearch = () => {},
  savedSearches = [],
  filters = {},
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-100000', label: 'Under $100K' },
    { value: '100000-250000', label: '$100K - $250K' },
    { value: '250000-500000', label: '$250K - $500K' },
    { value: '500000-1000000', label: '$500K - $1M' },
    { value: '1000000+', label: 'Over $1M' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any Bedrooms' },
    { value: '1', label: '1+ Bedroom' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
    { value: '5', label: '5+ Bedrooms' }
  ];

  const bathroomOptions = [
    { value: 'all', label: 'Any Bathrooms' },
    { value: '1', label: '1+ Bathroom' },
    { value: '2', label: '2+ Bathrooms' },
    { value: '3', label: '3+ Bathrooms' },
    { value: '4', label: '4+ Bathrooms' }
  ];

  useEffect(() => {
    setActiveFilters(filters);
  }, [filters]);

  const handleSearch = () => {
    onSearch(searchQuery, activeFilters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSaveSearch = () => {
    if (searchQuery?.trim()) {
      onSaveSearch({
        query: searchQuery,
        filters: activeFilters,
        name: `Search: ${searchQuery}`
      });
    }
  };

  const handleLoadSavedSearch = (savedSearch) => {
    setSearchQuery(savedSearch?.query);
    setActiveFilters(savedSearch?.filters);
    onSearch(savedSearch?.query, savedSearch?.filters);
    setShowSavedSearches(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      propertyType: 'all',
      priceRange: 'all',
      bedrooms: 'all',
      bathrooms: 'all',
      location: ''
    };
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => 
      value && value !== 'all' && value !== ''
    )?.length;
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Search Bar */}
      <div className={`hidden lg:block sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
        <div className="px-6 py-4">
          {/* Main Search Row */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search properties by location, type, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
                className="pr-10"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="Search" size={18} />
              </button>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
              iconPosition="left"
            >
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowSavedSearches(!showSavedSearches)}
                iconName="Bookmark"
                iconPosition="left"
              >
                Saved
              </Button>

              {showSavedSearches && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-[1010]">
                  {savedSearches?.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-muted-foreground">No saved searches</p>
                  ) : (
                    savedSearches?.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleLoadSavedSearch(search)}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <span className="truncate">{search?.name}</span>
                        <Icon name="ChevronRight" size={14} />
                      </button>
                    ))
                  )}
                  {searchQuery && (
                    <div className="border-t border-border mt-2 pt-2">
                      <button
                        onClick={handleSaveSearch}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-accent hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="Plus" size={14} />
                        <span>Save current search</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Filters Row */}
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-muted/30 rounded-lg">
              <Select
                label="Property Type"
                options={propertyTypes}
                value={activeFilters?.propertyType || 'all'}
                onChange={(value) => handleFilterChange('propertyType', value)}
              />

              <Select
                label="Price Range"
                options={priceRanges}
                value={activeFilters?.priceRange || 'all'}
                onChange={(value) => handleFilterChange('priceRange', value)}
              />

              <Select
                label="Bedrooms"
                options={bedroomOptions}
                value={activeFilters?.bedrooms || 'all'}
                onChange={(value) => handleFilterChange('bedrooms', value)}
              />

              <Select
                label="Bathrooms"
                options={bathroomOptions}
                value={activeFilters?.bathrooms || 'all'}
                onChange={(value) => handleFilterChange('bathrooms', value)}
              />

              <div className="flex items-end space-x-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  iconName="X"
                  size="sm"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Search Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border transform transition-transform duration-300">
        <div className="p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <Input
              type="search"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pr-10"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="Search" size={18} />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
            >
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              iconName="Bookmark"
            >
              Saved
            </Button>

            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
              <Select
                label="Property Type"
                options={propertyTypes}
                value={activeFilters?.propertyType || 'all'}
                onChange={(value) => handleFilterChange('propertyType', value)}
              />

              <Select
                label="Price Range"
                options={priceRanges}
                value={activeFilters?.priceRange || 'all'}
                onChange={(value) => handleFilterChange('priceRange', value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Bedrooms"
                  options={bedroomOptions}
                  value={activeFilters?.bedrooms || 'all'}
                  onChange={(value) => handleFilterChange('bedrooms', value)}
                />

                <Select
                  label="Bathrooms"
                  options={bathroomOptions}
                  value={activeFilters?.bathrooms || 'all'}
                  onChange={(value) => handleFilterChange('bathrooms', value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Backdrop */}
      {(showFilters || showSavedSearches) && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setShowFilters(false);
            setShowSavedSearches(false);
          }}
        />
      )}
    </>
  );
};

export default SearchContextBar;