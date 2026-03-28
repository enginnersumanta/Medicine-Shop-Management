import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

export default function ProtectedRoute({ children, requiredPermission, requiredRole }) {
  const { user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && !requiredRole.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="card text-center max-w-md">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page. Required role: {requiredRole.join(' or ')}
          </p>
          <p className="text-sm text-gray-500">
            Your current role: <span className="font-semibold capitalize">{user.role}</span>
          </p>
        </div>
      </div>
    );
  }

  // Check specific permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="card text-center max-w-md">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
            <AlertTriangle className="text-orange-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Permission Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have the required permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            Required permission: <span className="font-semibold">{requiredPermission}</span>
          </p>
        </div>
      </div>
    );
  }

  return children;
}