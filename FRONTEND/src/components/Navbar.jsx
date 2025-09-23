import { AppBar, Toolbar, Typography, Button, Box, Container, Chip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, AccountBalanceWallet, ShowChart, Newspaper, School, EmojiEvents } from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const tradingNavItems = [
    { label: 'Portfolio', path: '/dashboard/portfolio', icon: <AccountBalanceWallet /> },
    { label: 'Trading', path: '/dashboard/trading', icon: <TrendingUp /> },
    { label: 'Market', path: '/dashboard/market', icon: <ShowChart /> },
    { label: 'News', path: '/dashboard/news', icon: <Newspaper /> },
    { label: 'Tutorials', path: '/tutorials', icon: <School /> },
    { label: 'Competitions', path: '/dashboard/competitions', icon: <EmojiEvents /> },
  ];

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: 'rgba(0, 200, 83, 0.95)',
      background: 'linear-gradient(135deg, #00C853 0%, #1976d2 100%)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <TrendingUp sx={{ mr: 1, fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              VirtualStock
            </Typography>
            <Chip 
              label="BETA" 
              size="small" 
              sx={{ 
                ml: 1, 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontSize: '0.7rem'
              }} 
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                {tradingNavItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                  }}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/features">
                  Features
                </Button>
                <Button color="inherit" component={Link} to="/tutorials">
                  Learn
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    ml: 1
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/login"
                  sx={{ 
                    backgroundColor: 'white', 
                    color: '#00C853',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                    ml: 1
                  }}
                >
                  Start Trading
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 