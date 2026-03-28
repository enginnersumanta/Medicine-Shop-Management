import { Bell, User, Settings, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const notifications = [
    { id: 1, message: '⚠️ Low stock: Aspirin', time: '5 mins ago', type: 'warning' },
    { id: 2, message: '✅ New sale: Invoice #1005', time: '10 mins ago', type: 'success' },
    { id: 3, message: '❌ Medicine expired: Paracetamol', time: '1 hour ago', type: 'danger' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-blue-800 shadow-lg px-4 md:px-20 py-4 flex justify-between items-center relative">
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-white">🏥 MediShop</h2>
        <p className="text-xs md:text-sm text-blue-100 hidden md:block">Professional Inventory Management</p>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSettings(false);
              setShowProfile(false);
            }}
            className="relative p-2 text-white hover:bg-blue-500 rounded-lg transition duration-200 hover:scale-110"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 bg-white border-2 border-blue-200 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
                <h3 className="font-bold text-gray-800">🔔 Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition">
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notif.type === 'warning' ? 'bg-yellow-500' :
                        notif.type === 'success' ? 'bg-green-500' :
                        'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 bg-gray-50 text-center hover:bg-gray-100 transition">
                <button 
                  onClick={() => {
                    alert('View All Notifications - Complete notification history');
                    setShowNotifications(false);
                  }}
                  className="text-sm text-blue-600 font-bold hover:text-blue-700 cursor-pointer transition active:scale-95"
                >
                  View All →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSettings(!showSettings);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="p-2 text-white hover:bg-blue-500 rounded-lg transition duration-200 hover:scale-110"
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {showSettings && (
            <div className="absolute right-0 top-14 w-64 bg-white border-2 border-blue-200 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
                <h3 className="font-bold text-gray-800">⚙️ Settings</h3>
              </div>
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => {
                    alert('Display Settings - Theme customization, brightness, and layout options');
                    setShowSettings(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-100 rounded text-gray-800 text-sm font-medium transition active:scale-95 cursor-pointer hover:shadow-md"
                >
                  🎨 Display Settings
                </button>
                <button 
                  onClick={() => {
                    alert('Notification Preferences - Control how and when you receive notifications');
                    setShowSettings(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-100 rounded text-gray-800 text-sm font-medium transition active:scale-95 cursor-pointer hover:shadow-md"
                >
                  🔔 Notification Preferences
                </button>
                <button 
                  onClick={() => {
                    alert('System Settings - Advanced system configuration and preferences');
                    setShowSettings(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-100 rounded text-gray-800 text-sm font-medium transition active:scale-95 cursor-pointer hover:shadow-md"
                >
                  ⚙️ System Settings
                </button>
                <button 
                  onClick={() => {
                    alert('Backup & Restore - Create backups and restore from previous versions');
                    setShowSettings(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-100 rounded text-gray-800 text-sm font-medium transition active:scale-95 cursor-pointer hover:shadow-md"
                >
                  💾 Backup & Restore
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile / User */}
        <div className="relative flex items-center gap-3 pl-6 border-l-2 border-blue-400">
          <div className="cursor-pointer" onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
            setShowSettings(false);
          }}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition transform hover:scale-110 border-2 border-white">
              {user?.name?.charAt(0).toUpperCase() || '👤'}
            </div>
          </div>
          <div className="cursor-pointer hidden lg:block" onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
            setShowSettings(false);
          }}>
            <p className="text-sm font-bold text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-blue-100 capitalize">{user?.role || 'Role'}</p>
          </div>

          {showProfile && (
            <div className="absolute right-0 top-14 w-56 bg-white border-2 border-blue-200 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
                <p className="font-bold text-gray-800">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@medicineshop.com'}</p>
              </div>
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    alert('Profile - View and edit your profile information');
                    setShowProfile(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-100 rounded text-gray-800 text-sm flex items-center gap-2 font-medium transition cursor-pointer active:scale-95 hover:shadow-md"
                >
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={() => {
                    alert('Account Settings - Manage your account preferences, email, and security');
                    setShowProfile(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-100 rounded text-gray-800 text-sm flex items-center gap-2 font-medium transition cursor-pointer active:scale-95 hover:shadow-md"
                >
                  <Settings size={16} /> Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-100 rounded text-red-600 text-sm flex items-center gap-2 font-medium transition cursor-pointer active:scale-95 hover:shadow-md border-t border-gray-200"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => {
          setShowMobileMenu(!showMobileMenu);
          setShowNotifications(false);
          setShowSettings(false);
          setShowProfile(false);
        }}
        className="md:hidden p-2 text-white hover:bg-blue-500 rounded-lg transition active:scale-95"
        title="Toggle Menu"
      >
        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 right-0 left-0 bg-white shadow-lg rounded-b-lg md:hidden z-50">
          <div className="p-4 space-y-2">
            <button 
              onClick={() => {
                alert('Notifications - View your alerts and activity');
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-blue-100 rounded transition cursor-pointer active:scale-95 font-medium"
            >
              <Bell size={18} /> Notifications
            </button>
            <button 
              onClick={() => {
                alert('Settings - Display, Notifications, System, and Backup options');
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-blue-100 rounded transition cursor-pointer active:scale-95 font-medium"
            >
              <Settings size={18} /> Settings
            </button>
            <button 
              onClick={() => {
                alert('Profile - View and manage your account');
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-blue-100 rounded transition cursor-pointer active:scale-95 font-medium border-t border-gray-200 pt-3"
            >
              <User size={18} /> Profile
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-100 rounded transition cursor-pointer active:scale-95 font-medium border-t border-gray-200 pt-3"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
