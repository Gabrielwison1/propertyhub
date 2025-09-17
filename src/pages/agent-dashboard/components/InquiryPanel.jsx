import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InquiryPanel = ({ inquiries, onReply, onUpdateStatus }) => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const priorityColors = {
    high: 'bg-error/10 text-error border-error/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-success/10 text-success border-success/20'
  };

  const statusColors = {
    new: 'bg-accent/10 text-accent border-accent/20',
    replied: 'bg-primary/10 text-primary border-primary/20',
    closed: 'bg-muted text-muted-foreground border-border'
  };

  const filteredInquiries = inquiries?.filter(inquiry => {
    if (filter === 'all') return true;
    return inquiry?.status === filter;
  });

  const handleReply = () => {
    if (replyMessage?.trim() && selectedInquiry) {
      onReply(selectedInquiry?.id, replyMessage);
      setReplyMessage('');
      setSelectedInquiry(null);
    }
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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">Recent Inquiries</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'new' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('new')}
            >
              New
            </Button>
            <Button
              variant={filter === 'replied' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('replied')}
            >
              Replied
            </Button>
          </div>
        </div>
      </div>
      {/* Inquiries List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredInquiries?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No inquiries found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredInquiries?.map((inquiry) => (
              <div key={inquiry?.id} className="p-4 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{inquiry?.clientName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors?.[inquiry?.priority]}`}>
                        {inquiry?.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors?.[inquiry?.status]}`}>
                        {inquiry?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{inquiry?.propertyTitle}</p>
                    <p className="text-sm text-foreground">{inquiry?.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {formatTimeAgo(inquiry?.timestamp)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Mail" size={14} />
                    <span>{inquiry?.clientEmail}</span>
                    <Icon name="Phone" size={14} className="ml-2" />
                    <span>{inquiry?.clientPhone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInquiry(inquiry)}
                      iconName="Reply"
                    >
                      Reply
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateStatus(inquiry?.id, inquiry?.status === 'new' ? 'replied' : 'closed')}
                      iconName={inquiry?.status === 'new' ? 'Check' : 'X'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">
                  Reply to {selectedInquiry?.clientName}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedInquiry(null)}
                  iconName="X"
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Original message:</p>
                <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                  {selectedInquiry?.message}
                </p>
              </div>
              
              <Input
                label="Your Reply"
                type="text"
                placeholder="Type your reply message..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e?.target?.value)}
                className="mb-4"
              />
              
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleReply}
                  disabled={!replyMessage?.trim()}
                  iconName="Send"
                  iconPosition="right"
                >
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryPanel;