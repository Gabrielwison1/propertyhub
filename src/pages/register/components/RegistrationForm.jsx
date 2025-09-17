import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleOptions = [
    { 
      value: '', 
      label: 'Select your role',
      disabled: true
    },
    { 
      value: 'client', 
      label: 'Client - Looking for properties',
      description: 'Browse and inquire about properties'
    },
    { 
      value: 'agent', 
      label: 'Agent - Managing properties',
      description: 'List and manage property listings'
    }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password?.length >= 8;
    const hasUpperCase = /[A-Z]/?.test(password);
    const hasLowerCase = /[a-z]/?.test(password);
    const hasNumbers = /\d/?.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/?.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const getPasswordStrength = (password) => {
    const validation = validatePassword(password);
    const score = Object.values(validation)?.filter(Boolean)?.length - 1; // Exclude isValid
    
    if (score <= 2) return { strength: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score <= 3) return { strength: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    if (score <= 4) return { strength: 'Good', color: 'text-accent', bgColor: 'bg-accent' };
    return { strength: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData?.password)?.isValid) {
      newErrors.password = 'Password must meet all requirements';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockUser = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phone: formData?.phone,
        role: formData?.role,
        isVerified: false,
        createdAt: new Date()?.toISOString()
      };

      // Store user data in localStorage (mock authentication)
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Navigate based on role
      if (formData?.role === 'agent') {
        navigate('/agent-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData?.firstName?.trim() &&
           formData?.lastName?.trim() &&
           formData?.email?.trim() &&
           validateEmail(formData?.email) &&
           formData?.phone?.trim() &&
           formData?.password &&
           validatePassword(formData?.password)?.isValid &&
           formData?.confirmPassword &&
           formData?.password === formData?.confirmPassword &&
           formData?.role &&
           formData?.agreeToTerms &&
           formData?.agreeToPrivacy;
  };

  const passwordStrength = formData?.password ? getPasswordStrength(formData?.password) : null;
  const passwordValidation = formData?.password ? validatePassword(formData?.password) : null;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              error={errors?.firstName}
              required
            />
            
            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={formData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              error={errors?.lastName}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Create Password
          </h3>

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData?.password && passwordStrength && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Password Strength:</span>
                <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                  {passwordStrength?.strength}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                  style={{ width: `${(Object.values(passwordValidation)?.filter(Boolean)?.length - 1) * 20}%` }}
                />
              </div>
              
              {/* Password Requirements */}
              <div className="text-xs space-y-1">
                <div className={`flex items-center space-x-2 ${passwordValidation?.minLength ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.minLength ? "Check" : "X"} size={12} />
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center space-x-2 ${passwordValidation?.hasUpperCase ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.hasUpperCase ? "Check" : "X"} size={12} />
                  <span>One uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-2 ${passwordValidation?.hasLowerCase ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.hasLowerCase ? "Check" : "X"} size={12} />
                  <span>One lowercase letter</span>
                </div>
                <div className={`flex items-center space-x-2 ${passwordValidation?.hasNumbers ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.hasNumbers ? "Check" : "X"} size={12} />
                  <span>One number</span>
                </div>
                <div className={`flex items-center space-x-2 ${passwordValidation?.hasSpecialChar ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.hasSpecialChar ? "Check" : "X"} size={12} />
                  <span>One special character</span>
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Account Type
          </h3>
          
          <Select
            label="I am a..."
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />
        </div>

        {/* Terms and Privacy */}
        <div className="space-y-4">
          <Checkbox
            label="I agree to the Terms of Service"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label="I agree to the Privacy Policy"
            checked={formData?.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
            error={errors?.agreeToPrivacy}
            required
          />
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          disabled={!isFormValid()}
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;