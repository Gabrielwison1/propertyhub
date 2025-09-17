import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyHistory = ({ property = {} }) => {
  const propertyHistory = [
    {
      date: "2024-01-15",
      event: "Listed for Sale",
      price: 750000,
      description: "Property initially listed on the market",
      type: "listing"
    },
    {
      date: "2024-02-20",
      event: "Price Reduction",
      price: 725000,
      description: "Price reduced to attract more buyers",
      type: "price_change"
    },
    {
      date: "2024-03-10",
      event: "Open House",
      description: "Successful open house with 25+ visitors",
      type: "event"
    },
    {
      date: "2024-03-25",
      event: "Under Contract",
      description: "Property went under contract with buyer",
      type: "status_change"
    },
    {
      date: "2024-04-05",
      event: "Back on Market",
      price: 720000,
      description: "Contract fell through, back on market",
      type: "status_change"
    }
  ];

  const marketTrends = [
    { period: "Last 30 days", change: "+2.3%", trend: "up" },
    { period: "Last 90 days", change: "+5.1%", trend: "up" },
    { period: "Last year", change: "+8.7%", trend: "up" }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'listing': return 'Home';
      case 'price_change': return 'TrendingDown';
      case 'event': return 'Calendar';
      case 'status_change': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'listing': return 'text-primary bg-primary/10';
      case 'price_change': return 'text-warning bg-warning/10';
      case 'event': return 'text-accent bg-accent/10';
      case 'status_change': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-heading font-medium text-foreground mb-6">
        Property History & Market Trends
      </h3>
      {/* Market Trends */}
      <div className="mb-8">
        <h4 className="font-medium text-foreground mb-4">Market Performance</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {marketTrends?.map((trend, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{trend?.period}</span>
                <div className={`flex items-center space-x-1 ${
                  trend?.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  <Icon 
                    name={trend?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                  />
                  <span className="text-sm font-medium">{trend?.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Property History Timeline */}
      <div>
        <h4 className="font-medium text-foreground mb-4">Property Timeline</h4>
        <div className="space-y-4">
          {propertyHistory?.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Timeline Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getEventColor(event?.type)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-foreground">{event?.event}</h5>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(event?.date)}
                  </span>
                </div>
                
                {event?.price && (
                  <div className="text-lg font-bold text-primary mb-1">
                    {formatPrice(event?.price)}
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground">
                  {event?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Property Insights */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Property Insights</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Days on Market</h5>
            <div className="text-2xl font-bold text-primary">85 days</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average for area: 72 days
            </p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Price per Sq Ft</h5>
            <div className="text-2xl font-bold text-primary">
              ${((property?.price || 720000) / (property?.area || 1500))?.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Area average: $425/sq ft
            </p>
          </div>
        </div>
      </div>
      {/* Neighborhood Comparison */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3">Neighborhood Comparison</h5>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">This Property</span>
            <span className="font-medium text-foreground">{formatPrice(property?.price || 720000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Neighborhood Average</span>
            <span className="font-medium text-foreground">$685,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Difference</span>
            <span className="font-medium text-success">+5.1% above average</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHistory;