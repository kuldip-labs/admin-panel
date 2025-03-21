import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Register from './SignUp';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { email, password });
      const newAccessToken = response.headers.authorization.split(' ')[1];
      const newRefreshToken = response.data.refreshToken;
      localStorage.setItem('refreshToken', newRefreshToken);
      login(newAccessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom align="center">
                
        </Typography>
      
        <Typography variant="h6" component="h6" gutterBottom align="center">
          Don't have an user account?  Register here
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Register />
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;