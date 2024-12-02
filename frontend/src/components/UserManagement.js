import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then((res) => setUsers(res.data));
    axios.get('http://localhost:5000/api/roles').then((res) => setRoles(res.data));
  }, []);

  const handleAddUser = () => {
    axios.post('http://localhost:5000/api/users', newUser).then((res) => {
      setUsers([...users, res.data]);
      setNewUser({ name: '', email: '', role: '', status: 'Active' });
    });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.role?.name || 'No Role'} - {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
