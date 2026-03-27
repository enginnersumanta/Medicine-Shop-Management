import { X, Pill, PackageOpen, Building2, Package, DollarSign, Calendar, Package2 } from 'lucide-react';
import { useState } from 'react';

export default function MedicineModal({ isOpen, medicine, onClose, onSave }) {
  const [formData, setFormData] = useState(medicine || {
    name: '',
    category: '',
    manufacturer: '',
    stock: '',
    price: '',
    expiryDate: '',
    batchNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      category: '',
      manufacturer: '',
      stock: '',
      price: '',
      expiryDate: '',
      batchNo: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md">
        {/* Header with Gradient */}
        <div className="flex justify-between items-center mb-6 pb-6 border-b-2 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Pill size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {medicine?.id ? '✏️ Edit Medicine' : '➕ Add Medicine'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Medicine Name */}
          <div className="group">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <Pill size={16} className="text-blue-600 mr-2" />
              Medicine Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Aspirin 500mg"
              className="input-field"
              required
            />
          </div>

          {/* Category */}
          <div className="group">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <PackageOpen size={16} className="text-green-600 mr-2" />
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select category</option>
              <option value="Pain Relief">💊 Pain Relief</option>
              <option value="Fever">🌡️ Fever</option>
              <option value="Antibiotics">🔬 Antibiotics</option>
              <option value="Vitamins">🥗 Vitamins</option>
              <option value="Cough & Cold">🤧 Cough & Cold</option>
              <option value="Digestive">🍽️ Digestive</option>
              <option value="Skincare">🧴 Skincare</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          {/* Manufacturer */}
          <div className="group">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <Building2 size={16} className="text-purple-600 mr-2" />
              Manufacturer *
            </label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="e.g., HealthPlus"
              className="input-field"
              required
            />
          </div>

          {/* Stock & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <Package size={16} className="text-orange-600 mr-1" />
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="input-field"
                required
              />
            </div>
            <div className="group">
              <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <DollarSign size={16} className="text-green-600 mr-1" />
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div className="group">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <Calendar size={16} className="text-red-600 mr-2" />
              Expiry Date *
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          {/* Batch Number */}
          <div className="group">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <Package2 size={16} className="text-indigo-600 mr-2" />
              Batch Number *
            </label>
            <input
              type="text"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              placeholder="e.g., BTH001"
              className="input-field"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 mt-8 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              {medicine?.id ? '✓ Update' : '✓ Add'} Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
