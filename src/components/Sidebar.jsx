import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Package, ShoppingCart, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/inventory', label: 'Medicine Inventory', icon: Package },
    { path: '/sales', label: 'Sales/Billing', icon: ShoppingCart },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-950 text-white transition-all duration-300 min-h-screen shadow-lg`}>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {isOpen && <h1 className="text-xl font-bold">MediShop</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-blue-800 rounded-lg transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-8">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-4 px-6 py-3 transition ${
              isActive(path)
                ? 'bg-blue-700 border-l-4 border-blue-300'
                : 'hover:bg-blue-800'
            }`}
            title={!isOpen ? label : ''}
          >
            <Icon size={20} />
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
