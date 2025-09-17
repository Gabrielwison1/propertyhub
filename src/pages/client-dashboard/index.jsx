import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SavedPropertiesSection from './components/SavedPropertiesSection';
import InquiriesSection from './components/InquiriesSection';
import SavedSearchesSection from './components/SavedSearchesSection';
import RecentActivitySection from './components/RecentActivitySection';
import PropertyComparisonSection from './components/PropertyComparisonSection';
import QuickActionsSection from './components/QuickActionsSection';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "client",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    joinedDate: "2024-01-15",
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      priceAlerts: true
    }
  };

  // Mock saved properties data
  const mockSavedProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment with City Views",
      price: 450000,
      priceChange: -2.5,
      location: "Downtown Seattle, WA",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      status: "New",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"],
      savedDate: "2024-09-15"
    },
    {
      id: 2,
      title: "Spacious Family Home with Garden",
      price: 675000,
      priceChange: 1.8,
      location: "Bellevue, WA",
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      status: "Price Drop",
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"],
      savedDate: "2024-09-12"
    },
    {
      id: 3,
      title: "Luxury Condo with Waterfront Access",
      price: 850000,
      location: "Capitol Hill, Seattle, WA",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"],
      savedDate: "2024-09-10"
    }
  ];

  // Mock inquiries data
  const mockInquiries = [
    {
      id: 1,
      property: {
        id: 1,
        title: "Modern Downtown Apartment with City Views",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
      },
      agent: {
        id: 1,
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      status: "responded",
      lastActivity: "2024-09-16T14:30:00Z",
      lastMessage: "I\'d be happy to schedule a viewing for this weekend. What time works best for you?",
      messages: [
        {
          id: 1,
          sender: "client",
          content: "Hi, I'm interested in viewing this property. Is it still available?",
          timestamp: "2024-09-15T10:00:00Z"
        },
        {
          id: 2,
          sender: "agent",
          content: "Hello Sarah! Yes, this property is still available. I'd be happy to schedule a viewing for you.",
          timestamp: "2024-09-15T11:30:00Z"
        },
        {
          id: 3,
          sender: "client",
          content: "Great! I'm available this weekend. What times do you have open?",
          timestamp: "2024-09-15T12:00:00Z"
        },
        {
          id: 4,
          sender: "agent",
          content: "I\'d be happy to schedule a viewing for this weekend. What time works best for you?",
          timestamp: "2024-09-16T14:30:00Z"
        }
      ]
    },
    {
      id: 2,
      property: {
        id: 2,
        title: "Spacious Family Home with Garden",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
      },
      agent: {
        id: 2,
        name: "Jennifer Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      status: "pending",
      lastActivity: "2024-09-16T09:15:00Z",
      lastMessage: "What\'s the neighborhood like for families with young children?",
      messages: [
        {
          id: 1,
          sender: "client",
          content: "What\'s the neighborhood like for families with young children?",
          timestamp: "2024-09-16T09:15:00Z"
        }
      ]
    }
  ];

  // Mock saved searches data
  const mockSavedSearches = [
    {
      id: 1,
      name: "Downtown Apartments Under $500K",
      query: "downtown apartment",
      filters: {
        propertyType: "apartment",
        priceRange: "0-500000",
        bedrooms: "2",
        location: "downtown"
      },
      createdAt: "2024-09-10",
      emailAlerts: true,
      frequency: "daily",
      newMatches: 3
    },
    {
      id: 2,
      name: "Family Homes in Bellevue",
      query: "family house bellevue",
      filters: {
        propertyType: "house",
        priceRange: "500000-1000000",
        bedrooms: "3",
        location: "bellevue"
      },
      createdAt: "2024-09-08",
      emailAlerts: true,
      frequency: "weekly",
      newMatches: 1
    }
  ];

  // Mock recent activity data
  const mockRecentActivity = [
    {
      id: 1,
      type: "property_saved",
      description: "Saved a property to your favorites",
      propertyTitle: "Modern Downtown Apartment with City Views",
      propertyId: 1,
      timestamp: "2024-09-15T16:30:00Z"
    },
    {
      id: 2,
      type: "inquiry_sent",
      description: "Sent inquiry to agent",
      propertyTitle: "Modern Downtown Apartment with City Views",
      propertyId: 1,
      timestamp: "2024-09-15T10:00:00Z"
    },
    {
      id: 3,
      type: "search_saved",
      description: "Created new search alert",
      timestamp: "2024-09-14T14:20:00Z"
    },
    {
      id: 4,
      type: "property_viewed",
      description: "Viewed property details",
      propertyTitle: "Spacious Family Home with Garden",
      propertyId: 2,
      timestamp: "2024-09-14T11:45:00Z"
    },
    {
      id: 5,
      type: "agent_response",
      description: "Received response from agent",
      propertyTitle: "Modern Downtown Apartment with City Views",
      timestamp: "2024-09-15T11:30:00Z"
    }
  ];

  // Mock comparison properties data
  const mockComparisonProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment with City Views",
      price: 450000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      yearBuilt: 2020,
      propertyType: "Apartment",
      parking: "1 space",
      hoa: 250,
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"]
    },
    {
      id: 2,
      title: "Spacious Family Home with Garden",
      price: 675000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      yearBuilt: 2015,
      propertyType: "House",
      parking: "2 spaces",
      hoa: null,
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"]
    }
  ];

  // Mock stats data
  const mockStats = {
    savedProperties: mockSavedProperties?.length,
    activeInquiries: mockInquiries?.filter(i => i?.status !== 'closed')?.length,
    searchAlerts: mockSavedSearches?.length,
    propertiesViewed: 24
  };

  useEffect(() => {
    // Simulate loading user data
    setUser(mockUser);
  }, []);

  const handleRemoveProperty = (propertyId) => {
    console.log('Removing property:', propertyId);
    // Implementation would update the saved properties list
  };

  const handleSendMessage = (inquiryId, message) => {
    console.log('Sending message to inquiry:', inquiryId, message);
    // Implementation would send the message and update the inquiry
  };

  const handleDeleteSearch = (searchId) => {
    console.log('Deleting search:', searchId);
    // Implementation would remove the search from saved searches
  };

  const handleEditSearch = (searchId) => {
    console.log('Editing search:', searchId);
    // Implementation would open edit dialog or navigate to edit page
  };

  const handleRemoveFromComparison = (propertyId) => {
    console.log('Removing from comparison:', propertyId);
    // Implementation would remove property from comparison list
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'saved', label: 'Saved Properties', icon: 'Heart' },
    { id: 'inquiries', label: 'Inquiries', icon: 'MessageSquare' },
    { id: 'searches', label: 'Search Alerts', icon: 'Bell' },
    { id: 'comparison', label: 'Compare', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} notificationCount={5} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {activeTab === 'overview' && (
                  <>
                    <QuickActionsSection user={user} stats={mockStats} />
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      <RecentActivitySection activities={mockRecentActivity} />
                      <SavedSearchesSection 
                        savedSearches={mockSavedSearches?.slice(0, 2)}
                        onDeleteSearch={handleDeleteSearch}
                        onEditSearch={handleEditSearch}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'saved' && (
                  <SavedPropertiesSection 
                    savedProperties={mockSavedProperties}
                    onRemoveProperty={handleRemoveProperty}
                  />
                )}

                {activeTab === 'inquiries' && (
                  <InquiriesSection 
                    inquiries={mockInquiries}
                    onSendMessage={handleSendMessage}
                  />
                )}

                {activeTab === 'searches' && (
                  <SavedSearchesSection 
                    savedSearches={mockSavedSearches}
                    onDeleteSearch={handleDeleteSearch}
                    onEditSearch={handleEditSearch}
                  />
                )}

                {activeTab === 'comparison' && (
                  <PropertyComparisonSection 
                    comparisonProperties={mockComparisonProperties}
                    onRemoveFromComparison={handleRemoveFromComparison}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;