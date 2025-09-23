import { Box, Container, Typography, Button, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, AccountBalanceWallet, ShowChart, Newspaper, School, EmojiEvents, Security, Speed, Assessment } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleStartTrading = () => {
    if (isAuthenticated) {
      navigate('/dashboard/portfolio');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #00C853 0%, #1976d2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chip 
              label="BETA" 
              sx={{ 
                mb: 3, 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600
              }} 
            />
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Virtual Stock Trading Platform
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, opacity: 0.9 }}>
              Master the art of trading with our comprehensive virtual stock market simulator
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 6, maxWidth: 600, mx: 'auto', opacity: 0.8 }}>
              Practice trading with real market data, learn from expert tutorials, and compete with traders worldwide - all without financial risk
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleStartTrading}
                sx={{ 
                  backgroundColor: 'white', 
                  color: '#00C853',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  }
                }}
              >
                Start Trading Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/tutorials"
                sx={{ 
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Learn Trading
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Main Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Everything You Need to Master Trading
          </Typography>
          <Typography variant="subtitle1" textAlign="center" sx={{ mb: 6, color: 'text.secondary' }}>
            From beginner tutorials to advanced strategies, our platform provides comprehensive tools for trading success
          </Typography>
        </motion.div>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card elevation={3} sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' } }} component={Link} to="/dashboard/portfolio">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountBalanceWallet color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>Portfolio Management</Typography>
                </Box>
                <List>
                  <ListItem><ListItemText primary="Real-time portfolio tracking" /></ListItem>
                  <ListItem><ListItemText primary="Performance analytics & charts" /></ListItem>
                  <ListItem><ListItemText primary="Risk assessment tools" /></ListItem>
                  <ListItem><ListItemText primary="Diversification insights" /></ListItem>
                </List>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card elevation={3} sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' } }} component={Link} to="/dashboard/trading">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>Live Trading</Typography>
                </Box>
                <List>
                  <ListItem><ListItemText primary="Real-time market data" /></ListItem>
                  <ListItem><ListItemText primary="Advanced order types" /></ListItem>
                  <ListItem><ListItemText primary="Paper trading simulation" /></ListItem>
                  <ListItem><ListItemText primary="Trade history & analytics" /></ListItem>
                </List>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card elevation={3} sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' } }} component={Link} to="/dashboard/market">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShowChart color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>Market Analysis</Typography>
                </Box>
                <List>
                  <ListItem><ListItemText primary="Interactive charts & indicators" /></ListItem>
                  <ListItem><ListItemText primary="Technical analysis tools" /></ListItem>
                  <ListItem><ListItemText primary="Market screener" /></ListItem>
                  <ListItem><ListItemText primary="Watchlist management" /></ListItem>
                </List>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card elevation={3} sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' } }} component={Link} to="/tutorials">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <School color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>Learning Center</Typography>
                </Box>
                <List>
                  <ListItem><ListItemText primary="Beginner to advanced courses" /></ListItem>
                  <ListItem><ListItemText primary="Interactive tutorials" /></ListItem>
                  <ListItem><ListItemText primary="Trading strategies guide" /></ListItem>
                  <ListItem><ListItemText primary="Progress tracking" /></ListItem>
                </List>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card elevation={3} sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' } }} component={Link} to="/dashboard/competitions">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEvents color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>Trading Competitions</Typography>
                </Box>
                <List>
                  <ListItem><ListItemText primary="Weekly trading contests" /></ListItem>
                  <ListItem><ListItemText primary="Leaderboards & rankings" /></ListItem>
                  <ListItem><ListItemText primary="Prize pools & rewards" /></ListItem>
                  <ListItem><ListItemText primary="Community challenges" /></ListItem>
                </List>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card elevation={3} sx={{ p: 3, height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' } }} component={Link} to="/dashboard/news">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Newspaper color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>Market News</Typography>
                </Box>
                <List>
                  <ListItem><ListItemText primary="Real-time financial news" /></ListItem>
                  <ListItem><ListItemText primary="Market sentiment analysis" /></ListItem>
                  <ListItem><ListItemText primary="Economic calendar" /></ListItem>
                  <ListItem><ListItemText primary="Custom news feeds" /></ListItem>
                </List>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ 
        py: 8, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 100%)',
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Ready to Start Your Trading Journey?
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 6, color: 'text.secondary' }}>
              Join thousands of traders who are learning, practicing, and competing on our platform. 
              Start with virtual money and build your confidence before trading with real capital.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleStartTrading}
                sx={{ 
                  backgroundColor: '#00C853',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#00A041',
                  }
                }}
              >
                Start Trading Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/tutorials"
                sx={{ 
                  borderColor: '#00C853',
                  color: '#00C853',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#00A041',
                    backgroundColor: 'rgba(0, 200, 83, 0.04)',
                  }
                }}
              >
                Learn First
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;