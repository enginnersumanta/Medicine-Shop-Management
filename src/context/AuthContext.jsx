import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with demo users
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      name: 'System Administrator',
      email: 'admin@medicineshop.com'
    },
    {
      id: 2,
      username: 'manager',
      password: 'manager123',
      role: 'manager',
      name: 'Store Manager',
      email: 'manager@medicineshop.com'
    },
    {
      id: 3,
      username: 'staff',
      password: 'staff123',
      role: 'staff',
      name: 'Sales Staff',
      email: 'staff@medicineshop.com'
    }
  ]);

  // Check for stored user on app load
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('medicineshop_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch {
          localStorage.removeItem('medicineshop_user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password in state/localStorage
      setUser(userData);
      localStorage.setItem('medicineshop_user', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const register = async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if username already exists
    const existingUser = users.find(u => u.username === userData.username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      role: userData.role || 'staff' // Default role
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicineshop_user');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('medicineshop_user', JSON.stringify(updatedUser));
  };

  // Role-based permission checks
  const hasPermission = (permission) => {
    if (!user) return false;

    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'manage_users', 'view_reports', 'manage_inventory', 'process_sales'],
      manager: ['read', 'write', 'delete', 'view_reports', 'manage_inventory', 'process_sales'],
      staff: ['read', 'write', 'process_sales']
    };

    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const canAccessPage = (page) => {
    if (!user) return false;

    const pagePermissions = {
      dashboard: ['admin', 'manager', 'staff'],
      inventory: ['admin', 'manager', 'staff'],
      sales: ['admin', 'manager', 'staff'],
      reports: ['admin', 'manager'],
      users: ['admin']
    };

    return pagePermissions[page]?.includes(user.role) || false;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    hasPermission,
    canAccessPage,
    users: user?.role === 'admin' ? users : [] // Only admin can see all users
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};