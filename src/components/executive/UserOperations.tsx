import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';

const UserOperations: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, { headers: { "Authorization": `Bearer ${accessToken}` } });
      setUsers(response.data);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError('Users not found.');
      } else {
        setError('An error occurred while fetching users.');
      }
      console.error('fetchUsers', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, { username, email, password }, { headers: { "Authorization": `Bearer ${accessToken}` } });
      fetchUsers();
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the user.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`, { headers: { "Authorization": `Bearer ${accessToken}` } });
      fetchUsers();
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while deleting the user.');
    }
  };

  const handleUpdate = async (id: string, updatedUser: { username: string; email: string; password: string }) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`, updatedUser, { headers: { "Authorization": `Bearer ${accessToken}` } });
      fetchUsers();
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while updating the user.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Add User
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
          />
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
            Add User
          </Button>
        </Box>
      </Paper>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(user._id)} color="secondary">
                    Delete
                  </Button>
                  <Button onClick={() => handleUpdate(user._id, { username: user.username, email: user.email, password: '' })} color="primary">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserOperations;