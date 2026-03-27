import { useContext } from 'react';
import { BarChart3, Package, ShoppingCart, Pill, TrendingUp, AlertCircle } from 'lucide-react';
import { MedicineContext } from '../context/MedicineContext';
import StatCard from '../components/StatCard';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const { medicines, sales } = useContext(MedicineContext);

  // Calculate statistics
  const totalMedicines = medicines.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalSales = sales.length;
  
  // Stock statistics
  const lowStockCount = medicines.filter(m => m.stock < 20).length;
  const totalStock = medicines.reduce((sum, m) => sum + m.stock, 0);

  // Expired medicines
  const expiredCount = medicines.filter(m => new Date(m.expiryDate) < new Date()).length;

  // Recent sales
  const recentSales = sales.slice(-5).reverse();

  // Chart data - Category breakdown
  const categoryData = medicines.reduce((acc, med) => {
    const existing = acc.find(item => item.name === med.category);
    if (existing) {
      existing.count += 1;
      existing.stock += med.stock;
    } else {
      acc.push({
        name: med.category,
        count: 1,
        stock: med.stock
      });
    }
    return acc;
  }, []);

  // Chart data - Sales trend (last 10 sales)
  const salesTrendData = sales.slice(-10).map((sale, idx) => ({
    name: `Sale ${idx + 1}`,
    amount: sale.total,
    items: sale.items.length
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="flex-1 overflow-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to MediShop</h1>
        <p className="text-blue-100">📊 Dashboard Overview - Manage your medicine inventory with insights</p>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Medicines"
            value={totalMedicines}
            icon={Pill}
            color="blue"
            trend={5}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toFixed(2)}`}
            icon={TrendingUp}
            color="green"
            trend={12}
          />
          <StatCard
            title="Total Sales"
            value={totalSales}
            icon={ShoppingCart}
            color="purple"
            trend={8}
          />
          <StatCard
            title="Low Stock Alert"
            value={lowStockCount}
            icon={AlertCircle}
            color="orange"
            trend={-3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend Chart */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-800">📈 Sales Trend</h3>
            {salesTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db' }}
                    formatter={(value) => `₹${value.toFixed(2)}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    name="Sale Amount (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">No sales data available</p>
            )}
          </div>

          {/* Category Distribution Chart */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-gray-800">🏥 Category Distribution</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, count }) => `${name} (${count})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} items`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">No category data</p>
            )}
          </div>
        </div>

        {/* Stock Analysis & Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Stock Summary */}
          <div className="card hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-4 text-gray-800">📦 Stock Summary</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Total Units</p>
                <p className="text-2xl font-bold text-blue-600">{totalStock}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">In Stock</p>
                <p className="text-2xl font-bold text-green-600">{medicines.filter(m => m.stock > 0).length}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-600 text-sm">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="card hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-4 text-gray-800">💡 Key Metrics</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Average Sale Value</p>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Revenue per Medicine</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalMedicines > 0 ? (totalRevenue / totalMedicines).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="card hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-4 text-gray-800">🛒 Recent Sales</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {recentSales.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No sales yet</p>
              ) : (
                recentSales.map((sale) => (
                  <div key={sale.invoiceNo} className="bg-gradient-to-r from-blue-50 to-transparent p-3 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{sale.customerName}</p>
                        <p className="text-xs text-gray-500">Inv: #{sale.invoiceNo}</p>
                      </div>
                      <p className="font-bold text-blue-600">₹{sale.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🎯 System Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:shadow-md transition">
              <Pill className="mx-auto mb-2 text-blue-600" size={24} />
              <p className="text-2xl font-bold text-gray-800">{totalMedicines}</p>
              <p className="text-sm text-gray-600">Products</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg hover:shadow-md transition">
              <Package className="mx-auto mb-2 text-green-600" size={24} />
              <p className="text-2xl font-bold text-gray-800">{medicines.filter(m => m.stock > 0).length}</p>
              <p className="text-sm text-gray-600">In Stock</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg hover:shadow-md transition">
              <AlertCircle className="mx-auto mb-2 text-orange-600" size={24} />
              <p className="text-2xl font-bold text-gray-800">{lowStockCount}</p>
              <p className="text-sm text-gray-600">Low Stock</p>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg hover:shadow-md transition">
              <TrendingUp className="mx-auto mb-2 text-pink-600" size={24} />
              <p className="text-2xl font-bold text-gray-800">{expiredCount}</p>
              <p className="text-sm text-gray-600">Expired</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
