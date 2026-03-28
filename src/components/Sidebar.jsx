import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Package, ShoppingCart, BarChart3, Users, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { user, logout, canAccessPage } = useAuth();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home, roles: ['admin', 'manager', 'staff'] },
    { path: '/inventory', label: 'Medicine Inventory', icon: Package, roles: ['admin', 'manager', 'staff'] },
    { path: '/sales', label: 'Sales/Billing', icon: ShoppingCart, roles: ['admin', 'manager', 'staff'] },
    { path: '/reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'manager'] },
    { path: '/users', label: 'User Management', icon: Users, roles: ['admin'] },
  ];

  // Filter menu items based on user role
  const accessibleMenuItems = menuItems.filter(item =>
    user && item.roles.includes(user.role)
  );

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

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

      {/* User Info */}
      {user && isOpen && (
        <div className="px-6 py-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-blue-300 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className="mt-8">
        {accessibleMenuItems.map(({ path, label, icon: Icon }) => (
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
