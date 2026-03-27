import { useContext, useState } from 'react';
import { Plus, Search, Package, Filter } from 'lucide-react';
import { MedicineContext } from '../context/MedicineContext';
import MedicineTable from '../components/MedicineTable';
import MedicineModal from '../components/MedicineModal';

export default function Inventory() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useContext(MedicineContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredMedicines = medicines.filter(medicine => {
    const nameMatch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = !filterCategory || medicine.category === filterCategory;
    return nameMatch && categoryMatch;
  });

  const categories = [...new Set(medicines.map(m => m.category))];
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

          {/* Add Button */}
          <button
            onClick={handleAddClick}
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} /> Add Medicine
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          📊 Showing <span className="font-bold text-blue-600">{filteredMedicines.length}</span> medicine(s)
        </p>
      </div>

      {/* Table Section */}
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {filteredMedicines.length === 0 ? (
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
              medicines={filteredMedicines}
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
