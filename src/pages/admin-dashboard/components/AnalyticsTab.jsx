import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsTab = () => {
  const [dateRange, setDateRange] = useState('30');
  const [chartType, setChartType] = useState('users');

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  const chartTypeOptions = [
    { value: 'users', label: 'User Growth' },
    { value: 'properties', label: 'Property Listings' },
    { value: 'inquiries', label: 'Inquiries' },
    { value: 'revenue', label: 'Revenue' }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 120, agents: 15, clients: 105 },
    { month: 'Feb', users: 145, agents: 18, clients: 127 },
    { month: 'Mar', users: 168, agents: 22, clients: 146 },
    { month: 'Apr', users: 192, agents: 25, clients: 167 },
    { month: 'May', users: 218, agents: 28, clients: 190 },
    { month: 'Jun', users: 245, agents: 32, clients: 213 },
    { month: 'Jul', users: 272, agents: 35, clients: 237 },
    { month: 'Aug', users: 298, agents: 38, clients: 260 },
    { month: 'Sep', users: 325, agents: 42, clients: 283 }
  ];

  const propertyData = [
    { month: 'Jan', listed: 45, sold: 32, pending: 13 },
    { month: 'Feb', listed: 52, sold: 38, pending: 14 },
    { month: 'Mar', listed: 48, sold: 35, pending: 13 },
    { month: 'Apr', listed: 61, sold: 42, pending: 19 },
    { month: 'May', listed: 58, sold: 41, pending: 17 },
    { month: 'Jun', listed: 67, sold: 48, pending: 19 },
    { month: 'Jul', listed: 72, sold: 52, pending: 20 },
    { month: 'Aug', listed: 69, sold: 49, pending: 20 },
    { month: 'Sep', listed: 75, sold: 54, pending: 21 }
  ];

  const inquiryData = [
    { month: 'Jan', inquiries: 180, responses: 165, conversions: 32 },
    { month: 'Feb', inquiries: 210, responses: 195, conversions: 38 },
    { month: 'Mar', inquiries: 195, responses: 182, conversions: 35 },
    { month: 'Apr', inquiries: 235, responses: 218, conversions: 42 },
    { month: 'May', inquiries: 225, responses: 208, conversions: 41 },
    { month: 'Jun', inquiries: 268, responses: 248, conversions: 48 },
    { month: 'Jul', inquiries: 285, responses: 265, conversions: 52 },
    { month: 'Aug', inquiries: 272, responses: 252, conversions: 49 },
    { month: 'Sep', inquiries: 298, responses: 278, conversions: 54 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, commissions: 13500, fees: 2250 },
    { month: 'Feb', revenue: 52000, commissions: 15600, fees: 2600 },
    { month: 'Mar', revenue: 48000, commissions: 14400, fees: 2400 },
    { month: 'Apr', revenue: 61000, commissions: 18300, fees: 3050 },
    { month: 'May', revenue: 58000, commissions: 17400, fees: 2900 },
    { month: 'Jun', revenue: 67000, commissions: 20100, fees: 3350 },
    { month: 'Jul', revenue: 72000, commissions: 21600, fees: 3600 },
    { month: 'Aug', revenue: 69000, commissions: 20700, fees: 3450 },
    { month: 'Sep', revenue: 75000, commissions: 22500, fees: 3750 }
  ];

  const propertyTypeData = [
    { name: 'Houses', value: 45, color: '#1E3A5F' },
    { name: 'Apartments', value: 32, color: '#4A90A4' },
    { name: 'Condos', value: 18, color: '#E67E22' },
    { name: 'Townhouses', value: 12, color: '#27AE60' },
    { name: 'Commercial', value: 8, color: '#F39C12' }
  ];

  const getChartData = () => {
    switch (chartType) {
      case 'users': return userGrowthData;
      case 'properties': return propertyData;
      case 'inquiries': return inquiryData;
      case 'revenue': return revenueData;
      default: return userGrowthData;
    }
  };

  const getChartConfig = () => {
    switch (chartType) {
      case 'users':
        return {
          bars: [
            { dataKey: 'users', fill: '#1E3A5F', name: 'Total Users' },
            { dataKey: 'agents', fill: '#4A90A4', name: 'Agents' },
            { dataKey: 'clients', fill: '#E67E22', name: 'Clients' }
          ]
        };
      case 'properties':
        return {
          bars: [
            { dataKey: 'listed', fill: '#1E3A5F', name: 'Listed' },
            { dataKey: 'sold', fill: '#27AE60', name: 'Sold' },
            { dataKey: 'pending', fill: '#F39C12', name: 'Pending' }
          ]
        };
      case 'inquiries':
        return {
          bars: [
            { dataKey: 'inquiries', fill: '#1E3A5F', name: 'Inquiries' },
            { dataKey: 'responses', fill: '#4A90A4', name: 'Responses' },
            { dataKey: 'conversions', fill: '#27AE60', name: 'Conversions' }
          ]
        };
      case 'revenue':
        return {
          bars: [
            { dataKey: 'revenue', fill: '#1E3A5F', name: 'Total Revenue' },
            { dataKey: 'commissions', fill: '#4A90A4', name: 'Commissions' },
            { dataKey: 'fees', fill: '#E67E22', name: 'Fees' }
          ]
        };
      default:
        return { bars: [] };
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting analytics data as ${format}`);
    // Handle export functionality
  };

  const formatValue = (value, type) => {
    if (type === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })?.format(value);
    }
    return value?.toLocaleString();
  };

  const chartConfig = getChartConfig();

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={chartTypeOptions}
            value={chartType}
            onChange={setChartType}
            placeholder="Select chart type"
          />
          
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
        </div>
      </div>
      {/* Main Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {chartTypeOptions?.find(opt => opt?.value === chartType)?.label} Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Performance overview for the selected time period
          </p>
        </div>
        
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#7F8C8D"
                fontSize={12}
              />
              <YAxis 
                stroke="#7F8C8D"
                fontSize={12}
                tickFormatter={(value) => formatValue(value, chartType)}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [formatValue(value, chartType), '']}
              />
              {chartConfig?.bars?.map((bar, index) => (
                <Bar 
                  key={index}
                  dataKey={bar?.dataKey} 
                  fill={bar?.fill} 
                  name={bar?.name}
                  radius={[2, 2, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Types Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Property Types Distribution
            </h3>
            <p className="text-sm text-muted-foreground">
              Breakdown of property types in the system
            </p>
          </div>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  labelLine={false}
                >
                  {propertyTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Key Performance Indicators
            </h3>
            <p className="text-sm text-muted-foreground">
              Important metrics for the current period
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">User Conversion Rate</p>
                  <p className="text-xs text-muted-foreground">Visitors to registered users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">18.2%</p>
                <p className="text-xs text-success">+2.4%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Property Sale Rate</p>
                  <p className="text-xs text-muted-foreground">Listed to sold properties</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">72%</p>
                <p className="text-xs text-success">+5.1%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="MessageSquare" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Inquiry Response Time</p>
                  <p className="text-xs text-muted-foreground">Average response time</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">2.4h</p>
                <p className="text-xs text-error">+0.3h</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon name="DollarSign" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Average Property Value</p>
                  <p className="text-xs text-muted-foreground">Mean listing price</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">$587K</p>
                <p className="text-xs text-success">+$23K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;