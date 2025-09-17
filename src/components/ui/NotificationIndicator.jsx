import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationIndicator = ({ 
  user = null, 
  notifications = [], 
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unread = notifications?.filter(n => !n?.read)?.length;
    setUnreadCount(unread);
  }, [notifications]);

  const handleNotificationClick = (notification) => {
    if (!notification?.read) {
      onMarkAsRead(notification?.id);
    }
    
    // Navigate based on notification type
    switch (notification?.type) {
      case 'inquiry': navigate('/agent-dashboard?tab=inquiries');
        break;
      case 'property_update':
        navigate(`/property-details?id=${notification?.propertyId}`);
        break;
      case 'appointment': navigate('/client-dashboard?tab=appointments');
        break;
      case 'system': navigate('/admin-dashboard?tab=system');
        break;
      default:
        break;
    }
    
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'inquiry': return 'MessageSquare';
      case 'property_update': return 'Building2';
      case 'appointment': return 'Calendar';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'inquiry': return 'text-accent';
      case 'property_update': return 'text-primary';
      case 'appointment': return 'text-success';
      case 'system': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  if (!user) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-[1010] max-h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-medium text-popover-foreground">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications?.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications?.slice(0, 10)?.map((notification) => (
                    <button
                      key={notification?.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 text-left hover:bg-muted transition-colors duration-200 ${
                        !notification?.read ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 ${getNotificationColor(notification?.type)}`}>
                          <Icon name={getNotificationIcon(notification?.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification?.read ? 'font-medium' : ''} text-popover-foreground`}>
                            {notification?.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTimeAgo(notification?.timestamp)}
                          </p>
                        </div>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications?.length > 10 && (
              <div className="p-4 border-t border-border">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => {
                    navigate('/notifications');
                    setIsOpen(false);
                  }}
                  className="text-sm"
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>

          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[1005]"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default NotificationIndicator;