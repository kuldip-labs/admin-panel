import React from 'react';
import { useAuth } from '../context/AuthContext';
import Register from './Register';
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {user && <p>Role: {user.role}</p>}
      {user?.role === 'admin' && <Register />}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;