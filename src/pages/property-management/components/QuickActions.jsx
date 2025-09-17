import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickActions = ({ 
  onCreateProperty = () => {}, 
  onImportProperties = () => {},
  onExportData = () => {},
  onBulkUpdate = () => {},
  className = ""
}) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [bulkUpdateData, setBulkUpdateData] = useState({
    field: 'status',
    value: 'available',
    properties: []
  });

  const quickActionItems = [
    {
      title: 'Add New Property',
      description: 'Create a new property listing',
      icon: 'Plus',
      color: 'bg-primary/10 text-primary',
      action: onCreateProperty
    },
    {
      title: 'Import Properties',
      description: 'Upload properties from CSV/Excel',
      icon: 'Upload',
      color: 'bg-secondary/10 text-secondary',
      action: () => setShowImportModal(true)
    },
    {
      title: 'Export Data',
      description: 'Download property data',
      icon: 'Download',
      color: 'bg-accent/10 text-accent',
      action: onExportData
    },
    {
      title: 'Bulk Update',
      description: 'Update multiple properties',
      icon: 'Edit3',
      color: 'bg-warning/10 text-warning',
      action: () => setShowBulkUpdateModal(true)
    }
  ];

  const recentTemplates = [
    {
      id: 1,
      name: 'Luxury Home Template',
      description: 'Pre-filled form for luxury properties',
      icon: 'Crown',
      lastUsed: '2 days ago'
    },
    {
      id: 2,
      name: 'Apartment Template',
      description: 'Standard apartment listing template',
      icon: 'Building',
      lastUsed: '1 week ago'
    },
    {
      id: 3,
      name: 'Commercial Template',
      description: 'Template for commercial properties',
      icon: 'Briefcase',
      lastUsed: '2 weeks ago'
    }
  ];

  const bulkUpdateFields = [
    { value: 'status', label: 'Status' },
    { value: 'propertyType', label: 'Property Type' },
    { value: 'price', label: 'Price' },
    { value: 'agent', label: 'Assigned Agent' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' }
  ];

  const handleImportFile = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImportSubmit = () => {
    if (importFile) {
      onImportProperties(importFile);
      setShowImportModal(false);
      setImportFile(null);
    }
  };

  const handleBulkUpdateSubmit = () => {
    onBulkUpdate(bulkUpdateData);
    setShowBulkUpdateModal(false);
    setBulkUpdateData({
      field: 'status',
      value: 'available',
      properties: []
    });
  };

  return (
    <>
      <div className={`space-y-6 ${className}`}>
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems?.map((item, index) => (
            <button
              key={index}
              onClick={item?.action}
              className="bg-card rounded-lg border border-border p-6 text-left hover:shadow-elevation-1 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-lg ${item?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item?.icon} size={24} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item?.title}</h3>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
            </button>
          ))}
        </div>

        {/* Recent Templates */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">Recent Templates</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              iconPosition="left"
            >
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentTemplates?.map((template) => (
              <div
                key={template?.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={template?.icon} size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {template?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">{template?.description}</p>
                    <p className="text-xs text-muted-foreground">Last used: {template?.lastUsed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Stats</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">24</div>
              <div className="text-sm text-muted-foreground">Properties Added Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">156</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">8</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">92%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground">Import Properties</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowImportModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleImportFile}
                      className="hidden"
                      id="import-file"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('import-file')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                  {importFile && (
                    <p className="text-sm text-foreground mt-2">
                      Selected: {importFile?.name}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setShowImportModal(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleImportSubmit}
                    disabled={!importFile}
                    fullWidth
                  >
                    Import
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Bulk Update Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground">Bulk Update</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBulkUpdateModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <Select
                  label="Field to Update"
                  options={bulkUpdateFields}
                  value={bulkUpdateData?.field}
                  onChange={(value) => setBulkUpdateData(prev => ({ ...prev, field: value }))}
                />

                {bulkUpdateData?.field === 'status' && (
                  <Select
                    label="New Value"
                    options={statusOptions}
                    value={bulkUpdateData?.value}
                    onChange={(value) => setBulkUpdateData(prev => ({ ...prev, value }))}
                  />
                )}

                {bulkUpdateData?.field === 'price' && (
                  <Input
                    label="New Price"
                    type="number"
                    placeholder="Enter new price"
                    value={bulkUpdateData?.value}
                    onChange={(e) => setBulkUpdateData(prev => ({ ...prev, value: e?.target?.value }))}
                  />
                )}

                <div className="flex items-center space-x-3 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setShowBulkUpdateModal(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkUpdateSubmit}
                    fullWidth
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;