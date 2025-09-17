import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InquiriesSection = ({ inquiries = [], onSendMessage = () => {} }) => {
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const handleExpandInquiry = (inquiryId) => {
    setExpandedInquiry(expandedInquiry === inquiryId ? null : inquiryId);
  };

  const handleSendMessage = (inquiryId) => {
    if (newMessage?.trim()) {
      onSendMessage(inquiryId, newMessage?.trim());
      setNewMessage('');
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'responded': return 'text-success bg-success/10';
      case 'closed': return 'text-muted-foreground bg-muted';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'responded': return 'CheckCircle';
      case 'closed': return 'XCircle';
      default: return 'MessageSquare';
    }
  };

  if (inquiries?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Inquiries Yet
        </h3>
        <p className="text-muted-foreground mb-6">
          When you contact agents about properties, your conversations will appear here.
        </p>
        <Button
          variant="default"
          onClick={() => navigate('/property-details')}
          iconName="Search"
          iconPosition="left"
        >
          Browse Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Property Inquiries
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {inquiries?.length} active {inquiries?.length === 1 ? 'conversation' : 'conversations'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/property-details')}
          iconName="Plus"
          iconPosition="left"
        >
          New Inquiry
        </Button>
      </div>
      {/* Inquiries List */}
      <div className="divide-y divide-border">
        {inquiries?.map((inquiry) => (
          <div key={inquiry?.id} className="p-6">
            {/* Inquiry Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={inquiry?.property?.image}
                  alt={inquiry?.property?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading font-medium text-foreground truncate">
                      {inquiry?.property?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Agent: {inquiry?.agent?.name}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry?.status)}`}>
                    <Icon name={getStatusIcon(inquiry?.status)} size={12} />
                    <span className="capitalize">{inquiry?.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(inquiry?.lastActivity)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageSquare" size={14} />
                    <span>{inquiry?.messages?.length} messages</span>
                  </div>
                </div>
                
                <p className="text-sm text-foreground line-clamp-2">
                  {inquiry?.lastMessage}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExpandInquiry(inquiry?.id)}
                iconName={expandedInquiry === inquiry?.id ? "ChevronUp" : "ChevronDown"}
              />
            </div>

            {/* Expanded Conversation */}
            {expandedInquiry === inquiry?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                {/* Messages */}
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {inquiry?.messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message?.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message?.sender === 'client' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{message?.content}</p>
                        <p className={`text-xs mt-1 ${
                          message?.sender === 'client' ?'text-primary-foreground/70' :'text-muted-foreground'
                        }`}>
                          {formatDate(message?.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                {inquiry?.status !== 'closed' && (
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e?.target?.value)}
                        placeholder="Type your message..."
                        rows={2}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      />
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleSendMessage(inquiry?.id)}
                      disabled={!newMessage?.trim()}
                      iconName="Send"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InquiriesSection;