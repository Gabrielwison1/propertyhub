import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AgentCard = ({ agent = {} }) => {
  const handleCall = () => {
    window.location.href = `tel:${agent?.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${agent?.email}`;
  };

  const handleMessage = () => {
    // Scroll to inquiry form or open messaging interface
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
      inquiryForm?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-start space-x-4">
        {/* Agent Photo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image
              src={agent?.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"}
              alt={agent?.name || "Agent"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-heading font-medium text-foreground mb-1">
            {agent?.name || "Sarah Johnson"}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {agent?.title || "Senior Real Estate Agent"}
          </p>
          
          {/* Company */}
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Building2" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {agent?.company || "PropertyHub Realty"}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {agent?.experience || "8"}
              </div>
              <div className="text-xs text-muted-foreground">Years Exp.</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {agent?.propertiesSold || "150+"}
              </div>
              <div className="text-xs text-muted-foreground">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {agent?.rating || "4.9"}
              </div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col space-y-2">
            <Button
              variant="default"
              fullWidth
              onClick={handleCall}
              iconName="Phone"
              iconPosition="left"
            >
              Call Now
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleEmail}
                iconName="Mail"
                iconPosition="left"
              >
                Email
              </Button>
              <Button
                variant="outline"
                onClick={handleMessage}
                iconName="MessageSquare"
                iconPosition="left"
              >
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Agent Bio */}
      {agent?.bio && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {agent?.bio}
          </p>
        </div>
      )}
      {/* Specializations */}
      {agent?.specializations && agent?.specializations?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {agent?.specializations?.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Languages */}
      {agent?.languages && agent?.languages?.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-foreground mb-2">Languages</h4>
          <div className="flex flex-wrap gap-2">
            {agent?.languages?.map((lang, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Reviews Link */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          <Icon name="Star" size={14} />
          <span>View {agent?.reviewCount || "25"} Reviews</span>
          <Icon name="ExternalLink" size={12} />
        </button>
      </div>
    </div>
  );
};

export default AgentCard;