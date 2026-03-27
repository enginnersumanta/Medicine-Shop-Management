import { X, Plus, Trash2, ShoppingCart, User, FileText, ReceiptText, IndianRupee } from 'lucide-react';
import { useState } from 'react';

export default function BillingModal({ isOpen, medicines, onClose, onSave }) {
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  const addItem = () => {
    setItems([
      ...items,
      { medicineId: '', quantity: 1, price: 0 }
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === 'medicineId') {
      const medicine = medicines.find(m => m.id === parseInt(value));
      newItems[index].medicineId = parseInt(value);
      newItems[index].price = medicine?.price || 0;
    } else {
      newItems[index][field] = field === 'quantity' ? parseInt(value) || 0 : value;
    }
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Please add at least one item');
      return;
    }
    onSave({
      customerName: customerName || 'Walk-in Customer',
      items,
      total,
      notes,
    });
    setItems([]);
    setCustomerName('');
    setNotes('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Gradient */}
        <div className="flex justify-between items-center mb-6 pb-6 border-b-2 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <ShoppingCart size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">🧾 Create Invoice</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <User size={18} className="text-blue-600 mr-2" />
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Leave blank for walk-in customers"
              className="input-field"
            />
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <ShoppingCart size={18} className="text-green-600" />
                Bill Items
              </h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition transform hover:scale-105 shadow-md"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-base">
                🛒 No items added yet. Click "Add Item" to start billing.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-gray-300">
                      <th className="px-2 py-3 text-left font-bold text-gray-700 ">Medicine</th>
                      <th className="px-2 py-3 text-left font-bold text-gray-700 ">Qty</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Price</th>
                      <th className="px-4 py-3 text-right font-bold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition">
                        <td className="px-4 py-3">
                          <select
                            value={item.medicineId}
                            onChange={(e) => updateItem(index, 'medicineId', e.target.value)}
                            className="input-field text-sm"
                            required
                          >
                            <option value="">Select medicine</option>
                            {medicines.map(med => (
                              <option key={med.id} value={med.id}>
                                {med.name} (₹{med.price})
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                            className="input-field text-base font-semibold text-center w-full sm:w-20 md:w-24 lg:w-28 xl:w-32"
                            style={{ width: '100%' }}
                            required
                          />
                        </td>
                        <td className="px-4 py-3 font-bold text-blue-600">₹{item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-bold text-green-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition hover:scale-110"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <FileText size={18} className="text-purple-600 mr-2" />
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions or notes..."
              className="input-field resize-none"
              rows="3"
            />
          </div>

          {/* Total Section */}
          {items.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 rounded-lg border-2 border-emerald-300 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <IndianRupee size={24} />
                  <span className="text-xl font-bold">Total Amount:</span>
                </div>
                <span className="text-3xl font-bold">₹{total.toFixed(2)}</span>
              </div>
              <p className="text-emerald-50 text-sm mt-2">{items.length} item(s) in this bill</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-success flex-1 flex items-center justify-center gap-2"
            >
              <ReceiptText size={18} />
              Create Bill & Print
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
