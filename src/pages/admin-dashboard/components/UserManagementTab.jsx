import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "agent",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-09-17",
      propertiesManaged: 12,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "agent",
      status: "active",
      joinDate: "2024-02-20",
      lastActive: "2024-09-16",
      propertiesManaged: 8,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      role: "client",
      status: "active",
      joinDate: "2024-03-10",
      lastActive: "2024-09-17",
      propertiesManaged: 0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      role: "agent",
      status: "inactive",
      joinDate: "2024-01-05",
      lastActive: "2024-08-15",
      propertiesManaged: 15,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      role: "client",
      status: "active",
      joinDate: "2024-04-22",
      lastActive: "2024-09-16",
      propertiesManaged: 0,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'agent', label: 'Agents' },
    { value: 'client', label: 'Clients' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    // Handle user actions
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-success/10 text-success`;
    }
    return `${baseClasses} bg-muted text-muted-foreground`;
  };

  const getRoleBadge = (role) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    if (role === 'agent') {
      return `${baseClasses} bg-primary/10 text-primary`;
    }
    return `${baseClasses} bg-secondary/10 text-secondary`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="Filter by role"
          />
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          
          <Button
            variant="default"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => navigate('/register')}
          >
            Add User
          </Button>
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-foreground">User</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Properties</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getRoleBadge(user?.role)}>
                      {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(user?.status)}>
                      {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-foreground font-medium">{user?.propertiesManaged}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-muted-foreground text-sm">{user?.lastActive}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit3"
                        onClick={() => handleUserAction(user?.id, 'edit')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handleUserAction(user?.id, 'view')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
                        onClick={() => handleUserAction(user?.id, user?.status === 'active' ? 'deactivate' : 'activate')}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;