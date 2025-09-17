import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const PropertyActionBar = ({ 
  user = null, 
  property = null, 
  onSave = () => {}, 
  onShare = () => {}, 
  onInquire = () => {}, 
  onEdit = () => {},
  onDelete = () => {},
  isSaved = false,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleSave = () => {
    onSave(property?.id);
  };

  const handleShare = (platform) => {
    onShare(property?.id, platform);
    setShowShareMenu(false);
  };

  const handleInquire = () => {
    onInquire(property?.id);
  };

  const handleEdit = () => {
    onEdit(property?.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      onDelete(property?.id);
    }
  };

  const shareOptions = [
    { label: 'Copy Link', icon: 'Link', action: 'link' },
    { label: 'Email', icon: 'Mail', action: 'email' },
    { label: 'WhatsApp', icon: 'MessageCircle', action: 'whatsapp' },
    { label: 'Facebook', icon: 'Facebook', action: 'facebook' },
    { label: 'Twitter', icon: 'Twitter', action: 'twitter' }
  ];

  // Client actions
  const clientActions = [
    {
      label: isSaved ? 'Saved' : 'Save',
      icon: isSaved ? 'Heart' : 'Heart',
      action: handleSave,
      variant: isSaved ? 'default' : 'outline',
      className: isSaved ? 'text-accent' : ''
    },
    {
      label: 'Share',
      icon: 'Share2',
      action: () => setShowShareMenu(!showShareMenu),
      variant: 'outline'
    },
    {
      label: 'Inquire',
      icon: 'MessageSquare',
      action: handleInquire,
      variant: 'default'
    }
  ];

  // Agent/Admin actions
  const agentActions = [
    {
      label: 'Edit',
      icon: 'Edit3',
      action: handleEdit,
      variant: 'outline'
    },
    {
      label: 'Share',
      icon: 'Share2',
      action: () => setShowShareMenu(!showShareMenu),
      variant: 'outline'
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      action: handleDelete,
      variant: 'destructive'
    }
  ];

  const actions = user?.role === 'agent' || user?.role === 'admin' ? agentActions : clientActions;

  return (
    <>
      {/* Desktop Action Bar */}
      <div className={`hidden lg:flex items-center justify-center space-x-3 sticky top-20 z-50 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-elevation-2 ${className}`}>
        {actions?.map((action, index) => (
          <div key={index} className="relative">
            <Button
              variant={action?.variant}
              onClick={action?.action}
              iconName={action?.icon}
              iconPosition="left"
              className={action?.className}
            >
              {action?.label}
            </Button>

            {action?.label === 'Share' && showShareMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-[1010]">
                {shareOptions?.map((option) => (
                  <button
                    key={option?.action}
                    onClick={() => handleShare(option?.action)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={option?.icon} size={16} />
                    <span>{option?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-3 mb-2">
              {actions?.map((action, index) => (
                <div key={index} className="relative">
                  <Button
                    variant={action?.variant}
                    size="icon"
                    onClick={action?.action}
                    className={`w-12 h-12 shadow-elevation-2 ${action?.className}`}
                  >
                    <Icon name={action?.icon} size={20} />
                  </Button>

                  {action?.label === 'Share' && showShareMenu && (
                    <div className="absolute right-16 top-0 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-[1010]">
                      {shareOptions?.map((option) => (
                        <button
                          key={option?.action}
                          onClick={() => handleShare(option?.action)}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        >
                          <Icon name={option?.icon} size={16} />
                          <span>{option?.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Main FAB */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 rounded-full shadow-elevation-3 transition-transform duration-200 hover:scale-105"
          >
            <Icon 
              name={isExpanded ? "X" : "MoreVertical"} 
              size={24}
              className="transition-transform duration-200"
            />
          </Button>
        </div>
      </div>
      {/* Mobile Backdrop */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default PropertyActionBar;