import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import UserManagementTab from './components/UserManagementTab';
import PropertyOversightTab from './components/PropertyOversightTab';
import AnalyticsTab from './components/AnalyticsTab';
import SystemConfigTab from './components/SystemConfigTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Mock admin user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Admin User",
      email: "admin@propertyhub.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };

    const mockNotifications = [
      {
        id: 1,
        type: 'system',
        title: 'System Update Required',
        message: 'A new system update is available for installation.',
        timestamp: new Date(Date.now() - 3600000),
        read: false
      },
      {
        id: 2,
        type: 'property_update',
        title: 'Property Pending Approval',
        message: 'New property listing requires admin approval.',
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        propertyId: 1
      },
      {
        id: 3,
        type: 'system',
        title: 'User Registration Spike',
        message: 'Unusual increase in user registrations detected.',
        timestamp: new Date(Date.now() - 10800000),
        read: true
      }
    ];

    setUser(mockUser);
    setNotifications(mockNotifications);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'properties', label: 'Property Oversight', icon: 'Building2' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'settings', label: 'System Config', icon: 'Settings' }
  ];

  const metricsData = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      iconColor: "text-primary"
    },
    {
      title: "Active Properties",
      value: "342",
      change: "+8.2%",
      changeType: "positive",
      icon: "Building2",
      iconColor: "text-success"
    },
    {
      title: "Recent Inquiries",
      value: "89",
      change: "+15.3%",
      changeType: "positive",
      icon: "MessageSquare",
      iconColor: "text-accent"
    },
    {
      title: "System Performance",
      value: "98.7%",
      change: "-0.3%",
      changeType: "negative",
      icon: "Activity",
      iconColor: "text-warning"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New agent Sarah Johnson registered',
      timestamp: new Date(Date.now() - 1800000),
      icon: 'UserPlus',
      iconColor: 'text-primary'
    },
    {
      id: 2,
      type: 'property_approval',
      message: 'Property "Modern Downtown Apartment" approved',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'Check',
      iconColor: 'text-success'
    },
    {
      id: 3,
      type: 'system_alert',
      message: 'Server maintenance completed successfully',
      timestamp: new Date(Date.now() - 5400000),
      icon: 'Server',
      iconColor: 'text-warning'
    },
    {
      id: 4,
      type: 'inquiry_received',
      message: 'New inquiry received for Luxury Family Home',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'MessageCircle',
      iconColor: 'text-accent'
    },
    {
      id: 5,
      type: 'user_action',
      message: 'Agent Michael Chen updated property listing',
      timestamp: new Date(Date.now() - 9000000),
      icon: 'Edit3',
      iconColor: 'text-secondary'
    }
  ];

  const quickActions = [
    {
      label: 'Add New User',
      icon: 'UserPlus',
      action: () => navigate('/register'),
      variant: 'default'
    },
    {
      label: 'Review Properties',
      icon: 'Building2',
      action: () => setActiveTab('properties'),
      variant: 'outline'
    },
    {
      label: 'System Settings',
      icon: 'Settings',
      action: () => setActiveTab('settings'),
      variant: 'outline'
    },
    {
      label: 'View Analytics',
      icon: 'BarChart3',
      action: () => setActiveTab('analytics'),
      variant: 'outline'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData?.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric?.title}
            value={metric?.value}
            change={metric?.change}
            changeType={metric?.changeType}
            icon={metric?.icon}
            iconColor={metric?.iconColor}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              onClick={action?.action}
              iconName={action?.icon}
              iconPosition="left"
              fullWidth
              className="justify-start"
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">Recent Activity</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => console.log('View all activities')}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-4 hover:bg-muted/30 rounded-lg transition-colors duration-200">
              <div className={`p-2 rounded-full bg-muted ${activity?.iconColor}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity?.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(activity?.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return <UserManagementTab />;
      case 'properties':
        return <PropertyOversightTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'settings':
        return <SystemConfigTab />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        notificationCount={notifications?.filter(n => !n?.read)?.length} 
      />
      <div className="pt-16">
        <div className="px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive system oversight and management
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={() => console.log('Export system report')}
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="RefreshCw"
                  onClick={() => window.location?.reload()}
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;