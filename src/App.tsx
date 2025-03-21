import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import ExecutiveDashboard from './components/executive/ExecutiveDashboard';
import UserDashboard from './components/user/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (    
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/executiveDashboard" element={<ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>} />
          <Route path="/userDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requiredRoles={['admin']}><AdminDashboard/></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute requiredRoles={['user', 'admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
        </AuthProvider>
      </Router>    
  );
}

export default App;