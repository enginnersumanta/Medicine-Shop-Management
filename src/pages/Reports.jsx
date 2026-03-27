import { useContext } from 'react';
import { BarChart3, AlertCircle, TrendingUp, Calendar, AlertTriangle, Package, ShoppingCart } from 'lucide-react';
import { MedicineContext } from '../context/MedicineContext';

export default function Reports() {
  const { medicines, sales } = useContext(MedicineContext);

  // Calculate various metrics
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalSales = sales.length;
  const avgSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Stock analysis
  const lowStockMedicines = medicines.filter(m => m.stock < 20);
  const expiredMedicines = medicines.filter(m => new Date(m.expiryDate) < new Date());
  const totalStockValue = medicines.reduce((sum, m) => sum + (m.stock * m.price), 0);

  // Category-wise analysis
  const categoryAnalysis = medicines.reduce((acc, med) => {
    const existing = acc.find(item => item.category === med.category);
    if (existing) {
      existing.count += 1;
      existing.totalStock += med.stock;
      existing.value += med.stock * med.price;
    } else {
      acc.push({
        category: med.category,
        count: 1,
        totalStock: med.stock,
        value: med.stock * med.price
      });
    }
    return acc;
  }, []);

  // Top selling medicines
  const topSelling = medicines
    .map(med => {
      const itemsSold = sales.reduce((sum, sale) => {
        const item = sale.items.find(i => i.medicineId === med.id);
        return sum + (item ? item.quantity : 0);
      }, 0);
      return {
        ...med,
        itemsSold,
        revenue: itemsSold * med.price
      };
    })
    .filter(m => m.itemsSold > 0)
    .sort((a, b) => b.itemsSold - a.itemsSold)
    .slice(0, 10);

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <BarChart3 size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">📊 Reports & Analytics</h1>
        </div>
        <p className="text-blue-100">Comprehensive business insights and performance metrics</p>
      </div>

      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-600" size={24} />
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
            </div>
            <p className="text-3xl font-bold text-green-700">₹{totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">From all sales</p>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="text-blue-600" size={24} />
              <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
            </div>
            <p className="text-3xl font-bold text-blue-700">{totalSales}</p>
            <p className="text-xs text-blue-600 mt-1">Invoices created</p>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-purple-600" size={24} />
              <p className="text-gray-600 text-sm font-medium">Average Sale</p>
            </div>
            <p className="text-3xl font-bold text-purple-700">₹{avgSaleValue.toFixed(2)}</p>
            <p className="text-xs text-purple-600 mt-1">Per transaction</p>
          </div>

          <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-600">
            <div className="flex items-center gap-3 mb-2">
              <Package className="text-orange-600" size={24} />
              <p className="text-gray-600 text-sm font-medium">Stock Value</p>
            </div>
            <p className="text-3xl font-bold text-orange-700">₹{totalStockValue.toFixed(2)}</p>
            <p className="text-xs text-orange-600 mt-1">Inventory worth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Alerts & Issues */}
          <div className="card bg-white">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={24} />
              Critical Alerts & Issues
            </h3>
            <div className="space-y-4">
              {/* Expired Items Alert */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-600 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-red-800 text-lg">❌ Expired Items</p>
                    <p className="text-sm text-red-700 mt-1">{expiredMedicines.length} {expiredMedicines.length === 1 ? 'medicine' : 'medicines'} have expired</p>
                  </div>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                    {expiredMedicines.length}
                  </span>
                </div>
              </div>
              
              {/* Low Stock Alert */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-orange-800 text-lg">⚠️ Low Stock Alert</p>
                    <p className="text-sm text-orange-700 mt-1">{lowStockMedicines.length} {lowStockMedicines.length === 1 ? 'medicine' : 'medicines'} below 20 units</p>
                  </div>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                    {lowStockMedicines.length}
                  </span>
                </div>
              </div>

              {/* Expired Medicines List */}
              {expiredMedicines.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-bold text-red-800 mb-3">📋 Expired Medicines List:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {expiredMedicines.slice(0, 5).map(med => (
                      <div key={med.id} className="flex justify-between items-center text-sm bg-white p-2 rounded border-l-4 border-red-400">
                        <span className="text-gray-800 font-medium">{med.name}</span>
                        <span className="text-red-700 font-bold text-xs">
                          {new Date(med.expiryDate).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    ))}
                    {expiredMedicines.length > 5 && (
                      <p className="text-xs text-red-600 font-semibold pt-2">+{expiredMedicines.length - 5} more expired items</p>
                    )}
                  </div>
                </div>
              )}

              {/* Low Stock Items List */}
              {lowStockMedicines.length > 0 && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-bold text-orange-800 mb-3">📦 Low Stock Items:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {lowStockMedicines.slice(0, 5).map(med => (
                      <div key={med.id} className="flex justify-between items-center text-sm bg-white p-2 rounded border-l-4 border-orange-400">
                        <span className="text-gray-800 font-medium">{med.name}</span>
                        <span className="text-orange-700 font-bold bg-orange-100 px-2 py-1 rounded">
                          {med.stock} units
                        </span>
                      </div>
                    ))}
                    {lowStockMedicines.length > 5 && (
                      <p className="text-xs text-orange-600 font-semibold pt-2">+{lowStockMedicines.length - 5} more low stock items</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Analysis */}
          <div className="card bg-white">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={24} />
              Category Analysis
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {categoryAnalysis.length === 0 ? (
                <p className="text-gray-500 text-center py-8">📊 No data available yet</p>
              ) : (
                categoryAnalysis.sort((a, b) => b.count - a.count).map((cat, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-800 text-lg">{cat.category}</p>
                      <span className="badge badge-info">{cat.count} items</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs font-medium">Stock</p>
                        <p className="font-bold text-blue-600">{cat.totalStock} units</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs font-medium">Value</p>
                        <p className="font-bold text-green-600">₹{cat.value.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Top Selling Medicines */}
        {topSelling.length > 0 && (
          <div className="card bg-white">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              🏆 Top 10 Selling Medicines
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-yellow-100 to-orange-100 border-b-2 border-yellow-400">
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Rank</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700">Medicine Name</th>
                    <th className="px-4 py-3 text-center font-bold text-gray-700">Units Sold</th>
                    <th className="px-4 py-3 text-right font-bold text-gray-700">Revenue</th>
                    <th className="px-4 py-3 text-right font-bold text-gray-700">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {topSelling.map((med, idx) => (
                    <tr key={med.id} className="border-b border-gray-200 hover:bg-blue-50 transition">
                      <td className="px-4 py-3 font-bold text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-bold text-sm">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{med.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="badge badge-success">{med.itemsSold} units</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-600">
                        ₹{med.revenue.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 font-medium">
                        ₹{med.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {topSelling.length === 0 && (
          <div className="card bg-white text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-600">No sales data available</p>
            <p className="text-gray-500 mt-2">Start creating bills to see top performers analytics</p>
          </div>
        )}
      </div>
    </div>
  );
}
