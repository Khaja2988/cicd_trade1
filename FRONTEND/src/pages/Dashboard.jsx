import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  ShowChart,
  Newspaper,
  EmojiEvents,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  TrendingDown,
  AttachMoney,
  Assessment
} from '@mui/icons-material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  const menuItems = [
    { text: 'Portfolio', icon: <AccountBalanceWallet />, path: '/dashboard/portfolio' },
    { text: 'Trading', icon: <TrendingUp />, path: '/dashboard/trading' },
    { text: 'Market', icon: <ShowChart />, path: '/dashboard/market' },
    { text: 'News', icon: <Newspaper />, path: '/dashboard/news' },
    { text: 'Competitions', icon: <EmojiEvents />, path: '/dashboard/competitions' },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
          VirtualStock
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        <Container maxWidth="lg">
          {location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? (
            <Grid container spacing={3}>
              {/* Portfolio Overview */}
              <Grid item xs={12}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
                  Trading Dashboard
                </Typography>
              </Grid>

              {/* Quick Stats */}
              <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Portfolio Value</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      $11,250.00
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp color="success" sx={{ mr: 0.5 }} />
                      <Typography color="success.main" sx={{ fontWeight: 600 }}>
                        +12.5% (+$1,250)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AttachMoney color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Cash Available</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      $2,500.00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ready to invest
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUp color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Today's P&L</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
                      +$125.50
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +1.13% from yesterday
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Assessment color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Active Positions</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      4
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stocks in portfolio
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Portfolio Performance Chart */}
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Portfolio Performance (30 Days)</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { day: '1', value: 10000 },
                        { day: '5', value: 10250 },
                        { day: '10', value: 9800 },
                        { day: '15', value: 10500 },
                        { day: '20', value: 10800 },
                        { day: '25', value: 11250 },
                        { day: '30', value: 11250 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                        <RechartsTooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
                        <Line type="monotone" dataKey="value" stroke="#00C853" strokeWidth={3} dot={{ fill: '#00C853', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Top Holdings */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Top Holdings</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="AAPL"
                          secondary="Apple Inc."
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            $1,755.00
                          </Typography>
                          <Chip label="+17.0%" color="success" size="small" />
                        </Box>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="GOOGL"
                          secondary="Alphabet Inc."
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            $14,750.00
                          </Typography>
                          <Chip label="+5.4%" color="success" size="small" />
                        </Box>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="MSFT"
                          secondary="Microsoft Corp."
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            $2,560.00
                          </Typography>
                          <Chip label="+6.7%" color="success" size="small" />
                        </Box>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="TSLA"
                          secondary="Tesla Inc."
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            $540.00
                          </Typography>
                          <Chip label="-10.0%" color="error" size="small" />
                        </Box>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Trades */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Recent Trades</Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUp color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bought 5 shares of AAPL @ $175.50"
                          secondary="2 hours ago"
                        />
                        <Typography variant="body2" color="text.secondary">
                          +$877.50
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingDown color="error" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Sold 3 shares of MSFT @ $320.00"
                          secondary="4 hours ago"
                        />
                        <Typography variant="body2" color="text.secondary">
                          +$960.00
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUp color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Bought 2 shares of GOOGL @ $2,950.00"
                          secondary="Yesterday"
                        />
                        <Typography variant="body2" color="text.secondary">
                          +$5,900.00
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Outlet />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 