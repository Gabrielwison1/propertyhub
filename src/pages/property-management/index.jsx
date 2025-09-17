import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PropertyForm from './components/PropertyForm';
import PropertyList from './components/PropertyList';
import PropertyAnalytics from './components/PropertyAnalytics';
import QuickActions from './components/QuickActions';

const PropertyManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@propertyhub.com",
      role: "agent",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    };
    setUser(mockUser);
  }, []);

  // Mock properties data
  useEffect(() => {
    const mockProperties = [
      {
        id: 1,
        title: "Modern Downtown Apartment",
        description: `Stunning modern apartment in the heart of downtown with panoramic city views.\n\nThis beautifully designed 2-bedroom, 2-bathroom unit features floor-to-ceiling windows, hardwood floors throughout, and a gourmet kitchen with stainless steel appliances.\n\nBuilding amenities include 24/7 concierge, fitness center, rooftop terrace, and parking garage.`,
        price: "450000",
        location: "123 Main Street, Downtown, NY 10001",
        bedrooms: "2",
        bathrooms: "2",
        squareFootage: "1200",
        propertyType: "apartment",
        status: "available",
        yearBuilt: "2020",
        lotSize: "",
        amenities: ["Swimming Pool", "Gym", "Parking", "Security System", "Air Conditioning"],
        features: ["Hardwood Floors", "Updated Kitchen", "High Ceilings", "Natural Light"],
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        createdAt: "2025-01-15T10:30:00Z",
        views: 1247,
        inquiries: 23,
        favorites: 18
      },
      {
        id: 2,
        title: "Luxury Family Home",
        description: `Exceptional luxury family home in prestigious neighborhood.\n\nThis magnificent 4-bedroom, 3-bathroom home sits on a beautifully landscaped lot with mature trees and gardens.\n\nFeatures include a grand foyer, formal dining room, updated kitchen with granite countertops, master suite with walk-in closet, and a finished basement.`,
        price: "750000",
        location: "456 Oak Avenue, Westfield, NY 10002",
        bedrooms: "4",
        bathrooms: "3",
        squareFootage: "2800",
        propertyType: "house",
        status: "pending",
        yearBuilt: "2015",
        lotSize: "8500",
        amenities: ["Garden", "Fireplace", "Heating", "Security System"],
        features: ["Walk-in Closet", "Master Suite", "Open Floor Plan", "Storage Space"],
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800"
        ],
        createdAt: "2025-01-10T14:20:00Z",
        views: 987,
        inquiries: 19,
        favorites: 15
      },
      {
        id: 3,
        title: "Cozy Studio Loft",
        description: `Charming studio loft in trendy arts district.\n\nThis unique space features exposed brick walls, high ceilings, and large windows that flood the space with natural light.\n\nPerfect for young professionals or artists looking for an affordable yet stylish living space.`,
        price: "280000",
        location: "789 Art Street, Creative District, NY 10003",
        bedrooms: "1",
        bathrooms: "1",
        squareFootage: "650",
        propertyType: "apartment",
        status: "available",
        yearBuilt: "2018",
        lotSize: "",
        amenities: ["Elevator", "Natural Light"],
        features: ["High Ceilings", "Natural Light", "Open Floor Plan"],
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        createdAt: "2025-01-08T09:15:00Z",
        views: 756,
        inquiries: 14,
        favorites: 12
      },
      {
        id: 4,
        title: "Suburban Townhouse",
        description: `Beautiful townhouse in family-friendly suburban community.\n\nThis well-maintained 3-bedroom, 2.5-bathroom townhouse features an open floor plan, updated kitchen, and private patio.\n\nLocated in excellent school district with easy access to shopping and transportation.`,
        price: "520000",
        location: "321 Maple Lane, Suburbia, NY 10004",
        bedrooms: "3",
        bathrooms: "2",
        squareFootage: "1800",
        propertyType: "townhouse",
        status: "sold",
        yearBuilt: "2012",
        lotSize: "2500",
        amenities: ["Parking", "Garden", "Air Conditioning"],
        features: ["Updated Kitchen", "Open Floor Plan", "Storage Space"],
        images: [
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800"
        ],
        createdAt: "2025-01-05T16:45:00Z",
        views: 623,
        inquiries: 11,
        favorites: 9
      },
      {
        id: 5,
        title: "Commercial Office Space",
        description: `Prime commercial office space in business district.\n\nThis modern office suite offers 3,500 square feet of flexible workspace with conference rooms, private offices, and open collaboration areas.\n\nIncludes parking spaces and is move-in ready for immediate occupancy.`,
        price: "1200000",
        location: "555 Business Blvd, Financial District, NY 10005",
        bedrooms: "0",
        bathrooms: "3",
        squareFootage: "3500",
        propertyType: "commercial",
        status: "available",
        yearBuilt: "2019",
        lotSize: "",
        amenities: ["Parking", "Elevator", "Security System", "Air Conditioning"],
        features: ["Natural Light", "Storage Space"],
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
        ],
        createdAt: "2025-01-03T11:30:00Z",
        views: 445,
        inquiries: 8,
        favorites: 6
      }
    ];
    setProperties(mockProperties);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'properties', label: 'Properties', icon: 'Home' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'quick-actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  const handleCreateProperty = () => {
    setEditingProperty(null);
    setShowPropertyForm(true);
  };

  const handleEditProperty = (propertyId) => {
    const property = properties?.find(p => p?.id === propertyId);
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleDeleteProperty = (propertyId) => {
    setProperties(prev => prev?.filter(p => p?.id !== propertyId));
  };

  const handleSaveProperty = (propertyData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingProperty) {
        // Update existing property
        setProperties(prev => prev?.map(p => 
          p?.id === editingProperty?.id 
            ? { ...p, ...propertyData, updatedAt: new Date()?.toISOString() }
            : p
        ));
      } else {
        // Create new property
        const newProperty = {
          ...propertyData,
          id: Date.now(),
          createdAt: new Date()?.toISOString(),
          views: 0,
          inquiries: 0,
          favorites: 0
        };
        setProperties(prev => [newProperty, ...prev]);
      }
      
      setShowPropertyForm(false);
      setEditingProperty(null);
      setLoading(false);
    }, 1500);
  };

  const handleStatusChange = (propertyId, newStatus) => {
    setProperties(prev => prev?.map(p => 
      p?.id === propertyId 
        ? { ...p, status: newStatus, updatedAt: new Date()?.toISOString() }
        : p
    ));
  };

  const handleBulkAction = (action, propertyIds) => {
    if (action === 'delete') {
      setProperties(prev => prev?.filter(p => !propertyIds?.includes(p?.id)));
    } else {
      // Status update
      setProperties(prev => prev?.map(p => 
        propertyIds?.includes(p?.id) 
          ? { ...p, status: action, updatedAt: new Date()?.toISOString() }
          : p
      ));
    }
  };

  const handleImportProperties = (file) => {
    console.log('Importing properties from file:', file?.name);
    // Simulate import process
  };

  const handleExportData = () => {
    console.log('Exporting property data...');
    // Simulate export process
  };

  const handleBulkUpdate = (updateData) => {
    console.log('Bulk updating properties:', updateData);
    // Simulate bulk update process
  };

  if (showPropertyForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} />
        <div className="pt-16">
          <div className="sticky top-16 z-10 bg-background border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPropertyForm(false)}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Back to Properties
                  </Button>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      {editingProperty ? 'Edit Property' : 'Create New Property'}
                    </h1>
                    <p className="text-muted-foreground">
                      {editingProperty ? 'Update property information' : 'Add a new property to your listings'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <PropertyForm
                property={editingProperty}
                onSave={handleSaveProperty}
                onCancel={() => setShowPropertyForm(false)}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="pt-16">
        {/* Page Header */}
        <div className="sticky top-16 z-10 bg-background border-b border-border">
          <div className="px-6 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Property Management</h1>
                <p className="text-muted-foreground">Manage your property listings and track performance</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
                <Button
                  onClick={handleCreateProperty}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Property
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1 mt-6 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-elevation-1'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Properties</p>
                        <p className="text-2xl font-bold text-foreground">{properties?.length}</p>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Home" size={20} className="text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-2xl font-bold text-foreground">
                          {properties?.filter(p => p?.status === 'available')?.length}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="CheckCircle" size={20} className="text-success" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                        <p className="text-2xl font-bold text-foreground">
                          {properties?.filter(p => p?.status === 'pending')?.length}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Icon name="Clock" size={20} className="text-warning" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Sold/Rented</p>
                        <p className="text-2xl font-bold text-foreground">
                          {properties?.filter(p => p?.status === 'sold' || p?.status === 'rented')?.length}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="TrendingUp" size={20} className="text-accent" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Properties */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-heading font-semibold text-foreground">Recent Properties</h2>
                    <Button
                      variant="ghost"
                      onClick={() => setActiveTab('properties')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {properties?.slice(0, 3)?.map((property) => (
                      <div key={property?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          {property?.images && property?.images?.length > 0 ? (
                            <img
                              src={property?.images?.[0]}
                              alt={property?.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/assets/images/no_image.png';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icon name="Home" size={20} className="text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{property?.title}</h4>
                          <p className="text-sm text-muted-foreground">{property?.location}</p>
                          <p className="text-sm font-semibold text-primary">
                            ${parseInt(property?.price)?.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            property?.status === 'available' ? 'bg-success/10 text-success' :
                            property?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                          }`}>
                            {property?.status?.charAt(0)?.toUpperCase() + property?.status?.slice(1)}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProperty(property?.id)}
                            iconName="Edit3"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <PropertyList
                properties={properties}
                onEdit={handleEditProperty}
                onDelete={handleDeleteProperty}
                onBulkAction={handleBulkAction}
                onStatusChange={handleStatusChange}
                loading={loading}
              />
            )}

            {activeTab === 'analytics' && (
              <PropertyAnalytics properties={properties} />
            )}

            {activeTab === 'quick-actions' && (
              <QuickActions
                onCreateProperty={handleCreateProperty}
                onImportProperties={handleImportProperties}
                onExportData={handleExportData}
                onBulkUpdate={handleBulkUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagement;