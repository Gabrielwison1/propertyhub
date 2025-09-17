import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PropertyForm = ({ 
  property = null, 
  onSave = () => {}, 
  onCancel = () => {},
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    propertyType: 'house',
    status: 'available',
    yearBuilt: '',
    lotSize: '',
    amenities: [],
    features: [],
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' }
  ];

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Balcony', 'Elevator',
    'Security System', 'Air Conditioning', 'Heating', 'Fireplace'
  ];

  const featuresList = [
    'Hardwood Floors', 'Updated Kitchen', 'Walk-in Closet', 'Master Suite',
    'Open Floor Plan', 'High Ceilings', 'Natural Light', 'Storage Space'
  ];

  useEffect(() => {
    if (property) {
      setFormData({
        title: property?.title || '',
        description: property?.description || '',
        price: property?.price || '',
        location: property?.location || '',
        bedrooms: property?.bedrooms || '',
        bathrooms: property?.bathrooms || '',
        squareFootage: property?.squareFootage || '',
        propertyType: property?.propertyType || 'house',
        status: property?.status || 'available',
        yearBuilt: property?.yearBuilt || '',
        lotSize: property?.lotSize || '',
        amenities: property?.amenities || [],
        features: property?.features || [],
        images: property?.images || []
      });
    }
  }, [property]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)?.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file?.name
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...newImages]
    }));
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = e?.dataTransfer?.files;
    handleImageUpload(files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter(img => img?.id !== imageId)
    }));
  };

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...formData?.images];
    const [movedImage] = newImages?.splice(fromIndex, 1);
    newImages?.splice(toIndex, 0, movedImage);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleAmenityChange = (amenity, checked) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev?.amenities, amenity]
        : prev?.amenities?.filter(a => a !== amenity)
    }));
  };

  const handleFeatureChange = (feature, checked) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev?.features, feature]
        : prev?.features?.filter(f => f !== feature)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) newErrors.title = 'Title is required';
    if (!formData?.description?.trim()) newErrors.description = 'Description is required';
    if (!formData?.price) newErrors.price = 'Price is required';
    if (!formData?.location?.trim()) newErrors.location = 'Location is required';
    if (!formData?.bedrooms) newErrors.bedrooms = 'Bedrooms is required';
    if (!formData?.bathrooms) newErrors.bathrooms = 'Bathrooms is required';
    if (!formData?.squareFootage) newErrors.squareFootage = 'Square footage is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (previewMode) {
    return (
      <div className="bg-background min-h-screen">
        <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-foreground">Property Preview</h2>
            <Button
              variant="outline"
              onClick={() => setPreviewMode(false)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {formData?.images?.length > 0 && (
                <div className="aspect-video bg-muted">
                  <Image
                    src={formData?.images?.[0]?.url}
                    alt={formData?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                      {formData?.title}
                    </h1>
                    <p className="text-muted-foreground flex items-center">
                      <Icon name="MapPin" size={16} className="mr-1" />
                      {formData?.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ${parseInt(formData?.price)?.toLocaleString()}
                    </p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      formData?.status === 'available' ? 'bg-success/10 text-success' :
                      formData?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {formData?.status?.charAt(0)?.toUpperCase() + formData?.status?.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Bed" size={20} className="mx-auto mb-1 text-primary" />
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold text-foreground">{formData?.bedrooms}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Bath" size={20} className="mx-auto mb-1 text-primary" />
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold text-foreground">{formData?.bathrooms}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Square" size={20} className="mx-auto mb-1 text-primary" />
                    <p className="text-sm text-muted-foreground">Sq Ft</p>
                    <p className="font-semibold text-foreground">{formData?.squareFootage}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Home" size={20} className="mx-auto mb-1 text-primary" />
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold text-foreground capitalize">{formData?.propertyType}</p>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{formData?.description}</p>
                </div>

                {formData?.amenities?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {formData?.amenities?.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span className="text-sm text-foreground">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Property Title"
            type="text"
            placeholder="Enter property title"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
          />

          <Select
            label="Property Type"
            options={propertyTypes}
            value={formData?.propertyType}
            onChange={(value) => handleInputChange('propertyType', value)}
          />

          <Input
            label="Price"
            type="number"
            placeholder="Enter price"
            value={formData?.price}
            onChange={(e) => handleInputChange('price', e?.target?.value)}
            error={errors?.price}
            required
          />

          <Select
            label="Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
          />

          <Input
            label="Location"
            type="text"
            placeholder="Enter property location"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            error={errors?.location}
            required
            className="lg:col-span-2"
          />
        </div>

        <div className="mt-4">
          <Input
            label="Description"
            type="textarea"
            placeholder="Enter detailed property description"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            error={errors?.description}
            required
            rows={4}
          />
        </div>
      </div>
      {/* Property Details */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Property Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Bedrooms"
            type="number"
            placeholder="0"
            value={formData?.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', e?.target?.value)}
            error={errors?.bedrooms}
            required
          />

          <Input
            label="Bathrooms"
            type="number"
            placeholder="0"
            value={formData?.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', e?.target?.value)}
            error={errors?.bathrooms}
            required
          />

          <Input
            label="Square Footage"
            type="number"
            placeholder="0"
            value={formData?.squareFootage}
            onChange={(e) => handleInputChange('squareFootage', e?.target?.value)}
            error={errors?.squareFootage}
            required
          />

          <Input
            label="Year Built"
            type="number"
            placeholder="YYYY"
            value={formData?.yearBuilt}
            onChange={(e) => handleInputChange('yearBuilt', e?.target?.value)}
          />

          <Input
            label="Lot Size (sq ft)"
            type="number"
            placeholder="0"
            value={formData?.lotSize}
            onChange={(e) => handleInputChange('lotSize', e?.target?.value)}
            className="md:col-span-2"
          />
        </div>
      </div>
      {/* Images */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Property Images</h3>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            isDragOver ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Icon name="Upload" size={32} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">Drag and drop images here, or</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Browse Files
          </Button>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e?.target?.files)}
          />
        </div>

        {formData?.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData?.images?.map((image, index) => (
              <div key={image?.id} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={image?.url}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center space-x-2">
                  {index > 0 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      onClick={() => moveImage(index, index - 1)}
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => removeImage(image?.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                  {index < formData?.images?.length - 1 && (
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      onClick={() => moveImage(index, index + 1)}
                    >
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Amenities */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Amenities</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {amenitiesList?.map((amenity) => (
            <Checkbox
              key={amenity}
              label={amenity}
              checked={formData?.amenities?.includes(amenity)}
              onChange={(e) => handleAmenityChange(amenity, e?.target?.checked)}
            />
          ))}
        </div>
      </div>
      {/* Features */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Features</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {featuresList?.map((feature) => (
            <Checkbox
              key={feature}
              label={feature}
              checked={formData?.features?.includes(feature)}
              onChange={(e) => handleFeatureChange(feature, e?.target?.checked)}
            />
          ))}
        </div>
      </div>
      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => setPreviewMode(true)}
          iconName="Eye"
          iconPosition="left"
          disabled={!formData?.title || !formData?.description}
        >
          Preview
        </Button>

        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            {property ? 'Update Property' : 'Create Property'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;