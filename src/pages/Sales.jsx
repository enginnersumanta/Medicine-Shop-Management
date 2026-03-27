import { useContext, useState } from 'react';
import { Plus, Eye, Download, Search, ShoppingCart, X } from 'lucide-react';
import { MedicineContext } from '../context/MedicineContext';
import BillingModal from '../components/BillingModal';

export default function Sales() {
  const { medicines, sales, addSale } = useContext(MedicineContext);
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = sales.filter(sale =>
    sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.invoiceNo.toString().includes(searchTerm)
  ).reverse();

  const handleCreateBill = (billData) => {
    addSale(billData);
    setIsBillingOpen(false);
    alert('✅ Bill created successfully!');
  };

  const handlePrint = (sale) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${sale.invoiceNo}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
            .header h2 { margin: 0; color: #2563eb; font-size: 28px; }
            .invoice-no { font-size: 14px; color: #666; margin: 10px 0; }
            .customer-info { margin-bottom: 20px; }
            table { width: 100%; margin: 20px 0; border-collapse: collapse; }
            th { background-color: #f3f4f6; border-bottom: 2px solid #2563eb; padding: 12px; text-align: left; font-weight: bold; color: #1f2937; }
            td { border-bottom: 1px solid #e5e7eb; padding: 12px; }
            .total-row { background-color: #eff6ff; font-weight: bold; font-size: 16px; }
            .total-amount { color: #2563eb; font-size: 20px; }
            .footer { text-align: center; margin-top: 40px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏥 MediShop Invoice</h2>
              <p class="invoice-no">Invoice #${sale.invoiceNo}</p>
              <p class="invoice-no">Date: ${new Date(sale.date).toLocaleDateString('en-IN')}</p>
            </div>
            
            <div class="customer-info">
              <p><strong>Customer:</strong> ${sale.customerName}</p>
            </div>
            
            <table>
              <tr>
                <th>Medicine</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Amount</th>
              </tr>
              ${sale.items.map(item => {
                const medicine = medicines.find(m => m.id === item.medicineId);
                return `
                  <tr>
                    <td>${medicine?.name || 'N/A'}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">₹${item.price.toFixed(2)}</td>
                    <td style="text-align: right;">₹${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                `;
              }).join('')}
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">Total Amount:</td>
                <td style="text-align: right;" class="total-amount">₹${sale.total.toFixed(2)}</td>
              </tr>
            </table>
            
            ${sale.notes ? `<p style="margin-top: 20px; padding: 10px; background-color: #f3f4f6; border-left: 4px solid #2563eb;"><strong>Notes:</strong> ${sale.notes}</p>` : ''}
            
            <div class="footer">
              <p>Thank you for your purchase! 🙏</p>
              <p>Visit us again for all your medicine needs</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageAmount = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <ShoppingCart size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">🛍️ Sales & Billing</h1>
        </div>
        <p className="text-green-100">Create invoices, manage sales, and track your revenue</p>
      </div>

      {/* Stats Cards */}
      <div className="px-4 md:px-8 py-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-2 border-gray-200">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-medium">Total Sales</p>
          <p className="text-3xl font-bold text-blue-600">{filteredSales.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 font-medium">Avg Sale Value</p>
          <p className="text-3xl font-bold text-purple-600">₹{averageAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-md p-4 md:p-6 border-b-2 border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 Search by customer name or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 w-full"
            />
          </div>

          {/* Create Bill Button */}
          <button
            onClick={() => setIsBillingOpen(true)}
            className="btn-success flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} /> Create Bill
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {filteredSales.length === 0 ? (
          <div className="card text-center py-12 bg-white">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600">No sales recorded yet</p>
            <p className="text-gray-500 mt-2">Create your first bill to get started</p>
            <button
              onClick={() => setIsBillingOpen(true)}
              className="btn-success mt-6 inline-flex items-center gap-2"
            >
              <Plus size={18} /> Create First Bill
            </button>
          </div>
        ) : (
          <div className="card bg-white overflow-hidden">
            <div className="p-4 md:p-6 border-b-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">💰 Sales History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-gray-300">
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Invoice #</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Customer</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Date & Time</th>
                    <th className="px-4 py-3 text-center font-bold text-gray-700">Items</th>
                    <th className="px-4 py-3 text-right font-bold text-gray-700">Total Amount</th>
                    <th className="px-4 py-3 text-center font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale) => (
                    <tr key={sale.invoiceNo} className="border-b border-gray-200 hover:bg-blue-50 transition">
                      <td className="px-4 py-3 font-bold text-blue-600">#{sale.invoiceNo}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{sale.customerName}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {new Date(sale.date).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="badge badge-info">{sale.items.length} items</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-green-600 text-right">
                        ₹{sale.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => setSelectedSale(sale)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition hover:scale-110"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handlePrint(sale)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition hover:scale-110"
                            title="Print Invoice"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedSale && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl">
            <div className="flex justify-between items-center mb-6 pb-6 border-b-2 border-green-100">
              <h2 className="text-2xl font-bold text-gray-800">🧾 Invoice #{selectedSale.invoiceNo}</h2>
              <button
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Customer Name</p>
                  <p className="text-lg font-bold text-gray-800">{selectedSale.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Date & Time</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(selectedSale.date).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                      <th className="px-4 py-2 text-left font-bold text-gray-700">Medicine</th>
                      <th className="px-4 py-2 text-center font-bold text-gray-700">Qty</th>
                      <th className="px-4 py-2 text-right font-bold text-gray-700">Price</th>
                      <th className="px-4 py-2 text-right font-bold text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.items.map((item, idx) => {
                      const medicine = medicines.find(m => m.id === item.medicineId);
                      return (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-800 font-medium">{medicine?.name || 'N/A'}</td>
                          <td className="px-4 py-2 text-center text-gray-600">{item.quantity}</td>
                          <td className="px-4 py-2 text-right text-gray-600">₹{item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right font-bold text-green-600">
                            ₹{(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {selectedSale.notes && (
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-gray-600 font-medium mb-1">Notes</p>
                  <p className="text-gray-800">{selectedSale.notes}</p>
                </div>
              )}

              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 rounded-lg text-white shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount:</span>
                  <span className="text-3xl font-bold">₹{selectedSale.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                <button
                  onClick={() => setSelectedSale(null)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handlePrint(selectedSale);
                  }}
                  className="btn-success flex-1 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Modal */}
      <BillingModal
        isOpen={isBillingOpen}
        medicines={medicines}
        onClose={() => setIsBillingOpen(false)}
        onSave={handleCreateBill}
      />
    </div>
  );
}
