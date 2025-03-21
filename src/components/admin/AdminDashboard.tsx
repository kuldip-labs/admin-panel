import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ExecutiveOperations from './ExecutiveOperations';
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      {user && <p>Role: {user.role}</p>}
      {user?.role === 'admin' && <ExecutiveOperations />}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;