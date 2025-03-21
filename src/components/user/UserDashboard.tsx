import React from 'react';
import { useAuth } from '../../context/AuthContext';
const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to User Dashboard</h1>
      {user && <p>Role: {user.role}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;