import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={24} color="white" />
          </div>
          <span className="text-2xl font-heading font-bold text-foreground">
            PropertyHub
          </span>
        </button>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Join PropertyHub
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Create your account to start browsing properties or managing your listings. 
          Join thousands of users who trust PropertyHub for their real estate needs.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={14} className="text-success" />
          </div>
          <span>Secure & Private</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Search" size={14} className="text-primary" />
          </div>
          <span>Advanced Search</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={14} className="text-accent" />
          </div>
          <span>Save Favorites</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;