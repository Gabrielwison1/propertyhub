import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userEmail, userRole }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (userRole === 'agent') {
      navigate('/agent-dashboard');
    } else {
      navigate('/client-dashboard');
    }
  };

  return (
    <div className="text-center space-y-6 max-w-md mx-auto">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Account Created Successfully!
        </h2>
        <p className="text-muted-foreground">
          Welcome to PropertyHub! Your account has been created and you're ready to get started.
        </p>
      </div>

      {/* Email Verification Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-primary mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-medium text-foreground">Email Verification</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a verification email to{' '}
              <span className="font-medium text-foreground">{userEmail}</span>.
              Please check your inbox and click the verification link to activate all features.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-muted/30 rounded-lg p-4 text-left">
        <h3 className="font-medium text-foreground mb-3">What's next?</h3>
        <div className="space-y-2">
          {userRole === 'agent' ? (
            <>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Plus" size={14} />
                <span>Create your first property listing</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Settings" size={14} />
                <span>Complete your agent profile</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={14} />
                <span>Start managing client inquiries</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Search" size={14} />
                <span>Browse available properties</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Heart" size={14} />
                <span>Save your favorite properties</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MessageSquare" size={14} />
                <span>Contact agents for inquiries</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={handleContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate('/property-details')}
          iconName="Building2"
          iconPosition="left"
        >
          Browse Properties
        </Button>
      </div>

      {/* Support Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Need help getting started?{' '}
          <button className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;