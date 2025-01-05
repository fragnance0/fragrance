import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, getDatabase, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Box,
  Alert,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Fetch user role from Firestore
        const dbRef = ref(getDatabase());
        const userRef = child(dbRef, `users/${user.uid}`);
        const userSnap = await get(child(userRef, 'role'));
        const userData = userSnap.val();
        console.log(userData, 'data');
        if (userData === 'admin') {
          localStorage.setItem('role', 'admin'); // Store role in local storage
          navigate('/admin');
        } else {
          localStorage.setItem('role', 'user');
          navigate('/'); // Redirect to public home page
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: 40 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <Alert style={{ marginTop: 20 }} severity="error">{error}</Alert>}

        <Box mt={2}>
          <Typography variant="body2" align="center">
            Don't have an account? <a href="/register">Sign Up</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
