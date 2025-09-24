import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Button,
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Refresh,
  EmojiEvents,
  TrendingUp,
  People,
  Schedule,
  PlayArrow,
  Add,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Competitions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newCompetition, setNewCompetition] = useState({
    name: '',
    description: '',
    duration: '1W',
    maxParticipants: 100,
    startingBalance: 10000
  });

  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      name: 'March Madness Trading Challenge',
      description: 'Compete with traders worldwide in this month-long trading competition. Highest returns win!',
      status: 'active',
      participants: 1247,
      maxParticipants: 2000,
      duration: '1M',
      timeRemaining: '15 days',
      startingBalance: 10000,
      entryFee: 0,
      prize: 'Top 10 winners share ₹5,00,000 prize pool',
      leaderboard: [
        { rank: 1, username: 'TradingPro2024', portfolioValue: 15680, return: 56.8, avatar: '/api/placeholder/40/40' },
        { rank: 2, username: 'StockMaster', portfolioValue: 14230, return: 42.3, avatar: '/api/placeholder/40/40' },
        { rank: 3, username: 'MarketWizard', portfolioValue: 13890, return: 38.9, avatar: '/api/placeholder/40/40' },
        { rank: 4, username: 'BullTrader', portfolioValue: 13250, return: 32.5, avatar: '/api/placeholder/40/40' },
        { rank: 5, username: 'ValueHunter', portfolioValue: 12890, return: 28.9, avatar: '/api/placeholder/40/40' }
      ],
      myRank: 47,
      myPortfolioValue: 11250,
      myReturn: 12.5
    },
    {
      id: 2,
      name: 'Weekly Options Challenge',
      description: 'Test your options trading skills in this high-stakes weekly competition.',
      status: 'upcoming',
      participants: 0,
      maxParticipants: 500,
      duration: '1W',
      timeRemaining: 'Starts in 2 days',
      startingBalance: 50000,
      entryFee: 10,
      prize: 'Winner takes all: ₹2,50,000',
      leaderboard: [],
      myRank: null,
      myPortfolioValue: null,
      myReturn: null
    },
    {
      id: 3,
      name: 'Beginner Friendly Contest',
      description: 'Perfect for new traders! Learn the ropes in this educational competition.',
      status: 'completed',
      participants: 856,
      maxParticipants: 1000,
      duration: '2W',
      timeRemaining: 'Ended',
      startingBalance: 5000,
      entryFee: 0,
      prize: 'Top 20 winners share ₹1,00,000 prize pool',
      leaderboard: [
        { rank: 1, username: 'NewTrader99', portfolioValue: 8750, return: 75.0, avatar: '/api/placeholder/40/40' },
        { rank: 2, username: 'LearningFast', portfolioValue: 8200, return: 64.0, avatar: '/api/placeholder/40/40' },
        { rank: 3, username: 'FirstTimer', portfolioValue: 7950, return: 59.0, avatar: '/api/placeholder/40/40' }
      ],
      myRank: 12,
      myPortfolioValue: 6750,
      myReturn: 35.0
    }
  ]);

  const statuses = ['all', 'active', 'upcoming', 'completed'];

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || competition.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <PlayArrow />;
      case 'upcoming': return <Schedule />;
      case 'completed': return <EmojiEvents />;
      default: return null;
    }
  };

  const handleJoinCompetition = (competitionId) => {
    // In a real app, this would handle joining the competition
    console.log(`Joining competition ${competitionId}`);
  };

  const handleCreateCompetition = () => {
    // In a real app, this would create a new competition
    console.log('Creating competition:', newCompetition);
    setOpenCreateDialog(false);
    setNewCompetition({
      name: '',
      description: '',
      duration: '1W',
      maxParticipants: 100,
      startingBalance: 10000
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`;
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header Module */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Trading Competitions
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Competition
        </Button>
      </Box>

      {/* Search and Filter Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Search and Filter
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search competitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {statuses.map((status) => (
                  <Chip
                    key={status}
                    label={status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    onClick={() => setSelectedStatus(status)}
                    color={selectedStatus === status ? 'primary' : 'default'}
                    variant={selectedStatus === status ? 'filled' : 'outlined'}
                    sx={{ 
                      fontWeight: 500,
                      '&:hover': { 
                        bgcolor: selectedStatus === status ? 'primary.dark' : 'action.hover' 
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Competitions List Module */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
            Available Competitions ({filteredCompetitions.length})
          </Typography>
          
          {filteredCompetitions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No competitions found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or status filter
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredCompetitions.map((competition) => (
                <Grid item xs={12} key={competition.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paper sx={{ p: 3, mb: 2, border: 1, borderColor: 'divider' }}>
                      <Grid container spacing={3}>
                        {/* Competition Info */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip
                              icon={getStatusIcon(competition.status)}
                              label={competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                              color={getStatusColor(competition.status)}
                              sx={{ mr: 2, fontWeight: 600 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {competition.name}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {competition.description}
                          </Typography>
                          
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <People sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {competition.participants}/{competition.maxParticipants} participants
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Schedule sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {competition.timeRemaining}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Starting Balance: {formatCurrency(competition.startingBalance)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Entry Fee: {competition.entryFee === 0 ? 'Free' : formatCurrency(competition.entryFee)}
                              </Typography>
                            </Grid>
                          </Grid>
                          
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                            {competition.prize}
                          </Typography>
                          
                          {competition.status === 'active' && (
                            <Button
                              variant="contained"
                              onClick={() => handleJoinCompetition(competition.id)}
                              disabled={competition.participants >= competition.maxParticipants}
                              sx={{ 
                                fontWeight: 600,
                                '&:hover': { bgcolor: 'primary.dark' }
                              }}
                            >
                              {competition.participants >= competition.maxParticipants ? 'Full' : 'Join Competition'}
                            </Button>
                          )}
                        </Grid>
                        
                        {/* Leaderboard */}
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Leaderboard
                          </Typography>
                          
                          {competition.leaderboard.length > 0 ? (
                            <TableContainer component={Paper} variant="outlined">
                              <Table size="small">
                                <TableHead>
                                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Trader</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600 }}>Portfolio</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600 }}>Return</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {competition.leaderboard.slice(0, 5).map((trader) => (
                                    <TableRow key={trader.rank} hover>
                                      <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          {trader.rank <= 3 && <EmojiEvents color="warning" sx={{ mr: 1 }} />}
                                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {trader.rank}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {trader.username}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell align="right">
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                          {formatCurrency(trader.portfolioValue)}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="right">
                                        <Chip
                                          label={formatPercent(trader.return)}
                                          color={trader.return >= 0 ? 'success' : 'error'}
                                          size="small"
                                          sx={{ 
                                            bgcolor: trader.return >= 0 ? 'success.light' : 'error.light',
                                            color: 'white',
                                            fontWeight: 600
                                          }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No participants yet
                            </Typography>
                          )}
                          
                          {/* My Performance */}
                          {competition.myRank && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                Your Performance
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">
                                  Rank: #{competition.myRank}
                                </Typography>
                                <Typography variant="body2">
                                  Portfolio: {formatCurrency(competition.myPortfolioValue)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color={competition.myReturn >= 0 ? 'success.main' : 'error.main'}
                                  sx={{ fontWeight: 600 }}
                                >
                                  {formatPercent(competition.myReturn)}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Create Competition Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create New Competition
          <IconButton
            onClick={() => setOpenCreateDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Competition Name"
                value={newCompetition.name}
                onChange={(e) => setNewCompetition({...newCompetition, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newCompetition.description}
                onChange={(e) => setNewCompetition({...newCompetition, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={newCompetition.duration}
                  onChange={(e) => setNewCompetition({...newCompetition, duration: e.target.value})}
                >
                  <MenuItem value="1W">1 Week</MenuItem>
                  <MenuItem value="2W">2 Weeks</MenuItem>
                  <MenuItem value="1M">1 Month</MenuItem>
                  <MenuItem value="3M">3 Months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Participants"
                type="number"
                value={newCompetition.maxParticipants}
                onChange={(e) => setNewCompetition({...newCompetition, maxParticipants: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Starting Balance"
                type="number"
                value={newCompetition.startingBalance}
                onChange={(e) => setNewCompetition({...newCompetition, startingBalance: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateCompetition}>
            Create Competition
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Competitions;
