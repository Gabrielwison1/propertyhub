import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PropertyAnalytics = ({ properties = [], className = "" }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const metricOptions = [
    { value: 'views', label: 'Property Views' },
    { value: 'inquiries', label: 'Inquiries' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'contacts', label: 'Contact Requests' }
  ];

  // Mock analytics data
  const analyticsData = {
    totalProperties: properties?.length,
    activeListings: properties?.filter(p => p?.status === 'available')?.length,
    totalViews: 12847,
    totalInquiries: 342,
    averagePrice: properties?.length > 0 ? 
      properties?.reduce((sum, p) => sum + parseInt(p?.price || 0), 0) / properties?.length : 0,
    conversionRate: 2.7
  };

  const viewsData = [
    { name: 'Mon', views: 245, inquiries: 12, favorites: 8, contacts: 5 },
    { name: 'Tue', views: 312, inquiries: 18, favorites: 15, contacts: 9 },
    { name: 'Wed', views: 189, inquiries: 8, favorites: 6, contacts: 3 },
    { name: 'Thu', views: 278, inquiries: 15, favorites: 12, contacts: 7 },
    { name: 'Fri', views: 356, inquiries: 22, favorites: 18, contacts: 11 },
    { name: 'Sat', views: 423, inquiries: 28, favorites: 25, contacts: 15 },
    { name: 'Sun', views: 298, inquiries: 16, favorites: 13, contacts: 8 }
  ];

  const propertyTypeData = [
    { name: 'House', value: 45, color: '#1E3A5F' },
    { name: 'Apartment', value: 30, color: '#4A90A4' },
    { name: 'Condo', value: 15, color: '#E67E22' },
    { name: 'Townhouse', value: 8, color: '#27AE60' },
    { name: 'Commercial', value: 2, color: '#F39C12' }
  ];

  const topPerformingProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      views: 1247,
      inquiries: 23,
      favorites: 18,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
    },
    {
      id: 2,
      title: "Luxury Family Home",
      views: 987,
      inquiries: 19,
      favorites: 15,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
    },
    {
      id: 3,
      title: "Cozy Studio Loft",
      views: 756,
      inquiries: 14,
      favorites: 12,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    },
    {
      id: 4,
      title: "Suburban Townhouse",
      views: 623,
      inquiries: 11,
      favorites: 9,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400"
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000)?.toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-heading font-semibold text-foreground">Property Analytics</h2>
        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.totalProperties}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Home" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.activeListings}</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-foreground">{formatNumber(analyticsData?.totalViews)}</p>
            </div>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Inquiries</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.totalInquiries}</p>
            </div>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Price</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(analyticsData?.averagePrice)}</p>
            </div>
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData?.conversionRate}%</p>
            </div>
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-error" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">Performance Trends</h3>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-40"
            />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Types Distribution */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Property Types</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {propertyTypeData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Performing Properties */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Top Performing Properties</h3>
        <div className="space-y-4">
          {topPerformingProperties?.map((property, index) => (
            <div key={property?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-medium text-primary">
                {index + 1}
              </div>
              
              <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={property?.image}
                  alt={property?.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{property?.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Eye" size={12} className="mr-1" />
                    {formatNumber(property?.views)} views
                  </span>
                  <span className="flex items-center">
                    <Icon name="MessageSquare" size={12} className="mr-1" />
                    {property?.inquiries} inquiries
                  </span>
                  <span className="flex items-center">
                    <Icon name="Heart" size={12} className="mr-1" />
                    {property?.favorites} favorites
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                iconName="ExternalLink"
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalytics;