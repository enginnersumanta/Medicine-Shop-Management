import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import { Pill, Shield } from 'lucide-react';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Pill className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Medicine Shop</h1>
              <p className="text-gray-600">Management System</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-sm mx-auto">
            Secure access to your pharmacy management system with role-based permissions
          </p>
        </div>

        {/* Auth Forms */}
        <Login
          isOpen={showLogin}
          onClose={() => {}}
          onSwitchToRegister={() => setShowLogin(false)}
        />

        <Register
          isOpen={!showLogin}
          onClose={() => {}}
          onSwitchToLogin={() => setShowLogin(true)}
        />

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield size={16} />
            <span>Secure Authentication System</span>
          </div>
        </div>
      </div>
    </div>
  );
}