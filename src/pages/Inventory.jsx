import { useContext, useState } from 'react';
import { Plus, Search, Package, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { MedicineContext } from '../context/MedicineContext';
import MedicineTable from '../components/MedicineTable';
import MedicineModal from '../components/MedicineModal';

export default function Inventory() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useContext(MedicineContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced filter states
  const [stockStatus, setStockStatus] = useState('');
  const [expiryStatus, setExpiryStatus] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredMedicines = medicines.filter(medicine => {
    const nameMatch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = !filterCategory || medicine.category === filterCategory;
    const manufacturerMatch = !manufacturer || medicine.manufacturer === manufacturer;

    // Stock status filter
    let stockMatch = true;
    if (stockStatus) {
      if (stockStatus === 'low') stockMatch = medicine.stock < 20;
      else if (stockStatus === 'medium') stockMatch = medicine.stock >= 20 && medicine.stock < 50;
      else if (stockStatus === 'high') stockMatch = medicine.stock >= 50;
    }

    // Expiry status filter
    let expiryMatch = true;
    if (expiryStatus) {
      const today = new Date();
      const expiryDate = new Date(medicine.expiryDate);
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

      if (expiryStatus === 'expired') expiryMatch = expiryDate < today;
      else if (expiryStatus === 'expiring-soon') expiryMatch = daysUntilExpiry >= 0 && daysUntilExpiry <= 30;
      else if (expiryStatus === 'valid') expiryMatch = daysUntilExpiry > 30;
    }

    // Price range filter
    const priceMatch = (!minPrice || medicine.price >= parseFloat(minPrice)) &&
                      (!maxPrice || medicine.price <= parseFloat(maxPrice));

    return nameMatch && categoryMatch && manufacturerMatch && stockMatch && expiryMatch && priceMatch;
  });

  // Sort filtered medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'stock':
        aValue = a.stock;
        bValue = b.stock;
        break;
      case 'expiry':
        aValue = new Date(a.expiryDate);
        bValue = new Date(b.expiryDate);
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setStockStatus('');
    setExpiryStatus('');
    setManufacturer('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('name');
    setSortOrder('asc');
  };

  const categories = [...new Set(medicines.map(m => m.category))];
  const manufacturers = [...new Set(medicines.map(m => m.manufacturer))];
  const lowStockCount = medicines.filter(m => m.stock < 20).length;
  const expiredCount = medicines.filter(m => new Date(m.expiryDate) < new Date()).length;

  const handleAddClick = () => {
    setSelectedMedicine(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (selectedMedicine?.id) {
      updateMedicine(selectedMedicine.id, formData);
    } else {
      addMedicine(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(id);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - Gradient Background */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <Package size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">📦 Medicine Inventory</h1>
        </div>
        <p className="text-blue-100">Manage your medicine stock, track expiry dates, and monitor low stock items</p>
      </div>

      {/* Quick Stats */}
      <div className="px-4 md:px-8 py-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-2 border-gray-200">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-medium">Total Medicines</p>
          <p className="text-3xl font-bold text-blue-600">{medicines.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 font-medium">Low Stock Items</p>
          <p className="text-3xl font-bold text-orange-600">{lowStockCount}</p>
        </div>
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500">
          <p className="text-sm text-gray-600 font-medium">Expired Items</p>
          <p className="text-3xl font-bold text-red-600">{expiredCount}</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white shadow-md p-4 md:p-6 border-b-2 border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 Search medicines by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 w-full"
            />
          </div>

          {/* Filter by Category */}
          <div className="relative flex-1 md:flex-initial md:min-w-48">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field pl-12 w-full appearance-none cursor-pointer"
            >
              <option value="">📋 All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Filter size={18} />
            Advanced Filters
            {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Add Button */}
          <button
            onClick={handleAddClick}
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} /> Add Medicine
          </button>
        </div>

        {/* Advanced Filters Section */}
        {showAdvancedFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Stock Status Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">All Stock Levels</option>
                  <option value="low">🔴 Low Stock (&lt;20)</option>
                  <option value="medium">🟡 Medium Stock (20-50)</option>
                  <option value="high">🟢 High Stock (&gt;50)</option>
                </select>
              </div>

              {/* Expiry Status Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Status</label>
                <select
                  value={expiryStatus}
                  onChange={(e) => setExpiryStatus(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">All Expiry Status</option>
                  <option value="expired">🔴 Expired</option>
                  <option value="expiring-soon">🟡 Expiring Soon (&lt;30 days)</option>
                  <option value="valid">🟢 Valid (&gt;30 days)</option>
                </select>
              </div>

              {/* Manufacturer Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <select
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="">All Manufacturers</option>
                  {manufacturers.map(manuf => (
                    <option key={manuf} value={manuf}>{manuf}</option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                    <option value="expiry">Expiry Date</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="btn-secondary px-3"
                    title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="input-field w-full"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹)</label>
                <input
                  type="number"
                  placeholder="No limit"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input-field w-full"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end">
              <button
                onClick={clearAllFilters}
                className="btn-danger flex items-center gap-2"
              >
                <X size={16} /> Clear All Filters
              </button>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 mt-3">
          📊 Showing <span className="font-bold text-blue-600">{sortedMedicines.length}</span> medicine(s)
          {searchTerm && <span> matching "<span className="font-bold">{searchTerm}</span>"</span>}
          {filterCategory && <span> in category "<span className="font-bold">{filterCategory}</span>"</span>}
        </p>
      </div>

      {/* Table Section */}
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {sortedMedicines.length === 0 ? (
          <div className="card text-center py-12 bg-white">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600">No medicines found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleAddClick}
              className="btn-primary mt-6 inline-flex items-center gap-2"
            >
              <Plus size={18} /> Add First Medicine
            </button>
          </div>
        ) : (
          <div className="card bg-white overflow-hidden">
            <MedicineTable
              medicines={sortedMedicines}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <MedicineModal
        isOpen={isModalOpen}
        medicine={selectedMedicine}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
