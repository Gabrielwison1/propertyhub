import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InquiryForm = ({ property = {}, agent = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
    preferredContact: 'email',
    visitDate: '',
    visitTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'viewing', label: 'Schedule Viewing' },
    { value: 'offer', label: 'Make an Offer' },
    { value: 'financing', label: 'Financing Information' },
    { value: 'neighborhood', label: 'Neighborhood Info' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'text', label: 'Text Message' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        message: '',
        preferredContact: 'email',
        visitDate: '',
        visitTime: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            Inquiry Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your interest. {agent?.name || "The agent"} will contact you within 24 hours.
          </p>
          <div className="text-sm text-muted-foreground">
            Reference ID: INQ-{Date.now()?.toString()?.slice(-6)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MessageSquare" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Contact Agent
          </h3>
          <p className="text-sm text-muted-foreground">
            Get more information about this property
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            required
          />
        </div>

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          required
        />

        {/* Inquiry Details */}
        <Select
          label="Inquiry Type"
          options={inquiryTypes}
          value={formData?.inquiryType}
          onChange={(value) => handleInputChange('inquiryType', value)}
        />

        <Select
          label="Preferred Contact Method"
          options={contactMethods}
          value={formData?.preferredContact}
          onChange={(value) => handleInputChange('preferredContact', value)}
        />

        {/* Viewing Schedule (if applicable) */}
        {formData?.inquiryType === 'viewing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <Input
              label="Preferred Date"
              type="date"
              value={formData?.visitDate}
              onChange={(e) => handleInputChange('visitDate', e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />
            
            <Input
              label="Preferred Time"
              type="time"
              value={formData?.visitTime}
              onChange={(e) => handleInputChange('visitTime', e?.target?.value)}
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            placeholder={`I'm interested in ${property?.title || 'this property'}. Please provide more information.`}
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Property Reference */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Property Reference:</div>
          <div className="font-medium text-foreground">
            {property?.title || "Luxury Downtown Apartment"} - ID: {property?.id || "PROP001"}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
        >
          {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
        </Button>

        {/* Contact Info */}
        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2">Or contact directly:</div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{agent?.phone || "(555) 123-4567"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{agent?.email || "agent@propertyhub.com"}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;