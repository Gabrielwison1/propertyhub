import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivitySection = ({ activities = [] }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    })?.format(activityDate);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'property_saved': return 'Heart';
      case 'property_viewed': return 'Eye';
      case 'inquiry_sent': return 'MessageSquare';
      case 'search_saved': return 'Search';
      case 'price_alert': return 'TrendingDown';
      case 'agent_response': return 'MessageCircle';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'property_saved': return 'text-accent';
      case 'property_viewed': return 'text-primary';
      case 'inquiry_sent': return 'text-secondary';
      case 'search_saved': return 'text-success';
      case 'price_alert': return 'text-warning';
      case 'agent_response': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const handleActivityClick = (activity) => {
    switch (activity?.type) {
      case 'property_saved': case'property_viewed':
        navigate(`/property-details?id=${activity?.propertyId}`);
        break;
      case 'inquiry_sent': case'agent_response':
        // Scroll to inquiries section or navigate to specific inquiry
        break;
      case 'search_saved':
        // Navigate to search results
        navigate('/property-details');
        break;
      default:
        break;
    }
  };

  if (activities?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-heading font-medium text-foreground mb-2">
          No Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          Your property browsing activity will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Recent Activity
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/property-details')}
          iconName="ExternalLink"
        />
      </div>
      {/* Activities List */}
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {activities?.map((activity) => (
          <button
            key={activity?.id}
            onClick={() => handleActivityClick(activity)}
            className="w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`mt-0.5 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground mb-1">
                  {activity?.description}
                </p>
                
                {activity?.propertyTitle && (
                  <p className="text-sm text-muted-foreground mb-1 truncate">
                    {activity?.propertyTitle}
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground">
                  {formatDate(activity?.timestamp)}
                </p>
              </div>
              
              <Icon name="ChevronRight" size={14} className="text-muted-foreground mt-1" />
            </div>
          </button>
        ))}
      </div>
      {/* View All */}
      {activities?.length > 5 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            onClick={() => navigate('/activity')}
            iconName="ArrowRight"
            iconPosition="right"
            className="text-sm"
          >
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivitySection;