import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RoleManagement from "./components/RoleManagement";
import UserManagement from "./components/UserManagement";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>RBAC Management</h1>
        </header>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/role-management">Role Management</Link>
            </li>
            <li>
              <Link to="/user-management">User Management</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/" element={<RoleManagement />} /> {/* Default Route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
