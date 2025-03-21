import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ExecutiveOperations: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [executives, setExecutives] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/qualityExecutives`);
      setExecutives(response.data);
    } catch (error) {
      console.error('fetchExecutives', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/qualityExecutives`, { username, email, password });
      fetchExecutives();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/qualityExecutives/${id}`);
      fetchExecutives();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string, updatedExecutive: { username: string; email: string; password: string }) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/qualityExecutives/${id}`, updatedExecutive);
      fetchExecutives();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Add Executive
          </Typography>
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
            Add Executive
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
            {executives.map((executive: any) => (
              <TableRow key={executive._id}>
                <TableCell>{executive.username}</TableCell>
                <TableCell>{executive.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(executive._id)} color="secondary">
                    Delete
                  </Button>
                  <Button onClick={() => handleUpdate(executive._id, { username: executive.username, email: executive.email, password: '' })} color="primary">
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

export default ExecutiveOperations;