import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [permissions, setPermissions] = useState(['Read', 'Write', 'Delete', 'Update']);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch existing roles from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/roles').then((res) => setRoles(res.data));
  }, []);

  // Handle permission toggle
  const togglePermission = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  };

  // Add a new role
  const handleAddRole = () => {
    const roleData = { ...newRole, permissions: selectedPermissions };
    axios.post('http://localhost:5000/api/roles', roleData).then((res) => {
      setRoles([...roles, res.data]);
      setNewRole({ name: '', permissions: [] });
      setSelectedPermissions([]);
    });
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <div className="permissions">
          {permissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission)}
                onChange={() => togglePermission(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
        <button onClick={handleAddRole}>Add Role</button>
      </div>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            <span>{role.name}</span>
            <span>{role.permissions.join(', ') || 'No Permissions'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
