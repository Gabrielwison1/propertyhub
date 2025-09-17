import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsSection = ({ user = null, stats = {} }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Browse Properties',
      description: 'Explore available properties',
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/property-details')
    },
    {
      title: 'Create Search Alert',
      description: 'Get notified of new matches',
      icon: 'Bell',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/property-details?create-alert=true')
    },
    {
      title: 'Contact Agent',
      description: 'Speak with a property expert',
      icon: 'MessageSquare',
      color: 'text-success',
      bgColor: 'bg-success/10',
      action: () => navigate('/agent-dashboard')
    },
    {
      title: 'Account Settings',
      description: 'Manage your preferences',
      icon: 'Settings',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => navigate('/settings')
    }
  ];

  const statsCards = [
    {
      label: 'Saved Properties',
      value: stats?.savedProperties || 0,
      icon: 'Heart',
      color: 'text-accent'
    },
    {
      label: 'Active Inquiries',
      value: stats?.activeInquiries || 0,
      icon: 'MessageSquare',
      color: 'text-primary'
    },
    {
      label: 'Search Alerts',
      value: stats?.searchAlerts || 0,
      icon: 'Bell',
      color: 'text-success'
    },
    {
      label: 'Properties Viewed',
      value: stats?.propertiesViewed || 0,
      icon: 'Eye',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold mb-2">
              Welcome back, {user?.name || 'Client'}!
            </h1>
            <p className="text-white/80">
              Ready to find your perfect property? Let's get started.
            </p>
          </div>
          <div className="hidden md:block">
            <Icon name="Home" size={48} className="text-white/20" />
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={stat?.color}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">
                {stat?.value}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {stat?.label}
            </p>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action, index) => (
            <button
              key={index}
              onClick={action?.action}
              className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 text-left"
            >
              <div className={`w-12 h-12 rounded-lg ${action?.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-medium text-foreground mb-1">
                  {action?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground mt-1" />
            </button>
          ))}
        </div>
      </div>
      {/* Recent Searches */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Continue Your Search
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/property-details')}
            iconName="ArrowRight"
          />
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/property-details?query=downtown+apartment')}
            className="flex items-center justify-between w-full p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Downtown Apartments</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          </button>
          
          <button
            onClick={() => navigate('/property-details?query=family+house+3+bedroom')}
            className="flex items-center justify-between w-full p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">3 Bedroom Family Houses</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;