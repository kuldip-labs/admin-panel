import React from 'react';
import { useAuth } from '../../context/AuthContext';
import UserOperations from './UserOperations';
const ExecutiveDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to Executive Dashboard</h1>
      {user && <p>Role: {user.role}</p>}
      {user?.role === 'executive' && <UserOperations />}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ExecutiveDashboard;