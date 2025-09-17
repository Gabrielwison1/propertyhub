import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PropertyActionBar from '../../components/ui/PropertyActionBar';
import PropertyImageGallery from './components/PropertyImageGallery';
import PropertyInfoCard from './components/PropertyInfoCard';
import PropertyMap from './components/PropertyMap';
import InquiryForm from './components/InquiryForm';
import AgentCard from './components/AgentCard';
import SimilarProperties from './components/SimilarProperties';
import PropertyHistory from './components/PropertyHistory';
import Icon from '../../components/AppIcon';

const PropertyDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const propertyId = searchParams?.get('id') || 'PROP001';

  // Mock user data - in real app, get from auth context
  const mockUser = {
    id: "USER001",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "client"
  };

  // Mock property data
  const mockProperty = {
    id: propertyId,
    title: "Luxury Downtown Apartment with City Views",
    description: `Experience urban luxury in this stunning downtown apartment featuring floor-to-ceiling windows with breathtaking city views. This modern residence offers an open-concept living space with premium finishes throughout.\n\nThe gourmet kitchen boasts stainless steel appliances, quartz countertops, and custom cabinetry. The spacious master suite includes a walk-in closet and spa-like bathroom with dual vanities and a soaking tub.\n\nBuilding amenities include a 24-hour concierge, fitness center, rooftop terrace, and resident lounge. Located in the heart of downtown with easy access to shopping, dining, and public transportation.`,
    price: 720000,
    pricePerSqft: 480,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    type: "Apartment",
    status: "Available",
    address: "123 Main Street, Unit 15B, New York, NY 10001",
    neighborhood: "Downtown Manhattan",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    yearBuilt: 2018,
    lotSize: "N/A",
    parking: "1 Garage Space",
    heating: "Central Air/Heat",
    cooling: "Central Air",
    features: [
      "Floor-to-ceiling windows",
      "Hardwood floors",
      "In-unit laundry",
      "Stainless steel appliances",
      "Granite countertops",
      "Walk-in closet",
      "Balcony",
      "Dishwasher",
      "Microwave",
      "Air conditioning",
      "Elevator access",
      "Pet-friendly"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ]
  };

  // Mock agent data
  const mockAgent = {
    id: "AGENT001",
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    company: "PropertyHub Realty",
    phone: "(555) 123-4567",
    email: "sarah.johnson@propertyhub.com",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    experience: 8,
    propertiesSold: "150+",
    rating: 4.9,
    reviewCount: 25,
    bio: "Sarah is a dedicated real estate professional with over 8 years of experience in the Manhattan market. She specializes in luxury apartments and condos, helping clients find their perfect home in the city.",
    specializations: ["Luxury Properties", "First-time Buyers", "Investment Properties"],
    languages: ["English", "Spanish", "French"]
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setUser(mockUser);
      setProperty(mockProperty);
      setAgent(mockAgent);
      setIsLoading(false);
    }, 1000);
  }, [propertyId]);

  const handleSave = (propertyId) => {
    setIsSaved(!isSaved);
    // In real app, save to user's favorites
  };

  const handleShare = (propertyId, platform) => {
    const url = window.location?.href;
    const title = property?.title || "Check out this property";
    
    switch (platform) {
      case 'link':
        navigator.clipboard?.writeText(url);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      default:
        break;
    }
  };

  const handleInquire = (propertyId) => {
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
      inquiryForm?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEdit = (propertyId) => {
    navigate(`/property-management?edit=${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    // Handle property deletion
    navigate('/property-management');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse">
              <div className="h-96 bg-muted rounded-lg mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-muted rounded-lg"></div>
                  <div className="h-48 bg-muted rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-32 bg-muted rounded-lg"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="text-center">
              <Icon name="Home" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Property Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The property you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/property-search')}
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Browse Available Properties
              </button>
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
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Property Image Gallery */}
          <div className="mb-8">
            <PropertyImageGallery 
              images={property?.images} 
              propertyTitle={property?.title} 
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Info */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyInfoCard property={property} />
              <PropertyMap property={property} />
              <PropertyHistory property={property} />
              <SimilarProperties currentPropertyId={property?.id} />
            </div>

            {/* Right Column - Agent & Inquiry */}
            <div className="space-y-6">
              <AgentCard agent={agent} />
              <div id="inquiry-form">
                <InquiryForm property={property} agent={agent} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Property Action Bar */}
      <PropertyActionBar
        user={user}
        property={property}
        onSave={handleSave}
        onShare={handleShare}
        onInquire={handleInquire}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isSaved={isSaved}
      />
    </div>
  );
};

export default PropertyDetails;