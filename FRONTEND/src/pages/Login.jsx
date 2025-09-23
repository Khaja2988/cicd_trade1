import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Link as MuiLink,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, AccountBalanceWallet } from '@mui/icons-material';
import { tradingAPI } from '../api/client';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [role, setRole] = useState('select'); // 'select', 'hr'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.username || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const { data } = await tradingAPI.login({
        username: formData.username,
        password: formData.password
      });

      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data?.error || 'Login failed');
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Invalid username or password');
    }
  };

  if (role === 'select') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #00C853 0%, #1976d2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            left: 24,
            maxWidth: 520,
            color: 'white',
            opacity: 0.9
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Why Virtual Trading?
          </Typography>
          <Typography variant="body2">
            Practice buying and selling stocks with real-time market data using virtual cash. Build confidence,
            test strategies, and learn risk management without any financial exposure. Compete on leaderboards
            and track your performance over time.
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card elevation={8} sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  VirtualStock
                </Typography>
              </Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
                Welcome Back, Trader!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Choose how you'd like to access your trading account
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AccountBalanceWallet />}
                  onClick={() => setRole('hr')}
                  sx={{ minWidth: 160, py: 1.5 }}
                >
                  Trader Login
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<TrendingUp />}
                  onClick={() => navigate('/tutorials')}
                  sx={{ minWidth: 160, py: 1.5 }}
                >
                  Learn Trading
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
    );
  }

  // Trader login form
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00C853 0%, #1976d2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card elevation={8} sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <TrendingUp sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  VirtualStock
                </Typography>
              </Box>
              <Typography variant="h5" component="h2" gutterBottom>
                Sign In to Your Trading Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access your portfolio, track performance, and start trading
              </Typography>
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  mb: 3,
                  py: 1.5,
                  fontWeight: 600,
                  backgroundColor: '#00C853',
                  '&:hover': {
                    backgroundColor: '#00A041',
                  }
                }}
              >
                Sign In to Trading Platform
              </Button>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Don't have a trading account?{' '}
                  <MuiLink component={Link} to="/register" variant="body2" sx={{ fontWeight: 600 }}>
                    Create Account
                  </MuiLink>
                </Typography>
                <Typography variant="body2">
                  <MuiLink component={Link} to="/tutorials" variant="body2">
                    Learn about trading first
                  </MuiLink>
                </Typography>
              </Box>
            </form>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
