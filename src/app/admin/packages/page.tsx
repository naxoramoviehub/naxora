'use client';

import { useState, useEffect } from 'react';
import { getPackages, createPackage, updatePackage, deletePackage, Package } from '@/lib/database';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Dialog from '@/components/ui/Dialog';
import { 
  Plus, Edit2, Trash2, Package as PackageIcon, 
  DollarSign, Users, Check, X, Settings
} from 'lucide-react';

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    price_numeric: 0,
    capacity: 'Max 1 Pax',
    duration: '2.5 Hours',
    extra_hour: '900 LKR',
    image: '',
    category: 'cinema',
    features: [] as string[],
    is_active: true
  });

  const [featureInput, setFeatureInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'confirm' | 'alert' | 'success';
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: ''
  });

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    const data = await getPackages();
    setPackages(data);
    setLoading(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      price: '',
      price_numeric: 0,
      capacity: 'Max 1 Pax',
      duration: '2.5 Hours',
      extra_hour: '900 LKR',
      image: '',
      category: 'cinema',
      features: [],
      is_active: true
    });
    setFeatureInput('');
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      price_numeric: pkg.price_numeric,
      capacity: pkg.capacity,
      duration: pkg.duration,
      extra_hour: pkg.extra_hour,
      image: pkg.image,
      category: pkg.category,
      features: pkg.features,
      is_active: pkg.is_active
    });
    setFeatureInput('');
  };

  const handleDelete = (id: string) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Package',
      message: 'Are you sure you want to delete this package? This action cannot be undone.',
      onConfirm: async () => {
        const success = await deletePackage(id);
        if (success) {
          setPackages(prev => prev.filter(p => p.id !== id));
        }
      },
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.image;
    
    // Handle image file upload
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      imageUrl = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });
    }
    
    const packageData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      price_numeric: parseInt(formData.price.replace(/[^\d]/g, '')) || 0,
      capacity: formData.capacity,
      duration: formData.duration,
      extra_hour: formData.extra_hour,
      image: imageUrl,
      category: formData.category,
      features: formData.features,
      is_active: formData.is_active
    };

    if (isCreating) {
      const created = await createPackage(packageData);
      if (created) {
        setPackages(prev => [...prev, created]);
      }
    } else if (editingPackage) {
      const updated = await updatePackage(editingPackage.id, packageData);
      if (updated) {
        setPackages(prev => prev.map(p => p.id === editingPackage.id ? updated : p));
      }
    }

    setIsCreating(false);
    setEditingPackage(null);
    setImageFile(null);
    setImagePreview('');
    setDialog({
      isOpen: true,
      type: 'success',
      title: 'Success',
      message: `Package ${isCreating ? 'created' : 'updated'} successfully!`,
      confirmText: 'OK'
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingPackage(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      price_numeric: 0,
      capacity: 'Max 1 Pax',
      duration: '2.5 Hours',
      extra_hour: '900 LKR',
      image: '',
      category: 'cinema',
      features: [],
      is_active: true
    });
    setFeatureInput('');
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handlePriceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      price: value,
      price_numeric: parseInt(value.replace(/[^\d]/g, '')) || 0
    }));
  };

  return (
    <AdminLayout 
      title="Packages Management" 
      subtitle="Add, edit, and manage service packages"
    >
      {/* Header Actions */}
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="primary"
          onClick={handleCreate}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Package
        </Button>
        <Button
          variant="secondary"
          onClick={loadPackages}
          className="flex items-center gap-2"
        >
          Refresh Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Packages</span>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <PackageIcon className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{packages.length}</h2>
          <p className="font-body text-xs text-on-surface-variant">Available packages</p>
        </Card>

        <Card glowColor="cyan" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Active Packages</span>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <Check className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-emerald-500 mb-1">{packages.filter(p => p.is_active).length}</h2>
          <p className="font-body text-xs text-on-surface-variant">Currently available</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Avg Price</span>
            <div className="w-8 h-8 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-white mb-1">
            {packages.length > 0 
              ? Math.round(packages.reduce((sum, p) => sum + p.price_numeric, 0) / packages.length).toLocaleString() 
              : 0} LKR
          </h2>
          <p className="font-body text-xs text-on-surface-variant">Average package price</p>
        </Card>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingPackage) && (
        <Card className="p-6 mb-8 border border-glass-stroke">
          <h3 className="font-sans text-xl font-bold text-white mb-6 uppercase tracking-wider">
            {isCreating ? 'Create New Package' : 'Edit Package'}
          </h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Package Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:border-primary/50"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Premium Gaming Suite"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Price</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white font-mono focus:outline-none focus:border-primary/50"
                  value={formData.price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="e.g., 5000 LKR"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Description</label>
              <textarea
                className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:border-primary/50 h-24 resize-none"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the package experience..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Capacity</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white font-mono focus:outline-none focus:border-primary/50"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  placeholder="e.g., Max 3 Pax"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Duration</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white font-mono focus:outline-none focus:border-primary/50"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 2.5 Hours"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Extra Hour Price</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white font-mono focus:outline-none focus:border-primary/50"
                  value={formData.extra_hour}
                  onChange={(e) => setFormData(prev => ({ ...prev, extra_hour: e.target.value }))}
                  placeholder="e.g., 900 LKR"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Category</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:border-primary/50"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="cinema">Cinema</option>
                  <option value="gaming">Gaming</option>
                  <option value="celebration">Celebration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Package Image</label>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:border-primary/50"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                  >
                    Clear
                  </Button>
                </div>
                {(imagePreview || formData.image) && (
                  <div className="relative w-full h-48 bg-surface-container/30 rounded-lg overflow-hidden border border-glass-stroke">
                    <img
                      src={imagePreview || formData.image}
                      alt="Package preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white font-mono focus:outline-none focus:border-primary/50"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Or enter image URL..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-5 h-5 rounded border-glass-stroke"
              />
              <label htmlFor="isActive" className="text-sm text-white font-medium">Active Package</label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Features</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:border-primary/50"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Add a feature..."
                />
                <Button type="button" variant="secondary" onClick={addFeature}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="primary"
                    className="flex items-center gap-2 !bg-primary/20 !text-primary !border-primary/30"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-glass-stroke pt-6">
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {isCreating ? 'Create Package' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Packages Grid */}
      {loading ? (
        <div className="py-20 text-center text-on-surface-variant">
          Loading packages...
        </div>
      ) : packages.length === 0 ? (
        <Card className="p-12 text-center border border-glass-stroke">
          <PackageIcon className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
          <h3 className="font-sans text-xl font-bold text-white mb-2">No Packages Found</h3>
          <p className="text-on-surface-variant mb-6">Get started by creating your first package</p>
          <Button variant="primary" onClick={handleCreate} className="flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" />
            Create Package
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              glowColor={pkg.is_active ? 'purple' : 'none'}
              className={`p-6 border ${!pkg.is_active ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-sans text-lg font-bold text-white mb-1">{pkg.title}</h3>
                  <p className="font-mono text-2xl font-extrabold text-primary">{pkg.price}</p>
                </div>
                <Badge
                  variant={pkg.is_active ? 'primary' : 'default'}
                  className={
                    pkg.is_active 
                      ? '!bg-emerald-500/10 !text-emerald-500 !border-emerald-500/20' 
                      : '!bg-red-500/10 !text-red-500 !border-red-500/20'
                  }
                >
                  {pkg.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{pkg.description}</p>

              <div className="flex items-center gap-2 mb-4 text-sm text-on-surface-variant">
                <Users className="w-4 h-4" />
                <span>Capacity: {pkg.capacity}</span>
              </div>

              <div className="mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Features</div>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-surface-container/30 rounded text-on-surface-variant"
                    >
                      {feature}
                    </span>
                  ))}
                  {pkg.features.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-surface-container/30 rounded text-on-surface-variant">
                      +{pkg.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-glass-stroke">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(pkg.id)}
                  className="!text-red-400 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog
        isOpen={dialog.isOpen}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        onConfirm={() => {
          dialog.onConfirm?.();
          setDialog({ ...dialog, isOpen: false });
        }}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
      />
    </AdminLayout>
  );
}
