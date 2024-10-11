import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 
import './AdminDashboard.css';

function AdminPanel() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLogoutClick = () => {
    logout(); 
    navigate('/login'); 
  };

  const handleEmployeeDashboardClick = () => {
    navigate('/employee-dashboard');
  };

  return (
    <div className="admin-panel">
      <header>
        <div className="logo">Logo</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>
              <button onClick={handleEmployeeDashboardClick}>Employeedashboard</button>
            </li>
            <li><span>{user?.name || "Admin"}</span></li> {/* Display admin name */}
            <li><button onClick={handleLogoutClick}>Logout</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="dashboard">Dashboard</div>
        <h1>Welcome to the Admin Panel</h1>
      </main>
      
    </div>
  );
}

export default AdminPanel;
