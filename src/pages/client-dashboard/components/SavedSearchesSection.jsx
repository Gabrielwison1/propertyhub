import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearchesSection = ({ savedSearches = [], onDeleteSearch = () => {}, onEditSearch = () => {} }) => {
  const [expandedSearch, setExpandedSearch] = useState(null);
  const navigate = useNavigate();

  const handleRunSearch = (search) => {
    const queryParams = new URLSearchParams({
      query: search.query,
      ...search.filters
    })?.toString();
    navigate(`/property-details?${queryParams}`);
  };

  const handleEditSearch = (searchId) => {
    onEditSearch(searchId);
  };

  const handleDeleteSearch = (searchId) => {
    if (window.confirm('Delete this saved search?')) {
      onDeleteSearch(searchId);
    }
  };

  const formatFilters = (filters) => {
    const activeFilters = [];
    
    if (filters?.propertyType && filters?.propertyType !== 'all') {
      activeFilters?.push(`Type: ${filters?.propertyType}`);
    }
    if (filters?.priceRange && filters?.priceRange !== 'all') {
      activeFilters?.push(`Price: ${filters?.priceRange}`);
    }
    if (filters?.bedrooms && filters?.bedrooms !== 'all') {
      activeFilters?.push(`Beds: ${filters?.bedrooms}+`);
    }
    if (filters?.bathrooms && filters?.bathrooms !== 'all') {
      activeFilters?.push(`Baths: ${filters?.bathrooms}+`);
    }
    if (filters?.location) {
      activeFilters?.push(`Location: ${filters?.location}`);
    }
    
    return activeFilters;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(new Date(date));
  };

  if (savedSearches?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-heading font-medium text-foreground mb-2">
          No Saved Searches
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Save your search criteria to get notified of new matching properties.
        </p>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate('/property-details')}
          iconName="Plus"
          iconPosition="left"
        >
          Create Search Alert
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
            Saved Searches
          </h2>
          <p className="text-sm text-muted-foreground">
            {savedSearches?.length} active {savedSearches?.length === 1 ? 'alert' : 'alerts'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/property-details')}
          iconName="Plus"
          iconPosition="left"
        >
          New Alert
        </Button>
      </div>
      {/* Searches List */}
      <div className="divide-y divide-border">
        {savedSearches?.map((search) => (
          <div key={search?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-medium text-foreground mb-1 truncate">
                  {search?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Created {formatDate(search?.createdAt)}
                </p>
                
                {search?.newMatches > 0 && (
                  <div className="flex items-center space-x-1 text-sm text-accent mb-2">
                    <Icon name="AlertCircle" size={14} />
                    <span>{search?.newMatches} new {search?.newMatches === 1 ? 'match' : 'matches'}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRunSearch(search)}
                  iconName="Play"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedSearch(expandedSearch === search?.id ? null : search?.id)}
                  iconName={expandedSearch === search?.id ? "ChevronUp" : "ChevronDown"}
                />
              </div>
            </div>

            {/* Search Query */}
            <div className="bg-muted/30 rounded-md p-3 mb-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  "{search?.query}"
                </span>
              </div>
              
              {formatFilters(search?.filters)?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formatFilters(search?.filters)?.map((filter, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-background rounded text-xs text-muted-foreground"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {expandedSearch === search?.id && (
              <div className="pt-3 border-t border-border">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Email Alerts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {search?.emailAlerts ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Frequency
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {search?.frequency || 'Daily'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRunSearch(search)}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Run Search
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditSearch(search?.id)}
                    iconName="Edit3"
                    iconPosition="left"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSearch(search?.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearchesSection;