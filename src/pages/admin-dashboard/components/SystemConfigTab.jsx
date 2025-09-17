import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfigTab = () => {
  const [settings, setSettings] = useState({
    siteName: 'PropertyHub',
    siteDescription: 'Your trusted real estate platform',
    contactEmail: 'admin@propertyhub.com',
    supportPhone: '+1 (555) 123-4567',
    maxFileSize: '10',
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf'],
    autoApproveProperties: false,
    requireEmailVerification: true,
    enableNotifications: true,
    maintenanceMode: false,
    maxPropertiesPerAgent: '50',
    commissionRate: '3.5',
    featuredPropertyFee: '99',
    currency: 'USD',
    timezone: 'America/Los_Angeles'
  });

  const [activeSection, setActiveSection] = useState('general');

  const fileSizeOptions = [
    { value: '5', label: '5 MB' },
    { value: '10', label: '10 MB' },
    { value: '20', label: '20 MB' },
    { value: '50', label: '50 MB' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' }
  ];

  const timezoneOptions = [
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' }
  ];

  const sections = [
    { id: 'general', label: 'General Settings', icon: 'Settings' },
    { id: 'uploads', label: 'File Uploads', icon: 'Upload' },
    { id: 'properties', label: 'Property Settings', icon: 'Building2' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'financial', label: 'Financial Settings', icon: 'DollarSign' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Handle save settings
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      console.log('Resetting settings to defaults');
      // Handle reset settings
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Site Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Site Name"
            value={settings?.siteName}
            onChange={(e) => handleSettingChange('siteName', e?.target?.value)}
            placeholder="Enter site name"
          />
          <Input
            label="Contact Email"
            type="email"
            value={settings?.contactEmail}
            onChange={(e) => handleSettingChange('contactEmail', e?.target?.value)}
            placeholder="Enter contact email"
          />
          <Input
            label="Support Phone"
            type="tel"
            value={settings?.supportPhone}
            onChange={(e) => handleSettingChange('supportPhone', e?.target?.value)}
            placeholder="Enter support phone"
          />
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={settings?.timezone}
            onChange={(value) => handleSettingChange('timezone', value)}
          />
        </div>
        <div className="mt-4">
          <Input
            label="Site Description"
            value={settings?.siteDescription}
            onChange={(e) => handleSettingChange('siteDescription', e?.target?.value)}
            placeholder="Enter site description"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">System Status</h3>
        <div className="space-y-3">
          <Checkbox
            label="Maintenance Mode"
            description="Enable to temporarily disable public access to the site"
            checked={settings?.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderUploadSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">File Upload Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Maximum File Size"
            options={fileSizeOptions}
            value={settings?.maxFileSize}
            onChange={(value) => handleSettingChange('maxFileSize', value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Allowed File Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt']?.map((type) => (
            <Checkbox
              key={type}
              label={type?.toUpperCase()}
              checked={settings?.allowedFileTypes?.includes(type)}
              onChange={(e) => {
                const newTypes = e?.target?.checked
                  ? [...settings?.allowedFileTypes, type]
                  : settings?.allowedFileTypes?.filter(t => t !== type);
                handleSettingChange('allowedFileTypes', newTypes);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderPropertySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Property Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Max Properties per Agent"
            type="number"
            value={settings?.maxPropertiesPerAgent}
            onChange={(e) => handleSettingChange('maxPropertiesPerAgent', e?.target?.value)}
            placeholder="Enter maximum number"
          />
          <Select
            label="Default Currency"
            options={currencyOptions}
            value={settings?.currency}
            onChange={(value) => handleSettingChange('currency', value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Approval Settings</h3>
        <div className="space-y-3">
          <Checkbox
            label="Auto-approve Properties"
            description="Automatically approve new property listings without manual review"
            checked={settings?.autoApproveProperties}
            onChange={(e) => handleSettingChange('autoApproveProperties', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Notification Configuration</h3>
        <div className="space-y-3">
          <Checkbox
            label="Enable System Notifications"
            description="Allow the system to send notifications to users"
            checked={settings?.enableNotifications}
            onChange={(e) => handleSettingChange('enableNotifications', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderFinancialSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Commission & Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Commission Rate (%)"
            type="number"
            step="0.1"
            value={settings?.commissionRate}
            onChange={(e) => handleSettingChange('commissionRate', e?.target?.value)}
            placeholder="Enter commission rate"
          />
          <Input
            label="Featured Property Fee ($)"
            type="number"
            value={settings?.featuredPropertyFee}
            onChange={(e) => handleSettingChange('featuredPropertyFee', e?.target?.value)}
            placeholder="Enter featured fee"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">User Security</h3>
        <div className="space-y-3">
          <Checkbox
            label="Require Email Verification"
            description="Users must verify their email address before accessing the platform"
            checked={settings?.requireEmailVerification}
            onChange={(e) => handleSettingChange('requireEmailVerification', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'uploads': return renderUploadSettings();
      case 'properties': return renderPropertySettings();
      case 'notifications': return renderNotificationSettings();
      case 'financial': return renderFinancialSettings();
      case 'security': return renderSecuritySettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-foreground mb-4">Settings</h3>
          <nav className="space-y-1">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-card border border-border rounded-lg p-6">
          {renderContent()}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleResetSettings}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset to Defaults
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => console.log('Settings cancelled')}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveSettings}
                iconName="Save"
                iconPosition="left"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigTab;