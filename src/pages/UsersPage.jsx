import { useAuth } from '../context/AuthContext';
import { Users, UserPlus, Edit2, Trash2, Shield, AlertTriangle } from 'lucide-react';

export default function UsersPage() {
  const { users, user: currentUser, hasPermission } = useAuth();

  // Check if current user can manage users
  if (!hasPermission('manage_users')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="card text-center max-w-md">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to manage users.
          </p>
        </div>
      </div>
    );
  }

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'badge-danger',
      manager: 'badge-warning',
      staff: 'badge-success'
    };
    return badges[role] || 'badge-info';
  };

  const handleDeleteUser = (userId) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, this would call an API
      console.log('Delete user:', userId);
    }
  };

  const handleEditUser = (selectedUser) => {
    alert(`Edit user functionality for ${selectedUser.name} - Coming soon!`);
  };

  const handleAddUser = () => {
    alert('Add user functionality - Coming soon!');
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <Users size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">👥 User Management</h1>
        </div>
        <p className="text-blue-100">Manage system users and their roles</p>
      </div>

      {/* Stats */}
      <div className="px-4 md:px-8 py-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-4 gap-4 border-b-2 border-gray-200">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-medium">Total Users</p>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500">
          <p className="text-sm text-gray-600 font-medium">Administrators</p>
          <p className="text-3xl font-bold text-red-600">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 font-medium">Managers</p>
          <p className="text-3xl font-bold text-orange-600">
            {users.filter(u => u.role === 'manager').length}
          </p>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-medium">Staff</p>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(u => u.role === 'staff').length}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white shadow-md p-4 md:p-6 border-b-2 border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">System Users</h2>
            <p className="text-gray-600 text-sm">Manage user accounts and permissions</p>
          </div>
          <button
            onClick={handleAddUser}
            className="btn-primary flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="card bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">User</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${getRoleBadge(user.role)} capitalize`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="badge badge-success">Active</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                            title="Edit User"
                          >
                            <Edit2 size={16} />
                          </button>
                          {user.id !== currentUser.id && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Permissions Info */}
      <div className="p-4 md:p-8 bg-gray-50 border-t">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Role Permissions</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Admin:</strong> Full system access, user management, all operations</p>
                <p><strong>Manager:</strong> Inventory management, sales, reports (no user management)</p>
                <p><strong>Staff:</strong> Basic sales operations and inventory viewing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}