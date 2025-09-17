import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const navigate = useNavigate();
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    
    if (isAuthenticated === 'true' && user) {
      const userData = JSON.parse(user);
      // Redirect to appropriate dashboard based on role
      if (userData?.role === 'agent') {
        navigate('/agent-dashboard');
      } else if (userData?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    }

    // Listen for successful registration
    const handleRegistrationSuccess = (event) => {
      if (event?.detail && event?.detail?.user) {
        setRegisteredUser(event?.detail?.user);
        setRegistrationComplete(true);
      }
    };

    window.addEventListener('registrationSuccess', handleRegistrationSuccess);
    
    return () => {
      window.removeEventListener('registrationSuccess', handleRegistrationSuccess);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Registration Card */}
          <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-6 lg:p-8">
            {!registrationComplete ? (
              <>
                <RegistrationHeader />
                <RegistrationForm />
              </>
            ) : (
              <RegistrationSuccess 
                userEmail={registeredUser?.email}
                userRole={registeredUser?.role}
              />
            )}
          </div>

          {/* Additional Links */}
          {!registrationComplete && (
            <div className="mt-6 text-center space-y-4">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <button 
                  onClick={() => navigate('/property-details')}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Browse Properties
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors duration-200">
                  Help Center
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors duration-200">
                  Contact Us
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="relative z-10 bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} PropertyHub. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
              <button className="hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors duration-200">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;