import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import PropertyTable from './components/PropertyTable';
import InquiryPanel from './components/InquiryPanel';
import ActionBar from './components/ActionBar';
import FilterBar from './components/FilterBar';

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  // Mock user data
  const user = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@propertyhub.com",
    role: "agent",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock metrics data
  const metrics = [
    {
      title: "Active Listings",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: "Building2",
      color: "primary"
    },
    {
      title: "Pending Inquiries",
      value: "12",
      change: "+5",
      changeType: "positive",
      icon: "MessageSquare",
      color: "accent"
    },
    {
      title: "This Month Sales",
      value: "$485K",
      change: "+12%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Properties Sold",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: "TrendingUp",
      color: "warning"
    }
  ];

  // Mock properties data
  const [properties] = useState([
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "123 Main St, Downtown",
      price: 450000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      status: "active",
      inquiries: 8,
      dateAdded: "2025-01-15",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"]
    },
    {
      id: 2,
      title: "Luxury Family Home",
      location: "456 Oak Avenue, Suburbs",
      price: 750000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      status: "pending",
      inquiries: 15,
      dateAdded: "2025-01-10",
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop"]
    },
    {
      id: 3,
      title: "Cozy Studio Loft",
      location: "789 Creative District",
      price: 320000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 800,
      status: "active",
      inquiries: 3,
      dateAdded: "2025-01-08",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"]
    },
    {
      id: 4,
      title: "Waterfront Condo",
      location: "321 Harbor View, Marina",
      price: 890000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      status: "sold",
      inquiries: 22,
      dateAdded: "2024-12-20",
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"]
    },
    {
      id: 5,
      title: "Suburban Townhouse",
      location: "654 Maple Street, Westside",
      price: 580000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2200,
      status: "active",
      inquiries: 6,
      dateAdded: "2025-01-12",
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"]
    }
  ]);

  // Mock inquiries data
  const [inquiries] = useState([
    {
      id: 1,
      clientName: "Michael Chen",
      clientEmail: "michael.chen@email.com",
      clientPhone: "(555) 123-4567",
      propertyTitle: "Modern Downtown Apartment",
      propertyId: 1,
      message: "I'm interested in scheduling a viewing for this weekend. Is Saturday morning available?",
      priority: "high",
      status: "new",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      clientName: "Emma Rodriguez",
      clientEmail: "emma.rodriguez@email.com",
      clientPhone: "(555) 987-6543",
      propertyTitle: "Luxury Family Home",
      propertyId: 2,
      message: "Could you provide more information about the school district and neighborhood amenities?",
      priority: "medium",
      status: "replied",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      clientName: "David Thompson",
      clientEmail: "david.thompson@email.com",
      clientPhone: "(555) 456-7890",
      propertyTitle: "Waterfront Condo",
      propertyId: 4,
      message: "What's the HOA fee and what amenities are included? Also interested in parking options.",
      priority: "medium",
      status: "new",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 4,
      clientName: "Lisa Park",
      clientEmail: "lisa.park@email.com",
      clientPhone: "(555) 321-0987",
      propertyTitle: "Cozy Studio Loft",
      propertyId: 3,
      message: "Is this property pet-friendly? I have a small dog.",
      priority: "low",
      status: "replied",
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 5,
      clientName: "Robert Kim",
      clientEmail: "robert.kim@email.com",
      clientPhone: "(555) 654-3210",
      propertyTitle: "Suburban Townhouse",
      propertyId: 5,
      message: "I'd like to make an offer. Can we discuss the terms and schedule an inspection?",
      priority: "high",
      status: "new",
      timestamp: new Date(Date.now() - 10800000)
    }
  ]);

  const handlePropertyEdit = (propertyId) => {
    navigate(`/property-management?id=${propertyId}&action=edit`);
  };

  const handlePropertyDelete = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      console.log('Deleting property:', propertyId);
      // Handle property deletion
    }
  };

  const handleStatusChange = (propertyId, newStatus) => {
    console.log('Updating property status:', propertyId, newStatus);
    // Handle status update
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'on properties:', selectedProperties);
    // Handle bulk operations
  };

  const handleExport = (format) => {
    console.log('Exporting data in format:', format);
    // Handle data export
  };

  const handleAddProperty = () => {
    navigate('/property-management?action=create');
  };

  const handleInquiryReply = (inquiryId, message) => {
    console.log('Replying to inquiry:', inquiryId, 'with message:', message);
    // Handle inquiry reply
  };

  const handleInquiryStatusUpdate = (inquiryId, status) => {
    console.log('Updating inquiry status:', inquiryId, status);
    // Handle inquiry status update
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // Apply filters to data
  };

  useEffect(() => {
    // Set page title
    document.title = 'Agent Dashboard - PropertyHub';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} notificationCount={inquiries?.filter(i => i?.status === 'new')?.length} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your property listings and client inquiries
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'properties' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  Property Management
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'inquiries' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  Client Inquiries
                  {inquiries?.filter(i => i?.status === 'new')?.length > 0 && (
                    <span className="ml-2 bg-accent text-accent-foreground text-xs rounded-full px-2 py-1">
                      {inquiries?.filter(i => i?.status === 'new')?.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'properties' && (
            <div>
              <ActionBar
                selectedCount={selectedProperties?.length}
                onBulkAction={handleBulkAction}
                onExport={handleExport}
                onAddProperty={handleAddProperty}
              />

              <FilterBar
                onFilterChange={handleFilterChange}
                filters={filters}
              />

              <PropertyTable
                properties={properties}
                onEdit={handlePropertyEdit}
                onDelete={handlePropertyDelete}
                onStatusChange={handleStatusChange}
              />
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div>
              <InquiryPanel
                inquiries={inquiries}
                onReply={handleInquiryReply}
                onUpdateStatus={handleInquiryStatusUpdate}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;