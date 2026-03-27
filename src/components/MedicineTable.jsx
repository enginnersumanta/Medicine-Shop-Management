import { Trash2, Edit2 } from 'lucide-react';

export default function MedicineTable({ medicines, onEdit, onDelete }) {
  const getStockStatus = (stock) => {
    if (stock < 20) return { label: 'Low Stock', color: 'badge-danger' };
    if (stock < 50) return { label: 'Medium Stock', color: 'badge-warning' };
    return { label: 'In Stock', color: 'badge-success' };
  };

  const isExpired = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="card overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Medicine List</h3>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-700">Medicine Name</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Category</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Manufacturer</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Stock</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Price</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Expiry</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Batch</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                No medicines found
              </td>
            </tr>
          ) : (
            medicines.map((medicine) => {
              const { label, color } = getStockStatus(medicine.stock);
              const expired = isExpired(medicine.expiryDate);

              return (
                <tr key={medicine.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2 font-semibold text-gray-800">{medicine.name}</td>
                  <td className="px-4 py-2 text-gray-600">{medicine.category}</td>
                  <td className="px-4 py-2 text-gray-600">{medicine.manufacturer}</td>
                  <td className="px-4 py-2">
                    <span className={`badge ${color}`}>{medicine.stock} units</span>
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-800">₹{medicine.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={expired ? 'badge badge-danger' : 'text-gray-600'}>
                      {new Date(medicine.expiryDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{medicine.batchNo}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(medicine)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(medicine.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
