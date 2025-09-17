import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActionBar = ({ selectedCount, onBulkAction, onExport, onAddProperty }) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const navigate = useNavigate();

  const bulkActions = [
    { value: 'activate', label: 'Activate Properties', icon: 'Play' },
    { value: 'deactivate', label: 'Deactivate Properties', icon: 'Pause' },
    { value: 'delete', label: 'Delete Properties', icon: 'Trash2' },
    { value: 'duplicate', label: 'Duplicate Properties', icon: 'Copy' }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV Format' },
    { value: 'excel', label: 'Excel Format' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setShowBulkMenu(false);
  };

  const handleExport = () => {
    onExport(exportFormat);
  };

  const handleAddProperty = () => {
    if (onAddProperty) {
      onAddProperty();
    } else {
      navigate('/property-management?action=create');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Left Side - Bulk Actions */}
        <div className="flex items-center space-x-4">
          {selectedCount > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedCount} properties selected
              </span>
              
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkMenu(!showBulkMenu)}
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Bulk Actions
                </Button>

                {showBulkMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-10">
                    {bulkActions?.map((action) => (
                      <button
                        key={action?.value}
                        onClick={() => handleBulkAction(action?.value)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name={action?.icon} size={16} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Side - Primary Actions */}
        <div className="flex items-center space-x-3">
          {/* Export */}
          <div className="flex items-center space-x-2">
            <Select
              options={exportFormats}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-32"
            />
            <Button
              variant="outline"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>

          {/* Add Property */}
          <Button
            variant="default"
            onClick={handleAddProperty}
            iconName="Plus"
            iconPosition="left"
          >
            Add New Property
          </Button>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="default"
            fullWidth
            onClick={handleAddProperty}
            iconName="Plus"
            iconPosition="left"
          >
            Add Property
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
        
        {selectedCount > 0 && (
          <div className="mt-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowBulkMenu(!showBulkMenu)}
              iconName="Settings"
              iconPosition="left"
            >
              Bulk Actions ({selectedCount})
            </Button>
          </div>
        )}
      </div>
      {/* Mobile Bulk Menu */}
      {showBulkMenu && (
        <div className="lg:hidden mt-3 bg-muted/30 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            {bulkActions?.map((action) => (
              <Button
                key={action?.value}
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction(action?.value)}
                iconName={action?.icon}
                iconPosition="left"
              >
                {action?.label?.split(' ')?.[0]}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Backdrop for mobile menu */}
      {showBulkMenu && (
        <div 
          className="fixed inset-0 bg-black/20 z-5"
          onClick={() => setShowBulkMenu(false)}
        />
      )}
    </div>
  );
};

export default ActionBar;